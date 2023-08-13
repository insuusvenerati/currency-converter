export function getElements() {
  return {
    form: document.querySelector("#currency-conversion-form"),
    result: document.querySelector("#converted-amount"),
    error: document.querySelector("#error"),
  };
}

export function renderError(error) {
  const { error: errorElement, result } = getElements();
  errorElement.textContent = error;
  result.textContent = "";
}

export function renderConversionResult(base, conversionRates, to, amount) {
  const { result } = getElements();
  const convertedAmount = conversionRates[to] * amount;
  result.textContent = `${amount} ${base} = ${convertedAmount} ${to}`;
}
