import { Movement, TypeMoviment } from "@prisma/client";

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
  type: TypeMoviment
  category: string;
  description: string;

  constructor(movement: MovementDTO) {
    this.createdAt = movement.createdAt;
    this.updatedAt = movement.updatedAt;
    this.updatedAt = movement.updatedAt;
    this.userId = movement.userId;
    this.type = movement.type;
    this.value = movement.value;
    this.category = movement.category;
    this.description = movement.description;
  }
}
