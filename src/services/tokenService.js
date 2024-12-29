const TOKEN_KEY = "token";


// Save Token
export const saveToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

//Read Token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

//Delete Token
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
