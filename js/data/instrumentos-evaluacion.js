// ====================================================================
// INSTRUMENTOS DE EVALUACIÓN (LISTAS DE CHEQUEO DE EVIDENCIAS)
// Formato Institucional SENA — Red de Artes Gráficas / Tecnologías de la Información
// Código: GFPI-F-023 / Red de Artes Gráficas
// ====================================================================

export const INSTRUMENTOS_EVALUACION = {
  'RAP-01': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — ESCULTURA DIGITAL ORGÁNICA',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Archivo digital editable (.ZPR / .blend) con escultura orgánica de alta resolución.',
      'Bloqueo volumétrico estructurado según referencias anatómicas y hojas de modelo.',
      'Conjunto de mapas de microtextura dérmica y detalles orgánicos aplicados.'
    ],
    criterios: [
      {
        criterio: 'Estructura el bloqueo volumétrico primario respetando proporciones anatómicas y silueta.',
        indicadores: [
          'Analiza y clasifica referencias anatómicas ortográficas y conceptuales en su estación de trabajo.',
          'Bloquea masas primarias y siluetas respetando proporciones canónicas (7 a 8 cabezas) y balance corporal.',
          'Emplea mallas base (blocking) tradicionales o asistidas por IA asegurando distribución volumétrica homogénea.'
        ]
      },
      {
        criterio: 'Esculpe estructuras orgánicas aplicando pinceles digitales y subdivisión de malla.',
        indicadores: [
          'Modela grupos musculares principales (miología) y articulaciones respetando referencias anatómicas reales.',
          'Escala progresivamente los niveles de resolución poligonal (DynaMesh / Multiresolution) sin perder la silueta.',
          'Refina formas secundarias, pliegues de flexión y transiciones orgánicas con pinceles de escultura digital.'
        ]
      },
      {
        criterio: 'Integra microtexturas orgánicas garantizando la calidad del modelo esculpido.',
        indicadores: [
          'Estampa mapas de alfas y pinceles VDM para poros, arrugas y textura dérmica con escala y dirección consistentes.',
          'Valida la densidad poligonal técnica asegurando la ausencia de artefactos, pellizcos o mallas no-manifold.',
          'Estructura el archivo en subtools o capas organizadas y nombradas para su posterior paso a retopología.'
        ]
      }
    ]
  },

  'RAP-02': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — RETOPOLOGÍA Y UVs PARA PRODUCCIÓN',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Malla optimizada (Low-Poly / Mid-Poly) con topología para deformación y animación.',
      'Mapa UV desenvuelto sin solapamientos, con distribución equilibrada de densidad de texels (Texel Density).'
    ],
    criterios: [
      {
        criterio: 'Reconstruye la topología poligonal garantizando el flujo de bordes en zonas de flexión.',
        indicadores: [
          'Traza anillos y bucles poligonales (edge loops) continuos alrededor de ojos, boca y articulaciones principales.',
          'Mantiene una estructura limpia basada en cuadriláteros (quads), minimizando triángulos y eliminando n-gons.',
          'Aplica algoritmos de autorretopología neuronal o guiada verificando la orientación correcta de normales.'
        ]
      },
      {
        criterio: 'Optimiza la cantidad de polígonos conservando la silueta original del modelo.',
        indicadores: [
          'Reduce el conteo poligonal adaptándolo al presupuesto técnico establecido para el motor gráfico o teaser.',
          'Conserva la silueta y los volúmenes característicos del modelo de alta resolución en la versión optimizada.'
        ]
      },
      {
        criterio: 'Despliega y empaqueta islas UV uniformes sin estiramientos ni solapamientos.',
        indicadores: [
          'Corta las costuras UV en zonas ocultas u ocluidas del modelo para disimular discontinuidades de textura.',
          'Despliega las islas UV sin distorsión visible de estiramiento ni compresión geométrica comprobada con checker map.',
          'Empaqueta las islas UV maximizando el uso del espacio 0-1 (UV Space) con padding adecuado para evitar bleed.'
        ]
      }
    ]
  },

  'RAP-03': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — TEXTURIZADO PBR Y MAPAS PROCEDURALES',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Paquete de mapas de texturas horneados (Normal, AO, Curvature, ID, Thickness).',
      'Materiales PBR asignados (Base Color, Roughness, Metallic, Normal, Height) en archivo nativo de Substance o Blender.'
    ],
    criterios: [
      {
        criterio: 'Proyecta mapas de alta resolución sobre la malla optimizada sin artefactos.',
        indicadores: [
          'Ajusta distancias de jaula (cage) y proyecciones de raytracing eliminando costuras y artefactos de horneado.',
          'Hornea mapas de Normales en espacio tangente y Oclusión Ambiental con gradientes limpios y resolución adecuada.'
        ]
      },
      {
        criterio: 'Crea materiales bajo estándares PBR coherentes con la respuesta física de la luz.',
        indicadores: [
          'Configura valores dieléctricos y metálicos estrictos respetando la física PBR sin valores intermedios erróneos.',
          'Genera microdetalles de rugosidad (Roughness) diferenciados reflejando desgaste, grasa y variaciones de superficie.',
          'Emplea generadores inteligentes y máscaras procedurales basadas en geometría para envejecimiento y polvo.'
        ]
      },
      {
        criterio: 'Ensambla shaders nodales funcionales ajustados a las condiciones lumínicas.',
        indicadores: [
          'Estructura redes nodales de sombreado limpias y parametrizadas para su render en tiempo real o cinemático.',
          'Exporta los paquetes de mapas organizados con canales empaquetados (ORM: Occlusion, Roughness, Metallic).'
        ]
      }
    ]
  },

  'RAP-04': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — MODELADO PARAMÉTRICO CAD HARD-SURFACE',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Modelo CAD 3D editable con árbol de operaciones paramétricas conservado (STEP / F3D).',
      'Ensamble mecánico con articulaciones, tolerancias y vista explosionada funcional.'
    ],
    criterios: [
      {
        criterio: 'Diseña croquis 2D parametrizados con restricciones geométricas y cotas completas.',
        indicadores: [
          'Dibuja croquis 2D completamente definidos usando restricciones de tangencia, paralelismo y concentricidad.',
          'Aplica cotas dimensionales reales y variables paramétricas para fácil modificación del diseño.',
          'Estructura planos de referencia auxiliares y ejes de construcción de manera metódica.'
        ]
      },
      {
        criterio: 'Estructura cuerpos sólidos hard-surface conservando el historial editable.',
        indicadores: [
          'Aplica operaciones de extrusión, revolución, barrido y solevado sin romper el historial paramétrico.',
          'Modela redondeos (fillets) y chaflanes en el orden adecuado de jerarquía constructiva.',
          'Genera espesores de pared uniformes (vaciados) aptos para fabricación industrial.'
        ]
      },
      {
        criterio: 'Modela ensambles mecánicos funcionales ajustados a tolerancias dimensionales.',
        indicadores: [
          'Asigna uniones cinemáticas (revoluta, deslizante, rígida) verificando ausencia de colisiones mecánicas.',
          'Aplica tolerancias dimensionales estándar (0.2 - 0.4 mm) requeridas para manufactura o encastre físico.',
          'Elabora una vista explosionada con líneas de trayectoria para la guía de ensamble del producto.'
        ]
      }
    ]
  },

  'RAP-05': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — PREPARACIÓN PARA MANUFACTURA ADITIVA (3D PRINT)',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Archivo de corte STL/3MF reparado y sin mallas abiertas (Watertight/Manifold).',
      'Archivo G-Code generado y simulado en laminador 3D con soportes y parámetros optimizados.'
    ],
    criterios: [
      {
        criterio: 'Posiciona piezas y soportes optimizando el consumo de material y adherencia.',
        indicadores: [
          'Orienta la pieza en la cama de impresión minimizando superficies en voladizo superiores a 45°.',
          'Configura estructuras de soporte (árbol o lineales) con puntos de contacto removibles sin dañar la superficie.',
          'Añade bordes de adherencia (Brim/Raft) cuando la base de la pieza presente riesgo de alabeo (warping).'
        ]
      },
      {
        criterio: 'Configura parámetros de laminación asegurando resistencia y precisión dimensional.',
        indicadores: [
          'Define altura de capa y número de perímetros de pared adecuados al propósito mecánico o estético.',
          'Selecciona el patrón y porcentaje de relleno (Infill: Gyroid, Grid, Cubic) optimizando tiempo y masa.',
          'Ajusta velocidades de retracción, temperatura de boquilla y ventilación de capa para el filamento (PLA/PETG).'
        ]
      },
      {
        criterio: 'Genera paquetes de G-Code validados mediante simulación de trayectorias.',
        indicadores: [
          'Inspecciona capa por capa la simulación del laminador verificando que no existan puentes al aire ni colisiones.',
          'Exporta el G-Code final con cálculo verificado de tiempo estimado y consumo en gramos de filamento.'
        ]
      }
    ]
  },

  'RAP-06': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — MODELADO ESPACIAL BIM E INTERIORISMO 3D',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Modelo tridimensional de entorno espacial/arquitectónico bajo estándar BIM (IFC / Revit / BlenderBIM).',
      'Tabla de cómputos métricos, metadatos y especificaciones técnicas de materiales asignadas.'
    ],
    criterios: [
      {
        criterio: 'Modela componentes espaciales paramétricos clasificados en categorías BIM.',
        indicadores: [
          'Levanta muros, losas, puertas, ventanas y elementos constructivos según planos arquitectónicos acotados.',
          'Asigna materiales y capas constructivas diferenciadas con propiedades visuales y dimensionales reales.'
        ]
      },
      {
        criterio: 'Estructura modelos de información bajo estándares IFC garantizando interoperabilidad.',
        indicadores: [
          'Clasifica los elementos bajo clases estándar IFC (IfcWall, IfcDoor, IfcWindow, IfcSpace, IfcFurnishingElement).',
          'Vincula metadatos de fabricante, costo, referencia y resistencia térmica a los componentes clave.'
        ]
      },
      {
        criterio: 'Genera documentación técnica y cómputos métricos integrados al modelo BIM.',
        indicadores: [
          'Extrae tablas automatizadas de cantidades de obra y listados de mobiliario directamente del modelo 3D.',
          'Exporta el archivo IFC 4 / 2x3 verificado en visores BIM abiertos sin pérdida de jerarquía espacial.'
        ]
      }
    ]
  },

  'RAP-07': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — GUIONISMO TÉCNICO Y STORYBOARDING',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Conceptualización de la historia para cada microproyecto (Logline, Sinopsis, Argumento).',
      'Guion narrativo y dramático desarrollado en tres actos para product shot, acting, simulación y VFX.',
      'Guion técnico y storyboard con clasificación de rutas de producción (Directa vs. Previs 3D).'
    ],
    criterios: [
      {
        criterio: 'Redacta el guion narrativo respetando la estructura dramática de la historia.',
        indicadores: [
          'Define logline, sinopsis e idea principal clara y atractiva para el proyecto audiovisual.',
          'Presenta la narrativa con un desarrollo estructurado (planteamiento, conflicto, clímax y resolución).',
          'Muestra la transformación o viaje emocional del personaje en las secuencias narrativas.',
          'Transmite con claridad el propósito, tono y mensaje a través de la descripción visual y acciones dramáticas.'
        ]
      },
      {
        criterio: 'Elabora el guion técnico definiendo planos, cámaras y requerimientos narrativos.',
        indicadores: [
          'Especifica los tipos de planos de cámara (general, medio, primer plano, detalle) con intención dramática.',
          'Incluye movimientos de cámara (pan, tilt, dolly, travelling, crane) y transiciones técnicas aplicadas correctamente.',
          'Traduce las acciones del personaje y objetos en indicaciones de cámara y lenguaje corporal detallado.',
          'Describe el efecto visual, iluminación, ángulo y requerimientos de audio para la postproducción.',
          'Presenta el guion técnico en formato estandarizado de la industria con tomas y escenas numeradas.'
        ]
      },
      {
        criterio: 'Diseña viñetas de storyboard clasificando rutas de producción y renderizado.',
        indicadores: [
          'Dibuja viñetas de storyboard reflejando encuadres, composición visual y ritmo cinemático.',
          'Mantiene el eje de acción (regla de los 180°) y el raccord visual entre tomas consecutivas.',
          'Clasifica técnicamente las tomas en ruta de renderizado directo o guía de previsualización 3D.'
        ]
      }
    ]
  },

  'RAP-08': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — CONCEPT ART Y HOJAS DE MODELO (MODEL SHEETS)',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Paquete de arte conceptual (Concept Art) con exploración de siluetas, armonías cromáticas y lenguaje de formas.',
      'Hojas de modelo (Model Sheets) ortográficas con vistas Frontal, Lateral y Superior alineadas a escala.'
    ],
    criterios: [
      {
        criterio: 'Diseña arte conceptual definiendo el lenguaje de formas y estilo de producción.',
        indicadores: [
          'Explora múltiples siluetas y miniaturas (thumbnails) definiendo arquetipos visuales diferenciados.',
          'Aplica paletas de color armonizadas (complementarias, análogas, triádicas) acordes a la narrativa.',
          'Genera variaciones de conceptos estéticos asistidos por herramientas generativas 2D manteniendo consistencia.'
        ]
      },
      {
        criterio: 'Diseña hojas de modelo ortográficas con escalas y referencias alineadas para modelado mediante flujo híbrido.',
        indicadores: [
          'Dibuja vistas ortográficas limpias (Front, Side, Back) perfectamente alineadas en ejes de altura y puntos de ancla.',
          'Incluye llamada de detalles de props, accesorios, texturas y expresiones faciales clave.',
          'Estandariza proporciones canónicas y guías de escala métrica para los artistas de modelado 3D.'
        ]
      }
    ]
  },

  'RAP-09': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — LAYOUT 3D Y ANIMACIÓN DE CÁMARAS',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Escena 3D con layout espacial bloqueado a escala real.',
      'Animación de cámaras cinemáticas con parámetros ópticos y animática 3D (Previs) exportada.'
    ],
    criterios: [
      {
        criterio: 'Ubica los elementos en un layout 3D respetando la narrativa y escalas espaciales.',
        indicadores: [
          'Distribuye los activos del entorno y props respetando las proporciones espaciales y líneas de visión.',
          'Bloquea las posiciones iniciales y trayectorias de los personajes acorde a los requerimientos del guion.'
        ]
      },
      {
        criterio: 'Anima cámaras 3D garantizando continuidad visual, encuadre y ritmo cinematográfico.',
        indicadores: [
          'Configura distancias focales (focal length), sensor de cámara y apertura de diafragma (f-stop) coherentes.',
          'Ajusta las curvas de animación de cámara en el editor gráfico (Graph Editor) evitando saltos y movimientos bruscos.',
          'Mantiene encuadres compositivos basados en reglas de tercios, líneas guía y peso visual de la escena.'
        ]
      },
      {
        criterio: 'Construye previsualizaciones 3D en gris validando tiempos y ritmos de cámara.',
        indicadores: [
          'Genera una animática 3D (Playblast/Viewport Render) a 24/30 FPS con conteo de tiempos verificado.',
          'Verifica la duración de cada plano y la sincronía rítmica con la pista de audio o claqueta temporal.'
        ]
      }
    ]
  },

  'RAP-10': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — RIGGING, SKINNING Y RETARGETING MOCAP',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Esqueleto 3D (Armature) con conmutación IK/FK, controladores visuales y restricciones funcionales.',
      'Malla con pesos de deformación (Skin Weights) pulidos y animación transferida por retargeting MoCap.'
    ],
    criterios: [
      {
        criterio: 'Emplaza esqueletos 3D definiendo jerarquías y ejes de transformación correctos.',
        indicadores: [
          'Ubica los huesos y pivotes articulares en los centros de rotación anatómicos del personaje.',
          'Orienta los ejes de rotación locales (Local Rotation Axes - LRA) de forma homogénea en toda la cadena ósea.',
          'Estructura jerarquías lógicas de nombrado estándar (L/R prefixes) y grupos de selección organizados.'
        ]
      },
      {
        criterio: 'Configura sistemas de rigging con controles IK/FK y restricciones funcionales.',
        indicadores: [
          'Implementa solucionadores de cinemática inversa (IK) con vectores de polo (Pole Vector) en rodillas y codos.',
          'Configura conmutador dinámico IK/FK sin deslizamiento y controles visuales amigables para animadores.',
          'Aplica restricciones de límite de rotación para evitar flexiones antinaturales o roturas de miembros.'
        ]
      },
      {
        criterio: 'Asigna pesos de deformación e integra datos de captura de movimiento sin distorsión.',
        indicadores: [
          'Pinta y suaviza pesos de influencia en zonas de torsión (hombros, cadera, cuello) sin colapsos de volumen.',
          'Mapea y retargetea curvas de captura de movimiento (MoCap BVH/FBX) sobre la estructura del rig.',
          'Corrige deslizamientos de pies (foot sliding) y penetraciones geométricas en la pose final.'
        ]
      }
    ]
  },

  'RAP-11': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — PROMPT ENGINEERING Y CONTROL ESTRUCTURAL IA',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Matriz de prompts técnicos parametrizados con pesos, tokens y prompts negativos.',
      'Pipeline de generación visual condicionado con adaptadores estructurales (ControlNet / IP-Adapter).'
    ],
    criterios: [
      {
        criterio: 'Redacta prompts técnicos estructurados con terminología precisa de producción.',
        indicadores: [
          'Estructura la sintaxis del prompt separando sujeto, acción, estilo artístico, iluminación y óptica de cámara.',
          'Utiliza terminología técnica estándar de cine y 3D (octane render, volumetric lighting, 85mm lens, subsurface scattering).',
          'Configura prompts negativos exhaustivos para evitar artefactos anatómicos, aberraciones cromáticas y ruido visual.'
        ]
      },
      {
        criterio: 'Aplica reglas de restricción lógica garantizando consistencia en la generación.',
        indicadores: [
          'Emplea modificadores de peso y relevancia de tokens numéricos para balancear la influencia estilística.',
          'Configura semillas fijas (seeds) y planificadores de muestreo (samplers) para asegurar reproducibilidad.'
        ]
      },
      {
        criterio: 'Estructura plantillas de prompts operativas parametrizadas para el equipo de producción.',
        indicadores: [
          'Integra mapas de profundidad (Depth), poses (OpenPose) o líneas (Canny) a través de módulos ControlNet.',
          'Documenta una guía operativa con disparadores de estilo y palabras clave reutilizables para el equipo.'
        ]
      }
    ]
  },

  'RAP-12': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — PASES AOV 3D Y RENDERIZADO SINTÉTICO',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Secuencia de imágenes de pases de render multicanal (EXR con Depth, Normal, Motion Vector, Cryptomatte).',
      'Secuencia de video generada con difusión guiada estabilizada temporalmente (Deflicker / RIFE).'
    ],
    criterios: [
      {
        criterio: 'Configura y exporta pases AOV 3D garantizando la información técnica necesaria.',
        indicadores: [
          'Configura correctamente los canales de profundidad Z-Depth normalizados y vectores de movimiento.',
          'Genera máscaras de Cryptomatte y pases de iluminación directa e indirecta sin artefactos de compresión.',
          'Exporta secuencias en formato OpenEXR flotante de 16/32 bits preservando el rango dinámico lineal.'
        ]
      },
      {
        criterio: 'Procesa secuencias de render vinculando pases 3D a motores de difusión guiada.',
        indicadores: [
          'Conecta la secuencia de pases 3D como condición de entrada para la generación asistida por IA.',
          'Mantiene la consistencia de personajes y fondos a lo largo de los cuadros procesados.'
        ]
      },
      {
        criterio: 'Elimina la inestabilidad temporal entregando secuencias de video fluidas y coherentes.',
        indicadores: [
          'Aplica filtros de consistencia temporal e interpolación de cuadros por flujo óptico (RIFE/Flow-Warp).',
          'Entrega secuencias de video estables sin parpadeos (flicker) a resolución y framerate de producción.'
        ]
      }
    ]
  },

  'RAP-13': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — COMPOSICIÓN DIGITAL NODAL Y POSTPRODUCCIÓN',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Árbol de composición nodal funcional en Nuke, DaVinci Fusion o Blender Compositor.',
      'Master audiovisual final compuesto, talonado (Color Grading) y sonorizado a resolución 4K/FHD.'
    ],
    criterios: [
      {
        criterio: 'Compone capas de render e integración de elementos en un árbol nodal funcional.',
        indicadores: [
          'Reconstruye la pasada Beauty combinando matemáticamente los pases Diffuse, Specular, Transmission y Emission.',
          'Integra elementos 2D/3D (humo, partículas, flares) mediante máscaras de rotoscopia y mates alfa limpios.',
          'Mantiene una estructura de árbol nodal ordenada con fondos de color, notas y nombres de nodos descriptivos.'
        ]
      },
      {
        criterio: 'Aplica corrección de color y efectos de lente garantizando acabado cinematográfico.',
        indicadores: [
          'Aplica ecualización de color primario y balance de blancos homologando todas las tomas de la secuencia.',
          'Añade efectos ópticos realistas (desenfoque de movimiento, aberración cromática sutil, grain, bloom).',
          'Aplica LUTs o gradaciones estilísticas secundarias sin aplastar sombras ni quemar altas luces.'
        ]
      },
      {
        criterio: 'Ensambla la secuencia audiovisual final compuesta y sonorizada para exhibición.',
        indicadores: [
          'Sincroniza la banda sonora, efectos foley y diálogos masterizados respetando niveles de sonoridad (LUFS).',
          'Exporta el archivo master en códec estándar de exhibición (ProRes / DNxHR / H.264 High Profile) sin pérdida.'
        ]
      }
    ]
  },

  'RAP-14': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — OPTIMIZACIÓN REAL-TIME Y SISTEMAS LOD',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Conjunto de activos 3D con niveles de detalle progresivos (LOD0, LOD1, LOD2, LOD3) integrados.',
      'Perfil de rendimiento en motor gráfico (Unreal / Unity) alcanzando 60 FPS estables con presupuesto de draw calls.'
    ],
    criterios: [
      {
        criterio: 'Genera niveles de detalle (LODs) optimizando la carga geométrica en el motor.',
        indicadores: [
          'Reduce el número de polígonos en al menos un 50% entre cada nivel de LOD conservando siluetas clave.',
          'Configura distancias de conmutación de LOD en el motor gráfico sin efecto de chasquido visual (popping).',
          'Aplica mallas de colisión simplificadas (convex hulls / primitivas) para física eficiente.'
        ]
      },
      {
        criterio: 'Hornea mapas de luz y sondas de reflexión manteniendo rendimiento gráfico.',
        indicadores: [
          'Hornea iluminación estática (Lightmaps) con resoluciones balanceadas y canales UV2 sin solapes.',
          'Coloca y calibra sondas de reflexión (Reflection Captures) para reflejos locales sin sobrecarga de VRAM.'
        ]
      },
      {
        criterio: 'Optimiza e integra activos en el motor gráfico alcanzando una tasa estable de 60 FPS.',
        indicadores: [
          'Monitorea el framerate con herramientas de perfilado (Unreal Insights / Unity Profiler) verificando 60 FPS constantes.',
          'Mantiene el número de llamadas de dibujado (Draw Calls) y consumo de memoria dentro de los límites del proyecto.'
        ]
      }
    ]
  },

  'RAP-15': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — SCRIPTING INTERACTIVO Y MECÁNICAS 3D',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Scripts de control de usuario y mecánicas interactivas documentados bajo paradigma POO (C# / Blueprints).',
      'Escena interactiva jugable con detección de colisiones, eventos de gatillo (triggers) y feedback al usuario.'
    ],
    criterios: [
      {
        criterio: 'Escribe scripts de control de usuario respondiendo a entradas de forma fluida.',
        indicadores: [
          'Implementa movimiento de cámara y controlador de primera/tercera persona con respuesta fluida.',
          'Mapea entradas de periféricos (teclado, mouse, gamepad o headset VR) mediante el nuevo sistema de Input.',
          'Escribe código limpio, modular y comentado siguiendo buenas prácticas de nomenclatura.'
        ]
      },
      {
        criterio: 'Programar detectores de evento y colisiones activando mecánicas operativas en 3D.',
        indicadores: [
          'Configura colisionadores físicos (Box, Sphere, Capsule, Mesh Colliders) con capas de colisión bien filtradas.',
          'Programa respuestas a eventos OnTriggerEnter / OnCollisionEnter activando apertura de puertas o animaciones.',
          'Implementa máquinas de estados lógicos (FSM) para controlar secuencias e interactividad.'
        ]
      },
      {
        criterio: 'Conecta la lógica del programa con componentes de interfaz garantizando funcionalidad.',
        indicadores: [
          'Vincula variables de estado con elementos de interfaz HUD (barras de progreso, temporizadores, contadores).',
          'Gestiona excepciones y previene errores en tiempo de ejecución (Null Reference Exceptions) verificados en consola.'
        ]
      }
    ]
  },

  'RAP-16': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — ARQUITECTURA UI/UX Y COMPILACIÓN FINAL',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Sistema de interfaz de usuario 2D/3D (HUD, menú principal, panel de configuración, botones táctiles).',
      'Paquete ejecutable (.exe / .apk / WebGL) compilado, probado y libre de errores en plataforma de destino.'
    ],
    criterios: [
      {
        criterio: 'Diseña interfaces de usuario (UI/UX) funcionales e intuitivas para la aplicación 3D.',
        indicadores: [
          'Estructura una jerarquía visual clara con tipografías legibles y contraste adecuado sobre entornos 3D.',
          'Implementa interactividad con botones, controles deslizantes y menús con retroalimentación sonora y visual.',
          'Asegura accesibilidad básica y navegación fluida mediante controlador, mouse o puntero espacial.'
        ]
      },
      {
        criterio: 'Integra módulos 3D e interactividad en un simulador/gemelo digital explorable.',
        indicadores: [
          'Ensambla todos los subsistemas (entorno, modelos, iluminación, scripting, audio) en una experiencia coherente.',
          'Verifica la navegación espacial libre o por puntos de teletransporte sin bloqueos de cámara.'
        ]
      },
      {
        criterio: 'Compila y despliega la aplicación interactiva multiplataforma verificada sin errores.',
        indicadores: [
          'Configura los parámetros de build (resolución, compresión de texturas, shaders de destino) adecuadamente.',
          'Compila la aplicación generando un instalador o ejecutable verificado en equipo cliente sin dependencias faltantes.'
        ]
      }
    ]
  },

  'RAP-31': {
    titulo: 'LISTA DE CHEQUEO DE EVIDENCIA — SUSTENTACIÓN Y PORTAFOLIO TÉCNICO FINAL',
    codigo_formato: 'GFPI-F-023',
    version: '02',
    red: 'RED DE ARTES GRÁFICAS / TECNOLOGÍAS DIGITALES',
    tipo_evidencia: 'Evidencia de Producto y Desempeño',
    evidencias: [
      'Portafolio profesional interactivo web / reel cinemático compilando los tres macroproyectos.',
      'Sustentación técnica formal del portafolio y defensa del perfil profesional ante el comité evaluador.'
    ],
    criterios: [
      {
        criterio: 'Estructura el portafolio profesional integrando los productos técnicos de los tres macroproyectos.',
        indicadores: [
          'Presenta el prototipo CAD / manufactura aditiva con planos explosionados y guía técnica de ensamble.',
          'Incluye el teaser cinemático animado con pases de render, efectos visuales y postproducción.',
          'Demuestra el simulador interactivo / gemelo digital funcionando en tiempo real a 60 FPS.'
        ]
      },
      {
        criterio: 'Sustenta técnicamente los procesos, toma de decisiones y flujos híbridos implementados.',
        indicadores: [
          'Defiende con vocabulario técnico preciso las decisiones de topología, texturizado, rigging y render.',
          'Explica la aceleración y control estructural asistido por Inteligencia Artificial en su flujo de producción.',
          'Responde con solvencia técnica a las preguntas formuladas por los instructores evaluadores.'
        ]
      }
    ]
  }
};

export function getInstrumentoForRap(rapKey) {
  return INSTRUMENTOS_EVALUACION[rapKey] || INSTRUMENTOS_EVALUACION['RAP-07'] || INSTRUMENTOS_EVALUACION['RAP-01'];
}
