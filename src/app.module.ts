import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "@shared/application/services/app.service";
import { TransactionModule } from "@modules/transaction/transaction.module";
import { AppController } from "@infra/http/controllers/app.controller";


@Module({
  imports: [
    ConfigModule.forRoot(),
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
