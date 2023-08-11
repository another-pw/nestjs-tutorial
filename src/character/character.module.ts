import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { RolesCheckerMiddleware } from 'src/middlewares/roles-checker.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [PrismaModule],
  providers: [
    CharacterService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [CharacterController],
})
export class CharacterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RolesCheckerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
