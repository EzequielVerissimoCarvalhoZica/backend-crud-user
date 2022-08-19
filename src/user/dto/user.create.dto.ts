export interface UserCreateDto {
  name: string;
  email: string;
  password: string;
  role: string;
  dateOfBirth: string;
  phoneNumber: string;
  status?: boolean;
  updatedAt?: string;
}
