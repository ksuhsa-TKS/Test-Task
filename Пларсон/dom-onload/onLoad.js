const consoleMassega = (value) => console.log(value);

function loading() {
  // Проверка на загрузку строницы, если грузиться до делаем это
  if (document.readyState === "loading") {
    consoleMassega("Событие до DOMContentLoaded");
  }

  // А тут уже ждем загрузки всей строницы и после делаем что-то
  window.onload = () => consoleMassega("Событие после DOMContentLoaded");
}

loading();
