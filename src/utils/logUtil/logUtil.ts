import * as constants from "../constants";

export const logError = (
  message: string = "no error message.",
  error?: Error
) => {
  console.error(
    `${constants.LOG_PREFIX} ${message}`,
    error ? JSON.stringify(error) : null
  );
};
