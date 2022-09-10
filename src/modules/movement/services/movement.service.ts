import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/PrismaService';
import { IReturnBalance, MovementDTO } from '../dto';

@Injectable()
export class MovementService {
  constructor(private prismaService: PrismaService) {}

  async findAll(userId: string): Promise<IReturnBalance> {
    const movements = await this.prismaService.movement.findMany({
      where: {
        userId,
      },
    });

    const balanceResume = movements.reduce(
      (previousValue, currentValue) => {
        currentValue.type === 'INPUT'
          ? (previousValue.totalDeposits += currentValue.value)
          : (previousValue.totalWithdrawals += currentValue.value);

        previousValue.balance =
          previousValue.totalDeposits - previousValue.totalWithdrawals;
        return previousValue;
      },
      { totalDeposits: 0, totalWithdrawals: 0, balance: 0 },
    );

    return { movements, ...balanceResume };
  }

  async create(userId: string, dto: MovementDTO) {
    dto.userId = userId;
    await this.prismaService.movement.create({
      data: dto,
    });
  }
}
