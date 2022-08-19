export interface UserCreateDto {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phoneNumber: string;
  status?: boolean;
  updatedAt?: string;
}
