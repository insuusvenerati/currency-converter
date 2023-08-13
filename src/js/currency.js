function handleCurrencyConversionError(result) {
  const error = result["error-type"];
  const errorMessage = errorTypes[error];
  if (errorMessage) {
    return errorMessage;
  }
  return "An unknown error occured";
}

export async function fetchCurrencyConversion(base) {
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

const errorTypes = {
  "unsupported-code": "The code you've entered is not supported. Please try again.",
  "malformed-request": "The request you've made is invalid. Please try again.",
  "invalid-key": "The API key you've entered is invalid. Please try again.",
  "inactive-account": "The API key you've entered is inactive. Please try again.",
  "quota-reached": "You've reached your API key's monthly usage limit. Please upgrade your plan.",
};
