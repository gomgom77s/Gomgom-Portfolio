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
   MODAL — case study data
────────────────────────────────────────── */
const MODALS = {
  eng1: {
    type: 'Engineering', color: 'var(--eng)',
    title: 'Aluminium Extrusion Die Design',
    tools: ['CATIA', 'Inventor', 'AutoCAD'],
    // ✏️ Edit semua teks di dalam modal ini
    overview: 'Designed aluminium extrusion dies for complex profile manufacturing at Mega Persada Group. The project focused on optimising material flow through the die channels to ensure consistent cross-section and surface finish quality.',
    challenge: 'The main challenge was designing die land geometry that balances metal flow velocity across asymmetric profile sections, preventing distortion during extrusion.',
    approach: 'Used CATIA to model flow path lengths and adjusted bearing lengths accordingly. Created detailed technical drawings for workshop manufacturing using EDM and CNC machining.',
    outcome: 'Die successfully produced aluminium profiles meeting dimensional tolerances within ±0.1 mm. Reduced setup iterations by ~30% compared to previous design approach.',
  },
  eng2: {
    type: 'Engineering', color: 'var(--eng)',
    title: 'Custom Maintenance Tool Design',
    tools: ['SolidWorks', 'ANSYS', 'AutoCAD'],
    overview: 'Designed specialised tools for maintenance operations in an automotive stamping environment. Focused on improving accessibility and ergonomics for maintenance tasks on large progressive dies.',
    challenge: 'Existing maintenance tools were generic and not suited for the specific geometry of automotive stamping dies, causing long downtime during tool changes.',
    approach: 'Conducted task analysis with the maintenance team, designed custom fixtures and tools tailored to die geometry. Performed ANSYS stress simulation to validate tool strength under operational loads.',
    outcome: 'Reduced die maintenance time by an estimated 20%. Tools approved for production use and included in the standard maintenance procedure.',
  },
  eng3: {
    type: 'Engineering', color: 'var(--eng)',
    title: 'Progressive Die Maintenance & Redesign',
    tools: ['CATIA', 'Technical Drawing'],
    overview: 'Supported ongoing maintenance, diagnosis, and redesign of progressive stamping dies in a high-volume automotive parts production environment.',
    challenge: 'High-volume production caused accelerated wear on punch and die inserts, leading to frequent quality non-conformances and unplanned production stops.',
    approach: 'Systematically analysed wear patterns through visual inspection and measurement data. Proposed design modifications to high-wear inserts including material change and geometry adjustments.',
    outcome: 'Extended average die service intervals and reduced scrap rate from premature die wear. Findings documented to support future die design improvements.',
  },
  // ✏️ Tambah modal untuk project engineering baru (eng4, eng5, dst)
  eng4: {
    type: 'Engineering', color: 'var(--eng)',
    title: '✏️ Nama Project ke-4',
    tools: ['✏️ Tool', '✏️ Tool'],
    overview: '✏️ Isi overview project ini.',
    challenge: '✏️ Isi tantangan utama project ini.',
    approach: '✏️ Isi pendekatan / solusi yang digunakan.',
    outcome: '✏️ Isi hasil yang dicapai.',
  },
  eng5: {
    type: 'Engineering', color: 'var(--eng)',
    title: '✏️ Nama Project ke-5',
    tools: ['✏️ Tool'],
    overview: '✏️ Isi overview.',
    challenge: '✏️ Isi challenge.',
    approach: '✏️ Isi approach.',
    outcome: '✏️ Isi outcome.',
  },
  data1: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'Sales Performance Dashboard',
    tools: ['SQL', 'Python', 'Power BI'],
    overview: 'Built an end-to-end sales analytics pipeline extracting transaction data via SQL, transforming and cleaning with Python/Pandas, and visualising KPIs in a Power BI dashboard for management reporting.',
    challenge: 'Sales data was scattered across multiple tables with inconsistent date formats and missing values. Management had no single source of truth for sales performance tracking.',
    approach: 'Wrote SQL queries to join and aggregate sales, product, and region tables. Used Pandas to handle null values and standardise formats. Designed a Power BI dashboard with dynamic filters for period, region, and product category.',
    outcome: 'Enabled management to identify top 3 performing SKUs and two underperforming regions within the first month. Dashboard adopted as the weekly reporting standard.',
  },
  data2: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'Customer Behaviour Analysis',
    tools: ['Python', 'Pandas', 'Matplotlib'],
    overview: 'Analysed customer transaction history to identify behavioural patterns, churn risk segments, and key purchase drivers using cohort analysis and RFM segmentation.',
    challenge: 'The business had a large customer base but no systematic way to distinguish high-value loyal customers from one-time purchasers or identify at-risk churners.',
    approach: 'Applied RFM scoring in Python to segment customers into actionable groups. Performed cohort retention analysis to measure how well different acquisition periods retained customers over 6 months.',
    outcome: 'Identified that top 20% of customers generated 68% of revenue. Churn risk segment flagged for a targeted re-engagement campaign.',
  },
  data3: {
    type: 'Data Analytics', color: 'var(--data)',
    title: 'Marketing Campaign Performance',
    tools: ['SQL', 'Python', 'Power BI'],
    overview: 'Evaluated marketing campaign ROI across multiple channels using SQL-based multi-touch attribution analysis. Delivered structured reporting on channel performance and cost-per-acquisition.',
    challenge: 'Marketing spend was distributed across email, social, and paid search with no clear view of which channel actually drove conversions, leading to uninformed budget allocation.',
    approach: 'Queried campaign event logs with SQL to build last-touch and linear attribution models. Used Python to calculate CPA per channel and Power BI to visualise channel contribution over time.',
    outcome: 'Found that email campaigns had 3× lower CPA than paid search despite receiving only 15% of budget. Recommendations provided for Q4 budget reallocation.',
  },
  // ✏️ Tambah modal untuk project data baru (data4, dst)
  data4: {
    type: 'Data Analytics', color: 'var(--data)',
    title: '✏️ Nama Project Data ke-4',
    tools: ['✏️ Tool'],
    overview: '✏️ Isi overview.',
    challenge: '✏️ Isi challenge.',
    approach: '✏️ Isi approach.',
    outcome: '✏️ Isi outcome.',
  },
};

function openModal(id) {
  const d = MODALS[id];
  if (!d) return;

  const toolsHTML = d.tools.map(t =>
    `<span style="
      font-family:var(--font-mono);font-size:0.67rem;
      padding:0.18rem 0.55rem;border-radius:3px;
      background:${d.color === 'var(--eng)' ? 'var(--eng-dim)' : 'var(--data-dim)'};
      color:${d.color};
      border:1px solid ${d.color === 'var(--eng)' ? 'var(--eng-mid)' : 'var(--data-mid)'}
    ">${t}</span>`
  ).join('');

  document.getElementById('modalBody').innerHTML = `
    <p style="font-family:var(--font-mono);font-size:0.65rem;color:${d.color};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.75rem">${d.type}</p>
    <h2 style="font-family:var(--font-display);font-size:1.4rem;font-weight:800;margin-bottom:1rem;line-height:1.2">${d.title}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1.5rem">${toolsHTML}</div>

    <div style="display:flex;flex-direction:column;gap:1.1rem">
      ${['overview','challenge','approach','outcome'].map(k => `
        <div>
          <p style="font-family:var(--font-mono);font-size:0.62rem;color:${k==='outcome' ? d.color : 'var(--muted)'};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.4rem">${k.charAt(0).toUpperCase()+k.slice(1)}</p>
          <p style="font-size:0.875rem;color:var(--muted);line-height:1.75;${k==='outcome'?`background:${d.color==='var(--eng)'?'var(--eng-dim)':'var(--data-dim)'};border:1px solid ${d.color==='var(--eng)'?'var(--eng-mid)':'var(--data-mid)'};border-radius:var(--r-sm);padding:0.85rem 1rem;color:var(--text)`:''}">${d[k]}</p>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('modalOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
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
  const target  = parseInt(el.getAttribute('data-target'), 10);
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
   CONTACT FORM
────────────────────────────────────────── */
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sent ✓';
  btn.style.background = '#2E9E6B';
  btn.disabled = true;
  e.target.reset();
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.disabled = false;
  }, 3500);
}

/* ──────────────────────────────────────────
   INIT
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initKPI();
});
