let token = null;

const STORAGE_KEY = 'loggedBlogappUser';

const setUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  token = user.token;
};

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY);
  if (loggedUserJSON) {
    const loggedUser = JSON.parse(loggedUserJSON);
    token = loggedUser.token;
    return loggedUser;
  }
  return null;
};

const clearUser = () => {
  window.localStorage.removeItem(STORAGE_KEY);
  token = null;
};

const getToken = () => token;

export default {
  setUser,
  getUser,
  clearUser,
  getToken,
};
