const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

export const getCookies = () => {
  const allCookies = document.cookie;
  const parsedCookies = allCookies && parseCookie(allCookies);

  if (parsedCookies) {
    return {
      csrftoken: parsedCookies.csrftoken,
      "X-CSRFToken": parsedCookies.csrftoken,
    };
  } else {
    console.error("Sin cookie bobo a casa pt");
  }
};
