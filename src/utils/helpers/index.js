export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}

export function formatCurrency(value) {
  let valueTemp = value;
  valueTemp = valueTemp.replace(/\D/g, "");
  valueTemp = valueTemp.replace(/(\d)(\d{2})$/, "$1,$2");
  valueTemp = valueTemp.replace(/(?=(\d{3})+(\D))\B/g, ".");

  return parseCurrency(valueTemp);
}

export function parseCurrency(value) {
  let valueTemp = value;

  value.split("").forEach((element) => {
    if (element === ".") {
      valueTemp = valueTemp.replace(".", "");
    }
    if (element === ",") {
      valueTemp = valueTemp.replace(",", ".");
    }
  });

  return valueTemp;
}

export function formatOnlyNumber(event) {
  let value = event.replace(/\D+/g, "");
  return value.toString();
}
