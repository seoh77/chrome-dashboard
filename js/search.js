const search = document.querySelector(".search");
const searchValue = document.querySelector(".search__input");
const engine = document.querySelector(".search-engine");

function postSearchValue(event) {
  event.preventDefault();
  let url;

  if (engine.value === "google") {
    url = "https://www.google.com/search?q=" + searchValue.value;
  } else if (engine.value === "naver") {
    url = "https://search.naver.com/search.naver?query=" + searchValue.value;
  }
  window.open(url);
  searchValue.value = null;
}

search.addEventListener("submit", postSearchValue);
