import { GUIA_TRANSVERSAL_MAPPING } from '../data/guia-transversales.js';
import { RAPS_TECNICOS, RAPS_TRANSVERSALES } from '../data/normas-raps.js';
import { CURRICULO_TECNOLOGO } from '../data/curriculo-tecnologo.js';
import { CURRICULO_MODELADO } from '../data/curriculo-modelado.js';
import { CURRICULO_ANIMACION } from '../data/curriculo-animacion.js';
import { getInstrumentoForRap, INSTRUMENTOS_EVALUACION } from '../data/instrumentos-evaluacion.js';
import { getAprendices, getEvaluacion, saveEvaluacion } from '../data/aprendices-db.js';

export class DocumentBuilder {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentDocType = 'guia'; // 'guia', 'instrumento', 'planeacion', 'proyecto'
    this.currentRap = 'RAP-01';
    this.selectedTransversalRap = null;
    this.selectedAprendizDoc = null;
    this.currentProgram = 'tecnologo';
  }

  render(programType = 'tecnologo') {
    this.currentProgram = programType;
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="generator-layout">
        <!-- Sidebar Controls -->
        <aside class="generator-sidebar">
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>⚙️</span> Generador SENA
          </h3>

          <div class="form-group">
            <label class="form-label">Tipo de Documento:</label>
            <select class="form-select" id="docTypeSelect" onchange="window.app.changeDocType(this.value)">
              <option value="guia" ${this.currentDocType === 'guia' ? 'selected' : ''}>📄 Guía de Aprendizaje</option>
              <option value="instrumento" ${this.currentDocType === 'instrumento' ? 'selected' : ''}>📋 Instrumento de Evaluación (Lista de Chequeo)</option>
              <option value="planeacion" ${this.currentDocType === 'planeacion' ? 'selected' : ''}>🗓️ Planeación Pedagógica</option>
              <option value="proyecto" ${this.currentDocType === 'proyecto' ? 'selected' : ''}>📁 Proyecto Formativo</option>
            </select>
          </div>

          <div class="form-group" id="rapSelectorGroup" style="${(this.currentDocType === 'guia' || this.currentDocType === 'instrumento') ? 'display: block;' : 'display: none;'}">
            <label class="form-label" style="font-weight: 700;">Seleccionar RAP Técnico a Desarrollar / Evaluar:</label>
            <select class="form-select" id="rapSelect" onchange="window.app.changeSelectedRap(this.value)">
              ${Object.keys(RAPS_TECNICOS).map(key => {
                const rap = RAPS_TECNICOS[key];
                return `<option value="${key}" ${this.currentRap === key ? 'selected' : ''}>${rap.id}: ${rap.actividad_clave}</option>`;
              }).join('')}
            </select>

            <!-- Panel Dinámico de RAPs Transversales Vinculados -->
            <div id="transversalManagerContainer">
              ${this.renderTransversalesManager(this.currentRap)}
            </div>
          </div>

          <!-- Selector de Aprendiz y Acceso a BD -->
          <div class="form-group" id="aprendizSelectorGroup" style="${this.currentDocType === 'instrumento' ? 'display: block;' : 'display: none;'}">
            <label class="form-label" style="font-weight: 700; color: #10b981; display: flex; justify-content: space-between; align-items: center;">
              <span>👤 Aprendiz a Calificar:</span>
              <button type="button" onclick="window.app.openAprendicesModal()" style="font-size: 0.72rem; color: #34d399; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 4px; padding: 2px 7px; cursor: pointer; font-weight: 600;">
                ⚙️ Base de Datos
              </button>
            </label>
            <select class="form-select" id="aprendizSelect" onchange="window.app.changeSelectedAprendiz(this.value)" style="border-color: rgba(16, 185, 129, 0.4); font-size: 0.85rem; background: rgba(16, 185, 129, 0.05); font-weight: 600; color: #10b981;">
              ${this.renderAprendizOptions()}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Centro de Formación / Regional:</label>
            <input type="text" class="form-input" id="centroInput" value="Centro Tecnológico del Mobiliario - Centro de Servicios y Gestión Empresarial" oninput="window.app.updateDocPreview()">
          </div>

          <div class="form-group">
            <label class="form-label">Nombre del Instructor / Diseñador:</label>
            <input type="text" class="form-input" id="instructorInput" value="Equipo de Desarrollo Curricular 3D & Nuevas Tecnologías" oninput="window.app.updateDocPreview()">
          </div>

          <div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem;">
            <button class="btn-action primary" onclick="window.print()" style="justify-content: center; padding: 0.75rem;">
              🖨️ Imprimir / Guardar en PDF
            </button>
            <button class="btn-action" id="btnExportExcel" onclick="window.app.exportInstrumentoExcel()" style="justify-content: center; padding: 0.65rem; border-color: rgba(16, 185, 129, 0.5); color: #34d399; background: rgba(16, 185, 129, 0.08); ${this.currentDocType === 'instrumento' ? 'display: flex;' : 'display: none;'}">
              📊 Descargar Excel Multi-Hoja (.xls)
            </button>
            <button class="btn-action" onclick="window.app.copyDocumentText()" style="justify-content: center; padding: 0.65rem;">
              📋 Copiar Formato Texto
            </button>
            <button class="btn-action" onclick="window.app.sendToN8n()" style="justify-content: center; padding: 0.65rem; border-color: rgba(56, 189, 248, 0.4); color: var(--accent-cyan);">
              ⚡ Enviar a Webhook n8n
            </button>
          </div>
        </aside>

        <!-- Preview Document Area -->
        <section class="doc-preview-wrapper" id="documentPreview">
          <!-- El contenido se inyecta dinámicamente -->
        </section>
      </div>
    `;

    this.updatePreview();
  }


  // ====================================================================
  // GESTIÓN DINÁMICA DE RAPs TRANSVERSALES MULTIPLES POR GUÍA
  // ====================================================================
  getAssociatedTransversalIds(rapKey) {
    try {
      const raw = localStorage.getItem('sena_guia_transversales_asociadas');
      if (raw) {
        const store = JSON.parse(raw);
        if (store && Array.isArray(store[rapKey])) {
          return store[rapKey];
        }
      }
    } catch (e) {
      console.error('Error al leer transversales asociadas:', e);
    }

    // Por defecto: incluye todos los RAPs transversales sugeridos en GUIA_TRANSVERSAL_MAPPING para esta guía
    const mapping = GUIA_TRANSVERSAL_MAPPING[rapKey];
    if (mapping && mapping.transversales && mapping.transversales.length > 0) {
      return mapping.transversales.map(t => t.rap_id);
    }
    return ['RAP-25'];
  }

  saveAssociatedTransversalIds(rapKey, ids) {
    try {
      let store = {};
      const raw = localStorage.getItem('sena_guia_transversales_asociadas');
      if (raw) store = JSON.parse(raw);
      store[rapKey] = ids;
      localStorage.setItem('sena_guia_transversales_asociadas', JSON.stringify(store));
    } catch (e) {
      console.error('Error al guardar transversales asociadas:', e);
    }
  }

  getActiveTransversales(rapKey) {
    const ids = this.getAssociatedTransversalIds(rapKey);
    return ids.map(id => this.getTransversalData(id, rapKey)).filter(Boolean);
  }

  getTransversalData(tKey, rapKey = null) {
    // 1. Buscar en el mapeo directo de este RAP
    if (rapKey && GUIA_TRANSVERSAL_MAPPING[rapKey]?.transversales) {
      const found = GUIA_TRANSVERSAL_MAPPING[rapKey].transversales.find(t => t.rap_id === tKey);
      if (found) return found;
    }
    // 2. Buscar en cualquier mapeo enriquecido existente
    for (const rk of Object.keys(GUIA_TRANSVERSAL_MAPPING)) {
      const list = GUIA_TRANSVERSAL_MAPPING[rk].transversales;
      if (list) {
        const found = list.find(t => t.rap_id === tKey);
        if (found) return found;
      }
    }
    // 3. Fallback normativo desde RAPS_TRANSVERSALES
    const r = RAPS_TRANSVERSALES[tKey];
    if (r) {
      return {
        rap_id: tKey,
        codigo: r.norma_codigo,
        competencia: r.norma_nombre,
        nombre_rap: r.resultado_aprendizaje,
        horas: r.horas || 48,
        titulo_actividad: `Actividad de Integración Transversal (${r.id}): ${r.norma_nombre}`,
        descripcion_actividad: `Desarrollar talleres de formación integral en "${r.resultado_aprendizaje}", articulando los conocimientos transversales a la producción técnica de esta guía.`,
        evidencia: r.evidencia || 'Documento y sustentación del componente transversal.',
        criterios: r.criterios_evaluacion || []
      };
    }
    return null;
  }

  addTransversalToRap(rapKey, tKey) {
    if (!tKey) return;
    const current = this.getAssociatedTransversalIds(rapKey);
    if (!current.includes(tKey)) {
      current.push(tKey);
      this.saveAssociatedTransversalIds(rapKey, current);
    }
  }

  removeTransversalFromRap(rapKey, tKey) {
    let current = this.getAssociatedTransversalIds(rapKey);
    current = current.filter(id => id !== tKey);
    this.saveAssociatedTransversalIds(rapKey, current);
  }

  renderTransversalesManager(rapKey) {
    const currentIds = this.getAssociatedTransversalIds(rapKey);
    const activeList = currentIds.map(id => this.getTransversalData(id, rapKey)).filter(Boolean);

    // Filtrar RAPs disponibles que NO estén ya vinculados (evita duplicados)
    const allAvailableKeys = Object.keys(RAPS_TRANSVERSALES).filter(k => k !== 'RAP-31' && !currentIds.includes(k));

    return `
      <div style="background: rgba(168, 85, 247, 0.04); border: 1px solid rgba(168, 85, 247, 0.25); border-radius: 6px; padding: 10px; margin-top: 0.85rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <label style="font-size: 0.8rem; font-weight: 700; color: #c084fc; display: flex; align-items: center; gap: 0.35rem; margin: 0;">
            <span>🌐</span> RAPs Transversales Vinculados (${activeList.length}):
          </label>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 0.65rem; max-height: 180px; overflow-y: auto;">
          ${activeList.length === 0 ? `
            <div style="font-size: 0.74rem; color: var(--text-dim); font-style: italic; padding: 6px 8px; background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.1); border-radius: 4px;">
              Ningún RAP transversal vinculado (Guía 100% técnica).
            </div>
          ` : activeList.map(t => `
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(168, 85, 247, 0.12); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 5px; padding: 5px 8px;">
              <div style="font-size: 0.75rem; line-height: 1.25; overflow: hidden; text-overflow: ellipsis; max-width: 82%;">
                <strong style="color: #e9d5ff;">${t.rap_id.replace('-', ' ')}</strong>
                <span style="color: #c084fc; font-size: 0.7rem; font-weight: 600;">(${t.horas}h)</span>
                <div style="font-size: 0.68rem; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  ${t.competencia}
                </div>
              </div>
              <button type="button" onclick="window.app.removeTransversalFromGuia('${t.rap_id}')" title="Desvincular este RAP transversal"
                style="background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.4); color: #fca5a5; border-radius: 4px; padding: 2px 6px; font-size: 0.72rem; cursor: pointer; line-height: 1;">
                ✕
              </button>
            </div>
          `).join('')}
        </div>

        <!-- Selector para Agregar un Nuevo RAP Transversal (sin repetir) -->
        <div style="display: flex; gap: 0.35rem; align-items: center;">
          <select class="form-select" id="addTransversalSelect" style="border-color: rgba(168, 85, 247, 0.4); font-size: 0.74rem; background: rgba(168, 85, 247, 0.05); padding: 4px 6px; flex: 1;">
            <option value="">+ Vincular otro RAP Transversal...</option>
            ${allAvailableKeys.map(k => {
              const r = RAPS_TRANSVERSALES[k];
              return `<option value="${k}">${k.replace('-', ' ')}: ${r.norma_nombre.substring(0, 32)}... (${r.horas}h)</option>`;
            }).join('')}
          </select>
          <button type="button" onclick="window.app.addTransversalToGuia()" 
            style="background: rgba(168, 85, 247, 0.25); border: 1px solid #a855f7; color: #e9d5ff; border-radius: 4px; padding: 4px 9px; font-size: 0.75rem; font-weight: 700; cursor: pointer; white-space: nowrap;">
            + Vincular
          </button>
        </div>
      </div>
    `;
  }

  // Compatibilidad hacia atrás
  renderTransversalOptions(rapKey) {
    return this.renderTransversalesManager(rapKey);
  }

  updatePreview() {
    const previewContainer = document.getElementById('documentPreview');
    if (!previewContainer) return;

    const centro = document.getElementById('centroInput')?.value || 'Centro Tecnológico del Mobiliario - Centro de Servicios y Gestión Empresarial';
    const instructor = document.getElementById('instructorInput')?.value || 'Equipo Técnico Curricular';

    if (this.currentDocType === 'guia') {
      previewContainer.innerHTML = this.generateGuiaHTML(this.currentRap, centro, instructor);
    } else if (this.currentDocType === 'instrumento') {
      previewContainer.innerHTML = this.generateInstrumentoHTML(this.currentRap, centro, instructor);
    } else if (this.currentDocType === 'planeacion') {
      previewContainer.innerHTML = this.generatePlaneacionHTML(centro, instructor);
    } else {
      previewContainer.innerHTML = this.generateProyectoHTML(centro, instructor);
    }
  }

  getActiveAprendiz() {
    const list = getAprendices();
    if (!list || list.length === 0) return { id: 1, ficha: '2824560', tipo_doc: 'CC', documento: '1001234567', nombres: 'Alejandro', apellidos: 'Morales Gómez' };
    if (!this.selectedAprendizDoc) {
      this.selectedAprendizDoc = list[0].documento;
      return list[0];
    }
    const found = list.find(a => a.documento === String(this.selectedAprendizDoc));
    if (!found) {
      this.selectedAprendizDoc = list[0].documento;
      return list[0];
    }
    return found;
  }

  renderAprendizOptions(selectedDoc = null) {
    const list = getAprendices();
    const activeDoc = selectedDoc || this.selectedAprendizDoc || (list[0] ? list[0].documento : '');
    return list.map(a => {
      const isSel = String(a.documento) === String(activeDoc);
      return `<option value="${a.documento}" ${isSel ? 'selected' : ''}>
        ${a.documento} — ${a.nombres} ${a.apellidos}
      </option>`;
    }).join('');
  }

  // 1. GENERADOR DE GUÍA DE APRENDIZAJE OFICIAL SENA
  generateGuiaHTML(rapKey, centro, instructor) {
    const rap = RAPS_TECNICOS[rapKey] || RAPS_TECNICOS['RAP-01'];
    let curriculo = CURRICULO_TECNOLOGO;
    if (this.currentProgram === 'modelado') curriculo = CURRICULO_MODELADO;
    if (this.currentProgram === 'animacion') curriculo = CURRICULO_ANIMACION;

    // Obtener lista completa de RAPs transversales vinculados a esta guía
    const activeTransversales = this.getActiveTransversales(rapKey);
    const horasTecnicas = rap.horas || 144;
    const horasTransversales = activeTransversales.reduce((acc, t) => acc + (t.horas || 48), 0);
    const totalHorasGuia = horasTecnicas + horasTransversales;
    const totalCreditosGuia = Math.max(1, Math.round(totalHorasGuia / 48));

    // Determinar fase PHVA y trimestre formativo
    const trimInfo = curriculo.trimestres.find(t => t.raps.some(r => r.rap_id === rapKey)) || curriculo.trimestres[0];
    const faseProyectoTag = trimInfo.fase_proyecto || `FASE ${trimInfo.numero}`;

    return `
      <div class="sena-document">
        <!-- Encabezado Institucional SENA -->
        <table class="sena-header-table">
          <tr>
            <td rowspan="2" class="sena-logo-box">
              <div style="font-size: 20pt; font-weight: 900; color: #39A900; letter-spacing: -1px;">SENA</div>
              <div style="font-size: 7pt; color: #00324D; font-weight: bold;">SERVICIO NACIONAL DE APRENDIZAJE</div>
            </td>
            <td class="sena-doc-title">
              GUÍA DE APRENDIZAJE — FORMACIÓN PROFESIONAL INTEGRAL<br>
              <span style="font-size: 9.5pt; font-weight: normal; color: #374151;">PROCESO DE GESTIÓN DE FORMACIÓN PROFESIONAL INTEGRAL</span>
            </td>
            <td class="sena-version-box">
              <strong>Código:</strong> GFPI-F-135<br>
              <strong>Versión:</strong> 02<br>
              <strong>Fecha:</strong> 2026
            </td>
          </tr>
          <tr>
            <td colspan="2" style="font-size: 8.5pt; background: #f8fafc;">
              <strong>${centro}</strong>
            </td>
          </tr>
        </table>

        <!-- 1. IDENTIFICACIÓN DE LA GUÍA -->
        <div class="sena-section-title">1. IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE</div>
        <table class="sena-table">
          <tr>
            <td style="width: 32%; font-weight: bold;">Denominación del Programa de Formación:</td>
            <td>${curriculo.info.denominacion}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Código del Programa de Formación:</td>
            <td>${curriculo.info.codigo}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Nombre del Proyecto Formativo:</td>
            <td>Desarrollo de contenidos digitales 3D interactivos, cinemáticos y prototipos de manufactura bajo flujos híbridos asistidos por IA.</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Fase del Proyecto (Ciclo PHVA):</td>
            <td><strong>${faseProyectoTag}:</strong> ${trimInfo.fase}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Actividad de Proyecto (AP):</td>
            <td>Desarrollar y optimizar los activos 3D, cinemáticos o interactivos según especificaciones de producción y estándares técnicos.</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #f8fafc;">Competencia Técnica Específica (3D):</td>
            <td style="background: #f8fafc;"><strong>${rap.norma_codigo}</strong> — ${rap.norma_nombre}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #f8fafc;">Resultado de Aprendizaje Específico (RAP):</td>
            <td style="background: #f8fafc;">
              <span class="sena-badge" style="background: #e0f2fe; color: #0284c7; font-weight: 700;">${rap.id}</span>
              <strong>${rap.resultado_aprendizaje}</strong> (${rap.horas} Horas)
            </td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #faf5ff; color: #7e22ce; vertical-align: top;">Competencia(s) Transversal(es) / Clave(s):</td>
            <td style="background: #faf5ff;">
              ${activeTransversales.length === 0 ? '<em style="color: #64748b;">Ninguna asociada (Guía de formación 100% técnica).</em>' : `
                <ul style="margin: 0; padding-left: 1.15rem; line-height: 1.45;">
                  ${activeTransversales.map(t => `
                    <li style="margin-bottom: 0.3rem;">
                      <strong>${t.codigo}</strong> — ${t.competencia}
                    </li>
                  `).join('')}
                </ul>
              `}
            </td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #faf5ff; color: #7e22ce; vertical-align: top;">Resultado(s) de Aprendizaje Transversal(es):</td>
            <td style="background: #faf5ff;">
              ${activeTransversales.length === 0 ? '<em style="color: #64748b;">Sin RAPs transversales vinculados.</em>' : `
                <ul style="margin: 0; padding-left: 1.15rem; line-height: 1.45;">
                  ${activeTransversales.map(t => `
                    <li style="margin-bottom: 0.4rem;">
                      <span class="sena-badge" style="background: #f3e8ff; color: #7e22ce; font-weight: 700; margin-right: 4px;">${t.rap_id.replace('-', ' ')}</span>
                      <strong>${t.nombre_rap}</strong> (${t.horas} Horas)
                    </li>
                  `).join('')}
                </ul>
              `}
            </td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Duración Total de la Guía:</td>
            <td>
              <strong style="font-size: 10.5pt; color: #00324D;">${totalHorasGuia} Horas</strong> (${totalCreditosGuia} Créditos SENA)
              <div style="font-size: 8pt; color: #64748b; margin-top: 3px;">
                ⏱️ <strong>${horasTecnicas} Horas Técnicas Directas (3D)</strong>
                ${activeTransversales.length > 0 ? activeTransversales.map(t => ` + 🌐 <strong>${t.horas}h (${t.rap_id.replace('-', ' ')})</strong>`).join('') : ''}
              </div>
            </td>
          </tr>
        </table>

        <!-- 2. PRESENTACIÓN -->
        <div class="sena-section-title">2. PRESENTACIÓN</div>
        <p style="text-align: justify; margin-bottom: 0.85rem;">
          Estimado Aprendiz: La industria de contenidos digitales, videojuegos, arquitectura y efectos visuales demanda profesionales integrales capaces de dominar flujos de trabajo contemporáneos de alta eficiencia y rigor técnico. En esta guía de aprendizaje correspondiente a la actividad clave <strong>"${rap.actividad_clave}"</strong>, usted abordará los fundamentos de la técnica 3D y su aceleración asistida por Inteligencia Artificial${activeTransversales.length > 0 ? `, articulados armónicamente con las competencias transversales: ${activeTransversales.map(t => `<strong>"${t.competencia}"</strong>`).join(', ')}` : ''}.
        </p>
        <p style="text-align: justify;">
          A lo largo de este itinerario formativo, aprenderá a sintetizar conceptos, optimizar flujos de producción y generar como producto principal: <em>"${rap.producto_egresado}"</em>, complementando la técnica con habilidades comunicativas, bilingües, ergonómicas y laborales indispensables para insertarse con éxito en equipos de producción interdisciplinares globales.
        </p>

        <!-- 3. FORMULACIÓN DE ACTIVIDADES DE APRENDIZAJE -->
        <div class="sena-section-title">3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE</div>

        <div class="sena-sub-title">3.1 Actividad de Reflexión Inicial (Duración: 6 Horas)</div>
        <p style="text-align: justify; margin-bottom: 0.6rem;">
          En la producción digital actual, el debate ya no gira en torno a si la tecnología o la IA reemplazará al artista 3D, sino a cómo el profesional técnico que articula el rigor del modelado con sólidas competencias transversales (comunicación, ética, bilingüismo y bioseguridad) lidera los pipelines de trabajo más exigentes.
        </p>
        <p style="text-align: justify; font-style: italic; background: #f1f5f9; padding: 10px; border-left: 4px solid #39A900;">
          <strong>Pregunta orientadora:</strong> ¿De qué manera la articulación entre la técnica digital especializada y la dimensión transversal (${activeTransversales.length > 0 ? activeTransversales.map(t => t.competencia).join(', ') : 'formativa integral'}) garantiza la competitividad, la ética y la calidad en el producto final entregado al cliente? Participe en la mesa redonda y foro técnico compartiendo su postura argumentada.
        </p>

        <div class="sena-sub-title">3.2 Actividad de Contextualización e Identificación de Conocimientos Previos (Duración: 10 Horas)</div>
        <p style="text-align: justify;">
          Revise los referentes visuales, las especificaciones del cliente y los estándares internacionales de la industria. Identifique las variables críticas para el desarrollo de la actividad:
        </p>
        <ul style="margin-left: 1.5rem; margin-top: 0.4rem; margin-bottom: 0.8rem;">
          <li>Presupuesto técnico y requerimientos de la plataforma objetivo (cine, motor en tiempo real, manufactura aditiva o BIM).</li>
          <li>Requisitos normativos y comunicativos aplicables al componente transversal.</li>
          <li>Herramientas a emplear: <strong>${rap.herramientas_recomendadas.join(', ')}</strong>.</li>
        </ul>

        <div class="sena-sub-title">3.3 Actividades de Apropiación del Conocimiento — Saber y Hacer Técnico (Duración: ${Math.round(rap.horas * 0.55)} Horas)</div>
        <p style="text-align: justify; margin-bottom: 0.6rem;">
          A través de talleres prácticos, sesiones demostrativas guiadas y laboratorios en estaciones de trabajo, el aprendiz desarrollará las siguientes acciones técnicas fundamentales:
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px;">
            <strong style="color: #00324D; font-size: 9.5pt; text-transform: uppercase;">Conocimientos de Proceso (Hacer Técnico):</strong>
            <ul style="font-size: 8.8pt; margin-left: 1.2rem; margin-top: 0.4rem;">
              ${rap.conocimientos_proceso.map(p => `<li style="margin-bottom: 0.35rem;">${p}</li>`).join('')}
            </ul>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px;">
            <strong style="color: #00324D; font-size: 9.5pt; text-transform: uppercase;">Conocimientos del Saber (Conceptos):</strong>
            <ul style="font-size: 8.8pt; margin-left: 1.2rem; margin-top: 0.4rem;">
              ${rap.conocimientos_saber.map(s => `<li style="margin-bottom: 0.35rem;">${s}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- ACTIVIDADES TRANSVERSALES INTEGRADAS -->
        ${activeTransversales.map((t, idx) => {
          const actNum = `3.${4 + idx}`;
          return `
            <div class="sena-sub-title" style="color: #7e22ce; border-left: 3px solid #a855f7; padding-left: 8px; margin-top: 1.25rem;">
              ${actNum} ${t.titulo_actividad} (Duración: ${t.horas} Horas)
            </div>
            <p style="text-align: justify; margin-bottom: 0.65rem; font-size: 9pt;">
              ${t.descripcion_actividad}
            </p>
            <div style="background: #faf5ff; border: 1.5px solid #c084fc; padding: 10px 14px; border-radius: 6px; margin: 0.6rem 0 1rem 0;">
              <strong style="color: #6b21a8; font-size: 8.5pt; text-transform: uppercase;">📦 Evidencia Transversal Requerida (${t.rap_id.replace('-', ' ')}):</strong>
              <p style="margin-top: 0.25rem; font-size: 8.8pt; color: #3b0764; margin-bottom: 0;">${t.evidencia}</p>
            </div>
          `;
        }).join('')}

        <div class="sena-sub-title">3.5 Actividades de Transferencia del Conocimiento (Duración: ${Math.round(rap.horas * 0.25)} Horas)</div>
        <p style="text-align: justify;">
          El aprendiz integrará armónicamente los conocimientos técnicos y transversales en la entrega formal del producto del proyecto formativo:
        </p>
        <div style="background: #f0fdf4; border: 1.5px solid #22c55e; padding: 12px; border-radius: 6px; margin: 0.8rem 0;">
          <strong style="color: #15803d;">Producto Técnico Principal de Entrega:</strong>
          <p style="margin-top: 0.25rem; font-size: 9.5pt; color: #14532d; font-weight: 600;">${rap.evidencia}</p>
        </div>

        <!-- 4. ACTIVIDADES DE EVALUACIÓN -->
        <div class="sena-section-title">4. ACTIVIDADES DE EVALUACIÓN</div>
        <table class="sena-table">
          <thead>
            <tr>
              <th style="width: 35%;">Evidencias de Aprendizaje</th>
              <th style="width: 40%;">Criterios de Evaluación</th>
              <th style="width: 25%;">Técnicas e Instrumentos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong style="color: #00324D;">De Producto (Técnico 3D):</strong><br>
                ${rap.evidencia}
              </td>
              <td>
                <ul style="margin-left: 1rem; font-size: 8.5pt;">
                  ${rap.criterios_evaluacion.map(c => `<li>${c}</li>`).join('')}
                </ul>
              </td>
              <td>
                <strong>Técnica:</strong> Valoración de Producto Digital.<br><br>
                <strong>Instrumento:</strong> Lista de Chequeo y Rúbrica Técnica Institucional SENA.
              </td>
            </tr>
            ${activeTransversales.map(t => `
              <tr style="background: #faf5ff;">
                <td style="vertical-align: top;">
                  <strong style="color: #7e22ce;">De Desempeño y Producto (${t.rap_id.replace('-', ' ')}):</strong><br>
                  <span style="font-size: 8.5pt; color: #3b0764;">${t.evidencia}</span>
                </td>
                <td style="vertical-align: top;">
                  <strong style="color: #7e22ce; font-size: 8.5pt;">Criterios Transversales (${t.rap_id.replace('-', ' ')}):</strong>
                  <ul style="margin-left: 1rem; margin-top: 0.3rem; font-size: 8.5pt; color: #3b0764;">
                    ${(t.criterios && t.criterios.length > 0) ? t.criterios.map(c => `<li style="margin-bottom: 0.2rem;">${c}</li>`).join('') : `
                      <li style="margin-bottom: 0.2rem;">Aplica los conocimientos y terminología del componente transversal articulados directamente al proyecto 3D.</li>
                      <li style="margin-bottom: 0.2rem;">Estructura las evidencias de acuerdo con las normas técnicas y comunicativas institucionales.</li>
                    `}
                  </ul>
                </td>
                <td style="vertical-align: top; font-size: 8.5pt;">
                  <strong>Técnica:</strong> Valoración de Evidencia Integrada.<br><br>
                  <strong>Instrumento:</strong> Rúbrica de Evaluación Transversal SENA / Lista de Chequeo.
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- 5. GLOSARIO DE TÉRMINOS -->
        <div class="sena-section-title">5. GLOSARIO DE TÉRMINOS</div>
        <p style="font-size: 9pt; text-align: justify;">
          <strong>Pipeline:</strong> Flujo secuencial estructurado de procesos técnicos y artísticos empleados para transformar una idea en un producto digital final.<br>
          <strong>Blocking:</strong> Etapa inicial de modelado o animación donde se definen las proporciones globales, siluetas y masas principales sin entrar en microdetalle.<br>
          <strong>PBR (Physically Based Rendering):</strong> Modelo de sombreado que simula el comportamiento físico real de la luz al interactuar con las superficies.<br>
          <strong>ControlNet:</strong> Arquitectura de red neuronal que permite añadir controles estructurales y espaciales rígidos a modelos generativos de difusión.<br>
          <strong>Competencia Transversal:</strong> Capacidad integral que abarca valores éticos, comunicativos, bilingües y de seguridad en el trabajo necesarios para el desempeño idóneo en cualquier entorno laboral.
        </p>

        <!-- 6. CONTROL DEL DOCUMENTO -->
        <div class="sena-section-title">6. CONTROL DEL DOCUMENTO</div>
        <table class="sena-table" style="font-size: 8.5pt;">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Dependencia</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${instructor}</td>
              <td>Instructor Experto Técnico</td>
              <td>${centro}</td>
              <td>Noviembre de 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }


  // ====================================================================
  // 1B. GENERADOR DE INSTRUMENTO DE EVALUACIÓN — LISTA DE CHEQUEO (GFPI-F-023)
  // Formato Oficial SENA — Red de Artes Gráficas / Tecnologías Digitales
  // ====================================================================
  generateInstrumentoHTML(rapKey, centro, instructor) {
    const rap = RAPS_TECNICOS[rapKey] || RAPS_TECNICOS['RAP-07'] || RAPS_TECNICOS['RAP-01'];
    let curriculo = CURRICULO_TECNOLOGO;
    if (this.currentProgram === 'modelado') curriculo = CURRICULO_MODELADO;
    if (this.currentProgram === 'animacion') curriculo = CURRICULO_ANIMACION;

    const activeTransversales = this.getActiveTransversales(rapKey);

    const activeAprendiz = this.getActiveAprendiz();
    const instrumento = getInstrumentoForRap(rapKey);
    const evalData = getEvaluacion(rapKey, activeAprendiz.documento) || { checks: {}, observaciones: '' };
    const checks = evalData.checks || {};

    // Conteo y cálculo dinámico de cumplimiento
    let totalIndicadores = 0;
    let cumplidosCount = 0;
    let noCumplidosCount = 0;
    let totalTecnicosRows = 0;

    instrumento.criterios.forEach(crit => {
      totalTecnicosRows += crit.indicadores.length;
    });

    instrumento.criterios.forEach((crit, cIdx) => {
      crit.indicadores.forEach((ind, iIdx) => {
        totalIndicadores++;
        const key = `c${cIdx}_i${iIdx}`;
        if (checks[key] === true) cumplidosCount++;
        else if (checks[key] === false) noCumplidosCount++;
      });
    });

    activeTransversales.forEach((t, tIdx) => {
      totalIndicadores++;
      const tKey = `transversal_${tIdx}`;
      if (checks[tKey] === true) cumplidosCount++;
      else if (checks[tKey] === false) noCumplidosCount++;
    });

    const porcentaje = totalIndicadores > 0 ? Math.round((cumplidosCount / totalIndicadores) * 100) : 0;
    const esAprobado = totalIndicadores > 0 && cumplidosCount === totalIndicadores;
    const fechaActual = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

    return `
      <div class="sena-document" id="instrumentoDocContent">
        <!-- Encabezado Institucional SENA -->
        <table class="sena-header-table">
          <tr>
            <td rowspan="2" class="sena-logo-box">
              <div style="font-size: 20pt; font-weight: 900; color: #39A900; letter-spacing: -1px; line-height: 1;">SENA</div>
              <div style="font-size: 6.5pt; color: #00324D; font-weight: bold; margin-top: 4px;">SISTEMA INTEGRADO DE GESTIÓN</div>
            </td>
            <td class="sena-doc-title">
              RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES<br>
              <strong style="font-size: 13pt; color: #00324D;">LISTA DE CHEQUEO DE EVIDENCIA</strong><br>
              <span style="font-size: 9.5pt; font-weight: 600; color: #475569;">INSTRUMENTO DE EVALUACIÓN — FORMACIÓN PROFESIONAL INTEGRAL</span>
            </td>
            <td class="sena-version-box">
              <strong>Código:</strong> GFPI-F-023<br>
              <strong>Versión:</strong> 02<br>
              <strong>Estado:</strong> Aprobado
            </td>
          </tr>
          <tr>
            <td colspan="2" style="font-size: 8.5pt; background: #f8fafc;">
              <strong>Centro:</strong> ${centro} | <strong>Regional:</strong> ANTIOQUIA - ITAGÜÍ
            </td>
          </tr>
        </table>

        <!-- 1. IDENTIFICACIÓN DEL INSTRUMENTO -->
        <div class="sena-section-title">1. IDENTIFICACIÓN DEL INSTRUMENTO</div>
        <table class="sena-table">
          <tr>
            <td style="width: 28%; font-weight: bold;">Denominación del Programa:</td>
            <td>${curriculo.info.denominacion}</td>
            <td style="width: 15%; font-weight: bold;">Código Programa:</td>
            <td style="width: 15%;"><strong>${curriculo.info.codigo}</strong></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Competencia Laboral:</td>
            <td colspan="3"><strong>${rap.norma_codigo}</strong> — ${rap.norma_nombre}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Resultado de Aprendizaje (RAP Específico):</td>
            <td colspan="3">
              <span class="sena-badge" style="background: #e0f2fe; color: #0284c7; font-weight: 700;">${rap.id}</span>
              <strong>${rap.resultado_aprendizaje}</strong> (${rap.horas} Horas)
            </td>
          </tr>
          ${activeTransversales.length > 0 ? `
          <tr>
            <td style="font-weight: bold; background: #faf5ff; color: #7e22ce; vertical-align: top;">RAPs Transversales Articulados:</td>
            <td colspan="3" style="background: #faf5ff;">
              <ul style="margin: 0; padding-left: 1.15rem; line-height: 1.4;">
                ${activeTransversales.map(t => `
                  <li style="margin-bottom: 0.3rem;">
                    <span class="sena-badge" style="background: #f3e8ff; color: #7e22ce; font-weight: 700; margin-right: 4px;">${t.rap_id.replace('-', ' ')}</span>
                    <strong>${t.nombre_rap}</strong> (${t.horas} Horas)
                  </li>
                `).join('')}
              </ul>
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="font-weight: bold;">Nombre/s del Instructor/es:</td>
            <td>${instructor}</td>
            <td style="font-weight: bold;">Ficha:</td>
            <td><strong>${activeAprendiz.ficha}</strong></td>
          </tr>
          <tr style="background: #f0fdf4;">
            <td style="font-weight: bold; color: #166534;">Aprendiz Evaluado (Seleccionar):</td>
            <td>
              <select onchange="window.app.changeSelectedAprendiz(this.value)" style="font-weight: 700; color: #166534; font-size: 9pt; padding: 4px 8px; border: 1.5px solid #16a34a; border-radius: 4px; background: #ffffff; width: 100%; cursor: pointer;">
                ${this.renderAprendizOptions(activeAprendiz.documento)}
              </select>
            </td>
            <td style="font-weight: bold; color: #166534;">Documento:</td>
            <td style="font-weight: bold; color: #166534;">${activeAprendiz.tipo_doc} ${activeAprendiz.documento}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Lugar y Fecha de Aplicación:</td>
            <td colspan="3">Itagüí, Antioquia — ${fechaActual}</td>
          </tr>
        </table>

        <!-- 2. VALORACIÓN DE EVIDENCIAS E INDICADORES -->
        <div class="sena-section-title">2. VALORACIÓN DE EVIDENCIAS E INDICADORES DE CUMPLIMIENTO</div>
        <p style="font-size: 8.5pt; color: #4b5563; margin-bottom: 0.65rem;">
          Instrucciones: Marque con <strong>[✔️ Cumple]</strong> si el aprendiz evidencia el indicador en el nivel requerido de calidad y técnica; marque <strong>[❌ No Cumple]</strong> si presenta inconsistencias o requiere mejoramiento.
        </p>

        <table class="sena-table" style="font-size: 8.5pt;">
          <thead>
            <tr>
              <th style="width: 22%;">EVIDENCIAS DE APRENDIZAJE</th>
              <th style="width: 24%;">CRITERIOS DE EVALUACIÓN</th>
              <th style="width: 38%;">INDICADORES DE LOGRO / VERIFICACIÓN</th>
              <th style="width: 8%; text-align: center;">CUMPLE</th>
              <th style="width: 8%; text-align: center;">NO CUMPLE</th>
            </tr>
          </thead>
          <tbody>
            ${instrumento.criterios.map((crit, cIdx) => {
              return crit.indicadores.map((ind, iIdx) => {
                const key = `c${cIdx}_i${iIdx}`;
                const isChecked = checks[key];
                return `
                  <tr>
                    ${(cIdx === 0 && iIdx === 0) ? `
                      <td rowspan="${totalTecnicosRows}" style="vertical-align: top; font-size: 8pt; background: #fafafa; font-weight: 500;">
                        <div style="font-weight: 700; color: #00324D; margin-bottom: 0.35rem; text-transform: uppercase;">Evidencias Técnicas 3D:</div>
                        <ul style="margin: 0; padding-left: 1.15rem; line-height: 1.45;">
                          ${instrumento.evidencias.map(e => `<li style="margin-bottom: 0.35rem;">${e}</li>`).join('')}
                        </ul>
                      </td>
                    ` : ''}
                    ${iIdx === 0 ? `
                      <td rowspan="${crit.indicadores.length}" style="vertical-align: top; font-size: 8pt; font-weight: 600; color: #00324D;">
                        ${crit.criterio}
                      </td>
                    ` : ''}
                    <td style="vertical-align: top; font-size: 8.2pt; line-height: 1.35;">
                      <span style="color: #64748b; font-weight: 700;">${cIdx+1}.${iIdx+1}</span> ${ind}
                    </td>
                    <td style="text-align: center; vertical-align: middle;">
                      <button type="button" onclick="window.app.toggleIndicadorCheck('${rapKey}', '${activeAprendiz.documento}', '${key}', true)"
                        style="cursor: pointer; border-radius: 4px; padding: 4px 7px; font-size: 8pt; font-weight: bold; border: 1px solid ${isChecked === true ? '#15803d' : '#cbd5e1'}; background: ${isChecked === true ? '#dcfce7' : '#ffffff'}; color: ${isChecked === true ? '#15803d' : '#64748b'}; width: 100%;">
                        ✔️ SÍ
                      </button>
                    </td>
                    <td style="text-align: center; vertical-align: middle;">
                      <button type="button" onclick="window.app.toggleIndicadorCheck('${rapKey}', '${activeAprendiz.documento}', '${key}', false)"
                        style="cursor: pointer; border-radius: 4px; padding: 4px 7px; font-size: 8pt; font-weight: bold; border: 1px solid ${isChecked === false ? '#b91c1c' : '#cbd5e1'}; background: ${isChecked === false ? '#fee2e2' : '#ffffff'}; color: ${isChecked === false ? '#b91c1c' : '#64748b'}; width: 100%;">
                        ❌ NO
                      </button>
                    </td>
                  </tr>
                `;
              }).join('');
            }).join('')}

            ${activeTransversales.map((t, tIdx) => {
              const tKey = `transversal_${tIdx}`;
              const isChecked = checks[tKey];
              return `
                <tr style="background: #faf5ff;">
                  <td style="vertical-align: top; font-size: 8pt; font-weight: 600; color: #7e22ce;">
                    🌐 EVIDENCIA TRANSVERSAL (${t.rap_id.replace('-', ' ')}):<br>
                    <span style="font-weight: normal; color: #3b0764;">${t.evidencia}</span>
                  </td>
                  <td style="vertical-align: top; font-size: 8pt; font-weight: 600; color: #7e22ce;">
                    ${t.competencia}
                  </td>
                  <td style="vertical-align: top; font-size: 8.2pt; line-height: 1.35; color: #3b0764;">
                    <strong style="color: #6b21a8;">T.${tIdx + 1}</strong> <strong>${t.titulo_actividad}:</strong> ${t.descripcion_actividad.substring(0, 160)}...
                  </td>
                  <td style="text-align: center; vertical-align: middle;">
                    <button type="button" onclick="window.app.toggleIndicadorCheck('${rapKey}', '${activeAprendiz.documento}', '${tKey}', true)"
                      style="cursor: pointer; border-radius: 4px; padding: 4px 7px; font-size: 8pt; font-weight: bold; border: 1px solid ${isChecked === true ? '#15803d' : '#cbd5e1'}; background: ${isChecked === true ? '#dcfce7' : '#ffffff'}; color: ${isChecked === true ? '#15803d' : '#64748b'}; width: 100%;">
                      ✔️ SÍ
                    </button>
                  </td>
                  <td style="text-align: center; vertical-align: middle;">
                    <button type="button" onclick="window.app.toggleIndicadorCheck('${rapKey}', '${activeAprendiz.documento}', '${tKey}', false)"
                      style="cursor: pointer; border-radius: 4px; padding: 4px 7px; font-size: 8pt; font-weight: bold; border: 1px solid ${isChecked === false ? '#b91c1c' : '#cbd5e1'}; background: ${isChecked === false ? '#fee2e2' : '#ffffff'}; color: ${isChecked === false ? '#b91c1c' : '#64748b'}; width: 100%;">
                      ❌ NO
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <!-- 3. RESULTADO FINAL DEL JUICIO EVALUATIVO -->
        <div class="sena-section-title">3. RESULTADO FINAL DEL JUICIO EVALUATIVO</div>
        
        <div style="display: flex; gap: 1.5rem; align-items: center; justify-content: space-between; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 12px 18px; margin-bottom: 1.25rem;">
          <div>
            <div style="font-size: 8pt; color: #64748b; font-weight: bold; text-transform: uppercase;">Desempeño de Indicadores</div>
            <div style="font-size: 11pt; font-weight: 800; color: #00324D; margin-top: 2px;">
              ${cumplidosCount} de ${totalIndicadores} Indicadores Cumplidos (${porcentaje}%)
            </div>
            <div style="width: 240px; height: 8px; background: #e2e8f0; border-radius: 4px; margin-top: 5px; overflow: hidden;">
              <div style="width: ${porcentaje}%; height: 100%; background: ${porcentaje === 100 ? '#16a34a' : (porcentaje >= 70 ? '#eab308' : '#dc2626')}; transition: width 0.3s ease;"></div>
            </div>
          </div>

          <div style="text-align: right;">
            <div style="font-size: 8pt; color: #64748b; font-weight: bold; text-transform: uppercase; margin-bottom: 3px;">Juicio Evaluativo SENA:</div>
            <div>
              ${esAprobado ? `
                <span class="sena-badge" style="background: #dcfce7; color: #15803d; font-size: 11pt; font-weight: 800; padding: 6px 14px; border: 1.5px solid #16a34a;">
                  ✅ APROBADO (A)
                </span>
              ` : `
                <span class="sena-badge" style="background: #fee2e2; color: #b91c1c; font-size: 10pt; font-weight: 800; padding: 6px 14px; border: 1.5px solid #dc2626;">
                  ⚠️ DEFICIENTE (D) — En Proceso
                </span>
              `}
            </div>
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; font-size: 9pt; font-weight: bold; color: #00324D; margin-bottom: 4px;">
            Observaciones del Evaluador y/o Plan de Mejoramiento:
          </label>
          <textarea onchange="window.app.saveEvaluacionObs('${rapKey}', '${activeAprendiz.documento}', this.value)"
            style="width: 100%; min-height: 65px; border: 1px solid #cbd5e1; border-radius: 4px; padding: 8px; font-size: 8.5pt; font-family: inherit; resize: vertical;"
            placeholder="Escriba aquí las recomendaciones técnicas o las acciones de mejora pedagógica acordadas con el aprendiz...">${evalData.observaciones || ''}</textarea>
        </div>

        <!-- Firmas Institucionales -->
        <table style="width: 100%; margin-top: 2rem; border-collapse: collapse;">
          <tr>
            <td style="width: 46%; border-top: 1.5px solid #00324D; text-align: center; padding-top: 6px; font-size: 8.5pt;">
              <strong>${instructor}</strong><br>
              <span style="color: #64748b;">Firma del Instructor Evaluador</span>
            </td>
            <td style="width: 8%;"></td>
            <td style="width: 46%; border-top: 1.5px solid #00324D; text-align: center; padding-top: 6px; font-size: 8.5pt;">
              <strong>${activeAprendiz.nombres} ${activeAprendiz.apellidos}</strong><br>
              <span style="color: #64748b;">Firma del Aprendiz (${activeAprendiz.tipo_doc} ${activeAprendiz.documento})</span>
            </td>
          </tr>
        </table>

        <!-- 4. CONTROL DEL DOCUMENTO -->
        <div class="sena-section-title" style="margin-top: 2.5rem;">4. CONTROL DEL DOCUMENTO</div>
        <table class="sena-table" style="font-size: 8.5pt;">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Dependencia</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${instructor}</td>
              <td>Instructor Experto Técnico</td>
              <td>${centro}</td>
              <td>Noviembre de 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // ====================================================================
  // 1C. GENERADOR DE ARCHIVO EXCEL MULTI-HOJA (.XLS SPREADSHEETML)
  // Hoja 1: DB_APRENDICES | Hoja 2: LISTA_CHEQUEO | Hoja 3: MATRIZ_GRUPO
  // ====================================================================
  generateMultiSheetExcelXML(rapKey, centro, instructor) {
    const rap = RAPS_TECNICOS[rapKey] || RAPS_TECNICOS['RAP-07'] || RAPS_TECNICOS['RAP-01'];
    let curriculo = CURRICULO_TECNOLOGO;
    if (this.currentProgram === 'modelado') curriculo = CURRICULO_MODELADO;
    if (this.currentProgram === 'animacion') curriculo = CURRICULO_ANIMACION;

    const listAprendices = getAprendices();
    const activeAprendiz = this.getActiveAprendiz();
    const instrumento = getInstrumentoForRap(rapKey);
    const evalData = getEvaluacion(rapKey, activeAprendiz.documento) || { checks: {}, observaciones: '' };
    const checks = evalData.checks || {};

    const activeTransversales = this.getActiveTransversales(rapKey);

    const escapeXml = (str) => {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
  <Styles>
    <Style ss:ID="Default" ss:Name="Normal">
      <Alignment ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="10" ss:Color="#000000"/>
    </Style>
    <Style ss:ID="MainTitle">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="14" ss:Bold="1" ss:Color="#00324D"/>
      <Interior ss:Color="#E2E8F0" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="HeaderCol">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
      <Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#00324D" ss:Pattern="Solid"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
      </Borders>
    </Style>
    <Style ss:ID="HeaderColGreen">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
      <Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#166534" ss:Pattern="Solid"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
      </Borders>
    </Style>
    <Style ss:ID="MetaLabel">
      <Alignment ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#00324D"/>
      <Interior ss:Color="#F8FAFC" ss:Pattern="Solid"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
      </Borders>
    </Style>
    <Style ss:ID="MetaVal">
      <Alignment ss:Vertical="Center" ss:WrapText="1"/>
      <Font ss:FontName="Calibri" ss:Size="10"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
      </Borders>
    </Style>
    <Style ss:ID="CellData">
      <Alignment ss:Vertical="Center" ss:WrapText="1"/>
      <Font ss:FontName="Calibri" ss:Size="9.5"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
      </Borders>
    </Style>
    <Style ss:ID="CellDataCenter">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="9.5"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
      </Borders>
    </Style>
    <Style ss:ID="CellCumple">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#15803D"/>
      <Interior ss:Color="#DCFCE7" ss:Pattern="Solid"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
      </Borders>
    </Style>
    <Style ss:ID="CellNoCumple">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#B91C1C"/>
      <Interior ss:Color="#FEE2E2" ss:Pattern="Solid"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
      </Borders>
    </Style>
  </Styles>

  <!-- ========================================== -->
  <!-- HOJA 1: BASE DE DATOS DE APRENDICES -->
  <!-- ========================================== -->
  <Worksheet ss:Name="DB_APRENDICES">
    <Table ss:DefaultColumnWidth="120" ss:DefaultRowHeight="20">
      <Column ss:Width="40"/>
      <Column ss:Width="80"/>
      <Column ss:Width="60"/>
      <Column ss:Width="100"/>
      <Column ss:Width="140"/>
      <Column ss:Width="140"/>
      <Column ss:Width="200"/>
      <Column ss:Width="100"/>
      
      <Row ss:Height="30">
        <Cell ss:MergeAcross="7" ss:StyleID="MainTitle">
          <Data ss:Type="String">SERVICIO NACIONAL DE APRENDIZAJE SENA — BASE DE DATOS DE APRENDICES (FICHA 2824560)</Data>
        </Cell>
      </Row>
      <Row ss:Height="25">
        <Cell ss:StyleID="HeaderColGreen"><Data ss:Type="String">N°</Data></Cell>
        <Cell ss:StyleID="HeaderColGreen"><Data ss:Type="String">FICHA</Data></Cell>
        <Cell ss:StyleID="HeaderColGreen"><Data ss:Type="String">TIPO DOC</Data></Cell>
        <Cell ss:StyleID="HeaderColGreen"><Data ss:Type="String">DOCUMENTO</Data></Cell>
        <Cell ss:StyleID="HeaderColGreen"><Data ss:Type="String">NOMBRES</Data></Cell>
        <Cell ss:StyleID="HeaderColGreen"><Data ss:Type="String">APELLIDOS</Data></Cell>
        <Cell ss:StyleID="HeaderColGreen"><Data ss:Type="String">CORREO INSTITUCIONAL</Data></Cell>
        <Cell ss:StyleID="HeaderColGreen"><Data ss:Type="String">ESTADO</Data></Cell>
      </Row>
      ${listAprendices.map((a, idx) => `
        <Row ss:Height="22">
          <Cell ss:StyleID="CellDataCenter"><Data ss:Type="Number">${idx + 1}</Data></Cell>
          <Cell ss:StyleID="CellDataCenter"><Data ss:Type="String">${escapeXml(a.ficha)}</Data></Cell>
          <Cell ss:StyleID="CellDataCenter"><Data ss:Type="String">${escapeXml(a.tipo_doc)}</Data></Cell>
          <Cell ss:StyleID="CellDataCenter"><Data ss:Type="String">${escapeXml(a.documento)}</Data></Cell>
          <Cell ss:StyleID="CellData"><Data ss:Type="String">${escapeXml(a.nombres)}</Data></Cell>
          <Cell ss:StyleID="CellData"><Data ss:Type="String">${escapeXml(a.apellidos)}</Data></Cell>
          <Cell ss:StyleID="CellData"><Data ss:Type="String">${escapeXml(a.correo)}</Data></Cell>
          <Cell ss:StyleID="CellDataCenter"><Data ss:Type="String">${escapeXml(a.estado)}</Data></Cell>
        </Row>
      `).join('')}
    </Table>
  </Worksheet>

  <!-- ========================================== -->
  <!-- HOJA 2: LISTA DE CHEQUEO DE EVIDENCIAS -->
  <!-- ========================================== -->
  <Worksheet ss:Name="LISTA_CHEQUEO">
    <Table ss:DefaultColumnWidth="140" ss:DefaultRowHeight="20">
      <Column ss:Width="170"/>
      <Column ss:Width="190"/>
      <Column ss:Width="280"/>
      <Column ss:Width="70"/>
      <Column ss:Width="70"/>
      <Column ss:Width="160"/>

      <Row ss:Height="28">
        <Cell ss:MergeAcross="5" ss:StyleID="MainTitle">
          <Data ss:Type="String">RED DE ARTES GRÁFICAS — LISTA DE CHEQUEO DE EVIDENCIA (GFPI-F-023)</Data>
        </Cell>
      </Row>
      <Row ss:Height="20">
        <Cell ss:StyleID="MetaLabel"><Data ss:Type="String">Programa de Formación:</Data></Cell>
        <Cell ss:MergeAcross="2" ss:StyleID="MetaVal"><Data ss:Type="String">${escapeXml(curriculo.info.denominacion)}</Data></Cell>
        <Cell ss:StyleID="MetaLabel"><Data ss:Type="String">Código:</Data></Cell>
        <Cell ss:StyleID="MetaVal"><Data ss:Type="String">${escapeXml(curriculo.info.codigo)}</Data></Cell>
      </Row>
      <Row ss:Height="20">
        <Cell ss:StyleID="MetaLabel"><Data ss:Type="String">Competencia:</Data></Cell>
        <Cell ss:MergeAcross="4" ss:StyleID="MetaVal"><Data ss:Type="String">${escapeXml(rap.norma_codigo)} — ${escapeXml(rap.norma_nombre)}</Data></Cell>
      </Row>
      <Row ss:Height="20">
        <Cell ss:StyleID="MetaLabel"><Data ss:Type="String">Resultado de Aprendizaje:</Data></Cell>
        <Cell ss:MergeAcross="4" ss:StyleID="MetaVal"><Data ss:Type="String">${escapeXml(rap.id)}: ${escapeXml(rap.resultado_aprendizaje)}</Data></Cell>
      </Row>
      <Row ss:Height="20">
        <Cell ss:StyleID="MetaLabel"><Data ss:Type="String">Centro / Regional:</Data></Cell>
        <Cell ss:MergeAcross="2" ss:StyleID="MetaVal"><Data ss:Type="String">${escapeXml(centro)} — ANTIOQUIA</Data></Cell>
        <Cell ss:StyleID="MetaLabel"><Data ss:Type="String">Instructor:</Data></Cell>
        <Cell ss:StyleID="MetaVal"><Data ss:Type="String">${escapeXml(instructor)}</Data></Cell>
      </Row>
      <Row ss:Height="24">
        <Cell ss:StyleID="MetaLabel"><Data ss:Type="String">Aprendiz Evaluado:</Data></Cell>
        <Cell ss:MergeAcross="2" ss:StyleID="MetaVal"><Data ss:Type="String">${escapeXml(activeAprendiz.nombres)} ${escapeXml(activeAprendiz.apellidos)}</Data></Cell>
        <Cell ss:StyleID="MetaLabel"><Data ss:Type="String">Documento / Ficha:</Data></Cell>
        <Cell ss:StyleID="MetaVal"><Data ss:Type="String">${escapeXml(activeAprendiz.documento)} (Ficha ${escapeXml(activeAprendiz.ficha)})</Data></Cell>
      </Row>

      <Row ss:Height="10"></Row>

      <!-- Encabezados de Tabla -->
      <Row ss:Height="26">
        <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">EVIDENCIAS DE APRENDIZAJE</Data></Cell>
        <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">CRITERIOS DE EVALUACIÓN</Data></Cell>
        <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">INDICADORES DE LOGRO / VERIFICACIÓN</Data></Cell>
        <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">CUMPLE (SÍ)</Data></Cell>
        <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">NO CUMPLE</Data></Cell>
        <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">OBSERVACIONES</Data></Cell>
      </Row>

      ${instrumento.criterios.map((crit, cIdx) => {
        return crit.indicadores.map((ind, iIdx) => {
          const key = `c${cIdx}_i${iIdx}`;
          const isCheck = checks[key];
          const cumpleVal = isCheck === true ? 'X' : '';
          const noCumpleVal = isCheck === false ? 'X' : '';
          const evText = iIdx === 0 && cIdx === 0 ? instrumento.evidencias.join(' | ') : '';
          const critText = iIdx === 0 ? crit.criterio : '';

          return `
            <Row ss:Height="26">
              <Cell ss:StyleID="CellData"><Data ss:Type="String">${escapeXml(evText)}</Data></Cell>
              <Cell ss:StyleID="CellData"><Data ss:Type="String">${escapeXml(critText)}</Data></Cell>
              <Cell ss:StyleID="CellData"><Data ss:Type="String">${cIdx+1}.${iIdx+1} ${escapeXml(ind)}</Data></Cell>
              <Cell ss:StyleID="${cumpleVal ? 'CellCumple' : 'CellDataCenter'}"><Data ss:Type="String">${cumpleVal}</Data></Cell>
              <Cell ss:StyleID="${noCumpleVal ? 'CellNoCumple' : 'CellDataCenter'}"><Data ss:Type="String">${noCumpleVal}</Data></Cell>
              <Cell ss:StyleID="CellData"><Data ss:Type="String"></Data></Cell>
            </Row>
          `;
        }).join('');
      }).join('')}

      <Row ss:Height="24">
        <Cell ss:MergeAcross="2" ss:StyleID="MetaLabel"><Data ss:Type="String">RESULTADO FINAL: A: Aprobado (100% de cumplimiento); D: Deficiente</Data></Cell>
        <Cell ss:MergeAcross="2" ss:StyleID="MainTitle"><Data ss:Type="String">ESTADO: ${evalData.observaciones || 'Evaluado'}</Data></Cell>
      </Row>
    </Table>
  </Worksheet>

  <!-- ========================================== -->
  <!-- HOJA 3: MATRIZ CONSOLIDADA DE CALIFICACIONES -->
  <!-- ========================================== -->
  <Worksheet ss:Name="MATRIZ_CONSOLIDADA">
    <Table ss:DefaultColumnWidth="120" ss:DefaultRowHeight="20">
      <Column ss:Width="40"/>
      <Column ss:Width="100"/>
      <Column ss:Width="200"/>
      <Column ss:Width="100"/>
      <Column ss:Width="120"/>
      <Column ss:Width="140"/>

      <Row ss:Height="30">
        <Cell ss:MergeAcross="5" ss:StyleID="MainTitle">
          <Data ss:Type="String">CONSOLIDADO GRUPAL — ${escapeXml(rap.id)} (${escapeXml(rap.actividad_clave)})</Data>
        </Cell>
      </Row>
      <Row ss:Height="25">
        <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">N°</Data></Cell>
        <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">DOCUMENTO</Data></Cell>
        <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">APRENDIZ</Data></Cell>
        <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">FICHA</Data></Cell>
        <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">JUICIO EVALUATIVO</Data></Cell>
        <Cell ss:StyleID="HeaderCol"><Data ss:Type="String">FECHA</Data></Cell>
      </Row>
      ${listAprendices.map((a, idx) => {
        const aEval = getEvaluacion(rapKey, a.documento);
        const aChecks = (aEval && aEval.checks) ? aEval.checks : {};
        let aCumplidos = 0;
        instrumento.criterios.forEach((crit, cIdx) => {
          crit.indicadores.forEach((_, iIdx) => {
            if (aChecks[`c${cIdx}_i${iIdx}`] === true) aCumplidos++;
          });
        });
        const totalInd = instrumento.criterios.reduce((acc, c) => acc + c.indicadores.length, 0);
        const aAprobado = totalInd > 0 && aCumplidos === totalInd;
        const estadoStr = (Object.keys(aChecks).length === 0) ? 'Pendiente' : (aAprobado ? 'APROBADO' : 'DEFICIENTE');

        return `
          <Row ss:Height="22">
            <Cell ss:StyleID="CellDataCenter"><Data ss:Type="Number">${idx + 1}</Data></Cell>
            <Cell ss:StyleID="CellDataCenter"><Data ss:Type="String">${escapeXml(a.documento)}</Data></Cell>
            <Cell ss:StyleID="CellData"><Data ss:Type="String">${escapeXml(a.nombres)} ${escapeXml(a.apellidos)}</Data></Cell>
            <Cell ss:StyleID="CellDataCenter"><Data ss:Type="String">${escapeXml(a.ficha)}</Data></Cell>
            <Cell ss:StyleID="${estadoStr === 'APROBADO' ? 'CellCumple' : (estadoStr === 'DEFICIENTE' ? 'CellNoCumple' : 'CellDataCenter')}">
              <Data ss:Type="String">${estadoStr}</Data>
            </Cell>
            <Cell ss:StyleID="CellDataCenter"><Data ss:Type="String">${new Date().toISOString().split('T')[0]}</Data></Cell>
          </Row>
        `;
      }).join('')}
    </Table>
  </Worksheet>
</Workbook>`;
  }


  // 2. GENERADOR DE PLANEACIÓN PEDAGÓGICA MATRIZ TABULAR SENA
  generatePlaneacionHTML(centro, instructor) {
    let curriculo = CURRICULO_TECNOLOGO;
    if (this.currentProgram === 'modelado') curriculo = CURRICULO_MODELADO;
    if (this.currentProgram === 'animacion') curriculo = CURRICULO_ANIMACION;

    return `
      <div class="sena-document">
        <table class="sena-header-table">
          <tr>
            <td rowspan="2" class="sena-logo-box">
              <div style="font-size: 20pt; font-weight: 900; color: #39A900; letter-spacing: -1px;">SENA</div>
              <div style="font-size: 7pt; color: #00324D; font-weight: bold;">SERVICIO NACIONAL DE APRENDIZAJE</div>
            </td>
            <td class="sena-doc-title">
              PLANEACIÓN PEDAGÓGICA DEL PROYECTO FORMATIVO<br>
              <span style="font-size: 9.5pt; font-weight: normal; color: #374151;">FORMATO OFICIAL GFPI-F-134</span>
            </td>
            <td class="sena-version-box">
              <strong>Código:</strong> GFPI-F-134<br>
              <strong>Versión:</strong> 03<br>
              <strong>Horas Totales:</strong> ${curriculo.info.total_horas} h
            </td>
          </tr>
          <tr>
            <td colspan="2" style="font-size: 8.5pt; background: #f8fafc;">
              <strong>Programa:</strong> ${curriculo.info.denominacion} | <strong>Centro:</strong> ${centro}
            </td>
          </tr>
        </table>

        <div style="margin-bottom: 1.5rem;">
          <h3 style="color: #00324D; font-size: 11pt; font-weight: bold; margin-bottom: 0.35rem;">MATRIZ DE PLANEACIÓN PEDAGÓGICA INTEGRAL</h3>
          <p style="font-size: 9pt; color: #4b5563;">Articulación de Fases del Proyecto, Competencias, Resultados de Aprendizaje, Actividades Didácticas, Ambientes y Horas.</p>
        </div>

        <table class="sena-table" style="font-size: 8pt;">
          <thead>
            <tr>
              <th style="width: 12%;">Fase / Trimestre</th>
              <th style="width: 18%;">Competencia / RAP</th>
              <th style="width: 28%;">Actividad de Aprendizaje a Desarrollar</th>
              <th style="width: 8%; text-align: center;">Horas Dir.</th>
              <th style="width: 8%; text-align: center;">Horas Ind.</th>
              <th style="width: 14%;">Ambiente y Recursos</th>
              <th style="width: 12%;">Evidencia Evaluativa</th>
            </tr>
          </thead>
          <tbody>
            ${curriculo.trimestres.map(trim => {
              return trim.raps.map((r, rIdx) => {
                const isTecnico = r.tipo === 'tecnico';
                const data = isTecnico ? RAPS_TECNICOS[r.rap_id] : RAPS_TRANSVERSALES[r.rap_id];
                if (!data) return '';

                const labelId = r.alias || (data.id || r.rap_id);
                const nombre = isTecnico ? data.resultado_aprendizaje : data.nombre;
                const horasDir = Math.round(r.horas * 0.75);
                const horasInd = Math.round(r.horas * 0.25);
                const software = isTecnico ? data.herramientas_recomendadas.join(', ') : 'Plataforma LMS, Ofimática';

                return `
                  <tr>
                    ${rIdx === 0 ? `<td rowspan="${trim.raps.length}" style="background: #f8fafc; font-weight: bold; border-right: 2px solid #00324D;">
                      TRIMESTRE ${trim.numero}<br>
                      <span style="display: inline-block; font-weight: 800; color: #0369a1; background: #e0f2fe; padding: 2px 6px; border-radius: 4px; font-size: 7.5pt; margin: 3px 0;">
                        ${trim.fase_proyecto || `FASE ${trim.numero}`}
                      </span><br>
                      <span style="font-weight: normal; color: #64748b; font-size: 7.5pt;">${trim.fase}</span><br><br>
                      <span class="sena-badge">${trim.horas_totales} Horas</span>
                    </td>` : ''}
                    <td>
                      <strong style="color: #00324D;">${labelId}:</strong> ${nombre.substring(0, 110)}...
                    </td>
                    <td>
                      Desarrollar talleres de aplicación técnica mediante la estrategia de Aprendizaje Basado en Proyectos (ABP): ${isTecnico ? data.actividad_clave : 'Actividades formativas institucionales transversales'}.
                    </td>
                    <td style="text-align: center; font-weight: bold;">${horasDir} h</td>
                    <td style="text-align: center; color: #64748b;">${horasInd} h</td>
                    <td>
                      <strong>Ambiente:</strong> Laboratorio 3D & Nuevas Tecnologías.<br>
                      <strong>Software:</strong> ${software}.
                    </td>
                    <td>
                      ${data.evidencia.substring(0, 90)}...
                    </td>
                  </tr>
                `;
              }).join('');
            }).join('')}
          </tbody>
        </table>

        <!-- CONTROL DEL DOCUMENTO -->
        <div class="sena-section-title" style="margin-top: 2rem;">CONTROL DEL DOCUMENTO</div>
        <table class="sena-table" style="font-size: 8.5pt;">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Dependencia</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${instructor}</td>
              <td>Instructor Experto Técnico</td>
              <td>${centro}</td>
              <td>Noviembre de 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }


  // 3. GENERADOR DE PROYECTO FORMATIVO OFICIAL SENA (GFPI-F-016)
  generateProyectoHTML(centro, instructor) {
    let curriculo = CURRICULO_TECNOLOGO;
    if (this.currentProgram === 'modelado') curriculo = CURRICULO_MODELADO;
    if (this.currentProgram === 'animacion') curriculo = CURRICULO_ANIMACION;

    return `
      <div class="sena-document" id="senaDocumentContent">
        <!-- Encabezado Institucional SENA -->
        <table class="sena-header-table">
          <tr>
            <td rowspan="2" class="sena-logo-box">
              <div style="font-size: 20pt; font-weight: 900; color: #39A900; letter-spacing: -1px; line-height: 1;">SENA</div>
              <div style="font-size: 6.5pt; color: #00324D; font-weight: bold; margin-top: 4px;">SISTEMA INTEGRADO DE GESTIÓN</div>
            </td>
            <td class="sena-doc-title">
              SERVICIO NACIONAL DE APRENDIZAJE SENA<br>
              <span style="font-size: 9.5pt; font-weight: 600; color: #00324D;">SISTEMA INTEGRADO DE GESTIÓN</span><br>
              <span style="font-size: 8.5pt; font-weight: normal; color: #475569;">Procedimiento Ejecución de la Formación Profesional Integral</span><br>
              <strong style="font-size: 12pt; color: #00324D;">PROYECTO FORMATIVO</strong>
            </td>
            <td class="sena-version-box">
              <strong>Código:</strong> GFPI-F-016<br>
              <strong>Versión:</strong> 02<br>
              <strong>Estado:</strong> Aprobado
            </td>
          </tr>
          <tr>
            <td colspan="2" style="font-size: 8.5pt; background: #f8fafc;">
              <strong>Centro:</strong> ${centro} | <strong>Regional:</strong> ANTIOQUIA - ITAGÜÍ
            </td>
          </tr>
        </table>

        <!-- 1. INFORMACIÓN BÁSICA DEL PROYECTO -->
        <div class="sena-section-title">1. INFORMACIÓN BÁSICA DEL PROYECTO</div>
        <table class="sena-table">
          <tr>
            <td style="width: 25%; font-weight: bold;">1.1 Centro de Formación:</td>
            <td style="width: 45%;">${centro}</td>
            <td style="width: 15%; font-weight: bold;">1.2 Regional:</td>
            <td style="width: 15%;">ANTIOQUIA - ITAGÜÍ</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">1.3 Nombre del Proyecto:</td>
            <td colspan="3"><strong>Creación de un portafolio de contenidos 3d audiovisuales e interactivos para la visualización de productos y servicios del sector productivo.</strong></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">1.4 Programa de Formación:</td>
            <td><strong>TECNÓLOGO EN PRODUCCIÓN DE CONTENIDOS 3D</strong></td>
            <td style="font-weight: bold;">1.5 Tiempo Estimado:</td>
            <td><strong>3.120 Horas</strong> (65 Créditos)</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">1.6 Empresas o Instituciones:</td>
            <td colspan="3">Todas las entidades que participan directa e indirectamente en la elaboración y futura ejecución del proyecto.</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">1.7 Palabras Claves:</td>
            <td colspan="3" style="font-size: 8.5pt;">Animación 3D, Portafolio 3D, Contenido 3D, Visualización de productos, Reel de animación, Activos digitales, VFX (Efectos Visuales), Industria 4.0, Sector productivo, Visualización técnica, Marketing 3D, Simulación 3D, Realidad Aumentada (RA), Realidad Virtual (RV), Diseño industrial, Proyecto formativo, Microproyectos, Formación profesional, SENA, Tecnólogo en Animación 3D, Portafolio profesional, Demo reel, Contenido interactivo, Producción audiovisual, Narrativa 3D, Actuación de personaje, Iluminación 3D, Texturizado 3D.</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">1.8 Total RAPs del Programa:</td>
            <td><strong>55 Resultados de Aprendizaje</strong></td>
            <td style="font-weight: bold;">1.9 RAPs por Tipo:</td>
            <td>• Específicos: <strong>25</strong><br>• Transversales: <strong>26</strong><br>• Claves: <strong>4</strong></td>
          </tr>
        </table>

        <!-- 2. ESTRUCTURA DEL PROYECTO -->
        <div class="sena-section-title">2. ESTRUCTURA DEL PROYECTO</div>

        <div class="sena-sub-title">2.1 Planteamiento del problema o necesidad que se pretende solucionar</div>
        <p style="text-align: justify; margin-bottom: 0.75rem; font-size: 9pt;">
          El sector productivo moderno exige la transformación digital de sus procesos, especialmente en la comunicación y promoción de productos y servicios. Las empresas, desde las pequeñas y medianas hasta las grandes corporaciones, están migrando de métodos tradicionales a soluciones audiovisuales e interactivas. Esto genera una creciente demanda de profesionales capaces de crear contenido 3D de alta calidad para la visualización de productos, la animación de servicios y la producción de activos digitales para entornos interactivos (como la web, aplicaciones móviles y experiencias de realidad virtual y aumentada).
        </p>
        <p style="text-align: justify; margin-bottom: 0.75rem; font-size: 9pt;">
          <strong>Problema:</strong> Existe un desajuste significativo entre la demanda de la industria y la oferta de profesionales calificados en animación 3D con un enfoque específico en la visualización de productos y servicios. Muchos tecnólogos en animación se forman principalmente para la industria del entretenimiento (cine, series de animación), lo que limita su capacidad para adaptarse a las necesidades técnicas y comerciales del sector productivo. Esta brecha impide que las empresas aprovechen plenamente el potencial de la visualización 3D para optimizar sus procesos de marketing, diseño, capacitación y ventas.
        </p>
        <p style="text-align: justify; margin-bottom: 0.35rem; font-size: 9pt;"><strong>Causas:</strong></p>
        <ul style="margin-left: 1.5rem; margin-bottom: 0.75rem; font-size: 8.5pt;">
          <li><strong>Formación desactualizada o genérica:</strong> Los programas de formación en animación 3D a menudo se centran en un enfoque narrativo y cinematográfico, sin abordar las especificidades de la producción de contenidos para empresas.</li>
          <li><strong>Falta de experiencia práctica:</strong> Los egresados carecen de experiencia real en proyectos con clientes, lo que les impide desarrollar un portafolio profesional que demuestre habilidades en áreas como la simulación de fluidos, el product shot o la creación de activos optimizados para aplicaciones interactivas.</li>
          <li><strong>Desconocimiento de las necesidades del mercado:</strong> La mayoría de los estudiantes no están al tanto de la alta demanda de habilidades en áreas como la visualización arquitectónica, la simulación de prototipos o la creación de contenido para e-commerce.</li>
        </ul>
        <p style="text-align: justify; margin-bottom: 0.35rem; font-size: 9pt;"><strong>Consecuencias:</strong></p>
        <ul style="margin-left: 1.5rem; margin-bottom: 0.75rem; font-size: 8.5pt;">
          <li><strong>Pérdida de competitividad:</strong> Las empresas colombianas que no pueden acceder a talento calificado en 3D pierden competitividad frente a mercados que sí utilizan estas tecnologías para sus productos y servicios.</li>
          <li><strong>Talento subutilizado:</strong> Los profesionales de la animación 3D terminan trabajando en áreas que no corresponden a sus habilidades, o deben reajustar su perfil profesional por su cuenta, perdiendo tiempo valioso.</li>
          <li><strong>Costos elevados:</strong> La falta de profesionales locales obliga a las empresas a contratar servicios de visualización 3D en el extranjero, lo que aumenta los costos y prolonga los plazos de entrega.</li>
        </ul>
        <p style="text-align: justify; margin-bottom: 1.25rem; font-size: 9pt; font-style: italic; background: #f8fafc; padding: 10px; border-left: 3px solid #00324D;">
          <strong>Pregunta Problémica:</strong> ¿Cómo la creación de un portafolio de contenidos 3D centrado en la visualización de productos y servicios, se convierte en una herramienta fundamental para que el aprendiz proyecte su perfil profesional y garantice su competitividad en el mercado?
        </p>

        <div class="sena-sub-title">2.2 Justificación del proyecto</div>
        <p style="text-align: justify; margin-bottom: 0.75rem; font-size: 9pt;">
          La transformación digital ha redefinido el panorama del sector productivo, obligando a las empresas a adoptar nuevas tecnologías para mantenerse competitivas. Hoy en día, la comunicación visual de productos y servicios ya no se limita a fotografías o videos tradicionales; la animación 3D ha emergido como una herramienta indispensable para la visualización, el marketing y la capacitación. Sin embargo, a pesar de la creciente demanda de estas habilidades en industrias como la manufactura, el diseño industrial, la arquitectura y el e-commerce, existe una brecha significativa en la formación de profesionales que puedan satisfacer estas necesidades.
        </p>
        <p style="text-align: justify; margin-bottom: 0.75rem; font-size: 9pt;">
          El proyecto formativo <em>"Creación de un portafolio de contenidos 3D audiovisuales e interactivos para la visualización de productos y servicios del sector productivo"</em> se justifica como una solución directa a este problema. A través de la realización de los macroproyectos formativos estructurados bajo flujos híbridos asistidos por IA, la propuesta busca dotar a los aprendices de las competencias técnicas y el conocimiento práctico para generar un portafolio profesional que demuestre su versatilidad.
        </p>
        <ul style="margin-left: 1.5rem; margin-bottom: 0.75rem; font-size: 8.5pt;">
          <li><strong>Aplicación práctica:</strong> Creación de productos tangibles como un prototipo CAD explosionado con guía de ensamble, manufactura aditiva y teaser cinemático.</li>
          <li><strong>Habilidades interactivas:</strong> Desarrollo de activos optimizados para entornos interactivos (Gemelos Digitales, simuladores PC y VR-Ready).</li>
          <li><strong>Dominio técnico:</strong> Integración de elementos 3D con difusión asistida y render multicanal para satisfacer los más altos estándares.</li>
          <li><strong>Versatilidad profesional:</strong> Acting de personaje antropomorfo y navegación en entornos cerrados para resolver necesidades cinematográficas e interactivas.</li>
        </ul>

        <div class="sena-sub-title">2.3 Objetivo General</div>
        <p style="font-size: 9pt; margin-bottom: 1rem; background: #f0fdf4; padding: 10px; border-left: 3px solid #16a34a;">
          Elaborar un portafolio de contenidos 3D que integre macroproyectos audiovisuales e interactivos para la visualización de productos y servicios, con el fin de proyectar el perfil profesional del aprendiz y satisfacer las necesidades del sector productivo.
        </p>

        <div class="sena-sub-title">2.4 Objetivos Específicos</div>
        <ul style="margin-left: 1.5rem; margin-bottom: 1rem; font-size: 8.5pt;">
          <li>Crear un product shot animado que demuestre el dominio de las técnicas de modelado, texturizado, iluminación y animación de cámara, con el fin de visualizar productos comerciales de alta calidad.</li>
          <li>Producir una animación de acting de un personaje que aplique los principios de animación y rigging, con el fin de proyectar habilidades en la narrativa y la expresión de personajes.</li>
          <li>Desarrollar una simulación física (fluidos, dinámicas o partículas) que aplique conocimientos técnicos para generar efectos visuales y solucionar necesidades de visualización complejas.</li>
          <li>Integrar un elemento 3D en un video real a través de la postproducción y efectos visuales (VFX), con el fin de demostrar competencias en la composición y el matchmoving.</li>
          <li>Elaborar un conjunto de assets 3D optimizados para productos interactivos, con el fin de aplicar conocimientos en el desarrollo de videojuegos y experiencias de realidad extendida (XR).</li>
          <li>Ensamblar y editar el material audiovisual de los proyectos para generar un reel profesional que represente el perfil y las habilidades del aprendiz.</li>
        </ul>

        <div class="sena-sub-title">2.5 Alcance, Beneficiarios, Impacto y Riesgos</div>
        <table class="sena-table">
          <tr>
            <td style="width: 25%; font-weight: bold;">2.5.1 Beneficiarios:</td>
            <td><strong>Aprendices:</strong> Portafolio profesional de alta calidad y empleabilidad inmediata.<br><strong>Sector Productivo:</strong> Acceso a talento local calificado en tecnologías 3D.<br><strong>SENA:</strong> Fortalecimiento institucional de vanguardia en la Industria 4.0.</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">2.5.2 Impactos:</td>
            <td><strong>Social:</strong> Inclusión digital y empleabilidad de alto valor técnico.<br><strong>Económico:</strong> Reducción de costos de importación de servicios 3D para empresas nacionales.<br><strong>Ambiental:</strong> Optimización de recursos y prototipado digital antes de manufactura física.<br><strong>Tecnológico:</strong> Asimilación de inteligencia artificial y gemelos digitales en flujos productivos.</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">2.5.3 Riesgos y Soluciones:</td>
            <td><strong>Obsolescencia tecnológica:</strong> Capacitación en principios fundamentales agnósticos al software y vigilancia tecnológica continua.<br><strong>Tiempos de render y cómputo:</strong> Motores en tiempo real, optimización de pases de difusión asistida por IA y playblasts para previsualización.</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">2.5.4 Productos por Fase:</td>
            <td>
              <strong>FASE 1 (PLANEAR):</strong> Biblia técnica, guion técnico, storyboards, hojas de modelo (model sheets) y clasificación de rutas (directa vs previs 3D).<br>
              <strong>FASE 2, 3, 4 (HACER):</strong> Modelos CAD paramétricos, prototipos 3D impresos/simulados, coordinación BIM (IFC), mallas de escultura y retopología en quads, texturizado PBR y armaduras de deformación (Rigging/MoCap).<br>
              <strong>FASE 5, 6 (VERIFICAR):</strong> Secuencias de video estilizadas con control cinematográfico y difusión 3D, escenas optimizadas en motor gráfico a 60 FPS estables, composición nodal y montaje de audio sincronizado.<br>
              <strong>FASE 7 (ACTUAR):</strong> Aplicación ejecutable interactiva compilada de Gemelo Digital multi-plataforma (desktop/web/VR), simulador 3D explorable y portafolio / reel profesional consolidado.
            </td>
          </tr>
        </table>

        <!-- 3. PLANEACIÓN DEL PROYECTO -->
        <div class="sena-section-title">3. PLANEACIÓN DEL PROYECTO (39 GUÍAS CONSECUTIVAS — PIPELINE TECNOLÓGICO)</div>
        <p style="font-size: 8.5pt; color: #475569; margin-bottom: 0.75rem;">
          Secuencia cronológica del Tecnólogo (7 trimestres lectivos). Cada fila corresponde a <strong>1 Guía de Aprendizaje consecutiva de 48 horas (1 crédito formativo)</strong>.
        </p>
        <table class="sena-table">
          <thead>
            <tr>
              <th style="width: 13%;">Fase / Trimestre</th>
              <th style="width: 33%;">Actividad del Proyecto (Verbo + Objeto + Condición)</th>
              <th style="width: 10%; text-align: center;">Guía (48h)</th>
              <th style="width: 22%;">Resultado de Aprendizaje Específico</th>
              <th style="width: 22%;">Resultado de Aprendizaje Transversal / Clave</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;">FASE 1 (PLANEAR)<br>(I Trimestre - Preproducción y Fundamentación)</td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Estructurar la biblia de preproducción redactando el guion técnico y clasificando las tomas en rutas de renderizado directo o guía 3D.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 01</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>250201022 Desarrollar storyboard de acuerdo con guion y contenido audiovisual</div><div style='margin-top: 3px; font-weight: 500;'>RAP 07: Elaborar guiones técnicos y storyboards de preproducción clasificando tomas y rutas de renderizado.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>240201530 Resultado de Aprendizaje de la Inducción</div><div style='margin-top: 3px;'>RAP 17: Identificar la dinámica organizacional del SENA y el rol de la formación profesional integral.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Diseñar viñetas de storyboard definiendo encuadres, ángulos y ritmos cinemáticos para la previsualización del teaser.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 02</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>250201022 Desarrollar storyboard de acuerdo con guion y contenido audiovisual</div><div style='margin-top: 3px; font-weight: 500;'>RAP 07: Elaborar guiones técnicos y storyboards de preproducción clasificando tomas y rutas de renderizado.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>240201524 Desarrollar procesos de comunicación eficaces y efectivos</div><div style='margin-top: 3px;'>RAP 18: Argumentar en forma oral y escrita atendiendo las exigencias de las diversas situaciones comunicativas.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Explorar el arte conceptual y lenguaje de formas del teaser mediante generación asistida por difusión 2D y armonías cromáticas.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 03</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>250201022 Desarrollar storyboard de acuerdo con guion y contenido audiovisual</div><div style='margin-top: 3px; font-weight: 500;'>RAP 08: Establecer la guía gráfica y hojas de modelo de elementos conceptuales manteniendo coherencia estilística.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>240201526 Enriquecer su proyecto de vida en un contexto productivo</div><div style='margin-top: 3px;'>RAP 19: Contribuir con el fortalecimiento de la cultura de paz a partir de la dignidad humana.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Dibujar y estandarizar hojas de modelo (Model Sheets) ortográficas consistentes del personaje antropomorfo y props clave.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 04</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>250201022 Desarrollar storyboard de acuerdo con guion y contenido audiovisual</div><div style='margin-top: 3px; font-weight: 500;'>RAP 08: Establecer la guía gráfica y hojas de modelo de elementos conceptuales manteniendo coherencia estilística.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 25: Intercambiar opiniones sobre situaciones cotidianas y laborales actuales, pasadas y futuras (Inglés 1).</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Bloquear los volúmenes primarios y proporciones anatómicas bípedas del personaje antropomorfo de forma manual y asistida por IA.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 05</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado</div><div style='margin-top: 3px; font-weight: 500;'>RAP 01: Construir mallas tridimensionales de escultura orgánica con precisión volumétrica y detalle anatómico.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240201524 Desarrollar procesos de comunicación eficaces</div><div style='margin-top: 3px;'>RAP 18: Sustentación de la memoria descriptiva de proporciones anatómicas y biomecánica del personaje.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Esculpir masa muscular, pliegues de indumentaria y juntas biomecánicas mediante pinceles de escultura digital y subdivisión.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 06</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado</div><div style='margin-top: 3px; font-weight: 500;'>RAP 01: Construir mallas tridimensionales de escultura orgánica con precisión volumétrica y detalle anatómico.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 25 (Inglés 1): Ficha técnica y glosario de terminología anatómica internacional y landmarks en inglés.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Estampar microtexturas orgánicas, mapas de alfas y accesorios técnicos de protección en la malla esculpida de alta resolución.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 07</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado</div><div style='margin-top: 3px; font-weight: 500;'>RAP 01: Construir mallas tridimensionales de escultura orgánica con precisión volumétrica y detalle anatómico.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240201526 Enriquecer su proyecto de vida en un contexto social</div><div style='margin-top: 3px;'>RAP 19: Principios éticos de diversidad, inclusión y dignidad en el diseño volumétrico de personajes.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Reconstruir la topología poligonal limpia en cuadriláteros (quads) trazando anillos y bucles (edge loops) para deformación articular.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 08</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado</div><div style='margin-top: 3px; font-weight: 500;'>RAP 02: Optimizar la topología poligonal de mallas 3D y desplegar mapas UV uniformes.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240201527 Generar hábitos saludables mediante actividad física</div><div style='margin-top: 3px;'>RAP 20: Ergonomía y postura adecuada en estaciones de trabajo 3D durante retopología intensiva.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Desplegar mapas UV uniformes y optimizar el empaquetado de islas sin distorsión respetando la escala de texels Game-Ready.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 09</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado</div><div style='margin-top: 3px; font-weight: 500;'>RAP 02: Optimizar la topología poligonal de mallas 3D y desplegar mapas UV uniformes.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240201527 Generar hábitos saludables mediante actividad física</div><div style='margin-top: 3px;'>RAP 20: Protocolo de pausas activas y ejercicios de muñeca para prevenir túnel carpiano en mapeo UV.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;">FASE 2 (HACER)<br>(II Trimestre - Superficies, CAD y Previs)</td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Proyectar y hornear mapas de alta a baja resolución (Baking de Normales, Curvatura y AO) sobre la malla optimizada.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 10</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado</div><div style='margin-top: 3px; font-weight: 500;'>RAP 03: Generar y aplicar materiales bajo estándares PBR mediante proyección de mapas y shaders.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>240201527 Generar hábitos saludables mediante programas de actividad física</div><div style='margin-top: 3px;'>RAP 20: Practicar hábitos saludables mediante la aplicación de fundamentos de nutrición e higiene.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Pintar capas de texturas PBR (Albedo, Roughness, Metallic) aplicando máscaras de suciedad y desgaste industrial.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 11</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado</div><div style='margin-top: 3px; font-weight: 500;'>RAP 03: Generar y aplicar materiales bajo estándares PBR mediante proyección de mapas y shaders.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 26: Discutir sobre posibles soluciones a problemas dentro de un rango variado de contextos (Inglés 2).</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Ensamblar grafos nodales de shaders físicos con calibración lumínica y dispersión subsuperficial (SSS).</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 12</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado</div><div style='margin-top: 3px; font-weight: 500;'>RAP 03: Generar y aplicar materiales bajo estándares PBR mediante proyección de mapas y shaders.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 26 (Inglés 2): Especificaciones y documentación de mapas dieléctricos y metálicos en inglés.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Dibujar bocetos 2D paramétricos con dimensiones reales, cotas y restricciones geométricas estrictas del producto.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 13</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220101016 Generar prototipo digital según técnicas de modelado y producto</div><div style='margin-top: 3px; font-weight: 500;'>RAP 04: Modelar prototipos digitales CAD paramétricos hard-surface ajustados a tolerancias dimensionales.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 26 (Inglés 2): Planos de ensamble y simbología de ajuste mecánico ISO en idioma inglés.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Ejecutar operaciones sólidas 3D y booleanas conservando el árbol histórico editable en software CAD paramétrico.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 14</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220101016 Generar prototipo digital según técnicas de modelado y producto</div><div style='margin-top: 3px; font-weight: 500;'>RAP 04: Modelar prototipos digitales CAD paramétricos hard-surface ajustados a tolerancias dimensionales.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240201528 Razonamiento cuantitativo y matemáticas</div><div style='margin-top: 3px;'>RAP 22: Cálculo matemático de tolerancias dimensionales y encajes mecánicos en CAD.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Modelar ensambles mecánicos funcionales, generando la vista explosionada (Exploded View) y el manual técnico de ensamble.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 15</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220101016 Generar prototipo digital según técnicas de modelado y producto</div><div style='margin-top: 3px; font-weight: 500;'>RAP 04: Modelar prototipos digitales CAD paramétricos hard-surface ajustados a tolerancias dimensionales.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 26 (Inglés 2): Glosario técnico paramétrico y memoria descriptiva de piezas en inglés.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Construir la previsualización 3D (Previs) en el entorno cerrado animando cámaras virtuales a ritmo de teaser (Playblast en gris).</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 16</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>250201026 Animar elementos de la escena según técnicas y especificaciones</div><div style='margin-top: 3px; font-weight: 500;'>RAP 09: Construir previsualizaciones dinámicas en entorno 3D ajustando movimientos de cámara y ritmo cinemático.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240201528 Razonamiento cuantitativo y matemáticas</div><div style='margin-top: 3px;'>RAP 22: Matemáticas cinemáticas aplicadas: cálculo de distancia focal, FOV y velocidad de cámara.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;">FASE 3 (HACER)<br>(III Trimestre - Interoperabilidad y Manufactura)</td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Modelar elementos espaciales y componentes constructivos interiores de la fábrica/laboratorio en entorno BIM.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 17</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220101016 Generar prototipo digital según técnicas de modelado y producto</div><div style='margin-top: 3px; font-weight: 500;'>RAP 06: Estructurar modelos de información espacial bajo estándares abiertos IFC y documentación técnica BIM.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>210201501 Ejercer derechos fundamentales del trabajo en el marco de la constitución</div><div style='margin-top: 3px;'>RAP 21: Reconocer el trabajo como factor de movilidad social y transformación de la realidad.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Mapear atributos de propiedades bajo estándar abierto IFC, extrayendo cómputos métricos y memoria técnica asistida por LLMs.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 18</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220101016 Generar prototipo digital según técnicas de modelado y producto</div><div style='margin-top: 3px; font-weight: 500;'>RAP 06: Estructurar modelos de información espacial bajo estándares abiertos IFC y documentación técnica BIM.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>240201529 Gestionar procesos propios de la cultura emprendedora</div><div style='margin-top: 3px;'>RAP 22: Caracterizar la idea de negocio teniendo en cuenta las oportunidades del sector.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Configurar parámetros de laminación (slicing), soportes, infill y generar el archivo G-Code verificado para fabricación física o simulada.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 19</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220101016 Generar prototipo digital según técnicas de modelado y producto</div><div style='margin-top: 3px; font-weight: 500;'>RAP 05: Configurar parámetros de laminación y generar paquetes de código numérico (G-Code) o prototipos 3D.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 27: Explicar las funciones de su ocupación laboral usando expresiones de acuerdo al nivel (Inglés 3).</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;">FASE 4 (HACER)<br>(IV Trimestre - Deformación e Inteligencia Artificial)</td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Construir armaduras 3D estructurando jerarquías de transformación, nodos padre/hijo y orientación correcta de joints.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 20</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>250201026 Animar elementos de la escena según técnicas y especificaciones</div><div style='margin-top: 3px; font-weight: 500;'>RAP 10: Integrar estructuras de armadura (Rigging), jerarquías de control y datos de captura de movimiento.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220601501 Aplicar prácticas de protección ambiental, seguridad y salud en el trabajo</div><div style='margin-top: 3px;'>RAP 23: Analizar las estrategias para el control de los impactos ambientales y accidentes laborales.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Configurar controladores cinemáticos con conmutación IK/FK y restricciones mecánicas para la actuación del personaje.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 21</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>250201026 Animar elementos de la escena según técnicas y especificaciones</div><div style='margin-top: 3px; font-weight: 500;'>RAP 10: Integrar estructuras de armadura (Rigging), jerarquías de control y datos de captura de movimiento.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 28: Comprender información sobre situaciones cotidianas y laborales actuales y futuras (Inglés 4).</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Pintar pesos de deformación (Skinning), retargetear captura de movimiento MoCap y pulir curvas de animación en el Graph Editor.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 22</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>250201026 Animar elementos de la escena según técnicas y especificaciones</div><div style='margin-top: 3px; font-weight: 500;'>RAP 10: Integrar estructuras de armadura (Rigging), jerarquías de control y datos de captura de movimiento.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 28 (Inglés 4): Prompt engineering y descriptores cinematográficos en idioma inglés.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Estructurar plantillas de prompts técnicos parametrizados con adaptadores de control estructural (ControlNet) y reglas de restricción.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 23</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual</div><div style='margin-top: 3px; font-weight: 500;'>RAP 11: Estructurar plantillas de prompts técnicos y reglas de restricción lógica asegurando consistencia.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 28 (Inglés 4): Informe comparativo en inglés sobre estabilidad de render y fidelidad temporal.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;">FASE 5 (VERIFICAR)<br>(V Trimestre - Render Asistido y Real-Time)</td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Configurar y exportar pases AOV 3D (Depth, Normal, Motion) vinculándolos a motores de difusión guiada para render sintético.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 24</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual</div><div style='margin-top: 3px; font-weight: 500;'>RAP 12: Procesar y renderizar secuencias animadas vinculando pases de control 3D y difusión guiada.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501501 Aplicar tecnologías de la información y la comunicación (TICs)</div><div style='margin-top: 3px;'>RAP 24: Seleccionar herramientas TIC de acuerdo con las necesidades de información.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Aplicar filtros de consistencia temporal en video sintético eliminando flicker e interpolando cuadros con flujo óptico (RIFE).</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 25</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual</div><div style='margin-top: 3px; font-weight: 500;'>RAP 12: Procesar y renderizar secuencias animadas vinculando pases de control 3D y difusión guiada.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 29: Presentar un proceso para la realización de una actividad en su quehacer laboral (Inglés 5).</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Generar niveles de detalle geométrico (LODs) y oclusión de visibilidad en el motor gráfico respetando el presupuesto técnico.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 26</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501096 Desarrollar la solución de software de acuerdo con el diseño</div><div style='margin-top: 3px; font-weight: 500;'>RAP 14: Optimizar e integrar activos 3D en motores en tiempo real garantizando tasa de refresco a 60 FPS.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 29 (Inglés 5): Presentación ejecutiva en inglés de métricas de profiling y optimización a 60 FPS.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Hornear mapas de iluminación estática (Lightmaps), posicionar sondas de reflexión y optimizar materiales para tiempo real.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 27</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501096 Desarrollar la solución de software de acuerdo con el diseño</div><div style='margin-top: 3px; font-weight: 500;'>RAP 14: Optimizar e integrar activos 3D en motores en tiempo real garantizando tasa de refresco a 60 FPS.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>210201501 Ejercer derechos fundamentales del trabajo</div><div style='margin-top: 3px;'>RAP 24: Propiedad intelectual, licencias de software y derechos de autor en activos 3D digitales.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Analizar el rendimiento con perfiladores gráficos de CPU/GPU, reduciendo Draw Calls y estabilizando la escena a 60 FPS / VR.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 28</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501096 Desarrollar la solución de software de acuerdo con el diseño</div><div style='margin-top: 3px; font-weight: 500;'>RAP 14: Optimizar e integrar activos 3D en motores en tiempo real garantizando tasa de refresco a 60 FPS.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>210201501 Ejercer derechos fundamentales del trabajo</div><div style='margin-top: 3px;'>RAP 24: Normatividad laboral, modalidades de teletrabajo y contratos freelance para artistas 3D.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;">FASE 6 (VERIFICAR)<br>(VI Trimestre - Postproducción y Scripting)</td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Componer por nodos las capas de render, efectos visuales y máscaras de rotoscopia/segmentación asistida por IA.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 29</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual</div><div style='margin-top: 3px; font-weight: 500;'>RAP 13: Componer y postproducir secuencias audiovisuales mediante integración de capas y correcciones digitales.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 30: Implementar acciones de mejora relacionadas con el uso de expresiones y desempeño (Inglés 6).</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Aplicar corrección de color cinemática (Color Grading) en espacio de color ACES y efectos ópticos de cámara al teaser de 60s.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 30</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual</div><div style='margin-top: 3px; font-weight: 500;'>RAP 13: Componer y postproducir secuencias audiovisuales mediante integración de capas y correcciones digitales.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 30 (Inglés 6): Subtitulado y adaptación cultural internacional del teaser audiovisual.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Diseñar, limpiar y sincronizar la banda sonora Foley, efectos sonoros y música, exportando el máster final del Teaser de 60 segundos.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 31</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual</div><div style='margin-top: 3px; font-weight: 500;'>RAP 13: Componer y postproducir secuencias audiovisuales mediante integración de capas y correcciones digitales.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 30 (Inglés 6): Documentación de código y API técnica en inglés profesional estándar.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Programar código POO del sistema de locomoción híbrido (Teletransporte para VR y Primera Persona para simulador de escritorio PC).</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 32</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501096 Desarrollar la solución de software de acuerdo con el diseño</div><div style='margin-top: 3px; font-weight: 500;'>RAP 15: Programar scripts de lógica e interacción en lenguajes orientados a objetos con controladores y eventos.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>220501501 Aplicar tecnologías de la información (TICs)</div><div style='margin-top: 3px;'>RAP 23: Arquitectura de software, patrones de diseño de interacción y testing de UI.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Programar componentes detectores de colisión (Triggers/Colliders) y mecánicas físicas de agarre/movimiento de piezas del producto.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 33</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501096 Desarrollar la solución de software de acuerdo con el diseño</div><div style='margin-top: 3px; font-weight: 500;'>RAP 15: Programar scripts de lógica e interacción en lenguajes orientados a objetos con controladores y eventos.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240201529 Gestionar cultura emprendedora y empresarial</div><div style='margin-top: 3px;'>RAP 22: Presupuestación técnica y estimación de costos en desarrollo de software interactivo.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Programar el configurador dinámico de cambio de materiales en tiempo real con disparador de feedback multisensorial (audio y partículas).</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 34</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501096 Desarrollar la solución de software de acuerdo con el diseño</div><div style='margin-top: 3px; font-weight: 500;'>RAP 15: Programar scripts de lógica e interacción en lenguajes orientados a objetos con controladores y eventos.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240202501 Interactuar en lengua inglesa de forma oral y escrita</div><div style='margin-top: 3px;'>RAP 30 (Inglés 6): Pitch oral del teaser terminado en inglés ante jurado internacional.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Ejecutar pruebas de depuración (debugging), arquitectura de datos de interacción y consola de control del simulador interactivo.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 35</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501096 Desarrollar la solución de software de acuerdo con el diseño</div><div style='margin-top: 3px; font-weight: 500;'>RAP 15: Programar scripts de lógica e interacción en lenguajes orientados a objetos con controladores y eventos.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240201524 Desarrollar procesos de comunicación eficaces</div><div style='margin-top: 3px;'>RAP 18: Defensa argumentada del máster audiovisual ante el comité técnico y directivo.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;">FASE 7 (ACTUAR)<br>(VII Trimestre - Gemelos Digitales y Despliegue)</td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Diseñar e implementar menús navegables, botones y paneles HUD espaciales 3D (World-Space UI) según principios UX.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 36</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501096 Desarrollar la solución de software de acuerdo con el diseño</div><div style='margin-top: 3px; font-weight: 500;'>RAP 16: Compilar y desplegar aplicaciones interactivas multi-plataforma integrando interfaces de usuario UI/UX.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240201529 Gestionar cultura emprendedora y empresarial</div><div style='margin-top: 3px;'>RAP 22: Modelo de negocio Lean Canvas y propuesta de valor comercial del Gemelo Digital.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Integrar el personaje antropomorfo como asistente interactivo animado en el Gemelo Digital y compilar la aplicación ejecutable (.exe / WebGL).</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 37</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501096 Desarrollar la solución de software de acuerdo con el diseño</div><div style='margin-top: 3px; font-weight: 500;'>RAP 16: Compilar y desplegar aplicaciones interactivas multi-plataforma integrando interfaces de usuario UI/UX.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #7e22ce; font-weight: 600;'>240201529 Gestionar cultura emprendedora y empresarial</div><div style='margin-top: 3px;'>RAP 22: Pitch Deck comercial, canales de distribución y monetización de soluciones 3D.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Compilar, curar técnicamente y maquetar el portafolio profesional web del egresado integrando los tres macroproyectos.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 38</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501096 Desarrollar la solución de software de acuerdo con el diseño</div><div style='margin-top: 3px; font-weight: 500;'>RAP 31: Validar y entregar el producto interactivo/portafolio 3D final según requerimientos del sector productivo.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>Trabajo de Integración de Portafolio</div><div style='margin-top: 3px;'>Validación y compilación del portafolio técnico final del egresado.</div></td>
            </tr>

            <tr>
              <td style="font-weight: 600; font-size: 8pt; vertical-align: top; background: #fafafa;"></td>
              <td style="vertical-align: top; font-size: 8.5pt; line-height: 1.4;">Sustentar técnicamente el portafolio integral de soluciones 3D ante el comité evaluador institucional y sector productivo.</td>
              <td style="text-align: center; vertical-align: top;"><span class="sena-badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">GUÍA 39</span><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">48 Horas</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>220501096 Desarrollar la solución de software de acuerdo con el diseño</div><div style='margin-top: 3px; font-weight: 500;'>RAP 31: Validar y entregar el producto interactivo/portafolio 3D final según requerimientos del sector productivo.</div></td>
              <td style="vertical-align: top; font-size: 8pt; line-height: 1.35;"><div style='font-size: 7.5pt; color: #4b5563; font-weight: 600;'>Sustentación Final</div><div style='margin-top: 3px;'>Defensa y sustentación técnica del portafolio profesional del egresado.</div></td>
            </tr>
          </tbody>
        </table>

        <!-- CONTROL DEL DOCUMENTO -->
        <div class="sena-section-title" style="margin-top: 2rem;">CONTROL DEL DOCUMENTO</div>
        <table class="sena-table" style="font-size: 8.5pt;">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Dependencia</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${instructor}</td>
              <td>Instructor Experto Técnico</td>
              <td>${centro}</td>
              <td>Noviembre de 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

}
