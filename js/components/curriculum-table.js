import { RAPS_TECNICOS, RAPS_TRANSVERSALES, COMPETENCIAS_MATRIZ } from '../data/normas-raps.js';
import { CURRICULO_TECNOLOGO } from '../data/curriculo-tecnologo.js';
import { CURRICULO_MODELADO } from '../data/curriculo-modelado.js';
import { CURRICULO_ANIMACION } from '../data/curriculo-animacion.js';

export class CurriculumTable {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.filterType = 'all'; // all, tecnico, transversal (para trimestres)
    this.competenciaFilter = 'all'; // all, tecnico, transversal (para matriz)
    this.isCompetenciasExpanded = true; // Estado del acordeón de competencias
  }

  toggleCompetenciasAccordion() {
    this.isCompetenciasExpanded = !this.isCompetenciasExpanded;
    const body = document.getElementById('competenciasAccordionBody');
    const chevron = document.getElementById('competenciasChevron');
    const filters = document.getElementById('competenciasHeaderFilters');
    const badge = document.getElementById('competenciasCollapsedBadge');
    const headerBorder = document.getElementById('competenciasHeaderBox');

    if (body) {
      body.style.display = this.isCompetenciasExpanded ? 'block' : 'none';
    }
    if (chevron) {
      chevron.innerHTML = this.isCompetenciasExpanded ? '▲' : '▼';
    }
    const btnToggle = document.getElementById('btnToggleCompetencias');
    if (btnToggle) {
      btnToggle.title = this.isCompetenciasExpanded ? 'Contraer sección (subir)' : 'Desplegar sección (bajar)';
    }
    if (filters) {
      filters.style.display = this.isCompetenciasExpanded ? 'flex' : 'none';
    }
    if (badge) {
      badge.style.display = this.isCompetenciasExpanded ? 'none' : 'inline-flex';
    }
    if (headerBorder) {
      headerBorder.style.borderBottom = this.isCompetenciasExpanded ? '1px solid var(--border-color)' : 'none';
      headerBorder.style.marginBottom = this.isCompetenciasExpanded ? '1.25rem' : '0';
      headerBorder.style.paddingBottom = this.isCompetenciasExpanded ? '0.85rem' : '0';
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  filterCompetencias(tipo) {
    this.competenciaFilter = tipo;
    const cards = document.querySelectorAll('.comp-card');
    const btns = document.querySelectorAll('.comp-filter-btn');

    btns.forEach(btn => {
      const isActive = btn.dataset.filter === tipo;
      btn.classList.toggle('primary', isActive);
      if (isActive) {
        btn.style.background = 'linear-gradient(135deg, #0284c7, #2563eb)';
        btn.style.borderColor = '#38bdf8';
        btn.style.color = '#ffffff';
      } else {
        btn.style.background = 'rgba(15, 23, 42, 0.6)';
        btn.style.borderColor = 'rgba(148, 163, 184, 0.2)';
        btn.style.color = 'var(--text-muted)';
      }
    });

    cards.forEach(card => {
      if (tipo === 'all' || card.dataset.tipo === tipo) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  renderCompetenciasSection(curriculo) {
    const tecnicas = COMPETENCIAS_MATRIZ.filter(c => c.tipo === 'tecnico');
    const transversales = COMPETENCIAS_MATRIZ.filter(c => c.tipo === 'transversal');

    // Mapeo dinámico de fases y RAPs para cada competencia
    const getCompDetails = (comp) => {
      const fases = new Set();
      const trimestres = new Set();
      const raps = [];

      curriculo.trimestres.forEach(t => {
        t.raps.forEach(r => {
          const isTec = r.tipo === 'tecnico';
          const data = isTec ? RAPS_TECNICOS[r.rap_id] : RAPS_TRANSVERSALES[r.rap_id];
          if (!data) return;

          const matchTec = isTec && (data.norma_codigo === comp.codigo);
          const matchTrans = !isTec && (
            (data.competencia && data.competencia.includes(comp.codigo)) ||
            (data.norma_codigo && data.norma_codigo === comp.codigo) ||
            (comp.codigo === '220501096' && r.rap_id === 'RAP-31')
          );

          if (matchTec || matchTrans) {
            fases.add(t.fase_ciclo || t.fase_proyecto);
            trimestres.add('T' + t.numero);
            raps.push({
              id: r.rap_id,
              alias: r.alias || (data.id || r.rap_id),
              nombre: isTec ? data.resultado_aprendizaje : data.nombre,
              horas: r.horas || data.horas || 48
            });
          }
        });
      });

      return {
        fases: Array.from(fases),
        trimestres: Array.from(trimestres),
        raps
      };
    };

    return `
      <!-- SECCIÓN 1: MATRIZ DE COMPETENCIAS LABORALES (ORDENADAS EN TÉCNICAS Y TRANSVERSALES) -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 2.25rem; backdrop-filter: blur(10px);">
        
        <!-- Header de Competencias con Toggle de Acordeón -->
        <div id="competenciasHeaderBox" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: ${this.isCompetenciasExpanded ? '1.25rem' : '0'}; border-bottom: ${this.isCompetenciasExpanded ? '1px solid var(--border-color)' : 'none'}; padding-bottom: ${this.isCompetenciasExpanded ? '0.85rem' : '0'}; transition: all 0.25s ease;">
          <div style="cursor: pointer; flex: 1;" onclick="window.app.curriculumTable.toggleCompetenciasAccordion()">
            <div style="display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap;">
              <span class="badge cyan" style="font-size: 0.82rem; padding: 3px 9px;">Normas de Competencia Laboral</span>
              <h2 style="font-size: 1.4rem; font-weight: 800; margin: 0; color: #fff;">🏛️ Matriz de Competencias del Programa</h2>
              <span id="competenciasCollapsedBadge" style="display: ${this.isCompetenciasExpanded ? 'none' : 'inline-flex'}; font-size: 0.75rem; color: #38bdf8; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.25); padding: 3px 9px; border-radius: 4px; font-weight: 700;">
                15 Competencias (6 Técnicas · 9 Transversales) · 3.120 h
              </span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.88rem; margin: 0.35rem 0 0 0;">
              Clasificación oficial en <strong>Competencias Específicas (Técnicas 3D)</strong> y <strong>Competencias Básicas (Transversales y Claves)</strong>, con sus RAPs y Fases asociadas.
            </p>
          </div>

          <!-- Controles de la derecha: Filtros y Botón Acordeón -->
          <div style="display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap;">
            <!-- Filtros de Competencias -->
            <div id="competenciasHeaderFilters" style="display: ${this.isCompetenciasExpanded ? 'flex' : 'none'}; gap: 0.35rem; background: rgba(15, 23, 42, 0.6); padding: 0.3rem; border-radius: 8px; border: 1px solid var(--border-color); flex-wrap: wrap;">
              <button type="button" class="btn-action comp-filter-btn primary" data-filter="all" onclick="window.app.curriculumTable.filterCompetencias('all')" style="padding: 0.35rem 0.75rem; font-size: 0.78rem; font-weight: 700; background: linear-gradient(135deg, #0284c7, #2563eb); border-color: #38bdf8; color: #fff;">
                Todas (15)
              </button>
              <button type="button" class="btn-action comp-filter-btn" data-filter="tecnico" onclick="window.app.curriculumTable.filterCompetencias('tecnico')" style="padding: 0.35rem 0.75rem; font-size: 0.78rem; font-weight: 700; color: #38bdf8; background: rgba(15, 23, 42, 0.6); border-color: rgba(148, 163, 184, 0.2);">
                🛠️ Técnicas (6)
              </button>
              <button type="button" class="btn-action comp-filter-btn" data-filter="transversal" onclick="window.app.curriculumTable.filterCompetencias('transversal')" style="padding: 0.35rem 0.75rem; font-size: 0.78rem; font-weight: 700; color: #c084fc; background: rgba(15, 23, 42, 0.6); border-color: rgba(148, 163, 184, 0.2);">
                🌱 Transversales (9)
              </button>
            </div>

            <!-- Botón Acordeón Expandir / Colapsar -->
            <button type="button" id="btnToggleCompetencias" class="btn-action" onclick="window.app.curriculumTable.toggleCompetenciasAccordion()" title="Expandir o Colapsar Matriz de Competencias" style="width: 38px; height: 38px; padding: 0; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.35); color: #38bdf8; font-size: 1rem; cursor: pointer; transition: all 0.25s ease;">
              <span id="competenciasChevron" style="display: inline-block; font-size: 0.95rem; font-weight: bold; line-height: 1;">${this.isCompetenciasExpanded ? '▲' : '▼'}</span>
            </button>
          </div>
        </div>

        <!-- CUERPO DEL ACORDEÓN DE COMPETENCIAS (KPIs + REJILLA) -->
        <div id="competenciasAccordionBody" style="display: ${this.isCompetenciasExpanded ? 'block' : 'none'}; transition: all 0.3s ease;">
        <!-- Tarjetas de Resumen Numérico -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 0.85rem 1rem;">
            <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 700; text-transform: uppercase;">Componente Específico (Técnicas 3D)</span>
            <div style="font-size: 1.35rem; font-weight: 800; color: #38bdf8; margin: 3px 0;">1.776 h <span style="font-size: 0.82rem; font-weight: normal; color: #cbd5e1;">(37 Créditos)</span></div>
            <span style="font-size: 0.75rem; color: #38bdf8;">6 Competencias Específicas</span>
          </div>

          <div style="background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.25); border-radius: 8px; padding: 0.85rem 1rem;">
            <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 700; text-transform: uppercase;">Componente Básico (Transversales y Claves)</span>
            <div style="font-size: 1.35rem; font-weight: 800; color: #c084fc; margin: 3px 0;">672 h <span style="font-size: 0.82rem; font-weight: normal; color: #cbd5e1;">(14 Créditos)</span></div>
            <span style="font-size: 0.75rem; color: #c084fc;">9 Competencias Institucionales</span>
          </div>

          <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 0.85rem 1rem;">
            <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 700; text-transform: uppercase;">Etapa Práctica (Empresarial)</span>
            <div style="font-size: 1.35rem; font-weight: 800; color: #34d399; margin: 3px 0;">672 h <span style="font-size: 0.82rem; font-weight: normal; color: #cbd5e1;">(14 Créditos)</span></div>
            <span style="font-size: 0.75rem; color: #34d399;">Aplicación en el Sector Productivo</span>
          </div>

          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 0.85rem 1rem;">
            <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 700; text-transform: uppercase;">Total Tecnólogo en Producción 3D</span>
            <div style="font-size: 1.35rem; font-weight: 800; color: #f8fafc; margin: 3px 0;">3.120 h <span style="font-size: 0.82rem; font-weight: normal; color: #cbd5e1;">(65 Créditos)</span></div>
            <span style="font-size: 0.75rem; color: #94a3b8;">Código SENA 522301</span>
          </div>
        </div>

        <!-- Grid de las 15 Competencias -->
        <div id="competenciasCardsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 0.85rem;">
          ${COMPETENCIAS_MATRIZ.map(comp => {
            const isTec = comp.tipo === 'tecnico';
            const details = getCompDetails(comp);
            const badgeColor = isTec ? '#38bdf8' : '#c084fc';
            const badgeBg = isTec ? 'rgba(56, 189, 248, 0.15)' : 'rgba(168, 85, 247, 0.15)';
            const badgeBorder = isTec ? 'rgba(56, 189, 248, 0.4)' : 'rgba(168, 85, 247, 0.4)';
            const typeLabel = isTec ? '🛠️ ESPECÍFICA (3D)' : '🌱 BÁSICA / CLAVE';

            return `
              <div class="comp-card" data-tipo="${comp.tipo}" style="background: rgba(15, 23, 42, 0.65); border: 1px solid ${badgeBorder}; border-radius: 8px; padding: 1.15rem; transition: transform 0.2s, border-color 0.2s; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <!-- Encabezado de la Tarjeta -->
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.65rem; flex-wrap: wrap;">
                    <div style="display: flex; gap: 0.45rem; align-items: center; flex-wrap: wrap;">
                      <span style="font-weight: 800; font-size: 0.82rem; padding: 2px 8px; border-radius: 4px; background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder}; letter-spacing: 0.02em;">
                        ${this.escapeHtml(comp.codigo)}
                      </span>
                      <span style="font-size: 0.72rem; font-weight: 700; color: ${badgeColor};">
                        ${typeLabel}
                      </span>
                    </div>
                    <span style="font-size: 0.75rem; color: #94a3b8; font-weight: 600; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">
                      ⏱️ ${comp.horas_totales} h (${comp.creditos || 1} cr)
                    </span>
                  </div>

                  <!-- Título de la Norma -->
                  <h4 style="font-size: 0.95rem; font-weight: 700; color: #f8fafc; line-height: 1.35; margin: 0 0 0.5rem 0;">
                    ${this.escapeHtml(comp.nombre)}
                  </h4>

                  <!-- Área temática -->
                  ${comp.area ? `
                    <div style="font-size: 0.74rem; color: #94a3b8; margin-bottom: 0.65rem;">
                      <strong style="color: #cbd5e1;">Área:</strong> ${this.escapeHtml(comp.area)}
                    </div>
                  ` : ''}

                  <!-- Fases donde se ejecuta -->
                  <div style="display: flex; gap: 0.35rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem;">
                    <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">Fases:</span>
                    ${details.fases.length > 0 ? details.fases.map(f => {
                      const fColor = f.includes('PLANEAR') ? '#34d399' : (f.includes('HACER') ? '#38bdf8' : (f.includes('VERIFICAR') ? '#fbbf24' : '#c084fc'));
                      return `<span style="font-size: 0.7rem; font-weight: 700; padding: 1px 6px; border-radius: 4px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: ${fColor};">${this.escapeHtml(f)}</span>`;
                    }).join('') : '<span style="font-size: 0.7rem; color: #64748b;">Malla General</span>'}
                  </div>
                </div>

                <!-- Lista de RAPs asociados -->
                <div style="background: rgba(0, 0, 0, 0.25); border-radius: 6px; padding: 0.6rem 0.75rem; border: 1px solid rgba(255, 255, 255, 0.05); margin-top: 0.5rem;">
                  <strong style="font-size: 0.72rem; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 0.3rem;">
                    🎯 RAPs Asociados (${details.raps.length}):
                  </strong>
                  ${details.raps.length > 0 ? `
                    <ul style="margin: 0; padding-left: 1rem; font-size: 0.73rem; color: #cbd5e1; line-height: 1.35;">
                      ${details.raps.map(r => `
                        <li style="margin-bottom: 2px;">
                          <strong style="color: ${badgeColor};">${this.escapeHtml(r.alias || r.id)}:</strong> ${this.escapeHtml(r.nombre.substring(0, 75))}... (${r.horas}h)
                        </li>
                      `).join('')}
                    </ul>
                  ` : '<span style="font-size: 0.72rem; color: #64748b;">Articulada en transversales formativas.</span>'}
                </div>

              </div>
            `;
          }).join('')}
        </div>

        </div> <!-- Fin de #competenciasAccordionBody -->
      </div>
    `;
  }

  render(programType = 'tecnologo') {
    if (!this.container) return;

    let curriculo = CURRICULO_TECNOLOGO;
    if (programType === 'modelado') curriculo = CURRICULO_MODELADO;
    if (programType === 'animacion') curriculo = CURRICULO_ANIMACION;

    this.container.innerHTML = `
      <div style="margin-bottom: 2rem;">

        <!-- SECCIÓN 1: MATRIZ DE COMPETENCIAS LABORALES DEL PROGRAMA -->
        ${this.renderCompetenciasSection(curriculo)}

        <!-- SECCIÓN 2: MALLA CURRICULAR POR TRIMESTRES Y RAPs -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <h2 style="font-size: 1.45rem; font-weight: 800; letter-spacing: -0.02em; color: #fff;">🗓️ Malla Curricular por Trimestres y Resultados de Aprendizaje</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Distribución secuencial de 7 trimestres lectivos, horas directas y evidencias evaluativas.</p>
          </div>
          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
            <button class="btn-action primary" onclick="window.app.openCreateRapModal('I')" style="font-size: 0.85rem; padding: 0.45rem 0.9rem; font-weight: 700; background: linear-gradient(135deg, #0284c7, #2563eb);">
              <span>➕</span> Agregar Nuevo RAP
            </button>
            <div style="display: flex; gap: 0.35rem; background: var(--bg-card); padding: 0.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <button class="btn-action ${this.filterType === 'all' ? 'primary' : ''}" style="padding: 0.35rem 0.7rem; font-size: 0.8rem;" onclick="window.app.filterCurriculum('all')">Todos</button>
              <button class="btn-action ${this.filterType === 'tecnico' ? 'primary' : ''}" style="padding: 0.35rem 0.7rem; font-size: 0.8rem;" onclick="window.app.filterCurriculum('tecnico')">Solo Técnicos</button>
              <button class="btn-action ${this.filterType === 'transversal' ? 'primary' : ''}" style="padding: 0.35rem 0.7rem; font-size: 0.8rem;" onclick="window.app.filterCurriculum('transversal')">Solo Transversales</button>
            </div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2rem;">
          ${curriculo.trimestres.map(trim => {
            const visibleRaps = trim.raps.filter(r => {
              if (this.filterType === 'all') return true;
              return r.tipo === this.filterType;
            });

            if (visibleRaps.length === 0) return '';

            const phvaMap = {
              'I': { fase: 'FASE 1 (PLANEAR)', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.18)', border: 'rgba(56, 189, 248, 0.45)' },
              'II': { fase: 'FASE 2 (HACER)', color: '#10b981', bg: 'rgba(16, 185, 129, 0.18)', border: 'rgba(16, 185, 129, 0.45)' },
              'III': { fase: 'FASE 3 (HACER)', color: '#10b981', bg: 'rgba(16, 185, 129, 0.18)', border: 'rgba(16, 185, 129, 0.45)' },
              'IV': { fase: 'FASE 4 (HACER)', color: '#10b981', bg: 'rgba(16, 185, 129, 0.18)', border: 'rgba(16, 185, 129, 0.45)' },
              'V': { fase: 'FASE 5 (VERIFICAR)', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.18)', border: 'rgba(245, 158, 11, 0.45)' },
              'VI': { fase: 'FASE 6 (VERIFICAR)', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.18)', border: 'rgba(245, 158, 11, 0.45)' },
              'VII': { fase: 'FASE 7 (ACTUAR)', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.18)', border: 'rgba(168, 85, 247, 0.45)' }
            };
            const pInfo = phvaMap[trim.numero] || (trim.fase_proyecto ? { fase: trim.fase_proyecto, color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.18)', border: 'rgba(56, 189, 248, 0.45)' } : { fase: `FASE ${trim.numero}`, color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.15)', border: 'rgba(148, 163, 184, 0.35)' });

            return `
              <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; backdrop-filter: blur(10px);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.85rem; flex-wrap: wrap; gap: 0.75rem;">
                  <div style="display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap;">
                    <span style="background: var(--accent-blue); color: white; font-weight: 800; font-size: 0.85rem; padding: 0.3rem 0.75rem; border-radius: 8px;">TRIMESTRE ${trim.numero}</span>
                    <span style="background: ${pInfo.bg}; color: ${pInfo.color}; border: 1px solid ${pInfo.border}; font-weight: 800; font-size: 0.78rem; padding: 0.28rem 0.65rem; border-radius: 6px; letter-spacing: 0.02em; display: inline-flex; align-items: center; gap: 0.3rem;">
                      <span>📌</span> ${pInfo.fase}
                    </span>
                    <h3 style="font-size: 1.25rem; font-weight: 700; margin: 0;">${trim.fase}</h3>
                  </div>
                  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                    <button class="btn-action" onclick="window.app.openCreateRapModal('${trim.numero}')" title="Agregar nuevo RAP al Trimestre ${trim.numero}" style="padding: 0.3rem 0.75rem; font-size: 0.82rem; background: rgba(56, 189, 248, 0.12); border: 1px solid var(--accent-cyan); color: var(--accent-cyan); border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.35rem; font-weight: 700; transition: all 0.2s;" onmouseover="this.style.background='rgba(56, 189, 248, 0.25)'" onmouseout="this.style.background='rgba(56, 189, 248, 0.12)'">
                      <span style="font-size: 1rem; line-height: 1;">➕</span>
                      <span>Nuevo RAP</span>
                    </button>
                    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">⏱️ ${trim.horas_totales} Horas Directas</span>
                    <span style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 700;">🎓 ${trim.creditos} Créditos</span>
                  </div>
                </div>

                <div style="overflow-x: auto;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                    <thead>
                      <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--text-dim); text-align: left; font-size: 0.78rem; text-transform: uppercase;">
                        <th style="padding: 0.75rem 0.5rem; width: 90px;">Código</th>
                        <th style="padding: 0.75rem 0.5rem; width: 140px;">Tipo</th>
                        <th style="padding: 0.75rem 0.5rem;">Resultado de Aprendizaje (RAP) / Competencia</th>
                        <th style="padding: 0.75rem 0.5rem;">Evidencia de Aprendizaje Principal</th>
                        <th style="padding: 0.75rem 0.5rem; width: 100px; text-align: right;">Horas</th>
                        <th style="padding: 0.75rem 0.5rem; width: 90px; text-align: center;">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${visibleRaps.map(r => {
                        const isTecnico = r.tipo === 'tecnico';
                        const data = isTecnico ? RAPS_TECNICOS[r.rap_id] : RAPS_TRANSVERSALES[r.rap_id];
                        if (!data) return '';

                        const isApagado = !!data._disabled;
                        const labelId = r.alias || (data.id || r.rap_id);
                        const nombreRap = isTecnico ? data.resultado_aprendizaje : data.nombre;
                        const normaNombre = isTecnico ? `${data.norma_codigo} - ${data.norma_nombre}` : data.competencia;
                        const horas = isTecnico ? data.horas : (r.horas || data.horas);
                        const evidencia = data.evidencia || 'Evidencia definida en la guía institucional.';

                        const trStyle = isApagado ? 'opacity: 0.45; filter: grayscale(1);' : '';

                        return `
                          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background-color var(--transition-fast); ${trStyle}">
                            <td style="padding: 0.75rem 0.5rem; vertical-align: top;">
                              <span class="badge ${isTecnico ? 'cyan' : 'purple'}" style="font-size: 0.75rem; font-weight: 700;">
                                ${labelId}
                              </span>
                            </td>
                            <td style="padding: 0.75rem 0.5rem; vertical-align: top;">
                              <span style="font-size: 0.75rem; text-transform: uppercase; color: ${isTecnico ? 'var(--accent-cyan)' : '#c084fc'}; font-weight: 600;">
                                ${isTecnico ? '🛠️ Específico 3D' : '🌱 Transversal'}
                              </span>
                            </td>
                            <td style="padding: 0.75rem 0.5rem; vertical-align: top;">
                              <div style="font-weight: 600; color: var(--text-main); margin-bottom: 0.25rem; line-height: 1.4;">
                                ${nombreRap}
                              </div>
                              <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.35rem;">
                                <span style="font-weight: 600; color: #94a3b8;">Competencia:</span>
                                <span>${normaNombre}</span>
                              </div>
                            </td>
                            <td style="padding: 0.75rem 0.5rem; vertical-align: top; color: var(--text-dim); font-size: 0.85rem; line-height: 1.4;">
                              <div style="display: flex; align-items: flex-start; gap: 0.35rem;">
                                <span style="color: var(--accent-amber); font-size: 0.75rem; margin-top: 2px;">📦</span>
                                <span>${evidencia}</span>
                              </div>
                            </td>
                            <td style="padding: 0.75rem 0.5rem; vertical-align: top; text-align: right; font-weight: 600; color: var(--text-main);">
                              ${horas} h
                            </td>
                            <td style="padding: 0.75rem 0.5rem; vertical-align: top; text-align: center;">
                              <button class="btn-action" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="window.app.showRapModal('${r.rap_id}')">
                                Ver Detalle
                              </button>
                            </td>
                          </tr>
                        `;
                      }).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
}
