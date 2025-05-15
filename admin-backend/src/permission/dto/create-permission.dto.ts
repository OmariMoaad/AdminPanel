import { Role } from '@prisma/client'; 

export class CreatePermissionDto {
  userId: number;
  applicationId: number;
  role: Role; 
  level: Role; 
}
