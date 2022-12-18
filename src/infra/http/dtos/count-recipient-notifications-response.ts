import { ApiProperty } from '@nestjs/swagger';

export class CountRecipientNotificationsResponse {
  @ApiProperty()
  count: number;
}
