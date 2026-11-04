// Base de Datos Unificada de RAPs, Competencias, Criterios y Saberes
export const RAPS_TECNICOS = {
  "RAP-01": {
    "id": "RAP 01",
    "norma_codigo": "220501083",
    "norma_nombre": "Producir los componentes de la animación de acuerdo con técnicas de modelado y diseño",
    "producto_norma": "Mallas tridimensionales de escultura orgánica con volumen anatómico y bloqueo estructural validado.",
    "producto_egresado": "Malla 3D esculpida con volumen anatómico y estructura de detalle definida mediante flujo híbrido.",
    "evidencia": "Archivo digital editable de escultura orgánica con bloqueo volumétrico validado.",
    "resultado_aprendizaje": "Construir mallas tridimensionales de escultura orgánica con precisión volumétrica y detalle anatómico, aplicando técnicas manuales y de asistencia digital según especificaciones del proyecto.",
    "horas": 144,
    "creditos_competencia": 8,
    "horas_competencia": 384,
    "conocimientos_proceso": [
      "Analizar referencias visuales y hojas de modelo.",
      "Bloquear volúmenes y siluetas primarias de forma manual.",
      "Generar mallas base (blocking) alternativas mediante síntesis 3D por IA.",
      "Esculpir masa muscular y pliegues con pinceles digitales.",
      "Escalar niveles de subdivisión de malla en el software 3D.",
      "Refinar formas secundarias mediante asistencia volumétrica.",
      "Estampar alfas manuales y microtexturas de piel.",
      "Generar accesorios y variaciones orgánicas por síntesis 3D.",
      "Validar la densidad y calidad técnica del modelo esculpido."
    ],
    "conocimientos_saber": [
      "Anatomía artística: estructura, miología y proporción.",
      "Técnicas de bloqueo 3D tradicional (blocking).",
      "Generadores de mallas base 3D asistidos por IA (Image-to-3D).",
      "Pinceles de escultura digital: tipos y aplicación.",
      "Subdivisión poligonal y topología dinámica (DynaMesh/Remesh).",
      "Herramientas de asistencia volumétrica y proyección.",
      "Mapas de alfas, pinceles VDM y microdetallado.",
      "Asistencia digital en generación de mallas base y props.",
      "Criterios de calidad y densidad técnica en mallas esculpidas."
    ],
    "criterios_evaluacion": [
      "Estructura el bloqueo volumétrico primario respetando proporciones anatómicas y silueta.",
      "Esculpe estructuras orgánicas aplicando pinceles digitales y subdivisión de malla.",
      "Integra microtexturas orgánicas garantizando la calidad del modelo esculpido."
    ],
    "categoria": "modelado",
    "icono": "box",
    "actividad_clave": "1. Escultura Digital Orgánica y Bloqueo 3D",
    "herramientas_recomendadas": [
      "ZBrush",
      "Blender Sculpt",
      "Rodin / Meshy / Tripo3D (IA)",
      "PureRef"
    ]
  },
  "RAP-02": {
    "id": "RAP 02",
    "norma_codigo": "220501083",
    "norma_nombre": "Producir los componentes de la animación de acuerdo con técnicas de modelado y diseño",
    "producto_norma": "Activos 3D en baja densidad poligonal (Low-Poly) con desplegado de mapas UV uniforme y sin distorsión.",
    "producto_egresado": "Malla poligonal optimizada en baja densidad (Low-Poly) con mapa UV uniforme.",
    "evidencia": "Activo 3D retopologizado con mapa UV desplegado sin estiramientos de textura.",
    "resultado_aprendizaje": "Optimizar la topología poligonal de mallas 3D y desplegar mapas UV uniformes, garantizando el flujo de bordes y la eficiencia técnica para su posterior texturizado e integración.",
    "horas": 96,
    "creditos_competencia": 8,
    "horas_competencia": 384,
    "conocimientos_proceso": [
      "Trazar manualmente anillos y bucles (edge loops) en zonas de deformación.",
      "Aplicar algoritmos de autorretopología neuronal y guiada por campos vectoriales.",
      "Garantizar estructura limpia basada en cuadriláteros (quads).",
      "Diezmar y simplificar geometría densa manualmente.",
      "Ajustar el presupuesto de polígonos según el target del proyecto.",
      "Optimizar la densidad de malla conservando la silueta del modelo.",
      "Marcar costuras UV manuales y optimizar empaquetado UV con algoritmos e IA."
    ],
    "conocimientos_saber": [
      "Topología poligonal: flujo de bordes y geometría cuadrangular.",
      "Geometría de deformación muscular (quads) vs. triángulos.",
      "Métodos de autorretopología asistida y campos de dirección.",
      "Presupuesto poligonal (Polycount) para cine, render e interactivos.",
      "Retopología: comparación entre métodos manuales y automáticos.",
      "Optimización geométrica adaptativa sin pérdida de detalle.",
      "Despliegue UV: distorsión, escala de texels y empaquetado óptimo."
    ],
    "criterios_evaluacion": [
      "Reconstruye la topología poligonal garantizando el flujo de bordes en zonas de flexión.",
      "Optimiza la cantidad de polígonos conservando la silueta original del modelo.",
      "Despliega y empaqueta islas UV uniformes sin estiramientos ni solapamientos."
    ],
    "categoria": "modelado",
    "icono": "grid",
    "actividad_clave": "2. Topología, Retopología y Despliegue UV",
    "herramientas_recomendadas": [
      "Blender",
      "Topogun",
      "QuadRemesher",
      "RizomUV"
    ]
  },
  "RAP-03": {
    "id": "RAP 03",
    "norma_codigo": "220501083",
    "norma_nombre": "Producir los componentes de la animación de acuerdo con técnicas de modelado y diseño",
    "producto_norma": "Mallas 3D texturizadas bajo estándares PBR listas para integración en motores de tiempo real o entornos de render.",
    "producto_egresado": "Activo 3D texturizado bajo estándar PBR listo para integración en motores o render.",
    "evidencia": "Malla 3D con materiales PBR aplicados y mapas de normales proyectados correctamente.",
    "resultado_aprendizaje": "Generar y aplicar materiales bajo estándares PBR mediante proyección de mapas y creación de shaders, asegurando la fidelidad visual y respuesta lumínica en entornos de render o tiempo real.",
    "horas": 144,
    "creditos_competencia": 8,
    "horas_competencia": 384,
    "conocimientos_proceso": [
      "Proyectar mapas de normales y AO de alta a baja resolución (baking).",
      "Sintetizar mapas PBR (Normal, Roughness, Height) a partir de imágenes 2D por IA.",
      "Corregir jaulas de bake y artefactos de proyección en el software de texturizado.",
      "Pintar capas de albedo, roughness y metalicidad bajo estándar PBR.",
      "Generar patrones de textura tiling sin costuras mediante difusión 2D.",
      "Aplicar máscaras de desgaste, suciedad y variaciones de superficie.",
      "Ensamblar grafos nodales de materiales en motor o suite 3D.",
      "Configurar efectos de dispersión subsuperficial (SSS) y transparencia.",
      "Validar la respuesta lumínica del material bajo distintas condiciones de luz."
    ],
    "conocimientos_saber": [
      "Baking de mapas: normales, oclusión ambiental (AO) y curvatura.",
      "Generación de mapas PBR asistida por IA (2D-to-PBR).",
      "Corrección de errores de proyección y espacio de tangentes.",
      "Flujo PBR: Metallic/Roughness vs. Specular/Glossiness.",
      "Texturas PBR generativas sin costuras (Seamless AI).",
      "Texturizado procedural por capas, máscaras y mapas generados.",
      "Shading nodal: conexión de mapas y parámetros de material.",
      "Subsurface Scattering (SSS) y dispersión física de la luz.",
      "Respuesta lumínica y calibración de shaders en tiempo real."
    ],
    "criterios_evaluacion": [
      "Proyecta mapas de alta resolución sobre la malla optimizada sin artefactos.",
      "Crea materiales bajo estándares PBR coherentes con la respuesta física de la luz.",
      "Ensambla shaders nodales funcionales ajustados a las condiciones lumínicas."
    ],
    "categoria": "modelado",
    "icono": "palette",
    "actividad_clave": "3. Texturizado PBR y Generación de Materiales",
    "herramientas_recomendadas": [
      "Substance Painter",
      "Marmoset Toolbag",
      "ArmorPaint",
      "Stable Diffusion / Midjourney (texturas PBR)"
    ]
  },
  "RAP-04": {
    "id": "RAP 04",
    "norma_codigo": "220101016",
    "norma_nombre": "Generar prototipo digital según técnicas de modelado y especificaciones de producto",
    "producto_norma": "Prototipos CAD paramétricos hard-surface con árbol de operaciones editable y ensambles con tolerancias de montaje.",
    "producto_egresado": "Prototipo CAD paramétrico hard-surface con árbol de operaciones y ensambles funcionales.",
    "evidencia": "Modelo CAD editable con plano técnico de tolerancias dimensionales.",
    "resultado_aprendizaje": "Modelar prototipos digitales CAD paramétricos hard-surface, estructurando árboles de operaciones y ensambles funcionales ajustados a tolerancias dimensionales y requerimientos técnicos.",
    "horas": 144,
    "creditos_competencia": 6,
    "horas_competencia": 288,
    "conocimientos_proceso": [
      "Dibujar bocetos 2D paramétricos con dimensiones reales.",
      "Automatizar scripts de patrones geométricos complejos en CAD usando LLMs.",
      "Dimensionar cotas y aplicar restricciones geométricas estrictas.",
      "Ejecutar extrusiones, cortes, revoluciones y booleanas mecánicas.",
      "Optimizar piezas estructurales combinando modelado CAD y diseño generativo.",
      "Mantener el árbol histórico de operaciones completamente editable.",
      "Vincular piezas componentes mediante uniones mecánicas funcionales.",
      "Verificar holguras, interferencias y tolerancias dimensionales.",
      "Generar planos técnicos normados con vistas explosionadas."
    ],
    "conocimientos_saber": [
      "Croquizado CAD: geometría 2D, perfiles y bocetos.",
      "Automatización de código/scripts CAD mediante modelos de lenguaje.",
      "Restricciones geométricas (coincidencia, tangencia) y cotas.",
      "Operaciones 3D CAD: extrusión, rellenado y operaciones booleanas.",
      "Principios de diseño generativo y optimización topológica.",
      "Árbol de operaciones e historial de modificación paramétrica.",
      "Ensambles CAD: uniones, relaciones de posición y grados de libertad.",
      "Tolerancias dimensionales, ajustes mecánicos y control de calidad.",
      "Planos técnicos normados y listas de materiales (BOM)."
    ],
    "criterios_evaluacion": [
      "Diseña croquis 2D parametrizados con restricciones geométricas y cotas completas.",
      "Estructura cuerpos sólidos hard-surface conservando el historial editable.",
      "Modela ensambles mecánicos funcionales ajustados a tolerancias dimensionales."
    ],
    "categoria": "ingenieria",
    "icono": "cpu",
    "actividad_clave": "4. Modelado CAD Paramétrico y Ensambles Técnicos",
    "herramientas_recomendadas": [
      "Fusion 360",
      "Plasticity",
      "FreeCAD",
      "Python Scripting para CAD"
    ]
  },
  "RAP-05": {
    "id": "RAP 05",
    "norma_codigo": "220101016",
    "norma_nombre": "Generar prototipo digital según técnicas de modelado y especificaciones de producto",
    "producto_norma": "Archivos de código numérico (G-Code) verificados y prototipos fabricados físicamente (FDM/SLA) o simulados digitalmente.",
    "producto_egresado": "Pieza fabricada físicamente en 3D o paquete de instrucciones numéricas y simulación de laminación digital verificada.",
    "evidencia": "Prototipo impreso en 3D o archivo de simulación de laminación (.gcode / .3mf) con reporte de tolerancias.",
    "resultado_aprendizaje": "Configurar parámetros de laminación y generar paquetes de código numérico (G-Code) o prototipos físicos fabricados mediante tecnologías 3D, validando tolerancias y especificaciones del producto.",
    "horas": 48,
    "creditos_competencia": 6,
    "horas_competencia": 288,
    "conocimientos_proceso": [
      "Orientar la pieza digital en la plataforma de impresión.",
      "Generar estructuras de soporte manuales y automáticas ajustadas.",
      "Minimizar consumo de material y tiempo de fabricación.",
      "Definir altura de capa, temperatura de boquilla y velocidades.",
      "Seleccionar patrones y densidad de relleno (infill) tradicional u optimizado por IA.",
      "Configurar valores de retracción y perímetros de pared.",
      "Simular trayectorias de cabezal o proyección láser en el laminador.",
      "Detectar posibles colisiones, voladizos e imprecisiones de capa.",
      "Compilar y exportar el archivo de código numérico (G-Code)."
    ],
    "conocimientos_saber": [
      "Tecnologías de fabricación 3D: FDM, SLA, DLP, PolyJet.",
      "Orientación de pieza, adherencia a cama y comportamiento térmico.",
      "Estructuras y tipos de soporte (árbol, lineal).",
      "Parámetros de slicing (laminado 3D) e interlineado de capas.",
      "Patrones de relleno (infill) y optimización de resistencia mecánica.",
      "Propiedades físicas de filamentos (PLA, ABS, PETG) y resinas.",
      "Código G (G-Code): estructura, comandos de movimiento y temperatura.",
      "Simulación visual de laminado y detección de colisiones.",
      "Procedimientos de control de calidad en prototipos 3D."
    ],
    "criterios_evaluacion": [
      "Posiciona piezas y soportes optimizando el consumo de material y adherencia.",
      "Configura parámetros de laminación asegurando resistencia y precisión dimensional.",
      "Genera paquetes de G-Code validados mediante simulación de trayectorias."
    ],
    "categoria": "ingenieria",
    "icono": "printer",
    "actividad_clave": "5. Fabricación Digital e Impresión 3D (Simulada / Física)",
    "herramientas_recomendadas": [
      "OrcaSlicer",
      "PrusaSlicer",
      "Bambu Studio",
      "Chitubox"
    ]
  },
  "RAP-06": {
    "id": "RAP 06",
    "norma_codigo": "220101016",
    "norma_nombre": "Generar prototipo digital según técnicas de modelado y especificaciones de producto",
    "producto_norma": "Expedientes técnicos y modelos de información espacial clasificados bajo estándar IFC con documentación técnica integrada.",
    "producto_egresado": "Expediente técnico e integración del modelo o estructura dentro de un entorno arquitectónico e industrial bajo estándar IFC.",
    "evidencia": "Modelo BIM abierto (.ifc) con familias/componentes paramétricos y memoria descriptiva generada.",
    "resultado_aprendizaje": "Estructurar modelos de información espacial bajo estándares abiertos IFC y documentación técnica en entornos BIM, según las necesidades del proyecto arquitectónico e industrial.",
    "horas": 96,
    "creditos_competencia": 6,
    "horas_competencia": 288,
    "conocimientos_proceso": [
      "Modelar elementos espaciales y componentes constructivos interiores.",
      "Asignar parámetros de dimensiones, materiales y costos.",
      "Clasificar objetos en categorías BIM estandarizadas.",
      "Asignar propiedades técnicas a entidades y clases IFC.",
      "Mapear atributos de geometría e información de proyecto.",
      "Exportar el modelo digital en formato abierto IFC.",
      "Extraer cuadros de áreas, cantidades y cómputos métricos.",
      "Redactar memorias descriptivas técnicas con asistencia de LLMs.",
      "Validar la coherencia global del modelo informativo espacial."
    ],
    "conocimientos_saber": [
      "Metodología BIM: conceptos, niveles de desarrollo (LOD) y roles.",
      "Familias y componentes paramétricos inteligentes.",
      "Categorías espaciales, de equipamiento y constructivas.",
      "Estándar abierto IFC (Industry Foundation Classes) para interoperabilidad.",
      "Mapeo de datos y conjuntos de propiedades (Psets).",
      "Interoperabilidad entre plataformas CAD, BIM y 3D.",
      "Documentación técnica BIM, tablas de planificación y cómputos métricos.",
      "Asistencia en redacción técnica mediante inteligencia artificial (LLMs).",
      "Control de calidad e información unificada de proyecto."
    ],
    "criterios_evaluacion": [
      "Modela componentes espaciales paramétricos clasificados en categorías BIM.",
      "Estructura modelos de información bajo estándares IFC garantizando interoperabilidad.",
      "Genera documentación técnica y cómputos métricos integrados al modelo BIM."
    ],
    "categoria": "ingenieria",
    "icono": "layers",
    "actividad_clave": "6. Coordinación BIM, Estándares IFC y Documentación Técnica",
    "herramientas_recomendadas": [
      "Revit / BlenderBIM",
      "FreeCAD BIM",
      "BIMcollab",
      "LLMs de redacción técnica"
    ]
  },
  "RAP-07": {
    "id": "RAP 07",
    "norma_codigo": "250201022",
    "norma_nombre": "Desarrollar storyboard de acuerdo con guion y contenido audiovisual e interactivo",
    "producto_norma": "Biblia de preproducción con guion técnico, storyboard estructurado y mapa de decisiones del pipeline.",
    "producto_egresado": "Documento de preproducción con clasificación de tomas para renderizado directo o guía 3D.",
    "evidencia": "Guion técnico y storyboard con marcas de ruta de producción (Directa vs. Previs 3D).",
    "resultado_aprendizaje": "Elaborar guiones técnicos y storyboards de preproducción clasificando tomas y rutas de renderizado, de acuerdo con los requerimientos narrativos y visuales de la secuencia audiovisual.",
    "horas": 96,
    "creditos_competencia": 4,
    "horas_competencia": 192,
    "conocimientos_proceso": [
      "Definir la idea central, sinopsis y estructura dramática.",
      "Redactar propuestas de guion base asistidas por modelos de lenguaje (LLMs).",
      "Desarrollar diálogos, acciones y arcos de personaje en tres actos.",
      "Desglosar el guion narrativo en tomas y secuencias numeradas.",
      "Planificar la escala de planos, ángulos y movimientos de cámara.",
      "Añadir especificaciones técnicas de lente y duración de toma.",
      "Dibujar viñetas de storyboard reflejando encuadres y acciones clave.",
      "Prototipar paneles de referencia mediante generadores 2D asistidos.",
      "Clasificar tomas para renderizado 3D directo o previsualización."
    ],
    "conocimientos_saber": [
      "Ideación y estructura narrativa en tres actos.",
      "Formato estándar de guion audiovisual.",
      "Asistentes de redacción e IA en preproducción (LLMs).",
      "Lenguaje cinematográfico: planos, ángulos y movimientos de cámara.",
      "Desglose de guion técnico y parámetros de cámara.",
      "Intención narrativa y ritmo audiovisual.",
      "Storyboard: técnicas de viñetado, composición y encuadre.",
      "Mantenimiento del eje de acción (180°) y raccord visual.",
      "Rutas de renderizado y clasificación técnica de tomas."
    ],
    "criterios_evaluacion": [
      "Redacta el guion narrativo respetando la estructura dramática de la historia.",
      "Elabora el guion técnico definiendo planos, cámaras y requerimientos narrativos.",
      "Diseña viñetas de storyboard clasificando rutas de producción y renderizado."
    ],
    "categoria": "animacion",
    "icono": "film",
    "actividad_clave": "1. Preproducción, Guionismo y Clasificación de Tomas",
    "herramientas_recomendadas": [
      "Storyboarder",
      "Krita / Photoshop",
      "Claude / ChatGPT (guion)",
      "Milanote"
    ]
  },
  "RAP-08": {
    "id": "RAP 08",
    "norma_codigo": "250201022",
    "norma_nombre": "Desarrollar storyboard de acuerdo con guion y contenido audiovisual e interactivo",
    "producto_norma": "Hojas de referencia gráfica (Call Sheets) validadas, ajustadas manualmente y listas para guiar la generación sintética.",
    "producto_egresado": "Paquete de activos conceptuales (personajes, vehículos, fondos) con acabado estético unificado.",
    "evidencia": "Hojas de modelo y props editadas en software 2D con control de paleta de color y estilo.",
    "resultado_aprendizaje": "Establecer la guía gráfica y hojas de modelo de elementos conceptuales, manteniendo la coherencia estilística, paleta de color y estándares estéticos previstos para la producción.",
    "horas": 96,
    "creditos_competencia": 4,
    "horas_competencia": 192,
    "conocimientos_proceso": [
      "Explorar formas, siluetas y estilo de personajes y props.",
      "Generar variaciones de Concept Art asistidas por motores de difusión 2D.",
      "Definir el lenguaje de formas y la guía de estilo definitiva.",
      "Dibujar vistas ortográficas (front, side, back) y alineaciones de giros.",
      "Generar vistas ortogonales consistentes asistidas por motores de difusión (Image-to-Image / ControlNet).",
      "Ajustar hojas de modelo, simetría y limpiado manual sobre mallas 2D generadas."
    ],
    "conocimientos_saber": [
      "Concept Art: lenguaje de formas, siluetas y lenguaje visual.",
      "Generación conceptual asistida por motores de difusión 2D.",
      "Teoría del color, armonías y psicología cromática.",
      "Hojas de modelo (Model Sheets) y giros de personaje (turnarounds).",
      "Generación asistida de vistas ortogonales y consistencia entre ángulos por IA.",
      "Control de proporciones, escalas dimensionales y edición digital."
    ],
    "criterios_evaluacion": [
      "Diseña arte conceptual definiendo el lenguaje de formas y estilo de producción.",
      "Diseña hojas de modelo ortográficas con escalas y referencias alineadas para modelado mediante flujo híbrido."
    ],
    "categoria": "animacion",
    "icono": "image",
    "actividad_clave": "2. Diseño de Arte Enfoque 'Asset-First' y Edición de Referencias",
    "herramientas_recomendadas": [
      "Photoshop",
      "Krita",
      "ComfyUI / Stable Diffusion",
      "IP-Adapter"
    ]
  },
  "RAP-09": {
    "id": "RAP 09",
    "norma_codigo": "250201026",
    "norma_nombre": "Animar elementos de la escena según técnicas y especificaciones del proyecto",
    "producto_norma": "Secuencias de animación 3D en gris (Previs) con movimiento de cámara, encuadres y ritmo cinemático bloqueados.",
    "producto_egresado": "Previsualización 3D (Animatic/Previs) con cámaras y ritmos narrativos aprobados.",
    "evidencia": "Video Playblast en gris de la animación 3D con movimientos de cámara y tiempo calibrados.",
    "resultado_aprendizaje": "Construir previsualizaciones dinámicas en entorno 3D (Previs/Animatic) ajustando movimientos de cámara, encuadres y ritmo cinematográfico según las especificaciones de la escena.",
    "horas": 48,
    "creditos_competencia": 4,
    "horas_competencia": 192,
    "conocimientos_proceso": [
      "Ubicar los activos 3D base en el espacio de la escena 3D (Layout).",
      "Estructurar la escala, profundidad y relaciones espaciales.",
      "Bloquear las posiciones iniciales y trayectorias de los personajes.",
      "Configurar lentes cinematográficos, profundidad de campo y FOV.",
      "Animar movimientos de cámara, traslaciones y orientaciones.",
      "Ajustar encuadres cinemáticos y reglas de composición en 3D.",
      "Configurar pases de renderizado rápido en gris (playblast).",
      "Editar la secuencia en línea de tiempo ajustando duración de tomas.",
      "Validar el ritmo dinámico y el tiempo de la secuencia animada."
    ],
    "conocimientos_saber": [
      "Layout 3D: composición espacial, profundidad y escala.",
      "Relaciones espaciales entre cámara, personajes y entorno.",
      "Bloqueo de posiciones (blocking) en el espacio 3D.",
      "Cinematografía digital 3D: lentes, campo de visión (FOV) y profundidad.",
      "Animación de cámaras 3D y trayectorias continuas.",
      "Encuadres, regla de tercios y ritmo cinemático.",
      "Animatics 3D y secuencias playblast de previsualización.",
      "Edición de video base, corte y sincronía temporal.",
      "Formatos de exportación rápida para revisión de producción."
    ],
    "criterios_evaluacion": [
      "Ubica los elementos en un layout 3D respetando la narrativa y escalas espaciales.",
      "Anima cámaras 3D garantizando continuidad visual, encuadre y ritmo cinematográfico.",
      "Construye previsualizaciones 3D en gris validando tiempos y ritmos de cámara."
    ],
    "categoria": "animacion",
    "icono": "video",
    "actividad_clave": "3. Maquetado Escénico (Previs) y Control Cinemático de Cámara 3D",
    "herramientas_recomendadas": [
      "Blender",
      "Maya",
      "Unreal Engine CineCamera",
      "DaVinci Resolve"
    ]
  },
  "RAP-10": {
    "id": "RAP 10",
    "norma_codigo": "250201026",
    "norma_nombre": "Animar elementos de la escena según técnicas y especificaciones del proyecto",
    "producto_norma": "Modelos 3D animados y riggeados preparados para emisión de pases de control espacial.",
    "producto_egresado": "Sistemas de armaduras y captura de movimiento integrados para guiado estructural de video.",
    "evidencia": "Archivo 3D con personajes y accesorios animados con parámetros de deformación verificados.",
    "resultado_aprendizaje": "Integrar estructuras de armadura (Rigging), jerarquías de control y datos de captura de movimiento (MoCap), asegurando la deformación coherente y el guiado espacial de personajes y props.",
    "horas": 144,
    "creditos_competencia": 4,
    "horas_competencia": 192,
    "conocimientos_proceso": [
      "Crear manual o asistidamente cadenas de huesos y articulaciones.",
      "Orientar los ejes locales de rotación de cada elemento (joints).",
      "Estructurar jerarquías de nodos para personajes y objetos.",
      "Configurar cadenas de Cinemática Inversa (IK) y Directa (FK).",
      "Crear controladores personalizados y curvas de manipulación.",
      "Aplicar restricciones de posición, rotación y orientación (constraints).",
      "Asignar y pintar pesos de deformación de vértices (skinning).",
      "Capturar o extraer datos de movimiento desde video monocular por IA.",
      "Retargetear y limpiar curvas de animación en el esqueleto 3D."
    ],
    "conocimientos_saber": [
      "Anatomía para rigging, esqueletos 3D y orientación de joints.",
      "Jerarquías de transformación, nodos padre/hijo y pivotes.",
      "Sistemas de auto-rigging y generación de armaduras base.",
      "Cinemática Inversa (IK), Cinemática Directa (FK) y conmutación IK/FK.",
      "Restricciones (constraints): Parent, Point, Orient, Pole Vector.",
      "Diseño de interfaces de control para animación.",
      "Skinning: asignación, suavizado y pesos de deformación en malla.",
      "Captura de movimiento tradicional vs. Markerless MoCap por IA.",
      "Retargeting de datos de movimiento y edición de curvas F-Curve."
    ],
    "criterios_evaluacion": [
      "Emplaza esqueletos 3D definiendo jerarquías y ejes de transformación correctos.",
      "Configura sistemas de rigging con controles IK/FK y restricciones funcionales.",
      "Asigna pesos de deformación e integra datos de captura de movimiento sin distorsión."
    ],
    "categoria": "animacion",
    "icono": "activity",
    "actividad_clave": "4. Rigging, MoCap y Scripting para Control de Deformación",
    "herramientas_recomendadas": [
      "Blender Auto-Rig Pro / Rigify",
      "Cascadeur",
      "Rokoko Video / Plask AI MoCap",
      "Mixamo"
    ]
  },
  "RAP-11": {
    "id": "RAP 11",
    "norma_codigo": "250201039",
    "norma_nombre": "Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual y plataforma de exhibición",
    "producto_norma": "Especificaciones y plantillas de prompts de producción con reglas de estilo y restricciones técnicas.",
    "producto_egresado": "Plantilla de prompts técnicos parametrizados para mantener la coherencia narrativa de video.",
    "evidencia": "Documentación técnica de prompts y conjuntos de reglas (system prompts) aplicados al proyecto.",
    "resultado_aprendizaje": "Estructurar plantillas de prompts técnicos y reglas de restricción lógica, asegurando la consistencia narrativa, estilística y técnica del proyecto audiovisual.",
    "horas": 48,
    "creditos_competencia": 7,
    "horas_competencia": 336,
    "conocimientos_proceso": [
      "Seleccionar vocabulario técnico de iluminación, arte y cinematografía.",
      "Estructurar atributos visuales en sintaxis de descriptores técnicos.",
      "Configurar la ponderación (weights) y relevancia de palabras clave.",
      "Definir parámetros de exclusión visual (prompts negativos).",
      "Configurar semillas numéricas (seeds), escala CFG y samplers.",
      "Aplicar adaptadores de control estructural (ControlNet / IP-Adapter).",
      "Diseñar matrices de prompts parametrizadas y reutilizables.",
      "Probar la estabilidad del estilo visual en lotes masivos de imágenes.",
      "Documentar las librerías de prompts para el equipo de producción."
    ],
    "conocimientos_saber": [
      "Ingeniería de prompts: sintaxis, orden y estructura de descriptores.",
      "Vocabulario técnico de arte 3D, lentes, iluminación y cámara.",
      "Ponderación de términos (weighting) y modificadores sintácticos.",
      "Prompts negativos y reglas de restricción sintáctica.",
      "Parámetros de generación: Seed, CFG Scale, Samplers, Steps.",
      "Adaptadores de control estético y geométrico (ControlNet).",
      "Plantillas de prompts y hojas de parámetros de producción.",
      "Pruebas de consistencia e inferencia por lotes (batch testing).",
      "Documentación e integración de pipelines generativos."
    ],
    "criterios_evaluacion": [
      "Redacta prompts técnicos estructurados con terminología precisa de producción.",
      "Aplica reglas de restricción lógica garantizando consistencia en la generación.",
      "Estructura plantillas de prompts operativas parametrizadas para el equipo de producción."
    ],
    "categoria": "animacion",
    "icono": "terminal",
    "actividad_clave": "5. Estructuración Modular de Prompts Técnicos y Restricciones (Locks)",
    "herramientas_recomendadas": [
      "ComfyUI",
      "Automatic1111",
      "Fooocus",
      "Claude / GPT para prompt crafting"
    ]
  },
  "RAP-12": {
    "id": "RAP 12",
    "norma_codigo": "250201039",
    "norma_nombre": "Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual y plataforma de exhibición",
    "producto_norma": "Secuencias de video animadas renderizadas por IA con consistencia temporal, encuadre 3D y coherencia de personajes.",
    "producto_egresado": "Secuencias finales de video estilizadas con control cinemático de cámara y consistencia de personaje.",
    "evidencia": "Video final renderizado (.mp4) comparado y sincronizado contra la previsualización 3D base.",
    "resultado_aprendizaje": "Procesar y renderizar secuencias animadas vinculando pases de control 3D y motores de difusión, garantizando consistencia cinemática de cámara y fidelidad de los personajes.",
    "horas": 96,
    "creditos_competencia": 7,
    "horas_competencia": 336,
    "conocimientos_proceso": [
      "Configurar pases de render 3D (Depth, Normal, Motion Vector, Beauty).",
      "Ajustar muestras de renderizado y filtros de denoise asistidos por IA.",
      "Exportar secuencias de fotogramas en formatos multicanal de alta profundidad.",
      "Vincular secuencias de pases 3D a procesadores de difusión guiada.",
      "Calibrar la fuerza de denoise y la influencia de la guía 3D.",
      "Garantizar la conservación de encuadres y movimiento de cámara.",
      "Aplicar filtros de consistencia temporal entre fotogramas de video.",
      "Corregir el parpadeo (flicker) mediante interpolación de flujo óptico por IA.",
      "Validar la fluidez cinemática y la estabilidad del producto final."
    ],
    "conocimientos_saber": [
      "Pases de render (AOVs): Profundidad (Z), Normales, Vectores de movimiento.",
      "Algoritmos de muestreo, control de ruido y Denoisers por IA (OptiX/OpenImageDenoise).",
      "Formatos de imagen profesionales multicanal (EXR 32-bit, PNG 16-bit).",
      "Procesamiento de difusión guiado por pases geométricos 3D.",
      "Adaptadores de control geométrico (ControlNet Depth, Normal, Canny).",
      "Calibración de fuerza de denoise e inferencia temporal.",
      "Consistencia temporal en secuencias sintéticas animadas.",
      "Técnicas de Deflicker e interpolación de cuadros por IA (RIFE/Flow).",
      "Control de calidad en secuencias cinemáticas de video."
    ],
    "criterios_evaluacion": [
      "Configura y exporta pases AOV 3D garantizando la información técnica necesaria.",
      "Procesa secuencias de render vinculando pases 3D a motores de difusión guiada.",
      "Elimina la inestabilidad temporal entregando secuencias de video fluidas y coherentes."
    ],
    "categoria": "animacion",
    "icono": "zap",
    "actividad_clave": "6. Renderizado Generativo de Video guiado por Pases 3D (ControlNet / Adapter)",
    "herramientas_recomendadas": [
      "ComfyUI AnimateDiff",
      "ControlNet Depth/OpenPose",
      "Runway Gen-3 / Kling / Luma",
      "Topaz Video AI"
    ]
  },
  "RAP-13": {
    "id": "RAP 13",
    "norma_codigo": "250201039",
    "norma_nombre": "Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual y plataforma de exhibición",
    "producto_norma": "Secuencia audiovisual completa terminada, pulida e integrada para exhibición.",
    "producto_egresado": "Cortometraje o secuencia audiovisual final compuesta, corregida y lista para entrega.",
    "evidencia": "Archivo de video final con composición de capas, correcciones manuales y montaje de audio.",
    "resultado_aprendizaje": "Componer y postproducir secuencias audiovisuales mediante integración de capas, correcciones digitales y ensamblado sonoro, entregando el producto final según los requerimientos de la plataforma de exhibición.",
    "horas": 192,
    "creditos_competencia": 7,
    "horas_competencia": 336,
    "conocimientos_proceso": [
      "Integrar pases AOV y capas de render en el árbol de nodos.",
      "Generar máscaras de rotoscopia automáticas mediante IA (Segment Anything) y manuales.",
      "Compaginar elementos 3D, efectos visuales y fondos digitales.",
      "Aplicar corrección de color primaria y graduación de estilo (Color Grading).",
      "Agregar efectos de lente de cámara (glow, bloom, aberración cromática).",
      "Ajustar el proyecto al espacio de color objetivo (ACES / sRGB / Rec.709).",
      "Sincronizar la secuencia de video compuesta con la pista sonora.",
      "Limpiar, restaurar o generar efectos foley de audio con asistencia de IA.",
      "Mezclar pistas de sonido y exportar el máster final en el códec requerido."
    ],
    "conocimientos_saber": [
      "Composición digital por nodos: estructura, canales y operaciones Math.",
      "Técnicas de rotoscopia tradicional e inpainting/segmentación por IA.",
      "Integración fotorrealista de elementos CGI sobre placas de video.",
      "Colorimetría: curvas de color, balance de blancos, LUTs y ruedas de color.",
      "Efectos ópticos de cámara y distorsión de lente.",
      "Manejo de espacios de color estandarizados (ACES / Rec.709).",
      "Edición de video no lineal, código de tiempo y sincronía A/V.",
      "Mezcla de audio, diseño sonoro y restauración por IA.",
      "Estándares de compresión de video, códecs (H.264, ProRes) y contenedores."
    ],
    "criterios_evaluacion": [
      "Compone capas de render e integración de elementos en un árbol nodal funcional.",
      "Aplica corrección de color y efectos de lente garantizando acabado cinematográfico.",
      "Ensambla la secuencia audiovisual final compuesta y sonorizada para exhibición."
    ],
    "categoria": "animacion",
    "icono": "sliders",
    "actividad_clave": "7. Postproducción, Corrección de Errores y Ensamblado Final",
    "herramientas_recomendadas": [
      "DaVinci Resolve / Fusion",
      "Adobe After Effects",
      "Nuke Non-Commercial",
      "ElevenLabs / Suno (audio)"
    ]
  },
  "RAP-14": {
    "id": "RAP 14",
    "norma_codigo": "220501096",
    "norma_nombre": "Desarrollar la solución de software de acuerdo con el diseño y requerimientos técnicos",
    "producto_norma": "Paquetes de activos 3D optimizados integrados en el motor gráfico con tasa de cuadros estable (60 FPS).",
    "producto_egresado": "Paquetes de activos 3D completamente optimizados para renderizado fluido a 60 FPS en motor gráfico.",
    "evidencia": "Proyecto en motor gráfico con escena 3D optimizada, materiales asignados y tasa de cuadros estable.",
    "resultado_aprendizaje": "Optimizar e integrar activos 3D en motores en tiempo real mediante técnicas de reducción de geometría, materiales y mapas de iluminación, garantizando el rendimiento técnico y la tasa de refresco requerida.",
    "horas": 144,
    "creditos_competencia": 8,
    "horas_competencia": 384,
    "conocimientos_proceso": [
      "Generar niveles de detalle geométrico (LODs) de forma manual y automatizada.",
      "Configurar distancias de conmutación de LODs en el motor gráfico.",
      "Ajustar la densidad poligonal para respetar el presupuesto del motor.",
      "Hornear mapas de iluminación estática (Lightmaps) en el entorno.",
      "Posicionar sondas de luz (Light Probes) y reflejo en la escena.",
      "Ajustar la resolución y compresión de texturas e iluminación.",
      "Analizar el rendimiento usando el perfilador gráfico (Profiler).",
      "Ajustar el agrupamiento de llamadas de dibujo (Draw Call Batching).",
      "Garantizar la ejecución fluida del proyecto a una tasa estable de 60 FPS."
    ],
    "conocimientos_saber": [
      "Niveles de Detalle (LODs) en motores en tiempo real.",
      "Presupuesto geométrico: conteo de vértices, triángulos y llamadas de dibujo.",
      "Algoritmos de oclusión (Occlusion Culling) y optimización de visibilidad.",
      "Lightmaps: horneado de luz estática vs. iluminación dinámica.",
      "Sondas de luz (Light Probes), mapas de sombras y sondas de reflejo.",
      "Optimización de shaders y mapas PBR para renderizado en tiempo real.",
      "Perfiladores de rendimiento (Profiler) de CPU y GPU en motores gráficos.",
      "Llamadas de dibujo (Draw Calls), instanciado y agrupamiento (Batching).",
      "Métricas de rendimiento: fotogramas por segundo (FPS) y tiempo de cuadro (ms)."
    ],
    "criterios_evaluacion": [
      "Genera niveles de detalle (LODs) optimizando la carga geométrica en el motor.",
      "Hornea mapas de luz y sondas de reflexión manteniendo rendimiento gráfico.",
      "Optimiza e integra activos en el motor gráfico alcanzando una tasa estable de 60 FPS."
    ],
    "categoria": "interaccion",
    "icono": "monitor",
    "actividad_clave": "1. Optimización Real-Time y Mapeo de Escena",
    "herramientas_recomendadas": [
      "Unreal Engine 5",
      "Unity",
      "Godot Engine",
      "GPU Profiler"
    ]
  },
  "RAP-15": {
    "id": "RAP 15",
    "norma_codigo": "220501096",
    "norma_nombre": "Desarrollar la solución de software de acuerdo con el diseño y requerimientos técnicos",
    "producto_norma": "Scripts funcionales de interacción (controladores de personaje/usuario, inspección de piezas, eventos y paneles de datos).",
    "producto_egresado": "Scripts funcionales de interacción (controladores de jugador, apertura de puertas, paneles flotantes, inspección de piezas).",
    "evidencia": "Proyecto interactivo con scripts probados y mecánicas de navegación de usuario operativas.",
    "resultado_aprendizaje": "Programar scripts de lógica e interacción en lenguajes orientados a objetos, implementando controladores de usuario, eventos y mecánicas operativas del entorno interactivo.",
    "horas": 144,
    "creditos_competencia": 8,
    "horas_competencia": 384,
    "conocimientos_proceso": [
      "Escribir código POO para el movimiento de personaje y cámara.",
      "Asistir la redacción de lógica usando complementos de código por IA (Copilot/LLMs).",
      "Mapear eventos de entrada de teclado, mouse, gamepad o pantalla táctil.",
      "Programar componentes detectores de colisión (Triggers y Colliders).",
      "Disparar animaciones, sonidos y eventos del entorno según la lógica.",
      "Gestionar variables de estado de la aplicación interactiva.",
      "Vincular scripts de código a botones y elementos de la interfaz de usuario.",
      "Programar paneles de lectura de datos e inspección de elementos 3D.",
      "Ejecutar pruebas y depuración (debugging) de las mecánicas de usuario."
    ],
    "conocimientos_saber": [
      "Programación Orientada a Objetos (POO): clases, métodos, objetos y herencia.",
      "Asistentes de autocompletado y generación de código por IA (LLMs).",
      "Sistemas de entrada de usuario (Input System) y transformación 3D.",
      "Físicas 3D: colisionadores, cuerpos rígidos (Rigidbodies) y Triggers.",
      "Manejo de eventos, delegados y máquinas de estados finitos.",
      "Variables globales, persistent data y gestión de escenas.",
      "Programación de interfaces de usuario (UI System) por script.",
      "Patrones de arquitectura de software (MVC / Singleton).",
      "Depuración de código (debugging), consola de errores y pruebas lógicas."
    ],
    "criterios_evaluacion": [
      "Escribe scripts de control de usuario respondiendo a entradas de forma fluida.",
      "Programar detectores de evento y colisiones activando mecánicas operativas en 3D.",
      "Conecta la lógica del programa con componentes de interfaz garantizando funcionalidad."
    ],
    "categoria": "interaccion",
    "icono": "code",
    "actividad_clave": "2. Lógica de Programación y Scripting Interactivo",
    "herramientas_recomendadas": [
      "Visual Studio Code",
      "C# (Unity)",
      "Blueprints / C++ (Unreal)",
      "GitHub Copilot"
    ]
  },
  "RAP-16": {
    "id": "RAP 16",
    "norma_codigo": "220501096",
    "norma_nombre": "Desarrollar la solución de software de acuerdo con el diseño y requerimientos técnicos",
    "producto_norma": "Aplicación ejecutable interactiva compilada de un Gemelo Digital o simulador 3D explorable (escritorio / web / realidad inmersiva).",
    "producto_egresado": "Aplicación ejecutable interactiva de un Gemelo Digital o simulador 3D explorable multi-plataforma.",
    "evidencia": "Archivo ejecutable compilado (.exe / .apk / .webgl) con panel de control e interactividad en tiempo real.",
    "resultado_aprendizaje": "Compilar y desplegar aplicaciones interactivas multi-plataforma integrando interfaces de usuario (UI/UX) y simulaciones 3D, garantizando la funcionalidad completa del entorno explorable.",
    "horas": 96,
    "creditos_competencia": 8,
    "horas_competencia": 384,
    "conocimientos_proceso": [
      "Diseñar e implementar menús navegables, botones y paneles HUD 2D/3D.",
      "Estructurar la jerarquía visual de elementos gráficos según principios UX.",
      "Realizar pruebas de usabilidad, ergonomía y navegación con usuarios.",
      "Ensamblar todos los módulos interactivos dentro del proyecto del simulador 3D.",
      "Configurar paneles de control y visualización para Gemelos Digitales.",
      "Verificar la estabilidad global y la operabilidad completa del entorno.",
      "Configurar ajustes de compilación (Build Settings) para la plataforma objetivo.",
      "Compilar el proyecto generando el archivo ejecutable (.exe, .apk o WebGL).",
      "Desplegar, instalar y probar el ejecutable final en la plataforma de destino."
    ],
    "conocimientos_saber": [
      "Principios de UI/UX aplicados a entornos y aplicaciones 3D.",
      "Ergonomía digital, usabilidad y arquitectura de información.",
      "Layouts adaptativos, menús emergentes e interfaces inmersivas.",
      "Arquitectura de Gemelos Digitales (Digital Twins) y simuladores interactivos.",
      "Integración de activos 3D, animación, lógica e interfaces.",
      "Métricas de evaluación de la experiencia del usuario (UX) e inmersión.",
      "Procesos de compilación (Build) y empaquetamiento de software.",
      "Configuración técnica por plataforma (Windows PC, Android/iOS Móvil, WebGL).",
      "Optimización de paquetes, firmas de instalación y despliegue final."
    ],
    "criterios_evaluacion": [
      "Diseña interfaces de usuario (UI/UX) funcionales e intuitivas para la aplicación 3D.",
      "Integra módulos 3D e interactividad en un simulador/gemelo digital explorable.",
      "Compila y despliega la aplicación interactiva multiplataforma verificada sin errores."
    ],
    "categoria": "interaccion",
    "icono": "globe",
    "actividad_clave": "3. Interfaz de Usuario (UI/UX) y Despliegue de Gemelo Digital",
    "herramientas_recomendadas": [
      "WebGL / Three.js",
      "Unity Build Pipeline",
      "Unreal Pixel Streaming",
      "Figma (UI/UX)"
    ]
  }
};

export const RAPS_TRANSVERSALES = {
  "RAP-17": {
    "id": "RAP 17",
    "nombre": "Identificar la dinámica organizacional del SENA y el rol de la formación profesional integral.",
    "resultado_aprendizaje": "Identificar la dinámica organizacional del SENA y el rol de la formación profesional integral.",
    "competencia": "240201530 - Resultado de Aprendizaje de la Inducción",
    "norma_codigo": "240201530",
    "norma_nombre": "Resultado de Aprendizaje de la Inducción",
    "horas": 48,
    "creditos": 1,
    "evidencia": "Talleres de inducción institucional y plan de vida.",
    "evidencia_producto": "Talleres de inducción institucional y plan de vida.",
    "conocimientos_proceso": [
      "Reconocer la estructura organizacional, misión, visión e himno del SENA.",
      "Identificar deberes, derechos y normas de convivencia del reglamento del aprendiz.",
      "Explorar las plataformas tecnológicas institucionales (SofiaPlus / Zajuna).",
      "Formular el proyecto de vida y plan de carrera ocupacional."
    ],
    "conocimientos_saber": [
      "Estructura institucional del SENA y Formación Profesional Integral.",
      "Reglamento del Aprendiz: derechos, deberes y proceso formativo.",
      "Plataformas SofiaPlus, LMS Zajuna y biblioteca digital Sena.",
      "Estrategias de aprendizaje autónomo y colaborativo."
    ],
    "criterios_evaluacion": [
      "Identifica la dinámica organizacional del SENA según la normatividad institucional.",
      "Estructura su proyecto de vida articulado a su perfil profesional de egreso."
    ],
    "herramientas_recomendadas": [
      "SofiaPlus",
      "Zajuna LMS",
      "Portal Institucional SENA"
    ]
  },
  "RAP-18": {
    "id": "RAP 18",
    "nombre": "Argumentar en forma oral y escrita atendiendo las exigencias de las diversas situaciones comunicativas.",
    "resultado_aprendizaje": "Argumentar en forma oral y escrita atendiendo las exigencias de las diversas situaciones comunicativas.",
    "competencia": "240201524 - Desarrollar procesos de comunicación eficaces y efectivos",
    "norma_codigo": "240201524",
    "norma_nombre": "Desarrollar procesos de comunicación eficaces y efectivos",
    "horas": 48,
    "creditos": 1,
    "evidencia": "Informe escrito y exposición oral de procesos comunicativos.",
    "evidencia_producto": "Informe escrito y exposición oral de procesos comunicativos.",
    "conocimientos_proceso": [
      "Redactar informes técnicos, fichas de proyecto y correos formales.",
      "Estructurar presentaciones orales efectivas y defensas de proyectos técnicos.",
      "Aplicar técnicas de comunicación asertiva y resolución de desacuerdos."
    ],
    "conocimientos_saber": [
      "Tipologías textuales y técnicas de redacción técnica.",
      "Comunicación verbal, no verbal y oratoria en entornos profesionales.",
      "Manejo de argumentos y criterios de asertividad."
    ],
    "criterios_evaluacion": [
      "Redacta textos técnicos con coherencia, cohesión y ortografía adecuada.",
      "Comunica ideas técnicas con fluidez y claridad ante audiencias interdisciplinares."
    ],
    "herramientas_recomendadas": [
      "Procesadores de Texto",
      "Presentaciones Digitales",
      "Oratoria"
    ]
  },
  "RAP-19": {
    "id": "RAP 19",
    "nombre": "Contribuir con el fortalecimiento de la cultura de paz a partir de la dignidad humana.",
    "resultado_aprendizaje": "Contribuir con el fortalecimiento de la cultura de paz a partir de la dignidad humana.",
    "competencia": "240201526 - Enriquecer su proyecto de vida en un contexto productivo y social",
    "norma_codigo": "240201526",
    "norma_nombre": "Enriquecer su proyecto de vida en un contexto productivo y social",
    "horas": 48,
    "creditos": 1,
    "evidencia": "Plan de desarrollo humano y convivencia pacífica.",
    "evidencia_producto": "Plan de desarrollo humano y convivencia pacífica.",
    "conocimientos_proceso": [
      "Analizar dilemas éticos en la producción digital y propiedad intelectual.",
      "Proponer soluciones pacíficas y consensuadas a conflictos de equipo.",
      "Fomentar el respeto por la diversidad y los derechos humanos."
    ],
    "conocimientos_saber": [
      "Dignidad humana, ética profesional y derechos fundamentales.",
      "Cultura de paz, convivencia ciudadana y resolución de controversias.",
      "Mecanismos de concertación y diálogo social."
    ],
    "criterios_evaluacion": [
      "Demuestra actitudes éticas y solidarias en el trabajo en equipo.",
      "Aplica principios de convivencia pacífica en entornos formativos y laborales."
    ],
    "herramientas_recomendadas": [
      "Estudios de Caso Éticos",
      "Guías de Debate Ciudadano"
    ]
  },
  "RAP-20": {
    "id": "RAP 20",
    "nombre": "Practicar hábitos saludables mediante la aplicación de fundamentos de nutrición e higiene.",
    "resultado_aprendizaje": "Practicar hábitos saludables mediante la aplicación de fundamentos de nutrición e higiene.",
    "competencia": "240201527 - Generar hábitos saludables de vida mediante programas de actividad física",
    "norma_codigo": "240201527",
    "norma_nombre": "Generar hábitos saludables de vida mediante programas de actividad física",
    "horas": 48,
    "creditos": 1,
    "evidencia": "Plan de acondicionamiento físico y ergonomía laboral.",
    "evidencia_producto": "Plan de acondicionamiento físico y ergonomía laboral.",
    "conocimientos_proceso": [
      "Diseñar e implementar pausas activas especializadas para artistas y modeladores 3D.",
      "Configurar puestos de trabajo digital aplicando normas ergonómicas (postura, altura, pantalla).",
      "Elaborar un plan personal de actividad física y nutrición equilibrada."
    ],
    "conocimientos_saber": [
      "Ergonomía visual y musculoesquelética para trabajo con pantallas y tabletas digitalizadoras.",
      "Prevención de patologías ocupacionales (síndrome del túnel carpiano, fatiga visual, lumbalgias).",
      "Fundamentos de acondicionamiento físico y hábitos saludables."
    ],
    "criterios_evaluacion": [
      "Aplica rutinas de pausas activas durante jornadas prolongadas de modelado 3D.",
      "Adopta posturas ergonómicas que previenen lesiones en el puesto de trabajo."
    ],
    "herramientas_recomendadas": [
      "Guía Ergonómica SENA",
      "Plan de Pausas Activas"
    ]
  },
  "RAP-21": {
    "id": "RAP 21",
    "nombre": "Reconocer el trabajo como factor de movilidad social y transformación de la realidad.",
    "resultado_aprendizaje": "Reconocer el trabajo como factor de movilidad social y transformación de la realidad.",
    "competencia": "210201501 - Ejercer derechos fundamentales del trabajo en el marco de la constitución",
    "norma_codigo": "210201501",
    "norma_nombre": "Ejercer derechos fundamentales del trabajo en el marco de la constitución",
    "horas": 48,
    "creditos": 1,
    "evidencia": "Mapa mental y análisis de casos sobre derechos laborales.",
    "evidencia_producto": "Mapa mental y análisis de casos sobre derechos laborales.",
    "conocimientos_proceso": [
      "Identificar contratos laborales y modalidades de contratación para creativos y freelancers.",
      "Analizar liquidaciones de prestaciones sociales y aportes a seguridad social.",
      "Reconocer derechos sindicales y de libre asociación laboral."
    ],
    "conocimientos_saber": [
      "Marco constitucional y legal del trabajo en Colombia y convenios OIT.",
      "Derechos fundamentales en el trabajo y mecanismos de protección constitucional.",
      "Modalidades contractuales para la industria creativa y de animación."
    ],
    "criterios_evaluacion": [
      "Distingue las modalidades de contratación y sus derechos asociados.",
      "Reconoce el impacto del trabajo digno en el desarrollo social y económico."
    ],
    "herramientas_recomendadas": [
      "Código Sustantivo del Trabajo",
      "Casos Prácticos Laborales"
    ]
  },
  "RAP-22": {
    "id": "RAP 22",
    "nombre": "Caracterizar la idea de negocio teniendo en cuenta las oportunidades del sector.",
    "resultado_aprendizaje": "Caracterizar la idea de negocio teniendo en cuenta las oportunidades del sector.",
    "competencia": "240201529 - Gestionar procesos propios de la cultura emprendedora y empresarial",
    "norma_codigo": "240201529",
    "norma_nombre": "Gestionar procesos propios de la cultura emprendedora y empresarial",
    "horas": 48,
    "creditos": 1,
    "evidencia": "Formulación de modelo de negocio e idea emprendedora.",
    "evidencia_producto": "Formulación de modelo de negocio e idea emprendedora.",
    "conocimientos_proceso": [
      "Diseñar la propuesta de valor para un estudio o servicio de contenidos 3D.",
      "Construir el modelo Canvas identificando segmentos de clientes y fuentes de ingresos.",
      "Estructurar presupuestos y cotizaciones comerciales de proyectos 3D."
    ],
    "conocimientos_saber": [
      "Metodología Business Model Canvas y Lean Startup.",
      "Estructura de costos, precios por hora y cotización de servicios digitales.",
      "Ecosistema de emprendimiento y fuentes de financiación en Colombia."
    ],
    "criterios_evaluacion": [
      "Estructura un modelo de negocio viable para el sector de animación y visualización 3D.",
      "Sustenta la propuesta de valor con coherencia financiera y de mercado."
    ],
    "herramientas_recomendadas": [
      "Business Model Canvas",
      "Plantillas de Cotización 3D"
    ]
  },
  "RAP-23": {
    "id": "RAP 23",
    "nombre": "Analizar las estrategias para el control de los impactos ambientales y accidentes laborales.",
    "resultado_aprendizaje": "Analizar las estrategias para el control de los impactos ambientales y accidentes laborales.",
    "competencia": "220601501 - Aplicar prácticas de protección ambiental, seguridad y salud en el trabajo",
    "norma_codigo": "220601501",
    "norma_nombre": "Aplicar prácticas de protección ambiental, seguridad y salud en el trabajo",
    "horas": 48,
    "creditos": 1,
    "evidencia": "Lista de chequeo y reporte de buenas prácticas ambientales.",
    "evidencia_producto": "Lista de chequeo y reporte de buenas prácticas ambientales.",
    "conocimientos_proceso": [
      "Clasificar y disponer adecuadamente residuos de manufactura 3D (PLA, resinas, solventes).",
      "Aplicar protocolos de ventilación y seguridad en laboratorios de impresión 3D.",
      "Identificar peligros y reportar condiciones inseguras en el entorno de producción."
    ],
    "conocimientos_saber": [
      "Sistemas de Gestión Ambiental (SGA) y normatividad de residuos RAEE.",
      "Manejo seguro de materiales fotosensibles, termoplásticos y alcohol isopropílico.",
      "Protocolos de bioseguridad y prevención de accidentes en talleres técnicos."
    ],
    "criterios_evaluacion": [
      "Aplica medidas de prevención ambiental en el manejo de insumos de manufactura aditiva.",
      "Cumple las normas de SST en el uso de equipos y estaciones de trabajo."
    ],
    "herramientas_recomendadas": [
      "Fichas Técnicas MSDS",
      "Matriz de Riesgos y Peligros"
    ]
  },
  "RAP-24": {
    "id": "RAP 24",
    "nombre": "Seleccionar herramientas TIC de acuerdo con las necesidades de información.",
    "resultado_aprendizaje": "Seleccionar herramientas TIC de acuerdo con las necesidades de información.",
    "competencia": "220501501 - Aplicar tecnologías de la información y la comunicación (TICs)",
    "norma_codigo": "220501501",
    "norma_nombre": "Aplicar tecnologías de la información y la comunicación (TICs)",
    "horas": 48,
    "creditos": 1,
    "evidencia": "Informe técnico de integración de herramientas TIC.",
    "evidencia_producto": "Informe técnico de integración de herramientas TIC.",
    "conocimientos_proceso": [
      "Configurar sistemas de almacenamiento en la nube y repositorios compartidos.",
      "Implementar esquemas de respaldo (backups) y control de versiones de archivos 3D.",
      "Gestionar herramientas de comunicación sincrónica y trabajo colaborativo remoto."
    ],
    "conocimientos_saber": [
      "Sistemas operativos, redes y almacenamiento distribuido en la nube.",
      "Seguridad de la información, cifrado y políticas de respaldo.",
      "Plataformas colaborativas para gestión de proyectos."
    ],
    "criterios_evaluacion": [
      "Selecciona herramientas TIC que optimizan el flujo de trabajo en equipo.",
      "Garantiza el respaldo y la seguridad de los activos digitales del proyecto."
    ],
    "herramientas_recomendadas": [
      "Google Drive",
      "Git / GitHub",
      "Discord / Teams"
    ]
  },
  "RAP-25": {
    "id": "RAP 25",
    "nombre": "Intercambiar opiniones sobre situaciones cotidianas y laborales actuales, pasadas y futuras (Inglés 1).",
    "resultado_aprendizaje": "Intercambiar opiniones sobre situaciones cotidianas y laborales actuales, pasadas y futuras (Inglés 1).",
    "competencia": "240202501 - Interactuar en lengua inglesa de forma oral y escrita",
    "norma_codigo": "240202501",
    "norma_nombre": "Interactuar en lengua inglesa de forma oral y escrita",
    "horas": 48,
    "creditos": 1,
    "evidencia": "Cuestionario y diálogo oral sobre situaciones cotidianas.",
    "evidencia_producto": "Cuestionario y diálogo oral sobre situaciones cotidianas.",
    "conocimientos_proceso": [
      "Comprender vocabulario básico de diseño y animación 3D en inglés.",
      "Formular preguntas y respuestas sobre rutinas y tareas de trabajo en inglés.",
      "Participar en diálogos cortos presentando su perfil técnico."
    ],
    "conocimientos_saber": [
      "Estructuras gramaticales básicas (Simple Present, Past, Future).",
      "Vocabulario de herramientas digitales y términos comunes en la industria.",
      "Pautas de pronunciación y entonación en contextos laborales."
    ],
    "criterios_evaluacion": [
      "Intercambia información sobre su quehacer formativo en inglés básico.",
      "Comprende instrucciones operativas simples en manuales de software."
    ],
    "herramientas_recomendadas": [
      "Duolingo",
      "Glosario Técnico de Términos 3D"
    ]
  },
  "RAP-26": {
    "id": "RAP 26",
    "nombre": "Discutir sobre posibles soluciones a problemas dentro de un rango variado de contextos (Inglés 2).",
    "resultado_aprendizaje": "Discutir sobre posibles soluciones a problemas dentro de un rango variado de contextos (Inglés 2).",
    "competencia": "240202501 - Interactuar en lengua inglesa de forma oral y escrita",
    "norma_codigo": "240202501",
    "norma_nombre": "Interactuar en lengua inglesa de forma oral y escrita",
    "horas": 48,
    "creditos": 1,
    "evidencia": "Presentación oral de resolución de problemas laborales.",
    "evidencia_producto": "Presentación oral de resolución de problemas laborales.",
    "conocimientos_proceso": [
      "Describir fallas técnicas en software 3D (errores de render, normales invertidas) en inglés.",
      "Proponer soluciones técnicas en foros y comunidades internacionales de arte 3D.",
      "Interpretar documentación oficial y foros de soporte técnico en inglés."
    ],
    "conocimientos_saber": [
      "Condicionales y lenguaje para formular sugerencias y soluciones.",
      "Vocabulario especializado de errores gráficos, shader graphs y topología.",
      "Estrategias de lectura rápida (skimming y scanning) en documentación técnica."
    ],
    "criterios_evaluacion": [
      "Describe problemas técnicos y propone soluciones coherentes en lengua inglesa.",
      "Interpreta soluciones planteadas en foros y documentación oficial de desarrollo 3D."
    ],
    "herramientas_recomendadas": [
      "Foros Blender Artists / Polycount",
      "Documentación en inglés"
    ]
  },
  "RAP-27": {
    "id": "RAP 27",
    "nombre": "Explicar las funciones de su ocupación laboral usando expresiones de acuerdo al nivel (Inglés 3).",
    "resultado_aprendizaje": "Explicar las funciones de su ocupación laboral usando expresiones de acuerdo al nivel (Inglés 3).",
    "competencia": "240202501 - Interactuar en lengua inglesa de forma oral y escrita",
    "norma_codigo": "240202501",
    "norma_nombre": "Interactuar en lengua inglesa de forma oral y escrita",
    "horas": 48,
    "creditos": 1,
    "evidencia": "Audio/Video describiendo funciones técnicas de producción 3D.",
    "evidencia_producto": "Audio/Video describiendo funciones técnicas de producción 3D.",
    "conocimientos_proceso": [
      "Explicar las etapas del pipeline de producción 3D en inglés a un cliente o supervisor.",
      "Describir el rol del artista de modelado, rigger o animador en un estudio internacional.",
      "Grabar una presentación audiovisual corta (pitch) describiendo sus habilidades técnicas."
    ],
    "conocimientos_saber": [
      "Vocabulario avanzado de pipeline: blocking, baking, rigging, skinning, lighting.",
      "Tiempos verbales continuos y perfectos para describir procesos técnicos en curso.",
      "Estructura de presentaciones técnicas profesionales."
    ],
    "criterios_evaluacion": [
      "Explica con claridad los procesos de modelado y animación en inglés.",
      "Utiliza vocabulario técnico apropiado para describir su especialidad productiva."
    ],
    "herramientas_recomendadas": [
      "Video Pitch",
      "Guiones de Presentación Técnica"
    ]
  },
  "RAP-28": {
    "id": "RAP 28",
    "nombre": "Comprender información sobre situaciones cotidianas y laborales actuales y futuras (Inglés 4).",
    "resultado_aprendizaje": "Comprender información sobre situaciones cotidianas y laborales actuales y futuras (Inglés 4).",
    "competencia": "240202501 - Interactuar en lengua inglesa de forma oral y escrita",
    "norma_codigo": "240202501",
    "norma_nombre": "Interactuar en lengua inglesa de forma oral y escrita",
    "horas": 48,
    "creditos": 1,
    "evidencia": "Prueba escrita de comprensión de lectura técnica.",
    "evidencia_producto": "Prueba escrita de comprensión de lectura técnica.",
    "conocimientos_proceso": [
      "Leer y comprender requerimientos de briefs y especificaciones de clientes en inglés.",
      "Interpretar contratos de trabajo freelance y acuerdos de confidencialidad (NDA) en inglés.",
      "Sintetizar artículos técnicos y novedades de la industria 3D y de IA."
    ],
    "conocimientos_saber": [
      "Lenguaje formal de negocios y términos contractuales en la industria creativa.",
      "Estructuras pasivas e impersonales en documentación técnica.",
      "Estrategias de comprensión auditiva en conferencias técnicas (GDC, Siggraph)."
    ],
    "criterios_evaluacion": [
      "Comprende briefs de trabajo y acuerdos técnicos redactados en inglés.",
      "Extrae la información clave de conferencias y tutoriales técnicos avanzados."
    ],
    "herramientas_recomendadas": [
      "GDC Talks",
      "Briefs de Proyectos Internacionales"
    ]
  },
  "RAP-29": {
    "id": "RAP 29",
    "nombre": "Presentar un proceso para la realización de una actividad en su quehacer laboral (Inglés 5).",
    "resultado_aprendizaje": "Presentar un proceso para la realización de una actividad en su quehacer laboral (Inglés 5).",
    "competencia": "240202501 - Interactuar en lengua inglesa de forma oral y escrita",
    "norma_codigo": "240202501",
    "norma_nombre": "Interactuar en lengua inglesa de forma oral y escrita",
    "horas": 48,
    "creditos": 1,
    "evidencia": "Exposición técnica en inglés del pipeline 3D.",
    "evidencia_producto": "Exposición técnica en inglés del pipeline 3D.",
    "conocimientos_proceso": [
      "Crear un tutorial o breakdown técnico en video explicando su flujo de trabajo en inglés.",
      "Argumentar las decisiones de diseño y optimización de mallas ante un director técnico.",
      "Responder preguntas y recibir feedback en reuniones de revisión en inglés."
    ],
    "conocimientos_saber": [
      "Conectores de secuencia y discurso argumentativo en inglés.",
      "Estructura de breakdowns técnicos para estudios y plataformas como ArtStation.",
      "Pautas para recibir y dar retroalimentación constructiva en equipos multiculturales."
    ],
    "criterios_evaluacion": [
      "Sustenta un breakdown técnico demostrando fluidez y dominio terminológico.",
      "Interactúa con soltura en revisiones técnicas de proyectos creativos."
    ],
    "herramientas_recomendadas": [
      "Breakdown en Video",
      "ArtStation Learning"
    ]
  },
  "RAP-30": {
    "id": "RAP 30",
    "nombre": "Implementar acciones de mejora relacionadas con el uso de expresiones y desempeño (Inglés 6).",
    "resultado_aprendizaje": "Implementar acciones de mejora relacionadas con el uso de expresiones y desempeño (Inglés 6).",
    "competencia": "240202501 - Interactuar en lengua inglesa de forma oral y escrita",
    "norma_codigo": "240202501",
    "norma_nombre": "Interactuar en lengua inglesa de forma oral y escrita",
    "horas": 48,
    "creditos": 1,
    "evidencia": "Documento de mejora continua y portafolio final en inglés.",
    "evidencia_producto": "Documento de mejora continua y portafolio final en inglés.",
    "conocimientos_proceso": [
      "Redactar el perfil profesional (About me, Bio, Resume) en plataformas globales en inglés.",
      "Simular entrevistas técnicas de trabajo en inglés para estudios remotos.",
      "Implementar un plan de autoaprendizaje continuo para mantener su nivel de inglés B2."
    ],
    "conocimientos_saber": [
      "Estrategias de comunicación profesional de alto nivel y redacción de CV en inglés.",
      "Preguntas habituales y respuestas estructuradas (STAR method) en entrevistas laborales.",
      "Ecosistema de bolsas de empleo internacionales (LinkedIn, ArtStation Jobs, Art Bully)."
    ],
    "criterios_evaluacion": [
      "Presenta un perfil profesional y portafolio en inglés alineado a estándares de la industria.",
      "Responde asertivamente en simulaciones de entrevistas de trabajo en lengua inglesa."
    ],
    "herramientas_recomendadas": [
      "LinkedIn",
      "ArtStation Jobs",
      "Simuladores de Entrevistas"
    ]
  },
  "RAP-31": {
    "id": "RAP 31",
    "nombre": "Validar y entregar el producto interactivo/portafolio 3D final según requerimientos.",
    "resultado_aprendizaje": "Validar y entregar el producto interactivo/portafolio 3D final según requerimientos.",
    "competencia": "220501096 - Desarrollar la solución de software de acuerdo con el diseño",
    "norma_codigo": "220501096",
    "norma_nombre": "Desarrollar la solución de software de acuerdo con el diseño",
    "horas": 96,
    "creditos": 2,
    "evidencia": "Sustentación final del portafolio técnico del egresado.",
    "evidencia_producto": "Sustentación final del portafolio técnico del egresado.",
    "conocimientos_proceso": [
      "Compilar y curar los activos de los 3 macroproyectos (Hacer, Ver, Interactuar).",
      "Montar la plataforma web de portafolio y Demoreel final de alta definición.",
      "Sustentar el proyecto formativo ante comités de evaluación y representantes del sector productivo.",
      "Elaborar manuales técnicos y memorias de entrega de los proyectos desarrollados."
    ],
    "conocimientos_saber": [
      "Estándares internacionales de presentación de portafolios técnicos (The Rookies, ArtStation).",
      "Criterios de evaluación técnica y comercial del sector productivo.",
      "Estrategias de sustentación pública, oratoria y defensa de proyectos de grado."
    ],
    "criterios_evaluacion": [
      "Entrega un portafolio profesional integrado que evidencia las competencias técnicas del programa.",
      "Sustenta rigurosamente las decisiones técnicas y metodológicas del proyecto formativo."
    ],
    "herramientas_recomendadas": [
      "ArtStation",
      "Web Portfolio",
      "Video Demoreel",
      "GitHub"
    ]
  }
};

// Snapshots inmutables originales para función de 'Restablecer a Original'
export const ORIGINAL_RAPS_TECNICOS = JSON.parse(JSON.stringify(RAPS_TECNICOS));
export const ORIGINAL_RAPS_TRANSVERSALES = JSON.parse(JSON.stringify(RAPS_TRANSVERSALES));

// 15 Competencias Oficiales Establecidas en la Matriz Curricular SENA
export const COMPETENCIAS_MATRIZ = [
  // --- COMPETENCIAS ESPECÍFICAS / TÉCNICAS 3D ---
  {
    codigo: "220501083",
    nombre: "Producir los componentes de la animación de acuerdo con técnicas de modelado y diseño",
    tipo: "tecnico",
    horas_totales: 384,
    creditos: 8,
    area: "Modelado Orgánico & Texturizado PBR"
  },
  {
    codigo: "220101016",
    nombre: "Generar prototipo digital según técnicas de modelado y especificaciones de producto",
    tipo: "tecnico",
    horas_totales: 288,
    creditos: 6,
    area: "CAD Paramétrico, Impresión 3D & BIM / IFC"
  },
  {
    codigo: "250201022",
    nombre: "Desarrollar storyboard de acuerdo con guion y contenido audiovisual e interactivo",
    tipo: "tecnico",
    horas_totales: 192,
    creditos: 4,
    area: "Preproducción, Guion & Storyboard"
  },
  {
    codigo: "250201026",
    nombre: "Animar elementos de la escena según técnicas y especificaciones del proyecto",
    tipo: "tecnico",
    horas_totales: 192,
    creditos: 4,
    area: "Previs 3D, Rigging & Captura de Movimiento (MoCap)"
  },
  {
    codigo: "250201039",
    nombre: "Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual y plataforma de exhibición",
    tipo: "tecnico",
    horas_totales: 336,
    creditos: 7,
    area: "VFX, Difusión Asistida por IA & Postproducción"
  },
  {
    codigo: "220501096",
    nombre: "Desarrollar la solución de software de acuerdo con el diseño y requerimientos técnicos",
    tipo: "tecnico",
    horas_totales: 384,
    creditos: 8,
    area: "Motores en Tiempo Real, Scripting & Gemelos Digitales"
  },

  // --- COMPETENCIAS TRANSVERSALES, BÁSICAS Y CLAVES ---
  {
    codigo: "240201530",
    nombre: "Resultado de Aprendizaje de la Inducción",
    tipo: "transversal",
    horas_totales: 48,
    creditos: 1,
    area: "Inducción Institucional SENA"
  },
  {
    codigo: "240201524",
    nombre: "Desarrollar procesos de comunicación eficaces y efectivos",
    tipo: "transversal",
    horas_totales: 48,
    creditos: 1,
    area: "Comunicación Asertiva y Expresión Oral/Escrita"
  },
  {
    codigo: "240201526",
    nombre: "Enriquecer su proyecto de vida en un contexto productivo y social",
    tipo: "transversal",
    horas_totales: 48,
    creditos: 1,
    area: "Ética, Cultura de Paz y Ciudadanía"
  },
  {
    codigo: "240201527",
    nombre: "Generar hábitos saludables de vida mediante programas de actividad física",
    tipo: "transversal",
    horas_totales: 48,
    creditos: 1,
    area: "Actividad Física y Ergonomía Ocupacional"
  },
  {
    codigo: "210201501",
    nombre: "Ejercer derechos fundamentales del trabajo en el marco de la constitución",
    tipo: "transversal",
    horas_totales: 48,
    creditos: 1,
    area: "Derechos Fundamentales del Trabajo"
  },
  {
    codigo: "240201529",
    nombre: "Gestionar procesos propios de la cultura emprendedora y empresarial",
    tipo: "transversal",
    horas_totales: 48,
    creditos: 1,
    area: "Emprendimiento y Modelos de Negocio"
  },
  {
    codigo: "220601501",
    nombre: "Aplicar prácticas de protección ambiental, seguridad y salud en el trabajo",
    tipo: "transversal",
    horas_totales: 48,
    creditos: 1,
    area: "Seguridad y Salud en el Trabajo (SST) y Medio Ambiente"
  },
  {
    codigo: "220501501",
    nombre: "Aplicar tecnologías de la información y la comunicación (TICs)",
    tipo: "transversal",
    horas_totales: 48,
    creditos: 1,
    area: "Herramientas TIC y Gestión en la Nube"
  },
  {
    codigo: "240202501",
    nombre: "Interactuar en lengua inglesa de forma oral y escrita",
    tipo: "transversal",
    horas_totales: 288,
    creditos: 6,
    area: "Inglés Técnico para la Industria Digital (Niveles 1 a 6)"
  }
];
