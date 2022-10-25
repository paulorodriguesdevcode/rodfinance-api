export interface UserDTO {
  id: string
  createdAt?: Date | string
  updatedAt?: Date | string
  email: string
  name?: string | null
  password?: string
}

export interface CreateOrUpdateUserDTO {
  id: string
  createdAt?: Date | string
  updatedAt?: Date | string
  email: string
  name?: string | null
  password?: string
}