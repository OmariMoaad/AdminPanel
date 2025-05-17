export class CreatePermissionDto {
  userId: number;
  applicationId: number;
  role: 'viewer' | 'admin';
}
