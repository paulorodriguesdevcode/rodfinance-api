import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class UtilsService {
  static generateHash(vlString: string | undefined): string {
    if (!vlString)
      throw new HttpException(
        'Não é possivel encriptar um valor vazio! ',
        HttpStatus.BAD_REQUEST,
      );

    return bcrypt.hashSync(vlString, 10);
  }

  static validateHash(vlString: string, vlHash: string): Promise<boolean> {
    return bcrypt.compare(vlString, vlHash || '');
  }
}
