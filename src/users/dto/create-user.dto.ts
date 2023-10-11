export class CreateUserDto {
  email?: string;
  service_type: 'apple_login' | 'google_login';
  external_id: string;
}