import { RAPS_TECNICOS, RAPS_TRANSVERSALES, ORIGINAL_RAPS_TECNICOS, ORIGINAL_RAPS_TRANSVERSALES, COMPETENCIAS_MATRIZ } from './data/normas-raps.js';
import { CURRICULO_TECNOLOGO } from './data/curriculo-tecnologo.js';
import { CURRICULO_MODELADO } from './data/curriculo-modelado.js';
import { CURRICULO_ANIMACION } from './data/curriculo-animacion.js';
import { PipelineViewer } from './components/pipeline-viewer.js';
import { CurriculumTable } from './components/curriculum-table.js';
import { DocumentBuilder } from './components/document-builder.js';
import { getAprendices, addAprendiz, deleteAprendiz, resetAprendices, importAprendicesFromText, getEvaluacion, saveEvaluacion } from './data/aprendices-db.js';
import { N8nClient } from './automation/n8n-client.js';

class App {
  constructor() {
    this.currentProgram = 'tecnologo'; // 'tecnologo', 'modelado', 'animacion'
    this.currentView = 'infografia'; // 'infografia', 'malla', 'generador', 'n8n'
    this.currentRap = 'RAP-01';

    this.pipelineViewer = new PipelineViewer('viewInfografia');
    this.curriculumTable = new CurriculumTable('viewMalla');
    this.documentBuilder = new DocumentBuilder('viewGenerador');
    this.n8nClient = new N8nClient('viewN8n');
  }

  init() {
    this.loadCustomRapsFromStorage();
    this.renderHeader();
    this.renderHero();
    this.switchView('infografia');
    this.setupModal();
  }

  setProgram(programKey) {
    this.currentProgram = programKey;

    // Update program selector buttons
    document.querySelectorAll('.program-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.program === programKey) {
        btn.classList.add('active');
      }
    });

    this.renderHero();
    this.refreshCurrentView();
  }

  switchView(viewKey) {
    this.currentView = viewKey;

    document.querySelectorAll('.view-nav-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.view === viewKey) {
        btn.classList.add('active');
      }
    });

    // Hide all view containers
    ['viewInfografia', 'viewMalla', 'viewGenerador', 'viewN8n'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

    this.refreshCurrentView();
  }

  refreshCurrentView() {
    if (this.currentView === 'infografia') {
      const el = document.getElementById('viewInfografia');
      if (el) el.style.display = 'block';
      this.pipelineViewer.render(this.currentProgram);
    } else if (this.currentView === 'malla') {
      const el = document.getElementById('viewMalla');
      if (el) el.style.display = 'block';
      this.curriculumTable.render(this.currentProgram);
    } else if (this.currentView === 'generador') {
      const el = document.getElementById('viewGenerador');
      if (el) el.style.display = 'block';
      this.documentBuilder.render(this.currentProgram);
    } else if (this.currentView === 'n8n') {
      const el = document.getElementById('viewN8n');
      if (el) el.style.display = 'block';
      this.n8nClient.render();
    }
  }

  filterCurriculum(type) {
    this.curriculumTable.filterType = type;
    this.curriculumTable.render(this.currentProgram);
  }

  changeDocType(newType) {
    this.documentBuilder.currentDocType = newType;
    const rapGroup = document.getElementById('rapSelectorGroup');
    if (rapGroup) {
      rapGroup.style.display = (newType === 'guia' || newType === 'instrumento') ? 'block' : 'none';
    }
    const apGroup = document.getElementById('aprendizSelectorGroup');
    if (apGroup) {
      apGroup.style.display = (newType === 'instrumento') ? 'block' : 'none';
    }
    const excelBtn = document.getElementById('btnExportExcel');
    if (excelBtn) {
      excelBtn.style.display = (newType === 'instrumento') ? 'flex' : 'none';
    }
    const docSelect = document.getElementById('docTypeSelect');
    if (docSelect && docSelect.value !== newType) {
      docSelect.value = newType;
    }
    this.documentBuilder.updatePreview();
  }

  changeSelectedGuia(guiaId) {
    this.documentBuilder.currentGuiaId = guiaId;
    this.documentBuilder.updatePreview();
  }

  changeSelectedTransversal(transversalId) {
    this.documentBuilder.selectedTransversalRap = transversalId;
    this.documentBuilder.updatePreview();
  }

  changeSelectedRap(rapKey) {
    this.currentRap = rapKey;
    this.documentBuilder.currentRap = rapKey;
    const managerContainer = document.getElementById('transversalManagerContainer');
    if (managerContainer && this.documentBuilder.renderTransversalesManager) {
      managerContainer.innerHTML = this.documentBuilder.renderTransversalesManager(rapKey);
    }
    this.documentBuilder.updatePreview();
  }

  addTransversalToGuia() {
    const select = document.getElementById('addTransversalSelect');
    const tKey = select ? select.value : '';
    if (!tKey) {
      this.showToast('⚠️ Seleccione un RAP transversal de la lista para vincular');
      return;
    }
    this.documentBuilder.addTransversalToRap(this.documentBuilder.currentRap, tKey);
    const managerContainer = document.getElementById('transversalManagerContainer');
    if (managerContainer && this.documentBuilder.renderTransversalesManager) {
      managerContainer.innerHTML = this.documentBuilder.renderTransversalesManager(this.documentBuilder.currentRap);
    }
    this.documentBuilder.updatePreview();
    this.showToast(`🔗 ${tKey.replace('-', ' ')} vinculado a la guía`);
  }

  removeTransversalFromGuia(tKey) {
    this.documentBuilder.removeTransversalFromRap(this.documentBuilder.currentRap, tKey);
    const managerContainer = document.getElementById('transversalManagerContainer');
    if (managerContainer && this.documentBuilder.renderTransversalesManager) {
      managerContainer.innerHTML = this.documentBuilder.renderTransversalesManager(this.documentBuilder.currentRap);
    }
    this.documentBuilder.updatePreview();
    this.showToast(`🗑️ ${tKey.replace('-', ' ')} desvinculado de la guía`);
  }

  downloadExcel() {
    // Descarga directa del archivo XLS oficial generado
    const link = document.createElement('a');
    link.href = 'Proyecto_Formativo_GFPI-F-016.xls';
    link.download = 'Proyecto_Formativo_GFPI-F-016.xls';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  updateDocPreview() {
    this.documentBuilder.updatePreview();
  }

  copyDocumentText() {
    const el = document.getElementById('documentPreview');
    if (!el) return;
    navigator.clipboard.writeText(el.innerText).then(() => {
      alert('¡Documento copiado al portapapeles!');
    });
  }

  sendToN8n() {
    this.switchView('n8n');
    this.n8nClient.sendPayload('generar_guia_ia', {
      rap: RAPS_TECNICOS[this.currentRap]
    });
  }

  saveAndTriggerN8n(action) {
    this.n8nClient.sendPayload(action, {
      rap: RAPS_TECNICOS[this.currentRap]
    });
  }

  testN8nConnection() {
    this.n8nClient.sendPayload('ping_test', {
      test: true,
      mensaje: 'Prueba de enlace desde portal curricular 3D'
    });
  }

  renderHeader() {
    // Already in index.html static markup or dynamic
  }

  renderHero() {
    const heroEl = document.getElementById('heroContent');
    if (!heroEl) return;

    let info, badges, metricHours, metricCredits, metricRaps, pipelineFocus;

    if (this.currentProgram === 'tecnologo') {
      info = CURRICULO_TECNOLOGO.info;
      badges = `
        <span class="badge cyan">Nivel: Tecnólogo</span>
        <span class="badge purple">Código: ${info.codigo}</span>
        <span class="badge emerald">7 Trimestres Lectivos + 2 Práctica</span>
        <span class="badge amber">Pipeline Híbrido 3D + IA</span>
      `;
      metricHours = '3.120';
      metricCredits = '65';
      metricRaps = '31 RAPs';
      pipelineFocus = 'Ciclo Completo: Modelado, Animación, VFX con IA & Gemelos Digitales Real-Time';
    } else if (this.currentProgram === 'modelado') {
      info = CURRICULO_MODELADO.info;
      badges = `
        <span class="badge amber">Nivel: Técnico Laboral</span>
        <span class="badge cyan">Código: ${info.codigo}</span>
        <span class="badge emerald">3 Trimestres (1 Año)</span>
        <span class="badge purple">3D Para Hacer</span>
      `;
      metricHours = '1.344';
      metricCredits = '28';
      metricRaps = '15 RAPs';
      pipelineFocus = 'Escultura Orgánica, Topología, PBR, CAD Paramétrico, Impresión 3D & BIM';
    } else {
      info = CURRICULO_ANIMACION.info;
      badges = `
        <span class="badge purple">Nivel: Técnico Laboral</span>
        <span class="badge cyan">Código: ${info.codigo}</span>
        <span class="badge emerald">3 Trimestres (1 Año)</span>
        <span class="badge amber">3D Para Ver</span>
      `;
      metricHours = '1.344';
      metricCredits = '28';
      metricRaps = '16 RAPs';
      pipelineFocus = 'Storyboards, Previs 3D, Rigging, MoCap, Prompts y Render Generativo';
    }

    heroEl.innerHTML = `
      <div class="hero-badge-group">
        ${badges}
      </div>
      <h1 class="hero-title">${info.denominacion}</h1>
      <p class="hero-subtitle">${info.perfil_egresado}</p>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-label">Total Horas Programa</div>
          <div class="metric-value">${metricHours} <span style="font-size: 1rem; color: var(--accent-cyan);">h</span></div>
          <div class="metric-detail">${this.currentProgram === 'tecnologo' ? '2.256 Lectiva + 864 Práctica' : 'Formación 100% práctica'}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Créditos Académicos</div>
          <div class="metric-value">${metricCredits} <span style="font-size: 1rem; color: var(--accent-purple);">Créd.</span></div>
          <div class="metric-detail">Sistema Nacional de Créditos</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Resultados Aprendizaje</div>
          <div class="metric-value">${metricRaps}</div>
          <div class="metric-detail">Normas Sectoriales CUOC / SENA</div>
        </div>
        <div class="metric-card" style="grid-column: span 1;">
          <div class="metric-label">Enfoque Tecnológico</div>
          <div style="font-size: 0.95rem; font-weight: 700; color: #fff; margin-top: 0.25rem;">${pipelineFocus}</div>
        </div>
      </div>
    `;
  }

  getCurrentCurriculo() {
    if (this.currentProgram === 'modelado') return CURRICULO_MODELADO;
    if (this.currentProgram === 'animacion') return CURRICULO_ANIMACION;
    return CURRICULO_TECNOLOGO;
  }

  getNextRapNumber() {
    const allKeys = [...Object.keys(RAPS_TECNICOS), ...Object.keys(RAPS_TRANSVERSALES)];
    const nums = allKeys.map(k => {
      const m = k.match(/\d+/);
      return m ? parseInt(m[0], 10) : 0;
    });
    const max = Math.max(...nums, 31);
    return max + 1;
  }

  loadCustomRapsFromStorage() {
    try {
      const saved = localStorage.getItem('sena_custom_raps');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.tecnicos) {
          Object.keys(parsed.tecnicos).forEach(k => {
            RAPS_TECNICOS[k] = parsed.tecnicos[k];
          });
        }
        if (parsed.transversales) {
          Object.keys(parsed.transversales).forEach(k => {
            RAPS_TRANSVERSALES[k] = parsed.transversales[k];
          });
        }
        // Load custom trimestres additions
        if (parsed.trimestres_tecnologo) {
          parsed.trimestres_tecnologo.forEach(st => {
            const t = CURRICULO_TECNOLOGO.trimestres.find(x => x.numero === st.numero);
            if (t) {
              t.raps = st.raps;
              t.horas_totales = t.raps.reduce((acc, r) => acc + (r.horas || 0), 0);
              t.creditos = t.raps.reduce((acc, r) => acc + (r.creditos || 0), 0);
            }
          });
        }
        if (parsed.trimestres_modelado) {
          parsed.trimestres_modelado.forEach(st => {
            const t = CURRICULO_MODELADO.trimestres.find(x => x.numero === st.numero);
            if (t) {
              t.raps = st.raps;
              t.horas_totales = t.raps.reduce((acc, r) => acc + (r.horas || 0), 0);
              t.creditos = t.raps.reduce((acc, r) => acc + (r.creditos || 0), 0);
            }
          });
        }
        if (parsed.trimestres_animacion) {
          parsed.trimestres_animacion.forEach(st => {
            const t = CURRICULO_ANIMACION.trimestres.find(x => x.numero === st.numero);
            if (t) {
              t.raps = st.raps;
              t.horas_totales = t.raps.reduce((acc, r) => acc + (r.horas || 0), 0);
              t.creditos = t.raps.reduce((acc, r) => acc + (r.creditos || 0), 0);
            }
          });
        }
      }
    } catch (e) {
      console.warn('No se pudieron cargar RAPs personalizados:', e);
    }
  }

  saveCustomRapsToStorage() {
    try {
      const data = {
        tecnicos: RAPS_TECNICOS,
        transversales: RAPS_TRANSVERSALES,
        trimestres_tecnologo: CURRICULO_TECNOLOGO.trimestres.map(t => ({ numero: t.numero, raps: t.raps })),
        trimestres_modelado: CURRICULO_MODELADO.trimestres.map(t => ({ numero: t.numero, raps: t.raps })),
        trimestres_animacion: CURRICULO_ANIMACION.trimestres.map(t => ({ numero: t.numero, raps: t.raps }))
      };
      localStorage.setItem('sena_custom_raps', JSON.stringify(data));
    } catch (e) {
      console.error('Error guardando RAPs en localStorage:', e);
    }
  }

  showToast(message) {
    const toast = document.getElementById('appToast');
    if (!toast) return;
    toast.innerHTML = `<span style="font-size: 1.15rem;">✨</span> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  setupModal() {
    const modalEl = document.getElementById('rapModal');
    if (!modalEl) return;

    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) this.closeModal();
    });
  }

  showRapModal(rapKey) {
    const isTecnico = !!RAPS_TECNICOS[rapKey];
    const rap = isTecnico ? RAPS_TECNICOS[rapKey] : RAPS_TRANSVERSALES[rapKey];
    if (!rap) return;

    const modal = document.getElementById('rapModal');
    const content = document.getElementById('modalDetails');
    if (!modal || !content) return;

    const labelId = rap.id || rapKey;
    const nombre = isTecnico ? rap.resultado_aprendizaje : (rap.resultado_aprendizaje || rap.nombre);
    const norma = isTecnico ? `${rap.norma_codigo} — ${rap.norma_nombre}` : (rap.competencia || `${rap.norma_codigo} — ${rap.norma_nombre}`);
    const horas = rap.horas || 48;
    const creditos = rap.creditos_competencia || rap.creditos || 1;
    const evidencia = rap.evidencia_producto || rap.evidencia || 'Sin evidencia registrada';
    const procesos = rap.conocimientos_proceso || [];
    const saberes = rap.conocimientos_saber || [];
    const criterios = rap.criterios_evaluacion || [];
    const herramientas = rap.herramientas_recomendadas || ['Estándares SENA'];

    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; padding-right: 2.5rem; flex-wrap: wrap; gap: 0.75rem;">
        <div style="flex: 1; min-width: 280px;">
          <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
            <span class="badge ${isTecnico ? 'cyan' : 'purple'}">${labelId} • ${horas} HORAS • ${creditos} CRÉDITOS</span>
            
            <!-- BOTÓN 1: EDITAR RAP -->
            <button class="btn-action" onclick="window.app.editRapModal('${rapKey}')" style="padding: 0.3rem 0.75rem; font-size: 0.8rem; background: rgba(56, 189, 248, 0.15); border: 1px solid var(--accent-cyan); color: var(--accent-cyan); border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.35rem; font-weight: 600;">
              <span>✏️</span> Editar RAP
            </button>

            <!-- FUNCIÓN 1 (Primer recuadro rojo): APAGAR / ENCENDER EL RAP -->
            <button class="btn-action" onclick="window.app.toggleRapActive('${rapKey}')" title="${rap._disabled ? 'Encender y reactivar este RAP en la formación' : 'Apagar / desactivar este RAP del plan formativo'}" style="padding: 0.3rem 0.75rem; font-size: 0.8rem; background: ${rap._disabled ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)'}; border: 1px solid ${rap._disabled ? 'var(--accent-emerald)' : 'var(--accent-amber)'}; color: ${rap._disabled ? 'var(--accent-emerald)' : 'var(--accent-amber)'}; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.35rem; font-weight: 600;">
              <span>${rap._disabled ? '💡' : '🔌'}</span>
              <span>${rap._disabled ? 'Encender RAP' : 'Apagar RAP'}</span>
            </button>

            <!-- FUNCIÓN 2 (Segundo recuadro rojo): ELIMINAR EL RAP -->
            <button class="btn-action" onclick="window.app.deleteRap('${rapKey}')" title="Eliminar este RAP de la malla curricular" style="padding: 0.3rem 0.75rem; font-size: 0.8rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.5); color: #ef4444; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.35rem; font-weight: 600;">
              <span>🗑️</span> Eliminar RAP
            </button>

            <!-- BOTÓN DUPLICAR / CLONAR -->
            <button class="btn-action" onclick="window.app.duplicateRap('${rapKey}')" title="Crear un nuevo RAP basado en este" style="padding: 0.3rem 0.75rem; font-size: 0.8rem; background: rgba(168, 85, 247, 0.15); border: 1px solid var(--accent-purple); color: var(--accent-purple); border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.35rem; font-weight: 600;">
              <span>📋</span> Duplicar
            </button>
            
            ${rap._custom && !rap._disabled ? '<span style="font-size: 0.75rem; padding: 2px 7px; border-radius: 4px; background: rgba(16, 185, 129, 0.2); color: var(--accent-emerald); border: 1px solid rgba(16, 185, 129, 0.4); font-weight: 700;">Editado</span>' : ''}
            ${rap._disabled ? '<span style="font-size: 0.75rem; padding: 2px 7px; border-radius: 4px; background: rgba(234, 179, 8, 0.2); color: var(--accent-amber); border: 1px solid rgba(234, 179, 8, 0.4); font-weight: 700;">🔌 APAGADO / INACTIVO</span>' : ''}
          </div>
          <h2 style="font-size: 1.35rem; font-weight: 800; line-height: 1.35; color: #fff;">${nombre}</h2>
          <div style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.4rem;"><strong>Competencia:</strong> ${norma}</div>
        </div>
      </div>

      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-sm); padding: 0.85rem 1rem; margin-bottom: 1.25rem;">
        <div style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 0.25rem;">📦 Producto / Evidencia de Aprendizaje:</div>
        <div style="font-size: 0.88rem; color: #e2e8f0;">${evidencia}</div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem;">
        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 1.15rem;">
          <h4 style="color: var(--accent-cyan); font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.75rem; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.35rem;">
            <span>⚙️</span> Conocimientos de Proceso (Hacer)
          </h4>
          <ul style="font-size: 0.82rem; color: var(--text-muted); margin-left: 1.2rem; line-height: 1.5;">
            ${procesos.map(p => `<li style="margin-bottom: 0.35rem;">${p}</li>`).join('')}
          </ul>
        </div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 1.15rem;">
          <h4 style="color: var(--accent-purple); font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.75rem; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.35rem;">
            <span>💡</span> Conocimientos del Saber (Conceptos)
          </h4>
          <ul style="font-size: 0.82rem; color: var(--text-muted); margin-left: 1.2rem; line-height: 1.5;">
            ${saberes.map(s => `<li style="margin-bottom: 0.35rem;">${s}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div style="background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: var(--radius-sm); padding: 1.15rem; margin-bottom: 1.25rem;">
        <h4 style="color: var(--accent-emerald); font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.35rem;">
          <span>🎯</span> Criterios de Evaluación
        </h4>
        <ul style="font-size: 0.82rem; color: var(--text-main); margin-left: 1.2rem; line-height: 1.45;">
          ${criterios.map(c => `<li style="margin-bottom: 0.35rem;">${c}</li>`).join('')}
        </ul>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); padding: 0.85rem 1.15rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Herramientas Recomendadas</div>
          <div style="font-size: 0.85rem; font-weight: 600; color: #fff; margin-top: 0.2rem;">${herramientas.join(' • ')}</div>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button class="btn-action primary" onclick="window.app.generateGuiaForRap('${rapKey}')">
            📄 Generar Guía de Aprendizaje
          </button>
          <button class="btn-action" style="background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.4); color: #34d399; font-weight: 600;" onclick="window.app.generateInstrumentoForRap('${rapKey}')">
            📋 Instrumento de Evaluación
          </button>
        </div>
      </div>
    `;

    modal.classList.add('open');
  }

  renderCompetenciasOptions(selectedCode = '') {
    const tecnicas = COMPETENCIAS_MATRIZ.filter(c => c.tipo === 'tecnico');
    const transversales = COMPETENCIAS_MATRIZ.filter(c => c.tipo === 'transversal');

    return `
      <optgroup label="⚡ COMPETENCIAS ESPECÍFICAS / TÉCNICAS (3D)">
        ${tecnicas.map(c => {
          const isSel = selectedCode === c.codigo || selectedCode.includes(c.codigo);
          return `<option value="${c.codigo} - ${c.nombre}" data-tipo="${c.tipo}" ${isSel ? 'selected' : ''}>
            ${c.codigo} — ${c.nombre} (${c.area})
          </option>`;
        }).join('')}
      </optgroup>
      <optgroup label="🌐 COMPETENCIAS BÁSICAS, TRANSVERSALES Y CLAVES">
        ${transversales.map(c => {
          const isSel = selectedCode === c.codigo || selectedCode.includes(c.codigo);
          return `<option value="${c.codigo} - ${c.nombre}" data-tipo="${c.tipo}" ${isSel ? 'selected' : ''}>
            ${c.codigo} — ${c.nombre} (${c.area})
          </option>`;
        }).join('')}
      </optgroup>
      <optgroup label="⚙️ OTRA COMPETENCIA">
        <option value="custom" ${selectedCode === 'custom' ? 'selected' : ''}>
          ➕ Otra Competencia (Escribir código y nombre personalizado)...
        </option>
      </optgroup>
    `;
  }

  onCompetenciaChange(selectEl) {
    const selOpt = selectEl.options[selectEl.selectedIndex];
    const tipo = selOpt ? selOpt.getAttribute('data-tipo') : null;
    const tipoSelect = document.getElementById('newRapTipo');
    if (tipoSelect && tipo) {
      tipoSelect.value = tipo;
    }
    const customContainer = document.getElementById('customCompContainer');
    if (customContainer) {
      customContainer.style.display = selectEl.value === 'custom' ? 'grid' : 'none';
    }
  }

  openCreateRapModal(trimestreNumero = 'I', cloneFromRapKey = null) {
    try {
      const modal = document.getElementById('rapModal');
      const content = document.getElementById('modalDetails');
      if (!modal || !content) {
        console.error('Modal rapModal o modalDetails no encontrado en el DOM.');
        return;
      }

      const curriculo = this.getCurrentCurriculo();
      const nextNum = this.getNextRapNumber();
      const suggestedId = nextNum < 10 ? `RAP 0${nextNum}` : `RAP ${nextNum}`;

      let baseRap = null;
      if (cloneFromRapKey) {
        baseRap = RAPS_TECNICOS[cloneFromRapKey] || RAPS_TRANSVERSALES[cloneFromRapKey];
      }

      // Convertir número o string a número romano normalizado
      const romanNormMap = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', '1': 'I', '2': 'II', '3': 'III', '4': 'IV', '5': 'V', '6': 'VI', '7': 'VII' };
      const normalizedTrim = romanNormMap[trimestreNumero] || String(trimestreNumero || 'I').trim().toUpperCase();

      const initNombre = baseRap ? `Copia de ${baseRap.resultado_aprendizaje || baseRap.nombre}` : '';
      const initHoras = baseRap ? baseRap.horas : 48;
      const initCreditos = baseRap ? (baseRap.creditos_competencia || baseRap.creditos || 1) : 1;
      const initEvidencia = baseRap ? (baseRap.evidencia_producto || baseRap.evidencia || '') : '';
      const initProceso = baseRap ? (baseRap.conocimientos_proceso || []).join('\n') : '';
      const initSaber = baseRap ? (baseRap.conocimientos_saber || []).join('\n') : '';
      const initCriterios = baseRap ? (baseRap.criterios_evaluacion || []).join('\n') : '';
      const initHerramientas = baseRap ? (baseRap.herramientas_recomendadas || []).join(', ') : '';
      const initCompCode = baseRap ? (baseRap.norma_codigo || '') : '220501083';

      content.innerHTML = `
      <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
          <span class="badge cyan">${baseRap ? 'DUPLICAR / CLONAR RAP' : 'NUEVO RAP DESDE CERO'}</span>
          <h2 style="font-size: 1.35rem; font-weight: 800; color: #fff; margin: 0;">
            ${baseRap ? `📋 Crear RAP basado en ${baseRap.id}` : '➕ Crear Resultado de Aprendizaje desde Cero'}
          </h2>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0;">
          Selecciona la competencia establecida en la matriz a la que pertenecerá el RAP. La información se sincronizará inmediatamente en todo el ecosistema curricular.
        </p>
      </div>

      <!-- Fila 1: Trimestre, Tipo y Código -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
        <div>
          <label class="form-label" style="font-weight: 700;">Trimestre Destino:</label>
          <select id="newRapTrimestre" class="form-select">
            ${curriculo.trimestres.map(t => {
              const isSel = String(t.numero).trim().toUpperCase() === normalizedTrim;
              const fasePhvaTag = t.fase_proyecto ? ` • ${t.fase_proyecto}` : '';
              return `
              <option value="${t.numero}" ${isSel ? 'selected' : ''}>
                Trimestre ${t.numero}${fasePhvaTag} (${t.fase.substring(0, 22)}...)
              </option>`;
            }).join('')}
          </select>
        </div>

        <div>
          <label class="form-label" style="font-weight: 700;">Tipo de Componente:</label>
          <select id="newRapTipo" class="form-select">
            <option value="tecnico" ${(!baseRap || baseRap.categoria !== 'transversal') ? 'selected' : ''}>📦 Específico 3D (Técnico)</option>
            <option value="transversal" ${(baseRap && baseRap.categoria === 'transversal') ? 'selected' : ''}>🌐 Transversal / Institucional</option>
          </select>
        </div>

        <div>
          <label class="form-label" style="font-weight: 700;">Código / Identificador:</label>
          <input type="text" id="newRapId" class="form-input" value="${suggestedId}" placeholder="Ej: RAP 32">
        </div>
      </div>

      <!-- Fila 2: Selector de Competencia con TODAS las de la Matriz Maestra -->
      <div class="form-group">
        <label class="form-label" style="font-weight: 700; color: #38bdf8; display: flex; justify-content: space-between; align-items: center;">
          <span>🎯 Competencia a la que Pertenecerá el RAP:</span>
          <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: normal;">(15 Competencias oficiales de la Matriz)</span>
        </label>
        <select id="newRapCompetencia" class="form-select" onchange="window.app.onCompetenciaChange(this)" style="font-size: 0.88rem; padding: 0.75rem 0.85rem; border-color: rgba(56, 189, 248, 0.4);">
          ${this.renderCompetenciasOptions(initCompCode)}
        </select>

        <div id="customCompContainer" style="display: none; margin-top: 0.75rem; grid-template-columns: 140px 1fr; gap: 0.75rem;">
          <input type="text" id="newRapCustomCompCod" class="form-input" placeholder="Código Norma (Ej: 220501999)">
          <input type="text" id="newRapCustomCompNom" class="form-input" placeholder="Denominación de la Norma de Competencia">
        </div>
      </div>

      <!-- Fila 3: Denominación del RAP -->
      <div class="form-group">
        <label class="form-label" style="font-weight: 700; color: #f8fafc;">Resultado de Aprendizaje (Denominación): *</label>
        <textarea id="newRapNombre" class="form-input" rows="3" style="font-weight: 600; font-size: 0.92rem; line-height: 1.4;" placeholder="Escribe aquí el texto del nuevo Resultado de Aprendizaje (Verbo + Objeto + Condición)...">${initNombre}</textarea>
      </div>

      <!-- Fila 4: Horas y Créditos -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
        <div>
          <label class="form-label">Horas de Formación Directa:</label>
          <input type="number" id="newRapHoras" class="form-input" value="${initHoras}" min="1">
        </div>
        <div>
          <label class="form-label">Créditos Académicos (1 crédito = 48h):</label>
          <input type="number" id="newRapCreditos" class="form-input" value="${initCreditos}" min="1">
        </div>
      </div>

      <!-- Fila 5: Evidencia / Producto -->
      <div class="form-group">
        <label class="form-label">Evidencia de Aprendizaje Principal (Producto Entregable):</label>
        <textarea id="newRapEvidencia" class="form-input" rows="2" placeholder="Ej: Archivo digital 3D editable con el prototipo validado y memoria técnica...">${initEvidencia}</textarea>
      </div>

      <!-- Fila 6: Conocimientos de Proceso y Saber -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem;">
        <div>
          <label class="form-label" style="color: var(--accent-cyan); font-weight: 700;">
            Conocimientos de Proceso (Hacer) <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">— 1 por línea</span>
          </label>
          <textarea id="newRapProceso" class="form-input" rows="6" style="font-size: 0.82rem; line-height: 1.45;" placeholder="Analizar requerimientos técnicos del proyecto.\nConfigurar parámetros en la plataforma 3D.\nValidar la entrega según estándares técnicos.">${initProceso}</textarea>
        </div>

        <div>
          <label class="form-label" style="color: var(--accent-purple); font-weight: 700;">
            Conocimientos del Saber (Conceptos) <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">— 1 por línea</span>
          </label>
          <textarea id="newRapSaber" class="form-input" rows="6" style="font-size: 0.82rem; line-height: 1.45;" placeholder="Fundamentos teóricos y normativos aplicados.\nEstándares y especificaciones del sector.\nParámetros de calidad y consistencia.">${initSaber}</textarea>
        </div>
      </div>

      <!-- Fila 7: Criterios de Evaluación -->
      <div class="form-group">
        <label class="form-label" style="color: var(--accent-emerald); font-weight: 700;">
          Criterios de Evaluación <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">— 1 por línea</span>
        </label>
        <textarea id="newRapCriterios" class="form-input" rows="3" style="font-size: 0.82rem; line-height: 1.45;" placeholder="Aplica con precisión las técnicas según las especificaciones técnicas del proyecto.\nEntrega los productos en los formatos requeridos sin errores.">${initCriterios}</textarea>
      </div>

      <!-- Fila 8: Herramientas Recomendadas -->
      <div class="form-group">
        <label class="form-label">Herramientas Recomendadas <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">— Separadas por comas</span>:</label>
        <input type="text" id="newRapHerramientas" class="form-input" value="${initHerramientas}" placeholder="Ej: Blender, ZBrush, Houdini, Unreal Engine, IA Generativa">
      </div>

      <!-- Botones de Acción -->
      <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-color); gap: 0.75rem;">
        <button class="btn-action" onclick="window.app.closeModal()" style="padding: 0.65rem 1.2rem;">
          ✕ Cancelar
        </button>
        <button class="btn-action primary" onclick="window.app.saveNewRap()" style="background: linear-gradient(135deg, #10b981, #059669); font-weight: 700; padding: 0.65rem 1.4rem;">
          ➕ Crear y Guardar en la Matriz
        </button>
      </div>
    `;

    modal.classList.add('open');
    } catch (err) {
      console.error('Error abriendo modal de nuevo RAP:', err);
      this.showToast('⚠️ No se pudo abrir la ventana de nuevo RAP: ' + err.message);
    }
  }

  duplicateRap(rapKey) {
    this.closeModal();
    const curriculo = this.getCurrentCurriculo();
    let originalTrim = 'I';
    for (const t of curriculo.trimestres) {
      if (t.raps && t.raps.some(r => r.rap_id === rapKey)) {
        originalTrim = t.numero;
        break;
      }
    }
    this.openCreateRapModal(originalTrim, rapKey);
  }

  saveNewRap() {
    const trimSelect = document.getElementById('newRapTrimestre');
    const tipoSelect = document.getElementById('newRapTipo');
    const idInput = document.getElementById('newRapId');
    const nombreInput = document.getElementById('newRapNombre');
    const compSelect = document.getElementById('newRapCompetencia');
    const customCompCod = document.getElementById('newRapCustomCompCod');
    const customCompNom = document.getElementById('newRapCustomCompNom');
    const horasInput = document.getElementById('newRapHoras');
    const creditosInput = document.getElementById('newRapCreditos');
    const evidenciaInput = document.getElementById('newRapEvidencia');
    const procesoInput = document.getElementById('newRapProceso');
    const saberInput = document.getElementById('newRapSaber');
    const criteriosInput = document.getElementById('newRapCriterios');
    const herramientasInput = document.getElementById('newRapHerramientas');

    const trimValue = trimSelect ? trimSelect.value.trim() : 'I';
    const tipo = tipoSelect ? tipoSelect.value : 'tecnico';
    
    let rawId = idInput ? idInput.value.trim().toUpperCase() : '';
    if (!rawId) {
      rawId = `RAP ${this.getNextRapNumber()}`;
    }
    const cleanKey = rawId.replace(' ', '-').replace(/[^A-Z0-9\-]/g, '');
    const displayId = rawId.replace('-', ' ');

    const nombre = nombreInput ? nombreInput.value.trim() : '';
    if (!nombre) {
      alert('Por favor ingresa la denominación del Resultado de Aprendizaje.');
      if (nombreInput) nombreInput.focus();
      return;
    }

    let normaCodigo = '';
    let normaNombre = '';
    if (compSelect && compSelect.value === 'custom') {
      normaCodigo = customCompCod ? customCompCod.value.trim() : 'COMP-NUEVA';
      normaNombre = customCompNom ? customCompNom.value.trim() : 'Competencia personalizada';
    } else if (compSelect) {
      const parts = compSelect.value.split(' - ');
      normaCodigo = parts[0] || '220501083';
      normaNombre = parts[1] || 'Competencia del Programa';
    } else {
      normaCodigo = '220501083';
      normaNombre = 'Competencia del Programa';
    }

    const horas = horasInput ? (parseInt(horasInput.value, 10) || 48) : 48;
    const creditos = creditosInput ? (parseInt(creditosInput.value, 10) || 1) : 1;
    const evidencia = (evidenciaInput && evidenciaInput.value.trim()) || 'Evidencia de aprendizaje y producto validada.';

    const procesos = (procesoInput && procesoInput.value) ? procesoInput.value.split('\n').map(s => s.trim()).filter(s => s.length > 0) : [];
    const saberes = (saberInput && saberInput.value) ? saberInput.value.split('\n').map(s => s.trim()).filter(s => s.length > 0) : [];
    const criterios = (criteriosInput && criteriosInput.value) ? criteriosInput.value.split('\n').map(s => s.trim()).filter(s => s.length > 0) : [];
    const herramientas = (herramientasInput && herramientasInput.value) ? herramientasInput.value.split(',').map(s => s.trim()).filter(s => s.length > 0) : [];

    const newRapObj = {
      id: displayId,
      norma_codigo: normaCodigo,
      norma_nombre: normaNombre,
      competencia: `${normaCodigo} - ${normaNombre}`,
      resultado_aprendizaje: nombre,
      nombre: nombre,
      horas: horas,
      creditos_competencia: creditos,
      creditos: creditos,
      evidencia: evidencia,
      evidencia_producto: evidencia,
      producto_norma: evidencia,
      producto_egresado: evidencia,
      conocimientos_proceso: procesos.length > 0 ? procesos : ['Ejecutar procedimientos técnicos según especificaciones del proyecto.'],
      conocimientos_saber: saberes.length > 0 ? saberes : ['Principios teóricos y normativos aplicados al sector.'],
      criterios_evaluacion: criterios.length > 0 ? criterios : ['Cumple los requerimientos técnicos y metodológicos establecidos.'],
      herramientas_recomendadas: herramientas.length > 0 ? herramientas : ['Software del sector productivo'],
      categoria: tipo === 'tecnico' ? 'especifico' : 'transversal',
      _custom: true,
      _isNew: true
    };

    if (tipo === 'tecnico') {
      RAPS_TECNICOS[cleanKey] = newRapObj;
    } else {
      RAPS_TRANSVERSALES[cleanKey] = newRapObj;
    }

    // Insert into selected trimester in the active curriculum
    const curriculo = this.getCurrentCurriculo();
    const targetTrim = curriculo.trimestres.find(t => 
      String(t.numero).trim().toUpperCase() === trimValue.toUpperCase()
    );
    if (targetTrim) {
      targetTrim.raps.push({
        rap_id: cleanKey,
        tipo: tipo,
        horas: horas,
        creditos: creditos
      });
      // Recalcular horas y créditos considerando RAPs activos
      const activeRaps = targetTrim.raps.filter(r => {
        const d = r.tipo === 'tecnico' ? RAPS_TECNICOS[r.rap_id] : RAPS_TRANSVERSALES[r.rap_id];
        return !d || !d._disabled;
      });
      targetTrim.horas_totales = activeRaps.reduce((acc, r) => acc + (r.horas || 0), 0);
      targetTrim.creditos = activeRaps.reduce((acc, r) => acc + (r.creditos || 0), 0);
    }

    this.saveCustomRapsToStorage();

    // Re-render views reactively
    this.renderHero();
    this.curriculumTable.render(this.currentProgram);
    this.pipelineViewer.render(this.currentProgram);
    if (this.documentBuilder) {
      this.documentBuilder.updatePreview();
    }

    this.closeModal();
    this.showToast(`🎉 ¡${displayId} agregado exitosamente al Trimestre ${trimValue}!`);
  }

toggleRapActive(rapKey) {
    const isTecnico = !!RAPS_TECNICOS[rapKey];
    const rap = isTecnico ? RAPS_TECNICOS[rapKey] : RAPS_TRANSVERSALES[rapKey];
    if (!rap) return;

    rap._disabled = !rap._disabled;
    const isApagado = !!rap._disabled;

    // Recalcular horas y créditos en los trimestres (los RAPs apagados no suman horas lectivas activas)
    const curriculos = [CURRICULO_TECNOLOGO, CURRICULO_MODELADO, CURRICULO_ANIMACION];
    curriculos.forEach(curriculo => {
      curriculo.trimestres.forEach(trim => {
        const activeRaps = trim.raps.filter(r => {
          const d = r.tipo === 'tecnico' ? RAPS_TECNICOS[r.rap_id] : RAPS_TRANSVERSALES[r.rap_id];
          return !d || !d._disabled;
        });
        trim.horas_totales = activeRaps.reduce((acc, r) => acc + (r.horas || 0), 0);
        trim.creditos = activeRaps.reduce((acc, r) => acc + (r.creditos || 0), 0);
      });
    });

    this.saveCustomRapsToStorage();

    // Re-render
    this.renderHero();
    this.curriculumTable.render(this.currentProgram);
    this.pipelineViewer.render(this.currentProgram);
    if (this.documentBuilder) this.documentBuilder.updatePreview();

    // Reabrir modal para actualizar estado del botón
    this.showRapModal(rapKey);

    if (isApagado) {
      this.showToast(`🔌 ${rap.id} ha sido apagado (inactivo en el plan formativo)`);
    } else {
      this.showToast(`💡 ${rap.id} ha sido encendido y reactivado`);
    }
  }

  deleteRap(rapKey) {
    const isTecnico = !!RAPS_TECNICOS[rapKey];
    const rap = isTecnico ? RAPS_TECNICOS[rapKey] : RAPS_TRANSVERSALES[rapKey];
    if (!rap) return;

    const nombre = rap.resultado_aprendizaje || rap.nombre || rapKey;
    const confirmMsg = `¿Estás seguro de que deseas eliminar permanentemente ${rap.id} de la malla curricular?\n\n"${nombre.substring(0, 80)}..."\n\nEsta acción retirará el RAP de los trimestres del programa y recalculará las horas totales.`;
    
    if (!confirm(confirmMsg)) return;

    // Retirar el RAP de los trimestres en todos los planes
    const curriculos = [CURRICULO_TECNOLOGO, CURRICULO_MODELADO, CURRICULO_ANIMACION];
    curriculos.forEach(curriculo => {
      curriculo.trimestres.forEach(trim => {
        trim.raps = trim.raps.filter(r => r.rap_id !== rapKey);
        
        // Recalcular horas y créditos activos
        const activeRaps = trim.raps.filter(r => {
          const d = r.tipo === 'tecnico' ? RAPS_TECNICOS[r.rap_id] : RAPS_TRANSVERSALES[r.rap_id];
          return !d || !d._disabled;
        });
        trim.horas_totales = activeRaps.reduce((acc, r) => acc + (r.horas || 0), 0);
        trim.creditos = activeRaps.reduce((acc, r) => acc + (r.creditos || 0), 0);
      });
    });

    if (rap._isNew) {
      delete RAPS_TECNICOS[rapKey];
      delete RAPS_TRANSVERSALES[rapKey];
    } else {
      rap._deleted = true;
    }

    this.saveCustomRapsToStorage();

    // Re-render
    this.renderHero();
    this.curriculumTable.render(this.currentProgram);
    this.pipelineViewer.render(this.currentProgram);
    if (this.documentBuilder) this.documentBuilder.updatePreview();

    this.closeModal();
    this.showToast(`🗑️ ${rap.id} ha sido eliminado de la malla curricular`);
  }

  deleteCustomRap(rapKey) {
    this.deleteRap(rapKey);
  }

  editRapModal(rapKey) {
    const isTecnico = !!RAPS_TECNICOS[rapKey];
    const rap = isTecnico ? RAPS_TECNICOS[rapKey] : RAPS_TRANSVERSALES[rapKey];
    if (!rap) return;

    const modal = document.getElementById('rapModal');
    const content = document.getElementById('modalDetails');
    if (!modal || !content) return;

    const labelId = rap.id || rapKey;
    const nombre = isTecnico ? rap.resultado_aprendizaje : (rap.resultado_aprendizaje || rap.nombre);
    const horas = rap.horas || 48;
    const creditos = rap.creditos_competencia || rap.creditos || 1;
    const evidencia = rap.evidencia_producto || rap.evidencia || '';
    const procesos = (rap.conocimientos_proceso || []).join('\n');
    const saberes = (rap.conocimientos_saber || []).join('\n');
    const criterios = (rap.criterios_evaluacion || []).join('\n');
    const herramientas = (rap.herramientas_recomendadas || []).join(', ');

    content.innerHTML = `
      <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
          <span class="badge ${isTecnico ? 'cyan' : 'purple'}">${labelId}</span>
          <span style="font-size: 1.15rem; font-weight: 800; color: #fff;">✏️ Edición de Contenido del RAP</span>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0;">
          Los cambios que guardes aquí se sincronizarán inmediatamente en la <strong>Malla Curricular</strong>, la <strong>Infografía</strong> y los <strong>Documentos (Guías, Planeación, Proyecto)</strong>.
        </p>
      </div>

      <div class="form-group">
        <label class="form-label" style="font-weight: 700; color: #38bdf8; display: flex; justify-content: space-between;">
          <span>🎯 Competencia de la Matriz a la que pertenece:</span>
          <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: normal;">(15 Competencias oficiales)</span>
        </label>
        <select id="editRapCompetencia" class="form-select" style="font-size: 0.88rem; padding: 0.7rem 0.85rem; border-color: rgba(56, 189, 248, 0.4);">
          ${this.renderCompetenciasOptions(rap.norma_codigo || '')}
        </select>
      </div>

      <div class="form-group">
        <label class="form-label" style="font-weight: 700; color: #f8fafc;">Resultado de Aprendizaje (Denominación):</label>
        <textarea id="editRapNombre" class="form-input" rows="3" style="font-weight: 600; font-size: 0.95rem; line-height: 1.4;">${nombre}</textarea>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
        <div>
          <label class="form-label">Horas de Formación:</label>
          <input type="number" id="editRapHoras" class="form-input" value="${horas}" min="1">
        </div>
        <div>
          <label class="form-label">Créditos Académicos:</label>
          <input type="number" id="editRapCreditos" class="form-input" value="${creditos}" min="1">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Evidencia de Aprendizaje / Producto del Egresado:</label>
        <textarea id="editRapEvidencia" class="form-input" rows="2">${evidencia}</textarea>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem;">
        <div>
          <label class="form-label" style="color: var(--accent-cyan); font-weight: 700;">
            Conocimientos de Proceso (Hacer) <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">— 1 por línea</span>
          </label>
          <textarea id="editRapProceso" class="form-input" rows="8" style="font-size: 0.82rem; line-height: 1.45;">${procesos}</textarea>
        </div>

        <div>
          <label class="form-label" style="color: var(--accent-purple); font-weight: 700;">
            Conocimientos del Saber (Conceptos) <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">— 1 por línea</span>
          </label>
          <textarea id="editRapSaber" class="form-input" rows="8" style="font-size: 0.82rem; line-height: 1.45;">${saberes}</textarea>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" style="color: var(--accent-emerald); font-weight: 700;">
          Criterios de Evaluación <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">— 1 por línea</span>
        </label>
        <textarea id="editRapCriterios" class="form-input" rows="4" style="font-size: 0.82rem; line-height: 1.45;">${criterios}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Herramientas Recomendadas <span style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">— Separadas por comas</span>:</label>
        <input type="text" id="editRapHerramientas" class="form-input" value="${herramientas}">
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-color); flex-wrap: wrap; gap: 0.75rem;">
        <div style="display: flex; gap: 0.75rem;">
          <button class="btn-action primary" onclick="window.app.saveRapChanges('${rapKey}')" style="background: linear-gradient(135deg, #10b981, #059669); font-weight: 700; padding: 0.65rem 1.3rem;">
            💾 Guardar Cambios en la Matriz
          </button>
          <button class="btn-action" onclick="window.app.showRapModal('${rapKey}')" style="padding: 0.65rem 1.2rem;">
            ✕ Cancelar
          </button>
        </div>
        <button class="btn-action" onclick="window.app.resetRapToDefault('${rapKey}')" style="color: #f87171; border-color: rgba(239, 68, 68, 0.4); padding: 0.65rem 1rem;">
          🔄 Restablecer a Original
        </button>
      </div>
    `;
  }

  saveRapChanges(rapKey) {
    const isTecnico = !!RAPS_TECNICOS[rapKey];
    const target = isTecnico ? RAPS_TECNICOS[rapKey] : RAPS_TRANSVERSALES[rapKey];
    if (!target) return;

    const compEl = document.getElementById('editRapCompetencia');
    const nombreEl = document.getElementById('editRapNombre');
    const horasEl = document.getElementById('editRapHoras');
    const creditosEl = document.getElementById('editRapCreditos');
    const evidenciaEl = document.getElementById('editRapEvidencia');
    const procesoEl = document.getElementById('editRapProceso');
    const saberEl = document.getElementById('editRapSaber');
    const criteriosEl = document.getElementById('editRapCriterios');
    const herramientasEl = document.getElementById('editRapHerramientas');

    const nuevoNombre = nombreEl ? nombreEl.value.trim() : target.resultado_aprendizaje;
    const nuevasHoras = horasEl ? (parseInt(horasEl.value, 10) || target.horas) : target.horas;
    const nuevosCreditos = creditosEl ? (parseInt(creditosEl.value, 10) || target.creditos || 1) : (target.creditos || 1);
    const nuevaEvidencia = evidenciaEl ? evidenciaEl.value.trim() : target.evidencia;

    const procesos = procesoEl ? procesoEl.value.split('\n').map(s => s.trim()).filter(s => s.length > 0) : target.conocimientos_proceso;
    const saberes = saberEl ? saberEl.value.split('\n').map(s => s.trim()).filter(s => s.length > 0) : target.conocimientos_saber;
    const criterios = criteriosEl ? criteriosEl.value.split('\n').map(s => s.trim()).filter(s => s.length > 0) : target.criterios_evaluacion;
    const herramientas = herramientasEl ? herramientasEl.value.split(',').map(s => s.trim()).filter(s => s.length > 0) : target.herramientas_recomendadas;

    if (compEl && compEl.value !== 'custom') {
      const parts = compEl.value.split(' - ');
      target.norma_codigo = parts[0] || target.norma_codigo;
      target.norma_nombre = parts[1] || target.norma_nombre;
      target.competencia = `${target.norma_codigo} - ${target.norma_nombre}`;
    }

    if (isTecnico) {
      target.resultado_aprendizaje = nuevoNombre;
      target.horas = nuevasHoras;
      target.creditos_competencia = nuevosCreditos;
      target.evidencia = nuevaEvidencia;
      target.evidencia_producto = nuevaEvidencia;
      target.conocimientos_proceso = procesos;
      target.conocimientos_saber = saberes;
      target.criterios_evaluacion = criterios;
      target.herramientas_recomendadas = herramientas;
      target._custom = true;
    } else {
      target.nombre = nuevoNombre;
      target.resultado_aprendizaje = nuevoNombre;
      target.horas = nuevasHoras;
      target.creditos = nuevosCreditos;
      target.evidencia = nuevaEvidencia;
      target.evidencia_producto = nuevaEvidencia;
      target.conocimientos_proceso = procesos;
      target.conocimientos_saber = saberes;
      target.criterios_evaluacion = criterios;
      target.herramientas_recomendadas = herramientas;
      target._custom = true;
    }

    // Persist to localStorage
    this.saveCustomRapsToStorage();

    // Re-render views reactively
    this.renderHero();
    this.curriculumTable.render(this.currentProgram);
    this.pipelineViewer.render(this.currentProgram);
    if (this.documentBuilder) {
      this.documentBuilder.updatePreview();
    }

    // Return to view mode and notify user
    this.showRapModal(rapKey);
    this.showToast(`✅ ${target.id} actualizado en todos los documentos de la matriz`);
  }

  resetRapToDefault(rapKey) {
    const isTecnico = !!ORIGINAL_RAPS_TECNICOS[rapKey];
    const original = isTecnico ? ORIGINAL_RAPS_TECNICOS[rapKey] : ORIGINAL_RAPS_TRANSVERSALES[rapKey];
    if (!original) return;

    if (isTecnico) {
      Object.assign(RAPS_TECNICOS[rapKey], JSON.parse(JSON.stringify(original)));
      delete RAPS_TECNICOS[rapKey]._custom;
    } else {
      Object.assign(RAPS_TRANSVERSALES[rapKey], JSON.parse(JSON.stringify(original)));
      delete RAPS_TRANSVERSALES[rapKey]._custom;
    }

    this.saveCustomRapsToStorage();

    this.renderHero();
    this.curriculumTable.render(this.currentProgram);
    this.pipelineViewer.render(this.currentProgram);
    if (this.documentBuilder) {
      this.documentBuilder.updatePreview();
    }

    this.showRapModal(rapKey);
    this.showToast(`🔄 ${original.id} restablecido a sus valores originales`);
  }

  generateGuiaForRap(rapKey) {
    this.closeModal();
    this.currentRap = rapKey;
    this.switchView('generador');
    this.changeDocType('guia');
    const rapSelect = document.getElementById('rapSelect');
    if (rapSelect) rapSelect.value = rapKey;
    this.documentBuilder.currentRap = rapKey;
    const managerContainer = document.getElementById('transversalManagerContainer');
    if (managerContainer && this.documentBuilder.renderTransversalesManager) {
      managerContainer.innerHTML = this.documentBuilder.renderTransversalesManager(rapKey);
    }
    this.documentBuilder.updatePreview();
    this.showToast(`📄 Guía de Aprendizaje generada para ${rapKey}`);
  }

  // ====================================================================
  // INSTRUMENTO DE EVALUACIÓN Y GESTIÓN DE APRENDICES
  // ====================================================================
  generateInstrumentoForRap(rapKey) {
    this.closeModal();
    this.currentRap = rapKey;
    this.switchView('generador');
    this.changeDocType('instrumento');
    const rapSelect = document.getElementById('rapSelect');
    if (rapSelect) rapSelect.value = rapKey;
    this.documentBuilder.currentRap = rapKey;
    const managerContainer = document.getElementById('transversalManagerContainer');
    if (managerContainer && this.documentBuilder.renderTransversalesManager) {
      managerContainer.innerHTML = this.documentBuilder.renderTransversalesManager(rapKey);
    }
    const apSelect = document.getElementById('aprendizSelect');
    if (apSelect && this.documentBuilder.renderAprendizOptions) {
      apSelect.innerHTML = this.documentBuilder.renderAprendizOptions();
    }
    this.documentBuilder.updatePreview();
    this.showToast(`📋 Instrumento de Evaluación cargado para ${rapKey}`);
  }

  changeSelectedAprendiz(documento) {
    this.documentBuilder.selectedAprendizDoc = String(documento);
    const apSelect = document.getElementById('aprendizSelect');
    if (apSelect) apSelect.value = documento;
    this.documentBuilder.updatePreview();
    const ap = this.documentBuilder.getActiveAprendiz();
    this.showToast(`👤 Aprendiz seleccionado: ${ap.nombres} ${ap.apellidos}`);
  }

  toggleIndicadorCheck(rapKey, documento, key, status) {
    const evalData = getEvaluacion(rapKey, documento) || { checks: {}, observaciones: '' };
    if (!evalData.checks) evalData.checks = {};
    evalData.checks[key] = status;
    saveEvaluacion(rapKey, documento, evalData);
    this.documentBuilder.updatePreview();
  }

  saveEvaluacionObs(rapKey, documento, obs) {
    const evalData = getEvaluacion(rapKey, documento) || { checks: {}, observaciones: '' };
    evalData.observaciones = obs;
    saveEvaluacion(rapKey, documento, evalData);
    this.showToast('💾 Observaciones de evaluación guardadas');
  }

  openAprendicesModal() {
    const modal = document.getElementById('rapModal');
    const content = document.getElementById('modalDetails');
    if (!modal || !content) return;

    const list = getAprendices();

    content.innerHTML = `
      <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <h2 style="font-size: 1.35rem; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 0.6rem;">
            <span>👥</span> Base de Datos de Aprendices (Ficha 2824560)
          </h2>
          <span class="status-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.3);">
            ${list.length} Aprendices Registrados
          </span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-dim); margin-top: 0.35rem;">
          Gestione la nómina de aprendices de la ficha para autocompletar listas de chequeo e instrumentos de evaluación SENA.
        </p>
      </div>

      <!-- Formulario para Añadir Aprendiz -->
      <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 1.15rem; margin-bottom: 1.25rem;">
        <h4 style="font-size: 0.88rem; font-weight: 700; color: #38bdf8; margin-bottom: 0.85rem; display: flex; align-items: center; gap: 0.4rem;">
          <span>➕</span> Registrar Nuevo Aprendiz en la Ficha
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem;">
          <div>
            <label class="form-label" style="font-size: 0.72rem;">Tipo Doc:</label>
            <select class="form-select" id="newApTipo" style="font-size: 0.82rem; padding: 0.4rem;">
              <option value="CC">C.C. Cédula</option>
              <option value="TI">T.I. Tarjeta Identidad</option>
              <option value="CE">C.E. Cédula Extranjería</option>
              <option value="PEP">PEP / PPT</option>
            </select>
          </div>
          <div>
            <label class="form-label" style="font-size: 0.72rem;">Número de Documento:</label>
            <input type="text" class="form-input" id="newApDoc" placeholder="1001234567" style="font-size: 0.82rem; padding: 0.4rem;">
          </div>
          <div>
            <label class="form-label" style="font-size: 0.72rem;">Nombres:</label>
            <input type="text" class="form-input" id="newApNombres" placeholder="Nombres" style="font-size: 0.82rem; padding: 0.4rem;">
          </div>
          <div>
            <label class="form-label" style="font-size: 0.72rem;">Apellidos:</label>
            <input type="text" class="form-input" id="newApApellidos" placeholder="Apellidos" style="font-size: 0.82rem; padding: 0.4rem;">
          </div>
          <div>
            <label class="form-label" style="font-size: 0.72rem;">Ficha:</label>
            <input type="text" class="form-input" id="newApFicha" value="2824560" style="font-size: 0.82rem; padding: 0.4rem;">
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 0.85rem;">
          <button class="btn-action primary" onclick="window.app.saveNewAprendiz()" style="padding: 0.45rem 1.15rem; font-size: 0.82rem;">
            💾 Guardar Aprendiz
          </button>
        </div>
      </div>

      <!-- Tabla de Aprendices Existentes -->
      <div style="max-height: 280px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: var(--radius-sm); margin-bottom: 1.25rem;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
          <thead>
            <tr style="background: rgba(255,255,255,0.05); color: var(--text-dim); border-bottom: 1px solid var(--border-color);">
              <th style="padding: 8px 10px; width: 35px;">N°</th>
              <th style="padding: 8px 10px;">Doc. Identidad</th>
              <th style="padding: 8px 10px;">Nombres y Apellidos</th>
              <th style="padding: 8px 10px;">Ficha</th>
              <th style="padding: 8px 10px; text-align: center; width: 140px;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${list.map((a, idx) => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                <td style="padding: 8px 10px; color: var(--text-dim);">${idx + 1}</td>
                <td style="padding: 8px 10px; font-weight: 600; color: #fff;">${a.tipo_doc} ${a.documento}</td>
                <td style="padding: 8px 10px;">${a.nombres} ${a.apellidos}</td>
                <td style="padding: 8px 10px; color: var(--text-dim);">${a.ficha}</td>
                <td style="padding: 8px 10px; text-align: center;">
                  <button type="button" onclick="window.app.selectAprendizFromModal('${a.documento}')" style="background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); color: #34d399; border-radius: 4px; padding: 2px 7px; font-size: 0.72rem; cursor: pointer; margin-right: 4px;">
                    🎯 Evaluar
                  </button>
                  <button type="button" onclick="window.app.deleteAprendiz(${a.id})" style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #f87171; border-radius: 4px; padding: 2px 7px; font-size: 0.72rem; cursor: pointer;">
                    🗑️
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Importación Masiva y Reset -->
      <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 1rem;">
        <details>
          <summary style="font-size: 0.82rem; font-weight: 700; color: var(--text-dim); cursor: pointer;">
            📋 Importar Aprendices en Masa (Pegar desde Excel o SofiaPlus)
          </summary>
          <div style="margin-top: 0.75rem;">
            <p style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.4rem;">
              Pegue una lista separada por tabulación o comas con el formato: <code>Documento [TAB] Nombre Completo [TAB] Correo [TAB] Ficha</code>
            </p>
            <textarea id="importAprendicesText" class="form-input" style="width: 100%; height: 80px; font-size: 0.78rem; font-family: monospace;" placeholder="1001234567	Alejandro Morales Gómez	amorales@soy.sena.edu.co	2824560"></textarea>
            <div style="display: flex; justify-content: flex-end; margin-top: 0.5rem; gap: 0.5rem;">
              <button class="btn-action" onclick="window.app.importAprendicesMassive()" style="padding: 0.4rem 1rem; font-size: 0.78rem; border-color: rgba(56,189,248,0.4); color: #38bdf8;">
                📥 Procesar Importación
              </button>
            </div>
          </div>
        </details>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.25rem;">
        <button class="btn-action" onclick="window.app.resetAprendicesDB()" style="font-size: 0.75rem; color: #94a3b8; border-color: rgba(148,163,184,0.3);">
          🔄 Restablecer Aprendices de Muestra
        </button>
        <button class="btn-action primary" onclick="window.app.closeModal()" style="padding: 0.45rem 1.25rem; font-size: 0.82rem;">
          Cerrar
        </button>
      </div>
    `;

    modal.classList.add('open');
  }

  saveNewAprendiz() {
    const tipo = document.getElementById('newApTipo')?.value || 'CC';
    const doc = document.getElementById('newApDoc')?.value?.trim();
    const nombres = document.getElementById('newApNombres')?.value?.trim();
    const apellidos = document.getElementById('newApApellidos')?.value?.trim();
    const ficha = document.getElementById('newApFicha')?.value?.trim() || '2824560';

    if (!doc || !nombres) {
      this.showToast('⚠️ Ingrese al menos el documento y los nombres del aprendiz');
      return;
    }

    addAprendiz({
      tipo_doc: tipo,
      documento: doc,
      nombres: nombres,
      apellidos: apellidos || '',
      correo: `${doc}@soy.sena.edu.co`,
      ficha: ficha
    });

    this.documentBuilder.selectedAprendizDoc = doc;
    const apSelect = document.getElementById('aprendizSelect');
    if (apSelect && this.documentBuilder.renderAprendizOptions) {
      apSelect.innerHTML = this.documentBuilder.renderAprendizOptions(doc);
    }
    this.documentBuilder.updatePreview();
    this.openAprendicesModal();
    this.showToast(`✅ Aprendiz ${nombres} registrado exitosamente`);
  }

  deleteAprendiz(id) {
    deleteAprendiz(id);
    const apSelect = document.getElementById('aprendizSelect');
    if (apSelect && this.documentBuilder.renderAprendizOptions) {
      apSelect.innerHTML = this.documentBuilder.renderAprendizOptions();
    }
    this.documentBuilder.updatePreview();
    this.openAprendicesModal();
    this.showToast('🗑️ Aprendiz eliminado');
  }

  selectAprendizFromModal(documento) {
    this.closeModal();
    this.changeSelectedAprendiz(documento);
  }

  importAprendicesMassive() {
    const text = document.getElementById('importAprendicesText')?.value;
    if (!text || !text.trim()) {
      this.showToast('⚠️ Pegue el texto con los aprendices a importar');
      return;
    }
    const updated = importAprendicesFromText(text);
    const apSelect = document.getElementById('aprendizSelect');
    if (apSelect && this.documentBuilder.renderAprendizOptions) {
      apSelect.innerHTML = this.documentBuilder.renderAprendizOptions();
    }
    this.documentBuilder.updatePreview();
    this.openAprendicesModal();
    this.showToast(`✅ Se procesó la lista. Total: ${updated.length} aprendices`);
  }

  resetAprendicesDB() {
    resetAprendices();
    const apSelect = document.getElementById('aprendizSelect');
    if (apSelect && this.documentBuilder.renderAprendizOptions) {
      apSelect.innerHTML = this.documentBuilder.renderAprendizOptions();
    }
    this.documentBuilder.updatePreview();
    this.openAprendicesModal();
    this.showToast('🔄 Lista de aprendices restablecida');
  }

  exportInstrumentoExcel() {
    const centro = document.getElementById('centroInput')?.value || 'Centro Tecnológico del Mobiliario - Centro de Servicios y Gestión Empresarial';
    const instructor = document.getElementById('instructorInput')?.value || 'Equipo de Desarrollo Curricular 3D & Nuevas Tecnologías';
    const xml = this.documentBuilder.generateMultiSheetExcelXML(this.documentBuilder.currentRap, centro, instructor);
    
    const blob = new Blob([xml], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const ap = this.documentBuilder.getActiveAprendiz();
    const docTag = ap ? ap.documento : 'Aprendiz';
    a.download = `Lista_Chequeo_${this.documentBuilder.currentRap}_${docTag}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast(`📥 Archivo Excel descargado: 2 Hojas (DB Aprendices + Lista de Chequeo)`);
  }


  closeModal() {
    const modal = document.getElementById('rapModal');
    if (modal) modal.classList.remove('open');
  }
}

// Global instance
window.app = new App();
window.addEventListener('DOMContentLoaded', () => {
  window.app.init();
});
