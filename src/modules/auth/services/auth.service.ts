import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../user/services';
import { JwtService } from '@nestjs/jwt';
import { UtilsService } from 'src/common/utils.service';

interface TokenDecodeDto {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: { email: string; password: string }) {
    const usuarioEncontrado = await this.usersService.findOneByEmail(dto.email);

    if (!usuarioEncontrado || !usuarioEncontrado.password) {
      throw new UnauthorizedException('Credenciais indefinidas');
    }

    const isPasswordValid = await UtilsService.validateHash(
      dto.password,
      usuarioEncontrado.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais indefinidas');
    }

    const access_token = this.jwtService.sign({
      id: usuarioEncontrado.id,
      name: usuarioEncontrado.name,
      email: usuarioEncontrado.email,
    });

    return { access_token };
  }

  decode(token: string): TokenDecodeDto {
    token = token.replace('Bearer ', '');
    return this.jwtService.decode(token) as TokenDecodeDto;
  }
}
