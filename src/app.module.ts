import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { PasteModule } from './paste/paste.module';
import { PrismaModule } from './prisma/prisma.module';
import { authenticate } from './common/middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PasteModule,
    PrismaModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authenticate)
      .forRoutes(
        { path: 'paste', method: RequestMethod.POST },
        { path: 'paste', method: RequestMethod.GET },
        { path: 'paste/:id', method: RequestMethod.DELETE },
        { path: 'paste/:id', method: RequestMethod.PUT },
      );
  }
}
