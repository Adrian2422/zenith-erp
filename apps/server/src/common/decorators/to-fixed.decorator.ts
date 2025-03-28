import { Transform } from 'class-transformer';

/**
 * Decorator that formats a number to two decimal places
 */
export function ToFixed(): PropertyDecorator {
  return Transform(
    ({ value }) => {
      if (value === null || value === undefined) {
        return value;
      }

      return Number(value).toFixed(2);
    },
    { toClassOnly: true }
  );
}
