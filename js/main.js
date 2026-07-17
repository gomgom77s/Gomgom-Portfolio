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
    background: 'Segment RevoBank cardholders using RFM (Recency, Frequency, Monetary) analysis to identify high-value customer group, uncover growth opportunities, and provide actionable strategies to increase transaction activity and long-term revenue',
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
    hero: { img: 'images/portfolio-analytics-4a.JPG', caption: 'Hospital Monitoring Dashboard' },
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
    hero: { img: 'images/portfolio-analytics-5a.JPG', caption: 'Campaign & Category Perfomance Dashboard' },
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
      rows: '30,045 rows',
    },
    background: 'Develop a data-driven manufacturing capacity model to estimate monthly die production capacity by analyzing historical machining activities, identifying bottleneck processes, and calculating production capacity at the section level. The project also integrates engineering master data to improve data completeness and provide more reliable capacity planning.',
    processLabels: ['Raw Operator Form', 'Machine & Operator Hour Calculation'],
    hero: { img: 'images/portfolio-analytics-6a.JPG', caption: 'Diesshop Monitoring Diesboard' },
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
  'AutoCAD':     { bg: 'rgba(226,30,34,0.15)',  border: 'rgba(226,30,34,0.35)',  text: '#ca494b' },
  'Inventor':    { bg: 'rgba(240,130,0,0.15)',  border: 'rgba(240,130,0,0.35)',  text: '#F08200' },
  'ANSYS':       { bg: 'rgba(255,179,0,0.15)',  border: 'rgba(255,179,0,0.35)',  text: '#FFB300' },
  'Fusion 360':  { bg: 'rgba(255,100,0,0.15)',  border: 'rgba(255,100,0,0.35)',  text: '#FF6400' },
  'MasterCAM':   { bg: 'rgba(255,100,0,0.15)',  border: 'rgba(255,100,0,0.35)',  text: '#ff000079' },
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
  const hasImg = fig && fig.img && fig.img.trim().length > 0;
  const body = hasImg
    ? `<img src="${fig.img}" alt="${fallbackLabel}">`
    : `<div class="cs-figure-ph">🖼️ ${fallbackLabel}</div>`;
  return `<div class="cs-figure">${body}</div>`;
}

function renderEngineeringModal(d) {
  const toolsHTML = d.tools.map(t =>
    `<span class="cs-tool-chip" style="${getToolStyleEng(t)}">${t}</span>`
  ).join('');

  // First image = 3D isometric (hero slot → exploded view)
  // images[0] = 3D isometric, images[1] = technical drawing
  const img0 = d.images[0];
  const img1 = d.images[1];

  const twoImgHTML = `
    <div class="cs-block">
      <div class="cs-figure-grid">
        <div>
          ${csFigure(img0 && img0.img && img0.img.trim() ? { img: img0.img } : null, img0?.title || 'View 1')}
          <p class="cs-figure-caption" style="text-align:center">${img0?.caption || ''}</p>
          <span class="img-caption">${img0?.title || ''}</span>
        </div>
        <div>
          ${csFigure(img1 && img1.img && img1.img.trim() ? { img: img1.img } : null, img1?.title || 'View 2')}
          <p class="cs-figure-caption" style="text-align:center">${img1?.caption || ''}</p>
          <span class="img-caption">${img1?.title || ''}</span>
        </div>
      </div>
    </div>
  `;

  const infoHTML = Object.entries(d.info).map(([k, v]) => `
    <span class="cs-info-key">${k}</span>
    <span class="cs-info-val">${v}</span>
  `).join('');

  // Result — auto bullet if contains ' - '
  const resultItems = Array.isArray(d.result)
    ? d.result
    : d.result.split(' - ').filter(s => s.trim());
  const resultHTML = resultItems.length > 1
    ? `<ul style="display:flex;flex-direction:column;gap:0.5rem;list-style:none;padding:0">
        ${resultItems.map(r => `
          <li style="display:flex;gap:0.75rem;align-items:flex-start;font-size:0.875rem;color:var(--muted);line-height:1.65">
            <span style="color:${d.color};flex-shrink:0">›</span>
            <span>${r.trim()}</span>
          </li>`).join('')}
       </ul>`
    : `<p class="cs-text">${d.result}</p>`;

  return `
    <p class="cs-eyebrow" style="color:${d.color}">${d.type}</p>
    <h2 class="cs-title">${d.title}</h2>
    ${d.location ? `<div class="cs-location-badge">📍 ${d.location}</div>` : ''}
    <div class="cs-tools">${toolsHTML}</div>

    <div class="cs-block">
      <span class="cs-label">Overview</span>
      <p class="cs-text">${d.overview}</p>
    </div>

    <div class="cs-block">
      <span class="cs-label">${d.hero.title || 'Exploded View'}</span>
      ${csFigure(d.hero.img && d.hero.img.trim() ? { img: d.hero.img } : null, d.hero.title || 'Exploded View')}
      <p class="cs-figure-caption" style="text-align:center">${d.hero.caption}</p>
    </div>

    ${twoImgHTML}

    <div class="cs-block">
      <span class="cs-label">Technical Information</span>
      <div class="cs-info-table">${infoHTML}</div>
    </div>

    <div class="cs-block">
      <span class="cs-label" style="color:${d.color}">Result</span>
      <div class="cs-recommend" style="border-color:var(--eng-mid);background:var(--eng-dim)">
        ${resultHTML}
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

/* ── ENG ID MAP: homepage eng1/2/3 → ENG_PROJECTS ID ──
   ✏️ Ganti value dengan ID project dari ENG_PROJECTS yang mau ditampilkan di homepage top 3 */
const ENG_ID_MAP = {
  eng1: 'ex1',
  eng2: 'tl1',
  eng3: 'tl2',
};

function openModal(id) {
  // Redirect engineering IDs to openEngModal
  if (ENG_ID_MAP[id]) {
    openEngModal(ENG_ID_MAP[id]);
    return;
  }

  const d = MODALS[id];
  if (!d) return;

  const html = renderDataModal(d, id);
  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modalOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';

  const strip = document.getElementById(`csKpiStrip-${id}`);
  if (strip) strip.querySelectorAll('.cs-kpi-num').forEach(el => animateCounter(el));
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
      title: 'Extrusion Die Design — Section 8309',
      tags: ['Dies', 'Extrusion'],
      tools: ['AutoCAD', 'Solidworks', 'MasterCAM'],
      img: 'images/engineering-extrusion-1.JPG',   // 🖼️ ganti: 'images/ex1.jpg'
      overview: 'Redesigning an existing aluminium extrusion die from 750-ton press configuration to fit a 690-ton extrusion machine by proportionally adjusting the die dimensions while maintaining accuracy and manufaturing feasibility',
      technical: {
        material: 'SKD61',
        hardness: '48-52 HRC',
        dimension: 'Ø199 × 120 mm',
        profile: 'Semi-Hollow shape',
      },
      process: {
        roughing: ['Cutting','CNC Lathe', 'CNC Milling', 'Tapping & Hole for Pin', 'Marking'],
        hardening: 'Through hardening at 480-540°C',
        finishing: ['Manual Lathe', 'EDM Drill', 'EDM Wirecut', 'EDM Conventional','Assembly','Poleshing','Finishing Thickness','Surface Grinding' ],
      },
      highlights: [
        'Redesigned the die assembly to adapt a 750-ton press design for a 690-ton extrusion machine wile maintaining proportional geometry',
        'Optimized component dimensions to ensure assembly compatibility, manufacturability, and machining feasibility',
        'Produced complete engineering drawings for CNC machining, EDM processes and final die assembly',
      ],
      drawingUrl: '#',   // 🔗 ganti: link Google Drive PDF drawing
      drawingImg: '',  // 🖼️ path gambar technical drawing
      render3d: 'images/engineering-extrusion-1a.JPG', // 🖼️ ganti: 'images/ex1-3d.jpg'
      exploded: 'images/engineering-extrusion-1b.JPG', // 🖼️ ganti: 'images/ex1-exploded.jpg'
      img1Caption:'3D Isometric Exploded view',
      img2Caption:'Technical Drawing ',
    },
    // ✏️ Tambah project extrusion lainnya dengan format yang sama
    {
      id: 'ex2',
      title: 'Extrusion Die Design – Section ',
      tags: ['Dies', 'Extrusion'],
      tools: ['AutoCAD', 'Solidworks', 'MasterCAM'],
      img: 'images/engineering-extrusion-2.JPG',
      overview: 'Designed an aluminium extrusion die for profile production, including 3D CAD modelling, detailed manufacturing drawings, and assembly documentation. The project focused on ensuring dimensional accuracy, manufacturability, and reliable die assembly for production.',
      technical: { material: 'SKD61 Tool Steel', hardness: '48-52HRC', dimension: 'Ø150 × 100', profile: 'Hollow Shape' },
      process: { roughing: ['Cutting','CNC Lathe', 'CNC Milling', 'Tapping & Hole for Pin', 'Marking'], hardening: 'Through hardening at 480-540°C', finishing: ['Manual Lathe', 'EDM Drill', 'EDM Wirecut', 'EDM Conventional','Assembly','Poleshing','Finishing Thickness','Surface Grinding'] },
      highlights: [
        'Developed a complete die assembly including 3D models and detailed manufacturing drawings for production.',
        'Designed precision profile geometry to achieve dimensional accuracy and stable aluminium extrusion.',
        'Prepared manufacturing-ready documentation to support CNC machining, EDM processing, heat treatment, and final assembly.'
      ],
      drawingUrl: '#',
      drawingImg: '',  // 🖼️ path gambar technical drawing
      render3d: 'images/engineering-extrusion-2a.JPG',
      exploded: 'images/engineering-extrusion-2b.JPG',
      img1Caption:'3D IsometricExploded view',
      img2Caption:'Technical Drawing ',
    },

     {
      id: 'ex3',
      title: 'Extrusion Die Design – Section ',
      tags: ['Dies', 'Extrusion'],
      tools: ['AutoCAD', 'Solidworks', 'MasterCAM'],
      img: 'images/engineering-extrusion-3.JPG',
      overview: 'Designed an aluminium extrusion die for profile production, including 3D CAD modelling, detailed manufacturing drawings, and assembly documentation. The project focused on ensuring dimensional accuracy, manufacturability, and reliable die assembly for production.',
      technical: { material: 'SKD61 Tool Steel', hardness: '48-52HRC', dimension: 'Ø150mm × 100mm', profile: 'Hollow Shape' },
      process: { roughing: ['Cutting','CNC Lathe', 'CNC Milling', 'Tapping & Hole for Pin', 'Marking'], hardening: 'Through hardening at 480-540°C', finishing: ['Manual Lathe', 'EDM Drill', 'EDM Wirecut', 'EDM Conventional','Assembly','Poleshing','Finishing Thickness','Surface Grinding'] },
      highlights: [
        'Developed a complete die assembly including 3D models and detailed manufacturing drawings for production.',
        'Designed precision profile geometry to achieve dimensional accuracy and stable aluminium extrusion.',
        'Prepared manufacturing-ready documentation to support CNC machining, EDM processing, heat treatment, and final assembly.'
      ],
      drawingUrl: '#',
      drawingImg: '',  // 🖼️ path gambar technical drawing
      render3d: 'images/engineering-extrusion-3a.JPG',
      exploded: 'images/engineering-extrusion-3b.JPG',
      img1Caption:'3D Isometric Exploded view',
      img2Caption:'Technical Drawing ',
    },
  ],

  /* ── DIES: STAMPING ── */
  stamping: [
    {
      id: 'st1',
      title: 'Progressive Stamping Die – Blanking & Piercing',
      tags: ['Dies', 'Stamping'],
      tools: ['AutoCAD'],
      img: 'images/engineering-stamping-1.JPG',
      overview: 'Designed a progressive stamping die for blanking and piercing operations, including strip layout development, die assembly, and manufacturing drawings. The project focused on ensuring accurate strip progression, component alignment, and reliable production performance.',
      technical: { die_type: 'Progressive Blank-Pierce', material: 'SKD11', hardness: '58-62 HRC', dimension: '280mm x 470mm x500mm' },
      process: { roughing: ['Facing', 'CNC Milling', 'Drilling'], hardening: 'Hardening(1000-1050°C), Tempering(150-200°C) ', finishing: ['Wirecut', 'Grinding', 'Reamer', 'Final Assembly'] },
      highlights: [
        'Developed the progressive strip layout to ensure consistent material progression and efficient blanking and piercing operations.',
        'Designed the complete die assembly with accurate alignment of punches, die inserts, guide components, and fastening elements.',
        'Produced manufacturing drawings to support machining, assembly, and production of the progressive die.'
      ],
      drawingUrl: '#',
      drawingImg: '',  // 🖼️ path gambar technical drawing
      render3d: 'images/engineering-stamping-1a.JPG',
      exploded: 'images/engineering-stamping-1b.JPG',
      img1Caption:'Top view',
      img2Caption:'Sheet Metal Plan ',
    },

        {
      id: 'st2',
      title: 'Stamping Die – Bending & Pierce',
      tags: ['Dies', 'Stamping'],
      tools: ['AutoCAD'],
      img: 'images/engineering-stamping-2.JPG',
      overview: 'Developed a progressive stamping die that combines piercing and bending operations within a single tooling system. The project included strip layout development, die assembly design, and manufacturing drawings to ensure accurate part forming, tooling alignment, and production reliability.',
      technical: { die_type: 'Bending-Pierce', material: 'SKD11', hardness: '58-62 HRC', dimension: '280mm x 300mm x 610mm' },
      process: { roughing: ['Facing', 'CNC Milling', 'Drilling'], hardening: 'Hardening(1000-1050°C), Tempering(150-200°C) ', finishing: ['Wirecut', 'Grinding', 'Reamer', 'Final Assembly']  },
      highlights: [
        'Integrated bending and piercing operations into a progressive die to support efficient continuous production.',
        'Designed tooling components with accurate alignment to ensure stable forming and dimensional consistency.',
        'Prepared complete die assembly and manufacturing drawings for machining, assembly, and production.',

      ],
      drawingUrl: '#',
      drawingImg: '',  // 🖼️ path gambar technical drawing
      render3d: 'images/engineering-stamping-2a.JPG',
      exploded: 'images/engineering-stamping-2b.JPG',
      img1Caption:'Top view',
      img2Caption:'Part Flow Process ',
    },

        {
      id: 'st3',
      title: 'Progressive Bending, Piercing & Trimming Die',
      tags: ['Dies', 'Stamping'],
      tools: ['AutoCAD'],
      img: 'images/engineering-stamping-3.JPG',
      overview: 'Developed a progressive stamping die integrating piercing, bending, and trimming operations within a single tooling system. The design included strip layout development, die assembly, and manufacturing drawings to ensure accurate part formation, trimming quality, and stable progressive production.',
      technical: { die_type: 'Progressive Blank-Pierce-Trim', material: 'SKD11', hardness: '58-62 HRC', dimension: '320mm x 350mm x 660mm' },
      process: { roughing: ['Facing', 'CNC Milling', 'Drilling'], hardening: 'Hardening(1000-1050°C), Tempering(150-200°C) ', finishing: ['Wirecut', 'Grinding', 'Reamer', 'Final Assembly']  },
      highlights: [
        'Integrated piercing, bending, and trimming operations into a single progressive die to support efficient multi-stage manufacturing.',
        'Designed the strip layout and die assembly to maintain accurate strip progression, tooling alignment, and dimensional consistency throughout the forming process.',
        'Prepared complete manufacturing drawings to support machining, die assembly, and production implementation.',
        ],
      drawingUrl: '#',
      drawingImg: '',  // 🖼️ path gambar technical drawing
      render3d: 'images/engineering-stamping-3a.JPG',
      exploded: 'images/engineering-stamping-3b.JPG',
      img1Caption:'Top view',
      img2Caption:'Part View ',
    },
  ],

  /* ── FURNITURE ── */
  furniture: [
    {
      id: 'fu1',
      title: 'Contemporary Lounge Chair Design',
      tags: ['Furniture', 'Chair'],
      tools: ['CATIA'],
      img: 'images/engineering-frnt-1.JPG',
      overview: 'Designed a contemporary lounge chair during my experience in the furniture manufacturing industry. The project involved 3D CAD modelling, assembly development, and detailed engineering drawings, with consideration for ergonomics, structural stability, and manufacturing feasibility.',
      technical: { product: 'Lounge Chair', material: 'Solid Wood', manufacturing: 'Woodworking & Assembly' },
      process: { steps: ['Band Saw', 'CNC Router', 'Drill', 'Finishing'] },
      highlights: [
        'Developed a complete furniture assembly including structural frame, upholstery components, and armrests.',
        'Applied ergonomic considerations to improve seating comfort and user experience.',
        'Produced detailed manufacturing drawings to support fabrication and assembly.'
      ],
      drawingUrl: '#',
      drawingImg: '',  // 🖼️ path gambar technical drawing
      render3d: 'images/engineering-frnt-2.JPG',
      exploded: 'images/engineering-frnt-2b.JPG',
    },

    {
      id: 'fu2',
      title: 'Modern Side Table Design',
      tags: ['Furniture', 'Table'],
      tools: ['CATIA'],
      img: 'images/engineering-frnt-3.JPG',
      overview: 'Developed a modern side table as a personal 3D CAD modelling exercise to strengthen assembly modelling and mechanical drafting skills. The project focused on clean structural design, dimensional accuracy, and realistic product visualization.',
      technical: { product: 'Side Table', material: 'Stainless Steel, Tempered Glass', manufacturing: 'Assembly' },
      process: { steps: ['Miter Saw & Hack Saw', 'Welding', 'Finishing'] },
      highlights: [
        'Created a complete 3D assembly with structural frame and glass panel integration.',
        'Designed a symmetrical frame structure to achieve both rigidity and aesthetic balance.',
        'Prepared production-ready drawings for fabrication and assembly.',
      ],
      drawingUrl: '#',
      drawingImg: '',  // 🖼️ path gambar technical drawing
      render3d: 'images/engineering-frnt-3a.JPG',
      exploded: 'images/engineering-frnt-3b.JPG',
      img1Caption:'Top view',
      img2Caption:'Side View ',
    },
  ],

  /* ── INDUSTRIAL TOOLING ── */
  tooling: [
    {
      id: 'tl1',
      title: 'Industrial Tooling - Bracket Recipricator',
      tags: ['Industrial Tooling'],
      tools: ['SolidWorks', 'MasterCAM'],
      img: 'images/engineering-tools-1a.JPG',
      overview: 'Designed a custom reciprocator bracket for the Powder Coating division, replacing the previous manufacturing approach with a billet aluminium design to improve cost efficiency. The project included 3D CAD modeling, detailed engineering drawings, and design optimization for CNC machining.',
      technical: { material: 'Aluminium Billet', application: 'Powder Coating Equipment', duration:'1 week', dimension: '212mm x 74.3mm' },
      process: { steps: ['Manual Lathe', 'CNC Milling', 'EDM Wirecut', 'CNC Milling', 'Reamer'] },
      highlights: [
        'Redesigned the bracket using aluminium billet to reduce manufacturing costs while maintaining structural functionality.',
        'Optimized the geometry for efficient CNC machining and simplified production.',
        'Prepared complete 3D models and engineering drawings to support manufacturing and assembly.'
      ],
      drawingUrl: '#',
      drawingImg: '',  // 🖼️ path gambar technical drawing
      render3d: 'images/engineering-tools-1.JPG',
      exploded: 'images/engineering-tools-1b.JPG',
      img1Caption:'Billet Visualization',
      img2Caption:'Technical Drawing',
    },

    {
      id: 'tl2',
      title: 'Crane Apparatus Bracket(Self-Project)',
      tags: ['Industrial Tooling'],
      tools: ['SolidWorks', 'ANSYS'],
      img: 'images/engineering-tools-2.JPG',
      overview: 'This personal project focused on the design and structural validation of a crane apparatus bracket using static finite element analysis (FEA). A 3D CAD model was developed and evaluated to assess stress distribution, deformation, and structural integrity under applied static loads, providing insight into the components mechanical performance. The project included 3D CAD modeling, detailed engineering drawings, and design optimization for CNC machining.',
      technical: { material: 'Carbon Steel', analysis_type:  'Static Structural Analysis', load_condition: 'Static Load (-30 kN per hole)', duration:'2 days' },
      process: { steps: ['Drawing', 'Export to ANSYS', 'Meshing', 'Condition', 'Simulation'] },
      highlights: [
        'Maximum von Mises stress reached 102 MPa, remaining well below the estimated carbon steel yield strength (~250 MPa), indicating adequate structural capacity.',
        'Maximum deformation was limited to 0.59 mm, demonstrating good structural stiffness under the applied static loading condition.',
        'Stress concentration was identified around the bolt-hole region, confirming the primary load transfer area and providing a basis for future design optimization.'
      ],
      drawingUrl: '#',
      drawingImg: '',  // 🖼️ path gambar technical drawing
      render3d: 'images/engineering-tools-2a.JPG',
      exploded: 'images/engineering-tools-2b.JPG',
      img2Caption:'Simulation View',
    },

    {
      id: 'tl3',
      title: 'Shearbut',
      tags: ['Industrial Tooling'],
      tools: ['SolidWorks', 'MasterCAM'],
      img: 'images/engineering-tools-3.JPG',
      overview: 'Designed a billet shear blade used to trim the compressed end of aluminium billets before the extrusion process. The project focused on producing a precise cutting geometry, maintaining dimensional accuracy, and preparing complete manufacturing drawings to support machining and grinding operations.',
      technical: { material: 'SKD61 Tool Steel', material: '48-52 HRC', duration:'1 week', dimension: '27mm x 175mm x 176mm' },
      process: { steps: ['CNC Milling', 'Drilling', 'Tapping', 'Hardening', 'Reamer'] },
      highlights: [
        'Designed a precision cutting profile to produce clean and consistent billet end surfaces prior to extrusion.',
        'Applied tight dimensional tolerances to ensure cutting accuracy and reliable installation during operation.',
        'Prepared manufacturing-ready drawings supporting CNC machining, grinding, and final tool finishing.'
      ],
      drawingUrl: '#',
      drawingImg: '',  // 🖼️ path gambar technical drawing
      render3d: 'images/engineering-tools-3a.JPG',
      exploded: 'images/engineering-tools-3b.JPG',
      img1Caption:'3D Top View',
      img2Caption:'Technical Drawing',
    },
  ],

  /* ── NAVAL ── */
  naval: [
    {
      id: 'nv1',
      title: 'Ambulance Catamaran Design',
      tags: ['Naval Project'],
      tools: ['AutoCAD', 'Inventor', 'Maxsurf'],
      img: 'images/engineering-naval-1.JPG',
      overview: 'Developed a conceptual ambulance catamaran as part of the National Ship Design Competition (KKCTBN). The project included general arrangement development, compartment layout, 3D modelling, and technical drawings to support the vessel design concept for medical transportation.',
      technical: { vessel_type: 'Ambulance Catamaran', project_type: 'Design Competition (KKCTBN)', duration: '30 days' },
      process: { steps: ['Preliminery Design', 'Ship Design', 'Reporting'] },
      highlights: [
        'Developed the vessel general arrangement including compartment layout and operational spaces.',
        'Created a complete 3D ship model to visualize the final design concept.',
        'Produced engineering drawings supporting design presentation and technical documentation.',
      ],
      drawingUrl: '#',
      drawingImg: '',  // 🖼️ path gambar technical drawing
      render3d: 'images/engineering-naval-1a.JPG',
      exploded: 'images/engineering-naval-1b.JPG',
      img1Caption:'General Arrangement',
      img2Caption:'Lines Plan',
    },

    {
      id: 'nv2',
      title: 'Ship Task Design',
      tags: ['Naval Project'],
      tools: ['Excel', 'AutoCAD', 'Maxsurf'],
      img: 'images/engineering-naval-2.JPG',
      overview: 'Completed a comprehensive bulk carrier design project as part of the undergraduate naval architecture curriculum. The project covered hull form development, lines plan generation, hydrostatic calculations, floodable length analysis, and principal ship design documentation.',
      technical: { vessel_type: 'Bulk Carrier', DWT: '17500 ton', LPP: '136m', project_type: 'Undergraduate Ship Task Design' },
      process: { steps: ['Excel Calcualtion Task', 'Drawing', 'Reporting'] },
      highlights: [
        'Developed the hull form and lines plan in accordance with ship design principles and dimensional requirements.',
        'Performed hydrostatic and stability analyses to evaluate the vessel principal hydrostatic characteristics.',
        'Prepared technical ship design documentation, including lines plan, hydrostatic curves, and floodable length calculations.',
      ],
      drawingUrl: '#',
      drawingImg: '',  // 🖼️ path gambar technical drawing
      render3d: 'images/engineering-naval-2a.JPG',
      exploded: 'images/engineering-naval-2b.JPG',
      img1Caption:'Hydrostatic Curve',
      img2Caption:'Floodalbe Length Curve',
    }, 
  ],

  /* ── SHOWCASE ── */
  showcase: [
    {
      id: 'sc1',
      title: 'Pipe Clamp Rack',
      tags: ['Showcase'],
      tools: ['CATIA'],
      img: '',
      overview: 'Designed a structural pipe rack assembly with adjustable clamps to provide stable support and secure positioning for industrial pipe storage.',
      technical: { material: 'Steel', dimension: '1707mm x 3100mm x 3504mm' },
      process: { steps: ['Reference & Concept', '3D Modelling', 'Rendering'] },
      highlights: ['Self-initiated learning project'],
      drawingUrl: '#',
      drawingImg: '',  // 🖼️ path gambar technical drawing
      render3d: 'images/engineering-swcs-1a.JPG',
      exploded: 'images/engineering-swcs-1b.JPG',
      img1Caption:'3D Side View',
      img2Caption:'Exploded View',
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
        ${p.img && p.img.trim().length > 0
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
  const all = Object.values(ENG_PROJECTS).flat();
  const p = all.find(x => x.id === id);
  if (!p) return;

  // Manufacturing process render
  let processHTML = '';
  if (p.process.roughing) {
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

  // Technical info — support both lowercase and normal keys
  const techHTML = Object.entries(p.technical).map(([k,v]) => `
    <div class="tech-row">
      <span class="tech-key">${k.charAt(0).toUpperCase()+k.slice(1)}</span>
      <span class="tech-val">${v}</span>
    </div>
  `).join('');

  // Images - 2 gambar bebas caption dari field render3d dan exploded
  const hasImg1 = p.render3d && p.render3d.trim().length > 0;
  const hasImg2 = p.exploded && p.exploded.trim().length > 0;

  const img1HTML = hasImg1
    ? `<img src="${p.render3d}" alt="${p.img1Caption || 'View 1'}" style="width:100%;display:block;border-radius:var(--r-md);border:1px solid var(--border);max-height:300px;object-fit:contain;background:var(--surface)">`
    : `<div class="pcard-img ph-eng" style="height:240px;border-radius:var(--r-md)"><span>🖼️ Gambar 1 — isi: render3d: 'images/...'</span></div>`;

  const img2HTML = hasImg2
    ? `<img src="${p.exploded}" alt="${p.img2Caption || 'View 2'}" style="width:100%;display:block;border-radius:var(--r-md);border:1px solid var(--border);max-height:300px;object-fit:contain;background:var(--surface)">`
    : `<div class="pcard-img ph-eng" style="height:240px;border-radius:var(--r-md)"><span>🖼️ Gambar 2 — isi: exploded: 'images/...'</span></div>`;

  document.getElementById('modalBody').innerHTML = `
    <div class="eng-modal-header">
      <div class="pcard-tags" style="margin-bottom:0.5rem">${p.tags.map(t=>`<span class="tag eng-tag">${t}</span>`).join('')}</div>
      ${p.location ? `<p class="pcard-location" style="margin-bottom:0.5rem">📍 ${p.location}</p>` : ''}
      <h2 class="eng-modal-title">${p.title}</h2>
      <div class="pcard-tools" style="margin-top:0.5rem">${p.tools.map(t=>`<span style="${getToolStyleEng(t)}">${t}</span>`).join('')}</div>
    </div>

    <div class="eng-modal-section">
      <h4 class="eng-modal-label">Overview</h4>
      <p class="cs-text">${p.overview}</p>
    </div>

    <div class="eng-modal-section">
      <div class="eng-modal-imgs">
        <div class="eng-modal-img-wrap">
          ${img1HTML}
          <span class="img-caption">${p.img1Caption || '3D Isometric View'}</span>
        </div>
        <div class="eng-modal-img-wrap">
          ${img2HTML}
          <span class="img-caption">${p.img2Caption || 'Exploded View'}</span>
        </div>
      </div>
    </div>

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
