// ====================================================================
// VISTA Y EDITOR DEDICADO DEL PROYECTO FORMATIVO SENA (GFPI-F-016)
// Tecnólogo en Producción de Contenidos 3D
// ====================================================================

import {
  getProyectoFormativo,
  saveProyectoFormativo,
  resetProyectoFormativo,
  PROYECTO_FORMATIVO_DEFAULT
} from '../data/proyecto-formativo-db.js';
import { COMPETENCIAS_MATRIZ } from '../data/normas-raps.js';

export class ProyectoFormativoView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    const urlParams = (typeof window !== 'undefined' && window.location) ? new URLSearchParams(window.location.search) : null;
    this.currentMode = (urlParams && urlParams.get('mode') === 'preview') ? 'preview' : 'edit';
    const secParam = urlParams ? urlParams.get('sec') : null;
    this.activeSection = (secParam === 'all') ? 'all' : (secParam ? parseInt(secParam, 10) : 1);
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

  render() {
    if (!this.container) return;

    const pf = getProyectoFormativo();

    this.container.innerHTML = `
      <div class="proyecto-formativo-container" style="max-width: 1280px; margin: 0 auto; padding-bottom: 3rem;">
        
        <!-- Header de la sección (No se imprime) -->
        <div class="view-header-card no-print" style="margin-bottom: 1.5rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.25rem 1.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.65rem;">
                <span class="badge cyan" style="font-size: 0.82rem; padding: 3px 9px;">GFPI-F-016 V03</span>
                <h1 style="font-size: 1.6rem; font-weight: 800; margin: 0; color: #fff;">📁 Proyecto Formativo</h1>
              </div>
              <p style="color: var(--text-muted); font-size: 0.88rem; margin: 0.35rem 0 0 0;">
                Definición y edición de los componentes, macroproyectos y entregables técnicos. Los cambios aquí actualizan automáticamente las Guías de Aprendizaje.
              </p>
            </div>

            <div style="display: flex; gap: 0.65rem; align-items: center; flex-wrap: wrap;">
              <!-- Toggle de Modos -->
              <div style="display: inline-flex; background: rgba(0,0,0,0.3); padding: 3px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
                <button type="button" class="btn-action ${this.currentMode === 'edit' ? 'primary' : ''}" onclick="window.app.proyectoView.setMode('edit')" style="padding: 0.45rem 0.9rem; font-size: 0.82rem; border-radius: 6px;">
                  ✏️ Editor
                </button>
                <button type="button" class="btn-action ${this.currentMode === 'preview' ? 'primary' : ''}" onclick="window.app.proyectoView.setMode('preview')" style="padding: 0.45rem 0.9rem; font-size: 0.82rem; border-radius: 6px;">
                  👁️ Documento Oficial
                </button>
              </div>

              <button type="button" class="btn-action primary" onclick="window.app.proyectoView.save()" style="background: linear-gradient(135deg, #10b981, #059669); font-weight: 700; padding: 0.55rem 1.1rem;">
                💾 Guardar Cambios
              </button>

              <button type="button" class="btn-action" onclick="window.app.proyectoView.printPDF()" style="border-color: rgba(56, 189, 248, 0.4); color: #38bdf8; padding: 0.55rem 1rem;">
                🖨️ Descargar en PDF
              </button>
            </div>
          </div>
        </div>

        <!-- Vista de Edición Interactiva -->
        <div id="proyectoEditSection" style="${this.currentMode === 'edit' ? 'display: block;' : 'display: none;'}" class="no-print">
          ${this.renderEditorForm(pf)}
        </div>

        <!-- Vista Previa / Documento Oficial Imprimible -->
        <div id="proyectoPreviewSection" style="${this.currentMode === 'preview' ? 'display: block;' : 'display: none;'}">
          <div class="doc-preview-wrapper" style="max-width: 950px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 25px rgba(0,0,0,0.6);">
            ${this.generateOfficialHTML(pf)}
          </div>
        </div>

      </div>
    `;
  }

  setMode(mode) {
    this.currentMode = mode;
    this.render();
  }

  onSelectSectionChange(val) {
    const target = val === 'all' ? 'all' : parseInt(val, 10);
    this.goToSection(target);
  }

  goToSection(secNum) {
    this.activeSection = secNum;
    const panels = document.querySelectorAll('.editor-section-panel');
    const indicator = document.getElementById('activeSectionIndicator');
    const selectNav = document.getElementById('sectionSelectNav');
    const btnPrev = document.getElementById('btnNavPrevTop');
    const btnNext = document.getElementById('btnNavNextTop');

    if (selectNav) {
      selectNav.value = String(secNum);
    }

    if (indicator) {
      indicator.textContent = secNum === 'all' ? 'Vista Completa (10 Secciones)' : `Sección ${secNum} de 10`;
    }

    if (btnPrev) {
      const isFirst = (secNum === 1 || secNum === 'all');
      btnPrev.disabled = isFirst;
      btnPrev.style.opacity = isFirst ? '0.35' : '1';
      btnPrev.style.cursor = isFirst ? 'not-allowed' : 'pointer';
    }

    if (btnNext) {
      if (secNum === 'all') {
        btnNext.disabled = true;
        btnNext.style.opacity = '0.35';
        btnNext.style.cursor = 'not-allowed';
      } else if (secNum === 10) {
        btnNext.disabled = false;
        btnNext.style.opacity = '1';
        btnNext.style.cursor = 'pointer';
        btnNext.innerHTML = 'Ver Oficial 👁️';
      } else {
        btnNext.disabled = false;
        btnNext.style.opacity = '1';
        btnNext.style.cursor = 'pointer';
        btnNext.innerHTML = 'Siguiente <span>▶</span>';
      }
    }

    panels.forEach(p => {
      if (secNum === 'all' || String(p.dataset.sec) === String(secNum)) {
        p.style.display = 'block';
      } else {
        p.style.display = 'none';
      }
    });

    const editEl = document.getElementById('proyectoEditSection');
    if (editEl) editEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

    nextSection() {
    if (this.activeSection === 'all') return;
    if (typeof this.activeSection === 'number' && this.activeSection < 10) {
      this.goToSection(this.activeSection + 1);
    } else if (this.activeSection === 10) {
      this.setMode('preview');
    }
  }

  prevSection() {
    if (this.activeSection === 'all') return;
    if (typeof this.activeSection === 'number' && this.activeSection > 1) {
      this.goToSection(this.activeSection - 1);
    }
  }

  filterPlaneacionPhase(phase) {
    const cards = document.querySelectorAll('.planeacion-card');
    const buttons = document.querySelectorAll('.planeacion-filter-btn');
    buttons.forEach(btn => {
      if (btn.dataset.phase === phase) {
        btn.classList.add('active');
        btn.style.background = 'rgba(56, 189, 248, 0.25)';
        btn.style.borderColor = '#38bdf8';
        btn.style.color = '#f8fafc';
      } else {
        btn.classList.remove('active');
        btn.style.background = 'rgba(15, 23, 42, 0.6)';
        btn.style.borderColor = 'rgba(148, 163, 184, 0.2)';
        btn.style.color = 'var(--text-muted)';
      }
    });
    cards.forEach(card => {
      if (phase === 'ALL' || card.dataset.phase === phase) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  renderNavFooter(secNum, title) {
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1.1rem; border-top: 1px solid var(--border-color); flex-wrap: wrap; gap: 0.75rem;">
        <button type="button" class="btn-action" onclick="window.app.proyectoView.prevSection()" ${secNum === 1 ? 'disabled style="opacity: 0.35; cursor: not-allowed;"' : 'style="font-size: 0.85rem;"'}>
          ⬅️ Anterior
        </button>
        <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600;">
          Paso ${secNum} de 10: <strong style="color: #f8fafc;">${title}</strong>
        </span>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button type="button" class="btn-action primary" onclick="window.app.proyectoView.save()" style="background: linear-gradient(135deg, #10b981, #059669); font-weight: 700; font-size: 0.85rem;">
            💾 Guardar
          </button>
          <button type="button" class="btn-action primary" onclick="window.app.proyectoView.nextSection()" style="font-size: 0.85rem; font-weight: 700; background: linear-gradient(135deg, #0284c7, #2563eb);">
            ${secNum === 10 ? '👁️ Previsualizar Oficial' : 'Siguiente ➡️'}
          </button>
        </div>
      </div>
    `;
  }

  renderOfficialPlaneacionRows(list) {
    if (!list || !Array.isArray(list)) return '';

    const phaseCounts = {};
    list.forEach(item => {
      const p = item.fase || 'PLANEAR';
      phaseCounts[p] = (phaseCounts[p] || 0) + 1;
    });

    const renderedPhases = new Set();

    return list.map((item, idx) => {
      const fase = item.fase || 'PLANEAR';
      const isFirstInPhase = !renderedPhases.has(fase);
      if (isFirstInPhase) renderedPhases.add(fase);
      const rowspan = isFirstInPhase ? phaseCounts[fase] : 0;

      const mTec = (item.competencia_tecnica || '').match(/^(\d+)\s*(.*)$/);
      const codTec = mTec ? mTec[1] : '';
      const nomTec = mTec ? mTec[2] : item.competencia_tecnica;

      const mTrans = (item.competencia_transversal || '').match(/^(\d+)\s*(.*)$/);
      const codTrans = mTrans ? mTrans[1] : '';
      const nomTrans = mTrans ? mTrans[2] : item.competencia_transversal;

      const bg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';

      return `
        <tr style="background: ${bg}; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
          ${isFirstInPhase ? `
            <td rowspan="${rowspan}" style="border: 1px solid #cbd5e1; padding: 8px 4px; text-align: center; vertical-align: middle; font-weight: 800; font-size: 8.5pt; background: #f1f5f9; color: #00324D; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
              ${this.escapeHtml(fase)}
            </td>
          ` : ''}
          <td style="border: 1px solid #cbd5e1; padding: 6px 8px; vertical-align: top; font-size: 8pt; text-align: justify; line-height: 1.35;">
            ${this.escapeHtml(item.actividad_proyecto)} <strong style="color: #64748b; font-size: 7.5pt; white-space: nowrap;">(48 hrs)</strong>
          </td>
          <td style="border: 1px solid #cbd5e1; padding: 6px 4px; text-align: center; vertical-align: top; font-weight: bold; font-size: 8pt; color: #0369a1;">
            <span style="display: inline-block; padding: 2px 5px; background: #e0f2fe; border-radius: 4px; border: 1px solid #bae6fd; font-size: 7.5pt;">${this.escapeHtml(item.guia_id)}</span>
          </td>
          <td style="border: 1px solid #cbd5e1; padding: 6px 8px; vertical-align: top; font-size: 7.5pt; line-height: 1.3;">
            ${codTec ? `<strong style="display: block; color: #0f172a; margin-bottom: 2px;">${this.escapeHtml(codTec)}</strong>` : ''}
            <span style="color: #334155;">${this.escapeHtml(nomTec)}</span>
          </td>
          <td style="border: 1px solid #cbd5e1; padding: 6px 8px; vertical-align: top; font-size: 7.5pt; line-height: 1.3; color: #0f172a;">
            ${this.escapeHtml(item.rap_tecnico)}
          </td>
          <td style="border: 1px solid #cbd5e1; padding: 6px 8px; vertical-align: top; font-size: 7.5pt; line-height: 1.3;">
            ${codTrans ? `<strong style="display: block; color: #0f172a; margin-bottom: 2px;">${this.escapeHtml(codTrans)}</strong>` : ''}
            <span style="color: #334155;">${this.escapeHtml(nomTrans)}</span>
          </td>
          <td style="border: 1px solid #cbd5e1; padding: 6px 8px; vertical-align: top; font-size: 7.5pt; line-height: 1.3; color: #0f172a;">
            ${this.escapeHtml(item.rap_transversal || 'Sustentación / Validación del Portafolio')}
          </td>
        </tr>
      `;
    }).join('');
  }

  renderEditorForm(pf) {
    const info = pf.info_basica || {};
    const mp1 = (pf.macroproyectos && pf.macroproyectos[0]) || {};
    const mp2 = (pf.macroproyectos && pf.macroproyectos[1]) || {};
    const mp3 = (pf.macroproyectos && pf.macroproyectos[2]) || {};
    const prob = pf.problema || {};
    const alc = pf.alcance || {};
    const inno = pf.innovacion_gestion || {};
    const val = pf.valoracion_productiva || {};

    const tecnicas = COMPETENCIAS_MATRIZ.filter(c => c.tipo === 'tecnico');
    const transversales = COMPETENCIAS_MATRIZ.filter(c => c.tipo === 'transversal');

    const isPanelVisible = (secNum) => {
      return (this.activeSection === 'all' || this.activeSection === secNum) ? 'display: block;' : 'display: none;';
    };

    return `
      <form id="proyectoFormativoForm" onsubmit="event.preventDefault(); window.app.proyectoView.save();">

        <!-- BARRA DE SUB-NAVEGACIÓN COMPACTA CON SELECT Y BOTONES ◀ / ▶ -->
        <div class="editor-subnav-bar" style="background: rgba(15, 23, 42, 0.85); border: 1px solid var(--border-color); border-radius: 12px; padding: 0.85rem 1.25rem; margin-bottom: 1.5rem; backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.85rem; box-shadow: 0 4px 14px rgba(0,0,0,0.25);">
          
          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; flex: 1;">
            <label for="sectionSelectNav" style="font-size: 0.85rem; font-weight: 700; color: #cbd5e1; display: flex; align-items: center; gap: 0.45rem; white-space: nowrap;">
              <span>📑</span> Ir a la Sección:
            </label>

            <!-- Menú Desplegable de Secciones -->
            <select id="sectionSelectNav" onchange="window.app.proyectoView.onSelectSectionChange(this.value)" style="background: #0b1329; color: #f8fafc; border: 1px solid #38bdf8; border-radius: 8px; padding: 0.5rem 0.9rem; font-size: 0.85rem; font-weight: 600; cursor: pointer; flex: 1; min-width: 280px; max-width: 480px; outline: none; box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);">
              <option value="1" ${this.activeSection === 1 ? 'selected' : ''}>1. Información Básica del Proyecto</option>
              <option value="2" ${this.activeSection === 2 ? 'selected' : ''}>2. Macroproyectos Nucleares (Hacer, Ver, Interactuar)</option>
              <option value="3" ${this.activeSection === 3 ? 'selected' : ''}>3. Planteamiento del Problema (2.1)</option>
              <option value="4" ${this.activeSection === 4 ? 'selected' : ''}>4. Justificación del Proyecto (2.2)</option>
              <option value="5" ${this.activeSection === 5 ? 'selected' : ''}>5. Alcance, Beneficiarios e Impactos (2.3 - 2.5)</option>
              <option value="6" ${this.activeSection === 6 ? 'selected' : ''}>6. Restricciones o Riesgos y Soluciones (2.5.3)</option>
              <option value="7" ${this.activeSection === 7 ? 'selected' : ''}>7. Productos o Resultados del Proyecto (2.5.4)</option>
              <option value="8" ${this.activeSection === 8 ? 'selected' : ''}>8. Innovación / Gestión Tecnológica (2.6)</option>
              <option value="9" ${this.activeSection === 9 ? 'selected' : ''}>9. Valoración Productiva (2.7)</option>
              <option value="10" ${this.activeSection === 10 ? 'selected' : ''}>10. Planeación del Proyecto (Actividades, Guías y Competencias)</option>
              <option value="all" ${this.activeSection === 'all' ? 'selected' : ''}>👁️ Ver Todo el Proyecto (Edición Continua)</option>
            </select>

            <!-- Botones Compactos de Retroceder y Adelantar -->
            <div style="display: inline-flex; align-items: center; gap: 0.4rem;">
              <button type="button" id="btnNavPrevTop" class="btn-action" onclick="window.app.proyectoView.prevSection()" title="Sección Anterior" style="padding: 0.5rem 0.85rem; font-size: 0.85rem; border-radius: 8px; display: inline-flex; align-items: center; gap: 0.35rem; font-weight: 700; cursor: ${this.activeSection === 1 ? 'not-allowed' : 'pointer'}; ${this.activeSection === 1 ? 'opacity: 0.35;' : ''}" ${this.activeSection === 1 ? 'disabled' : ''}>
                <span>◀</span> Anterior
              </button>

              <button type="button" id="btnNavNextTop" class="btn-action primary" onclick="window.app.proyectoView.nextSection()" title="Siguiente Sección" style="padding: 0.5rem 0.95rem; font-size: 0.85rem; border-radius: 8px; display: inline-flex; align-items: center; gap: 0.35rem; font-weight: 700; background: linear-gradient(135deg, #0284c7, #2563eb); border: 1px solid #38bdf8; box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3);">
                ${this.activeSection === 10 ? 'Ver Oficial 👁️' : 'Siguiente <span>▶</span>'}
              </button>
            </div>
          </div>

          <!-- Indicador de Sección Activa -->
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <span id="activeSectionIndicator" style="font-size: 0.8rem; font-weight: 700; color: #38bdf8; background: rgba(56, 189, 248, 0.12); padding: 5px 12px; border-radius: 6px; border: 1px solid rgba(56, 189, 248, 0.3); white-space: nowrap;">
              ${this.activeSection === 'all' ? 'Vista Completa' : `Sección ${this.activeSection} de 10`}
            </span>
          </div>
        </div>

        <!-- 1. INFORMACIÓN BÁSICA DEL PROYECTO (PANEL 1) -->
        <div class="editor-section-panel" id="editorSec_1" data-sec="1" style="${isPanelVisible(1)}; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge cyan">Sección 1</span>
              <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">📄 Información Básica del Proyecto Formativo</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Campos Institucionales Oficiales</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
              <label class="form-label" style="font-weight: 700;">Nombre del Proyecto Formativo:</label>
              <textarea id="pfNombre" class="form-input" rows="2" style="font-size: 0.95rem; font-weight: 600; line-height: 1.4;">${this.escapeHtml(info.nombre_proyecto)}</textarea>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Este nombre se sincroniza automáticamente como encabezado en todas las Guías de Aprendizaje.</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
              <div>
                <label class="form-label">Código del Proyecto:</label>
                <input type="text" id="pfCodigo" class="form-input" value="${this.escapeHtml(info.codigo_proyecto)}">
              </div>
              <div>
                <label class="form-label">Programa de Formación:</label>
                <input type="text" class="form-input" value="${this.escapeHtml(info.programa)}" disabled style="opacity: 0.7;">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
              <div>
                <label class="form-label">Centro de Formación:</label>
                <input type="text" id="pfCentro" class="form-input" value="${this.escapeHtml(info.centro)}">
              </div>
              <div>
                <label class="form-label">Regional:</label>
                <input type="text" id="pfRegional" class="form-input" value="${this.escapeHtml(info.regional)}">
              </div>
            </div>

            <div>
              <label class="form-label">Palabras Claves del Proyecto (separadas por comas):</label>
              <input type="text" id="pfPalabrasClave" class="form-input" value="${this.escapeHtml(info.palabras_clave)}">
            </div>
          </div>
          ${this.renderNavFooter(1, 'Información Básica')}
        </div>

        <!-- 2. LOS TRES MACROPROYECTOS FORMATIVOS (PANEL 2) -->
        <div class="editor-section-panel" id="editorSec_2" data-sec="2" style="${isPanelVisible(2)}; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge purple">Sección 2</span>
              <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">🎯 Tres Macroproyectos Nucleares (Productos Técnicos)</span>
            </div>
            <span style="font-size: 0.75rem; color: #a855f7;">💡 Conserva el pipeline: Los procesos y normas son fijos, los productos y entregables son adaptables.</span>
          </div>

          <!-- MP1: 3D PARA HACER -->
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 8px; padding: 1.25rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <span class="badge cyan" style="font-weight: 800;">MACROPROYECTO 1</span>
                <strong style="color: #38bdf8; font-size: 1.05rem;">${this.escapeHtml(mp1.nombre || '3D PARA HACER')}</strong>
              </div>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${mp1.guias_rango || 'GUÍA 01 a GUÍA 14'} • ${mp1.horas || 672} Horas</span>
            </div>
            <div style="margin-bottom: 0.75rem;">
              <label class="form-label" style="font-size: 0.82rem;">Subtítulo / Alcance Técnico:</label>
              <input type="text" id="mp1Subtitulo" class="form-input" value="${this.escapeHtml(mp1.subtitulo)}">
            </div>
            <div>
              <label class="form-label" style="font-size: 0.82rem;">Entregables Técnicos Principales (1 por línea):</label>
              <textarea id="mp1Entregables" class="form-input" rows="4" style="font-size: 0.85rem; line-height: 1.45;">${(mp1.entregables || []).map(e => this.escapeHtml(e)).join('\n')}</textarea>
            </div>
          </div>

          <!-- MP2: 3D PARA VER -->
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 8px; padding: 1.25rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <span class="badge purple" style="font-weight: 800;">MACROPROYECTO 2</span>
                <strong style="color: #c084fc; font-size: 1.05rem;">${this.escapeHtml(mp2.nombre || '3D PARA VER')}</strong>
              </div>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${mp2.guias_rango || 'GUÍA 15 a GUÍA 28'} • ${mp2.horas || 672} Horas</span>
            </div>
            <div style="margin-bottom: 0.75rem;">
              <label class="form-label" style="font-size: 0.82rem;">Subtítulo / Alcance Técnico:</label>
              <input type="text" id="mp2Subtitulo" class="form-input" value="${this.escapeHtml(mp2.subtitulo)}">
            </div>
            <div>
              <label class="form-label" style="font-size: 0.82rem;">Entregables Técnicos Principales (1 por línea):</label>
              <textarea id="mp2Entregables" class="form-input" rows="4" style="font-size: 0.85rem; line-height: 1.45;">${(mp2.entregables || []).map(e => this.escapeHtml(e)).join('\n')}</textarea>
            </div>
          </div>

          <!-- MP3: 3D PARA INTERACTUAR -->
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <span class="badge emerald" style="font-weight: 800;">MACROPROYECTO 3</span>
                <strong style="color: #34d399; font-size: 1.05rem;">${this.escapeHtml(mp3.nombre || '3D PARA INTERACTUAR')}</strong>
              </div>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${mp3.guias_rango || 'GUÍA 29 a GUÍA 37'} • ${mp3.horas || 432} Horas</span>
            </div>
            <div style="margin-bottom: 0.75rem;">
              <label class="form-label" style="font-size: 0.82rem;">Subtítulo / Alcance Técnico:</label>
              <input type="text" id="mp3Subtitulo" class="form-input" value="${this.escapeHtml(mp3.subtitulo)}">
            </div>
            <div>
              <label class="form-label" style="font-size: 0.82rem;">Entregables Técnicos Principales (1 por línea):</label>
              <textarea id="mp3Entregables" class="form-input" rows="4" style="font-size: 0.85rem; line-height: 1.45;">${(mp3.entregables || []).map(e => this.escapeHtml(e)).join('\n')}</textarea>
            </div>
          </div>
          ${this.renderNavFooter(2, 'Macroproyectos Nucleares')}
        </div>

        <!-- 3. PLANTEAMIENTO DEL PROBLEMA O NECESIDAD (PANEL 3) -->
        <div class="editor-section-panel" id="editorSec_3" data-sec="3" style="${isPanelVisible(3)}; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge amber">Sección 3</span>
              <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">🔍 Planteamiento del Problema o Necesidad (2.1)</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Justificación Pedagógica y Contexto</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
              <label class="form-label">Descripción del Problema o Necesidad:</label>
              <textarea id="pfProblemaDesc" class="form-input" rows="4" style="line-height: 1.45;">${this.escapeHtml(prob.descripcion)}</textarea>
            </div>

            <div>
              <label class="form-label">Pregunta de Investigación / Problema Central:</label>
              <textarea id="pfPregunta" class="form-input" rows="2" style="line-height: 1.45; font-style: italic;">${this.escapeHtml(prob.pregunta_investigacion)}</textarea>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
              <div>
                <label class="form-label" style="color: #f87171;">Causas del Problema (1 por línea):</label>
                <textarea id="pfCausas" class="form-input" rows="3" style="line-height: 1.4;">${(prob.causas || []).map(c => this.escapeHtml(c)).join('\n')}</textarea>
              </div>
              <div>
                <label class="form-label" style="color: #fb923c;">Consecuencias del Problema (1 por línea):</label>
                <textarea id="pfConsecuencias" class="form-input" rows="3" style="line-height: 1.4;">${(prob.consecuencias || []).map(c => this.escapeHtml(c)).join('\n')}</textarea>
              </div>
            </div>
          </div>
          ${this.renderNavFooter(3, 'Planteamiento del Problema')}
        </div>

        <!-- 4. JUSTIFICACIÓN DEL PROYECTO (PANEL 4) -->
        <div class="editor-section-panel" id="editorSec_4" data-sec="4" style="${isPanelVisible(4)}; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge emerald">Sección 4</span>
              <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">💡 Justificación del Proyecto (2.2)</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Pertinencia y Enfoque ABP</span>
          </div>

          <div>
            <label class="form-label">Texto de Justificación Oficial:</label>
            <textarea id="pfJustificacion" class="form-input" rows="6" style="line-height: 1.5;">${this.escapeHtml(pf.justificacion)}</textarea>
          </div>
          ${this.renderNavFooter(4, 'Justificación del Proyecto')}
        </div>

        <!-- 5. ALCANCE Y OBJETIVOS (PANEL 5) -->
        <div class="editor-section-panel" id="editorSec_5" data-sec="5" style="${isPanelVisible(5)}; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge cyan">Sección 5</span>
              <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">🎯 Objetivos, Alcance e Impactos (2.3 - 2.5)</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Metas Formativas y Beneficiarios</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
              <label class="form-label" style="font-weight: 700; color: #38bdf8;">Objetivo General (2.3):</label>
              <textarea id="pfObjGeneral" class="form-input" rows="3" style="line-height: 1.45;">${this.escapeHtml(pf.objetivos?.general)}</textarea>
            </div>

            <div>
              <label class="form-label" style="font-weight: 700; color: #a855f7;">Objetivos Específicos (2.4 - 1 por línea):</label>
              <textarea id="pfObjEspecificos" class="form-input" rows="5" style="line-height: 1.45;">${(pf.objetivos?.especificos || []).map(o => this.escapeHtml(o)).join('\n')}</textarea>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
              <div>
                <label class="form-label">Beneficiarios Directos:</label>
                <textarea id="pfBenDirectos" class="form-input" rows="2">${this.escapeHtml(alc.beneficiarios_directos)}</textarea>
              </div>
              <div>
                <label class="form-label">Beneficiarios Indirectos:</label>
                <textarea id="pfBenIndirectos" class="form-input" rows="2">${this.escapeHtml(alc.beneficiarios_indirectos)}</textarea>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
              <div>
                <label class="form-label">Impacto Social:</label>
                <textarea id="pfImpSocial" class="form-input" rows="2">${this.escapeHtml(alc.impacto_social)}</textarea>
              </div>
              <div>
                <label class="form-label">Impacto Económico:</label>
                <textarea id="pfImpEconomico" class="form-input" rows="2">${this.escapeHtml(alc.impacto_economico)}</textarea>
              </div>
              <div>
                <label class="form-label">Impacto Ambiental:</label>
                <textarea id="pfImpAmbiental" class="form-input" rows="2">${this.escapeHtml(alc.impacto_ambiental)}</textarea>
              </div>
              <div>
                <label class="form-label">Impacto Tecnológico:</label>
                <textarea id="pfImpTecnologico" class="form-input" rows="2">${this.escapeHtml(alc.impacto_tecnologico)}</textarea>
              </div>
            </div>
          </div>
          ${this.renderNavFooter(5, 'Alcance y Objetivos')}
        </div>

        <!-- 6. RESTRICCIONES O RIESGOS ASOCIADOS (PANEL 6) -->
        <div class="editor-section-panel" id="editorSec_6" data-sec="6" style="${isPanelVisible(6)}; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge amber">Sección 6 (2.5.3)</span>
              <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">⚠️ Restricciones o Riesgos Asociados y Alternativas de Solución</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Mitigación de Contingencias</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${(pf.restricciones_riesgos || []).map((r, idx) => `
              <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 1.15rem;">
                <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.65rem;">
                  <span class="badge amber" style="font-weight: 800;">Riesgo ${idx + 1}</span>
                  <input type="text" id="pfRiesgoNombre_${idx}" class="form-input" style="font-weight: 700; color: #fbbf24; font-size: 0.92rem;" value="${this.escapeHtml(r.nombre)}">
                </div>
                <div style="margin-bottom: 0.65rem;">
                  <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted);">Descripción del Riesgo:</label>
                  <textarea id="pfRiesgoDesc_${idx}" class="form-input" rows="3" style="font-size: 0.85rem; line-height: 1.45;">${this.escapeHtml(r.descripcion)}</textarea>
                </div>
                <div>
                  <label class="form-label" style="font-size: 0.8rem; color: #34d399; font-weight: 700;">Alternativa de Solución Propuesta:</label>
                  <textarea id="pfRiesgoSol_${idx}" class="form-input" rows="3" style="font-size: 0.85rem; line-height: 1.45;">${this.escapeHtml(r.alternativa_solucion)}</textarea>
                </div>
              </div>
            `).join('')}
          </div>
          ${this.renderNavFooter(6, 'Riesgos y Soluciones')}
        </div>

        <!-- 7. PRODUCTOS O RESULTADOS DEL PROYECTO (PANEL 7) -->
        <div class="editor-section-panel" id="editorSec_7" data-sec="7" style="${isPanelVisible(7)}; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge purple">Sección 7 (2.5.4)</span>
              <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">📦 Productos o Resultados del Proyecto</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Entregables por Fase Formativa</span>
          </div>

          <div style="margin-bottom: 1rem;">
            <label class="form-label" style="font-weight: 700;">Descripción General de los Productos:</label>
            <textarea id="pfProdDescGeneral" class="form-input" rows="3" style="line-height: 1.45;">${this.escapeHtml(pf.productos_resultados?.descripcion_general)}</textarea>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${(pf.productos_resultados?.fases || []).map((f, idx) => `
              <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 8px; padding: 1.15rem;">
                <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.65rem;">
                  <span class="badge purple" style="font-weight: 800;">Fase ${idx + 1}</span>
                  <input type="text" id="pfProdFaseNombre_${idx}" class="form-input" style="font-weight: 700; color: #c084fc; font-size: 0.92rem;" value="${this.escapeHtml(f.fase)}">
                </div>
                <div style="margin-bottom: 0.65rem;">
                  <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted);">Producto Entregable:</label>
                  <textarea id="pfProdFaseProd_${idx}" class="form-input" rows="3" style="font-size: 0.85rem; line-height: 1.45;">${this.escapeHtml(f.producto)}</textarea>
                </div>
                <div>
                  <label class="form-label" style="font-size: 0.8rem; color: #10b981; font-weight: 700;">Criterio y Mecanismo de Evaluación:</label>
                  <textarea id="pfProdFaseEval_${idx}" class="form-input" rows="3" style="font-size: 0.82rem; line-height: 1.45;">${this.escapeHtml(f.evaluacion)}</textarea>
                </div>
              </div>
            `).join('')}
          </div>
          ${this.renderNavFooter(7, 'Productos por Fase')}
        </div>

        <!-- 8. INNOVACIÓN / GESTIÓN TECNOLÓGICA (PANEL 8) -->
        <div class="editor-section-panel" id="editorSec_8" data-sec="8" style="${isPanelVisible(8)}; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge cyan">Sección 8 (2.6)</span>
              <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">🚀 Innovación / Gestión Tecnológica</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">5 Indicadores de Vanguardia Técnica</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 280px;">
                <strong style="color: #f8fafc; font-size: 0.92rem; display: block; margin-bottom: 0.25rem;">¿El proyecto resuelve una necesidad del sector productivo?</strong>
                <span style="font-size: 0.78rem; color: var(--text-muted);">Respuesta soportada en la realidad, conocimiento del entorno y estado del arte del sector. Solo tiene dos opciones: Si o No.</span>
              </div>
              <select id="pfInnoResuelve" class="form-select" style="width: 110px; font-weight: 700; text-align: center; border-color: #38bdf8;">
                <option value="SI" ${inno.resuelve_necesidad?.respuesta === 'SI' ? 'selected' : ''}>SI</option>
                <option value="NO" ${inno.resuelve_necesidad?.respuesta === 'NO' ? 'selected' : ''}>NO</option>
              </select>
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 280px;">
                <strong style="color: #f8fafc; font-size: 0.92rem; display: block; margin-bottom: 0.25rem;">¿El proyecto mejora el proceso/producto/servicio existente?</strong>
                <span style="font-size: 0.78rem; color: var(--text-muted);">Efecto o transformación que causa el producto del proyecto en sentido superación, innovación, productividad. Solo tiene dos opciones: Si o No.</span>
              </div>
              <select id="pfInnoMejora" class="form-select" style="width: 110px; font-weight: 700; text-align: center; border-color: #38bdf8;">
                <option value="SI" ${inno.mejora_proceso?.respuesta === 'SI' ? 'selected' : ''}>SI</option>
                <option value="NO" ${inno.mejora_proceso?.respuesta === 'NO' ? 'selected' : ''}>NO</option>
              </select>
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 280px;">
                <strong style="color: #f8fafc; font-size: 0.92rem; display: block; margin-bottom: 0.25rem;">¿El proyecto involucra el uso de nuevas técnicas y tecnologías de proceso?</strong>
                <span style="font-size: 0.78rem; color: var(--text-muted);">La incorporación de tecnologías de punto y vanguardia, que dan cuenta del estado del arte del sector en el desarrollo del proyecto. Solo tiene dos opciones: Si o No.</span>
              </div>
              <select id="pfInnoNuevas" class="form-select" style="width: 110px; font-weight: 700; text-align: center; border-color: #38bdf8;">
                <option value="SI" ${inno.nuevas_tecnicas?.respuesta === 'SI' ? 'selected' : ''}>SI</option>
                <option value="NO" ${inno.nuevas_tecnicas?.respuesta === 'NO' ? 'selected' : ''}>NO</option>
              </select>
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 280px;">
                <strong style="color: #f8fafc; font-size: 0.92rem; display: block; margin-bottom: 0.25rem;">¿Los productos finales son susceptibles a protección industrial y/o derechos de autor?</strong>
                <span style="font-size: 0.78rem; color: var(--text-muted);">El desarrollo del proyecto refleja una producción de I+D de manera que se registre el producto como una creación propia, invención o construcción que modifica el discurso epistémico. Solo tiene dos opciones: Si o No.</span>
              </div>
              <select id="pfInnoProteccion" class="form-select" style="width: 110px; font-weight: 700; text-align: center; border-color: #38bdf8;">
                <option value="SI" ${inno.proteccion_industrial?.respuesta === 'SI' ? 'selected' : ''}>SI</option>
                <option value="NO" ${inno.proteccion_industrial?.respuesta === 'NO' ? 'selected' : ''}>NO</option>
              </select>
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 280px;">
                <strong style="color: #f8fafc; font-size: 0.92rem; display: block; margin-bottom: 0.25rem;">¿Los productos obtenidos en el proyecto pueden ser posicionados en el mercado?</strong>
                <span style="font-size: 0.78rem; color: var(--text-muted);">El producto, la marca, objeto resultantes del proyecto poseen la calidad requerida para competir en el mercado de consumo. Solo tiene dos opciones: Si o No.</span>
              </div>
              <select id="pfInnoMercado" class="form-select" style="width: 110px; font-weight: 700; text-align: center; border-color: #38bdf8;">
                <option value="SI" ${inno.posicionamiento_mercado?.respuesta === 'SI' ? 'selected' : ''}>SI</option>
                <option value="NO" ${inno.posicionamiento_mercado?.respuesta === 'NO' ? 'selected' : ''}>NO</option>
              </select>
            </div>
          </div>
          ${this.renderNavFooter(8, 'Innovación Tecnológica')}
        </div>

        <!-- 9. VALORACIÓN PRODUCTIVA (PANEL 9) -->
        <div class="editor-section-panel" id="editorSec_9" data-sec="9" style="${isPanelVisible(9)}; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge emerald">Sección 9 (2.7)</span>
              <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">💼 Valoración Productiva</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Viabilidad Comercial y Emprendimiento</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 280px;">
                <strong style="color: #f8fafc; font-size: 0.92rem; display: block; margin-bottom: 0.25rem;">¿Con el desarrollo del proyecto se puede satisfacer la necesidad de un cliente potencial?</strong>
                <span style="font-size: 0.78rem; color: var(--text-muted);">Cuando el proyecto tiene efectos colaterales no incluidos en su formulación, generando la viabilidad de afectar a otros clientes y contextos. Solo tiene dos opciones: Si o No.</span>
              </div>
              <select id="pfValSatisface" class="form-select" style="width: 110px; font-weight: 700; text-align: center; border-color: #10b981;">
                <option value="SI" ${val.satisface_cliente?.respuesta === 'SI' ? 'selected' : ''}>SI</option>
                <option value="NO" ${val.satisface_cliente?.respuesta === 'NO' ? 'selected' : ''}>NO</option>
              </select>
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 280px;">
                <strong style="color: #f8fafc; font-size: 0.92rem; display: block; margin-bottom: 0.25rem;">¿Viabilidad de proyecto para plan de negocio?</strong>
                <span style="font-size: 0.78rem; color: var(--text-muted);">Cuando un proyecto formativo tiene condiciones para transformarse en un proyecto productivo, es decir, que abre condiciones para creación de empresa. Solo tiene tres opciones: ALTA, MEDIA o BAJA.</span>
              </div>
              <select id="pfValViabilidad" class="form-select" style="width: 130px; font-weight: 700; text-align: center; border-color: #10b981; color: #34d399;">
                <option value="ALTA" ${val.viabilidad_negocio?.respuesta === 'ALTA' ? 'selected' : ''}>ALTA</option>
                <option value="MEDIA" ${val.viabilidad_negocio?.respuesta === 'MEDIA' ? 'selected' : ''}>MEDIA</option>
                <option value="BAJA" ${val.viabilidad_negocio?.respuesta === 'BAJA' ? 'selected' : ''}>BAJA</option>
              </select>
            </div>
          </div>
          ${this.renderNavFooter(9, 'Valoración Productiva')}
        </div>

        <!-- 10. PLANEACIÓN DEL PROYECTO (PANEL 10) -->
        <div class="editor-section-panel" id="editorSec_10" data-sec="10" style="${isPanelVisible(10)}; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; flex-wrap: wrap; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge amber">Sección 10 (3.0)</span>
              <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">🗓️ 3. Planeación del Proyecto (Actividades, Fases, Competencias y Guías)</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">39 Guías Consecutivas — Pipeline Tecnológico</span>
          </div>

          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: 1.5;">
            Configure y personalice las <strong>39 actividades del proyecto formativo</strong> y asocie las competencias técnicas y transversales a cada Fase. Cada actividad alimenta automáticamente el campo <em>"Actividad de proyecto"</em> en las Guías de Aprendizaje relacionadas del Generador SENA.
          </p>

          <!-- Filtros de Fase -->
          <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem; flex-wrap: wrap; align-items: center;">
            <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600; margin-right: 0.5rem;">Filtrar por Fase:</span>
            <button type="button" class="btn-action planeacion-filter-btn active" data-phase="ALL" onclick="window.app.proyectoView.filterPlaneacionPhase('ALL')" style="font-size: 0.78rem; padding: 0.35rem 0.85rem; border-radius: 6px; background: rgba(56, 189, 248, 0.25); border: 1px solid #38bdf8; color: #f8fafc; font-weight: 700;">
              Todas (39)
            </button>
            <button type="button" class="btn-action planeacion-filter-btn" data-phase="PLANEAR" onclick="window.app.proyectoView.filterPlaneacionPhase('PLANEAR')" style="font-size: 0.78rem; padding: 0.35rem 0.85rem; border-radius: 6px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(148, 163, 184, 0.2); color: #34d399; font-weight: 700;">
              🟢 PLANEAR (9)
            </button>
            <button type="button" class="btn-action planeacion-filter-btn" data-phase="HACER" onclick="window.app.proyectoView.filterPlaneacionPhase('HACER')" style="font-size: 0.78rem; padding: 0.35rem 0.85rem; border-radius: 6px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(148, 163, 184, 0.2); color: #38bdf8; font-weight: 700;">
              🔵 HACER (14)
            </button>
            <button type="button" class="btn-action planeacion-filter-btn" data-phase="VERIFICAR" onclick="window.app.proyectoView.filterPlaneacionPhase('VERIFICAR')" style="font-size: 0.78rem; padding: 0.35rem 0.85rem; border-radius: 6px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(148, 163, 184, 0.2); color: #fbbf24; font-weight: 700;">
              🟡 VERIFICAR (12)
            </button>
            <button type="button" class="btn-action planeacion-filter-btn" data-phase="ACTUAR" onclick="window.app.proyectoView.filterPlaneacionPhase('ACTUAR')" style="font-size: 0.78rem; padding: 0.35rem 0.85rem; border-radius: 6px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(148, 163, 184, 0.2); color: #c084fc; font-weight: 700;">
              🟣 ACTUAR (4)
            </button>
          </div>

          <!-- Listado de las 39 actividades -->
          <div id="planeacionCardsContainer" style="display: flex; flex-direction: column; gap: 0.85rem;">
            ${(pf.planeacion_proyecto || PROYECTO_FORMATIVO_DEFAULT.planeacion_proyecto).map((item, idx) => {
              const faseColors = {
                PLANEAR: 'background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #34d399',
                HACER: 'background: rgba(59, 130, 246, 0.2); border: 1px solid #3b82f6; color: #60a5fa',
                VERIFICAR: 'background: rgba(245, 158, 11, 0.2); border: 1px solid #f59e0b; color: #fbbf24',
                ACTUAR: 'background: rgba(168, 85, 247, 0.2); border: 1px solid #a855f7; color: #c084fc'
              };
              const phaseBadge = faseColors[item.fase] || faseColors.PLANEAR;

              return `
                <div class="planeacion-card" data-phase="${item.fase}" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 8px; padding: 1.15rem; transition: border-color 0.2s;">
                  
                  <!-- Top bar -->
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                      <span style="font-weight: 800; font-size: 0.82rem; padding: 2px 8px; border-radius: 4px; background: rgba(56, 189, 248, 0.2); border: 1px solid #38bdf8; color: #38bdf8;">
                        ${this.escapeHtml(item.guia_label || item.guia_id)} (${item.guia_id})
                      </span>
                      <span style="font-weight: 700; font-size: 0.75rem; padding: 2px 7px; border-radius: 4px; ${phaseBadge};">
                        ${this.escapeHtml(item.fase)}
                      </span>
                      <span style="font-size: 0.75rem; color: var(--text-muted); background: rgba(255, 255, 255, 0.05); padding: 2px 6px; border-radius: 4px;">
                        Trimestre ${this.escapeHtml(item.trimestre)}
                      </span>
                    </div>
                    <span style="font-size: 0.75rem; color: #94a3b8; font-weight: 600;">⏱️ 48 Horas (1 Crédito)</span>
                  </div>

                  <!-- Selectores de Competencias y RAPs (2 columnas editables) -->
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 0.85rem; margin-bottom: 0.85rem;">
                    
                    <!-- 3.3 Componente Específico (Técnico 3D) -->
                    <div style="background: rgba(14, 165, 233, 0.06); border: 1px solid rgba(14, 165, 233, 0.25); border-radius: 6px; padding: 0.75rem 0.85rem;">
                      <label class="form-label" style="font-size: 0.78rem; color: #38bdf8; font-weight: 700; margin-bottom: 0.25rem;">
                        🎯 3.3 Competencia Técnica (Específica):
                      </label>
                      <select id="pfPlanCompTec_${idx}" class="form-select" style="font-size: 0.78rem; margin-bottom: 0.4rem; border-color: rgba(56, 189, 248, 0.35); background: rgba(15, 23, 42, 0.85); color: #f8fafc; font-weight: 600;">
                        ${tecnicas.map(c => {
                          const isSel = item.competencia_tecnica && (item.competencia_tecnica.includes(c.codigo) || item.competencia_tecnica.startsWith(c.codigo));
                          return `<option value="${c.codigo} ${c.nombre}" ${isSel ? 'selected' : ''}>${c.codigo} - ${c.nombre.substring(0, 52)}...</option>`;
                        }).join('')}
                      </select>
                      <label class="form-label" style="font-size: 0.72rem; color: #cbd5e1; font-weight: 600; margin-bottom: 0.2rem;">
                        Denominación RAP Técnico:
                      </label>
                      <input type="text" id="pfPlanRapTec_${idx}" class="form-input" style="font-size: 0.78rem; padding: 4px 8px; border-color: rgba(56, 189, 248, 0.25);" value="${this.escapeHtml(item.rap_tecnico)}">
                    </div>

                    <!-- 3.4 Componente Básico (Transversal / Clave) -->
                    <div style="background: rgba(168, 85, 247, 0.06); border: 1px solid rgba(168, 85, 247, 0.25); border-radius: 6px; padding: 0.75rem 0.85rem;">
                      <label class="form-label" style="font-size: 0.78rem; color: #c084fc; font-weight: 700; margin-bottom: 0.25rem;">
                        🌱 3.4 Competencia Transversal (Básica / Clave):
                      </label>
                      <select id="pfPlanCompTrans_${idx}" class="form-select" style="font-size: 0.78rem; margin-bottom: 0.4rem; border-color: rgba(168, 85, 247, 0.35); background: rgba(15, 23, 42, 0.85); color: #f8fafc; font-weight: 600;">
                        <option value="Trabajo Técnico Específico" ${(!item.competencia_transversal || item.competencia_transversal.includes('Específico')) ? 'selected' : ''}>Trabajo Técnico Específico</option>
                        ${transversales.map(c => {
                          const isSel = item.competencia_transversal && (item.competencia_transversal.includes(c.codigo) || item.competencia_transversal.startsWith(c.codigo));
                          return `<option value="${c.codigo} ${c.nombre}" ${isSel ? 'selected' : ''}>${c.codigo} - ${c.nombre.substring(0, 52)}...</option>`;
                        }).join('')}
                      </select>
                      <label class="form-label" style="font-size: 0.72rem; color: #cbd5e1; font-weight: 600; margin-bottom: 0.2rem;">
                        Denominación RAP Transversal:
                      </label>
                      <input type="text" id="pfPlanRapTrans_${idx}" class="form-input" style="font-size: 0.78rem; padding: 4px 8px; border-color: rgba(168, 85, 247, 0.25);" value="${this.escapeHtml(item.rap_transversal || '')}">
                    </div>

                  </div>

                  <!-- 3.2 Actividad del Proyecto -->
                  <div>
                    <label class="form-label" style="font-size: 0.8rem; color: #f8fafc; font-weight: 700; margin-bottom: 0.25rem;">
                      3.2 Actividad del Proyecto (Verbo en infinitivo - Objeto - Condición):
                    </label>
                    <textarea id="pfPlanAct_${idx}" class="form-input" rows="2" style="font-size: 0.86rem; line-height: 1.45; font-weight: 500; border-color: rgba(56, 189, 248, 0.3);">${this.escapeHtml(item.actividad_proyecto)}</textarea>
                    <span style="font-size: 0.72rem; color: var(--text-muted); display: block; margin-top: 0.25rem;">
                      🔗 Enlaza y actualiza automáticamente la Guía de Aprendizaje ${item.guia_label}.
                    </span>
                  </div>

                </div>
              `;
            }).join('')}
          </div>
          ${this.renderNavFooter(10, 'Planeación del Proyecto')}
        </div>

        <!-- BOTONES DE ACCIÓN INFERIORES -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.25rem 1.5rem; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;">
          <div style="display: flex; gap: 0.85rem; align-items: center; flex-wrap: wrap;">
            <button type="submit" class="btn-action primary" style="background: linear-gradient(135deg, #10b981, #059669); font-weight: 700; padding: 0.7rem 1.5rem; font-size: 0.95rem;">
              💾 Guardar Cambios en el Proyecto
            </button>
            <button type="button" class="btn-action" onclick="window.app.proyectoView.setMode('preview')" style="padding: 0.7rem 1.25rem;">
              👁️ Previsualizar Formato Oficial
            </button>
            <button type="button" class="btn-action" onclick="window.app.proyectoView.printPDF()" style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.4); padding: 0.7rem 1.25rem;">
              🖨️ Descargar en PDF
            </button>
          </div>

          <button type="button" class="btn-action" onclick="window.app.proyectoView.reset()" style="color: #f87171; border-color: rgba(239, 68, 68, 0.4); padding: 0.7rem 1.1rem;">
            🔄 Restablecer a Valores Originales
          </button>
        </div>

      </form>
    `;
  }

  save() {
    const pf = getProyectoFormativo();

    // 1. Info básica
    const elNombre = document.getElementById('pfNombre');
    const elCodigo = document.getElementById('pfCodigo');
    const elCentro = document.getElementById('pfCentro');
    const elRegional = document.getElementById('pfRegional');
    const elPalabras = document.getElementById('pfPalabrasClave');

    if (elNombre) pf.info_basica.nombre_proyecto = elNombre.value.trim();
    if (elCodigo) pf.info_basica.codigo_proyecto = elCodigo.value.trim();
    if (elCentro) pf.info_basica.centro = elCentro.value.trim();
    if (elRegional) pf.info_basica.regional = elRegional.value.trim();
    if (elPalabras) pf.info_basica.palabras_clave = elPalabras.value.trim();

    // 2. Macroproyectos
    const elMp1Sub = document.getElementById('mp1Subtitulo');
    const elMp1Ent = document.getElementById('mp1Entregables');
    if (elMp1Sub && pf.macroproyectos[0]) pf.macroproyectos[0].subtitulo = elMp1Sub.value.trim();
    if (elMp1Ent && pf.macroproyectos[0]) {
      pf.macroproyectos[0].entregables = elMp1Ent.value.split('\n').map(s => s.trim()).filter(Boolean);
    }

    const elMp2Sub = document.getElementById('mp2Subtitulo');
    const elMp2Ent = document.getElementById('mp2Entregables');
    if (elMp2Sub && pf.macroproyectos[1]) pf.macroproyectos[1].subtitulo = elMp2Sub.value.trim();
    if (elMp2Ent && pf.macroproyectos[1]) {
      pf.macroproyectos[1].entregables = elMp2Ent.value.split('\n').map(s => s.trim()).filter(Boolean);
    }

    const elMp3Sub = document.getElementById('mp3Subtitulo');
    const elMp3Ent = document.getElementById('mp3Entregables');
    if (elMp3Sub && pf.macroproyectos[2]) pf.macroproyectos[2].subtitulo = elMp3Sub.value.trim();
    if (elMp3Ent && pf.macroproyectos[2]) {
      pf.macroproyectos[2].entregables = elMp3Ent.value.split('\n').map(s => s.trim()).filter(Boolean);
    }

    // 3. Problema
    const elDesc = document.getElementById('pfProblemaDesc');
    const elPreg = document.getElementById('pfPregunta');
    const elCausas = document.getElementById('pfCausas');
    const elConsec = document.getElementById('pfConsecuencias');

    if (elDesc) pf.problema.descripcion = elDesc.value.trim();
    if (elPreg) pf.problema.pregunta_investigacion = elPreg.value.trim();
    if (elCausas) pf.problema.causas = elCausas.value.split('\n').map(s => s.trim()).filter(Boolean);
    if (elConsec) pf.problema.consecuencias = elConsec.value.split('\n').map(s => s.trim()).filter(Boolean);

    // 4. Justificación y Objetivos
    const elJust = document.getElementById('pfJustificacion');
    const elObjGen = document.getElementById('pfObjGeneral');
    const elObjEsp = document.getElementById('pfObjEspecificos');

    if (elJust) pf.justificacion = elJust.value.trim();
    if (elObjGen) pf.objetivos.general = elObjGen.value.trim();
    if (elObjEsp) pf.objetivos.especificos = elObjEsp.value.split('\n').map(s => s.trim()).filter(Boolean);

    // 5. Alcance
    const elBenDir = document.getElementById('pfBenDirectos');
    const elBenInd = document.getElementById('pfBenIndirectos');
    const elImpSoc = document.getElementById('pfImpSocial');
    const elImpEco = document.getElementById('pfImpEconomico');
    const elImpAmb = document.getElementById('pfImpAmbiental');
    const elImpTec = document.getElementById('pfImpTecnologico');

    if (elBenDir) pf.alcance.beneficiarios_directos = elBenDir.value.trim();
    if (elBenInd) pf.alcance.beneficiarios_indirectos = elBenInd.value.trim();
    if (elImpSoc) pf.alcance.impacto_social = elImpSoc.value.trim();
    if (elImpEco) pf.alcance.impacto_economico = elImpEco.value.trim();
    if (elImpAmb) pf.alcance.impacto_ambiental = elImpAmb.value.trim();
    if (elImpTec) pf.alcance.impacto_tecnologico = elImpTec.value.trim();

    // 6. Restricciones y Riesgos (2.5.3)
    if (!pf.restricciones_riesgos) pf.restricciones_riesgos = [];
    for (let i = 0; i < 3; i++) {
      const elRNom = document.getElementById(`pfRiesgoNombre_${i}`);
      const elRDesc = document.getElementById(`pfRiesgoDesc_${i}`);
      const elRSol = document.getElementById(`pfRiesgoSol_${i}`);
      if (!pf.restricciones_riesgos[i]) pf.restricciones_riesgos[i] = { id: i + 1 };
      if (elRNom) pf.restricciones_riesgos[i].nombre = elRNom.value.trim();
      if (elRDesc) pf.restricciones_riesgos[i].descripcion = elRDesc.value.trim();
      if (elRSol) pf.restricciones_riesgos[i].alternativa_solucion = elRSol.value.trim();
    }

    // 7. Productos o Resultados (2.5.4)
    if (!pf.productos_resultados) pf.productos_resultados = {};
    const elPDescGen = document.getElementById('pfProdDescGeneral');
    if (elPDescGen) pf.productos_resultados.descripcion_general = elPDescGen.value.trim();
    if (!pf.productos_resultados.fases) pf.productos_resultados.fases = [];
    for (let i = 0; i < 3; i++) {
      const elFNom = document.getElementById(`pfProdFaseNombre_${i}`);
      const elFProd = document.getElementById(`pfProdFaseProd_${i}`);
      const elFEval = document.getElementById(`pfProdFaseEval_${i}`);
      if (!pf.productos_resultados.fases[i]) pf.productos_resultados.fases[i] = {};
      if (elFNom) pf.productos_resultados.fases[i].fase = elFNom.value.trim();
      if (elFProd) pf.productos_resultados.fases[i].producto = elFProd.value.trim();
      if (elFEval) pf.productos_resultados.fases[i].evaluacion = elFEval.value.trim();
    }

    // 8. Innovación / Gestión Tecnológica (2.6)
    if (!pf.innovacion_gestion) pf.innovacion_gestion = {};
    const elInnoRes = document.getElementById('pfInnoResuelve');
    const elInnoMej = document.getElementById('pfInnoMejora');
    const elInnoNue = document.getElementById('pfInnoNuevas');
    const elInnoPro = document.getElementById('pfInnoProteccion');
    const elInnoMer = document.getElementById('pfInnoMercado');

    if (elInnoRes) {
      if (!pf.innovacion_gestion.resuelve_necesidad) pf.innovacion_gestion.resuelve_necesidad = {};
      pf.innovacion_gestion.resuelve_necesidad.respuesta = elInnoRes.value;
    }
    if (elInnoMej) {
      if (!pf.innovacion_gestion.mejora_proceso) pf.innovacion_gestion.mejora_proceso = {};
      pf.innovacion_gestion.mejora_proceso.respuesta = elInnoMej.value;
    }
    if (elInnoNue) {
      if (!pf.innovacion_gestion.nuevas_tecnicas) pf.innovacion_gestion.nuevas_tecnicas = {};
      pf.innovacion_gestion.nuevas_tecnicas.respuesta = elInnoNue.value;
    }
    if (elInnoPro) {
      if (!pf.innovacion_gestion.proteccion_industrial) pf.innovacion_gestion.proteccion_industrial = {};
      pf.innovacion_gestion.proteccion_industrial.respuesta = elInnoPro.value;
    }
    if (elInnoMer) {
      if (!pf.innovacion_gestion.posicionamiento_mercado) pf.innovacion_gestion.posicionamiento_mercado = {};
      pf.innovacion_gestion.posicionamiento_mercado.respuesta = elInnoMer.value;
    }

    // 9. Valoración Productiva (2.7)
    if (!pf.valoracion_productiva) pf.valoracion_productiva = {};
    const elValSat = document.getElementById('pfValSatisface');
    const elValVia = document.getElementById('pfValViabilidad');

    if (elValSat) {
      if (!pf.valoracion_productiva.satisface_cliente) pf.valoracion_productiva.satisface_cliente = {};
      pf.valoracion_productiva.satisface_cliente.respuesta = elValSat.value;
    }
    if (elValVia) {
      if (!pf.valoracion_productiva.viabilidad_negocio) pf.valoracion_productiva.viabilidad_negocio = {};
      pf.valoracion_productiva.viabilidad_negocio.respuesta = elValVia.value;
    }

    // 10. Planeación del Proyecto (39 actividades con competencias y RAPs asociados)
    if (!pf.planeacion_proyecto) {
      pf.planeacion_proyecto = JSON.parse(JSON.stringify(PROYECTO_FORMATIVO_DEFAULT.planeacion_proyecto));
    }
    pf.planeacion_proyecto.forEach((p, idx) => {
      const elAct = document.getElementById(`pfPlanAct_${idx}`);
      const elCompTec = document.getElementById(`pfPlanCompTec_${idx}`);
      const elRapTec = document.getElementById(`pfPlanRapTec_${idx}`);
      const elCompTrans = document.getElementById(`pfPlanCompTrans_${idx}`);
      const elRapTrans = document.getElementById(`pfPlanRapTrans_${idx}`);

      if (elAct) p.actividad_proyecto = elAct.value.trim();
      if (elCompTec) p.competencia_tecnica = elCompTec.value.trim();
      if (elRapTec) p.rap_tecnico = elRapTec.value.trim();
      if (elCompTrans) p.competencia_transversal = elCompTrans.value.trim();
      if (elRapTrans) p.rap_transversal = elRapTrans.value.trim();
    });

    saveProyectoFormativo(pf);

    if (window.app && typeof window.app.showToast === 'function') {
      window.app.showToast('✅ Proyecto Formativo guardado y sincronizado con las Guías de Aprendizaje.', 'success');
    }

    if (this.currentMode === 'preview') {
      this.render();
    }
  }

  reset() {
    if (!confirm('¿Desea restablecer todos los campos del Proyecto Formativo a sus valores iniciales oficiales?')) {
      return;
    }
    resetProyectoFormativo();
    if (window.app && typeof window.app.showToast === 'function') {
      window.app.showToast('🔄 Proyecto Formativo restablecido a los valores por defecto.', 'info');
    }
    this.render();
  }

  printPDF() {
    if (this.currentMode !== 'preview') {
      this.setMode('preview');
      setTimeout(() => {
        window.print();
      }, 350);
    } else {
      window.print();
    }
  }

  generateOfficialHTML(pf) {
    const info = pf.info_basica || {};
    const mp1 = (pf.macroproyectos && pf.macroproyectos[0]) || {};
    const mp2 = (pf.macroproyectos && pf.macroproyectos[1]) || {};
    const mp3 = (pf.macroproyectos && pf.macroproyectos[2]) || {};

    return `
      <div class="sena-document" style="font-family: Arial, Helvetica, sans-serif; font-size: 9pt; line-height: 1.4; color: #000000; padding: 2.5rem 3rem;">
        
        <!-- ENCABEZADO INSTITUCIONAL SENA (GFPI-F-016) -->
        <table class="sena-table" style="width: 100%; border-collapse: collapse; margin-bottom: 1.25rem;">
          <tr>
            <td style="width: 20%; text-align: center; border: 1.5px solid #000; padding: 8px; vertical-align: middle;">
              <span style="font-size: 20pt; font-weight: 900; color: #39A900; letter-spacing: -0.05em; display: block;">SENA</span>
              <span style="font-size: 6.5pt; font-weight: bold; color: #475569; display: block; text-transform: uppercase;">Sistema Integrado de Gestión</span>
            </td>
            <td style="width: 55%; text-align: center; border: 1.5px solid #000; padding: 6px 12px; vertical-align: middle;">
              <strong style="font-size: 9.5pt; display: block; color: #00324D;">SERVICIO NACIONAL DE APRENDIZAJE SENA</strong>
              <strong style="font-size: 8.5pt; display: block;">SISTEMA INTEGRADO DE GESTIÓN</strong>
              <span style="font-size: 8pt; display: block; color: #475569;">Procedimiento Ejecución de la Formación Profesional Integral</span>
              <strong style="font-size: 11pt; color: #00324D; display: block; margin-top: 3px;">PROYECTO FORMATIVO</strong>
            </td>
            <td style="width: 25%; font-size: 7.5pt; border: 1.5px solid #000; padding: 6px 8px; vertical-align: middle; line-height: 1.35;">
              <strong>Código:</strong> GFPI-F-016<br>
              <strong>Versión:</strong> ${pf.version || '03'}<br>
              <strong>Estado:</strong> Aprobado
            </td>
          </tr>
          <tr>
            <td colspan="3" style="border: 1.5px solid #000; border-top: none; padding: 6px 10px; font-size: 8pt; background-color: #f8fafc;">
              <strong>Centro:</strong> ${this.escapeHtml(info.centro)} &nbsp;|&nbsp; <strong>Regional:</strong> ${this.escapeHtml(info.regional)}
            </td>
          </tr>
        </table>

        <!-- 1. INFORMACIÓN BÁSICA DEL PROYECTO -->
        <div class="sena-section-title" style="background-color: #00324D; color: #ffffff; font-weight: bold; padding: 5px 8px; font-size: 9pt; margin-top: 1rem; margin-bottom: 0.5rem; text-transform: uppercase;">
          1. INFORMACIÓN BÁSICA DEL PROYECTO
        </div>

        <table class="sena-table" style="width: 100%; border-collapse: collapse; margin-bottom: 1rem; font-size: 8.5pt;">
          <tr>
            <td style="width: 25%; font-weight: bold; border: 1px solid #cbd5e1; padding: 6px 10px; background: #f8fafc;">1.1 Centro de Formación:</td>
            <td style="width: 45%; border: 1px solid #cbd5e1; padding: 6px 10px;">${this.escapeHtml(info.centro)}</td>
            <td style="width: 12%; font-weight: bold; border: 1px solid #cbd5e1; padding: 6px 10px; background: #f8fafc;">1.2 Regional:</td>
            <td style="width: 18%; border: 1px solid #cbd5e1; padding: 6px 10px;">${this.escapeHtml(info.regional)}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 6px 10px; background: #f8fafc;">1.3 Nombre del Proyecto:</td>
            <td colspan="3" style="border: 1px solid #cbd5e1; padding: 6px 10px; font-weight: bold; color: #00324D;">
              ${this.escapeHtml(info.nombre_proyecto)}
            </td>
          </tr>
          <tr>
            <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 6px 10px; background: #f8fafc;">1.4 Programa de Formación:</td>
            <td style="border: 1px solid #cbd5e1; padding: 6px 10px; font-weight: bold;">
              ${this.escapeHtml(info.programa)}
            </td>
            <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 6px 10px; background: #f8fafc;">1.5 Código:</td>
            <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">${this.escapeHtml(info.codigo_programa || '522301')}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 6px 10px; background: #f8fafc;">1.6 Tiempo Estimado:</td>
            <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">
              ${info.tiempo_ejecucion_horas || 3120} Horas (${info.creditos_totales || 65} Créditos)
            </td>
            <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 6px 10px; background: #f8fafc;">1.7 Código Pry:</td>
            <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">${this.escapeHtml(info.codigo_proyecto)}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 6px 10px; background: #f8fafc;">1.8 Palabras Claves:</td>
            <td colspan="3" style="border: 1px solid #cbd5e1; padding: 6px 10px; font-size: 8pt; color: #334155;">
              ${this.escapeHtml(info.palabras_clave)}
            </td>
          </tr>
        </table>

        <!-- 2. ESTRUCTURA Y FORMULACIÓN DEL PROYECTO -->
        <div class="sena-section-title" style="background-color: #00324D; color: #ffffff; font-weight: bold; padding: 5px 8px; font-size: 9pt; margin-top: 1.25rem; margin-bottom: 0.5rem; text-transform: uppercase;">
          2. ESTRUCTURA DEL PROYECTO (MACROPROYECTOS Y PRODUCTOS TÉCNICOS)
        </div>

        <table class="sena-table" style="width: 100%; border-collapse: collapse; margin-bottom: 1.25rem; font-size: 8.5pt;">
          <thead>
            <tr style="background: #e2e8f0;">
              <th style="width: 25%; border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left;">Macroproyecto Nuclear</th>
              <th style="width: 15%; border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center;">Rango de Guías</th>
              <th style="width: 60%; border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left;">Entregables Técnicos Clave</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 8px 10px; vertical-align: top;">
                <strong style="color: #00324D;">${this.escapeHtml(mp1.nombre || '3D PARA HACER')}</strong><br>
                <span style="font-size: 8.5pt; color: #475569;">${this.escapeHtml(mp1.subtitulo || '')}</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 8px 10px; vertical-align: top; text-align: center;">
                <span class="sena-badge" style="background-color: #e0f2fe; color: #0369a1; font-size: 8pt; font-weight: bold; padding: 2px 6px; border-radius: 4px;">${mp1.guias_rango || 'GUÍA 01 - 14'}</span><br>
                <span style="font-size: 8pt; color: #64748b;">${mp1.horas || 672} Horas</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 8px 10px; vertical-align: top; font-size: 8.5pt;">
                <ul style="margin: 0; padding-left: 1.2rem;">
                  ${(mp1.entregables || []).map(e => `<li style="margin-bottom: 4px;">${this.escapeHtml(e)}</li>`).join('')}
                </ul>
              </td>
            </tr>

            <tr style="background-color: #f8fafc;">
              <td style="border: 1px solid #cbd5e1; padding: 8px 10px; vertical-align: top;">
                <strong style="color: #00324D;">${this.escapeHtml(mp2.nombre || '3D PARA VER')}</strong><br>
                <span style="font-size: 8.5pt; color: #475569;">${this.escapeHtml(mp2.subtitulo || '')}</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 8px 10px; vertical-align: top; text-align: center;">
                <span class="sena-badge" style="background-color: #f3e8ff; color: #6b21a8; font-size: 8pt; font-weight: bold; padding: 2px 6px; border-radius: 4px;">${mp2.guias_rango || 'GUÍA 15 - 28'}</span><br>
                <span style="font-size: 8pt; color: #64748b;">${mp2.horas || 672} Horas</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 8px 10px; vertical-align: top; font-size: 8.5pt;">
                <ul style="margin: 0; padding-left: 1.2rem;">
                  ${(mp2.entregables || []).map(e => `<li style="margin-bottom: 4px;">${this.escapeHtml(e)}</li>`).join('')}
                </ul>
              </td>
            </tr>

            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 8px 10px; vertical-align: top;">
                <strong style="color: #00324D;">${this.escapeHtml(mp3.nombre || '3D PARA INTERACTUAR')}</strong><br>
                <span style="font-size: 8.5pt; color: #475569;">${this.escapeHtml(mp3.subtitulo || '')}</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 8px 10px; vertical-align: top; text-align: center;">
                <span class="sena-badge" style="background-color: #d1fae5; color: #065f46; font-size: 8pt; font-weight: bold; padding: 2px 6px; border-radius: 4px;">${mp3.guias_rango || 'GUÍA 29 - 37'}</span><br>
                <span style="font-size: 8pt; color: #64748b;">${mp3.horas || 432} Horas</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 8px 10px; vertical-align: top; font-size: 8.5pt;">
                <ul style="margin: 0; padding-left: 1.2rem;">
                  ${(mp3.entregables || []).map(e => `<li style="margin-bottom: 4px;">${this.escapeHtml(e)}</li>`).join('')}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 2.1 Problema -->
        <div class="sena-sub-title" style="color: #0f172a; font-size: 10.5pt; font-weight: bold; margin-top: 1rem; margin-bottom: 0.4rem;">
          2.1 Planteamiento del problema o necesidad
        </div>
        <p style="text-align: justify; margin-bottom: 0.75rem; font-size: 9pt;">
          ${this.escapeHtml(pf.problema.descripcion)}
        </p>
        <p style="text-align: justify; margin-bottom: 0.75rem; font-size: 9pt; font-style: italic; background: #f8fafc; padding: 10px; border-left: 3px solid #00324D;">
          <strong>Pregunta Problémica:</strong> ${this.escapeHtml(pf.problema.pregunta_investigacion)}
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem; font-size: 8.5pt;">
          <tr>
            <td style="width: 50%; vertical-align: top; padding-right: 10px;">
              <strong style="color: #b91c1c;">Causas:</strong>
              <ul style="margin-top: 4px; padding-left: 1.2rem;">
                ${(pf.problema.causas || []).map(c => `<li>${this.escapeHtml(c)}</li>`).join('')}
              </ul>
            </td>
            <td style="width: 50%; vertical-align: top; padding-left: 10px;">
              <strong style="color: #991b1b;">Consecuencias:</strong>
              <ul style="margin-top: 4px; padding-left: 1.2rem;">
                ${(pf.problema.consecuencias || []).map(c => `<li>${this.escapeHtml(c)}</li>`).join('')}
              </ul>
            </td>
          </tr>
        </table>

        <!-- 2.2 Justificación -->
        <div class="sena-sub-title" style="color: #0f172a; font-size: 10.5pt; font-weight: bold; margin-top: 1rem; margin-bottom: 0.4rem;">
          2.2 Justificación del proyecto
        </div>
        <p style="text-align: justify; margin-bottom: 0.75rem; font-size: 9pt;">
          ${this.escapeHtml(pf.justificacion)}
        </p>

        <!-- 2.3 Objetivos -->
        <div class="sena-sub-title" style="color: #0f172a; font-size: 10.5pt; font-weight: bold; margin-top: 1rem; margin-bottom: 0.4rem;">
          2.3 Objetivo General
        </div>
        <p style="font-size: 9pt; margin-bottom: 0.85rem; background: #f0fdf4; padding: 10px; border-left: 3px solid #16a34a;">
          ${this.escapeHtml(pf.objetivos.general)}
        </p>

        <div class="sena-sub-title" style="color: #0f172a; font-size: 10.5pt; font-weight: bold; margin-top: 1rem; margin-bottom: 0.4rem;">
          2.4 Objetivos Específicos
        </div>
        <ul style="padding-left: 1.2rem; margin-bottom: 1rem; font-size: 8.5pt;">
          ${(pf.objetivos.especificos || []).map(o => `<li style="margin-bottom: 4px;">${this.escapeHtml(o)}</li>`).join('')}
        </ul>

        <!-- 2.5 Alcance y Beneficiarios -->
        <div class="sena-sub-title" style="color: #0f172a; font-size: 10.5pt; font-weight: bold; margin-top: 1rem; margin-bottom: 0.4rem;">
          2.5 Alcance, Beneficiarios e Impactos
        </div>
        <table class="sena-table" style="width: 100%; border-collapse: collapse; margin: 0.75rem 0; font-size: 8.5pt;">
          <tr>
            <td style="width: 25%; font-weight: bold; border: 1px solid #cbd5e1; padding: 6px 10px;">Beneficiarios Directos:</td>
            <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">${this.escapeHtml(pf.alcance.beneficiarios_directos)}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 6px 10px;">Beneficiarios Indirectos:</td>
            <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">${this.escapeHtml(pf.alcance.beneficiarios_indirectos)}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 6px 10px;">Impacto Social y Económico:</td>
            <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">
              <strong>Social:</strong> ${this.escapeHtml(pf.alcance.impacto_social)}<br>
              <strong>Económico:</strong> ${this.escapeHtml(pf.alcance.impacto_economico)}
            </td>
          </tr>
          <tr>
            <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 6px 10px;">Impacto Ambiental y Tecnológico:</td>
            <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">
              <strong>Ambiental:</strong> ${this.escapeHtml(pf.alcance.impacto_ambiental)}<br>
              <strong>Tecnológico:</strong> ${this.escapeHtml(pf.alcance.impacto_tecnologico)}
            </td>
          </tr>
        </table>

        <!-- 2.5.3 Restricciones o riesgos asociados -->
        <div class="sena-sub-title" style="color: #0f172a; font-size: 10.5pt; font-weight: bold; margin-top: 1.25rem; margin-bottom: 0.4rem;">
          2.5.3 Restricciones o riesgos asociados y alternativas de solución:
        </div>
        <table class="sena-table" style="width: 100%; border-collapse: collapse; margin-bottom: 1rem; font-size: 8.5pt;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th style="width: 5%; text-align: center; border: 1px solid #cbd5e1; padding: 6px;">#</th>
              <th style="width: 45%; border: 1px solid #cbd5e1; padding: 6px 10px;">Restricción o Riesgo Asociado</th>
              <th style="width: 50%; border: 1px solid #cbd5e1; padding: 6px 10px;">Alternativa de Solución Propuesta</th>
            </tr>
          </thead>
          <tbody>
            ${(pf.restricciones_riesgos || []).map((r, idx) => `
              <tr>
                <td style="text-align: center; font-weight: bold; border: 1px solid #cbd5e1; padding: 6px; vertical-align: top;">${idx + 1}</td>
                <td style="border: 1px solid #cbd5e1; padding: 6px 10px; vertical-align: top;">
                  <strong style="color: #00324D;">${this.escapeHtml(r.nombre)}</strong>
                  <p style="margin: 4px 0 0 0; text-align: justify; font-size: 8pt; color: #334155;">${this.escapeHtml(r.descripcion)}</p>
                </td>
                <td style="border: 1px solid #cbd5e1; padding: 6px 10px; vertical-align: top; text-align: justify; font-size: 8pt; color: #0f172a;">
                  ${this.escapeHtml(r.alternativa_solucion)}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- 2.5.4 Productos o resultados del proyecto -->
        <div class="sena-sub-title" style="color: #0f172a; font-size: 10.5pt; font-weight: bold; margin-top: 1.25rem; margin-bottom: 0.4rem;">
          2.5.4. Productos o resultados del proyecto:
        </div>
        <p style="text-align: justify; margin-bottom: 0.75rem; font-size: 8.5pt;">
          ${this.escapeHtml(pf.productos_resultados?.descripcion_general || '')}
        </p>
        <table class="sena-table" style="width: 100%; border-collapse: collapse; margin-bottom: 1rem; font-size: 8.5pt;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th style="width: 25%; border: 1px solid #cbd5e1; padding: 6px 10px;">Fase del Proyecto</th>
              <th style="width: 45%; border: 1px solid #cbd5e1; padding: 6px 10px;">Producto Entregable</th>
              <th style="width: 30%; border: 1px solid #cbd5e1; padding: 6px 10px;">Criterio de Evaluación</th>
            </tr>
          </thead>
          <tbody>
            ${(pf.productos_resultados?.fases || []).map(f => `
              <tr>
                <td style="border: 1px solid #cbd5e1; padding: 6px 10px; vertical-align: top; font-weight: bold; color: #00324D;">${this.escapeHtml(f.fase)}</td>
                <td style="border: 1px solid #cbd5e1; padding: 6px 10px; vertical-align: top; text-align: justify; font-size: 8pt;">${this.escapeHtml(f.producto)}</td>
                <td style="border: 1px solid #cbd5e1; padding: 6px 10px; vertical-align: top; text-align: justify; font-size: 8pt; color: #334155;">${this.escapeHtml(f.evaluacion)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- 2.6 Innovación/Gestión Tecnológica -->
        <div class="sena-sub-title" style="color: #0f172a; font-size: 10.5pt; font-weight: bold; margin-top: 1.25rem; margin-bottom: 0.4rem;">
          2.6 Innovación/Gestión Tecnológica
        </div>
        <table class="sena-table" style="width: 100%; border-collapse: collapse; margin-bottom: 1rem; font-size: 8.5pt;">
          <thead>
            <tr style="background: #e2e8f0;">
              <th style="width: 82%; border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left;">Criterio / Pregunta Orientadora</th>
              <th style="width: 18%; border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center;">Respuesta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">
                <strong>¿El proyecto resuelve una necesidad del sector productivo?</strong><br>
                <span style="font-size: 7.5pt; color: #475569;">Respuesta soportada en la realidad, conocimiento del entorno y estado del arte del sector. Solo tiene dos opciones: Si o No.</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center; font-weight: bold; color: #00324D;">
                ${pf.innovacion_gestion?.resuelve_necesidad?.respuesta || 'SI'}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">
                <strong>¿El proyecto mejora el proceso/producto/servicio existente?</strong><br>
                <span style="font-size: 7.5pt; color: #475569;">Efecto o transformación que causa el producto del proyecto en sentido superación, innovación, productividad. Solo tiene dos opciones: Si o No.</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center; font-weight: bold; color: #00324D;">
                ${pf.innovacion_gestion?.mejora_proceso?.respuesta || 'SI'}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">
                <strong>¿El proyecto involucra el uso de nuevas técnicas y tecnologías de proceso?</strong><br>
                <span style="font-size: 7.5pt; color: #475569;">La incorporación de tecnologías de punta y vanguardia, que dan cuenta del estado del arte del sector en el desarrollo del proyecto. Solo tiene dos opciones: Si o No.</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center; font-weight: bold; color: #00324D;">
                ${pf.innovacion_gestion?.nuevas_tecnicas?.respuesta || 'SI'}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">
                <strong>¿Los productos finales son susceptibles a protección industrial y/o derechos de autor?</strong><br>
                <span style="font-size: 7.5pt; color: #475569;">Refleja una producción de I+D de manera que se registre el producto como una creación propia, invención o construcción que modifica el discurso epistémico. Solo tiene dos opciones: Si o No.</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center; font-weight: bold; color: #00324D;">
                ${pf.innovacion_gestion?.proteccion_industrial?.respuesta || 'SI'}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">
                <strong>¿Los productos obtenidos en el proyecto pueden ser posicionados en el mercado?</strong><br>
                <span style="font-size: 7.5pt; color: #475569;">El producto, la marca, objeto resultantes poseen la calidad requerida para competir en el mercado de consumo. Solo tiene dos opciones: Si o No.</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center; font-weight: bold; color: #00324D;">
                ${pf.innovacion_gestion?.posicionamiento_mercado?.respuesta || 'SI'}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 2.7 Valoración Productiva -->
        <div class="sena-sub-title" style="color: #0f172a; font-size: 10.5pt; font-weight: bold; margin-top: 1.25rem; margin-bottom: 0.4rem;">
          2.7 Valoración Productiva
        </div>
        <table class="sena-table" style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 8.5pt;">
          <thead>
            <tr style="background: #e2e8f0;">
              <th style="width: 82%; border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left;">Criterio / Pregunta Orientadora</th>
              <th style="width: 18%; border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center;">Respuesta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">
                <strong>¿Con el desarrollo del proyecto se puede satisfacer la necesidad de un cliente potencial?</strong><br>
                <span style="font-size: 7.5pt; color: #475569;">Efectos colaterales no incluidos en su formulación, generando la viabilidad de afectar a otros clientes y contextos. Solo tiene dos opciones: Si o No.</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center; font-weight: bold; color: #00324D;">
                ${pf.valoracion_productiva?.satisface_cliente?.respuesta || 'SI'}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 6px 10px;">
                <strong>¿Viabilidad de proyecto para plan de negocio?</strong><br>
                <span style="font-size: 7.5pt; color: #475569;">Condiciones para transformarse en un proyecto productivo, es decir, que abre condiciones para creación de empresa. Solo tiene tres opciones: ALTA, MEDIA o BAJA.</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: center; font-weight: bold; color: #16a34a; font-size: 9.5pt;">
                ${pf.valoracion_productiva?.viabilidad_negocio?.respuesta || 'ALTA'}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 3.0 RESUMEN DE COMPETENCIAS LABORALES ASOCIADAS POR FASE DEL PROYECTO -->
        <div class="sena-sub-title" style="color: #0f172a; font-size: 10.5pt; font-weight: bold; margin-top: 1.5rem; margin-bottom: 0.4rem;">
          3.0 MATRIZ DE COMPETENCIAS LABORALES ASOCIADAS POR FASE DEL PROYECTO (MALLA CURRICULAR)
        </div>
        <p style="text-align: justify; margin-bottom: 0.65rem; font-size: 8pt; color: #475569;">
          Estructura curricular de competencias laborales articuladas con las fases del ciclo PHVA y el plan de formación tecnológico.
        </p>
        <table class="sena-table" style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 8pt;">
          <thead>
            <tr style="background: #e2e8f0; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
              <th style="width: 14%; border: 1px solid #cbd5e1; padding: 6px; text-align: center; font-weight: bold; color: #00324D;">Fase del Proyecto</th>
              <th style="width: 38%; border: 1px solid #cbd5e1; padding: 6px; text-align: left; font-weight: bold; color: #00324D;">3.3 Competencias Componente Específico (Técnicas 3D)</th>
              <th style="width: 38%; border: 1px solid #cbd5e1; padding: 6px; text-align: left; font-weight: bold; color: #00324D;">3.4 Competencias Componente Básico (Transversales y Claves)</th>
              <th style="width: 10%; border: 1px solid #cbd5e1; padding: 6px; text-align: center; font-weight: bold; color: #00324D;">Horas Fase</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; vertical-align: top; font-weight: bold; background: #f8fafc; color: #00324D;">
                FASE 1 (PLANEAR)<br><span style="font-size: 7pt; font-weight: normal; color: #64748b;">Trimestre I</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px; vertical-align: top; font-size: 7.5pt; line-height: 1.35;">
                <strong>250201022:</strong> Desarrollar storyboard de acuerdo con guion (192 h)<br>
                <strong>220501083:</strong> Producir componentes de animación / Escultura (384 h)
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px; vertical-align: top; font-size: 7.5pt; line-height: 1.35;">
                <strong>240201530:</strong> Inducción Institucional SENA (48 h)<br>
                <strong>240201524:</strong> Procesos de comunicación eficaces (48 h)<br>
                <strong>240201526:</strong> Proyecto de vida y ética profesional (48 h)<br>
                <strong>240202501:</strong> Idioma Inglés - Nivel 1 (48 h)
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; vertical-align: middle; font-weight: bold;">
                528 h
              </td>
            </tr>
            <tr style="background: #fafafa;">
              <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; vertical-align: top; font-weight: bold; background: #f8fafc; color: #00324D;">
                FASE 2 (HACER)<br><span style="font-size: 7pt; font-weight: normal; color: #64748b;">Trimestres II, III, IV</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px; vertical-align: top; font-size: 7.5pt; line-height: 1.35;">
                <strong>220501083:</strong> Modelado 3D, UVs y texturizado PBR<br>
                <strong>220101016:</strong> CAD paramétrico, Manufactura aditiva 3D y BIM (288 h)<br>
                <strong>250201026:</strong> Animar elementos, Rigging y MoCap (192 h)<br>
                <strong>250201039:</strong> VFX Asistido por IA y difusión generativa (336 h)
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px; vertical-align: top; font-size: 7.5pt; line-height: 1.35;">
                <strong>240201527:</strong> Hábitos saludables y cultura física (48 h)<br>
                <strong>210201501:</strong> Derechos fundamentales del trabajo (48 h)<br>
                <strong>240201529:</strong> Emprendimiento y modelo de negocio (48 h)<br>
                <strong>220601501:</strong> Protección ambiental y SST (48 h)<br>
                <strong>240202501:</strong> Idioma Inglés - Niveles 2, 3 y 4 (144 h)
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; vertical-align: middle; font-weight: bold;">
                1.104 h
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; vertical-align: top; font-weight: bold; background: #f8fafc; color: #00324D;">
                FASE 3 (VERIFICAR)<br><span style="font-size: 7pt; font-weight: normal; color: #64748b;">Trimestres V, VI</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px; vertical-align: top; font-size: 7.5pt; line-height: 1.35;">
                <strong>250201039:</strong> Composición nodal en ACES, Render y Audio Foley<br>
                <strong>220501096:</strong> Optimización en tiempo real a 60 FPS y Scripting POO (384 h)
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px; vertical-align: top; font-size: 7.5pt; line-height: 1.35;">
                <strong>220501501:</strong> Tecnologías de la Información y Comunicación TIC (48 h)<br>
                <strong>240202501:</strong> Idioma Inglés - Niveles 5 y 6 (96 h)
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; vertical-align: middle; font-weight: bold;">
                768 h
              </td>
            </tr>
            <tr style="background: #fafafa;">
              <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; vertical-align: top; font-weight: bold; background: #f8fafc; color: #00324D;">
                FASE 4 (ACTUAR)<br><span style="font-size: 7pt; font-weight: normal; color: #64748b;">Trimestre VII</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px; vertical-align: top; font-size: 7.5pt; line-height: 1.35;">
                <strong>220501096:</strong> Compilar ejecutable multiplataforma, Gemelo Digital y validación final de portafolio
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px; vertical-align: top; font-size: 7.5pt; line-height: 1.35;">
                <strong>240201529:</strong> Pitch comercial y sustentación técnica del portafolio profesional ante comité evaluador
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; vertical-align: middle; font-weight: bold;">
                384 h
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 3. PLANEACIÓN DEL PROYECTO (TABLA OFICIAL SENA GFPI-F-016) -->
        <div class="sena-sub-title" style="color: #0f172a; font-size: 10.5pt; font-weight: bold; margin-top: 1.5rem; margin-bottom: 0.4rem;">
          3. PLANEACIÓN DEL PROYECTO (39 GUÍAS CONSECUTIVAS — PIPELINE TECNOLÓGICO)
        </div>
        <p style="text-align: justify; margin-bottom: 0.75rem; font-size: 8pt; color: #475569;">
          Secuencia cronológica de ejecución de la formación por fases y guías de aprendizaje consecutivas de 48 horas (1 crédito formativo cada una).
        </p>
        <table class="sena-table" style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 7.5pt;">
          <thead>
            <tr style="background: #e2e8f0; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
              <th colspan="7" style="text-align: center; font-weight: bold; padding: 7px; border: 1px solid #cbd5e1; font-size: 9pt; color: #00324D;">
                3. PLANEACIÓN DEL PROYECTO
              </th>
            </tr>
            <tr style="background: #f1f5f9; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
              <th rowspan="2" style="width: 10%; border: 1px solid #cbd5e1; padding: 5px; text-align: center; vertical-align: middle; font-weight: bold;">3.1 FASES DEL PROYECTO</th>
              <th rowspan="2" style="width: 28%; border: 1px solid #cbd5e1; padding: 5px 7px; text-align: left; vertical-align: middle; font-weight: bold;">3.2 ACTIVIDADES DEL PROYECTO:<br><span style="font-size: 6.8pt; font-weight: normal; color: #475569;">Verbo (en infinitivo) - Objeto - Condición</span></th>
              <th rowspan="2" style="width: 6%; border: 1px solid #cbd5e1; padding: 5px; text-align: center; vertical-align: middle; font-weight: bold;">GUÍA DE APRENDIZAJE</th>
              <th colspan="2" style="width: 28%; border: 1px solid #cbd5e1; padding: 5px; text-align: center; font-weight: bold;">3.3. RESULTADOS DE APRENDIZAJE COMPONENTE ESPECÍFICO</th>
              <th colspan="2" style="width: 28%; border: 1px solid #cbd5e1; padding: 5px; text-align: center; font-weight: bold;">3.4. RESULTADOS DE APRENDIZAJE COMPONENTE BÁSICO (TRANSVERSALES Y CLAVES)</th>
            </tr>
            <tr style="background: #f8fafc; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
              <th style="width: 14%; border: 1px solid #cbd5e1; padding: 4px; font-size: 7pt; text-align: center;">Código - competencia</th>
              <th style="width: 14%; border: 1px solid #cbd5e1; padding: 4px; font-size: 7pt; text-align: center;">Denominación</th>
              <th style="width: 14%; border: 1px solid #cbd5e1; padding: 4px; font-size: 7pt; text-align: center;">Código - competencia</th>
              <th style="width: 14%; border: 1px solid #cbd5e1; padding: 4px; font-size: 7pt; text-align: center;">Denominación</th>
            </tr>
          </thead>
          <tbody>
            ${this.renderOfficialPlaneacionRows(pf.planeacion_proyecto || PROYECTO_FORMATIVO_DEFAULT.planeacion_proyecto)}
          </tbody>
        </table>

      </div>
    `;
  }
}
