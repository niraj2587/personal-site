export const resume = {
  name: 'Niraj Desai',
  title: 'Principal Software Engineer',
  subtitle: 'Cloud Infrastructure & Distributed Systems',
  location: 'San Francisco Bay Area',
  email: 'mail@nirajjd.com',
  phone: '(516) 554-5793',
  linkedin: 'linkedin.com/in/nirajjd',
  linkedinUrl: 'https://linkedin.com/in/nirajjd',

  summary:
    "Principal Software Engineer with 13+ years of experience building enterprise-scale distributed systems, high-throughput data pipelines, and cloud infrastructure. Currently leading engineering on Argus — Salesforce's central metrics store ingesting 3 billion metrics per minute — and developing AI Platform, Salesforce's first AI-native telemetry platform service with Slack integration and LLM-compatible APIs. Proven track record delivering systems at petabyte scale across global infrastructure.",

  experience: [
    {
      title: 'Principal Software Engineer — Argus Metrics Platform',
      company: 'Salesforce',
      team: 'Argus · Monitoring Cloud',
      location: 'San Francisco Bay Area',
      period: '2024 – Present',
      bullets: [
        "Leading engineering on Argus, Salesforce's internal time-series metrics store ingesting and serving over 3 billion metrics per minute across all global infrastructure",
        'Architected high-throughput Java metrics ingestion pipeline consuming from Kafka and persisting to HBase via OpenTSDB, handling 3B+ metrics/min with sub-second write latency and 99.99% data durability',
        'Designed scope discovery layer backed by Elasticsearch enabling real-time metric namespace exploration across thousands of services and hosts, powering dashboard and alert creation for all engineering teams',
        "Building AI Platform — Salesforce's first AI-first telemetry platform — unifying metrics, logs, and traces into a single queryable interface with native Slack integration for conversational observability",
        'Developed open LLM-compatible API layer for Ali enabling integration with local Claude and other LLM runtimes, making Ali the first AI-native observability service at Salesforce',
        'Extended the Argus query engine to support complex metric expressions, downsampling, and cross-namespace joins powering SLOs, capacity alerts, and performance dashboards across the organization',
      ],
    },
    {
      title: 'Principal Software Engineer — Log Analytics',
      company: 'Salesforce',
      team: 'Log Analytics · Monitoring Cloud',
      location: 'San Francisco Bay Area',
      period: 'Aug 2021 – 2024',
      bullets: [
        "Led technical strategy for Salesforce's central log analytics platform processing 6+ PB monthly, delivering cloud migration, Kubernetes adoption, AI analytics, and developer tooling",
        'Migrated Splunk infrastructure from private DCs to multi-cloud (AWS, Azure, GCP) with zero data loss and 99.99% availability, reducing infrastructure costs by 35%',
        'Architected geo-distributed federation layer spanning 6 global regions enabling real-time log search across 50+ data centers with sub-second response times, reducing search latency by 70%',
        'Led Splunk migration to Kubernetes using custom operators across 1,600+ pods; implemented Istio service mesh with mTLS/TLS 1.3 reducing deployment time by 80%',
        'Developed MCP servers connecting Cursor IDE directly to Splunk, improving developer debugging productivity by 40% and reducing time-to-debug by 60%',
        'Led CentOS 7→8 migration across 12,000+ production hosts with zero downtime coordinating 20+ application teams with automated rollback mechanisms',
        'Spearheaded AI/ML-powered log anomaly detection platform reducing incident response time by 70% and improving alert accuracy by 85%',
      ],
    },
    {
      title: 'Senior Software Engineer',
      company: 'Salesforce',
      team: 'Log Analytics · Monitoring Cloud',
      location: 'San Francisco Bay Area',
      period: 'Jul 2019 – Aug 2021',
      bullets: [
        'Managed 1,000+ Splunk indexers processing 6PB monthly via CI/CD pipelines with 99.9% uptime',
        'Led GovCloud product standardization and customer onboarding across 3 GovCloud regions with 12-month log retention and full audit compliance',
        'Optimized CI/CD deployment pipelines reducing production lifecycle by 60%, enabling 50+ daily deployments',
      ],
    },
    {
      title: 'Senior Software Engineer',
      company: 'Oracle',
      team: 'Fusion Development Management',
      location: 'Redwood Shores, CA',
      period: 'May 2016 – Jun 2019',
      bullets: [
        'Developed comprehensive CI/CD pipeline for Oracle Fusion CRM/HCM Applications (SaaS fleet); built internal monitoring tools for Jenkins job management with real-time feedback',
        'Created shared Jenkins libraries and automated notification systems (Groovy, shell) reducing validation time by 40%',
      ],
    },
    {
      title: 'Staff Software Engineer',
      company: 'E*TRADE',
      team: 'WebDev · Robo Advisor',
      location: 'New York, NY',
      period: 'Sep 2015 – May 2016',
      bullets: [
        'Built Spring MVC controllers and RESTful/SOAP services for automated Robo Advisor trading flows',
        'Documented APIs with Swagger for developer consumption',
      ],
    },
    {
      title: 'Application System Engineer',
      company: 'Wells Fargo',
      team: 'CEO Wires',
      location: 'New York, NY',
      period: 'Sep 2011 – Aug 2015',
      bullets: [
        'Architected Oracle Coherence cache layer and SOA/BPEL processes for high-performance wire transfer system',
        'Implemented multi-factor RSA authentication and TANDEM socket integrations',
      ],
    },
  ],

  skills: [
    {
      category: 'Distributed Systems',
      items: ['Apache Kafka', 'HBase', 'OpenTSDB', 'Elasticsearch', 'Oracle Coherence', 'Service Mesh / Istio'],
    },
    {
      category: 'Cloud & Infrastructure',
      items: ['Kubernetes', 'Terraform', 'AWS', 'Azure', 'GCP', 'Spinnaker', 'CI/CD', 'Puppet', 'GovCloud'],
    },
    {
      category: 'Languages & Frameworks',
      items: ['Java / Java EE', 'Spring / Spring MVC', 'Python', 'Groovy', 'Ruby', 'JavaScript', 'React'],
    },
    {
      category: 'Observability & AI',
      items: ['Splunk (6PB scale)', 'Argus Metrics', 'OpenTelemetry', 'MCP Servers', 'LLM API Integration', 'AI Anomaly Detection'],
    },
    {
      category: 'Other',
      items: ['SOA', 'BPEL', 'EJB', 'WebSphere', 'Jenkins', 'Docker', 'JUnit', 'Swagger', 'REST', 'SOAP'],
    },
  ],

  projects: [
    {
      name: 'Argus Metrics Platform',
      description:
        "Salesforce's central time-series metrics store ingesting 3B+ metrics per minute. High-throughput Java ingestion pipeline via Kafka → HBase/OpenTSDB, Elasticsearch-backed scope discovery, and a complex query engine powering SLOs and capacity alerts across all of Salesforce's global infrastructure.",
      tags: ['Java', 'Kafka', 'HBase', 'OpenTSDB', 'Elasticsearch'],
      scale: '3B+ metrics/min',
      link: undefined as string | undefined,
    },
    {
      name: 'AI Platform (Ali)',
      description:
        "Salesforce's first AI-native telemetry platform unifying metrics, logs, and traces into a single queryable interface. Built open LLM-compatible APIs enabling Claude and other runtimes to query observability data, with native Slack integration for conversational incident investigation.",
      tags: ['LLM APIs', 'MCP', 'Java', 'Slack', 'OpenTelemetry'],
      scale: 'Production @ Salesforce',
      link: undefined as string | undefined,
    },
    {
      name: 'Splunk Operator (Open Source)',
      description:
        'Active contributor to the Splunk Operator for Kubernetes with 15+ PRs merged. Enables organizations to manage enterprise Splunk deployments on Kubernetes declaratively. Adopted by 500+ organizations globally.',
      tags: ['Kubernetes', 'Go', 'Operator Pattern', 'Open Source'],
      scale: '500+ org adoptions',
      link: 'https://github.com/splunk/splunk-operator',
    },
    {
      name: 'MCP Servers for Splunk',
      description:
        'Built Model Context Protocol servers connecting Cursor IDE directly to Splunk production log infrastructure, enabling IDE-native debugging. Improved developer debugging productivity by 40% and reduced time-to-debug by 60%.',
      tags: ['MCP', 'TypeScript', 'Splunk', 'Developer Tooling'],
      scale: 'Used by Salesforce eng',
      link: undefined as string | undefined,
    },
    {
      name: 'AI/ML Log Anomaly Detection',
      description:
        "AI/ML-powered log anomaly detection platform for Salesforce's 6PB log infrastructure. Reduced incident response time by 70% and improved alert accuracy by 85% through intelligent pattern recognition across petabytes of operational data.",
      tags: ['ML', 'Python', 'Splunk', 'Anomaly Detection'],
      scale: '6PB log corpus',
      link: undefined as string | undefined,
    },
    {
      name: 'Geo-Distributed Log Federation',
      description:
        'Federation layer spanning 6 global regions enabling real-time log search across 50+ data centers with sub-second response times. Achieved a 70% reduction in search latency through distributed query optimization and intelligent routing.',
      tags: ['Distributed Systems', 'Java', 'Splunk', 'Multi-region'],
      scale: '6 regions · 50+ DCs',
      link: undefined as string | undefined,
    },
  ],

  achievements: [
    {
      title: 'Splunk .conf Speaker',
      description:
        'Presented "Indexer Clustering at Scale" to 500+ attendees, establishing industry standards for large-scale Splunk deployments.',
    },
    {
      title: 'Open Source Contributor',
      description:
        'Active contributor to Splunk Operator with 15+ PRs merged, adopted by 500+ organizations for Kubernetes-based Splunk deployments.',
    },
    {
      title: 'AI-First Engineering Pioneer',
      description:
        "Pioneered AI Platform, Salesforce's first LLM-native observability service. Developed MCP servers for Splunk enabling IDE-native production debugging.",
    },
    {
      title: 'Petabyte-Scale Systems',
      description:
        'Systems under ownership process 3B+ metrics/min on Argus and 6PB of logs/month on the Log Analytics platform — among the largest monitoring deployments globally.',
    },
    {
      title: 'GovCloud Compliance',
      description:
        'Established compliance framework across 3 GovCloud regions achieving 100% audit compliance and reducing compliance overhead by 40%.',
    },
  ],

  education: [
    {
      degree: 'Master of Science, Bioinformatics',
      school: 'New Jersey Institute of Technology',
      location: 'Newark, NJ',
      year: 'January 2011',
      gpa: '3.65',
    },
    {
      degree: 'Bachelor of Engineering, Biotechnology',
      school: 'MVJ College of Engineering',
      location: 'Bangalore, India',
      year: 'June 2008',
      gpa: undefined as string | undefined,
    },
  ],
}
