import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from '../../database/prisma.service';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    }
  ],
  exports: [UserService]
})
export class UserModule {}
