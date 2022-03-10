import { ApiProperty } from '@nestjs/swagger';

export class MetaDto {
  @ApiProperty({
    example: [],
  })
  public: any;

  @ApiProperty({
    example: [],
  })
  private: any;
}
