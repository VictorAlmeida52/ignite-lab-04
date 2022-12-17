import { IsUUID, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 240)
  @ApiProperty()
  content: string;

  @IsNotEmpty()
  @ApiProperty()
  category: string;
}
