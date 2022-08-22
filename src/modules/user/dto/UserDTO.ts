export class UserDTO  {
    id:string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    name?: string | null
    password?: string

    constructor(user: UserDTO){
      this.createdAt = user.createdAt
      this.updatedAt = user.updatedAt
      this.updatedAt = user.updatedAt
      this.email = user.email
      this.name = user.name
      this.password = user.password
    }
  }