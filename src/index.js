import "@picocss/pico/css/pico.min.css";
import "@picocss/pico/css/themes/default.min.css";
import "./css/styles.css";

function handleCurrencyConversionError(result) {
  const error = result["error-type"];
  const errorMessage = errorTypes[error];
  if (errorMessage) {
    return errorMessage;
  }
  return "An unknown error occured";
}

async function fetchCurrencyConversion(base) {
  try {
    const response = await fetch(`${process.env.API_URL}/${process.env.API_KEY}/latest/${base}`);
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const result = await response.json();
    if (result.result === "error") {
      throw Error(handleCurrencyConversionError(result));
    }

    return { data: result, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message };
    }
    return { data: null, error: "An unknown error occured" };
  }
}

window.addEventListener("load", function () {
  const form = document.querySelector("#currency-conversion-form");
  const result = document.querySelector("#converted-amount");
  const error = document.querySelector("#error");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const base = event.target.elements.from.value;
    const { data, error: errorMessage } = await fetchCurrencyConversion(base);
    if (errorMessage) {
      error.textContent = errorMessage;
      result.textContent = "";
      return;
    }

    const conversionRates = data.conversion_rates;
    const to = event.target.elements.to.value;
    const amount = event.target.elements.amount.value;
    const convertedAmount = conversionRates[to] * amount;
    result.textContent = `${amount} ${base} = ${convertedAmount} ${to}`;

    error.textContent = "";
  });
});

const errorTypes = {
  "unsupported-code": "The code you've entered is not supported. Please try again.",
  "malformed-request": "The request you've made is invalid. Please try again.",
  "invalid-key": "The API key you've entered is invalid. Please try again.",
  "inactive-account": "The API key you've entered is inactive. Please try again.",
  "quota-reached": "You've reached your API key's monthly usage limit. Please upgrade your plan.",
};
