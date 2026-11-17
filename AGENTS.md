# Instrucciones para Agentes de IA en este Repositorio (AGENTS.md)

Este repositorio contiene el **Ecosistema Curricular SENA para Tecnologías 3D**.
Antes de realizar cualquier modificación, el agente **DEBE** leer y respetar las siguientes directrices:

### 1. Lectura Obligatoria de Contexto
- Consulta siempre [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md) para conocer la arquitectura de los 3 programas (`tecnologo`, `modelado`, `animacion`), los 16 RAPs técnicos del Tecnólogo, las 16 guías oficiales de aprendizaje (`GA01` a `GA16`), y los formatos oficiales SENA (`GFPI-F-016`, `GFPI-F-134`, `GFPI-F-135`).

### 2. Reglas Estrictas de Git y Despliegue (Regla de Oro)
- **Trabajo exclusivo en `dev`:** Toda edición y prueba se realiza primero en la rama `dev`.
- **Paso 1:** NUNCA ejecutes `git push origin dev` sin solicitar y recibir **autorización explícita** del usuario.
- **Paso 2:** NUNCA hagas merge a `main` ni `git push origin main` sin solicitar y recibir **autorización explícita** del usuario.
- **Producción en Railway:**
  - El entorno productivo está en Railway: `https://contenidos3dsena-production.up.railway.app`.
  - Cada vez que se despliegue a `main`, se debe verificar el estado `[SUCCESS]` en `list-deployments` y **purgar la caché CDN** con `purge-cdn-cache` (`scope: "all"`).
  - Al finalizar, regresa siempre la rama local activa a `dev`.

### 3. Integridad Curricular
- Nunca mezcles códigos de guías (`[GA05]`, etc.) dentro de las actividades de otra guía.
- Cada RAP técnico del Tecnólogo tiene su propia guía oficial (`RAP-01` = `GA01`, ..., `RAP-16` = `GA16`).
- Técnico en Modelado (`522302`) tiene 3 trimestres, RAPs 01 al 06 técnicos, 2 competencias técnicas.
- Técnico en Animación (`522303`) tiene 3 trimestres, RAPs 07 al 13 técnicos, 3 competencias técnicas.
- Tecnólogo (`522301`) tiene 7 trimestres, RAPs 01 al 16 técnicos, 6 competencias técnicas.
