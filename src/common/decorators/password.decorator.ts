import { IsStrongPassword as ISP, ValidationArguments } from 'class-validator';

export function IsStrongPassword(): PropertyDecorator {
  return ISP(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message: (args: ValidationArguments) => {
        const s = args.value;
        const prop = args.property;

        const numUpper = (s?.match(/[A-Z]/g) || []).length;
        const numLower = (s?.match(/[a-z]/g) || []).length;
        const numNumber = (s?.match(/[0-9]/g) || []).length;
        if (!s) {
          return prop + ' is missing';
        } else if (s.length < 8) {
          return prop + ' must be longer than or equal to 8 characters';
        } else if (numUpper < 1) {
          return prop + ' must contain at least one uppercase letter';
        } else if (numLower < 1) {
          return prop + ' must contain at least one lowercase letter';
        } else if (numNumber < 1) {
          return prop + ' must contain at least one number';
        } else {
          return args.property + ' does not match the specifications';
        }
      },
    },
  );
}
