import { ApiProperty } from '@nestjs/swagger';
import { NotificationViewModel } from '../view-models/notification-view-model';

export class GetRecipientNotificationsResponse {
  @ApiProperty({ isArray: true })
  notifications: NotificationViewModel;
}
