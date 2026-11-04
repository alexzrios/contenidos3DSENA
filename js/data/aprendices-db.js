// ====================================================================
// BASE DE DATOS DE APRENDICES (DB APRENDICES SENA)
// Ficha de Caracterización: 2824560 - Tecnología en Producción de Contenidos 3D
// Centro Tecnológico del Mobiliario - Regional Antioquia
// ====================================================================

export const APRENDICES_DEFAULT = [
  { id: 1, ficha: '2824560', tipo_doc: 'CC', documento: '1001234567', nombres: 'Alejandro', apellidos: 'Morales Gómez', correo: 'amorales.g@soy.sena.edu.co', estado: 'En Formación' },
  { id: 2, ficha: '2824560', tipo_doc: 'CC', documento: '1009876543', nombres: 'Valentina', apellidos: 'Rendón Zapata', correo: 'vrendon.z@soy.sena.edu.co', estado: 'En Formación' },
  { id: 3, ficha: '2824560', tipo_doc: 'CC', documento: '1017654321', nombres: 'Juan Esteban', apellidos: 'Henao Restrepo', correo: 'jhenao.r@soy.sena.edu.co', estado: 'En Formación' },
  { id: 4, ficha: '2824560', tipo_doc: 'TI', documento: '1020456789', nombres: 'Mariana', apellidos: 'Castro Gutiérrez', correo: 'mcastro.g@soy.sena.edu.co', estado: 'En Formación' },
  { id: 5, ficha: '2824560', tipo_doc: 'CC', documento: '1035678912', nombres: 'Mateo', apellidos: 'Osorio Londoño', correo: 'mosorio.l@soy.sena.edu.co', estado: 'En Formación' },
  { id: 6, ficha: '2824560', tipo_doc: 'TI', documento: '1042345678', nombres: 'Camila', apellidos: 'Jaramillo Arango', correo: 'cjaramillo.a@soy.sena.edu.co', estado: 'En Formación' },
  { id: 7, ficha: '2824560', tipo_doc: 'CC', documento: '1056789012', nombres: 'Santiago', apellidos: 'Montoya Correa', correo: 'smontoya.c@soy.sena.edu.co', estado: 'En Formación' },
  { id: 8, ficha: '2824560', tipo_doc: 'CC', documento: '1067890123', nombres: 'Laura Sofía', apellidos: 'Betancur Vélez', correo: 'lbetancur.v@soy.sena.edu.co', estado: 'En Formación' },
  { id: 9, ficha: '2824560', tipo_doc: 'CC', documento: '1078901234', nombres: 'Sebastián', apellidos: 'Gaviria Duque', correo: 'sgaviria.d@soy.sena.edu.co', estado: 'En Formación' },
  { id: 10, ficha: '2824560', tipo_doc: 'TI', documento: '1089012345', nombres: 'Daniela', apellidos: 'Pineda Echeverri', correo: 'dpineda.e@soy.sena.edu.co', estado: 'En Formación' },
  { id: 11, ficha: '2824560', tipo_doc: 'CC', documento: '1090123456', nombres: 'Carlos Andrés', apellidos: 'Zuluaga Villa', correo: 'czuluaga.v@soy.sena.edu.co', estado: 'En Formación' },
  { id: 12, ficha: '2824560', tipo_doc: 'CC', documento: '1101234567', nombres: 'Manuela', apellidos: 'Saldarriaga Cano', correo: 'msaldarriaga.c@soy.sena.edu.co', estado: 'En Formación' }
];

const STORAGE_KEY = 'sena_aprendices_db';
const EVAL_STORAGE_KEY = 'sena_evaluaciones_db';

export function getAprendices() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveAprendices(APRENDICES_DEFAULT);
      return [...APRENDICES_DEFAULT];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...APRENDICES_DEFAULT];
  } catch (e) {
    console.error('Error al leer aprendices de localStorage:', e);
    return [...APRENDICES_DEFAULT];
  }
}

export function saveAprendices(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error al guardar aprendices:', e);
  }
}

export function addAprendiz(data) {
  const current = getAprendices();
  const nextId = current.length > 0 ? Math.max(...current.map(a => a.id || 0)) + 1 : 1;
  const newAp = {
    id: nextId,
    ficha: data.ficha || '2824560',
    tipo_doc: data.tipo_doc || 'CC',
    documento: data.documento ? String(data.documento).trim() : '00000000',
    nombres: data.nombres ? data.nombres.trim() : 'Nombre',
    apellidos: data.apellidos ? data.apellidos.trim() : 'Apellido',
    correo: data.correo ? data.correo.trim() : '',
    estado: data.estado || 'En Formación'
  };
  current.push(newAp);
  saveAprendices(current);
  return newAp;
}

export function deleteAprendiz(id) {
  const current = getAprendices();
  const filtered = current.filter(a => a.id !== id && a.documento !== String(id));
  saveAprendices(filtered);
  return filtered;
}

export function resetAprendices() {
  saveAprendices(APRENDICES_DEFAULT);
  return [...APRENDICES_DEFAULT];
}

export function importAprendicesFromText(text) {
  if (!text || !text.trim()) return [];
  const lines = text.trim().split('\n');
  const current = getAprendices();
  let addedCount = 0;

  lines.forEach((line, idx) => {
    const parts = line.split(/[\t;,]/).map(p => p.trim()).filter(Boolean);
    if (parts.length >= 2) {
      // Formato asumido: [Documento, Nombre(s) y Apellido(s), Correo opcional, Ficha opcional]
      const doc = parts[0].replace(/[^0-9]/g, '');
      if (doc) {
        const fullNombre = parts[1];
        const tokens = fullNombre.split(' ');
        let nombres = fullNombre;
        let apellidos = '';
        if (tokens.length >= 2) {
          nombres = tokens.slice(0, Math.ceil(tokens.length / 2)).join(' ');
          apellidos = tokens.slice(Math.ceil(tokens.length / 2)).join(' ');
        }
        const correo = parts[2] || `${doc}@soy.sena.edu.co`;
        const ficha = parts[3] || '2824560';

        // Evitar duplicados por documento
        const exists = current.find(a => a.documento === doc);
        if (!exists) {
          const nextId = current.length > 0 ? Math.max(...current.map(a => a.id || 0)) + 1 : 1;
          current.push({
            id: nextId,
            ficha: ficha,
            tipo_doc: 'CC',
            documento: doc,
            nombres: nombres,
            apellidos: apellidos,
            correo: correo,
            estado: 'En Formación'
          });
          addedCount++;
        }
      }
    }
  });

  if (addedCount > 0) {
    saveAprendices(current);
  }
  return current;
}

// --------------------------------------------------------------------
// PERSISTENCIA DE EVALUACIONES POR APRENDIZ Y RAP
// --------------------------------------------------------------------
export function getEvaluacionKey(rapKey, documento) {
  return `${rapKey}_${documento}`;
}

export function getEvaluacion(rapKey, documento) {
  try {
    const raw = localStorage.getItem(EVAL_STORAGE_KEY);
    if (!raw) return null;
    const store = JSON.parse(raw);
    const key = getEvaluacionKey(rapKey, documento);
    return store[key] || null;
  } catch (e) {
    console.error('Error al leer evaluación:', e);
    return null;
  }
}

export function saveEvaluacion(rapKey, documento, evalData) {
  try {
    let store = {};
    const raw = localStorage.getItem(EVAL_STORAGE_KEY);
    if (raw) store = JSON.parse(raw);
    const key = getEvaluacionKey(rapKey, documento);
    store[key] = {
      ...evalData,
      updated_at: new Date().toISOString()
    };
    localStorage.setItem(EVAL_STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.error('Error al guardar evaluación:', e);
  }
}
