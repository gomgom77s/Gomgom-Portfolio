/* ──────────────────────────────────────────
   THEME (dark / light)
────────────────────────────────────────── */
const html = document.documentElement;

// Load saved theme
const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);

document.getElementById('themeToggle')?.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ──────────────────────────────────────────
   NAVBAR — scroll background + mobile menu
────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const burger  = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

burger?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('open');
});

function closeMobile() {
  mobileMenu?.classList.remove('open');
}

/* ──────────────────────────────────────────
   HERO SWITCH (Engineering / Analytics)
────────────────────────────────────────── */
function heroSwitch(type) {
  const btnEng  = document.getElementById('heroEngBtn');
  const btnData = document.getElementById('heroDataBtn');

  if (type === 'eng') {
    btnEng?.classList.add('active');
    btnEng?.classList.remove('active-data');
    btnData?.classList.remove('active', 'active-data');
    switchTab('eng');
  } else {
    btnData?.classList.add('active-data');
    btnData?.classList.remove('active');
    btnEng?.classList.remove('active', 'active-data');
    switchTab('data');
  }

  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
}

/* ──────────────────────────────────────────
   PROJECT TAB TOGGLE (home page)
────────────────────────────────────────── */
function switchTab(type) {
  const panelEng  = document.getElementById('panelEng');
  const panelData = document.getElementById('panelData');
  const tabEng    = document.getElementById('ptabEng');
  const tabData   = document.getElementById('ptabData');

  if (type === 'eng') {
    panelEng?.classList.remove('hidden');
    panelData?.classList.add('hidden');
    tabEng?.classList.add('active');
    tabEng?.classList.remove('active-data');
    tabData?.classList.remove('active', 'active-data');
  } else {
    panelData?.classList.remove('hidden');
    panelEng?.classList.add('hidden');
    tabData?.classList.add('active-data');
    tabData?.classList.remove('active');
    tabEng?.classList.remove('active', 'active-data');
  }
}

/* ──────────────────────────────────────────
   CERT TAB TOGGLE (home page + all-certificates page)
────────────────────────────────────────── */
function switchCertTab(type) {
  const panelEng   = document.getElementById('certPanelEng');
  const panelData  = document.getElementById('certPanelData');
  const panelOther = document.getElementById('certPanelOther');
  const tabEng     = document.getElementById('ctabEng');
  const tabData    = document.getElementById('ctabData');
  const tabOther   = document.getElementById('ctabOther');

  // Hide all panels, reset all tabs
  [panelEng, panelData, panelOther].forEach(p => p?.classList.add('hidden'));
  [tabEng, tabData, tabOther].forEach(t => t?.classList.remove('active', 'active-data', 'active-other'));

  if (type === 'eng') {
    panelEng?.classList.remove('hidden');
    tabEng?.classList.add('active');
  } else if (type === 'data') {
    panelData?.classList.remove('hidden');
    tabData?.classList.add('active-data');
  } else {
    panelOther?.classList.remove('hidden');
    tabOther?.classList.add('active-other');
  }
}

/* ──────────────────────────────────────────
   MODAL — case study data
   Engineering schema: { type:'Engineering', color, title, tools,
     hero:{img,caption}, overview, images:[{img,title,caption}, ...],
     info:{Software,Role,Material,Process}, result }
   Data Analytics schema: { type:'Data Analytics', color, title, tools,
     hero:{img,caption}, workflow:{img,caption},
     sql:{img,caption}, python:{img,caption},
     kpis:[{value,prefix,suffix,label}, ...],
     recommendation, deckUrl }
────────────────────────────────────────── */
const MODALS = {
  eng1: {
    type: 'Engineering', color: 'var(--eng)',
    title: 'Aluminium Extrusion Die Design',
    tools: ['CATIA', 'Inventor', 'AutoCAD'],
    // ✏️ Ganti src gambar dengan path asli, mis: 'assets/eng1-hero.jpg'
    hero: { img: '', caption: '3D assembly render of the extrusion die' },
    overview: 'Designed aluminium extrusion dies for complex profile manufacturing at Mega Persada Group. The project focused on optimising material flow through the die channels to ensure consistent cross-section and surface finish quality.',
    images: [
      { img: '', title: '3D Isometric View', caption: 'Full die assembly showing bearing surface and channel layout.' },
      { img: '', title: 'Exploded View', caption: 'Component breakdown showing die plate, bolster, and backer assembly.' },
      { img: '', title: 'Manufacturing Drawing', caption: 'Toleranced technical drawing used for EDM and CNC machining.' },
    ],
    info: {
      Software: 'CATIA, Inventor, AutoCAD',
      Role: 'Die Designer',
      Material: 'H13 Tool Steel',
      'Manufacturing Process': 'EDM, CNC Machining',
    },
    result: 'Die successfully produced aluminium profiles meeting dimensional tolerances within ±0.1 mm. Reduced setup iterations by ~30% compared to previous design approach.',
  },
  eng2: {
    type: 'Engineering', color: 'var(--eng)',
    title: 'Custom Maintenance Tool Design',
    tools: ['SolidWorks', 'ANSYS', 'AutoCAD'],
    hero: { img: '', caption: '3D assembly render of the maintenance tool' },
    overview: 'Designed specialised tools for maintenance operations in an automotive stamping environment. Focused on improving accessibility and ergonomics for maintenance tasks on large progressive dies.',
    images: [
      { img: '', title: '3D Isometric View', caption: 'Tool assembly with adjustable fixture points.' },
      { img: '', title: 'Exploded View', caption: 'Component breakdown of the custom fixture assembly.' },
      { img: '', title: 'Manufacturing Drawing', caption: 'Detailed drawing for fabrication.' },
    ],
    info: {
      Software: 'SolidWorks, ANSYS, AutoCAD',
      Role: 'Tool Designer',
      Material: 'S45C Steel',
      'Manufacturing Process': 'Milling, Welding',
    },
    result: 'Reduced die maintenance time by an estimated 20%. Tools approved for production use and included in the standard maintenance procedure.',
  },
  eng3: {
    type: 'Engineering', color: 'var(--eng)',
    title: 'Progressive Die Maintenance & Redesign',
    tools: ['CATIA', 'Technical Drawing'],
    hero: { img: '', caption: '3D assembly render of the progressive die' },
    overview: 'Supported ongoing maintenance, diagnosis, and redesign of progressive stamping dies in a high-volume automotive parts production environment.',
    images: [
      { img: '', title: '3D Isometric View', caption: 'Progressive die station layout.' },
      { img: '', title: 'Exploded View', caption: 'Punch and die insert breakdown.' },
      { img: '', title: 'Manufacturing Drawing', caption: 'Revised insert geometry drawing.' },
    ],
    info: {
      Software: 'CATIA',
      Role: 'Die Maintenance Engineer',
      Material: 'SKD11 Tool Steel',
      'Manufacturing Process': 'Grinding, Wire EDM',
    },
    result: 'Extended average die service intervals and reduced scrap rate from premature die wear. Findings documented to support future die design improvements.',
  },
  // ✏️ Tambah modal untuk project engineering baru (eng4, eng5, dst)
  eng4: {
    type: 'Engineering', color: 'var(--eng)',
    title: '✏️ Nama Project ke-4',
    tools: ['✏️ Tool', '✏️ Tool'],
    hero: { img: '', caption: '✏️ Caption hero render' },
    overview: '✏️ Isi overview project ini.',
    images: [
      { img: '', title: '3D Isometric View', caption: '✏️ Penjelasan singkat.' },
      { img: '', title: 'Exploded View', caption: '✏️ Penjelasan singkat (opsional).' },
      { img: '', title: 'Manufacturing Drawing', caption: '✏️ Penjelasan singkat.' },
    ],
    info: {
      Software: '✏️ Software',
      Role: '✏️ Role',
      Material: '✏️ Material',
      'Manufacturing Process': '✏️ Process',
    },
    result: '✏️ Isi hasil yang dicapai.',
  },
  eng5: {
    type: 'Engineering', color: 'var(--eng)',
    title: '✏️ Nama Project ke-5',
    tools: ['✏️ Tool'],
    hero: { img: '', caption: '✏️ Caption hero render' },
    overview: '✏️ Isi overview.',
    images: [
      { img: '', title: '3D Isometric View', caption: '✏️ Penjelasan singkat.' },
      { img: '', title: 'Exploded View', caption: '✏️ Penjelasan singkat (opsional).' },
      { img: '', title: 'Manufacturing Drawing', caption: '✏️ Penjelasan singkat.' },
    ],
    info: {
      Software: '✏️ Software',
      Role: '✏️ Role',
      Material: '✏️ Material',
      'Manufacturing Process': '✏️ Process',
    },
    result: '✏️ Isi outcome.',
  },

  //ANALYTICS
  data1: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'Delivery Performance Analysis and Improvement Opportunities',
    tools: ['Excel', 'Tableau'],
    location: 'RevoU — Full Stack Data Analytics',
    scope: {
      dataset: 'DataCo Supply Chain Dataset',
      industry: 'Logistics & Supply Chain',
      duration: '2 Weeks',
      role: 'Supply Chain Analyst',
      source: 'RevoU DEEP Final Project (DataCo Supply Chain Dataset)',
      rows: '180,520 rows',
    },
    background: 'Analyze delivery performance to identify the key drivers of late deliveries, evaluate shipping mode and regional performance, and develop data-driven improvement scenarios to enhance logistics efficiency.',
    processLabels: ['Raw Dataset', 'Data Cleaning'],
    // ✏️ Ganti src gambar dengan path asli, mis: 'assets/data1-hero.png'
    hero: { img: 'images/portfolio-analytics-1a.JPG', caption: 'Tableau dashboard — sales performance overview' },
    workflow: ['Data Collection (CSV)', 'Data Cleaning (Excel)', 'Exploratory Analysis', 'Delivery Simulation', 'Visualisation (Tableau)'],
    sql: { img: 'images/portfolio-analytics-1b.JPG', caption: 'Original delivery dataset containing shipment, customer, and order information before preprocessing.' },
    python: { img: 'images/portfolio-analytics-1c.JPG', caption: 'Standardized column formats, corrected data types, and removed inconsistencies before visualization.' },
    kpis: [
      { value: 54.9, prefix: '', suffix: '%', label: 'Late Delivery Rate' },
      { value: 42.7, prefix: '', suffix: '%', label: 'SLA Compliance Rate' },
      { value: 0.57, prefix: '', suffix: ' day', label: 'Average Delivery Delay' },
    ],
    recommendation: 'Align promised delivery times with actual operational performance, particularly for First Class and Second Class shipping modes. - Continuously monitor delivery KPIs, including Late Delivery Rate, Average Delivery Delay, and SLA Compliance, to identify performance gaps early. - Use scenario-based analysis to evaluate the potential business impact before implementing operational policy changes.',
    deckUrl: 'https://docs.google.com/presentation/d/1918zIP_CQh2SVXQwCTgKVPRpevi-QPE7kEI0rBZGGVk/edit?usp=drive_link',
  },
  data2: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'Customer Segmentation & Revenue Growth Strategy Using RFM Analysis',
    tools: ['Python', 'Pandas', 'Numpy','Matplotlib','Spreadsheet','Power BI'],
    location: 'RevoU — Full Stack Data Analytics',
    scope: {
      dataset: 'RevoBank Customer & Card Transaction Dataset',
      industry: 'Banking & Financial Services',
      duration: '1 weeks',
      role: 'Customer Data Analyst',
      source: 'RevoU Milestone 3 Dataset',
      rows: '5600 rows',
    },
    background: '✏️ Isi latar belakang project — konteks bisnis dan problem yang diselesaikan.',
    processLabels: ['Raw Dataset', 'Data Cleaning & Preparation'],
    hero: { img: 'images/portfolio-analytics-2a.JPG', caption: 'Customer segmentation overview chart' },
    workflow: ['Data Extraction', 'Data Cleaning', 'RFM Scoring (Python)', 'Customer Segmentation', 'Insight & Recommendation'],
    sql: { img: 'images/portfolio-analytics-2b.JPG', caption: 'Original transactional dataset in CSV format containing customer, payment, and delivery records before preprocessing.' },
    python: { img: 'images/portfolio-analytics-2c.JPG', caption: 'Cleaned and standardized the dataset by correcting data types, handling inconsistencies, and preparing it for analysis and visualization.' },
    kpis: [
      { value: 1195, prefix: '', suffix: 'K', label: 'Total CardHolder' },
      { value: 456.06, prefix: 'Rp.', suffix: 'bn', label: 'Total Transaction' },
      { value: 0.24, prefix: '', suffix: '', label: 'Average Debt-to-Ratio' },
    ],
    recommendation: 'Prioritize retention for Champions through premium rewards and personalized loyalty programs to sustain high transaction value. - Develop Potential Loyalists with targeted promotions and cross-selling to increase spending and convert them into Champions. - Reactivate inactive customers using win-back campaigns while monitoring high-risk segments to improve overall transaction growth.',
    deckUrl: 'https://docs.google.com/presentation/d/1YU2EYgZZsv_twfbR-IgPuIs9G59bkEWnFM_6-Wm6QKc/edit?usp=drive_link',
  },
  data3: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'Sales Performance Analysis Using SQL',
    tools: ['SQL', 'Spreadsheet'],
    location: 'RevoU — Full Stack Data Analytics',
    scope: {
      dataset: 'Grocery Retail Sales Dataset',
      industry: 'Retail / Grocery',
      duration: '4 Days',
      role: 'Data Analyst',
      source: 'Public Dataset (FSDA SQL Training Dataset)',
      rows: '98.759 rows',
    },
    background: 'Analyze retail transaction data to evaluate sales performance, identify high-value customers, measure customer retention through repeat purchases, and uncover key revenue-driving product categories to support data-driven business decisions.',
    processLabels: ['SQL Query', 'Analysis Result'],
    hero: { img: 'images/portfolio-analytics-3a.JPG', caption: 'Power BI dashboard — channel attribution overview' },
    workflow: ['Data Collection', 'Data Cleaning (Spreadsheet)', 'SQL Querying', 'Analysis & Aggregation', 'Visualisation (Spreadsheet)'],
    sql: { img: 'images/portfolio-analytics-3b.JPG', caption: 'SQL query used to calculate cumulative revenue for each customer using window functions, enabling revenue trend analysis over time.' },
    python: { img: 'images/portfolio-analytics-3c.JPG', caption: 'Analyzed repeat purchase rates to evaluate customer loyalty and purchasing behavior.' },
    kpis: [
      { value: 10.56, prefix: '$', suffix: 'M', label: 'Total Revenue' },
      { value: 15.717, prefix: '', suffix: 'K', label: 'Total Customer' },
      { value: 97.6, prefix: '', suffix: '%', label: 'Repeat Purchase Rate' },
    ],
    recommendation: 'Increase investment in high-performing product categories to maximize revenue growth while leveraging the existing strong customer base. - Maintain the high repeat purchase rate by strengthening loyalty programs and personalized promotions to sustain customer retention. - Expand customer acquisition initiatives to grow revenue further while preserving the current high retention performance.',
    deckUrl: 'https://docs.google.com/presentation/d/1bzfAdcAytA28UELsA0hQKdU9beHtkMlQsv03n3t9aVg/edit?usp=drive_link',
  },
  data4: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'Hospital Operational Monitoring Dashboard',
    tools: ['Tableau'],
    location: 'RevoU — Full Stack Data Analytics',
    scope: {
      dataset: 'Hospital Management Dataset',
      industry: 'Healthcare',
      duration: '3 days',
      role: 'Business Intelligence Analyst',
      source: 'RevoU / Simulated Hospital Dataset',
      rows: '5,000 rows',
    },
    background: 'Developed an operational monitoring dashboard for hospital management to track patient admissions, length of stay (LOS), revenue performance, and workload distribution across branches and departments. The dashboard provides a centralized view of operational performance to support data-driven decision making.',
    processLabels: ['LOD Calculation', 'Data Preparation'],
    hero: { img: 'images/portfolio-analytics-4a.JPG', caption: '✏️ Caption hero dashboard' },
    workflow: ['Data Collection', 'Data Cleaning', 'Dashboard Design (Tableau)', 'Performance Monitoring', 'Insight & Recommendation'],
    sql: { img: 'images/portfolio-analytics-4b.JPG', caption: 'Used Tableau LOD calculations to analyze department revenue contribution across hospital branches.' },
    python: { img: 'images/portfolio-analytics-4c.JPG', caption: 'Prepared and validated the hospital dataset by standardizing fields and ensuring data consistency before analysis.' },
    kpis: [
      { value: 5000, prefix: '', suffix: '', label: 'Total Admission' },
      { value: 4.5, prefix: '', suffix: ' days', label: 'Average Length of Stay' },
      { value: 98.87, prefix: 'Rp ', suffix: 'B', label: 'Total Revenue' },
    ],
    recommendation: 'Optimize resources in high-admission branches to balance operational workload and maintain service quality as the hospital handled 5,000 total admissions. - Improve patient flow in departments with longer Length of Stay (4.5 days on average) by reviewing treatment processes and discharge planning to increase bed availability. - Strengthen capacity planning and operational monitoring to sustain the hospital Rp98.87B total revenue while supporting future growth in patient demand.',
    deckUrl: 'https://docs.google.com/presentation/d/1dpqZSY-sDrra_GLHRqmuznduNcrwMsy0jv1twIRMs18/edit?usp=drive_link',
  },
  data5: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'E-Commerce Campaign Performance Analysis',
    tools: ['Spreadsheet', 'Power BI'],
    location: 'RevoU — Full Stack Data Analytics',
    scope: {
      dataset: 'E-Commerce Promotional Campaign Dataset',
      industry: 'E-Commerce / Retail',
      duration: '3 days',
      role: 'Marketing Data Analyst',
      source: 'RevoU Case Study Dataset',
      rows: '10,098  rows',
    },
    background: 'Analyze promotional campaign performance to evaluate revenue generation, transaction volume, product category contribution, and discount efficiency. The analysis aims to identify high-performing campaigns and provide data-driven recommendations for optimizing future marketing strategies.',
    processLabels: ['Raw Dataset', 'Data Cleaning & Transformation'],
    hero: { img: 'images/portfolio-analytics-5a.JPG', caption: '✏️ Caption hero dashboard' },
    workflow: ['Data Collection', 'Data Cleaning (Spreadsheet)', 'Campaign Analysis', 'Dashboard (Power BI)', 'Insight & Recommendation'],
    sql: { img: 'images/portfolio-analytics-5b.JPG', caption: 'Raw transactional dataset exported prior to data cleaning and standardization.' },
    python: { img: 'images/portfolio-analytics-5c.JPG', caption: 'Cleaned and transformed the dataset by formatting fields, calculating Total Revenue, and improving data consistency for analysis.' },
    kpis: [
      { value: 45.69, prefix: 'Rp ', suffix: 'bn', label: 'Total Revenue' },
      { value: 10.098, prefix: '', suffix: 'K', label: 'Total Transaction' },
      { value: 13, prefix: '', suffix: 'K', label: 'Total Quantity' },
    ],
    recommendation: 'Prioritize the 11.11 campaign strategy for future promotions. - Focus discounts on high-performing product categories. - Improve average order value through bundling and cross-selling.',
    deckUrl: 'https://docs.google.com/presentation/d/16-FPB8esfL2V874bO87eiOSicbq7mivneWkD5yEBhro/edit?usp=drive_link',
  },
  data6: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'Dieshop Production Monitoring Dashboard',
    tools: ['Excel'],
    location: 'Mega Persada Group',
    scope: {
      dataset: 'Die Production Progress & Machining Master Dataset',  
      industry: 'Manufacturing – Aluminum Extrusion Dies',
      duration: '2 weeks',
      role: 'Operation Data Analyst',
      source: 'Internal Manufacturing Database (Dies Shop Production Records & Machining Master)',
      rows: 'Progress: 30,045 rows • Component Time: 5,946 rows • Act Time: 1,613 rows • Work Time: 143 rows • Set Time: 52 rows',
    },
    background: 'Develop a data-driven manufacturing capacity model to estimate monthly die production capacity by analyzing historical machining activities, identifying bottleneck processes, and calculating production capacity at the section level. The project also integrates engineering master data to improve data completeness and provide more reliable capacity planning.',
    processLabels: ['Raw Operator Form', 'Machine & Operator Hour Calculation'],
    hero: { img: 'images/portfolio-analytics-6a.JPG', caption: '✏️ Caption hero dashboard' },
    workflow: ['Data Collection', 'Data Cleaning', 'Table Join (3 different template table)', 'Analyzing problem', 'Dashboard Visualization'],
    sql: { img: 'images/portfolio-analytics-6b.JPG', caption: 'Raw data from Operator Progress Form' },
    python: { img: 'images/portfolio-analytics-6c.JPG', caption: 'Calculating Machine and Operator Hours work' },
    kpis: [
      { value: 14, prefix: '', suffix: ' Jobs', label: 'Total Jobs' },
      { value: 100.2, prefix: '', suffix: ' Jam', label: 'Total Hours' },
      { value: 13, prefix: '', suffix: ' Jam', label: 'Avg. Daily Hours' },
    ],
    recommendation: 'Standardize machining data collection to reduce missing values and improve capacity estimation accuracy. - Focus process improvement on bottleneck operations with the highest machining time to increase production throughput. - Integrate the capacity model into production planning to support scheduling decisions and resource utilization.',
    deckUrl: '#',
  },
};

/* ══════════════════════════════════════════
   TOOL COLORS
══════════════════════════════════════════ */
const TOOL_COLORS = {
  // Data tools
  'Excel':       { bg: 'rgba(33,115,70,0.15)',  border: 'rgba(33,115,70,0.35)',  text: '#21B366' },
  'Tableau':     { bg: 'rgba(31,119,180,0.15)', border: 'rgba(31,119,180,0.35)', text: '#4B9CD3' },
  'Power BI':    { bg: 'rgba(243,151,0,0.15)',  border: 'rgba(243,151,0,0.35)',  text: '#F39700' },
  'Python':      { bg: 'rgba(55,118,171,0.15)', border: 'rgba(55,118,171,0.35)', text: '#4B8BBE' },
  'Pandas':      { bg: 'rgba(55,118,171,0.12)', border: 'rgba(55,118,171,0.3)',  text: '#4B8BBE' },
  'Numpy':       { bg: 'rgba(77,155,211,0.12)', border: 'rgba(77,155,211,0.3)',  text: '#4D9BD3' },
  'Matplotlib':  { bg: 'rgba(17,119,187,0.12)', border: 'rgba(17,119,187,0.3)',  text: '#1177BB' },
  'SQL':         { bg: 'rgba(0,112,186,0.15)',  border: 'rgba(0,112,186,0.35)',  text: '#0070BA' },
  'Spreadsheet': { bg: 'rgba(15,157,88,0.15)',  border: 'rgba(15,157,88,0.35)',  text: '#0F9D58' },
  // Engineering tools
  'CATIA':       { bg: 'rgba(0,88,163,0.15)',   border: 'rgba(0,88,163,0.35)',   text: '#0058A3' },
  'SolidWorks':  { bg: 'rgba(220,30,30,0.15)',  border: 'rgba(220,30,30,0.35)',  text: '#DC1E1E' },
  'AutoCAD':     { bg: 'rgba(226,30,34,0.15)',  border: 'rgba(226,30,34,0.35)',  text: '#E21E22' },
  'Inventor':    { bg: 'rgba(240,130,0,0.15)',  border: 'rgba(240,130,0,0.35)',  text: '#F08200' },
  'ANSYS':       { bg: 'rgba(255,179,0,0.15)',  border: 'rgba(255,179,0,0.35)',  text: '#FFB300' },
  'Fusion 360':  { bg: 'rgba(255,100,0,0.15)',  border: 'rgba(255,100,0,0.35)',  text: '#FF6400' },
};

function getToolStyle(tool) {
  const c = TOOL_COLORS[tool];
  if (c) return `background:${c.bg};border:1px solid ${c.border};color:${c.text}`;
  // fallback — use current accent
  return `background:var(--data-dim);color:var(--data);border:1px solid var(--data-mid)`;
}

function getToolStyleEng(tool) {
  const c = TOOL_COLORS[tool];
  if (c) return `background:${c.bg};border:1px solid ${c.border};color:${c.text}`;
  return `background:var(--eng-dim);color:var(--eng);border:1px solid var(--eng-mid)`;
}

function csFigure(fig, fallbackLabel) {
  const body = fig?.img
    ? `<img src="${fig.img}" alt="${fallbackLabel}">`
    : `<div class="cs-figure-ph">🖼️ ${fallbackLabel}</div>`;
  return `<div class="cs-figure">${body}</div>`;
}

function renderEngineeringModal(d) {
  const toolsHTML = d.tools.map(t =>
    `<span class="cs-tool-chip" style="${getToolStyleEng(t)}">${t}</span>`
  ).join('');

  const imagesHTML = d.images.map(im => `
    <div class="cs-block">
      ${csFigure(im.img ? { img: im.img } : null, im.title)}
      <span class="cs-figure-title">${im.title}</span>
      <p class="cs-figure-caption">${im.caption}</p>
    </div>
  `).join('');

  const infoHTML = Object.entries(d.info).map(([k, v]) => `
    <span class="cs-info-key">${k}</span>
    <span class="cs-info-val">${v}</span>
  `).join('');

  return `
    <p class="cs-eyebrow" style="color:${d.color}">${d.type}</p>
    <h2 class="cs-title">${d.title}</h2>
    <div class="cs-tools">${toolsHTML}</div>

    <div class="cs-block">
      ${csFigure(d.hero.img ? { img: d.hero.img } : null, '3D Assembly Render')}
      <p class="cs-figure-caption" style="text-align:center">${d.hero.caption}</p>
    </div>

    <div class="cs-block">
      <span class="cs-label">Project Overview</span>
      <p class="cs-text">${d.overview}</p>
    </div>

    ${imagesHTML}

    <div class="cs-block">
      <span class="cs-label">Technical Information</span>
      <div class="cs-info-table">${infoHTML}</div>
    </div>

    <div class="cs-block">
      <span class="cs-label" style="color:${d.color}">Result</span>
      <div class="cs-recommend" style="border-color:var(--eng-mid);background:var(--eng-dim)">
        <p class="cs-text">${d.result}</p>
      </div>
    </div>
  `;
}

function renderDataModal(d, modalId) {
  const toolsHTML = d.tools.map(t =>
    `<span class="cs-tool-chip" style="${getToolStyle(t)}">${t}</span>`
  ).join('');

  const kpiHTML = d.kpis.map((k, i) => `
    <div class="cs-kpi-item">
      <span class="cs-kpi-num" style="color:${d.color}" data-target="${k.value}" data-prefix="${k.prefix}" data-suffix="${k.suffix}">${k.prefix}0${k.suffix}</span>
      <span class="cs-kpi-label">${k.label}</span>
    </div>
  `).join('');

  // Project Scope section
  const scopeHTML = d.scope ? `
    <div class="cs-block">
      <span class="cs-label">Project Scope</span>
      <div class="cs-scope-grid">
        ${d.scope.dataset ? `<div class="cs-scope-item"><span class="cs-scope-key">Dataset</span><span class="cs-scope-val">${d.scope.dataset}</span></div>` : ''}
        ${d.scope.industry ? `<div class="cs-scope-item"><span class="cs-scope-key">Industry</span><span class="cs-scope-val">${d.scope.industry}</span></div>` : ''}
        ${d.scope.duration ? `<div class="cs-scope-item"><span class="cs-scope-key">Duration</span><span class="cs-scope-val">${d.scope.duration}</span></div>` : ''}
        ${d.scope.role ? `<div class="cs-scope-item"><span class="cs-scope-key">Role</span><span class="cs-scope-val">${d.scope.role}</span></div>` : ''}
        ${d.scope.source ? `<div class="cs-scope-item"><span class="cs-scope-key">Data Source</span><span class="cs-scope-val">${d.scope.source}</span></div>` : ''}
        ${d.scope.rows ? `<div class="cs-scope-item"><span class="cs-scope-key">Rows</span><span class="cs-scope-val">${d.scope.rows}</span></div>` : ''}
      </div>
    </div>
  ` : '';

  // Background section
  const backgroundHTML = d.background ? `
    <div class="cs-block">
      <span class="cs-label">Background</span>
      <p class="cs-text">${d.background}</p>
    </div>
  ` : '';

  // Process detail — use custom labels if available
  const proc1Label = d.processLabels?.[0] || 'Process Detail 1';
  const proc2Label = d.processLabels?.[1] || 'Process Detail 2';

  return `
    <p class="cs-eyebrow" style="color:${d.color}">${d.type}</p>
    <h2 class="cs-title">${d.title}</h2>
    ${d.location ? `<div class="cs-location-badge">📍 ${d.location}</div>` : ''}
    <div class="cs-tools">${toolsHTML}</div>

    ${scopeHTML}
    ${backgroundHTML}

    <div class="cs-block">
      <span class="cs-label">Hero Dashboard</span>
      ${csFigure(d.hero.img ? { img: d.hero.img } : null, 'Dashboard screenshot')}
      <p class="cs-figure-caption">${d.hero.caption}</p>
    </div>

    <div class="cs-block">
      <span class="cs-label">Workflow</span>
      ${Array.isArray(d.workflow)
        ? `<div class="cs-workflow">
            ${d.workflow.map((step, i) => `
              <div class="cs-wf-step">
                <div class="cs-wf-num" style="background:var(--data-dim);border:1px solid var(--data-mid);color:${d.color}">${i + 1}</div>
                <div class="cs-wf-label">${step}</div>
              </div>
              ${i < d.workflow.length - 1 ? `<div class="cs-wf-arrow" style="color:${d.color}">→</div>` : ''}
            `).join('')}
          </div>`
        : `${csFigure(d.workflow.img ? { img: d.workflow.img } : null, 'Workflow diagram')}
           <p class="cs-figure-caption">${d.workflow.caption || ''}</p>`
      }
    </div>

    <div class="cs-block">
      <span class="cs-label">Process Detail</span>
      <div class="cs-figure-grid">
        <div>
          <p class="cs-figure-sublabel">${proc1Label}</p>
          ${csFigure(d.sql.img ? { img: d.sql.img } : null, proc1Label)}
          <p class="cs-figure-caption">${d.sql.caption}</p>
        </div>
        <div>
          <p class="cs-figure-sublabel">${proc2Label}</p>
          ${csFigure(d.python.img ? { img: d.python.img } : null, proc2Label)}
          <p class="cs-figure-caption">${d.python.caption}</p>
        </div>
      </div>
    </div>

    <div class="cs-block">
      <span class="cs-label">Key Results</span>
      <div class="cs-kpi-strip" id="csKpiStrip-${modalId}">${kpiHTML}</div>
    </div>

    <div class="cs-block">
      <span class="cs-label" style="color:${d.color}">Recommendation</span>
      <div class="cs-recommend" style="border-color:var(--data-mid);background:var(--data-dim)">
        ${(() => {
          const items = Array.isArray(d.recommendation)
            ? d.recommendation
            : d.recommendation.split(' - ').filter(s => s.trim());
          return `<ul style="display:flex;flex-direction:column;gap:0.5rem;list-style:none;padding:0">
            ${items.map(r => `
              <li style="display:flex;gap:0.75rem;align-items:flex-start;font-size:0.875rem;color:var(--muted);line-height:1.65">
                <span style="color:${d.color};flex-shrink:0;margin-top:0.1rem">›</span>
                <span>${r.trim()}</span>
              </li>`).join('')}
          </ul>`;
        })()}
      </div>
    </div>

    <div class="cs-block">
      <a class="cs-deck-btn" href="${d.deckUrl}" target="_blank" rel="noopener" style="border-color:${d.color};color:${d.color}">
        View full deck ↗
      </a>
    </div>
  `;
}

function openModal(id) {
  const d = MODALS[id];
  if (!d) return;

  const html = d.type === 'Engineering'
    ? renderEngineeringModal(d)
    : renderDataModal(d, id);

  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modalOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Trigger KPI count-up animation for data analytics modals
  if (d.type !== 'Engineering') {
    const strip = document.getElementById(`csKpiStrip-${id}`);
    if (strip) {
      strip.querySelectorAll('.cs-kpi-num').forEach(el => animateCounter(el));
    }
  }
}

function closeModal() {
  document.getElementById('modalOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ──────────────────────────────────────────
   KPI COUNTER ANIMATION
────────────────────────────────────────── */
function animateCounter(el) {
  const target  = parseFloat(el.getAttribute('data-target'));
  const prefix  = el.getAttribute('data-prefix') || '';
  const suffix  = el.getAttribute('data-suffix') || '';
  const duration = 1400; // ms
  const start = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = prefix + target + suffix;
  }

  requestAnimationFrame(step);
}

function initKPI() {
  const strip = document.querySelector('.kpi-strip');
  if (!strip) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        strip.querySelectorAll('.kpi-num').forEach(el => animateCounter(el));
        obs.unobserve(strip);
      }
    });
  }, { threshold: 0.4 });

  obs.observe(strip);
}

/* ──────────────────────────────────────────
   SCROLL REVEAL
────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll(
    '.pcard, .exp-card, .tl-item, .cert-card, .about-quick, .about-text-col'
  );
  els.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // slight stagger for grid items
        setTimeout(() => entry.target.classList.add('show'), i * 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ──────────────────────────────────────────
   INIT
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initKPI();

  // Auto-select cert tab from URL hash (e.g. certificates.html#data-analytics)
  if (document.getElementById('certPanelEng')) {
    if (window.location.hash === '#data-analytics') {
      switchCertTab('data');
    } else {
      switchCertTab('eng');
    }
  }
});

/* ══════════════════════════════════════════
   ENGINEERING PROJECTS DATA
   ✏️ Edit semua data project di sini
══════════════════════════════════════════ */
const ENG_PROJECTS = {

  /* ── DIES: EXTRUSION ── */
  extrusion: [
    {
      id: 'ex1',
      title: 'Aluminium Profile Extrusion Die — Type A',
      tags: ['Dies', 'Extrusion'],
      tools: ['CATIA', 'Inventor', 'AutoCAD'],
      img: '',   // 🖼️ ganti: 'images/ex1.jpg'
      overview: '✏️ Deskripsi singkat project ini.',
      technical: {
        material: '✏️ mis: H13 Tool Steel',
        hardness: '✏️ mis: 48-52 HRC',
        dimension: '✏️ mis: Ø180 × 120 mm',
        profile: '✏️ mis: L-Shape 40×40mm',
      },
      process: {
        roughing: ['CNC Milling', 'CNC Lathe', '✏️ tambah proses'],
        hardening: '✏️ mis: 3 days — vacuum hardening at 1020°C',
        finishing: ['EDM Drill', 'EDM Wirecut', '✏️ tambah proses'],
      },
      highlights: [
        '✏️ Engineering highlight 1',
        '✏️ Engineering highlight 2',
        '✏️ Engineering highlight 3',
      ],
      drawingUrl: '#',   // 🔗 ganti: link Google Drive PDF drawing
      render3d: '',      // 🖼️ ganti: 'images/ex1-3d.jpg'
      exploded: '',      // 🖼️ ganti: 'images/ex1-exploded.jpg'
    },
    // ✏️ Tambah project extrusion lainnya dengan format yang sama
    {
      id: 'ex2',
      title: '✏️ Extrusion Die ke-2',
      tags: ['Dies', 'Extrusion'],
      tools: ['✏️ Tool'],
      img: '',
      overview: '✏️ Overview.',
      technical: { material: '✏️', hardness: '✏️', dimension: '✏️', profile: '✏️' },
      process: { roughing: ['✏️'], hardening: '✏️', finishing: ['✏️'] },
      highlights: ['✏️'],
      drawingUrl: '#',
      render3d: '',
      exploded: '',
    },
  ],

  /* ── DIES: STAMPING ── */
  stamping: [
    {
      id: 'st1',
      title: '✏️ Stamping Die ke-1',
      tags: ['Dies', 'Stamping'],
      tools: ['CATIA', 'AutoCAD'],
      img: '',
      overview: '✏️ Overview stamping die.',
      technical: { material: '✏️', hardness: '✏️', dimension: '✏️', profile: '✏️' },
      process: { roughing: ['✏️'], hardening: '✏️', finishing: ['✏️'] },
      highlights: ['✏️'],
      drawingUrl: '#',
      render3d: '',
      exploded: '',
    },
  ],

  /* ── FURNITURE ── */
  furniture: [
    {
      id: 'fu1',
      title: '✏️ Nama Project Furniture',
      tags: ['Furniture'],
      tools: ['✏️ Tool'],
      img: '',
      overview: '✏️ Overview project furniture.',
      technical: { material: '✏️', dimension: '✏️', finish: '✏️' },
      process: { steps: ['✏️ Step 1', '✏️ Step 2', '✏️ Step 3'] },
      highlights: ['✏️ Highlight 1', '✏️ Highlight 2'],
      drawingUrl: '#',
      render3d: '',
      exploded: '',
    },
  ],

  /* ── INDUSTRIAL TOOLING ── */
  tooling: [
    {
      id: 'tl1',
      title: '✏️ Nama Tool ke-1',
      tags: ['Industrial Tooling'],
      tools: ['✏️ Tool'],
      img: '',
      overview: '✏️ Overview.',
      technical: { material: '✏️', hardness: '✏️', dimension: '✏️' },
      process: { steps: ['✏️ Step 1', '✏️ Step 2', '✏️ Step 3'] },
      highlights: ['✏️ Highlight 1'],
      drawingUrl: '#',
      render3d: '',
      exploded: '',
    },
  ],

  /* ── NAVAL ── */
  naval: [
    {
      id: 'nv1',
      title: '✏️ Nama Naval Project',
      tags: ['Naval Project'],
      tools: ['✏️ Tool'],
      img: '',
      overview: '✏️ Overview project naval dari kampus.',
      technical: { type: '✏️', displacement: '✏️', length: '✏️', material: '✏️' },
      process: { steps: ['✏️ Step 1', '✏️ Step 2', '✏️ Step 3'] },
      highlights: ['✏️ Highlight 1'],
      drawingUrl: '#',
      render3d: '',
      exploded: '',
    },
  ],

  /* ── SHOWCASE ── */
  showcase: [
    {
      id: 'sc1',
      title: 'Pipe Clamp Rack',
      tags: ['Showcase'],
      tools: ['SolidWorks'],
      img: '',
      overview: '3D model of a pipe clamp rack designed as a personal learning project, following online tutorials.',
      technical: { material: '✏️', dimension: '✏️' },
      process: { steps: ['Reference & Concept', '3D Modelling', 'Rendering'] },
      highlights: ['Self-initiated learning project', '✏️ Highlight 2'],
      drawingUrl: '#',
      render3d: '',
      exploded: '',
    },
    {
      id: 'sc2',
      title: 'Industrial Robot Arm',
      tags: ['Showcase'],
      tools: ['✏️ Tool'],
      img: '',
      overview: '✏️ Overview robot arm.',
      technical: { material: '✏️', dimension: '✏️' },
      process: { steps: ['✏️ Step 1', '✏️ Step 2'] },
      highlights: ['✏️ Highlight 1'],
      drawingUrl: '#',
      render3d: '',
      exploded: '',
    },
  ],
};

/* ══════════════════════════════════════════
   CATEGORY NAVIGATION
══════════════════════════════════════════ */
let currentCat = null;
let currentSub = null;

function selectCategory(cat) {
  currentCat = cat;
  currentSub = null;

  document.querySelector('.eng-category-section').style.display = 'none';
  document.getElementById('engProjectsSection').style.display = 'block';

  const subcatBar = document.getElementById('subcatBar');
  if (cat === 'dies') {
    subcatBar.classList.remove('hidden');
    selectSubCat('dies', 'extrusion');
    return;
  } else {
    subcatBar.classList.add('hidden');
  }

  const catLabels = { furniture:'Furniture', tooling:'Industrial Tooling', naval:'Naval Project', showcase:'Showcase' };
  document.getElementById('breadcrumbCat').textContent = catLabels[cat] || cat;
  document.getElementById('breadcrumbSub').textContent = '';

  renderEngProjects(ENG_PROJECTS[cat] || []);
  window.scrollTo({ top: document.getElementById('engProjectsSection').offsetTop - 80, behavior: 'smooth' });
}

function selectSubCat(cat, sub) {
  currentCat = cat;
  currentSub = sub;

  // Always make sure panels are in correct state
  const catSection = document.querySelector('.eng-category-section');
  const projSection = document.getElementById('engProjectsSection');
  const subcatBar = document.getElementById('subcatBar');

  if (catSection) catSection.style.display = 'none';
  if (projSection) projSection.style.display = 'block';
  if (subcatBar) subcatBar.classList.remove('hidden');

  document.getElementById('subcatExtrusion')?.classList.toggle('active', sub === 'extrusion');
  document.getElementById('subcatStamping')?.classList.toggle('active', sub === 'stamping');

  document.getElementById('breadcrumbCat').textContent = 'Dies';
  document.getElementById('breadcrumbSub').textContent = ' › ' + (sub === 'extrusion' ? 'Extrusion' : 'Stamping');

  renderEngProjects(ENG_PROJECTS[sub] || []);
  window.scrollTo({ top: document.getElementById('engProjectsSection').offsetTop - 80, behavior: 'smooth' });
}

function filterSubCat(sub) {
  selectSubCat('dies', sub);
}

function resetCategory() {
  currentCat = null;
  currentSub = null;
  document.querySelector('.eng-category-section').style.display = 'block';
  document.getElementById('engProjectsSection').style.display = 'none';
  window.scrollTo({ top: document.querySelector('.eng-category-section').offsetTop - 80, behavior: 'smooth' });
}

function renderEngProjects(projects) {
  const grid = document.getElementById('engProjectsGrid');
  if (!projects || projects.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--muted);padding:3rem 0;font-family:var(--font-mono);font-size:0.85rem">No projects yet in this category — coming soon.</div>`;
    return;
  }

  grid.innerHTML = projects.map(p => `
    <article class="pcard reveal">
      <div class="pcard-img ph-eng">
        ${p.img
          ? `<img src="${p.img}" alt="${p.title}">`
          : `<span>🖼️ ${p.title}</span>`
        }
      </div>
      <div class="pcard-body">
        <div class="pcard-tags">${p.tags.map(t => `<span class="tag eng-tag">${t}</span>`).join('')}</div>
        <h3>${p.title}</h3>
        <p>${p.overview}</p>
        <div class="pcard-tools">${p.tools.map(t => `<span style="${getToolStyleEng(t)}">${t}</span>`).join('')}</div>
        <button class="pcard-cta eng-cta" onclick="openEngModal('${p.id}')">Case Study →</button>
      </div>
    </article>
  `).join('');

  // Re-trigger reveal animation
  grid.querySelectorAll('.reveal').forEach(el => {
    setTimeout(() => el.classList.add('show'), 80);
  });
}

/* ══════════════════════════════════════════
   ENGINEERING MODAL
══════════════════════════════════════════ */
function openEngModal(id) {
  // Find project across all categories
  const all = Object.values(ENG_PROJECTS).flat();
  const p = all.find(x => x.id === id);
  if (!p) return;

  // Manufacturing process render
  let processHTML = '';
  if (p.process.roughing) {
    // Dies format: Roughing → Hardening → Finishing
    processHTML = `
      <div class="mfg-flow">
        <div class="mfg-stage">
          <div class="mfg-stage-label">Roughing</div>
          <div class="mfg-steps">
            ${p.process.roughing.map((s,i) => `
              <div class="mfg-step">
                <span class="mfg-num">${i+1}</span>
                <span>${s}</span>
              </div>
              ${i < p.process.roughing.length-1 ? '<div class="mfg-down">↓</div>' : ''}
            `).join('')}
          </div>
        </div>
        <div class="mfg-arrow-h">→</div>
        <div class="mfg-stage mfg-stage-heat">
          <div class="mfg-stage-label">Hardening</div>
          <div class="mfg-steps">
            <div class="mfg-step">
              <span class="mfg-num">H</span>
              <span>${p.process.hardening}</span>
            </div>
          </div>
        </div>
        <div class="mfg-arrow-h">→</div>
        <div class="mfg-stage">
          <div class="mfg-stage-label">Finishing</div>
          <div class="mfg-steps">
            ${p.process.finishing.map((s,i) => `
              <div class="mfg-step">
                <span class="mfg-num">${i+1}</span>
                <span>${s}</span>
              </div>
              ${i < p.process.finishing.length-1 ? '<div class="mfg-down">↓</div>' : ''}
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else if (p.process.steps) {
    // Other format: simple flow
    processHTML = `
      <div class="mfg-simple">
        ${p.process.steps.map((s,i) => `
          <div class="mfg-step-simple">
            <div class="mfg-step-num" style="background:var(--eng-dim);border:1px solid var(--eng-mid);color:var(--eng)">${i+1}</div>
            <div class="mfg-step-text">${s}</div>
          </div>
          ${i < p.process.steps.length-1 ? '<div class="mfg-arrow-simple" style="color:var(--eng)">→</div>' : ''}
        `).join('')}
      </div>
    `;
  }

  // Technical info
  const techHTML = Object.entries(p.technical).map(([k,v]) => `
    <div class="tech-row">
      <span class="tech-key">${k.charAt(0).toUpperCase()+k.slice(1)}</span>
      <span class="tech-val">${v}</span>
    </div>
  `).join('');

  // Render & exploded images
  const imgHTML = (p.render3d || p.exploded) ? `
    <div class="eng-modal-imgs">
      ${p.render3d ? `
        <div class="eng-modal-img-wrap">
          <img src="${p.render3d}" alt="3D Render">
          <span class="img-caption">3D Render</span>
        </div>` : ''}
      ${p.exploded ? `
        <div class="eng-modal-img-wrap">
          <img src="${p.exploded}" alt="Exploded View">
          <span class="img-caption">Exploded View</span>
        </div>` : ''}
    </div>
  ` : `
    <div class="eng-modal-imgs">
      <div class="eng-modal-img-wrap">
        <div class="pcard-img ph-eng" style="height:160px;border-radius:var(--r-md)"><span>🖼️ 3D Render — ganti dengan: render3d: 'images/...'</span></div>
        <span class="img-caption">3D Render</span>
      </div>
      <div class="eng-modal-img-wrap">
        <div class="pcard-img ph-eng" style="height:160px;border-radius:var(--r-md)"><span>🖼️ Exploded View — ganti dengan: exploded: 'images/...'</span></div>
        <span class="img-caption">Exploded View</span>
      </div>
    </div>
  `;

  document.getElementById('modalBody').innerHTML = `
    <div class="eng-modal-header">
      <div class="pcard-tags" style="margin-bottom:0.75rem">${p.tags.map(t=>`<span class="tag eng-tag">${t}</span>`).join('')}</div>
      <h2 class="eng-modal-title">${p.title}</h2>
      <div class="pcard-tools" style="margin-top:0.5rem">${p.tools.map(t=>`<span style="${getToolStyleEng(t)}">${t}</span>`).join('')}</div>
    </div>

    <div class="eng-modal-section">
      <h4 class="eng-modal-label">Overview</h4>
      <p class="cs-text">${p.overview}</p>
    </div>

    ${imgHTML}

    <div class="eng-modal-section">
      <h4 class="eng-modal-label">Technical Information</h4>
      <div class="tech-table">${techHTML}</div>
    </div>

    <div class="eng-modal-section">
      <h4 class="eng-modal-label">Manufacturing Process</h4>
      ${processHTML}
    </div>

    <div class="eng-modal-section">
      <h4 class="eng-modal-label">Engineering Highlights</h4>
      <ul class="eng-highlights">
        ${p.highlights.map(h=>`
          <li>
            <span class="highlight-dot" style="color:var(--eng)">›</span>
            <span>${h}</span>
          </li>`).join('')}
      </ul>
    </div>

    <div class="eng-modal-section">
      <a href="${p.drawingUrl}" target="_blank" class="drawing-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        View Technical Drawing (PDF) ↗
      </a>
    </div>
  `;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}