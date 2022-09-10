import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MovementService } from '../services/movement.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { IReturnBalance, MovementDTO } from '../dto';
import { AuthService } from '../../auth/services';

@Controller('movements')
@UseGuards(JwtAuthGuard)
export class MovementController {
  constructor(
    private readonly movementService: MovementService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  findAll(@Headers('Authorization') token: string): Promise<IReturnBalance> {
    const { id } = this.authService.decode(token);
    return this.movementService.findAll(id);
  }

  @Post()
  create(
    @Body() createMovement: MovementDTO,
    @Headers('Authorization') token: string,
  ) {
    const { id } = this.authService.decode(token);
    return this.movementService.create(id, createMovement);
  }
}
