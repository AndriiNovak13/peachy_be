import { ErrorFieldMessage } from "./error.types";

export const errorFieldMessage = (
  field: string,
  message: string
): Array<ErrorFieldMessage> => {
  return [{ field, message }];
};
