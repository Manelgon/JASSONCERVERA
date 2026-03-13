import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../style.css';
import { EN, ES, METRO_CONTENT_EN, LINE_NAMES_EN } from './i18n.js';

gsap.registerPlugin(ScrollTrigger);

/* ==============================
   I18N — Language state
   ============================== */
let currentLang = 'es';
const TRANSLATIONS = { es: ES, en: EN };

/* ==============================
   NAVBAR
   ============================== */
function initNavbar() {
  const toggle = document.getElementById('mobile-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('active');
      toggle.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('active');
        toggle.classList.remove('open');
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach((a) => {
            a.classList.toggle('nav-active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ==============================
   TRAYECTORIA MAP — Data
   ============================== */
const LINE_COLORS = {
  formacion:    '#1B4F8A',
  clinica:      '#2D8B5E',
  metabolismo:  '#D4772C',
  comunicacion: '#7B5EA7',
  final:        '#B38645',
  inicio:       '#B0AAA4',
};

const LINE_NAMES_ES = {
  formacion:    'Formación',
  clinica:      'Experiencia clínica',
  metabolismo:  'Metabolismo',
  comunicacion: 'Comunicación',
  final:        'Convergencia',
  inicio:       'Inicio',
};

function getLineNames() {
  return currentLang === 'en' ? LINE_NAMES_EN : LINE_NAMES_ES;
}

function getMetroTitle(id) {
  if (currentLang === 'en' && METRO_CONTENT_EN[id]) return METRO_CONTENT_EN[id].title;
  return METRO_CONTENT[id]?.title || '';
}
function getMetroInstitution(id) {
  if (currentLang === 'en' && METRO_CONTENT_EN[id]) return METRO_CONTENT_EN[id].institution;
  return METRO_CONTENT[id]?.institution || '';
}
function getMetroItems(id) {
  if (currentLang === 'en' && METRO_CONTENT_EN[id]) return METRO_CONTENT_EN[id].items;
  return METRO_CONTENT[id]?.items || [];
}

const METRO_CONTENT = {
  /* ── ESTACIÓN INICIO ─────────────────────────────── */
  start: {
    line: 'inicio', year: 'Inicio',
    title: 'Inicio — trabajo con personas (14 años)',
    institution: 'Negocio familiar',
    items: [
      'Primer contacto con atención al público en negocio familiar desde los 14 años.',
      'Gestión de clientes, resolución de conflictos y responsabilidad temprana en entornos de atención directa.',
    ],
  },

  /* ── LÍNEA 1: FORMACIÓN ──────────────────────────── */
  dietetica: {
    line: 'formacion', year: '2013–2015',
    title: 'Dietética — ADEMA',
    institution: 'A.D.E.M.A.',
    items: [
      'Formación en nutrición clínica y metabolismo humano.',
      'Primer acercamiento al estudio de la fisiología metabólica y su impacto en la salud.',
    ],
  },
  enfermeria: {
    line: 'formacion', year: '2017',
    title: 'Enfermería — UIB',
    institution: 'Universitat de les Illes Balears (UIB)',
    items: [
      'Formación sanitaria orientada al cuidado clínico integral del paciente y al trabajo en entornos hospitalarios complejos.',
    ],
  },
  medicina: {
    line: 'formacion', year: '2022',
    title: 'Medicina — URV',
    institution: 'Universitat Rovira i Virgili (URV)',
    items: [
      'Formación médica con experiencia clínica durante la pandemia y rotaciones hospitalarias en diferentes niveles asistenciales.',
    ],
  },
  master: {
    line: 'formacion', year: '2023',
    title: 'Máster Medicina Estética — AMIR',
    institution: 'AMIR',
    items: [
      'Especialización en medicina estética y regenerativa, integrando conocimiento clínico con estrategias de optimización biológica.',
    ],
  },

  /* ── LÍNEA 2: CLÍNICA ────────────────────────────── */
  'enf-hosp': {
    line: 'clinica', year: '2017–2019',
    title: 'Enfermería hospitalaria',
    institution: 'Son Espases · Joan XXIII',
    items: [
      'Experiencia en hospitalización y entorno quirúrgico.',
      'Trabajo clínico en hospitales como Son Espases y Joan XXIII.',
    ],
  },
  covid: {
    line: 'clinica', year: '2020',
    title: 'Pandemia COVID',
    institution: 'Entornos hospitalarios de alta presión asistencial',
    items: [
      'Experiencia clínica durante la crisis sanitaria en entornos hospitalarios de alta presión asistencial.',
      'Participación en iniciativas de apoyo comunitario durante el confinamiento.',
    ],
  },
  'joan-xxiii': {
    line: 'clinica', year: '2021',
    title: 'Hospital Joan XXIII',
    institution: 'Hospital Universitari Joan XXIII, Tarragona',
    items: [
      'Experiencia clínica en hospital de tercer nivel con contacto con patología compleja y trabajo multidisciplinar.',
    ],
  },
  'map-ics': {
    line: 'clinica', year: '2022–actualidad',
    title: 'Médico Atención Primaria — ICS',
    institution: 'ICS',
    items: [
      'Atención a miles de pacientes en consulta de atención primaria.',
      'Desarrollo de autonomía clínica y toma de decisiones médicas en primera línea asistencial.',
    ],
  },

  /* ── LÍNEA 3: METABOLISMO ────────────────────────── */
  ysonut: {
    line: 'metabolismo', year: '2014–2016',
    title: 'YSONUT',
    institution: 'Punto de venta especializado en nutrición clínica y suplementación',
    items: [
      'Gestión de pedidos y trazabilidad',
      'Facturación y administración del punto de venta',
      'Gestión de equipo (hasta 2 personas)',
      'Realización de entrevistas y gestión de personal',
      'Optimización de ventas y atención al cliente',
      'Logro destacado: duplicación del volumen de ventas respecto a otros centros en menor tiempo, con reconocimiento del CEO Pablo Rodríguez.',
    ],
  },
  optimizacion: {
    line: 'metabolismo', year: 'Continuo',
    title: 'Optimización metabólica',
    institution: 'Aplicación práctica del conocimiento nutricional',
    items: [
      'Educación nutricional',
      'Adherencia del paciente',
      'Interpretación de bioimpedancia',
      'Estrategias metabólicas personalizadas',
    ],
  },
  biomarcadores: {
    line: 'metabolismo', year: 'Continuo',
    title: 'Biomarcadores',
    institution: 'Interpretación clínica de analíticas y marcadores metabólicos',
    items: [
      'Datos analíticos',
      'Estilo de vida',
      'Prevención personalizada',
    ],
  },

  /* ── LÍNEA 4: COMUNICACIÓN ───────────────────────── */
  delegado: {
    line: 'comunicacion', year: 'Varias etapas',
    title: 'Delegado estudiantil',
    institution: 'Etapas formativas',
    items: [
      'Representación estudiantil durante etapas formativas y participación en dinámicas organizativas dentro del entorno académico.',
    ],
  },
  discursos: {
    line: 'comunicacion', year: '2017 y 2022',
    title: 'Discursos de graduación',
    institution: 'UIB (Enfermería) · URV (Medicina)',
    items: [
      'Elección por parte de los compañeros para realizar los discursos de graduación en distintas promociones.',
      'Los discursos están disponibles en vídeo.',
    ],
  },
  charlas: {
    line: 'comunicacion', year: 'Continuo',
    title: 'Charlas y divulgación',
    institution: 'Educación nutricional y comunicación sobre hábitos de salud',
    items: [
      'Participación en actividades de educación nutricional y comunicación sobre hábitos de salud.',
    ],
  },

  /* ── ESTACIÓN FINAL ──────────────────────────────── */
  end: {
    line: 'final', year: 'Convergencia',
    title: 'Medicina preventiva y longevidad',
    institution: 'Enfoque clínico en metabolismo, prevención y optimización de la salud',
    items: [
      'Metabolismo y biomarcadores',
      'Medicina personalizada',
      'Optimización del envejecimiento',
      'Medicina preventiva avanzada',
    ],
  },
};


/* ==============================
   TRAYECTORIA MAP — Interactivity
   ============================== */
function initMetroMap() {
  const stations = document.querySelectorAll('.traj-station');
  const panel = document.getElementById('metro-panel');
  const panelBody = panel?.querySelector('.metro-panel-body');
  const panelClose = panel?.querySelector('.metro-tooltip-close');

  if (!panel || !panelBody || stations.length === 0) return;

  /* ── Inject ripple rings into expandable stations ── */
  const svgNS = 'http://www.w3.org/2000/svg';
  stations.forEach((station, i) => {
    if (!station.classList.contains('traj-expandable')) return;
    const circles = station.querySelectorAll('circle');
    // The outermost visible border circle (index 1 in expandables, skip hit area at 0)
    const outerCircle = circles.length >= 2 ? circles[1] : circles[0];
    if (!outerCircle) return;

    const ring = document.createElementNS(svgNS, 'circle');
    ring.setAttribute('cx', outerCircle.getAttribute('cx'));
    ring.setAttribute('cy', outerCircle.getAttribute('cy'));
    ring.setAttribute('r', outerCircle.getAttribute('r'));
    ring.setAttribute('stroke', outerCircle.getAttribute('stroke') || '#B38645');
    ring.setAttribute('class', 'traj-ring');
    ring.style.animationDelay = `${((i * 0.5) % 3).toFixed(2)}s`;
    station.insertBefore(ring, station.firstChild);
  });

  /* ── Helper: outermost visible circle ──────────── */
  function getMainCircle(station) {
    const circles = station.querySelectorAll('circle:not(.traj-ring)');
    // For expandable: [hit-area, outer-border, inner-dot] → index 1
    // For simple: [outer-border, inner-dot] → index 0
    return circles.length >= 2 ? circles[1] : circles[0];
  }

  /* ── Position panel near clicked station ──────── */
  function positionPanel(id) {
    const stationEl = document.querySelector(`.traj-station[data-id="${id}"]`);
    if (!stationEl) return;
    const circle = getMainCircle(stationEl);
    if (!circle) return;
    const rect = circle.getBoundingClientRect();
    const CARD_W = 400;
    const CARD_H = panel.offsetHeight || 300;
    const MARGIN = 12;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = rect.right + MARGIN;
    let top = rect.top - 40;

    if (left + CARD_W > vw - MARGIN) left = rect.left - CARD_W - MARGIN;
    if (left < MARGIN) left = MARGIN;
    if (top + CARD_H > vh - MARGIN) top = vh - CARD_H - MARGIN;
    if (top < MARGIN) top = MARGIN;

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  }

  /* ── Open station card ────────────────────────── */
  function openStation(id) {
    const data = METRO_CONTENT[id];
    if (!data) { console.warn('[Traj] No data for:', id); return; }

    const color = LINE_COLORS[data.line] || '#B38645';
    const lineName = getLineNames()[data.line] || '';

    panelBody.innerHTML = `
      <span class="metro-panel-tag" style="background:${color}">${lineName}</span>
      <p class="metro-panel-year">${data.year}</p>
      <h4 class="metro-panel-title">${getMetroTitle(id)}</h4>
      <p class="metro-panel-institution">${getMetroInstitution(id)}</p>
      <ul class="metro-panel-list">
        ${getMetroItems(id).map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;

    panel.style.borderLeftColor = color;

    // Reset all stations
    stations.forEach(s => s.classList.remove('active'));

    // Activate clicked station
    const activeStation = document.querySelector(`.traj-station[data-id="${id}"]`);
    activeStation?.classList.add('active');

    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');

    requestAnimationFrame(() => positionPanel(id));
  }

  /* ── Close panel ──────────────────────────────── */
  function closePanel() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    stations.forEach(s => s.classList.remove('active'));
  }

  /* ── Event listeners ─────────────────────────── */
  stations.forEach(station => {
    station.addEventListener('click', e => {
      e.stopPropagation();
      const id = station.getAttribute('data-id');
      if (panel.classList.contains('open') &&
          document.querySelector(`.traj-station.active[data-id="${id}"]`)) {
        closePanel();
      } else {
        openStation(id);
      }
    });
    station.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openStation(station.getAttribute('data-id'));
      }
    });
  });

  panelClose?.addEventListener('click', e => { e.stopPropagation(); closePanel(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
  document.addEventListener('click', e => {
    if (panel.classList.contains('open') && !panel.contains(e.target)) closePanel();
  });
  window.addEventListener('resize', () => {
    const active = document.querySelector('.traj-station.active');
    if (active && panel.classList.contains('open')) positionPanel(active.getAttribute('data-id'));
  });
}


/* ==============================
   HERO ANIMATIONS
   ============================== */
function initHeroAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const d = (n) => (prefersReducedMotion ? Math.min(n * 0.5, 0.3) : n);

  gsap.set('.hero-video-title, .hero-video-subtitle, .hero-video-features li, .hero-video-tagline, .hero-video-ctas', { opacity: 0, y: 20 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to('.hero-video-title', { opacity: 1, y: 0, duration: d(0.5) })
    .to('.hero-video-subtitle', { opacity: 1, y: 0, duration: d(0.5) }, '-=0.3')
    .to('.hero-video-features li', { opacity: 1, y: 0, duration: d(0.5), stagger: 0.1 }, '-=0.35')
    .to('.hero-video-tagline', { opacity: 1, y: 0, duration: d(0.45) }, '-=0.25')
    .to('.hero-video-ctas', { opacity: 1, y: 0, duration: d(0.5) }, '-=0.3');
}

/* ==============================
   SCROLL ANIMATIONS
   ============================== */
function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const d = (n) => (prefersReducedMotion ? Math.min(n * 0.5, 0.3) : n);

  gsap.utils.toArray('.enfoque-card').forEach((el, i) => {
    gsap.set(el, { opacity: 0, y: 24 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: d(0.6), delay: i * 0.05 });
      },
      once: true,
    });
  });

  gsap.from('.contact-card-luxury', {
    scrollTrigger: { trigger: '#contacto', start: 'top 88%' },
    y: 32, opacity: 0, duration: d(0.7),
  });
}

/* ==============================
   SMOOTH SCROLL CTA
   ============================== */
function initSmoothScroll() {
  document.getElementById('cta-explore')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('trayectoria')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ==============================
   TRAYECTORIA MAP — Mobile Accordion
   ============================== */
function initMetroMobile() {
  const container = document.getElementById('metro-mobile');
  if (!container) return;

  // Define line order for mobile display
  const lineOrder = ['inicio', 'formacion', 'clinica', 'metabolismo', 'comunicacion', 'final'];

  // Group stations by line
  const linesMap = {};
  lineOrder.forEach(lineKey => {
    linesMap[lineKey] = {
      name: getLineNames()[lineKey] || lineKey,
      color: LINE_COLORS[lineKey],
      stations: [],
    };
  });

  Object.entries(METRO_CONTENT).forEach(([id, data]) => {
    if (linesMap[data.line]) {
      linesMap[data.line].stations.push({ id, ...data });
    }
  });

  // Build HTML
  let html = '';
  lineOrder.forEach(lineKey => {
    const line = linesMap[lineKey];
    if (!line || line.stations.length === 0) return;

    html += `
      <div class="mm-line" data-line="${lineKey}">
        <button class="mm-line-header" aria-expanded="false" style="--line-color:${line.color}">
          <div class="mm-line-dot" style="background:${line.color}"></div>
          <div class="mm-line-name">${line.name}</div>
          <div class="mm-chevron">▼</div>
        </button>
        <div class="mm-stations" style="--line-color:${line.color}">
    `;

    line.stations.forEach(st => {
      html += `
          <button class="mm-station-btn" data-station="${st.id}">
            <div class="mm-station-pip" style="border-color:${line.color}"></div>
            <div class="mm-station-info">
              <div class="mm-station-name">${getMetroTitle(st.id)}</div>
              <div class="mm-station-year" style="color:${line.color}">${st.year}</div>
            </div>
            <div class="mm-station-arrow">›</div>
          </button>
      `;
    });

    html += `</div></div>`;
  });

  container.innerHTML = html;

  // Accordion toggle
  container.querySelectorAll('.mm-line-header').forEach(header => {
    header.addEventListener('click', () => {
      const parentLine = header.parentElement;
      const isOpen = parentLine.classList.contains('open');
      container.querySelectorAll('.mm-line').forEach(l => {
        l.classList.remove('open');
        l.querySelector('.mm-line-header').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        parentLine.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Station tap — opens bottom-sheet panel
  const panel = document.getElementById('metro-panel');
  const panelBody = panel?.querySelector('.metro-panel-body');

  container.querySelectorAll('.mm-station-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.getAttribute('data-station');
      const data = METRO_CONTENT[id];
      if (!data || !panel || !panelBody) return;

      const color = LINE_COLORS[data.line] || '#B38645';
      panelBody.innerHTML = `
        <span class="metro-panel-tag" style="background:${color}">${getLineNames()[data.line] || ''}</span>
        <p class="metro-panel-year">${data.year}</p>
        <h3 class="metro-panel-title">${getMetroTitle(id)}</h3>
        <p class="metro-panel-institution">${getMetroInstitution(id)}</p>
        <ul class="metro-panel-list">${getMetroItems(id).map(i => `<li>${i}</li>`).join('')}</ul>
      `;
      panel.style.borderLeftColor = color;
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
    });
  });
}

/* ==============================
   INIT
   ============================== */
/* ==============================
   I18N — Switch Language
   ============================== */
function switchLanguage(lang) {
  currentLang = lang;
  const dict = TRANSLATIONS[lang];
  if (!dict) return;

  // Update data-i18n text elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] != null) el.textContent = dict[key];
  });

  // Update data-i18n-html elements (innerHTML)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] != null) el.innerHTML = dict[key];
  });

  // Update SVG text elements
  document.querySelectorAll('[data-i18n-svg]').forEach(el => {
    const key = el.getAttribute('data-i18n-svg');
    if (dict[key] != null) el.textContent = dict[key];
  });

  // Update lang attribute
  document.documentElement.lang = lang;

  // Toggle active lang button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Rebuild mobile metro with new translations
  initMetroMobile();
}

function initLangToggle() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang && lang !== currentLang) switchLanguage(lang);
    });
  });
}

/* ==============================
   INIT
   ============================== */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMetroMap();
  initMetroMobile();
  initHeroAnimations();
  initScrollAnimations();
  initSmoothScroll();
  initLangToggle();
});
