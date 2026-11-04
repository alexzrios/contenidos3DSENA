# 🌐 Portal Curricular y Generador SENA 3D

Plataforma interactiva para la gestión curricular, visualización del pipeline de producción y generación automatizada de documentos institucionales SENA (**Proyecto Formativo**, **Planeación Pedagógica** y **Guías de Aprendizaje**) para tres programas de formación:

1. **Tecnología en Producción de Contenidos 3D** (3.120 Horas / 65 Créditos — 7 Trimestres Lectivos + 2 de Práctica).
2. **Técnico en Modelado de Prototipos 3D ("3D para Hacer")** (1.344 Horas / 28 Créditos — 3 Trimestres).
3. **Técnico en Animación 3D ("3D para Ver")** (1.344 Horas / 28 Créditos — 3 Trimestres).

---

## 🚀 Cómo abrir y visualizar el sitio en Visual Studio Code

### Opción 1: Con la extensión Live Server (Recomendada)
1. Abre la carpeta `d:\CONTENIDOS3D` en **Visual Studio Code**.
2. Haz clic derecho sobre el archivo [`index.html`](file:///d:/CONTENIDOS3D/index.html).
3. Selecciona **"Open with Live Server"**.
4. Se abrirá automáticamente en tu navegador web en `http://127.0.0.1:5500`.

### Opción 2: Desde la terminal integrada de VS Code
Abre la terminal en VS Code (`Ctrl + ñ` o `Ctrl + ~`) y ejecuta:

```powershell
# Con Python
python -m http.server 3000

# O con npx
npx serve .
```
Luego abre `http://localhost:3000` en tu navegador.

---

## 📂 Arquitectura del Proyecto

```text
d:\CONTENIDOS3D\
├── index.html                     # Portal web principal con diseño Bento Grid y temas
├── README.md                      # Documentación del proyecto
├── matriz_competencias.csv        # Archivo maestro de datos importados
├── css/
│   ├── main.css                   # Estilos visuales modernos, tarjetas interactivas y modales
│   └── print-sena.css             # Estilos oficiales para impresión y exportación en PDF institucional
├── js/
│   ├── data/
│   │   ├── normas-raps.js         # Base de datos completa de RAPs (Hacer, Saber, Criterios y Evidencias)
│   │   ├── curriculo-tecnologo.js # Malla y fases del Tecnólogo (7 trimestres)
│   │   ├── curriculo-modelado.js  # Malla del Técnico en Modelado (3 trimestres)
│   │   └── curriculo-animacion.js # Malla del Técnico en Animación (3 trimestres)
│   ├── components/
│   │   ├── pipeline-viewer.js     # Infografía del pipeline de producción híbrido (3D + IA)
│   │   ├── curriculum-table.js    # Matriz interactiva por trimestres con filtros y modales
│   │   └── document-builder.js    # Motor generador de Proyecto Formativo, Planeación y Guías
│   ├── automation/
│   │   └── n8n-client.js          # Conector para webhooks de n8n
│   └── app.js                     # Controlador principal de la SPA
```

---

## ⚡ Módulos y Funcionalidades

1. **🎨 Infografía del Pipeline Híbrido (3D + IA):**
   - Diagrama interactivo que muestra las fases de trabajo, las herramientas recomendadas y cómo la IA generativa asiste cada etapa técnica sin comprometer el control geométrico o anatómico.

2. **📊 Malla Curricular & RAPs por Trimestre:**
   - Tabla interactiva con filtro de RAPs específicos vs. Transversales.
   - Cada tarjeta permite abrir un modal emergente con los **Conocimientos de Proceso (Hacer)**, **Conocimientos del Saber** y **Criterios de Evaluación**.

3. **📄 Generador de Documentos Institucionales SENA:**
   - **Guía de Aprendizaje (GFPI-F-135):** Genera la guía completa de 6 secciones para cualquiera de los RAPs seleccionados con un solo clic.
   - **Planeación Pedagógica (GFPI-F-134):** Genera la matriz curricular completa con cálculo automático de horas directas e independientes.
   - **Proyecto Formativo (GFPI-F-016):** Genera la ficha del proyecto en sus 4 fases canónicas: Análisis, Planeación, Ejecución y Evaluación.
   - **Exportación en PDF:** Botón listo con estilos de impresión optimizados (`window.print()`).

4. **⚡ Automatización con n8n:**
   - Permite disparar webhooks hacia una instancia de n8n para conectar agentes de IA (Gemini / Claude), enviar las guías a Google Drive o sincronizarlas con Google Sheets.
