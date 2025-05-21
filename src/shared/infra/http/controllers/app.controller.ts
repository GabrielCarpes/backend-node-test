import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppStatusResponseDTO } from '../dtos/app-status-response.dto';
import { AppService } from '@shared/application/services/app.service';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({
    summary: 'Service status',
    description: 'Endpoint to get service status',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: AppStatusResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: HttpException,
  })
  @Get('/status')
  async healthCheck(): Promise<AppStatusResponseDTO> {
    return this.appService.getStatus();
  }
}
