import { RAPS_TECNICOS } from '../data/normas-raps.js';

export class PipelineViewer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(programType = 'tecnologo') {
    if (!this.container) return;

    let stages = [];

    if (programType === 'tecnologo') {
      stages = [
        {
          id: 'preprod',
          title: '1. Preproducción y Guionismo Técnico',
          color: 'var(--accent-purple)',
          tag: 'Narrativa & Concept',
          desc: 'Escritura de guion técnico, storyboards, hojas de modelo (Model Sheets) y clasificación de rutas (Directa vs Previs 3D).',
          raps: ['RAP-07', 'RAP-08'],
          hibrido_ia: 'Generación de conceptos visuales consistentes (Diffusion) y asistencia en redacción narrativa con LLMs.'
        },
        {
          id: 'modelado',
          title: '2. Escultura Digital, Retopología y Superficies',
          color: 'var(--accent-cyan)',
          tag: 'Activos 3D Base',
          desc: 'Escultura orgánica con volúmenes anatómicos, retopología limpia en cuadriláteros (quads), despliegue UV y texturizado PBR.',
          raps: ['RAP-01', 'RAP-02', 'RAP-03'],
          hibrido_ia: 'Síntesis de mallas base 3D (Image-to-3D), autorretopología neuronal y generación procedural de mapas PBR.'
        },
        {
          id: 'cad_bim',
          title: '3. CAD Paramétrico, Impresión 3D y BIM',
          color: 'var(--accent-amber)',
          tag: 'Ingeniería & Espacio',
          desc: 'Modelado CAD hard-surface con tolerancias de manufactura, laminación para impresión 3D (G-Code) y coordinación BIM (IFC).',
          raps: ['RAP-04', 'RAP-05', 'RAP-06'],
          hibrido_ia: 'Automatización de scripts CAD con LLMs y optimización asistida de estructuras de infill para manufactura aditiva.'
        },
        {
          id: 'animacion',
          title: '4. Cinemática, Rigging y Deformación',
          color: 'var(--accent-blue)',
          tag: 'Movimiento & Actuación',
          desc: 'Maquetado 3D (Previs), cinemática de cámaras, jerarquías de huesos (IK/FK), pesado de vértices y captura de movimiento (MoCap).',
          raps: ['RAP-09', 'RAP-10'],
          hibrido_ia: 'Markerless MoCap por visión artificial (extracción de movimiento desde video monocular) y auto-rigging asistido.'
        },
        {
          id: 'vfx_ia',
          title: '5. Difusión Guiada por 3D & VFX Generativo',
          color: 'var(--accent-rose)',
          tag: 'VFX Asistido',
          desc: 'Ingeniería de prompts de producción, vinculación de pases geométricos 3D (Depth, Normals) a motores de difusión y consistencia temporal.',
          raps: ['RAP-11', 'RAP-12'],
          hibrido_ia: 'Render sintético guiado por pases 3D (ControlNet / Adapters) con eliminación de flicker e interpolación de flujo óptico.'
        },
        {
          id: 'realtime',
          title: '6. Tiempo Real, Scripting y Gemelos Digitales',
          color: 'var(--accent-emerald)',
          tag: 'Interactividad & 60 FPS',
          desc: 'Optimización de escenas para motores gráficos (LODs, Lightmaps), programación orientada a objetos (C# / Blueprints) y despliegue multi-plataforma.',
          raps: ['RAP-14', 'RAP-15', 'RAP-16'],
          hibrido_ia: 'Copilotos de código para scripts interactivos y generación de interfaces visuales UI adaptativas.'
        },
        {
          id: 'postprod',
          title: '7. Composición Nodal, Sonorización y Entrega',
          color: 'var(--accent-indigo)',
          tag: 'Acabado Master',
          desc: 'Composición multicapa por nodos, corrección de color cinemática (ACES), masterización de audio y montaje final.',
          raps: ['RAP-13'],
          hibrido_ia: 'Segmentación y rotoscopia neuronal (Segment Anything), inpainting fotograma a fotograma y restauración de audio.'
        }
      ];
    } else if (programType === 'modelado') {
      stages = [
        {
          id: 'escultura',
          title: '1. Escultura Orgánica y Bloqueo 3D',
          color: 'var(--accent-amber)',
          tag: 'Volumen & Anatomía',
          desc: 'Estudio de proporciones, siluetas, blocking primario y pinceles de escultura digital.',
          raps: ['RAP-01'],
          hibrido_ia: 'Generadores de mallas base 3D por síntesis de imagen para acelerar el blocking volumétrico.'
        },
        {
          id: 'topologia_uv',
          title: '2. Retopología en Quads y Despliegue UV',
          color: 'var(--accent-cyan)',
          tag: 'Eficiencia Geométrica',
          desc: 'Flujo de bordes para deformación, optimización poligonal y empaquetado UV sin distorsión.',
          raps: ['RAP-02'],
          hibrido_ia: 'Algoritmos neuronales de autorretopología y asistentes automáticos de empaquetado UV.'
        },
        {
          id: 'pbr',
          title: '3. Texturizado PBR y Shading Físico',
          color: 'var(--accent-purple)',
          tag: 'Materiales Físicos',
          desc: 'Baking de mapas de normales/AO, pintura por capas de rugosidad/metalicidad y shaders nodales.',
          raps: ['RAP-03'],
          hibrido_ia: 'Generación sintética de mapas PBR Seamless (Albedo, Normal, Roughness) a partir de referencias 2D.'
        },
        {
          id: 'cad',
          title: '4. Modelado Paramétrico CAD Hard-Surface',
          color: 'var(--accent-blue)',
          tag: 'Ingeniería Mecánica',
          desc: 'Croquizado 2D, operaciones booleanas, tolerancias de ensamble y planos normalizados.',
          raps: ['RAP-04'],
          hibrido_ia: 'Automatización de patrones complejos mediante scripts generados por modelos de lenguaje (LLMs).'
        },
        {
          id: 'fabricacion',
          title: '5. Laminación e Impresión 3D (FDM / SLA)',
          color: 'var(--accent-emerald)',
          tag: 'Manufactura Aditiva',
          desc: 'Configuración de parámetros de corte, estructuras de soporte, simulación y generación de G-Code.',
          raps: ['RAP-05'],
          hibrido_ia: 'Optimización asistida de densidad de relleno (infill) para maximizar resistencia mecánica y ahorrar material.'
        },
        {
          id: 'bim',
          title: '6. Coordinación BIM y Estándares Abiertos IFC',
          color: 'var(--accent-indigo)',
          tag: 'Espacios & Metodología BIM',
          desc: 'Modelado de elementos paramétricos constructivos, conjuntos de propiedades (Psets) y cómputos métricos.',
          raps: ['RAP-06'],
          hibrido_ia: 'Generación automatizada de memorias descriptivas técnicas y tablas de planificación con LLMs.'
        }
      ];
    } else {
      // Animación
      stages = [
        {
          id: 'guion_story',
          title: '1. Guion Técnico y Storyboard',
          color: 'var(--accent-purple)',
          tag: 'Preproducción',
          desc: 'Estructura dramática en tres actos, clasificación de tomas y ruta de pipeline (Directa vs Previs 3D).',
          raps: ['RAP-07'],
          hibrido_ia: 'Asistencia en desarrollo de escaletas narrativas y prototipado visual de viñetas con IA generativa.'
        },
        {
          id: 'concept_art',
          title: '2. Concept Art y Hojas de Modelo (Asset-First)',
          color: 'var(--accent-amber)',
          tag: 'Arte & Estilo',
          desc: 'Model Sheets ortográficos (front, side, back) de personajes y props con coherencia de color y estilo.',
          raps: ['RAP-08'],
          hibrido_ia: 'Generación asistida de vistas ortogonales consistentes mediante motores de difusión e IP-Adapter.'
        },
        {
          id: 'previs_3d',
          title: '3. Previsualización 3D y Cámaras Cinemáticas',
          color: 'var(--accent-blue)',
          tag: 'Cinematografía Digital',
          desc: 'Composición de encuadres, lentes virtuales, animación de trayectorias continuas y ritmo dinámico en Playblast.',
          raps: ['RAP-09'],
          hibrido_ia: 'Alineación de blocking escénico para guiar adaptadores estructurales espaciales.'
        },
        {
          id: 'rig_mocap',
          title: '4. Rigging, Deformación y Captura de Movimiento',
          color: 'var(--accent-cyan)',
          tag: 'Actuación 3D',
          desc: 'Cadenas IK/FK, pintura de pesos de vértices (skinning) y retargeting de datos de movimiento en la armadura.',
          raps: ['RAP-10'],
          hibrido_ia: 'Markerless MoCap por visión artificial para convertir tomas de video reales en animación de esqueletos 3D.'
        },
        {
          id: 'prompts',
          title: '5. Ingeniería de Prompts Técnicos y Restricciones',
          color: 'var(--accent-rose)',
          tag: 'Control Generativo',
          desc: 'Matrices modulares de prompts, descriptores cinematográficos, pesos sintácticos y control de semillas numéricas.',
          raps: ['RAP-11'],
          hibrido_ia: 'Reglas de restricción lógica y adaptadores para eliminar la aleatoriedad en el render sintético.'
        },
        {
          id: 'render_difusion',
          title: '6. Renderizado Guiado por Pases 3D (ControlNet)',
          color: 'var(--accent-emerald)',
          tag: 'Síntesis Cinemática',
          desc: 'Exportación de pases AOV (Depth, Normals) vinculados a modelos de difusión para estilizado consistente.',
          raps: ['RAP-12'],
          hibrido_ia: 'Control de estabilidad temporal con filtros de deflicker e interpolación de flujo óptico neuronal.'
        },
        {
          id: 'post_master',
          title: '7. Composición Nodal, Colorimetría y Master Final',
          color: 'var(--accent-indigo)',
          tag: 'Entrega Audiovisual',
          desc: 'Integración nodal de capas, corrección de color (ACES/Rec.709), sincronía de sonido y exportación máster.',
          raps: ['RAP-13'],
          hibrido_ia: 'Rotoscopia automatizada con Segment Anything y limpieza de detalles fotograma a fotograma (Inpainting).'
        }
      ];
    }

    this.container.innerHTML = `
      <div class="pipeline-container">
        <div style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h2 style="font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em;">Infografía del Pipeline de Producción Híbrido (3D + IA)</h2>
            <p style="color: var(--text-muted); font-size: 0.95rem;">Flujo técnico integral que articula las Normas de Competencia y RAPs con tecnologías avanzadas de la industria.</p>
          </div>
          <span class="badge cyan" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">✨ 100% Alineado con Formación Profesional SENA</span>
        </div>

        ${stages.map((stage, idx) => {
          const num = idx + 1;
          let phvaTexto = `FASE ${num}`;
          let phvaBg = 'rgba(255, 255, 255, 0.05)';
          let phvaColor = 'var(--text-dim)';
          let phvaBorder = 'rgba(255, 255, 255, 0.1)';

          if (num === 1) {
            phvaTexto = 'FASE 1 (PLANEAR)';
            phvaBg = 'rgba(56, 189, 248, 0.18)';
            phvaColor = '#38bdf8';
            phvaBorder = 'rgba(56, 189, 248, 0.45)';
          } else if (num >= 2 && num <= 4) {
            phvaTexto = `FASE ${num} (HACER)`;
            phvaBg = 'rgba(16, 185, 129, 0.18)';
            phvaColor = '#10b981';
            phvaBorder = 'rgba(16, 185, 129, 0.45)';
          } else if (num === 5 || num === 6) {
            phvaTexto = `FASE ${num} (VERIFICAR)`;
            phvaBg = 'rgba(245, 158, 11, 0.18)';
            phvaColor = '#f59e0b';
            phvaBorder = 'rgba(245, 158, 11, 0.45)';
          } else if (num === 7) {
            phvaTexto = 'FASE 7 (ACTUAR)';
            phvaBg = 'rgba(168, 85, 247, 0.18)';
            phvaColor = '#a855f7';
            phvaBorder = 'rgba(168, 85, 247, 0.45)';
          }

          return `
          <div class="pipeline-stage-card" style="border-left: 4px solid ${stage.color};">
            <div class="stage-header">
              <div class="stage-title">
                <span style="color: ${stage.color}; font-weight: 800;">${stage.title}</span>
                <span class="stage-pill" style="border: 1px solid ${stage.color}40; color: ${stage.color};">${stage.tag}</span>
              </div>
              <span style="font-size: 0.82rem; font-weight: 800; padding: 0.3rem 0.75rem; border-radius: 6px; background: ${phvaBg}; color: ${phvaColor}; border: 1px solid ${phvaBorder}; letter-spacing: 0.03em; display: inline-flex; align-items: center; gap: 0.35rem; box-shadow: 0 2px 6px rgba(0,0,0,0.25);">
                <span>📌</span> ${phvaTexto}
              </span>
            </div>

            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">${stage.desc}</p>

            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 0.85rem 1rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 1.1rem;">⚡</span>
              <div>
                <strong style="color: var(--accent-cyan); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em;">Aceleración e Innovación Asistida por IA:</strong>
                <p style="font-size: 0.85rem; color: var(--text-main); margin-top: 0.15rem;">${stage.hibrido_ia}</p>
              </div>
            </div>

            <div>
              <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 0.75rem; letter-spacing: 0.04em;">Resultados de Aprendizaje (RAPs) Asociados:</div>
              <div class="raps-grid">
                ${stage.raps.map(rapId => {
                  const rap = RAPS_TECNICOS[rapId];
                  if (!rap) return '';
                  return `
                    <div class="rap-card" onclick="window.app.showRapModal('${rapId}')">
                      <div>
                        <div class="rap-header">
                          <span class="rap-id">${rap.id}</span>
                          <span class="rap-hours">${rap.horas} Horas (${rap.creditos_competencia} Créditos)</span>
                        </div>
                        <div class="rap-text">${rap.resultado_aprendizaje}</div>
                      </div>
                      <div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem;"><strong>Producto:</strong> ${rap.producto_egresado}</div>
                        <div class="rap-tags">
                          ${rap.herramientas_recomendadas.map(tool => `<span class="rap-tag">${tool}</span>`).join('')}
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
          `;
        }).join('')}
      </div>
    `;
  }
}
