import { RAPS_TECNICOS, RAPS_TRANSVERSALES } from '../data/normas-raps.js';
import { CURRICULO_TECNOLOGO } from '../data/curriculo-tecnologo.js';
import { CURRICULO_MODELADO } from '../data/curriculo-modelado.js';
import { CURRICULO_ANIMACION } from '../data/curriculo-animacion.js';

export class CurriculumTable {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.filterType = 'all'; // all, tecnico, transversal
  }

  render(programType = 'tecnologo') {
    if (!this.container) return;

    let curriculo = CURRICULO_TECNOLOGO;
    if (programType === 'modelado') curriculo = CURRICULO_MODELADO;
    if (programType === 'animacion') curriculo = CURRICULO_ANIMACION;

    this.container.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <h2 style="font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em;">Malla Curricular por Trimestres y Resultados de Aprendizaje</h2>
            <p style="color: var(--text-muted); font-size: 0.95rem;">Distribución exacta de horas, competencias laborales y evidencias de aprendizaje.</p>
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
                    <!-- Botón para Agregar Nuevo RAP a este Trimestre (Señalado en captura) -->
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
                        const evidencia = data.evidencia;

                        return `
                          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: all 0.2s; ${isApagado ? 'opacity: 0.45; filter: grayscale(0.7); background: rgba(0,0,0,0.25);' : ''}" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='${isApagado ? 'rgba(0,0,0,0.25)' : 'transparent'}'">
                            <td style="padding: 1rem 0.5rem; vertical-align: top;">
                              <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
                                <span class="badge ${isApagado ? '' : (isTecnico ? 'cyan' : 'purple')}" style="${isApagado ? 'background: rgba(100,116,139,0.3); color: #94a3b8; border-color: #64748b;' : ''}">${labelId}</span>
                                ${isApagado ? '<span style="font-size: 0.68rem; padding: 1px 5px; border-radius: 4px; background: rgba(234, 179, 8, 0.15); color: var(--accent-amber); border: 1px solid rgba(234, 179, 8, 0.3); font-weight: 700;">🔌 Apagado</span>' : ''}
                                ${data._custom && !isApagado ? '<span style="font-size: 0.68rem; padding: 1px 5px; border-radius: 4px; background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 700;">Editado</span>' : ''}
                              </div>
                            </td>
                            <td style="padding: 1rem 0.5rem; vertical-align: top;">
                              <span style="font-size: 0.75rem; color: ${isApagado ? 'var(--text-dim)' : (isTecnico ? 'var(--accent-cyan)' : 'var(--accent-purple)')}; font-weight: 700;">
                                ${isTecnico ? 'ESPECÍFICO 3D' : 'TRANSVERSAL'}
                              </span>
                            </td>
                            <td style="padding: 1rem 0.5rem; vertical-align: top;">
                              <div style="font-weight: 600; color: ${isApagado ? 'var(--text-muted)' : 'var(--text-main)'}; margin-bottom: 0.35rem; line-height: 1.4; ${isApagado ? 'text-decoration: line-through;' : ''}">${nombreRap}</div>
                              <div style="font-size: 0.78rem; color: var(--text-dim);"><strong>Competencia:</strong> ${normaNombre}</div>
                            </td>
                            <td style="padding: 1rem 0.5rem; vertical-align: top;">
                              <div style="font-size: 0.85rem; color: var(--text-muted); background: rgba(255,255,255,0.03); padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05);">
                                📦 ${evidencia}
                              </div>
                            </td>
                            <td style="padding: 1rem 0.5rem; vertical-align: top; text-align: right; font-weight: 700; color: var(--text-main);">
                              ${isApagado ? `
                                <span style="text-decoration: line-through; color: var(--text-dim);">${data.horas || r.horas} h</span>
                                <div style="font-size: 0.7rem; color: var(--accent-amber); font-weight: 600;">(Inactivo)</div>
                              ` : `
                                ${data.horas || r.horas} h
                                <div style="font-size: 0.72rem; color: var(--text-dim); font-weight: normal;">${data.creditos || data.creditos_competencia || r.creditos} Créd.</div>
                              `}
                            </td>
                            <td style="padding: 1rem 0.5rem; vertical-align: top; text-align: center;">
                              <button class="btn-action" style="padding: 0.35rem 0.75rem; font-size: 0.78rem; ${isTecnico ? '' : 'border-color: rgba(168, 85, 247, 0.4); color: var(--accent-purple);'}" onclick="window.app.showRapModal('${r.rap_id}')">
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
