// Servicio para manejar el token en localStorage

const TOKEN_KEY ="token";

// Guardar el token en localStorage
export const saveToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

// Leer el token desde localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Eliminar el token de localStorage (Cerrar sesión)
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
