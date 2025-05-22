import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "@shared/application/services/app.service";
import { TransactionModule } from "@modules/transaction/transaction.module";
import { AppController } from "@infra/http/controllers/app.controller";
import { SecurityModule } from "@shared/security/security.module";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SecurityModule,
    TransactionModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
