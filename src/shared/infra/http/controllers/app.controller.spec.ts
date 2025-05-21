import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '@shared/application/services/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('[GET] /status', () => {
    it('should return a health check status', async () => {
      const response = await appController.healthCheck();

      expect(response.status).toBe('SERVER_IS_READY');
    });
  });
});
