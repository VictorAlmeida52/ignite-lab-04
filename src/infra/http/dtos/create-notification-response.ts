import { ApiProperty } from '@nestjs/swagger';
import { NotificationViewModel } from '../view-models/notification-view-model';

export class CreateNotificationResponse {
  @ApiProperty()
  notification: NotificationViewModel;
}
