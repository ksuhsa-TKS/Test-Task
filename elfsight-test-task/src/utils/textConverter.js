export const textConverter = (value) => {
  let first = value.trim()[0].toUpperCase();
  let next = value.trim().slice(1).toLowerCase();

  return first + next;
};
