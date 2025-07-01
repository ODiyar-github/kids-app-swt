import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KidsAppModule } from './kidsApp/kidsApp.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    KidsAppModule,
  ],
})
export class AppModule {}
