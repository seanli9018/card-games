import * as constants from "../constants";

export const logError = (
  message: string = "no error message.",
  error?: Error
) => {
  const errorObj = error ? JSON.stringify(error) : "";
  console.error(`${constants.LOG_PREFIX} ${message}`, errorObj);
};
