/**
 * Aansh Creations POS — Google Sheet backend.
 *
 * Setup:
 *   1. Create a Google Sheet (e.g. "Aansh Creations Sales").
 *   2. Extensions → Apps Script. Delete the sample code, paste this file in, Save.
 *   3. ⚙️ Project Settings → Script Properties → Add script property:
 *        Property: STORE_PASSWORD    Value: the store password
 *      The password is kept there, never in this code, so pasting a new
 *      version of this file can't reset it. If it's missing, all password
 *      logins are refused (phones already logged in keep working).
 *   4. Deploy → New deployment → type "Web app"
 *        Execute as: Me
 *        Who has access: Anyone
 *      Authorize when asked, then copy the Web app URL (ends in /exec).
 *
 * "Anyone" only means the URL can be called. Security works in two layers:
 *   - Logging in a phone needs the password. After 10 wrong tries in
 *     15 minutes, new logins are refused for a while.
 *   - A successful login gives that phone a long random device key. All its
 *     syncing uses the key, which can't be guessed, so the lockout above
 *     never affects a phone that is already logged in.
 *
 * Lost a phone or changed the password? Run revokeAllDevices() from the
 * editor (pick it in the function dropdown → Run). Every phone must log in again.
 *
 * If you edit this script later: Deploy → Manage deployments → ✏️ → Version:
 * "New version" → Deploy. That keeps the same URL.
 */

const SALES_HEADERS = ['Line ID', 'Sale ID', 'Date', 'Time', 'Market', 'Item', 'Qty', 'Unit Price', 'Line Total', 'Payment', 'Removed', 'Session ID'];
const SESSION_HEADERS = ['Session ID', 'Market', 'Opened', 'Closed', 'Starting Cash', 'Sales', 'Items Sold', 'Revenue', 'Cash', 'Non-cash', 'Deleted'];

function doPost(e) {
  let data;
  try { data = JSON.parse(e.postData.contents); } catch (err) { return json({ ok: false, error: 'bad request' }); }

  const props = PropertiesService.getScriptProperties();

  // Logged-in phones: device key only, never subject to the lockout.
  if (data.token) {
    if (!/^[a-f0-9]{64}$/.test(data.token) || !props.getProperty('tok_' + data.token)) {
      return json({ ok: false, error: 'unauthorized' });
    }
    if (data.action === 'login') return json({ ok: true, token: data.token });
    return saveSales(data);
  }

  // Password: rate-limited.
  const cache = CacheService.getScriptCache();
  const fails = Number(cache.get('fails') || 0);
  if (fails >= 10) return json({ ok: false, error: 'locked' });
  const password = props.getProperty('STORE_PASSWORD') || '';
  if (password.length < 8) return json({ ok: false, error: 'not set up' });   // refuse rather than accept a blank/weak one
  if (typeof data.password !== 'string' || data.password !== password) {
    cache.put('fails', String(fails + 1), 15 * 60);
    return json({ ok: false, error: 'unauthorized' });
  }

  if (data.action === 'login') {
    const token = (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '');
    props.setProperty('tok_' + token, new Date().toISOString());
    return json({ ok: true, token: token });
  }
  return saveSales(data);
}

function revokeAllDevices() {
  const props = PropertiesService.getScriptProperties();
  const keys = props.getKeys().filter(k => k.indexOf('tok_') === 0);
  keys.forEach(k => props.deleteProperty(k));
  Logger.log('Logged out ' + keys.length + ' device(s).');
}

function saveSales(data) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const tz = ss.getSpreadsheetTimeZone();
    if (Array.isArray(data.records)) return json(syncRecords(ss, tz, data));
    legacySave(ss, tz, data);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Two-way sync. The hidden "_data" tab is the master copy shared by every
 * phone: one row per record (market day, sale, product, settings).
 * Phones push what they changed and get back everything changed since
 * their last sync. Newest edit (by its "u" timestamp) wins.
 */
const DB_SHEET = '_data';
const TYPES = { session: true, sale: true, product: true, config: true };

function syncRecords(ss, tz, data) {
  let db = ss.getSheetByName(DB_SHEET);
  if (!db) {
    db = ss.insertSheet(DB_SHEET);
    db.getRange('A:E').setNumberFormat('@');
    db.appendRow(['ID', 'Type', 'Edited', 'Server Time', 'Record']);
    db.hideSheet();
  }
  const last = db.getLastRow();
  const byId = new Map();
  if (last > 1) {
    db.getRange(2, 1, last - 1, 5).getValues().forEach((r, i) => {
      byId.set(String(r[0]), { row: i + 2, u: Number(r[2]), srv: Number(r[3]), rec: JSON.parse(r[4]) });
    });
  }

  const now = Date.now();
  const fresh = [], bounced = [], changedSales = [];
  const changedSessions = new Set(), sessionsToSum = new Set();
  data.records.forEach(r => {
    if (!r || typeof r.id !== 'string' || !TYPES[r.type]) return;
    const cur = byId.get(r.id);
    if (cur && cur.u > (r.u || 0)) { bounced.push(r.id); return; }   // stored copy is newer
    const row = [r.id, r.type, String(r.u || 0), String(now), JSON.stringify(r)];
    if (cur) db.getRange(cur.row, 1, 1, 5).setValues([row]);
    else fresh.push(row);
    byId.set(r.id, { row: cur ? cur.row : 0, u: r.u || 0, srv: now, rec: r });
    if (r.type === 'sale') { changedSales.push(r); sessionsToSum.add(r.sessionId); }
    if (r.type === 'session') { changedSessions.add(r.id); sessionsToSum.add(r.id); }
  });
  if (fresh.length) db.getRange(db.getLastRow() + 1, 1, fresh.length, 5).setValues(fresh);

  // Refresh the human-friendly Sales / Sessions tabs for whatever changed.
  const sessions = {}, allSales = [];
  byId.forEach(v => {
    if (v.rec.type === 'session') sessions[v.rec.id] = v.rec;
    else if (v.rec.type === 'sale') allSales.push(v.rec);
  });
  const saleRows = [];
  allSales.filter(s => changedSales.indexOf(s) >= 0 || changedSessions.has(s.sessionId)).forEach(s => {
    const sess = sessions[s.sessionId] || {};
    const at = new Date(s.at);
    s.items.forEach((it, i) => {
      saleRows.push([s.id + '-' + i, s.id,
        Utilities.formatDate(at, tz, 'yyyy-MM-dd'), Utilities.formatDate(at, tz, 'h:mm a'),
        sess.market || '', it.name, it.qty, it.price / 100, it.qty * it.price / 100, s.payment,
        s.voided || sess.deleted ? 'yes' : '', s.sessionId]);
    });
  });
  const sessionRows = [];
  sessionsToSum.forEach(id => {
    const sess = sessions[id];
    if (!sess) return;
    let count = 0, items = 0, revenue = 0, cash = 0;
    allSales.forEach(s => {
      if (s.sessionId !== id || s.voided) return;
      count++; revenue += s.total;
      if (s.payment === 'Cash') cash += s.total;
      s.items.forEach(it => { items += it.qty; });
    });
    sessionRows.push([id, sess.market, new Date(sess.openedAt), sess.closedAt ? new Date(sess.closedAt) : '',
      (sess.startCash || 0) / 100, count, items, revenue / 100, cash / 100, (revenue - cash) / 100, sess.deleted ? 'yes' : '']);
  });
  if (sessionRows.length) upsert(ss, 'Sessions', SESSION_HEADERS, sessionRows, [5, 8, 9, 10]);
  if (saleRows.length) upsert(ss, 'Sales', SALES_HEADERS, saleRows, [8, 9]);

  const since = Number(data.since || 0);
  const records = [];
  byId.forEach((v, id) => { if (v.srv > since || bounced.indexOf(id) >= 0) records.push(v.rec); });
  return { ok: true, now: now, records: records };
}

// Pages from before two-way sync send ready-made rows instead of records.
function legacySave(ss, tz, data) {
    const sessionRows = (data.sessions || []).map(s => {
      const cash = (s.byPayment && s.byPayment.Cash) || 0;
      return [s.id, s.market, new Date(s.openedAt), s.closedAt ? new Date(s.closedAt) : '',
        s.startCash, s.sales, s.items, s.revenue, cash, s.revenue - cash];
    });

    const saleRows = [];
    (data.sales || []).forEach(s => {
      const at = new Date(s.at);
      s.items.forEach((it, i) => {
        saleRows.push([s.id + '-' + i, s.id,
          Utilities.formatDate(at, tz, 'yyyy-MM-dd'), Utilities.formatDate(at, tz, 'h:mm a'),
          s.market, it.name, it.qty, it.price, it.qty * it.price, s.payment, s.voided ? 'yes' : '', s.sessionId]);
      });
    });

    if (sessionRows.length) upsert(ss, 'Sessions', SESSION_HEADERS, sessionRows, [5, 8, 9, 10]);
    if (saleRows.length) upsert(ss, 'Sales', SALES_HEADERS, saleRows, [8, 9]);
}

function doGet() {
  return json({ ok: true, app: 'aansh-pos' });
}

// Insert or update rows keyed by the first column, so retries never duplicate.
function upsert(ss, name, headers, rows, moneyCols) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    moneyCols.forEach(c => sh.getRange(2, c, sh.getMaxRows() - 1, 1).setNumberFormat('$#,##0.00'));
  }
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  const last = sh.getLastRow();
  const keys = last > 1 ? sh.getRange(2, 1, last - 1, 1).getValues().map(r => String(r[0])) : [];
  const rowOf = new Map(keys.map((k, i) => [k, i + 2]));
  const fresh = [];
  rows.forEach(r => {
    const at = rowOf.get(String(r[0]));
    if (at) sh.getRange(at, 1, 1, r.length).setValues([r]);
    else fresh.push(r);
  });
  if (fresh.length) sh.getRange(sh.getLastRow() + 1, 1, fresh.length, fresh[0].length).setValues(fresh);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
