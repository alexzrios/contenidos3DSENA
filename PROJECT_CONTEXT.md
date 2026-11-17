# 🌐 Ecosistema Curricular SENA — Tecnologías 3D
## Documento Maestro de Contexto, Arquitectura y Estado del Proyecto (PROJECT_CONTEXT.md)

Este documento contiene la memoria técnica, arquitectura curricular, convenciones operativas y estado completo del proyecto para garantizar la **continuidad total e inmediata** del desarrollo en cualquier computador o entorno con **Google Antigravity** o Visual Studio Code.

---

### 1. Información General y Enlaces de Acceso

- **Nombre del Proyecto:** Portal Curricular de Tecnologías 3D — Formación Profesional Integral SENA
- **Red de Conocimiento:** Red de Tecnologías Virtuales & Diseño Digital
- **Centro de Formación:** Centro Tecnológico del Mobiliario — Centro de Servicios y Gestión Empresarial (Regional Antioquia - Itagüí)
- **Repositorio Oficial en GitHub:** [https://github.com/alexzrios/contenidos3DSENA](https://github.com/alexzrios/contenidos3DSENA)
  - Rama de trabajo/desarrollo: `dev`
  - Rama de producción/despliegue: `main`
- **URL en Producción (Railway):** [https://contenidos3dsena-production.up.railway.app](https://contenidos3dsena-production.up.railway.app)
- **Railway Project ID:** `f49677b8-aca8-487f-b322-2b56e8e1d14d` | Service ID: `afe49aeb-820d-49ae-8d4e-1b030752a347`

---

### 2. Los 3 Programas de Formación y su Malla Curricular

El ecosistema integra tres programas curriculares totalmente diferenciados pero articulados a través de las Normas Sectoriales de Competencia Laboral (NSCL) y la CUOC:

#### A. Tecnólogo en Producción de Contenidos 3D (Código SENA: 522301)
- **Duración:** 3.120 Horas (65 Créditos Académicos) — 7 Trimestres Lectivos + 2 Trimestres de Etapa Práctica.
- **Enfoque Tecnológico:** Pipeline Híbrido Completo (3D + IA Generativa asistida) articulando escultura, topología, texturizado, CAD, BIM, rigging, MoCap, VFX, render generativo y gemelos digitales en tiempo real.
- **Estructura Curricular:**
  - **16 RAPs Técnicos Principales:** `RAP-01` a `RAP-16`.
  - **15 RAPs Transversales / Claves:** `RAP-17` a `RAP-31` (Inducción, Comunicación, Ética, Actividad Física, Derechos del Trabajo, Emprendimiento, SST/Ambiental, TIC, Inglés 1 al 6).
  - **6 Competencias Técnicas Específicas:**
    1. `220501083`: Producir los componentes de la animación de acuerdo con técnicas de modelado y diseño (384h / 8cr).
    2. `220101016`: Generar prototipo digital según técnicas de modelado y especificaciones de producto (288h / 6cr).
    3. `250201022`: Desarrollar storyboard de acuerdo con guion y contenido audiovisual e interactivo (192h / 4cr).
    4. `250201026`: Animar elementos de la escena según técnicas y especificaciones del proyecto (192h / 4cr).
    5. `250201039`: Desarrollar efectos visuales digitales de acuerdo con proyecto audiovisual y plataforma de exhibición (336h / 7cr).
    6. `220501096`: Desarrollar la solución de software de acuerdo con el diseño y requerimientos técnicos (384h / 8cr).
  - **16 Guías de Aprendizaje Oficiales:** `GA01` a `GA16` consecutivas, cada una vinculada al RAP técnico correspondiente (ej. GA01 = RAP 01, GA02 = RAP 02, etc.), **sin mezclar actividades de otras guías**.

#### B. Técnico en Modelado de Prototipos 3D — "3D para Hacer" (Código SENA: 522302)
- **Duración:** 1.344 Horas (28 Créditos) — 3 Trimestres Lectivos (1 Año).
- **Enfoque Tecnológico:** Manufactura Aditiva, Escultura Orgánica, Retopología, Superficies PBR, Diseño Paramétrico CAD industrial e Interoperabilidad BIM / IFC.
- **Estructura de Trimestres:**
  - *Trimestre I (384 h · PLANEAR):* RAP 01 (Inducción), RAP 02 (Comunicación), RAP 03 (Ética) + **RAP 10** (Escultura Orgánica 144h) y **RAP 11** (Retopología y UV 96h).
  - *Trimestre II (432 h · HACER):* RAP 04 (Actividad Física), RAP 05 (Inglés 1) + **RAP 12** (Texturizado PBR 144h), **RAP 13** (CAD Paramétrico 144h) y **RAP 14** (Impresión 3D 48h).
  - *Trimestre III (288 h · HACER):* RAP 06 (Derechos del Trabajo), RAP 07 (Emprendimiento), RAP 08 (SST/Ambiental), RAP 09 (TIC) + **RAP 15** (BIM e IFC 96h).
- **Competencias Técnicas:** 2 competencias específicas (`220501083` y `220101016`) + 9 transversales.

#### C. Técnico en Animación 3D — "3D para Ver" (Código SENA: 522303)
- **Duración:** 1.344 Horas (28 Créditos) — 3 Trimestres Lectivos (1 Año).
- **Enfoque Tecnológico:** Pipeline Cinemático Híbrido, Animación de Cámaras, Deformación de Personajes, Rigging, MoCap y VFX asistido por IA.
- **Estructura de Trimestres:**
  - *Trimestre I (384 h · PLANEAR):* RAP 01 (Inducción), RAP 02 (Comunicación), RAP 03 (Ética) + **RAP 10** (Guion y Storyboard 96h), **RAP 11** (Model Sheets 96h) y **RAP 12** (Previs 3D 48h).
  - *Trimestre II (384 h · HACER):* RAP 04 (Actividad Física), RAP 05 (Inglés 1) + **RAP 13** (Rigging y MoCap 144h), **RAP 14** (Prompts Técnicos 48h) y **RAP 15** (Render Generativo guiado por pases 3D 96h).
  - *Trimestre III (384 h · VERIFICAR):* RAP 06 (Derechos del Trabajo), RAP 07 (Emprendimiento), RAP 08 (SST/Ambiental), RAP 09 (TIC) + **RAP 16** (Composición, VFX y Postproducción 192h).
- **Competencias Técnicas:** 3 competencias específicas (`250201022`, `250201026` y `250201039`) + 9 transversales.

---

### 3. Formatos Oficiales SENA Implementados

1. **GFPI-F-016 (Proyecto Formativo):**
   - Editor interactivo de 10 secciones completas: Información Básica, Macroproyectos, Planteamiento del Problema, Justificación, Alcance/Objetivos, Riesgos (2.5.3), Productos por Fase (2.5.4), Innovación (2.6), Valoración Productiva (2.7) y Planeación Pedagógica (Sección 10).
   - Subnavegación compacta por menú desplegable (`<select>`) con botones de avance `[◀ Anterior]` y `[Siguiente ▶]`.
   - Sección 10 interactiva: configuración dinámica de las **16 Guías de Aprendizaje oficiales**, permitiendo agregar, editar o eliminar actividades de proyecto en cada guía.
   - Formato descargable idéntico a la plantilla institucional en tabla descargable/imprimible.
2. **GFPI-F-134 (Planeación Pedagógica):**
   - Matriz curricular con cálculo automatizado de horas directas e independientes por fase del proyecto formativo.
3. **GFPI-F-135 V02 (Guía de Aprendizaje):**
   - Formato oficial con logo centrado, tipografía institucional, identificación, presentación, actividades de reflexión inicial, apropiación, transferencia y evaluación.
   - Sincronización en tiempo real con la actividad de proyecto configurada en la planeación (sin cruces entre guías).
   - Generación de instrumentos de evaluación en formato de lista de chequeo / rúbrica.

---

### 4. Arquitectura de Archivos y Componentes

```text
d:\CONTENIDOS3D\
├── index.html                     # SPA principal modular (V=4.0) con selector de programas y vistas
├── PROJECT_CONTEXT.md             # Este documento maestro de contexto
├── README.md                      # Documentación del proyecto
├── AGENTS.md                      # Instrucciones y directrices para agentes de IA
├── css/
│   ├── main.css                   # Diseño Bento Grid, Glassmorphism, temas y modales
│   └── print-sena.css             # Estilos oficiales para impresión limpia en PDF (window.print)
├── js/
│   ├── app.js                     # Controlador principal de la SPA y orquestación
│   ├── data/
│   │   ├── normas-raps.js         # Base de datos de Saberes, Hacer, Criterios, RAPs y Competencias
│   │   ├── curriculo-tecnologo.js # 7 Trimestres del Tecnólogo (16 RAPs técnicos + 15 transversales)
│   │   ├── curriculo-modelado.js  # 3 Trimestres del Técnico en Modelado con fases asignadas
│   │   ├── curriculo-animacion.js # 3 Trimestres del Técnico en Animación con fases asignadas
│   │   ├── proyecto-formativo-db.js # Persistencia y lógica de las 16 guías oficiales
│   │   ├── guia-transversales.js  # Banco de actividades y saberes transversales articulados
│   │   └── aprendices-db.js       # Base de datos local de aprendices para evaluación
│   └── components/
│       ├── pipeline-viewer.js     # Infografía del Pipeline Híbrido 3D + IA
│       ├── curriculum-table.js    # Malla Curricular, Acordeón de Competencias y Detalle de RAPs
│       ├── proyecto-formativo-view.js # Editor y vista oficial GFPI-F-016
│       └── document-builder.js    # Generador GFPI-F-135, F-134 y F-016
```

---

### 5. Reglas de Desarrollo y Despliegue (Standing Rules)

Para mantener la estabilidad e integridad del repositorio, cualquier agente de IA o desarrollador debe seguir estrictamente este flujo:

1. **Desarrollo en rama `dev`:**
   - Todos los cambios de código se realizan y prueban localmente en la rama `dev`.
2. **Paso 1 (Push a Dev):**
   - Se debe solicitar **autorización explícita al usuario** antes de ejecutar `git push origin dev`.
3. **Paso 2 (Merge y Despliegue a Main):**
   - Se debe solicitar **autorización explícita al usuario** antes de mergear a `main` y hacer `git push origin main`.
4. **Despliegue y Purga en Railway:**
   - Al hacer push a `main`, Railway inicia el build automáticamente.
   - Si se requiere forzar el build inmediatamente, usar `connect-service-source` de `railway_mcp`.
   - Verificar estado `[SUCCESS]` en `list-deployments`.
   - **Siempre purgar la caché CDN** tras cada despliegue (`purge-cdn-cache` con `scope: "all"`), de lo contrario los navegadores continuarán viendo la versión anterior.
5. **Regreso a `dev`:**
   - La rama local activa de trabajo siempre debe quedar en `dev`.

---

### 6. Cómo Continuar el Trabajo en un Nuevo Computador

En el nuevo computador:

1. **Instalar Git y clonar el repositorio:**
   ```bash
   git clone https://github.com/alexzrios/contenidos3DSENA.git
   cd contenidos3DSENA
   git checkout dev
   ```
2. **Abrir la carpeta en Antigravity:**
   - Inicia sesión en Google Antigravity con tu cuenta de Google.
   - Abre la carpeta `contenidos3DSENA`.
3. **Primer prompt para iniciar el chat en el nuevo computador:**
   > *"Hola Antigravity, por favor lee `PROJECT_CONTEXT.md` y `AGENTS.md` para retomar el desarrollo del Ecosistema Curricular SENA 3D exactamente donde lo dejamos."*
   
   Con este comando, el agente en el nuevo equipo tendrá de inmediato el 100% de la memoria, decisiones y convenciones del proyecto.
