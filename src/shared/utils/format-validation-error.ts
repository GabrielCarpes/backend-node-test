import { InvalidFieldsExceptionDTO } from "@infra/http/dtos/invalid-fields-exception.dto";
import { ValidationError } from "class-validator";

interface FormattedValidationError {
  property: string;
  message: string;
}

export const formatValidationError = (errors) => {
  const extractErrorMessages = extractErrorMessage(errors);

  return new InvalidFieldsExceptionDTO(
    extractErrorMessages.map((error) => error.message)
  );
};

const extractErrorMessage = (
  validationErrors: ValidationError[],
  property: string = ""
): FormattedValidationError[] => {
  const result: FormattedValidationError[] = [];

  for (const error of validationErrors) {
    if (error.constraints) {
      result.push({
        property: error.property,
        message: `${property}${error.constraints[Object.keys(error.constraints)[0]]}`,
      });
    }

    if (error.children && error.children.length > 0) {
      result.push(...extractErrorMessage(error.children, `${error.property}.`));
    }
  }

  return result;
};
