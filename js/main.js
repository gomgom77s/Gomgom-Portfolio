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
  data1: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'Delivery Performance Analysis and Improvement Opportunities',
    tools: ['Excel', 'Tableau'],
    // ✏️ Ganti src gambar dengan path asli, mis: 'assets/data1-hero.png'
    hero: { img: 'images/portfolio-analytics-1a.JPG', caption: 'Tableau dashboard — sales performance overview' },
    workflow: ['Data Collection (CSV)', 'Data Cleaning (Excel)', 'Exploratory Analysis', 'Delivery Simulation', 'Visualisation (Tableau)'],
    sql: { img: 'images/portfolio-analytics-1b.JPG', caption: 'Original delivery dataset containing shipment, customer, and order information before preprocessing.' },
    python: { img: 'images/portfolio-analytics-1c.JPG', caption: 'Standardized column formats, corrected data types, and removed inconsistencies before visualization.' },
    kpis: [
      { value: 54.9, prefix: '', suffix: '%', label: 'Late Delivery Rate' },
      { value: 42.7, prefix: '', suffix: '%', label: 'SLA Compliance Rate' },
      { value: 0.57, prefix: '', suffix: 'day', label: 'Average Delivery delay' },
    ],
    recommendation: 'Revise First Class and Second Class delivery commitments - Monitor Late Delivery Rate and SLA Compliance regularly.',
    deckUrl: 'https://docs.google.com/presentation/d/1918zIP_CQh2SVXQwCTgKVPRpevi-QPE7kEI0rBZGGVk/edit?usp=drive_link', // ✏️ Ganti dengan link Google Slides / PDF deck
  },
  data2: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'Customer Segmentation & Revenue Growth Strategy Using RFM Analysis',
    tools: ['Python', 'Pandas', 'Matplotlib'],
    hero: { img: 'images/portfolio-analytics-2a.JPG', caption: 'Customer segmentation overview chart' },
    workflow: ['Data Extraction', 'Data Cleaning', 'RFM Scoring (Python)', 'Customer Segmentation', 'Insight & Recommendation'],
    sql: { img: 'images/portfolio-analytics-2b.JPG', caption: 'Original transactional dataset in CSV format containing customer, payment, and delivery records before preprocessing.' },
    python: { img: 'images/portfolio-analytics-2c.JPG', caption: 'Cleaned and standardized the dataset by correcting data types, handling inconsistencies, and preparing it for analysis and visualization.' },
    kpis: [
      { value: 1195, prefix: '', suffix: 'K', label: 'Total CardHolder' },
      { value: 456.06, prefix: 'Rp.', suffix: 'bn', label: 'Total Transaction' },
      { value: 0.24, prefix: '', suffix: '', label: 'Average Debt-to-Ratio' },
    ],
    recommendation: 'Retain Champions through loyalty and rewards programs - Convert Potential Loyalists into Champions and reactivate Hibernating customers through targeted campaigns.',
    deckUrl: 'https://docs.google.com/presentation/d/1YU2EYgZZsv_twfbR-IgPuIs9G59bkEWnFM_6-Wm6QKc/edit?usp=drive_link',
  },
  data3: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'Sales Performance Analysis Using SQL',
    tools: ['SQL', 'Spreadsheet'],
    hero: { img: 'images/portfolio-analytics-3a.JPG', caption: 'Power BI dashboard — channel attribution overview' },
    workflow: ['Data Collection', 'Data Cleaning (Spreadsheet)', 'SQL Querying', 'Analysis & Aggregation', 'Visualisation (Spreadsheet)'],
    sql: { img: 'images/portfolio-analytics-3b.JPG', caption: 'SQL query used to calculate cumulative revenue for each customer using window functions, enabling revenue trend analysis over time.' },
    python: { img: 'images/portfolio-analytics-3c.JPG', caption: 'Analyzed repeat purchase rates to evaluate customer loyalty and purchasing behavior.' },
    kpis: [
      { value: 10.56, prefix: '$', suffix: 'M', label: 'Total Revenue' },
      { value: 15.717, prefix: '', suffix: 'K', label: 'Total Customer' },
      { value: 97.6, prefix: '', suffix: '%', label: 'Repeat Purchase Rate' },
    ],
    recommendation: 'Invest in high-performing categories. Strengthen retention strategies for valuable customers - Monitor customer segments to support personalized campaigns.',
    deckUrl: 'https://docs.google.com/presentation/d/1bzfAdcAytA28UELsA0hQKdU9beHtkMlQsv03n3t9aVg/edit?usp=drive_link',
  },
  // ✏️ Tambah modal untuk project data baru (data4, dst)
  data4: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'Hospital Operational Monitoring Dashboard',
    tools: ['Tableau'],
    hero: { img: 'images/portfolio-analytics-4a.JPG', caption: '✏️ Caption hero dashboard' },
    workflow: ['Data Collection', 'Data Cleaning', 'Dashboard Design (Tableau)', 'Performance Monitoring', 'Insight & Recommendation'],
    sql: { img: 'images/portfolio-analytics-4b.JPG', caption: 'Used Tableau LOD calculations to analyze department revenue contribution across hospital branches.' },
    python: { img: 'images/portfolio-analytics-4c.JPG', caption: 'Prepared and validated the hospital dataset by standardizing fields and ensuring data consistency before analysis.' },
    kpis: [
      { value: 5000, prefix: '', suffix: '', label: 'Total Admission' },
      { value: 4.5, prefix: '', suffix: ' days', label: 'Average Length of Stay' },
      { value: 98.87, prefix: 'Rp ', suffix: 'B', label: 'Total Revenue' },
    ],
    recommendation: 'Optimize resources in busy branches - Monitor high-LOS departments',
    deckUrl: 'https://docs.google.com/presentation/d/1dpqZSY-sDrra_GLHRqmuznduNcrwMsy0jv1twIRMs18/edit?usp=drive_link',
  },

    data5: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'E-Commerce Campaign Performance Analysis',
    tools: ['Spreadsheet, Power BI'],
    hero: { img: 'images/portfolio-analytics-5a.JPG', caption: '✏️ Caption hero dashboard' },
    workflow: ['Data Collection', 'Data Cleaning (Spreadsheet)', 'Campaign Analysis', 'Dashboard (Power BI)', 'Insight & Recommendation'],
    sql: { img: 'images/portfolio-analytics-5b.JPG', caption: 'Raw transactional dataset exported prior to data cleaning and standardization.' },
    python: { img: 'images/portfolio-analytics-5c.JPG', caption: 'Cleaned and transformed the dataset by formatting fields, calculating Total Revenue, and improving data consistency for analysis.' },
    kpis: [
      { value: 45.69, prefix: 'Rp ', suffix: 'bn', label: 'Total Revenue' },
      { value: 10.098, prefix: '', suffix: 'K', label: 'Total Transaction' },
      { value: 13, prefix: '', suffix: 'K', label: 'Total Quantity' },
    ],
    recommendation: 'Prioritize Mens Fashion in future promotional campaigns. Optimize discount allocation toward high-performing categories - Improve monetization strategies for high-volume categories such as Superstore.',
    deckUrl: 'https://docs.google.com/presentation/d/16-FPB8esfL2V874bO87eiOSicbq7mivneWkD5yEBhro/edit?usp=drive_link',
  },

  data6: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'Dieshop Production Monitoring Dashboard',
    tools: ['Excel'],
    hero: { img: 'images/portfolio-analytics-6a.JPG', caption: '✏️ Caption hero dashboard' },
    workflow: ['Data Collection', 'Data Cleaning', 'Table Join(3 different template table)', 'Analyzing problem', 'Dashboard Visualization'],
    sql: { img: 'images/portfolio-analytics-6b.JPG', caption: 'Raw data from Operator Progress Form' },
    python: { img: 'images/portfolio-analytics-6c.JPG', caption: 'Calculating Machine and Operator Hours work' },
    kpis: [
      { value: 14, prefix: '', suffix: 'Jobs', label: 'Total Jobs' },
      { value: 100.2, prefix: '', suffix: 'Jam', label: 'Total Hours' },
      { value: 13, prefix: '', suffix: 'Jam', label: 'Avg. Daily Hours' },
    ],
    recommendation: 'Standardize production data across New Dies, Repair Dies, and Non-Dies using Power Query to eliminate manual data consolidation and improve reporting efficiency.',
    deckUrl: '#',
  },
};

function csFigure(fig, fallbackLabel) {
  const body = fig?.img
    ? `<img src="${fig.img}" alt="${fallbackLabel}">`
    : `<div class="cs-figure-ph">🖼️ ${fallbackLabel}</div>`;
  return `<div class="cs-figure">${body}</div>`;
}

function renderEngineeringModal(d) {
  const toolsHTML = d.tools.map(t =>
    `<span class="cs-tool-chip" style="background:var(--eng-dim);color:${d.color};border:1px solid var(--eng-mid)">${t}</span>`
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
    `<span class="cs-tool-chip" style="background:var(--data-dim);color:${d.color};border:1px solid var(--data-mid)">${t}</span>`
  ).join('');

  const kpiHTML = d.kpis.map((k, i) => `
    <div class="cs-kpi-item">
      <span class="cs-kpi-num" style="color:${d.color}" data-target="${k.value}" data-prefix="${k.prefix}" data-suffix="${k.suffix}">${k.prefix}0${k.suffix}</span>
      <span class="cs-kpi-label">${k.label}</span>
    </div>
  `).join('');

  return `
    <p class="cs-eyebrow" style="color:${d.color}">${d.type}</p>
    <h2 class="cs-title">${d.title}</h2>
    <div class="cs-tools">${toolsHTML}</div>

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
          ${csFigure(d.sql.img ? { img: d.sql.img } : null, 'SQL screenshot')}
          <p class="cs-figure-caption">${d.sql.caption}</p>
        </div>
        <div>
          ${csFigure(d.python.img ? { img: d.python.img } : null, 'Python screenshot')}
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
        ${Array.isArray(d.recommendation)
          ? `<ul style="display:flex;flex-direction:column;gap:0.5rem;list-style:none;padding:0">
              ${d.recommendation.map(r => `
                <li style="display:flex;gap:0.75rem;align-items:flex-start;font-size:0.875rem;color:var(--muted);line-height:1.65">
                  <span style="color:${d.color};flex-shrink:0;margin-top:0.1rem">›</span>
                  <span>${r}</span>
                </li>`).join('')}
             </ul>`
          : `<p class="cs-text">${d.recommendation}</p>`
        }
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
