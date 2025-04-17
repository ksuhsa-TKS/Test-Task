const table = () => {
  const arr = [];

  const date = new Date(2025, 4, 0);

  //   Цикл нужен, что бы не писать в ручную все 12 строк массива
  for (let index = 0; index <= 12; index++) {
    arr.push({ month: date.getMonth(), days: date.getDate() });
  }

  //   Используем встроенный функционал для отображения данных в виде таблицы в консоли.
  console.table(arr);
};

table();
