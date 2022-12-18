import { Notification } from '@app/entities/notification';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationViewModel {
  @ApiProperty()
  id: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  recipient: string;

  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
