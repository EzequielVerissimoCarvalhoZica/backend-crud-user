import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { LoggerMiddleware } from '../common/middleware/fieldsValidations.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user/login');
  }
}
