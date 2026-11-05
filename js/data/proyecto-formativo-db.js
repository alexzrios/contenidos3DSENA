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
            "rap_tecnico_id": "RAP-01",
            "rap_tecnico": "RAP 01: Construir mallas tridimensionales de escultura orgánica con precisión volumétrica y detalle anatómico, aplicando técnicas manuales y de asistencia digital.",
            "competencia_tecnica": "220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado y diseño",
            "rap_transversal_id": "RAP-18",
            "rap_transversal": "RAP 18: Argumentar en forma oral y escrita atendiendo las exigencias de las diversas situaciones comunicativas.",
            "competencia_transversal": "240201524 Desarrollar procesos de comunicación eficaces y efectivos",
            "horas": 144,
            "actividades": [
                "Bloquear los volúmenes primarios y proporciones anatómicas bípedas del personaje antropomorfo de forma manual y asistida por IA.",
                "Esculpir masa muscular, pliegues de indumentaria y juntas biomecánicas mediante pinceles de escultura digital y subdivisión.",
                "Estampar microtexturas orgánicas, mapas de alfas y accesorios técnicos de protección en la malla esculpida de alta resolución."
            ],
            "actividad_proyecto": "Bloquear los volúmenes primarios y proporciones anatómicas bípedas del personaje antropomorfo de forma manual y asistida por IA."
        },
        {
            "numero": 2,
            "guia_id": "GA02",
            "guia_label": "Guía 02",
            "fase": "HACER",
            "trimestre": "II",
            "rap_tecnico_id": "RAP-02",
            "rap_tecnico": "RAP 02: Optimizar la topología poligonal de mallas 3D y desplegar mapas UV uniformes, garantizando el flujo de bordes y la eficiencia técnica.",
            "competencia_tecnica": "220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado y diseño",
            "rap_transversal_id": "RAP-20",
            "rap_transversal": "RAP 20: Desarrollar hábitos saludables mediante la práctica regular de actividad física.",
            "competencia_transversal": "240201527 Desarrollar hábitos saludables a través de prácticas de actividad física",
            "horas": 96,
            "actividades": [
                "Reconstruir la topología poligonal limpia en cuadriláteros (quads) trazando bucles para deformación y flujo anatómico.",
                "Desplegar y empaquetar mapas UV uniformes maximizando la densidad de texel en islas prioritarias de renderizado."
            ],
            "actividad_proyecto": "Reconstruir la topología poligonal limpia en cuadriláteros (quads) trazando bucles para deformación y flujo anatómico."
        },
        {
            "numero": 3,
            "guia_id": "GA03",
            "guia_label": "Guía 03",
            "fase": "HACER",
            "trimestre": "II",
            "rap_tecnico_id": "RAP-03",
            "rap_tecnico": "RAP 03: Generar y aplicar materiales bajo estándares PBR mediante proyección de mapas y creación de shaders, asegurando la fidelidad visual.",
            "competencia_tecnica": "220501083 Producir los componentes de la animación de acuerdo con técnicas de modelado y diseño",
            "rap_transversal_id": "RAP-26",
            "rap_transversal": "RAP 26 (Inglés 2): Describir especificaciones de materiales técnicos, mapas PBR y flujos de renderizado en inglés.",
            "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
            "horas": 144,
            "actividades": [
                "Hornear mapas técnicos de curvatura, oclusión ambiental, posición y normals en alta fidelidad.",
                "Crear capas y máscaras procedimentales para emular desgaste, oxidación y envejecimiento de superficies.",
                "Exportar sets de texturas PBR (Albedo, Roughness, Metallic, Normal DirectX/OpenGL) configuradas por canales."
            ],
            "actividad_proyecto": "Hornear mapas técnicos de curvatura, oclusión ambiental, posición y normals en alta fidelidad."
        },
        {
            "numero": 4,
            "guia_id": "GA04",
            "guia_label": "Guía 04",
            "fase": "HACER",
            "trimestre": "II",
            "rap_tecnico_id": "RAP-04",
            "rap_tecnico": "RAP 04: Modelar prototipos digitales CAD paramétricos hard-surface, estructurando árboles de operaciones y ensambles funcionales.",
            "competencia_tecnica": "220101016 Generar prototipo digital según técnicas de modelado y especificaciones de producto",
            "rap_transversal_id": "RAP-21",
            "rap_transversal": "RAP 21: Reconocer el trabajo como elemento estructurante en la sociedad y la legislación laboral vigente.",
            "competencia_transversal": "210201501 Ejercer derechos fundamentales del trabajo",
            "horas": 144,
            "actividades": [
                "Modelar componentes hard-surface mediante bocetos acotados y operaciones booleanas/paramétricas con tolerancias dimensionales.",
                "Elaborar el ensamble cinemático del producto técnico y generar vistas explosionadas con lista de materiales (BOM)."
            ],
            "actividad_proyecto": "Modelar componentes hard-surface mediante bocetos acotados y operaciones booleanas/paramétricas con tolerancias dimensionales."
        },
        {
            "numero": 5,
            "guia_id": "GA05",
            "guia_label": "Guía 05",
            "fase": "HACER",
            "trimestre": "III",
            "rap_tecnico_id": "RAP-05",
            "rap_tecnico": "RAP 05: Configurar parámetros de laminación y generar paquetes de código numérico (G-Code) o prototipos físicos fabricados mediante tecnologías 3D.",
            "competencia_tecnica": "220101016 Generar prototipo digital según técnicas de modelado y especificaciones de producto",
            "rap_transversal_id": "RAP-22",
            "rap_transversal": "RAP 22: Integrar elementos de cultura emprendedora e innovación en el desarrollo del producto.",
            "competencia_transversal": "240201529 Desarrollar procesos de comunicación eficaces y emprendimiento",
            "horas": 48,
            "actividades": [
                "Configurar parámetros de laminación (Slicing), soportes, orientación e infill para manufactura aditiva FDM/SLA y exportar G-Code verificado."
            ],
            "actividad_proyecto": "Configurar parámetros de laminación (Slicing), soportes, orientación e infill para manufactura aditiva FDM/SLA y exportar G-Code verificado."
        },
        {
            "numero": 6,
            "guia_id": "GA06",
            "guia_label": "Guía 06",
            "fase": "HACER",
            "trimestre": "III",
            "rap_tecnico_id": "RAP-06",
            "rap_tecnico": "RAP 06: Estructurar modelos de información espacial bajo estándares abiertos IFC y documentación técnica en entornos BIM.",
            "competencia_tecnica": "220101016 Generar prototipo digital según técnicas de modelado y especificaciones de producto",
            "rap_transversal_id": "RAP-27",
            "rap_transversal": "RAP 27 (Inglés 3): Redactar memorias descriptivas y manuales de producto en inglés según estándares industriales.",
            "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
            "horas": 96,
            "actividades": [
                "Modelar el gemelo espacial arquitectónico o planta industrial con familias paramétricas bajo estándar abierto IFC.",
                "Generar planos normalizados, memorias técnicas y tablas de cantidades de obra y activos espaciales."
            ],
            "actividad_proyecto": "Modelar el gemelo espacial arquitectónico o planta industrial con familias paramétricas bajo estándar abierto IFC."
        },
        {
            "numero": 7,
            "guia_id": "GA07",
            "guia_label": "Guía 07",
            "fase": "PLANEAR",
            "trimestre": "I",
            "rap_tecnico_id": "RAP-07",
            "rap_tecnico": "RAP 07: Elaborar guiones técnicos y storyboards de preproducción clasificando tomas y rutas de renderizado.",
            "competencia_tecnica": "250201022 Desarrollar storyboard de acuerdo con guion y contenido audiovisual e interactivo",
            "rap_transversal_id": "RAP-17",
            "rap_transversal": "RAP 17: Identificar la dinámica organizacional del SENA y el rol de la formación profesional integral.",
            "competencia_transversal": "240201530 Resultado de Aprendizaje de la Inducción",
            "horas": 96,
            "actividades": [
                "Estructurar la biblia de preproducción redactando el guion técnico y clasificando las tomas en rutas de renderizado directo o guía 3D.",
                "Diseñar viñetas de storyboard definiendo encuadres, ángulos y ritmos cinemáticos para la previsualización del teaser."
            ],
            "actividad_proyecto": "Estructurar la biblia de preproducción redactando el guion técnico y clasificando las tomas en rutas de renderizado directo o guía 3D."
        },
        {
            "numero": 8,
            "guia_id": "GA08",
            "guia_label": "Guía 08",
            "fase": "PLANEAR",
            "trimestre": "I",
            "rap_tecnico_id": "RAP-08",
            "rap_tecnico": "RAP 08: Establecer la guía gráfica y hojas de modelo de elementos conceptuales, manteniendo la coherencia estilística.",
            "competencia_tecnica": "250201022 Desarrollar storyboard de acuerdo con guion y contenido audiovisual e interactivo",
            "rap_transversal_id": "RAP-19",
            "rap_transversal": "RAP 19: Contribuir con el fortalecimiento de la cultura de paz a partir de la dignidad humana.",
            "competencia_transversal": "240201526 Enriquecer su proyecto de vida en un contexto productivo",
            "horas": 96,
            "actividades": [
                "Explorar el arte conceptual y lenguaje de formas del teaser mediante generación asistida por difusión 2D y armonías cromáticas.",
                "Dibujar y estandarizar hojas de modelo (Model Sheets) ortográficas consistentes del personaje antropomorfo y props clave."
            ],
            "actividad_proyecto": "Explorar el arte conceptual y lenguaje de formas del teaser mediante generación asistida por difusión 2D y armonías cromáticas."
        },
        {
            "numero": 9,
            "guia_id": "GA09",
            "guia_label": "Guía 09",
            "fase": "HACER",
            "trimestre": "III",
            "rap_tecnico_id": "RAP-09",
            "rap_tecnico": "RAP 09: Construir previsualizaciones dinámicas en entorno 3D (Previs/Animatic) ajustando movimientos de cámara y ritmo cinematográfico.",
            "competencia_tecnica": "250201026 Animar elementos de la escena según técnicas y especificaciones del proyecto",
            "rap_transversal_id": "RAP-22",
            "rap_transversal": "RAP 22: Aplicar prácticas de protección ambiental y seguridad y salud en el trabajo.",
            "competencia_transversal": "220601501 Aplicar prácticas de protección ambiental, seguridad y salud en el trabajo",
            "horas": 48,
            "actividades": [
                "Construir la animática 3D (Playblast) organizando la puesta en escena, ritmo dramático, lentes y tiros de cámara cinemática a 24 fps."
            ],
            "actividad_proyecto": "Construir la animática 3D (Playblast) organizando la puesta en escena, ritmo dramático, lentes y tiros de cámara cinemática a 24 fps."
        },
        {
            "numero": 10,
            "guia_id": "GA10",
            "guia_label": "Guía 10",
            "fase": "HACER",
            "trimestre": "IV",
            "rap_tecnico_id": "RAP-10",
            "rap_tecnico": "RAP 10: Integrar estructuras de armadura (Rigging), jerarquías de control y datos de captura de movimiento (MoCap).",
            "competencia_tecnica": "250201026 Animar elementos de la escena según técnicas y especificaciones del proyecto",
            "rap_transversal_id": "RAP-23",
            "rap_transversal": "RAP 23: Diseñar el plan de negocio y propuesta de valor del portafolio creativo.",
            "competencia_transversal": "240201529 Desarrollar procesos de comunicación y emprendimiento",
            "horas": 144,
            "actividades": [
                "Crear la estructura de armadura ósea (Skeleton), controladores IK/FK y cadenas de deformación del personaje.",
                "Ajustar la influencia de pesos de vértices (Skin Weighting) en articulaciones críticas y zonas anatómicas complejas.",
                "Capturar, retargetear y depurar datos de movimiento (MoCap) aplicando curvas de animación y blendshapes faciales."
            ],
            "actividad_proyecto": "Crear la estructura de armadura ósea (Skeleton), controladores IK/FK y cadenas de deformación del personaje."
        },
        {
            "numero": 11,
            "guia_id": "GA11",
            "guia_label": "Guía 11",
            "fase": "HACER",
            "trimestre": "IV",
            "rap_tecnico_id": "RAP-11",
            "rap_tecnico": "RAP 11: Estructurar plantillas de prompts técnicos y reglas de restricción lógica, asegurando la consistencia narrativa.",
            "competencia_tecnica": "250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual",
            "rap_transversal_id": "RAP-28",
            "rap_transversal": "RAP 28 (Inglés 4): Participar en conversaciones y revisiones técnicas de animación y VFX en inglés.",
            "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
            "horas": 48,
            "actividades": [
                "Parametrizar adaptadores estructurales (ControlNet Depth, OpenPose, Normal) para acondicionar la generación por difusión al modelo 3D."
            ],
            "actividad_proyecto": "Parametrizar adaptadores estructurales (ControlNet Depth, OpenPose, Normal) para acondicionar la generación por difusión al modelo 3D."
        },
        {
            "numero": 12,
            "guia_id": "GA12",
            "guia_label": "Guía 12",
            "fase": "HACER",
            "trimestre": "IV",
            "rap_tecnico_id": "RAP-12",
            "rap_tecnico": "RAP 12: Procesar y renderizar secuencias animadas vinculando pases de control 3D y motores de difusión generativa.",
            "competencia_tecnica": "250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual",
            "rap_transversal_id": "RAP-28",
            "rap_transversal": "RAP 28: Documentar flujos de trabajo de inteligencia artificial generativa aplicada.",
            "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
            "horas": 96,
            "actividades": [
                "Renderizar secuencias de video asistidas por difusión generativa manteniendo consistencia temporal y fidelidad de los activos.",
                "Procesar pases de corrección y deflicker para eliminar artefactos y parpadeo visual entre fotogramas."
            ],
            "actividad_proyecto": "Renderizar secuencias de video asistidas por difusión generativa manteniendo consistencia temporal y fidelidad de los activos."
        },
        {
            "numero": 13,
            "guia_id": "GA13",
            "guia_label": "Guía 13",
            "fase": "VERIFICAR",
            "trimestre": "VI",
            "rap_tecnico_id": "RAP-13",
            "rap_tecnico": "RAP 13: Componer y postproducir secuencias audiovisuales mediante integración de capas, correcciones digitales y ensamblado sonoro.",
            "competencia_tecnica": "250201039 Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual",
            "rap_transversal_id": "RAP-30",
            "rap_transversal": "RAP 30 (Inglés 6): Sustentar el showreel cinemático y pipeline técnico en inglés profesional.",
            "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
            "horas": 192,
            "actividades": [
                "Componer nodos de capas multicapa (Beauty, Shadow, Cryptomatte, Depth) en espacio de color ACEScg.",
                "Integrar efectos volumétricos, partículas simuladas y gradación de color cinemático.",
                "Sincronizar banda sonora, efectos de sala (Foley) y mezclar audio máster a -14 LUFS para exportar el teaser final de 60s."
            ],
            "actividad_proyecto": "Componer nodos de capas multicapa (Beauty, Shadow, Cryptomatte, Depth) en espacio de color ACEScg."
        },
        {
            "numero": 14,
            "guia_id": "GA14",
            "guia_label": "Guía 14",
            "fase": "VERIFICAR",
            "trimestre": "V",
            "rap_tecnico_id": "RAP-14",
            "rap_tecnico": "RAP 14: Optimizar e integrar activos 3D en motores en tiempo real mediante técnicas de reducción de geometría y mapas de iluminación.",
            "competencia_tecnica": "220501096 Desarrollar la solución de software de acuerdo con el diseño y requerimientos técnicos",
            "rap_transversal_id": "RAP-24",
            "rap_transversal": "RAP 24: Utilizar herramientas TIC para la gestión y colaboración en proyectos digitales.",
            "competencia_transversal": "220501501 Aplicar tecnologías de la información y comunicación TIC",
            "horas": 144,
            "actividades": [
                "Ensamblar la escena interactiva en el motor en tiempo real configurando iluminación estática (Lightmaps) y dinámica.",
                "Optimizar mallas mediante niveles de detalle (LODs), mallas de colisión simplificadas y perfiles de rendimiento a 60 FPS."
            ],
            "actividad_proyecto": "Ensamblar la escena interactiva en el motor en tiempo real configurando iluminación estática (Lightmaps) y dinámica."
        },
        {
            "numero": 15,
            "guia_id": "GA15",
            "guia_label": "Guía 15",
            "fase": "VERIFICAR",
            "trimestre": "V",
            "rap_tecnico_id": "RAP-15",
            "rap_tecnico": "RAP 15: Programar scripts de lógica e interacción en lenguajes orientados a objetos, implementando controladores de usuario.",
            "competencia_tecnica": "220501096 Desarrollar la solución de software de acuerdo con el diseño y requerimientos técnicos",
            "rap_transversal_id": "RAP-29",
            "rap_transversal": "RAP 29 (Inglés 5): Redactar documentación de APIs y scripts técnicos en inglés.",
            "competencia_transversal": "240202501 Interactuar en lengua inglesa de forma oral y escrita",
            "horas": 144,
            "actividades": [
                "Programar sistemas de locomoción dual (Teleport / Movimiento Continuo) para soporte de realidad virtual (VR) y PC.",
                "Desarrollar scripts orientados a objetos (POO) para interacción con componentes físicos, activación de mecanismos y configurador de materiales."
            ],
            "actividad_proyecto": "Programar sistemas de locomoción dual (Teleport / Movimiento Continuo) para soporte de realidad virtual (VR) y PC."
        },
        {
            "numero": 16,
            "guia_id": "GA16",
            "guia_label": "Guía 16",
            "fase": "ACTUAR",
            "trimestre": "VII",
            "rap_tecnico_id": "RAP-16",
            "rap_tecnico": "RAP 16: Compilar y desplegar aplicaciones interactivas multi-plataforma integrando interfaces de usuario (UI/UX) y simulaciones 3D.",
            "competencia_tecnica": "220501096 Desarrollar la solución de software de acuerdo con el diseño y requerimientos técnicos",
            "rap_transversal_id": "RAP-31",
            "rap_transversal": "RAP 31: Sustentar técnicamente el portafolio integral ante el comité evaluador institucional.",
            "competencia_transversal": "240201529 Desarrollar procesos de comunicación y emprendimiento",
            "horas": 96,
            "actividades": [
                "Diseñar e integrar la interfaz de usuario espacial (World-Space UI/UX) con paneles de telemetría y datos técnicos del activo.",
                "Compilar y empaquetar la aplicación ejecutable multiplataforma (.exe / WebGL) verificada sin errores de compilación.",
                "Sustentar técnicamente el portafolio integral de soluciones 3D ante el comité evaluador institucional y sector productivo."
            ],
            "actividad_proyecto": "Diseñar e integrar la interfaz de usuario espacial (World-Space UI/UX) con paneles de telemetría y datos técnicos del activo."
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
      if (!parsed.planeacion_proyecto || !Array.isArray(parsed.planeacion_proyecto) || parsed.planeacion_proyecto.length !== 16 || !parsed.planeacion_proyecto[0].actividades) {
        parsed.planeacion_proyecto = JSON.parse(JSON.stringify(PROYECTO_FORMATIVO_DEFAULT.planeacion_proyecto));
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed)); } catch (ignore) {}
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
  const found = list.find(p => {
    if (p.rap_tecnico_id && (p.rap_tecnico_id === rapId || p.rap_tecnico_id.replace(/[^0-9A-Z]/g, '') === cleanId)) return true;
    if (numInt !== null && p.numero === numInt) return true;
    if (!p.rap_tecnico) return false;
    const norm = p.rap_tecnico.toUpperCase();
    if (numStr && norm.includes('RAP ' + numStr)) return true;
    if (numInt !== null && norm.includes('RAP ' + numInt + ':')) return true;
    return false;
  });

  if (!found) return [];

  const guiaId = found.guia_id || (numStr ? `GA${numStr}` : 'GA01');
  const acts = (Array.isArray(found.actividades) && found.actividades.length > 0)
    ? found.actividades
    : [found.actividad_proyecto || 'Desarrollar y optimizar los activos según especificaciones de producción.'];

  return acts.map((actTxt, i) => ({
    guia_id: guiaId,
    actividad_id: i + 1,
    actividad_proyecto: typeof actTxt === 'string' ? actTxt : (actTxt.actividad_proyecto || actTxt)
  }));
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
