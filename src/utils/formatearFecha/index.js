const formatDate = (value) => {
  if (!value) return "";

  const numbers = value.replace(/[^\d]/g, "");

  const slicedNumbers = numbers.slice(0, 8);

  const day = slicedNumbers.slice(0, 2);
  const month = slicedNumbers.slice(2, 4);
  const year = slicedNumbers.slice(4);

  return `${day}${month.length ? "/" : ""}${month}${
    year.length ? "/" : ""
  }${year}`;
};

export default formatDate;
