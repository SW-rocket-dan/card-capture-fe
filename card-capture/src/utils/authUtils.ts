const getIsLoggedIn = () => {
  const token = localStorage.getItem('accessToken');

  return !!token;
};

export default { getIsLoggedIn };
