function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const chunks = (a, size) =>
  Array.from(new Array(Math.ceil(a.length / size)), (_, i) =>
    a.slice(i * size, i * size + size)
  );
export const getDateValue = (val) => {
  const d = new Date(val);
  return d.toLocaleDateString();
};

export const getDateTimeValue = (val) => {
  const d = new Date(val);
  return d.toLocaleString();
};
