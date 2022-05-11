const formatDate = (date) => new Date(date).toISOString();

const parseCookie = (cookie) => {
  if (!cookie) return {};
  return cookie
    .split(";")
    .filter(Boolean)
    .reduce((acc, entry) => {
      const [key, value] = entry
        .trim()
        .split("=")
        .filter(Boolean)
        .map((p) => p.trim());
      return {
        ...acc,
        [key]: value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent),
      };
    }, {});
};

const isJson = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  formatDate,
  parseCookie,
  isJson,
};
