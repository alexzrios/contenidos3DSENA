// ====================================================================
// BASE DE DATOS Y GESTOR DE ESTADO DEL PROYECTO FORMATIVO SENA (GFPI-F-016)
// Tecnólogo en Producción de Contenidos 3D
// ====================================================================

export const PROYECTO_FORMATIVO_DEFAULT = {
  "codigo_formato": "GFPI-F-016",
  "version": "03",
  "info_basica": {
    "centro": "Centro Tecnológico del Mobiliario - Centro de Servicios y Gestión Empresarial",
    "regional": "ANTIOQUIA - ITAGÜÍ",
    "nombre_proyecto": "Desarrollo de Soluciones Integrales en Tecnologías 3D: Prototipos de Manufactura (3D para Hacer), Secuencias Cinemáticas Híbridas (3D para Ver) y Simuladores Interactivos en Tiempo Real (3D para Interactuar) para el Sector Productivo.",
    "codigo_proyecto": "PRY-3D-2026-SENA-016",
    "programa": "TECNOLOGÍA EN PRODUCCIÓN DE CONTENIDOS 3D",
    "codigo_programa": "522301",
    "version_programa": "1",
    "tiempo_ejecucion_horas": 3120,
    "creditos_totales": 65,
    "palabras_clave": "Tecnologías 3D, Manufactura Aditiva, Impresión 3D, CAD Paramétrico, BIM, Estándar IFC, Animación 3D, Teaser Cinemático, VFX Asistido por IA, ControlNet, Pases 3D, Gemelo Digital, Tiempo Real, 60 FPS, VR-Ready, OpenXR, Scripting POO, C#, Unreal Engine, Unity, Blender."
  },
  "macroproyectos": [
    {
      "id": "MP1",
      "nombre": "3D PARA HACER",
      "subtitulo": "Diseño de Producto, Manufactura Aditiva y Activos para Entornos Interactivos en Tiempo Real",
      "horas": 672,
      "creditos": 14,
      "guias_rango": "GUÍA 01 a GUÍA 14",
      "raps": [
        "RAP 01",
        "RAP 02",
        "RAP 03",
        "RAP 04",
        "RAP 05",
        "RAP 06"
      ],
      "entregables": [
        "Producto Técnico Funcional modelado en CAD paramétrico hard-surface con árbol histórico editable y tolerancias dimensionales.",
        "Manual Técnico del Producto con plano normado en vista explosionada (Exploded View), tabla de partes (BOM) y guía de ensamble paso a paso.",
        "Pieza fabricada físicamente en 3D (FDM/SLA) o paquete de instrucciones numéricas y simulación de laminación digital verificada (G-Code/.3mf) con reporte de tolerancias.",
        "Personaje antropomórfico único (robot bípedo o criatura antropomórfica) esculpido anatómicamente, retopologizado en baja densidad (quads) y texturizado PBR.",
        "Ambiente espacial cerrado (planta industrial/laboratorio) modelado bajo estándar abierto BIM / IFC con propiedades y memoria descriptiva."
      ]
    },
    {
      "id": "MP2",
      "nombre": "3D PARA VER",
      "subtitulo": "Teaser Cinemático de 60 Segundos: Narrativa Visual, Animación y VFX Híbrido con IA",
      "horas": 672,
      "creditos": 14,
      "guias_rango": "GUÍA 15 a GUÍA 28",
      "raps": [
        "RAP 07",
        "RAP 08",
        "RAP 09",
        "RAP 10",
        "RAP 11",
        "RAP 12",
        "RAP 13"
      ],
      "entregables": [
        "Biblia de preproducción con guion técnico en tres actos, clasificación de tomas y storyboard estructurado.",
        "Hojas de modelo (Model Sheets) ortográficas del personaje antropomórfico y props con guía de color y estilo.",
        "Previsualización 3D en gris (Playblast) de la animación de cámaras y ritmos cinematográficos a 24 fps.",
        "Sistema de armadura (Rigging IK/FK) y datos de captura de movimiento (MoCap) integrados y depurados.",
        "Plantillas de prompts técnicos parametrizados con adaptadores de control estructural (ControlNet / IP-Adapter).",
        "Secuencias de video renderizadas mediante difusión guiada por pases 3D (Depth/Normal) con estabilidad temporal y deflicker.",
        "Teaser audiovisual final de 60 segundos compuesto por nodos, con graduación de color (ACES), sonorización Foley y exportación máster."
      ]
    },
    {
      "id": "MP3",
      "nombre": "3D PARA INTERACTUAR",
      "subtitulo": "Gemelo Digital y Simulador Interactivo Multiplataforma (VR-Ready / PC Simulator)",
      "horas": 432,
      "creditos": 9,
      "guias_rango": "GUÍA 29 a GUÍA 37",
      "raps": [
        "RAP 14",
        "RAP 15",
        "RAP 16"
      ],
      "entregables": [
        "Escena 3D del entorno cerrado completamente optimizada para tiempo real a 60 FPS estables con LODs y mapas de luz horneados (Lightmaps).",
        "Sistema de locomoción dual implementado: Teletransporte (Teleport) para VR y controlador en primera persona para simulador de PC (teclado/ratón).",
        "Mecánicas de interacción física: activar, mover y manipular piezas componentes del producto técnico.",
        "Configurador dinámico de materiales en tiempo real con disparador de feedback multisensorial (audio y partículas).",
        "Interfaz de usuario espacial (UI/UX) con menú 3D flotante (World-Space UI) y lectura de telemetría.",
        "Personaje antropomórfico integrado en la escena cumpliendo el rol de asistente y guía interactivo animado.",
        "Aplicación ejecutable interactiva multiplataforma (.exe / WebGL) verificada sin errores de compilación."
      ]
    }
  ],
  "problema": {
    "descripcion": "El sector productivo moderno exige la transformación digital acelerada de sus procesos industriales, comerciales y formativos, demandando soluciones de prototipado rápido, contenidos audiovisuales de alto impacto y simuladores interactivos en tiempo real. No obstante, existe una brecha crítica en el talento humano: la mayoría de los programas tradicionales de formación forman para la industria del entretenimiento sin abordar las especificaciones de manufactura técnica, o carecen del dominio de las tecnologías emergentes de aceleración por Inteligencia Artificial y flujos en tiempo real (Gemelos Digitales a 60 FPS / VR).",
    "pregunta_investigacion": "¿De qué manera el desarrollo de un portafolio técnico integral estructurado en tres macroproyectos (3D para Hacer, 3D para Ver y 3D para Interactuar) permite al aprendiz dominar el ciclo completo de la industria 4.0, articulando técnicas canónicas y flujos híbridos asistidos por IA para responder a las demandas del sector productivo?",
    "causas": [
      "Formación desarticulada del entorno productivo: Planes de estudio centrados en ejercicios teóricos o sin aplicación a especificaciones industriales reales.",
      "Desconocimiento del flujo híbrido con Inteligencia Artificial: Ineficiencia en tiempos de producción al ignorar la aceleración por difusión guiada, autorretopología y scripting asistido por LLMs.",
      "Aislamiento entre diseño técnico e interactividad: Escasez de profesionales que conecten el modelado paramétrico de ingeniería y manufactura con motores en tiempo real y visualización espacial."
    ],
    "consecuencias": [
      "Pérdida de competitividad en empresas locales al verse obligadas a contratar desarrollo de activos y simuladores en el exterior a costos elevados.",
      "Subutilización del talento de los egresados por falta de un portafolio técnico versátil y comprobable.",
      "Rezago en la adopción de tecnologías de Gemelos Digitales e Industria 4.0 en el ecosistema productivo nacional."
    ]
  },
  "justificacion": "La Tecnología en Producción de Contenidos 3D del SENA responde de manera contundente a las necesidades del sector productivo mediante una pedagogía de Aprendizaje Basado en Proyectos (ABP) de vanguardia internacional. Este proyecto formativo dota al aprendiz de un perfil altamente competitivo al estructurarse en tres macroproyectos interconectados donde ningún activo se pierde: los activos creados en '3D para Hacer' (producto técnico, personaje antropomorfo y planta industrial BIM) se convierten en los protagonistas del 'Teaser Cinemático de 60s' en '3D para Ver', y culminan como el 'Gemelo Digital y Simulador Interactivo' en '3D para Interactuar'. La integración del flujo híbrido asistido por IA elimina tareas repetitivas y potencia la creatividad, garantizando que el egresado sea un líder de producción capaz de desenvolverse en manufactura aditiva, producción cinematográfica y desarrollo interactivo en tiempo real.",
  "objetivos": {
    "general": "Desarrollar soluciones digitales e interactivas integrales en Tecnologías 3D para el sector productivo, estructuradas en tres macroproyectos: prototipos de producto con manufactura aditiva y BIM (3D para Hacer), un teaser cinemático de 60 segundos con animación y VFX generativo (3D para Ver), y un simulador interactivo de Gemelo Digital multiplataforma (3D para Interactuar), cumpliendo con estándares técnicos de la industria y la normatividad laboral vigente.",
    "especificos": [
      "Modelar y documentar un producto técnico CAD hard-surface con manual de ensamble explosionado (Exploded View), fabricar o simular su manufactura aditiva 3D y estructurar el entorno cerrado en estándar abierto BIM / IFC.",
      "Esculpir, retopologizar en cuadriláteros y texturizar bajo estándares PBR un personaje antropomórfico único (criatura antropomórfica o robot bípedo) optimizado para entornos de tiempo real.",
      "Producir un teaser cinemático de 60 segundos en un solo entorno con 1-2 personajes, aplicando previsualización 3D, armaduras (Rigging IK/FK), captura de movimiento MoCap, renderizado por difusión guiada con pases 3D y composición nodal en espacio de color ACES.",
      "Programar y compilar una aplicación interactiva multiplataforma de un Gemelo Digital a 60 FPS estables (VR-Ready / Simulador de PC), incorporando teletransporte, manipulación física de piezas del producto, configurador dinámico de materiales con feedback y el personaje antropomórfico como guía.",
      "Consolidar y sustentar el portafolio profesional técnico del egresado ante el sector productivo y comité evaluador institucional."
    ]
  },
  "alcance": {
    "beneficiarios_directos": "Aprendices del programa técnico-tecnológico SENA, quienes construyen un portafolio profesional de nivel internacional de triple enfoque (producto, cine/VFX e interactividad en tiempo real).",
    "beneficiarios_indirectos": "Empresas de los sectores industrial, arquitectónico, publicitario, videojuegos y manufactura aditiva en Colombia, que acceden a talento humano calificado en tecnologías 4.0.",
    "impacto_social": "Democratización del acceso a tecnologías de frontera (VR, IA generativa, CAD, BIM) y alta empleabilidad de los jóvenes en industrias creativas y tecnológicas.",
    "impacto_economico": "Reducción de costos para el empresariado colombiano al sustituir importación de servicios digitales y acelerar los tiempos de validación de prototipos.",
    "impacto_ambiental": "Disminución del desperdicio de material físico gracias a la simulación computacional de tolerancias y optimización de infill en manufactura aditiva.",
    "impacto_tecnologico": "Apropiación e investigación aplicada de pipelines híbridos (3D tradicional + redes de difusión + OpenXR + IFC abierto)."
  }
};

const STORAGE_KEY = 'sena_proyecto_formativo_data';

export function getProyectoFormativo() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = jsonDeepMerge(PROYECTO_FORMATIVO_DEFAULT, JSON.parse(saved));
      return parsed;
    }
  } catch (e) {
    console.warn('Error al cargar proyecto formativo desde localStorage:', e);
  }
  return JSON.parse(JSON.stringify(PROYECTO_FORMATIVO_DEFAULT));
}

export function saveProyectoFormativo(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Error al guardar proyecto formativo:', e);
    return false;
  }
}

export function resetProyectoFormativo() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return JSON.parse(JSON.stringify(PROYECTO_FORMATIVO_DEFAULT));
  } catch (e) {
    console.error('Error al resetear proyecto formativo:', e);
    return PROYECTO_FORMATIVO_DEFAULT;
  }
}

export function getMacroproyectoForRap(rapId) {
  const cleanId = String(rapId || '').replace('-', ' ').trim().toUpperCase();
  const pf = getProyectoFormativo();
  if (!pf || !pf.macroproyectos) return null;
  return pf.macroproyectos.find(mp => (mp.raps || []).some(r => r.toUpperCase() === cleanId)) || pf.macroproyectos[0];
}

function jsonDeepMerge(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = jsonDeepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}
