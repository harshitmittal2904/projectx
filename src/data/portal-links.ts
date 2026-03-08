export interface PortalLink {
  name: string
  url: string
  description: string
  schemes: string[]
}

export const portalLinks: PortalLink[] = [
  {
    name: 'EPFO Member Portal',
    url: 'https://unifiedportal-mem.epfindia.gov.in',
    description: 'Check EPF balance, submit claims, transfer EPF, update KYC',
    schemes: ['epf'],
  },
  {
    name: 'EPFiGMS (Grievance)',
    url: 'https://epfigms.gov.in',
    description: 'File and track EPF grievances',
    schemes: ['epf'],
  },
  {
    name: 'eNPS Portal',
    url: 'https://enps.nsdl.com',
    description: 'Open NPS account, make contributions, manage PRAN',
    schemes: ['nps', 'apy'],
  },
  {
    name: 'CRA-NSDL',
    url: 'https://cra-nsdl.com',
    description: 'NPS account statement, fund switch, withdrawal requests',
    schemes: ['nps'],
  },
  {
    name: 'India Post',
    url: 'https://www.indiapost.gov.in',
    description: 'PPF, SSY, SCSS, NSC, and other post office schemes',
    schemes: ['ppf', 'ssy', 'scss', 'nsc'],
  },
  {
    name: 'UMANG App',
    url: 'https://web.umang.gov.in',
    description: 'Unified app for EPF, NPS, and other government services',
    schemes: ['epf', 'nps', 'ppf'],
  },
  {
    name: 'CPGRAMS',
    url: 'https://pgportal.gov.in',
    description: 'Centralized Public Grievance Redress and Monitoring System',
    schemes: [],
  },
  {
    name: 'RBI SGB Portal',
    url: 'https://rbi.org.in',
    description: 'Sovereign Gold Bond subscription details and announcements',
    schemes: ['sgb'],
  },
]
