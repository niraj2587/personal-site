export interface Project {
  name: string
  description: string
  tags: string[]
  scale: string
  link?: string
}

export interface Education {
  degree: string
  school: string
  location: string
  year: string
}

export const resume = {
  name: 'Niraj Desai',
  title: 'Principal Software Engineer',
  subtitle: 'Cloud Infrastructure & Distributed Systems',
  location: 'San Francisco Bay Area',
  email: 'mail@nirajjd.com',
  linkedin: 'linkedin.com/in/nirajjd',
  linkedinUrl: 'https://linkedin.com/in/nirajjd',
  resumeUrl: '/resume.pdf',

  summary:
    "Principal Software Engineer with 13+ years building enterprise-scale distributed systems and cloud infrastructure. At Salesforce, leading engineering on Argus — the central time-series metrics platform — and developing an LLM-native telemetry surface that unifies metrics, logs, and traces behind a conversational, tool-calling interface. Earlier work spans multi-PB log analytics, multi-cloud Splunk migration, and Kubernetes adoption across the monitoring stack.",

  experience: [
    {
      title: 'Principal Software Engineer — Argus Metrics Platform',
      company: 'Salesforce',
      team: 'Argus · Monitoring Cloud',
      location: 'San Francisco Bay Area',
      period: '2024 – Present',
      bullets: [
        'Leading engineering on Argus, the central time-series metrics platform serving multi-billion-datapoint-per-minute scale across the monitoring stack',
        'Own the high-throughput Java ingestion path: Kafka consumers persisting to HBase via OpenTSDB, with Elasticsearch-backed scope discovery powering dashboard and alert authoring',
        'Building an LLM-native telemetry surface that unifies metrics, logs, and traces behind a conversational interface, with Slack as a first-class client and tool-calling APIs that let Claude and other model runtimes query observability data directly',
        'Extended the Argus query engine with cross-namespace joins, expression nesting, and downsampling — used by SLO, capacity, and performance dashboards across the org',
      ],
    },
    {
      title: 'Principal Software Engineer — Log Analytics',
      company: 'Salesforce',
      team: 'Log Analytics · Monitoring Cloud',
      location: 'San Francisco Bay Area',
      period: 'Aug 2021 – 2024',
      bullets: [
        'Led technical strategy for the central log analytics platform at multi-PB-per-day scale, spanning cloud migration, Kubernetes adoption, and developer tooling',
        'Drove Splunk migration from private DCs to multi-cloud (AWS, Azure, GCP) with no data loss during cutover',
        'Architected a geo-distributed federation layer across 6 regions enabling sub-second cross-region log search',
        'Led Splunk-on-Kubernetes migration with custom operators across thousands of pods; introduced an Istio service mesh with mTLS for east-west traffic',
        'Built MCP servers wiring Cursor and other IDEs directly into Splunk, so engineers can query production logs from their editor during incident triage',
        'Drove a CentOS 7 → 8 host migration across the fleet, coordinating with 20+ application teams and shipping automated rollback for safety',
        'Spearheaded an ML-based log anomaly detection pipeline that surfaces unknown-unknown signal during incidents',
      ],
    },
    {
      title: 'Senior Software Engineer',
      company: 'Salesforce',
      team: 'Log Analytics · Monitoring Cloud',
      location: 'San Francisco Bay Area',
      period: 'Jul 2019 – Aug 2021',
      bullets: [
        'Operated the Splunk indexer fleet at multi-PB-per-day ingest, with deployment and config managed entirely through CI/CD',
        'Led GovCloud product standardization and customer onboarding across 3 GovCloud regions, including 12-month retention and audit controls',
        'Tightened the deploy pipeline so production rollouts could be cut multiple times per day instead of weekly',
      ],
    },
    {
      title: 'Senior Software Engineer',
      company: 'Oracle',
      team: 'Fusion Development Management',
      location: 'Redwood Shores, CA',
      period: 'May 2016 – Jun 2019',
      bullets: [
        'Built CI/CD for Oracle Fusion CRM/HCM SaaS fleet, including Jenkins job-management tooling for the dev org',
        'Authored shared Jenkins libraries (Groovy, shell) and notification plumbing that cut validation turnaround for downstream teams',
      ],
    },
    {
      title: 'Staff Software Engineer',
      company: 'E*TRADE',
      team: 'WebDev · Robo Advisor',
      location: 'New York, NY',
      period: 'Sep 2015 – May 2016',
      bullets: [
        'Built Spring MVC controllers and REST/SOAP services for the automated Robo Advisor trading flows',
      ],
    },
    {
      title: 'Application System Engineer',
      company: 'Wells Fargo',
      team: 'CEO Wires',
      location: 'New York, NY',
      period: 'Sep 2011 – Aug 2015',
      bullets: [
        'Worked on the wire-transfer platform: Oracle Coherence cache layer, SOA/BPEL orchestration, MFA, and TANDEM socket integrations',
      ],
    },
  ],

  skills: [
    {
      category: 'Distributed Systems',
      items: ['Apache Kafka', 'HBase', 'OpenTSDB', 'Elasticsearch', 'Service Mesh / Istio'],
    },
    {
      category: 'Cloud & Infrastructure',
      items: ['Kubernetes', 'Terraform', 'AWS', 'Azure', 'GCP', 'Spinnaker', 'CI/CD'],
    },
    {
      category: 'Languages & Frameworks',
      items: ['Java', 'Python', 'Go', 'TypeScript', 'Spring', 'React'],
    },
    {
      category: 'Observability & AI',
      items: ['Splunk', 'OpenTSDB / Argus', 'OpenTelemetry', 'MCP Servers', 'LLM Tool-Calling APIs', 'Anomaly Detection'],
    },
  ],

  projects: [
    {
      name: 'Argus Metrics Platform',
      description:
        "The central time-series metrics platform at Salesforce. Java ingestion via Kafka → HBase/OpenTSDB, Elasticsearch-backed scope discovery, and a query engine powering SLOs, capacity alerts, and dashboards across the monitoring stack.",
      tags: ['Java', 'Kafka', 'HBase', 'OpenTSDB', 'Elasticsearch'],
      scale: 'B+ datapoints/min',
    },
    {
      name: 'LLM-Native Telemetry Surface',
      description:
        'Conversational observability layer over metrics, logs, and traces. Tool-calling APIs let Claude and other model runtimes pull telemetry directly; Slack is wired in as a first-class client so on-call can investigate without leaving the channel.',
      tags: ['LLMs', 'Tool Calling', 'MCP', 'Slack', 'OpenTelemetry'],
      scale: 'In production',
    },
    {
      name: 'Splunk Operator',
      description:
        'Contributor to the open-source Splunk Operator for Kubernetes, which lets teams declaratively manage enterprise Splunk deployments.',
      tags: ['Kubernetes', 'Go', 'Operator Pattern', 'Open Source'],
      scale: 'Open source',
      link: 'https://github.com/splunk/splunk-operator',
    },
    {
      name: 'MCP Servers for Splunk',
      description:
        'Model Context Protocol servers connecting Cursor and other IDEs into Splunk, so engineers can query production logs from their editor during incident triage instead of context-switching to a UI.',
      tags: ['MCP', 'TypeScript', 'Splunk', 'Developer Tooling'],
      scale: 'Internal tool',
    },
    {
      name: 'Log Anomaly Detection',
      description:
        'ML-based pipeline that surfaces unknown-unknown signal in operational logs during incidents — pattern recognition across the log corpus, used as a starting point for on-call investigation.',
      tags: ['ML', 'Python', 'Splunk', 'Anomaly Detection'],
      scale: 'Multi-PB log corpus',
    },
    {
      name: 'Geo-Distributed Log Federation',
      description:
        'Federation layer across 6 regions enabling cross-region log search at sub-second latency. Distributed query optimization and routing so a single search can reach the whole estate without fanning out the user.',
      tags: ['Distributed Systems', 'Java', 'Splunk', 'Multi-region'],
      scale: '6 regions',
    },
  ] as Project[],

  achievements: [
    {
      title: 'Splunk .conf Speaker',
      description:
        'Presented "Indexer Clustering at Scale" at Splunk .conf — covering operational lessons from running a large indexer footprint.',
    },
    {
      title: 'Open Source Contributor',
      description:
        'Contributor to the Splunk Operator for Kubernetes, the project that lets organizations run enterprise Splunk declaratively on Kubernetes.',
    },
    {
      title: 'LLM-Native Observability',
      description:
        "Built one of Salesforce's first conversational telemetry surfaces — tool-calling APIs that let LLMs query metrics and logs directly, and an MCP integration that pulls production log access into the IDE.",
    },
    {
      title: 'Petabyte-Scale Systems',
      description:
        'Systems under ownership operate at multi-billion-datapoints-per-minute on Argus and multi-PB-per-day on the log analytics side — among the larger monitoring deployments in industry.',
    },
    {
      title: 'GovCloud Compliance',
      description:
        'Established the compliance framework for the log analytics product across 3 GovCloud regions, including retention, access controls, and audit posture.',
    },
  ],

  education: [
    {
      degree: 'Master of Science, Bioinformatics',
      school: 'New Jersey Institute of Technology',
      location: 'Newark, NJ',
      year: 'January 2011',
    },
    {
      degree: 'Bachelor of Engineering, Biotechnology',
      school: 'MVJ College of Engineering',
      location: 'Bangalore, India',
      year: 'June 2008',
    },
  ] as Education[],
}
