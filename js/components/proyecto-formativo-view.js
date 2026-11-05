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

export class ProyectoFormativoView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentMode = 'edit'; // 'edit' o 'preview'
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
      <div class="proyecto-container" style="max-width: 1200px; margin: 0 auto; padding-bottom: 3rem;">
        
        <!-- Header de la sección (No se imprime) -->
        <div class="no-print" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.35rem;">
                <span class="badge cyan" style="font-size: 0.75rem;">GFPI-F-016 V03</span>
                <span style="font-size: 1.35rem; font-weight: 800; color: #fff; letter-spacing: -0.5px;">📁 Proyecto Formativo</span>
              </div>
              <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">
                Definición y edición de los componentes, macroproyectos y entregables técnicos. Los cambios aquí actualizan automáticamente las Guías de Aprendizaje.
              </p>
            </div>

            <!-- Botones de Acción Superiores -->
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

  renderEditorForm(pf) {
    const mp1 = pf.macroproyectos[0] || {};
    const mp2 = pf.macroproyectos[1] || {};
    const mp3 = pf.macroproyectos[2] || {};

    const mp1Entregables = (mp1.entregables || []).join('\n');
    const mp2Entregables = (mp2.entregables || []).join('\n');
    const mp3Entregables = (mp3.entregables || []).join('\n');

    const causas = (pf.problema.causas || []).join('\n');
    const consecuencias = (pf.problema.consecuencias || []).join('\n');
    const objEspecificos = (pf.objetivos.especificos || []).join('\n');

    return `
      <form id="formProyectoFormativo" onsubmit="event.preventDefault(); window.app.proyectoView.save();">

        <!-- 1. INFORMACIÓN BÁSICA DEL PROYECTO -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <span class="badge cyan">Sección 1</span>
            <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">📋 Información Básica del Proyecto Formativo</span>
          </div>

          <div class="form-group">
            <label class="form-label" style="font-weight: 700; color: #38bdf8;">Nombre del Proyecto Formativo:</label>
            <textarea id="pfNombre" class="form-input" rows="2" style="font-weight: 600; font-size: 0.95rem; line-height: 1.45;">${this.escapeHtml(pf.info_basica.nombre_proyecto)}</textarea>
            <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;">Este nombre se sincroniza automáticamente como encabezado en todas las Guías de Aprendizaje.</div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1rem;">
            <div>
              <label class="form-label">Código del Proyecto:</label>
              <input type="text" id="pfCodigo" class="form-input" value="${this.escapeHtml(pf.info_basica.codigo_proyecto || 'PRY-3D-2026-SENA-016')}">
            </div>
            <div>
              <label class="form-label">Programa de Formación:</label>
              <input type="text" id="pfPrograma" class="form-input" value="${this.escapeHtml(pf.info_basica.programa)}" readonly style="opacity: 0.75;">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.25rem; margin-bottom: 1rem;">
            <div>
              <label class="form-label">Centro de Formación:</label>
              <input type="text" id="pfCentro" class="form-input" value="${this.escapeHtml(pf.info_basica.centro)}">
            </div>
            <div>
              <label class="form-label">Regional:</label>
              <input type="text" id="pfRegional" class="form-input" value="${this.escapeHtml(pf.info_basica.regional)}">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Palabras Claves del Proyecto (separadas por comas):</label>
            <textarea id="pfPalabrasClave" class="form-input" rows="2" style="font-size: 0.85rem;">${this.escapeHtml(pf.info_basica.palabras_clave)}</textarea>
          </div>
        </div>


        <!-- 2. LOS TRES MACROPROYECTOS FORMATIVOS (PRODUCTOS Y ENTREGABLES TÉCNICOS) -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge purple">Sección 2</span>
              <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">🎯 Tres Macroproyectos Nucleares (Productos Técnicos)</span>
            </div>
            <span style="font-size: 0.78rem; color: #a78bfa; background: rgba(167, 139, 250, 0.1); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(167, 139, 250, 0.2);">
              💡 Conserva el pipeline: Los procesos y normas son fijos, los productos y entregables son adaptables.
            </span>
          </div>

          <!-- Macroproyecto 1: 3D PARA HACER -->
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 1.25rem; margin-bottom: 1.25rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="badge cyan">Macroproyecto 1</span>
                <strong style="color: #38bdf8; font-size: 1rem;">${this.escapeHtml(mp1.nombre || '3D PARA HACER')}</strong>
              </div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${mp1.guias_rango || 'GUÍA 01 a 14'} · 672 Horas</span>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted);">Enfoque / Subtítulo:</label>
              <input type="text" id="mp1Subtitulo" class="form-input" value="${this.escapeHtml(mp1.subtitulo)}">
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 0.82rem; color: #38bdf8; font-weight: 700;">
                Entregables y Productos Técnicos <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">— 1 entregable por línea</span>:
              </label>
              <textarea id="mp1Entregables" class="form-input" rows="5" style="font-size: 0.83rem; line-height: 1.45;">${this.escapeHtml(mp1Entregables)}</textarea>
            </div>
          </div>

          <!-- Macroproyecto 2: 3D PARA VER -->
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(167, 139, 250, 0.25); border-radius: 8px; padding: 1.25rem; margin-bottom: 1.25rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="badge purple">Macroproyecto 2</span>
                <strong style="color: #a78bfa; font-size: 1rem;">${this.escapeHtml(mp2.nombre || '3D PARA VER')}</strong>
              </div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${mp2.guias_rango || 'GUÍA 15 a 28'} · 672 Horas</span>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted);">Enfoque / Subtítulo:</label>
              <input type="text" id="mp2Subtitulo" class="form-input" value="${this.escapeHtml(mp2.subtitulo)}">
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 0.82rem; color: #a78bfa; font-weight: 700;">
                Entregables y Productos Técnicos <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">— 1 entregable por línea</span>:
              </label>
              <textarea id="mp2Entregables" class="form-input" rows="6" style="font-size: 0.83rem; line-height: 1.45;">${this.escapeHtml(mp2Entregables)}</textarea>
            </div>
          </div>

          <!-- Macroproyecto 3: 3D PARA INTERACTUAR -->
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 1.25rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="badge emerald">Macroproyecto 3</span>
                <strong style="color: #34d399; font-size: 1rem;">${this.escapeHtml(mp3.nombre || '3D PARA INTERACTUAR')}</strong>
              </div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${mp3.guias_rango || 'GUÍA 29 a 37'} · 432 Horas</span>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted);">Enfoque / Subtítulo:</label>
              <input type="text" id="mp3Subtitulo" class="form-input" value="${this.escapeHtml(mp3.subtitulo)}">
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 0.82rem; color: #34d399; font-weight: 700;">
                Entregables y Productos Técnicos <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">— 1 entregable por línea</span>:
              </label>
              <textarea id="mp3Entregables" class="form-input" rows="6" style="font-size: 0.83rem; line-height: 1.45;">${this.escapeHtml(mp3Entregables)}</textarea>
            </div>
          </div>
        </div>


        <!-- 3. PLANTEAMIENTO DEL PROBLEMA O NECESIDAD -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <span class="badge amber">Sección 3</span>
            <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">⚠️ Planteamiento del Problema</span>
          </div>

          <div class="form-group">
            <label class="form-label" style="font-weight: 700; color: #fbbf24;">Descripción del Problema o Necesidad del Sector:</label>
            <textarea id="pfProblemaDesc" class="form-input" rows="4" style="font-size: 0.88rem; line-height: 1.45;">${this.escapeHtml(pf.problema.descripcion)}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label" style="font-weight: 700; color: #f8fafc;">Pregunta Problémica de Investigación:</label>
            <textarea id="pfPregunta" class="form-input" rows="2" style="font-size: 0.88rem; line-height: 1.45;">${this.escapeHtml(pf.problema.pregunta_investigacion)}</textarea>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
            <div>
              <label class="form-label" style="color: #f87171; font-weight: 700;">
                Causas Identificadas <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">— 1 por línea</span>:
              </label>
              <textarea id="pfCausas" class="form-input" rows="5" style="font-size: 0.82rem; line-height: 1.45;">${this.escapeHtml(causas)}</textarea>
            </div>
            <div>
              <label class="form-label" style="color: #fca5a5; font-weight: 700;">
                Consecuencias en el Entorno Productivo <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">— 1 por línea</span>:
              </label>
              <textarea id="pfConsecuencias" class="form-input" rows="5" style="font-size: 0.82rem; line-height: 1.45;">${this.escapeHtml(consecuencias)}</textarea>
            </div>
          </div>
        </div>


        <!-- 4. JUSTIFICACIÓN Y OBJETIVOS -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <span class="badge emerald">Sección 4</span>
            <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">💡 Justificación y Objetivos</span>
          </div>

          <div class="form-group">
            <label class="form-label" style="font-weight: 700; color: #34d399;">Justificación Pedagógica y Productiva del Proyecto:</label>
            <textarea id="pfJustificacion" class="form-input" rows="5" style="font-size: 0.88rem; line-height: 1.45;">${this.escapeHtml(pf.justificacion)}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label" style="font-weight: 700; color: #f8fafc;">Objetivo General del Proyecto:</label>
            <textarea id="pfObjGeneral" class="form-input" rows="3" style="font-size: 0.88rem; line-height: 1.45;">${this.escapeHtml(pf.objetivos.general)}</textarea>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" style="color: #38bdf8; font-weight: 700;">
              Objetivos Específicos <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">— 1 objetivo por línea</span>:
            </label>
            <textarea id="pfObjEspecificos" class="form-input" rows="6" style="font-size: 0.82rem; line-height: 1.45;">${this.escapeHtml(objEspecificos)}</textarea>
          </div>
        </div>


        <!-- 5. ALCANCE, BENEFICIARIOS E IMPACTOS -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <span class="badge cyan">Sección 5</span>
            <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">🌐 Alcance, Beneficiarios e Impactos</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1rem;">
            <div>
              <label class="form-label" style="font-weight: 600;">Beneficiarios Directos:</label>
              <textarea id="pfBenDirectos" class="form-input" rows="3" style="font-size: 0.82rem;">${this.escapeHtml(pf.alcance.beneficiarios_directos)}</textarea>
            </div>
            <div>
              <label class="form-label" style="font-weight: 600;">Beneficiarios Indirectos:</label>
              <textarea id="pfBenIndirectos" class="form-input" rows="3" style="font-size: 0.82rem;">${this.escapeHtml(pf.alcance.beneficiarios_indirectos)}</textarea>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
            <div>
              <label class="form-label" style="font-size: 0.8rem;">Impacto Social:</label>
              <textarea id="pfImpSocial" class="form-input" rows="2" style="font-size: 0.82rem;">${this.escapeHtml(pf.alcance.impacto_social)}</textarea>
            </div>
            <div>
              <label class="form-label" style="font-size: 0.8rem;">Impacto Económico:</label>
              <textarea id="pfImpEconomico" class="form-input" rows="2" style="font-size: 0.82rem;">${this.escapeHtml(pf.alcance.impacto_economico)}</textarea>
            </div>
            <div>
              <label class="form-label" style="font-size: 0.8rem;">Impacto Ambiental:</label>
              <textarea id="pfImpAmbiental" class="form-input" rows="2" style="font-size: 0.82rem;">${this.escapeHtml(pf.alcance.impacto_ambiental)}</textarea>
            </div>
            <div>
              <label class="form-label" style="font-size: 0.8rem;">Impacto Tecnológico:</label>
              <textarea id="pfImpTecnologico" class="form-input" rows="2" style="font-size: 0.82rem;">${this.escapeHtml(pf.alcance.impacto_tecnologico)}</textarea>
            </div>
          </div>
        </div>


        <!-- BOTONES DE ACCIÓN INFERIORES -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.25rem 1.5rem; flex-wrap: wrap; gap: 1rem;">
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

    saveProyectoFormativo(pf);

    if (window.app && typeof window.app.showToast === 'function') {
      window.app.showToast('✅ Proyecto Formativo guardado y sincronizado con las Guías de Aprendizaje.', 'success');
    }

    // Si la vista oficial estaba abierta o para actualizar el render
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
    // Si estamos en modo edición, cambiamos temporalmente a preview y llamamos a imprimir
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
    const mp1 = pf.macroproyectos[0] || {};
    const mp2 = pf.macroproyectos[1] || {};
    const mp3 = pf.macroproyectos[2] || {};

    const instructor = localStorage.getItem('sena_instructor_disenador') || 'Equipo de Desarrollo Curricular 3D & Nuevas Tecnologías';
    const centro = pf.info_basica.centro || 'Centro Tecnológico del Mobiliario';
    const regional = pf.info_basica.regional || 'ANTIOQUIA - ITAGÜÍ';

    return `
      <div class="sena-document" id="senaDocumentContent" style="padding: 2.5cm 2cm; background: #ffffff; color: #111827; font-family: 'Arial', 'Helvetica Neue', Helvetica, sans-serif; font-size: 11pt; line-height: 1.5;">
        
        <!-- Encabezado Institucional SENA Oficial -->
        <table class="sena-header-table" style="width: 100%; border-collapse: collapse; margin-bottom: 2rem; border: 1.5px solid #00324D;">
          <tr>
            <td rowspan="2" class="sena-logo-box" style="width: 120px; text-align: center; font-weight: 800; color: #39A900; font-size: 16pt; background-color: #f8fafc; border: 1px solid #00324D; padding: 8px 12px; vertical-align: middle;">
              <div style="font-size: 20pt; font-weight: 900; color: #39A900; letter-spacing: -1px; line-height: 1;">SENA</div>
              <div style="font-size: 6.5pt; color: #00324D; font-weight: bold; margin-top: 4px;">SISTEMA INTEGRADO DE GESTIÓN</div>
            </td>
            <td class="sena-doc-title" style="text-align: center; font-size: 13pt; font-weight: bold; color: #00324D; text-transform: uppercase; border: 1px solid #00324D; padding: 8px 12px; vertical-align: middle;">
              SERVICIO NACIONAL DE APRENDIZAJE SENA<br>
              <span style="font-size: 9.5pt; font-weight: 600; color: #00324D;">SISTEMA INTEGRADO DE GESTIÓN</span><br>
              <span style="font-size: 8.5pt; font-weight: normal; color: #475569;">Procedimiento Ejecución de la Formación Profesional Integral</span><br>
              <strong style="font-size: 12pt; color: #00324D;">PROYECTO FORMATIVO</strong>
            </td>
            <td class="sena-version-box" style="width: 130px; font-size: 8pt; color: #4b5563; border: 1px solid #00324D; padding: 8px 12px; vertical-align: middle;">
              <strong>Código:</strong> ${pf.codigo_formato || 'GFPI-F-016'}<br>
              <strong>Versión:</strong> ${pf.version || '03'}<br>
              <strong>Estado:</strong> Aprobado
            </td>
          </tr>
          <tr>
            <td colspan="2" style="font-size: 8.5pt; background: #f8fafc; border: 1px solid #00324D; padding: 6px 12px;">
              <strong>Centro:</strong> ${centro} | <strong>Regional:</strong> ${regional}
            </td>
          </tr>
        </table>

        <!-- 1. INFORMACIÓN BÁSICA DEL PROYECTO -->
        <div class="sena-section-title" style="color: #00324D; font-size: 12pt; font-weight: bold; border-bottom: 2px solid #39A900; padding-bottom: 4px; margin-top: 1.75rem; margin-bottom: 0.85rem; text-transform: uppercase;">
          1. INFORMACIÓN BÁSICA DEL PROYECTO
        </div>
        <table class="sena-table" style="width: 100%; border-collapse: collapse; margin: 1.25rem 0; font-size: 9.5pt;">
          <tr>
            <td style="width: 25%; font-weight: bold; border: 1px solid #cbd5e1; padding: 7px 10px;">1.1 Centro de Formación:</td>
            <td style="width: 45%; border: 1px solid #cbd5e1; padding: 7px 10px;">${centro}</td>
            <td style="width: 15%; font-weight: bold; border: 1px solid #cbd5e1; padding: 7px 10px;">1.2 Regional:</td>
            <td style="width: 15%; border: 1px solid #cbd5e1; padding: 7px 10px;">${regional}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 7px 10px;">1.3 Formador / Diseñador Curricular:</td>
            <td colspan="3" style="border: 1px solid #cbd5e1; padding: 7px 10px;"><strong>${instructor}</strong></td>
          </tr>
          <tr>
            <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 7px 10px;">1.4 Nombre del Proyecto:</td>
            <td colspan="3" style="border: 1px solid #cbd5e1; padding: 7px 10px; font-weight: bold; color: #00324D;">${this.escapeHtml(pf.info_basica.nombre_proyecto)}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 7px 10px;">1.5 Programa de Formación:</td>
            <td style="border: 1px solid #cbd5e1; padding: 7px 10px;"><strong>${this.escapeHtml(pf.info_basica.programa)}</strong> (Código: ${pf.info_basica.codigo_programa || '522301'})</td>
            <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 7px 10px;">1.6 Tiempo Estimado:</td>
            <td style="border: 1px solid #cbd5e1; padding: 7px 10px;"><strong>${pf.info_basica.tiempo_ejecucion_horas || 3120} Horas</strong> (${pf.info_basica.creditos_totales || 65} Créditos)</td>
          </tr>
          <tr>
            <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 7px 10px;">1.7 Palabras Claves:</td>
            <td colspan="3" style="border: 1px solid #cbd5e1; padding: 7px 10px; font-size: 8.5pt; color: #475569;">${this.escapeHtml(pf.info_basica.palabras_clave)}</td>
          </tr>
        </table>

        <!-- 2. ESTRUCTURA DEL PROYECTO -->
        <div class="sena-section-title" style="color: #00324D; font-size: 12pt; font-weight: bold; border-bottom: 2px solid #39A900; padding-bottom: 4px; margin-top: 1.75rem; margin-bottom: 0.85rem; text-transform: uppercase;">
          2. ESTRUCTURA Y MACROPROYECTOS FORMATIVOS
        </div>

        <!-- Tabla de los 3 Macroproyectos -->
        <table class="sena-table" style="width: 100%; border-collapse: collapse; margin: 1.25rem 0; font-size: 9.5pt;">
          <thead>
            <tr>
              <th style="background-color: #00324D; color: #ffffff; font-weight: bold; padding: 8px 10px; border: 1px solid #00324D; width: 28%;">Macroproyecto / Enfoque</th>
              <th style="background-color: #00324D; color: #ffffff; font-weight: bold; padding: 8px 10px; border: 1px solid #00324D; width: 14%;">Alcance / Guías</th>
              <th style="background-color: #00324D; color: #ffffff; font-weight: bold; padding: 8px 10px; border: 1px solid #00324D;">Productos Técnicos y Entregables Verificables</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 8px 10px; vertical-align: top;">
                <strong style="color: #00324D;">${this.escapeHtml(mp1.nombre || '3D PARA HACER')}</strong><br>
                <span style="font-size: 8.5pt; color: #475569;">${this.escapeHtml(mp1.subtitulo || '')}</span>
              </td>
              <td style="border: 1px solid #cbd5e1; padding: 8px 10px; vertical-align: top; text-align: center;">
                <span class="sena-badge" style="background-color: #e0f2fe; color: #00324D; font-size: 8pt; font-weight: bold; padding: 2px 6px; border-radius: 4px;">${mp1.guias_rango || 'GUÍA 01 - 14'}</span><br>
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

      </div>
    `;
  }
}
