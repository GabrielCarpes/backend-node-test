import { ApiProperty } from '@nestjs/swagger';

export class AppStatusResponseDTO {
  @ApiProperty({
    description: 'Status of service.',
    type: String,
    example: 'SERVER_IS_READY',
  })
  status!: string;

  @ApiProperty({
    description: 'Name of service.',
    type: String,
    example: 'bca-node-test',
  })
  name!: string;

  @ApiProperty({
    description: 'Version of service.',
    type: String,
    example: '0.0.1',
  })
  version!: string;
}
