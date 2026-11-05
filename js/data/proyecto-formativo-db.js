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
  },
  "restricciones_riesgos": [
    {
      "id": 1,
      "nombre": "La obsolescencia tecnológica del software y hardware.",
      "descripcion": "El campo de la animación 3D avanza a un ritmo acelerado. Las herramientas, plugins y pipelines de producción pueden volverse obsoletos en poco tiempo. Si el equipamiento o el software utilizado en el proyecto no se actualizan, los productos finales podrían no cumplir con los estándares de la industria, afectando la competitividad del portafolio del aprendiz.",
      "alternativa_solucion": "Se implementará una estrategia de formación continua y adaptativa. En lugar de depender de una única herramienta, se enseñarán los principios fundamentales detrás de cada proceso (modelado poligonal, rigging, iluminación, etc.) para que el aprendiz pueda migrar fácilmente a nuevas plataformas. Además, se mantendrá una vigilancia tecnológica constante para identificar y adoptar las herramientas más relevantes del mercado, ajustando los contenidos del proyecto según sea necesario."
    },
    {
      "id": 2,
      "nombre": "Falta de recursos técnicos o de tiempo.",
      "descripcion": "La producción de contenidos 3D de alta calidad, especialmente simulaciones físicas y renders fotorrealistas, requiere equipos con alta capacidad de procesamiento. Una infraestructura insuficiente podría generar retrasos significativos en los renders y limitar la complejidad de los proyectos, afectando la calidad final del portafolio.",
      "alternativa_solucion": "Para minimizar este riesgo, se optimizarán los microproyectos para el rendimiento. Se hará énfasis en la eficiencia de la geometría, el uso de texturas optimizadas y la configuración de iluminación para reducir los tiempos de renderizado. En caso de ser necesario, se explorará el uso de granjas de renderizado en la nube para proyectos específicos que demanden una alta carga de procesamiento, garantizando que los aprendices tengan acceso a la capacidad de cómputo necesaria para cumplir con los plazos."
    },
    {
      "id": 3,
      "nombre": "Falta de conexión con el sector productivo.",
      "descripcion": "Si el proyecto no logra establecer un vínculo real con las necesidades y expectativas de las empresas, el portafolio resultante, aunque técnicamente sólido, podría no ser relevante para los empleadores.",
      "alternativa_solucion": "Se buscarán alianzas estratégicas con empresas locales y se invitará a profesionales de la industria a participar como mentores o jurados. Esto permitirá que los proyectos se basen en desafíos reales del mercado, asegurando que los productos finales, además de ser técnicamente correctos, sean pertinentes y atractivos para el sector."
    }
  ],
  "productos_resultados": {
    "descripcion_general": "Los productos de este proyecto son tangibles, evaluables y directamente relacionados con los objetivos específicos y los microproyectos definidos, asegurando que cada fase del proceso de formación culmine en un resultado concreto que contribuya al portafolio final. A continuación se describen los productos por fase:",
    "fases": [
      {
        "fase": "Fase 1: Preproducción y Conceptualización",
        "producto": "Documentos de preproducción: Se entregará un documento completo que incluya guiones técnicos y literarios, concept art de personajes y escenarios, storyboards y animatics de cada uno de los microproyectos.",
        "evaluacion": "Este producto será evaluado en términos de la coherencia narrativa, la viabilidad técnica de las ideas y la claridad de la dirección de arte para la producción."
      },
      {
        "fase": "Fase 2: Producción de Activos 3D",
        "producto": "Archivos 3D de los microproyectos: Se entregarán los modelos 3D de alta y baja resolución del producto comercial, el personaje y los assets interactivos. Además, se incluirán las simulaciones físicas renderizadas y las escenas de integración de video real (VFX), todas ellas listas para la postproducción.",
        "evaluacion": "Se verificará la calidad técnica de los modelos (topología, mapeo UV, etc.), la optimización de los assets para entornos interactivos, la fidelidad de las simulaciones y la correcta integración de los elementos 3D con el video real."
      },
      {
        "fase": "Fase 3: Postproducción y Edición",
        "producto": "Reel profesional de 1:30 minutos: Este será el producto final y principal del proyecto. Será un video editado y musicalizado que integre las mejores tomas de cada uno de los microproyectos en un formato cohesivo y atractivo para el sector productivo. Se incluirá un rótulo con la información del aprendiz y sus datos de contacto.",
        "evaluacion": "El reel se evaluará por su fluidez, calidad de la edición, sincronización con el audio, y la capacidad de proyectar las habilidades del aprendiz de manera clara y profesional. Este producto es la pieza clave para la presentación en el mercado laboral."
      }
    ]
  },
  "innovacion_gestion": {
    "resuelve_necesidad": {
      "pregunta": "¿El proyecto resuelve una necesidad del sector productivo?",
      "criterio": "Respuesta que debe estar soportada en la realidad, conocimiento del entorno, estado del arte del sector. Solo tiene dos opciones: Si o No. Debe elegir una de las dos.",
      "respuesta": "SI"
    },
    "mejora_proceso": {
      "pregunta": "¿El proyecto mejora el proceso/producto/servicio existente?",
      "criterio": "Efecto o transformación que causa el producto del proyecto en sentido superación, innovación, productividad. Solo tiene dos opciones: Si o No. Debe elegir una de las dos.",
      "respuesta": "SI"
    },
    "nuevas_tecnicas": {
      "pregunta": "¿El proyecto involucra el uso de nuevas técnicas y tecnologías de proceso?",
      "criterio": "La incorporación de tecnologías de punto y vanguardia, que dan cuenta del estado del arte del sector en el desarrollo del proyecto. Solo tiene dos opciones: Si o No. Debe elegir una de las dos.",
      "respuesta": "SI"
    },
    "proteccion_industrial": {
      "pregunta": "¿Los productos finales son susceptibles a protección industrial y/o derechos de autor?",
      "criterio": "El desarrollo del proyecto refleja una producción de I+D (Investigación y Desarrollo) de manera que se registre el producto como una creación propia, una invención o una construcción que modifica el discurso epistémico. Solo tiene dos opciones: Si o No. Debe elegir una de las dos.",
      "respuesta": "SI"
    },
    "posicionamiento_mercado": {
      "pregunta": "¿Los productos obtenidos en el proyecto pueden ser posicionados en el mercado?",
      "criterio": "El producto, la marca, objeto, resultantes del proyecto poseen la calidad requerida para competir en el mercado de consumo. Solo tiene dos opciones: Si o No. Debe elegir una de las dos.",
      "respuesta": "SI"
    }
  },
  "valoracion_productiva": {
    "satisface_cliente": {
      "pregunta": "¿Con el desarrollo del proyecto se puede satisfacer la necesidad de un cliente potencial?",
      "criterio": "Cuando el proyecto tiene efectos colaterales no incluidos en su formulación, generando la viabilidad de afectar a otros clientes y contextos. Solo tiene dos opciones: Si o No. Debe elegir una de las dos.",
      "respuesta": "SI"
    },
    "viabilidad_negocio": {
      "pregunta": "¿Viabilidad de proyecto para plan de negocio?",
      "criterio": "Cuando un proyecto formativo tiene condiciones para transformarse en un proyecto productivo, es decir, que abre condiciones para creación de empresa. Solo tiene tres opciones: ALTA, MEDIA o BAJA. Debe elegir una de las tres.",
      "respuesta": "ALTA"
    }
  },
  "planeacion_proyecto": [
    {
        "numero": 1,
        "guia_id": "GA01",
        "guia_label": "Guía 01",
        "fase": "PLANEAR",
        "trimestre": "I",
        "actividad_proyecto": "Estructurar la biblia de preproducción redactando el guion técnico y clasificando las tomas en rutas de renderizado directo o guía 3D.",
        "competencia_tecnica": "250201022 Desarrollar storyboard de acuerdo con guion y contenido audiovisual",
        "rap_tecnico": "RAP 07: Elaborar guiones técnicos y storyboards de preproducción clasificando tomas y rutas de renderizado.",
        "competencia_transversal": "240201530 Resultado de Aprendizaje de la Inducción",
        "rap_transversal": "RAP 17: Identificar la dinámica organizacional del SENA y el rol de la formación profesional integral.",
        "rap_tecnico_id": "RAP-07",
        "rap_transversal_id": "RAP-17"
    },
    {
        "numero": 2,
        "guia_id": "GA02",
        "guia_label": "Guía 02",
        "fase": "PLANEAR",
        "trimestre": "I",
        "actividad_proyecto": "Diseñar viñetas de storyboard definiendo encuadres, ángulos y ritmos cinemáticos para la previsualización del teaser.",
        "competencia_tecnica": "250201022 Desarrollar storyboard de acuerdo con guion y contenido audiovisual",
        "rap_tecnico": "RAP 07: Elaborar guiones técnicos y storyboards de preproducción clasificando tomas y rutas de renderizado.",
        "competencia_transversal": "240201524 Desarrollar procesos de comunicación eficaces y efectivos",
        "rap_transversal": "RAP 18: Argumentar en forma oral y escrita atendiendo las exigencias de las diversas situaciones comunicativas.",
        "rap_tecnico_id": "RAP-07",
        "rap_transversal_id": "RAP-18"
    },
    {
        "numero": 3,
        "guia_id": "GA03",
        "guia_label": "Guía 03",
        "fase": "PLANEAR",
        "trimestre": "I",
        "actividad_proyecto": "Explorar el arte conceptual y lenguaje de formas del teaser mediante generación asistida por difusión 2D y armonías cromáticas.",
        "competencia_tecnica": "250201022 Desarrollar storyboard de acuerdo con guion y contenido audiovisual",
        "rap_tecnico": "RAP 08: Establecer la guía gráfica y hojas de modelo de elementos conceptuales manteniendo coherencia estilística.",
        "competencia_transversal": "240201526 Enriquecer su proyecto de vida en un contexto productivo",
        "rap_transversal": "RAP 19: Contribuir con el fortalecimiento de la cultura de paz a partir de la dignidad humana.",
        "rap_tecnico_id": "RAP-08",
        "rap_transversal_id": "RAP-19"
    },
    {
        "numero": 4,
        "guia_id": "GA04",
        "guia_label": "Guía 04",
        "fase": "PLANEAR",
        "trimestre": "I",
        "actividad_proyecto": "Dibujar y estandarizar hojas de modelo (Model Sheets) ortográficas consistentes del personaje antropomorfo y props clave.",
        "competencia_tecnica": "250201022 Desarrollar storyboard de acuerdo con guion y contenido audiovisual",
        "rap_tecnico": "RAP 08: Establecer la guía gráfica y hojas de modelo de elementos conceptuales manteniendo coherencia estilística.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 25: Intercambiar opiniones sobre situaciones cotidianas y laborales actuales, pasadas y futuras (Inglés 1).",
        "rap_tecnico_id": "RAP-08",
        "rap_transversal_id": "RAP-25"
    },
    {
        "numero": 5,
        "guia_id": "GA05",
        "guia_label": "Guía 05",
        "fase": "PLANEAR",
        "trimestre": "I",
        "actividad_proyecto": "Bloquear los volúmenes primarios y proporciones anatómicas bípedas del personaje antropomorfo de forma manual y asistida por IA.",
        "competencia_tecnica": "220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado",
        "rap_tecnico": "RAP 01: Construir mallas tridimensionales de escultura orgánica con precisión volumétrica y detalle anatómico.",
        "competencia_transversal": "240201524 Desarrollar procesos de comunicación eficaces",
        "rap_transversal": "RAP 18: Sustentación de la memoria descriptiva de proporciones anatómicas y biomecánica del personaje.",
        "rap_tecnico_id": "RAP-01",
        "rap_transversal_id": "RAP-18"
    },
    {
        "numero": 6,
        "guia_id": "GA06",
        "guia_label": "Guía 06",
        "fase": "PLANEAR",
        "trimestre": "I",
        "actividad_proyecto": "Esculpir masa muscular, pliegues de indumentaria y juntas biomecánicas mediante pinceles de escultura digital y subdivisión.",
        "competencia_tecnica": "220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado",
        "rap_tecnico": "RAP 01: Construir mallas tridimensionales de escultura orgánica con precisión volumétrica y detalle anatómico.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 25 (Inglés 1): Ficha técnica y glosario de terminología anatómica internacional y landmarks en inglés.",
        "rap_tecnico_id": "RAP-01",
        "rap_transversal_id": "RAP-25"
    },
    {
        "numero": 7,
        "guia_id": "GA07",
        "guia_label": "Guía 07",
        "fase": "PLANEAR",
        "trimestre": "I",
        "actividad_proyecto": "Estampar microtexturas orgánicas, mapas de alfas y accesorios técnicos de protección en la malla esculpida de alta resolución.",
        "competencia_tecnica": "220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado",
        "rap_tecnico": "RAP 01: Construir mallas tridimensionales de escultura orgánica con precisión volumétrica y detalle anatómico.",
        "competencia_transversal": "240201526 Enriquecer su proyecto de vida en un contexto social",
        "rap_transversal": "RAP 19: Principios éticos de diversidad, inclusión y dignidad en el diseño volumétrico de personajes.",
        "rap_tecnico_id": "RAP-01",
        "rap_transversal_id": "RAP-19"
    },
    {
        "numero": 8,
        "guia_id": "GA08",
        "guia_label": "Guía 08",
        "fase": "PLANEAR",
        "trimestre": "I",
        "actividad_proyecto": "Reconstruir la topología poligonal limpia en cuadriláteros (quads) trazando anillos y bucles (edge loops) para deformación articular.",
        "competencia_tecnica": "220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado",
        "rap_tecnico": "RAP 02: Optimizar la topología poligonal de mallas 3D y desplegar mapas UV uniformes.",
        "competencia_transversal": "240201527 Generar hábitos saludables mediante actividad física",
        "rap_transversal": "RAP 20: Ergonomía y postura adecuada en estaciones de trabajo 3D durante retopología intensiva.",
        "rap_tecnico_id": "RAP-02",
        "rap_transversal_id": "RAP-20"
    },
    {
        "numero": 9,
        "guia_id": "GA09",
        "guia_label": "Guía 09",
        "fase": "PLANEAR",
        "trimestre": "I",
        "actividad_proyecto": "Desplegar mapas UV uniformes y optimizar el empaquetado de islas sin distorsión respetando la escala de texels Game-Ready.",
        "competencia_tecnica": "220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado",
        "rap_tecnico": "RAP 02: Optimizar la topología poligonal de mallas 3D y desplegar mapas UV uniformes.",
        "competencia_transversal": "240201527 Generar hábitos saludables mediante actividad física",
        "rap_transversal": "RAP 20: Protocolo de pausas activas y ejercicios de muñeca para prevenir túnel carpiano en mapeo UV.",
        "rap_tecnico_id": "RAP-02",
        "rap_transversal_id": "RAP-20"
    },
    {
        "numero": 10,
        "guia_id": "GA10",
        "guia_label": "Guía 10",
        "fase": "HACER",
        "trimestre": "II",
        "actividad_proyecto": "Proyectar y hornear mapas de alta a baja resolución (Baking de Normales, Curvatura y AO) sobre la malla optimizada.",
        "competencia_tecnica": "220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado",
        "rap_tecnico": "RAP 03: Generar y aplicar materiales bajo estándares PBR mediante proyección de mapas y shaders.",
        "competencia_transversal": "240201527 Generar hábitos saludables mediante programas de actividad física",
        "rap_transversal": "RAP 20: Practicar hábitos saludables mediante la aplicación de fundamentos de nutrición e higiene.",
        "rap_tecnico_id": "RAP-03",
        "rap_transversal_id": "RAP-20"
    },
    {
        "numero": 11,
        "guia_id": "GA11",
        "guia_label": "Guía 11",
        "fase": "HACER",
        "trimestre": "II",
        "actividad_proyecto": "Pintar capas de texturas PBR (Albedo, Roughness, Metallic) aplicando máscaras de suciedad y desgaste industrial.",
        "competencia_tecnica": "220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado",
        "rap_tecnico": "RAP 03: Generar y aplicar materiales bajo estándares PBR mediante proyección de mapas y shaders.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 26: Discutir sobre posibles soluciones a problemas dentro de un rango variado de contextos (Inglés 2).",
        "rap_tecnico_id": "RAP-03",
        "rap_transversal_id": "RAP-26"
    },
    {
        "numero": 12,
        "guia_id": "GA12",
        "guia_label": "Guía 12",
        "fase": "HACER",
        "trimestre": "II",
        "actividad_proyecto": "Ensamblar grafos nodales de shaders físicos con calibración lumínica y dispersión subsuperficial (SSS).",
        "competencia_tecnica": "220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado",
        "rap_tecnico": "RAP 03: Generar y aplicar materiales bajo estándares PBR mediante proyección de mapas y shaders.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 26 (Inglés 2): Especificaciones y documentación de mapas dieléctricos y metálicos en inglés.",
        "rap_tecnico_id": "RAP-03",
        "rap_transversal_id": "RAP-26"
    },
    {
        "numero": 13,
        "guia_id": "GA13",
        "guia_label": "Guía 13",
        "fase": "HACER",
        "trimestre": "II",
        "actividad_proyecto": "Dibujar bocetos 2D paramétricos con dimensiones reales, cotas y restricciones geométricas estrictas del producto.",
        "competencia_tecnica": "220101016 Generar prototipo digital según técnicas de modelado y producto",
        "rap_tecnico": "RAP 04: Modelar prototipos digitales CAD paramétricos hard-surface ajustados a tolerancias dimensionales.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 26 (Inglés 2): Planos de ensamble y simbología de ajuste mecánico ISO en idioma inglés.",
        "rap_tecnico_id": "RAP-04",
        "rap_transversal_id": "RAP-26"
    },
    {
        "numero": 14,
        "guia_id": "GA14",
        "guia_label": "Guía 14",
        "fase": "HACER",
        "trimestre": "II",
        "actividad_proyecto": "Ejecutar operaciones sólidas 3D y booleanas conservando el árbol histórico editable en software CAD paramétrico.",
        "competencia_tecnica": "220101016 Generar prototipo digital según técnicas de modelado y producto",
        "rap_tecnico": "RAP 04: Modelar prototipos digitales CAD paramétricos hard-surface ajustados a tolerancias dimensionales.",
        "competencia_transversal": "240201528 Razonamiento cuantitativo y matemáticas",
        "rap_transversal": "RAP 22: Cálculo matemático de tolerancias dimensionales y encajes mecánicos en CAD.",
        "rap_tecnico_id": "RAP-04",
        "rap_transversal_id": "RAP-22"
    },
    {
        "numero": 15,
        "guia_id": "GA15",
        "guia_label": "Guía 15",
        "fase": "HACER",
        "trimestre": "II",
        "actividad_proyecto": "Modelar ensambles mecánicos funcionales, generando la vista explosionada (Exploded View) y el manual técnico de ensamble.",
        "competencia_tecnica": "220101016 Generar prototipo digital según técnicas de modelado y producto",
        "rap_tecnico": "RAP 04: Modelar prototipos digitales CAD paramétricos hard-surface ajustados a tolerancias dimensionales.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 26 (Inglés 2): Glosario técnico paramétrico y memoria descriptiva de piezas en inglés.",
        "rap_tecnico_id": "RAP-04",
        "rap_transversal_id": "RAP-26"
    },
    {
        "numero": 16,
        "guia_id": "GA16",
        "guia_label": "Guía 16",
        "fase": "HACER",
        "trimestre": "II",
        "actividad_proyecto": "Construir la previsualización 3D (Previs) en el entorno cerrado animando cámaras virtuales a ritmo de teaser (Playblast en gris).",
        "competencia_tecnica": "250201026 Animar elementos de la escena según técnicas y especificaciones",
        "rap_tecnico": "RAP 09: Construir previsualizaciones dinámicas en entorno 3D ajustando movimientos de cámara y ritmo cinemático.",
        "competencia_transversal": "240201528 Razonamiento cuantitativo y matemáticas",
        "rap_transversal": "RAP 22: Matemáticas cinemáticas aplicadas: cálculo de distancia focal, FOV y velocidad de cámara.",
        "rap_tecnico_id": "RAP-09",
        "rap_transversal_id": "RAP-22"
    },
    {
        "numero": 17,
        "guia_id": "GA17",
        "guia_label": "Guía 17",
        "fase": "HACER",
        "trimestre": "III",
        "actividad_proyecto": "Modelar elementos espaciales y componentes constructivos interiores de la fábrica/laboratorio en entorno BIM.",
        "competencia_tecnica": "220101016 Generar prototipo digital según técnicas de modelado y producto",
        "rap_tecnico": "RAP 06: Estructurar modelos de información espacial bajo estándares abiertos IFC y documentación técnica BIM.",
        "competencia_transversal": "210201501 Ejercer derechos fundamentales del trabajo en el marco de la constitución",
        "rap_transversal": "RAP 21: Reconocer el trabajo como factor de movilidad social y transformación de la realidad.",
        "rap_tecnico_id": "RAP-06",
        "rap_transversal_id": "RAP-21"
    },
    {
        "numero": 18,
        "guia_id": "GA18",
        "guia_label": "Guía 18",
        "fase": "HACER",
        "trimestre": "III",
        "actividad_proyecto": "Mapear atributos de propiedades bajo estándar abierto IFC, extrayendo cómputos métricos y memoria técnica asistida por LLMs.",
        "competencia_tecnica": "220101016 Generar prototipo digital según técnicas de modelado y producto",
        "rap_tecnico": "RAP 06: Estructurar modelos de información espacial bajo estándares abiertos IFC y documentación técnica BIM.",
        "competencia_transversal": "240201529 Gestionar procesos propios de la cultura emprendedora",
        "rap_transversal": "RAP 22: Caracterizar la idea de negocio teniendo en cuenta las oportunidades del sector.",
        "rap_tecnico_id": "RAP-06",
        "rap_transversal_id": "RAP-22"
    },
    {
        "numero": 19,
        "guia_id": "GA19",
        "guia_label": "Guía 19",
        "fase": "HACER",
        "trimestre": "III",
        "actividad_proyecto": "Configurar parámetros de laminación (slicing), soportes, infill y generar el archivo G-Code verificado para fabricación física o simulada.",
        "competencia_tecnica": "220101016 Generar prototipo digital según técnicas de modelado y producto",
        "rap_tecnico": "RAP 05: Configurar parámetros de laminación y generar paquetes de código numérico (G-Code) o prototipos 3D.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 27: Explicar las funciones de su ocupación laboral usando expresiones de acuerdo al nivel (Inglés 3).",
        "rap_tecnico_id": "RAP-05",
        "rap_transversal_id": "RAP-27"
    },
    {
        "numero": 20,
        "guia_id": "GA20",
        "guia_label": "Guía 20",
        "fase": "HACER",
        "trimestre": "IV",
        "actividad_proyecto": "Construir armaduras 3D estructurando jerarquías de transformación, nodos padre/hijo y orientación correcta de joints.",
        "competencia_tecnica": "250201026 Animar elementos de la escena según técnicas y especificaciones",
        "rap_tecnico": "RAP 10: Integrar estructuras de armadura (Rigging), jerarquías de control y datos de captura de movimiento.",
        "competencia_transversal": "220601501 Aplicar prácticas de protección ambiental, seguridad y salud en el trabajo",
        "rap_transversal": "RAP 23: Analizar las estrategias para el control de los impactos ambientales y accidentes laborales.",
        "rap_tecnico_id": "RAP-10",
        "rap_transversal_id": "RAP-23"
    },
    {
        "numero": 21,
        "guia_id": "GA21",
        "guia_label": "Guía 21",
        "fase": "HACER",
        "trimestre": "IV",
        "actividad_proyecto": "Configurar controladores cinemáticos con conmutación IK/FK y restricciones mecánicas para la actuación del personaje.",
        "competencia_tecnica": "250201026 Animar elementos de la escena según técnicas y especificaciones",
        "rap_tecnico": "RAP 10: Integrar estructuras de armadura (Rigging), jerarquías de control y datos de captura de movimiento.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 28: Comprender información sobre situaciones cotidianas y laborales actuales y futuras (Inglés 4).",
        "rap_tecnico_id": "RAP-10",
        "rap_transversal_id": "RAP-28"
    },
    {
        "numero": 22,
        "guia_id": "GA22",
        "guia_label": "Guía 22",
        "fase": "HACER",
        "trimestre": "IV",
        "actividad_proyecto": "Pintar pesos de deformación (Skinning), retargetear captura de movimiento MoCap y pulir curvas de animación en el Graph Editor.",
        "competencia_tecnica": "250201026 Animar elementos de la escena según técnicas y especificaciones",
        "rap_tecnico": "RAP 10: Integrar estructuras de armadura (Rigging), jerarquías de control y datos de captura de movimiento.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 28 (Inglés 4): Prompt engineering y descriptores cinematográficos en idioma inglés.",
        "rap_tecnico_id": "RAP-10",
        "rap_transversal_id": "RAP-28"
    },
    {
        "numero": 23,
        "guia_id": "GA23",
        "guia_label": "Guía 23",
        "fase": "HACER",
        "trimestre": "IV",
        "actividad_proyecto": "Estructurar plantillas de prompts técnicos parametrizados con adaptadores de control estructural (ControlNet) y reglas de restricción.",
        "competencia_tecnica": "250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual",
        "rap_tecnico": "RAP 11: Estructurar plantillas de prompts técnicos y reglas de restricción lógica asegurando consistencia.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 28 (Inglés 4): Informe comparativo en inglés sobre estabilidad de render y fidelidad temporal.",
        "rap_tecnico_id": "RAP-11",
        "rap_transversal_id": "RAP-28"
    },
    {
        "numero": 24,
        "guia_id": "GA24",
        "guia_label": "Guía 24",
        "fase": "VERIFICAR",
        "trimestre": "V",
        "actividad_proyecto": "Configurar y exportar pases AOV 3D (Depth, Normal, Motion) vinculándolos a motores de difusión guiada para render sintético.",
        "competencia_tecnica": "250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual",
        "rap_tecnico": "RAP 12: Procesar y renderizar secuencias animadas vinculando pases de control 3D y difusión guiada.",
        "competencia_transversal": "220501501 Aplicar tecnologías de la información y la comunicación (TICs)",
        "rap_transversal": "RAP 24: Seleccionar herramientas TIC de acuerdo con las necesidades de información.",
        "rap_tecnico_id": "RAP-12",
        "rap_transversal_id": "RAP-24"
    },
    {
        "numero": 25,
        "guia_id": "GA25",
        "guia_label": "Guía 25",
        "fase": "VERIFICAR",
        "trimestre": "V",
        "actividad_proyecto": "Aplicar filtros de consistencia temporal en video sintético eliminando flicker e interpolando cuadros con flujo óptico (RIFE).",
        "competencia_tecnica": "250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual",
        "rap_tecnico": "RAP 12: Procesar y renderizar secuencias animadas vinculando pases de control 3D y difusión guiada.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 29: Presentar un proceso para la realización de una actividad en su quehacer laboral (Inglés 5).",
        "rap_tecnico_id": "RAP-12",
        "rap_transversal_id": "RAP-29"
    },
    {
        "numero": 26,
        "guia_id": "GA26",
        "guia_label": "Guía 26",
        "fase": "VERIFICAR",
        "trimestre": "V",
        "actividad_proyecto": "Generar niveles de detalle geométrico (LODs) y oclusión de visibilidad en el motor gráfico respetando el presupuesto técnico.",
        "competencia_tecnica": "220501096 Desarrollar la solución de software de acuerdo con el diseño",
        "rap_tecnico": "RAP 14: Optimizar e integrar activos 3D en motores en tiempo real garantizando tasa de refresco a 60 FPS.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 29 (Inglés 5): Presentación ejecutiva en inglés de métricas de profiling y optimización a 60 FPS.",
        "rap_tecnico_id": "RAP-14",
        "rap_transversal_id": "RAP-29"
    },
    {
        "numero": 27,
        "guia_id": "GA27",
        "guia_label": "Guía 27",
        "fase": "VERIFICAR",
        "trimestre": "V",
        "actividad_proyecto": "Hornear mapas de iluminación estática (Lightmaps), posicionar sondas de reflexión y optimizar materiales para tiempo real.",
        "competencia_tecnica": "220501096 Desarrollar la solución de software de acuerdo con el diseño",
        "rap_tecnico": "RAP 14: Optimizar e integrar activos 3D en motores en tiempo real garantizando tasa de refresco a 60 FPS.",
        "competencia_transversal": "210201501 Ejercer derechos fundamentales del trabajo",
        "rap_transversal": "RAP 24: Propiedad intelectual, licencias de software y derechos de autor en activos 3D digitales.",
        "rap_tecnico_id": "RAP-14",
        "rap_transversal_id": "RAP-24"
    },
    {
        "numero": 28,
        "guia_id": "GA28",
        "guia_label": "Guía 28",
        "fase": "VERIFICAR",
        "trimestre": "V",
        "actividad_proyecto": "Analizar el rendimiento con perfiladores gráficos de CPU/GPU, reduciendo Draw Calls y estabilizando la escena a 60 FPS / VR.",
        "competencia_tecnica": "220501096 Desarrollar la solución de software de acuerdo con el diseño",
        "rap_tecnico": "RAP 14: Optimizar e integrar activos 3D en motores en tiempo real garantizando tasa de refresco a 60 FPS.",
        "competencia_transversal": "210201501 Ejercer derechos fundamentales del trabajo",
        "rap_transversal": "RAP 24: Normatividad laboral, modalidades de teletrabajo y contratos freelance para artistas 3D.",
        "rap_tecnico_id": "RAP-14",
        "rap_transversal_id": "RAP-24"
    },
    {
        "numero": 29,
        "guia_id": "GA29",
        "guia_label": "Guía 29",
        "fase": "VERIFICAR",
        "trimestre": "VI",
        "actividad_proyecto": "Componer por nodos las capas de render, efectos visuales y máscaras de rotoscopia/segmentación asistida por IA.",
        "competencia_tecnica": "250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual",
        "rap_tecnico": "RAP 13: Componer y postproducir secuencias audiovisuales mediante integración de capas y correcciones digitales.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 30: Implementar acciones de mejora relacionadas con el uso de expresiones y desempeño (Inglés 6).",
        "rap_tecnico_id": "RAP-13",
        "rap_transversal_id": "RAP-30"
    },
    {
        "numero": 30,
        "guia_id": "GA30",
        "guia_label": "Guía 30",
        "fase": "VERIFICAR",
        "trimestre": "VI",
        "actividad_proyecto": "Aplicar corrección de color cinemática (Color Grading) en espacio de color ACES y efectos ópticos de cámara al teaser de 60s.",
        "competencia_tecnica": "250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual",
        "rap_tecnico": "RAP 13: Componer y postproducir secuencias audiovisuales mediante integración de capas y correcciones digitales.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 30 (Inglés 6): Subtitulado y adaptación cultural internacional del teaser audiovisual.",
        "rap_tecnico_id": "RAP-13",
        "rap_transversal_id": "RAP-30"
    },
    {
        "numero": 31,
        "guia_id": "GA31",
        "guia_label": "Guía 31",
        "fase": "VERIFICAR",
        "trimestre": "VI",
        "actividad_proyecto": "Diseñar, limpiar y sincronizar la banda sonora Foley, efectos sonoros y música, exportando el máster final del Teaser de 60 segundos.",
        "competencia_tecnica": "250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual",
        "rap_tecnico": "RAP 13: Componer y postproducir secuencias audiovisuales mediante integración de capas y correcciones digitales.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 30 (Inglés 6): Documentación de código y API técnica en inglés profesional estándar.",
        "rap_tecnico_id": "RAP-13",
        "rap_transversal_id": "RAP-30"
    },
    {
        "numero": 32,
        "guia_id": "GA32",
        "guia_label": "Guía 32",
        "fase": "VERIFICAR",
        "trimestre": "VI",
        "actividad_proyecto": "Programar código POO del sistema de locomoción híbrido (Teletransporte para VR y Primera Persona para simulador de escritorio PC).",
        "competencia_tecnica": "220501096 Desarrollar la solución de software de acuerdo con el diseño",
        "rap_tecnico": "RAP 15: Programar scripts de lógica e interacción en lenguajes orientados a objetos con controladores y eventos.",
        "competencia_transversal": "220501501 Aplicar tecnologías de la información (TICs)",
        "rap_transversal": "RAP 23: Arquitectura de software, patrones de diseño de interacción y testing de UI.",
        "rap_tecnico_id": "RAP-15",
        "rap_transversal_id": "RAP-23"
    },
    {
        "numero": 33,
        "guia_id": "GA33",
        "guia_label": "Guía 33",
        "fase": "VERIFICAR",
        "trimestre": "VI",
        "actividad_proyecto": "Programar componentes detectores de colisión (Triggers/Colliders) y mecánicas físicas de agarre/movimiento de piezas del producto.",
        "competencia_tecnica": "220501096 Desarrollar la solución de software de acuerdo con el diseño",
        "rap_tecnico": "RAP 15: Programar scripts de lógica e interacción en lenguajes orientados a objetos con controladores y eventos.",
        "competencia_transversal": "240201529 Gestionar cultura emprendedora y empresarial",
        "rap_transversal": "RAP 22: Presupuestación técnica y estimación de costos en desarrollo de software interactivo.",
        "rap_tecnico_id": "RAP-15",
        "rap_transversal_id": "RAP-22"
    },
    {
        "numero": 34,
        "guia_id": "GA34",
        "guia_label": "Guía 34",
        "fase": "VERIFICAR",
        "trimestre": "VI",
        "actividad_proyecto": "Programar el configurador dinámico de cambio de materiales en tiempo real con disparador de feedback multisensorial (audio y partículas).",
        "competencia_tecnica": "220501096 Desarrollar la solución de software de acuerdo con el diseño",
        "rap_tecnico": "RAP 15: Programar scripts de lógica e interacción en lenguajes orientados a objetos con controladores y eventos.",
        "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
        "rap_transversal": "RAP 30 (Inglés 6): Pitch oral del teaser terminado en inglés ante jurado internacional.",
        "rap_tecnico_id": "RAP-15",
        "rap_transversal_id": "RAP-30"
    },
    {
        "numero": 35,
        "guia_id": "GA35",
        "guia_label": "Guía 35",
        "fase": "VERIFICAR",
        "trimestre": "VI",
        "actividad_proyecto": "Ejecutar pruebas de depuración (debugging), arquitectura de datos de interacción y consola de control del simulador interactivo.",
        "competencia_tecnica": "220501096 Desarrollar la solución de software de acuerdo con el diseño",
        "rap_tecnico": "RAP 15: Programar scripts de lógica e interacción en lenguajes orientados a objetos con controladores y eventos.",
        "competencia_transversal": "240201524 Desarrollar procesos de comunicación eficaces",
        "rap_transversal": "RAP 18: Defensa argumentada del máster audiovisual ante el comité técnico y directivo.",
        "rap_tecnico_id": "RAP-15",
        "rap_transversal_id": "RAP-18"
    },
    {
        "numero": 36,
        "guia_id": "GA36",
        "guia_label": "Guía 36",
        "fase": "ACTUAR",
        "trimestre": "VII",
        "actividad_proyecto": "Diseñar e implementar menús navegables, botones y paneles HUD espaciales 3D (World-Space UI) según principios UX.",
        "competencia_tecnica": "220501096 Desarrollar la solución de software de acuerdo con el diseño",
        "rap_tecnico": "RAP 16: Compilar y desplegar aplicaciones interactivas multi-plataforma integrando interfaces de usuario UI/UX.",
        "competencia_transversal": "240201529 Gestionar cultura emprendedora y empresarial",
        "rap_transversal": "RAP 22: Modelo de negocio Lean Canvas y propuesta de valor comercial del Gemelo Digital.",
        "rap_tecnico_id": "RAP-16",
        "rap_transversal_id": "RAP-22"
    },
    {
        "numero": 37,
        "guia_id": "GA37",
        "guia_label": "Guía 37",
        "fase": "ACTUAR",
        "trimestre": "VII",
        "actividad_proyecto": "Integrar el personaje antropomorfo como asistente interactivo animado en el Gemelo Digital y compilar la aplicación ejecutable (.exe / WebGL).",
        "competencia_tecnica": "220501096 Desarrollar la solución de software de acuerdo con el diseño",
        "rap_tecnico": "RAP 16: Compilar y desplegar aplicaciones interactivas multi-plataforma integrando interfaces de usuario UI/UX.",
        "competencia_transversal": "240201529 Gestionar cultura emprendedora y empresarial",
        "rap_transversal": "RAP 22: Pitch Deck comercial, canales de distribución y monetización de soluciones 3D.",
        "rap_tecnico_id": "RAP-16",
        "rap_transversal_id": "RAP-22"
    },
    {
        "numero": 38,
        "guia_id": "GA38",
        "guia_label": "Guía 38",
        "fase": "ACTUAR",
        "trimestre": "VII",
        "actividad_proyecto": "Compilar, curar técnicamente y maquetar el portafolio profesional web del egresado integrando los tres macroproyectos.",
        "competencia_tecnica": "220501096 Desarrollar la solución de software de acuerdo con el diseño",
        "rap_tecnico": "RAP 31: Validar y entregar el producto interactivo/portafolio 3D final según requerimientos del sector productivo.",
        "competencia_transversal": "Trabajo de Integración de Portafolio",
        "rap_transversal": "Validación y compilación del portafolio técnico final del egresado.",
        "rap_tecnico_id": "RAP-31",
        "rap_transversal_id": null
    },
    {
        "numero": 39,
        "guia_id": "GA39",
        "guia_label": "Guía 39",
        "fase": "ACTUAR",
        "trimestre": "VII",
        "actividad_proyecto": "Sustentar técnicamente el portafolio integral de soluciones 3D ante el comité evaluador institucional y sector productivo.",
        "competencia_tecnica": "220501096 Desarrollar la solución de software de acuerdo con el diseño",
        "rap_tecnico": "RAP 31: Validar y entregar el producto interactivo/portafolio 3D final según requerimientos del sector productivo.",
        "competencia_transversal": "Sustentación Final",
        "rap_transversal": "Defensa y sustentación técnica del portafolio profesional del egresado.",
        "rap_tecnico_id": "RAP-31",
        "rap_transversal_id": null
    }
]
};

const STORAGE_KEY = 'sena_proyecto_formativo_data';

export function getProyectoFormativo() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = jsonDeepMerge(PROYECTO_FORMATIVO_DEFAULT, JSON.parse(saved));
      if (!parsed.restricciones_riesgos || !Array.isArray(parsed.restricciones_riesgos) || parsed.restricciones_riesgos.length === 0) {
        parsed.restricciones_riesgos = JSON.parse(JSON.stringify(PROYECTO_FORMATIVO_DEFAULT.restricciones_riesgos));
      }
      if (!parsed.productos_resultados || !parsed.productos_resultados.fases) {
        parsed.productos_resultados = JSON.parse(JSON.stringify(PROYECTO_FORMATIVO_DEFAULT.productos_resultados));
      }
      if (!parsed.innovacion_gestion) {
        parsed.innovacion_gestion = JSON.parse(JSON.stringify(PROYECTO_FORMATIVO_DEFAULT.innovacion_gestion));
      }
      if (!parsed.valoracion_productiva) {
        parsed.valoracion_productiva = JSON.parse(JSON.stringify(PROYECTO_FORMATIVO_DEFAULT.valoracion_productiva));
      }
      if (!parsed.planeacion_proyecto || !Array.isArray(parsed.planeacion_proyecto) || parsed.planeacion_proyecto.length === 0) {
        parsed.planeacion_proyecto = JSON.parse(JSON.stringify(PROYECTO_FORMATIVO_DEFAULT.planeacion_proyecto));
      }
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


export function getPlaneacionProyecto() {
  const pf = getProyectoFormativo();
  return (pf && Array.isArray(pf.planeacion_proyecto)) ? pf.planeacion_proyecto : PROYECTO_FORMATIVO_DEFAULT.planeacion_proyecto;
}

export function getActividadesProyectoForRap(rapId) {
  if (!rapId) return [];
  const cleanId = String(rapId).toUpperCase().replace(/[^0-9A-Z]/g, '');
  const numMatch = String(rapId).match(/(\d+)/);
  const numInt = numMatch ? parseInt(numMatch[1], 10) : null;
  const numStr = numMatch ? numMatch[1].padStart(2, '0') : null;

  const list = getPlaneacionProyecto();
  return list.filter(p => {
    if (p.rap_tecnico_id && p.rap_tecnico_id === rapId) return true;
    if (p.rap_tecnico_id && p.rap_tecnico_id.replace(/[^0-9A-Z]/g, '') === cleanId) return true;
    if (!p.rap_tecnico) return false;
    const norm = p.rap_tecnico.toUpperCase();
    if (numStr && norm.includes('RAP ' + numStr)) return true;
    if (numInt !== null && norm.includes('RAP ' + numInt + ':')) return true;
    return false;
  });
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
