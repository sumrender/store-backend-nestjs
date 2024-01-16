import { Controller, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';

import { IsAdmin } from 'src/shared/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/auth/guards/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, IsAdmin)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
