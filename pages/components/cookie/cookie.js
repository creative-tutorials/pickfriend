export function delCookie() {
  function deleteCookie(name = "test") {
    document.cookie = name + `=; expires=${new Date()}; path=/;`;
  }

  deleteCookie();
}
