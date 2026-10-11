/**
 * Aansh Creations POS — Google Sheet backend.
 *
 * Setup:
 *   1. Create a Google Sheet (e.g. "Aansh Creations Sales").
 *   2. Extensions → Apps Script. Delete the sample code, paste this file in.
 *   3. Change PASSWORD below to the store password, then Save.
 *   4. Deploy → New deployment → type "Web app"
 *        Execute as: Me
 *        Who has access: Anyone
 *      Authorize when asked, then copy the Web app URL (ends in /exec).
 *
 * "Anyone" only means the URL can be called. Every request must carry the
 * password, and after 10 wrong tries in 15 minutes all logins are refused.
 *
 * If you edit this script later: Deploy → Manage deployments → ✏️ → Version:
 * "New version" → Deploy. That keeps the same URL.
 */

const PASSWORD = 'change-me';

const SALES_HEADERS = ['Line ID', 'Sale ID', 'Date', 'Time', 'Market', 'Item', 'Qty', 'Unit Price', 'Line Total', 'Payment', 'Removed', 'Session ID'];
const SESSION_HEADERS = ['Session ID', 'Market', 'Opened', 'Closed', 'Starting Cash', 'Sales', 'Items Sold', 'Revenue', 'Cash', 'Non-cash'];

function doPost(e) {
  let data;
  try { data = JSON.parse(e.postData.contents); } catch (err) { return json({ ok: false, error: 'bad request' }); }

  const cache = CacheService.getScriptCache();
  const fails = Number(cache.get('fails') || 0);
  if (fails >= 10) return json({ ok: false, error: 'locked' });
  if (data.password !== PASSWORD) {
    cache.put('fails', String(fails + 1), 15 * 60);
    return json({ ok: false, error: 'unauthorized' });
  }

  if (data.action === 'login') return json({ ok: true });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const tz = ss.getSpreadsheetTimeZone();

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
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
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
