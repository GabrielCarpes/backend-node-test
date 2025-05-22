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
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Verificar status da aplicação',
    description: `
      Retorna o status atual da aplicação. 
      Pode ser utilizado por serviços de monitoramento ou load balancers para verificar se a aplicação está saudável e operante.
    `,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A aplicação está saudável.',
    type: AppStatusResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'A aplicação encontrou um erro inesperado.',
    type: HttpException,
  })
  @Get('/status')
  async healthCheck(): Promise<AppStatusResponseDTO> {
    return this.appService.getStatus();
  }
}
