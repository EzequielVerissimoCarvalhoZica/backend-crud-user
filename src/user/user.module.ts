import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import {
  CreateMiddleware,
  LoggerMiddleware,
  UpdateMiddleware,
} from '../common/middleware/fieldsValidations.middleware';
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
    consumer
      .apply(CreateMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST });
    consumer
      .apply(UpdateMiddleware)
      .forRoutes({ path: 'user/:id', method: RequestMethod.PUT });
  }
}
