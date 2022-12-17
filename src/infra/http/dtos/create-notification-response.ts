import { ApiProperty } from '@nestjs/swagger';
import { Notification } from 'src/app/entities/notification';

export class CreateNotificationResponse {
  @ApiProperty()
  notification: Notification;
}
