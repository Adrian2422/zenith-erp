import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

function generateHmac(obj: unknown, sharedSecret: string): string {
  try {
    const data = JSON.stringify(obj);

    return CryptoJS.HmacSHA256(data, sharedSecret).toString(CryptoJS.enc.Hex);
  } catch (error) {
    console.warn('Unable to generate HMAC:', error.message);

    return '';
  }
}

@Injectable()
export class HmacGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const body = request.body;
    const signature = request.headers['x-keycloak-signature'];
    const secret = process.env.KEYCLOAK_EVENTS_SECRET;

    const calculatedSignature = generateHmac(body, secret);

    if (signature !== calculatedSignature) {
      throw new UnauthorizedException('Invalid HMAC signature');
    }

    return true;
  }
}
