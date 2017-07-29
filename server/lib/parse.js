const getString = (value) => {
  return value
    ? value.toString()
    : '';
}

const getDateIfValid = (value) => {
  var date = Date.parse(value);
  return isNaN(date)
    ? null
    : new Date(date);
}

const getArrayIfValid = (value) => {
  return Array.isArray(value)
    ? value
    : null;
}

const getNumberIfValid = (value) => {
  const n = parseFloat(value);
  return n
    ? n
    : null;
}

const getBooleanIfValid = (value, defaultValue = null) => {
  if(value === "true" || value === "false") {
    return value === "true";
  } else {
    return (typeof value === 'boolean') ? value : defaultValue;
  }
}

module.exports = {
  getString: getString,
  getDateIfValid: getDateIfValid,
  getArrayIfValid: getArrayIfValid,
  getNumberIfValid: getNumberIfValid,
  getBooleanIfValid: getBooleanIfValid
}
