import { Decimal } from '@prisma/client/runtime/client';

export class DecimalPatch extends Decimal {
  constructor(value?: never) {
    super(value || 0);
  }
}
