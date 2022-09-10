import { Movement } from "@prisma/client";

enum BalanceTypeEnum {
  INPUT,
  OUTPUT,
}

export interface IMovementsBalance {
  totalDeposits:number, 
  totalWithdrawals:number
}

export interface IReturnBalance {
  totalDeposits: number;
  totalWithdrawals: number;
  balance: number;
  movements: Movement[];
}

export class MovementDTO {
  id: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  userId: string;
  value: number;
  type: BalanceTypeEnum
  category: string;

  constructor(movement: MovementDTO) {
    this.createdAt = movement.createdAt;
    this.updatedAt = movement.updatedAt;
    this.updatedAt = movement.updatedAt;
    this.userId = movement.userId;
    this.type = movement.type;
    this.value = movement.value;
    this.category = movement.category;
  }
}
