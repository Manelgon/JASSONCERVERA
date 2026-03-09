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
   METRO MAP — Data
   ============================== */
const LINE_COLORS = {
  formacion: '#B38645',
  clinica: '#2D8B7A',
  nutricion: '#4A7BB7',
  competencias: '#C07640',
  divulgacion: '#7B5EA7',
};

const LINE_NAMES_ES = {
  formacion: 'Formación académica',
  clinica: 'Experiencia clínica',
  nutricion: 'Nutrición clínica',
  competencias: 'Competencias',
  divulgacion: 'Divulgación',
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
  adema: {
    line: 'formacion', year: '2013',
    title: 'Técnico Superior en Dietética',
    institution: 'A.D.E.M.A.',
    items: [
      'Primera vocación clínica y excelencia académica',
      'Fundamentos de nutrición, metabolismo y fisiología',
      'Primer contacto con el abordaje nutricional de pacientes',
      'Base de la posterior trayectoria integradora',
    ],
    connections: ['adema-nut'], // 2013 — ambos en ADEMA simultáneamente
  },
  uib: {
    line: 'formacion', year: '2017',
    title: 'Grado en Enfermería',
    institution: 'Universitat de les Illes Balears',
    items: [
      'Comprensión profunda del cuerpo humano desde la práctica',
      'Hospitalización: cirugía, oncología, psiquiatría',
      'Habilidades clínicas y de comunicación médica',
      'Cuidado integral del paciente',
    ],
    connections: ['joan-xxiii', 'workshops'], // 2017 — prácticas + Ysonut activo
  },
  urv: {
    line: 'formacion', year: '2022',
    title: 'Grado en Medicina',
    institution: 'Universitat Rovira i Virgili',
    items: [
      'Formación completa durante la pandemia COVID-19',
      'Vacunación masiva y gestión en crisis sanitaria',
      'Integración de enfermería y nutrición en el criterio médico',
      'Especialización hacia medicina preventiva y longevidad',
    ],
    connections: ['cap-roses', 'biomarcadores', 'educacion-pac'], // 2021-22 — todo confluye
  },
  amir: {
    line: 'formacion', year: '2023',
    title: 'Máster Medicina Estética, Nutrición y Antienvejecimiento',
    institution: 'AMIR',
    items: [
      'Vanguardia en medicina antienvejecimiento',
      'Optimización metabólica y medicina personalizada',
      'Biomarcadores, epigenética y edad biológica',
      'Convergencia de toda la trayectoria hacia la longevidad',
    ],
    connections: ['cap', 'educacion-nut', 'longevidad', 'divulgacion-cient'], // 2023 — gran confluencia
  },
  'joan-xxiii': {
    line: 'clinica', year: '2017–2018',
    title: 'Enfermería Hospitalaria — Joan XXIII',
    institution: 'Hospital Universitari Joan XXIII, Tarragona',
    items: [
      'Hospitalización: cirugía, oncología y endoscopia',
      'Cuidados en entorno de hospital de tercer nivel',
      'Relación directa con equipo médico multidisciplinar',
      'Primera autonomía real en toma de decisiones clínicas',
    ],
    connections: ['uib', 'workshops'], // 2017 — simultáneo con UIB Enfermería + Ysonut activo
  },
  'son-espases': {
    line: 'clinica', year: '2018–2021',
    title: 'Enfermería en Hospital Universitario',
    institution: 'Hospital Son Espases, Palma de Mallorca',
    items: [
      'Cirugía plástica, reparadora y reconstructiva',
      'Psiquiatría y cuidados complejos hospitalizados',
      'Gestión avanzada de casos y protocolos de seguridad',
      'Consolidación de criterio clínico enfermero',
    ],
    connections: ['bioimpedancia', 'preventiva'], // 2018-19 — bioimpedancia y medicina preventiva
  },
  quiron: {
    line: 'clinica', year: '2019–2020',
    title: 'Enfermería en Cirugía Especializada',
    institution: 'Quirón Salud',
    items: [
      'Cirugía especializada en entorno hospitalario privado',
      'Protocolos de excelencia clínica y calidad asistencial',
      'Gestión avanzada de casos y pacientes complejos',
      'Trabajo multidisciplinar con criterio médico integrado',
    ],
    connections: ['autonomia'], // 2019-20 — autonomía médica emergente
  },
  'cap-roses': {
    line: 'clinica', year: '2022–2023',
    title: 'Médico de Atención Primaria y Urgencias',
    institution: 'CAP Roses · CAP Cadaqués',
    items: [
      '30–40 pacientes diarios con autonomía médica completa',
      'Control de HTA, diabetes tipo 2, dislipemia',
      'Urgencias ambulatorias en zonas rurales y costeras',
      'Primer ejercicio real como médico tras licenciatura',
    ],
    connections: ['urv', 'biomarcadores', 'educacion-pac'], // 2021-22 — simultáneo con URV
  },
  cap: {
    line: 'clinica', year: '2023–2024',
    title: 'Médico — CAP Sitges · Ametlla de Mar',
    institution: 'CAP Sitges · Hospital Francolí · Ametlla de Mar',
    items: [
      'Atención primaria y urgencias hospitalarias',
      'Guardia urgencias en Hospital Sant Joan de Reus',
      'Consolidación del criterio médico en alta demanda',
      'Más de 2 años de práctica médica independiente',
    ],
    connections: ['amir', 'educacion-nut', 'longevidad', 'divulgacion-cient'], // 2023 — gran confluencia
  },
  consultas: {
    line: 'clinica', year: 'Acumulado',
    title: '7.000+ Consultas Médicas',
    institution: 'Trayectoria clínica acumulada',
    items: [
      'Más de 7.000 consultas en atención primaria',
      'Más de 8 centros sanitarios distintos',
      'Manejo de riesgo médico con criterio y seguridad',
      'Listo para integrar protocolos de optimización en práctica real',
    ],
    connections: ['cap', 'amir'], // acumulado de todo el recorrido clínico
  },
  'adema-nut': {
    line: 'nutricion', year: '2013',
    title: 'Base en Dietética y Nutrición Clínica',
    institution: 'A.D.E.M.A.',
    items: [
      'Dietoterapia y nutrición clínica desde los fundamentos',
      'Metabolismo y composición corporal',
      'Primer enfoque integrativo de salud a través de la alimentación',
      'Base para el asesoramiento nutricional avanzado posterior',
    ],
    connections: ['adema'], // 2013 — misma institución que Técnico en Dietética
  },
  ysonut: {
    line: 'nutricion', year: '2015–2017',
    title: 'Asesor Nutricional Especializado',
    institution: 'Laboratorios Ysonut',
    items: [
      'Asesoramiento nutricional individualizado en clínicas estéticas',
      'Protocolos de nutrición proteica y recomposición corporal',
      'Seguimiento y adherencia en procesos de cambio de hábitos',
      'Formación continua en nutrición clínica avanzada',
    ],
    connections: ['formacion-prof'], // 2015 — formación profesionales Ysonut simultánea
  },
  bioimpedancia: {
    line: 'nutricion', year: '2018–presente',
    title: 'Bioimpedancia y Composición Corporal',
    institution: 'Análisis metabólico avanzado',
    items: [
      'Evaluación de masa muscular, grasa visceral y agua corporal',
      'Seguimiento metabólico longitudinal del paciente',
      'Visualización de resultados para motivar la adherencia',
      'Integración en diagnóstico clínico preventivo',
    ],
    connections: ['son-espases', 'preventiva'], // 2018-19 — junto con Son Espases y Preventiva
  },
  'educacion-nut': {
    line: 'nutricion', year: '2023–hoy',
    title: 'Educación Nutricional del Paciente',
    institution: 'Práctica clínica integradora',
    items: [
      'Empoderamiento del paciente a través del conocimiento metabólico',
      'Cambio de hábitos sostenibles y personalización de planes',
      'Optimización con enfoque preventivo y de longevidad',
      'Nutrición integrada en protocolos de medicina personalizada',
    ],
    connections: ['amir', 'cap', 'longevidad', 'divulgacion-cient'], // 2023 — confluencia total
  },
  preventiva: {
    line: 'competencias', year: '2018–core',
    title: 'Medicina Preventiva',
    institution: 'Eje central de práctica',
    items: [
      'Anticiparse a la enfermedad mediante diagnóstico avanzado',
      'Edad biológica y biomarcadores de envejecimiento',
      'Enfoque en factores de riesgo modificables',
      'Datos clínicos, genéticos y de estilo de vida integrados',
    ],
    connections: ['son-espases', 'bioimpedancia'], // 2018-19 — emerge durante Son Espases
  },
  autonomia: {
    line: 'competencias', year: '2019–2020',
    title: 'Autonomía Médica Completa',
    institution: 'Práctica clínica real',
    items: [
      'Decisiones clínicas independientes en alto volumen',
      'Gestión de urgencias con criterio y seguridad',
      'Confianza construida sobre una base clínica sólida',
      'Preparado para protocolos de vanguardia',
    ],
    connections: ['quiron'], // 2019-20 — consolidada en Quirón
  },
  biomarcadores: {
    line: 'competencias', year: '2021–2022',
    title: 'Biomarcadores y Diagnóstico Avanzado',
    institution: 'Medicina de precisión',
    items: [
      'Interpretación clínica de biomarcadores básicos y avanzados',
      'Marcadores inflamatorios, metabólicos y hormonales',
      'Diagnóstico de riesgo cardiovascular y metabólico',
      'Base para medicina personalizada y predictiva',
    ],
    connections: ['urv', 'cap-roses', 'educacion-pac'], // 2021-22 — junto con URV + CAP Roses
  },
  longevidad: {
    line: 'competencias', year: '2023 — objetivo',
    title: 'Longevidad y Optimización Biológica',
    institution: 'Medicina de longevidad',
    items: [
      'Optimizar calidad y esperanza de vida',
      'Medicina personalizada basada en datos y biomarcadores',
      'Genética, epigenética y estilo de vida integrados',
      'El objetivo final de toda la trayectoria profesional',
    ],
    connections: ['amir', 'cap', 'educacion-nut', 'divulgacion-cient'], // 2023 — gran confluencia
  },
  'formacion-prof': {
    line: 'divulgacion', year: '2015–2017',
    title: 'Formación a Profesionales Sanitarios',
    institution: 'Laboratorios Ysonut',
    items: [
      'Formación de equipos en clínicas estéticas sobre nutrición proteica',
      'Protocolos de asesoramiento nutricional para profesionales',
      'Materiales y guías clínicas internas',
      'Comunicación científica adaptada al contexto profesional',
    ],
    connections: ['ysonut'], // 2015 — simultáneo con asesoría Ysonut
  },
  workshops: {
    line: 'divulgacion', year: '2016–2018',
    title: 'Workshops de Nutrición Clínica',
    institution: 'Divulgación profesional',
    items: [
      'Sesiones formativas en composición corporal y bioimpedancia',
      'Herramientas para la educación del paciente en clínica',
      'Formación práctica en cambio de hábitos y adherencia',
      'Evidencia científica aplicada a la práctica diaria',
    ],
    connections: ['uib', 'joan-xxiii'], // 2017-18 — mientras UIB + Joan XXIII
  },
  'educacion-pac': {
    line: 'divulgacion', year: '2021–2022',
    title: 'Educación al Paciente',
    institution: 'Práctica médica',
    items: [
      'Comunicación clara de conceptos médicos complejos',
      'Empoderamiento del paciente para tomar decisiones',
      'Herramientas visuales para tangibilizar el progreso',
      'Adherencia terapéutica a largo plazo como objetivo',
    ],
    connections: ['urv', 'cap-roses', 'biomarcadores'], // 2021-22 — durante URV + CAP Roses
  },
  'divulgacion-cient': {
    line: 'divulgacion', year: '2023+',
    title: 'Divulgación Científica',
    institution: 'Comunicación médica',
    items: [
      'Traducir la evidencia en longevidad al público general',
      'Comunicación orientada a la prevención activa',
      'Desarrollo de contenido educativo de alta calidad',
      'Construir puentes entre la ciencia y la sociedad',
    ],
    connections: ['amir', 'cap', 'educacion-nut', 'longevidad'], // 2023 — confluencia total
  },

  /* === NUEVAS COMPETENCIAS === */
  cirugia: {
    line: 'competencias', year: '2018–2020',
    title: 'Asistencia Quirúrgica Especializada',
    institution: 'Son Espases · Quirón Salud',
    items: [
      'Cirugía plástica, reparadora y reconstructiva en Son Espases',
      'Cirugía especializada de alta complejidad en Quirón Salud',
      'Dominio de protocolos pre y postoperatorio avanzados',
      'Trabajo coordinado con cirujanos, anestesistas y enfermería',
    ],
    connections: ['son-espases', 'quiron', 'autonomia'], // directamente vinculada a hospitales
  },
  'gestion-ventas': {
    line: 'competencias', year: '2015–2017',
    title: 'Gestión Comercial y Crecimiento de Ventas',
    institution: 'Laboratorios Ysonut',
    items: [
      'Incremento sostenido de ventas en zona asignada',
      'Estrategia de captación y fidelización de clínicas',
      'Seguimiento de KPIs comerciales y objetivos trimestrales',
      'Comunicación del producto adaptada al perfil profesional',
    ],
    connections: ['ysonut', 'puntos-venta', 'formacion-prof'], // núcleo comercial Ysonut
  },
  'puntos-venta': {
    line: 'competencias', year: '2016–2018',
    title: 'Gestión de Red de Puntos de Venta',
    institution: 'Laboratorios Ysonut',
    items: [
      'Coordinación de red de clínicas estéticas y centros dietéticos',
      'Implantación de protocolos de presentación y exposición',
      'Formación in situ de equipos en punto de venta',
      'Gestión de stock, promociones y materiales de marketing',
    ],
    connections: ['gestion-ventas', 'ysonut', 'formacion-prof'], // extensión directa de ventas Ysonut
  },
  'cuidados-clinicos': {
    line: 'competencias', year: '2017–2018',
    title: 'Habilidades Clínicas Hospitalarias',
    institution: 'Hospital Joan XXIII, Tarragona',
    items: [
      'Cuidados de enfermería en cirugía, oncología y endoscopia',
      'Trabajo en equipo médico multidisciplinar de tercer nivel',
      'Gestión de pacientes de alta complejidad y cronicidad',
      'Toma de decisiones clínicas con autonomía supervisada',
    ],
    connections: ['joan-xxiii', 'preventiva', 'cirugia'], // directamente de Joan XXIII, sin relación Ysonut
  },
};


/* ==============================
   METRO MAP — Interactivity
   ============================== */
function initMetroMap() {
  const stations = document.querySelectorAll('.metro-station');
  const panel = document.getElementById('metro-panel');
  const panelBody = panel?.querySelector('.metro-panel-body');
  const panelClose = panel?.querySelector('.metro-tooltip-close');

  if (!panel || !panelBody || stations.length === 0) return;

  /* ── Inject ripple ring into every station ─────────── */
  stations.forEach((station, i) => {
    const circles = station.querySelectorAll('circle');
    // outer visible circle is index 1 (index 0 is the transparent hit area)
    const outerCircle = circles.length >= 2 ? circles[1] : circles[0];
    if (!outerCircle) return;

    const svgNS = 'http://www.w3.org/2000/svg';
    const ripple = document.createElementNS(svgNS, 'circle');
    ripple.setAttribute('cx', outerCircle.getAttribute('cx'));
    ripple.setAttribute('cy', outerCircle.getAttribute('cy'));
    ripple.setAttribute('r', outerCircle.getAttribute('r'));
    ripple.setAttribute('stroke', outerCircle.getAttribute('stroke') || '#B38645');
    ripple.setAttribute('class', 'metro-ripple');
    // Stagger start: spread 24 stations across 3s window
    ripple.style.animationDelay = `${((i * 0.37) % 3).toFixed(2)}s`;
    station.insertBefore(ripple, station.firstChild);
  });

  /* ── Helpers ─────────────────────────────────────── */
  // Return the two visible circles (skip transparent hit-area at index 0)
  function getVisibleCircles(station) {
    const circles = station.querySelectorAll('circle');
    return circles.length >= 3
      ? { outer: circles[1], inner: circles[2] }
      : { outer: circles[0], inner: circles[1] };
  }

  // Position the floating card near the station's screen location
  function positionPanel(filter) {
    const stationEl = document.querySelector(`.metro-station[data-filter="${filter}"]`);
    if (!stationEl) return;

    const { outer } = getVisibleCircles(stationEl);
    const circleRect = outer.getBoundingClientRect();

    const CARD_W = 308;
    const CARD_H = panel.offsetHeight || 280;
    const MARGIN = 12;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Try right → left → below
    let left = circleRect.right + MARGIN;
    let top = circleRect.top - 40;

    if (left + CARD_W > vw - MARGIN) {
      left = circleRect.left - CARD_W - MARGIN;
    }
    if (left < MARGIN) left = MARGIN;
    if (top + CARD_H > vh - MARGIN) top = vh - CARD_H - MARGIN;
    if (top < MARGIN) top = MARGIN;

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  }

  /* ── Hover animation ─────────────────────────────── */
  stations.forEach(station => {
    const { outer, inner } = getVisibleCircles(station);
    station.addEventListener('mouseenter', () => {
      if (station.classList.contains('active')) return;
      gsap.to(outer, { attr: { r: 14 }, duration: 0.18, ease: 'back.out(2)' });
      gsap.to(inner, { attr: { r: 6 }, duration: 0.18 });
    });
    station.addEventListener('mouseleave', () => {
      if (!station.classList.contains('active')) {
        gsap.to(outer, { attr: { r: 10 }, duration: 0.18 });
        gsap.to(inner, { attr: { r: 4 }, duration: 0.18 });
      }
    });
  });

  /* ── Open station card ───────────────────────────── */
  function openStation(filter) {
    const data = METRO_CONTENT[filter];
    if (!data) { console.warn('[Metro] No data for:', filter); return; }

    const color = LINE_COLORS[data.line] || '#B38645';
    const lineName = getLineNames()[data.line] || '';

    // Build connection chips HTML
    const connHTML = (data.connections || []).length > 0
      ? `<div class="metro-connections">
           <p class="metro-connections-label">Conexiones temporales</p>
           <div class="metro-connections-list">
             ${(data.connections || []).map(id => {
        const c = METRO_CONTENT[id];
        if (!c) return '';
        const cColor = LINE_COLORS[c.line] || '#aaa';
        const cLine = getLineNames()[c.line] || '';
        return `<button class="metro-conn-chip" data-goto="${id}">
                         <span class="metro-conn-dot" style="background:${cColor}"></span>
                         <span><strong>${cLine}</strong> · ${getMetroTitle(id)}</span>
                       </button>`;
      }).join('')}
           </div>
         </div>`
      : '';

    panelBody.innerHTML = `
      <span class="metro-panel-tag" style="background:${color}">${lineName}</span>
      <p class="metro-panel-year">${data.year}</p>
      <h4 class="metro-panel-title">${getMetroTitle(filter)}</h4>
      <p class="metro-panel-institution">${getMetroInstitution(filter)}</p>
      <ul class="metro-panel-list">
        ${getMetroItems(filter).map(i => `<li>${i}</li>`).join('')}
      </ul>
      ${connHTML}
    `;

    // Apply border color
    panel.style.borderLeftColor = color;

    // Reset all stations visually
    stations.forEach(s => {
      s.classList.remove('active');
      const { outer: oc, inner: ic } = getVisibleCircles(s);
      gsap.to(oc, { attr: { r: 10 }, duration: 0.15 });
      gsap.to(ic, { attr: { r: 4 }, duration: 0.15 });
    });

    // Pulse clicked station
    const activeStation = document.querySelector(`.metro-station[data-filter="${filter}"]`);
    if (activeStation) {
      activeStation.classList.add('active');
      const { outer: oc, inner: ic } = getVisibleCircles(activeStation);
      gsap.timeline()
        .to(oc, { attr: { r: 16 }, duration: 0.15, ease: 'power2.out' })
        .to(oc, { attr: { r: 13 }, duration: 0.22, ease: 'elastic.out(1,0.5)' });
      gsap.to(ic, { attr: { r: 5.5 }, duration: 0.25 });
    }

    // Show panel first (needed for offsetHeight)
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');

    // Position AFTER it's visible (so offsetHeight is correct)
    requestAnimationFrame(() => positionPanel(filter));

    // Wire connection chip clicks
    panel.querySelectorAll('.metro-conn-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openStation(btn.dataset.goto);
      });
    });
  }

  /* ── Close ───────────────────────────────────────── */
  function closePanel() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    stations.forEach(s => {
      s.classList.remove('active');
      const { outer: oc, inner: ic } = getVisibleCircles(s);
      gsap.to(oc, { attr: { r: 10 }, duration: 0.15 });
      gsap.to(ic, { attr: { r: 4 }, duration: 0.15 });
    });
  }

  /* ── Event listeners ─────────────────────────────── */
  stations.forEach(station => {
    station.addEventListener('click', (e) => {
      e.stopPropagation();
      openStation(station.getAttribute('data-filter'));
    });
    station.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openStation(station.getAttribute('data-filter'));
      }
    });
  });

  panelClose?.addEventListener('click', (e) => { e.stopPropagation(); closePanel(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });
  document.addEventListener('click', (e) => {
    if (panel.classList.contains('open') && !panel.contains(e.target)) {
      closePanel();
    }
  });
  // Reposition on resize
  window.addEventListener('resize', () => {
    const active = document.querySelector('.metro-station.active');
    if (active && panel.classList.contains('open')) {
      positionPanel(active.getAttribute('data-filter'));
    }
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
   METRO MAP — Mobile Accordion
   ============================== */
function initMetroMobile() {
  const container = document.getElementById('metro-mobile');
  if (!container) return;

  // Group stations by line
  const linesMap = {};
  Object.keys(LINE_NAMES_ES).forEach(lineKey => {
    linesMap[lineKey] = {
      name: LINE_NAMES_ES[lineKey],
      color: LINE_COLORS[lineKey],
      stations: []
    };
  });

  // Populate stations into lines
  Object.entries(METRO_CONTENT).forEach(([id, data]) => {
    if (linesMap[data.line]) {
      linesMap[data.line].stations.push({ id, ...data });
    }
  });

  // Build HTML
  let html = '';
  Object.keys(linesMap).forEach(lineKey => {
    const line = linesMap[lineKey];
    if (line.stations.length === 0) return;

    html += `
      <div class="mm-line" data-line="${lineKey}">
        <button class="mm-line-header" aria-expanded="false">
          <div class="mm-line-dot" style="background:${line.color}"></div>
          <div class="mm-line-name">${getLineNames()[lineKey]}</div>
          <div class="mm-chevron">▼</div>
        </button>
        <div class="mm-stations" style="--line-color: ${line.color}">
    `;

    line.stations.forEach(st => {
      html += `
          <button class="mm-station-btn" data-station="${st.id}">
            <div class="mm-station-pip" style="border-color:${line.color}"></div>
            <div class="mm-station-info">
              <div class="mm-station-name">${getMetroTitle(st.id)}</div>
              <div class="mm-station-year">${st.year}</div>
            </div>
            <div class="mm-station-arrow">›</div>
          </button>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Accordion Logic
  const lineHeaders = container.querySelectorAll('.mm-line-header');
  lineHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentLine = header.parentElement;
      const isOpen = parentLine.classList.contains('open');

      // Close all
      container.querySelectorAll('.mm-line').forEach(l => {
        l.classList.remove('open');
        l.querySelector('.mm-line-header').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked
      if (!isOpen) {
        parentLine.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Station Tap Logic
  const panel = document.getElementById('metro-panel');
  const panelBody = panel?.querySelector('.metro-panel-body');
  const stationBtns = container.querySelectorAll('.mm-station-btn');

  stationBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent document click from closing it immediately
      const id = btn.getAttribute('data-station');
      const data = METRO_CONTENT[id];
      if (!data || !panel || !panelBody) return;

      // Build content (reusing same logic as desktop)
      let connectionsHtml = '';

      if (data.connections && data.connections.length > 0) {
        connectionsHtml = data.connections
          .map((connId) => {
            const connData = METRO_CONTENT[connId];
            if (!connData) return '';
            const cColor = LINE_COLORS[connData.line];
            return `
              <button class="metro-conn-chip" data-goto="${connId}">
                <span class="metro-conn-dot" style="background:${cColor}"></span>
                ${getMetroTitle(connId)}
              </button>
            `;
          })
          .join('');
      }

      const connsTitle = currentLang === 'en' ? 'Key Interconnections' : 'Interconexiones Clave';

      panelBody.innerHTML = `
        <div class="metro-panel-header">
          <span class="metro-panel-year" style="color:${LINE_COLORS[data.line]}">${data.year}</span>
          <span class="metro-panel-inst">${getMetroInstitution(id)}</span>
        </div>
        <h3 class="metro-panel-title">${getMetroTitle(id)}</h3>
        <ul class="metro-panel-list">${getMetroItems(id).map(i => `<li>${i}</li>`).join('')}</ul>
        ${connectionsHtml ? `<div class="metro-panel-conns-title">${connsTitle}</div><div class="metro-panel-conns">${connectionsHtml}</div>` : ''}
      `;

      // Apply border color just like desktop
      panel.style.borderLeftColor = LINE_COLORS[data.line] || '#B38645';

      // Show panel as bottom sheet (desktop CSS handles float, mobile CSS handles sheet)
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
