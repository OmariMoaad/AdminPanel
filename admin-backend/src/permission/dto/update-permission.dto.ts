export class UpdatePermissionDto {
  userId?: number;
  applicationId?: number;
  role?: 'viewer' | 'admin';
}
