import { Injectable } from '@nestjs/common';
import { name, version } from './../../../../package.json';

export interface AppServiceResponse {
  status: string;
  name: string;
  version: string;
}

@Injectable()
export class AppService {
  getStatus(): AppServiceResponse {
    return {
      status: 'SERVER_IS_READY',
      name,
      version,
    };
  }
}
