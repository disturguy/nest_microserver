import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/ormconfig';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forRoot(config)],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
