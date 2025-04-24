// Utilidad para consumir la API del backend GAS
// Puedes ajustar la URL base según despliegues
const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

// Modo fallback habilitado (true) - usará datos de prueba solo si falla la conexión
const USAR_FALLBACK_SI_FALLA = true; // Cambia a false para deshabilitar completamente los datos de prueba

// Datos de prueba para cuando estamos en modo offline o falla la API
const DATOS_PRUEBA = {
  mesas: [
    { id: "1", nombre: "Mesa Principal" },
    { id: "2", nombre: "Mesa de Ventas" },
    { id: "3", nombre: "Mesa de Soporte" }
  ],
  enlaces: {
    "1": [
      { id: "101", nombre: "Google", url: "google.com", peso: 5, icono: "https://www.google.com/favicon.ico" },
      { id: "102", nombre: "Microsoft", url: "microsoft.com", peso: 4, icono: "https://www.microsoft.com/favicon.ico" },
      { id: "103", nombre: "GitHub", url: "github.com", peso: 3, icono: "https://github.com/favicon.ico" }
    ],
    "2": [
      { id: "201", nombre: "Shopify", url: "shopify.com", peso: 5, icono: "https://www.shopify.com/favicon.ico" },
      { id: "202", nombre: "Amazon", url: "amazon.com", peso: 4, icono: "https://www.amazon.com/favicon.ico" }
    ],
    "3": [
      { id: "301", nombre: "Zendesk", url: "zendesk.com", peso: 5, icono: "https://www.zendesk.com/favicon.ico" },
      { id: "302", nombre: "Stack Overflow", url: "stackoverflow.com", peso: 4, icono: "https://stackoverflow.com/favicon.ico" },
      { id: "303", nombre: "Jira", url: "atlassian.com/jira", peso: 3, icono: "" }
    ]
  },
  config: {
    "bienvenida": { valor: "¡Bienvenido a la aplicación Kubo en modo desarrollo!" }
  }
};

export async function fetchMesas() {
  try {
    // Siempre intentamos conectar con la API real primero
    console.log("Conectando con API para obtener mesas...");
    const res = await fetch(`${API_BASE_URL}?endpoint=mesas`);
    if (!res.ok) throw new Error("Error al obtener las mesas");
    const data = await res.json();
    console.log("Mesas obtenidas con éxito desde la API", data.length);
    return data;
  } catch (error) {
    // Solo usamos datos de prueba si falla la conexión Y el fallback está habilitado
    if (USAR_FALLBACK_SI_FALLA) {
      console.warn("Error conectando con la API, usando datos de prueba:", error);
      return DATOS_PRUEBA.mesas;
    } else {
      // Si el fallback está deshabilitado, propagamos el error
      console.error("Error conectando con la API y el fallback está deshabilitado:", error);
      throw error;
    }
  }
}

export async function fetchEnlacesPorMesa(mesaId) {
  // Asegurarse que mesaId es un string
  const mesaIdStr = String(mesaId);
  
  try {
    // Siempre intentamos conectar con la API real primero
    console.log(`Conectando con API para obtener enlaces de mesa ${mesaIdStr}...`);
    const res = await fetch(`${API_BASE_URL}?endpoint=enlaces&mesa=${mesaIdStr}`);
    if (!res.ok) throw new Error("Error al obtener enlaces");
    const data = await res.json();
    console.log(`Enlaces para mesa ${mesaIdStr} obtenidos con éxito:`, data.length);
    return data;
  } catch (error) {
    // Solo usamos datos de prueba si falla la conexión Y el fallback está habilitado
    if (USAR_FALLBACK_SI_FALLA) {
      console.warn(`Error conectando con la API para mesa ${mesaIdStr}, usando datos de prueba:`, error);
      
      // Verificar si existen enlaces para esta mesa en los datos de prueba
      if (DATOS_PRUEBA.enlaces[mesaIdStr]) {
        console.log(`Usando ${DATOS_PRUEBA.enlaces[mesaIdStr].length} enlaces de prueba para mesa ${mesaIdStr}`);
        return DATOS_PRUEBA.enlaces[mesaIdStr];
      } else {
        console.log(`No hay enlaces de prueba para mesa ${mesaIdStr}`);
        return [];
      }
    } else {
      // Si el fallback está deshabilitado, propagamos el error
      console.error(`Error conectando con la API para mesa ${mesaIdStr} y el fallback está deshabilitado:`, error);
      throw error;
    }
  }
}

export async function fetchConfig(clave) {
  try {
    // Siempre intentamos conectar con la API real primero
    console.log(`Conectando con API para obtener configuración ${clave}...`);
    const res = await fetch(`${API_BASE_URL}?endpoint=configuracion&clave=${clave}`);
    if (!res.ok) throw new Error("Error al obtener configuración");
    const data = await res.json();
    console.log(`Configuración ${clave} obtenida con éxito`);
    return data;
  } catch (error) {
    // Solo usamos datos de prueba si falla la conexión Y el fallback está habilitado
    if (USAR_FALLBACK_SI_FALLA) {
      console.warn(`Error conectando con la API para config ${clave}, usando datos de prueba:`, error);
      return DATOS_PRUEBA.config[clave] || { valor: "" };
    } else {
      // Si el fallback está deshabilitado, propagamos el error
      console.error(`Error conectando con la API para config ${clave} y el fallback está deshabilitado:`, error);
      throw error;
    }
  }
}
