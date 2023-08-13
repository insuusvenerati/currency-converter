import { fetchCurrencyConversion } from "./js/currency";
import { getElements, renderConversionResult, renderError } from "./js/ui";
import "./js/styles";

window.addEventListener("load", function () {
  const { form, error } = getElements();

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const base = event.target.elements.from.value;
    const { data, error: errorMessage } = await fetchCurrencyConversion(base);
    if (errorMessage) {
      renderError(errorMessage);
      return;
    }

    const conversionRates = data.conversion_rates;
    const to = event.target.elements.to.value;
    const amount = event.target.elements.amount.value;
    renderConversionResult(base, conversionRates, to, amount);

    error.textContent = "";
  });
});
