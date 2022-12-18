import { CancelNotification } from '@app/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/use-cases/get-recipient-notifications';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { CountRecipientNotificationsResponse } from '../dtos/count-recipient-notifications-response';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { CreateNotificationResponse } from '../dtos/create-notification-response';
import { GetRecipientNotificationsResponse } from '../dtos/get-recipient-notifications-response';
import { NotificationViewModel } from '../view-models/notification-view-model';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The notification has been successfully created.',
    type: CreateNotificationResponse,
  })
  @ApiBadRequestResponse({ description: 'Request body is not valid' })
  @ApiBody({
    description: 'Information on the notification to be created',
    type: CreateNotificationBody,
  })
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }

  @Patch(':id/cancel')
  @ApiOkResponse({ description: 'Notification successfully canceled' })
  @ApiInternalServerErrorResponse({ description: 'Notification not found' })
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Patch(':id/read')
  @ApiOkResponse({ description: 'Notification marked as read' })
  @ApiInternalServerErrorResponse({ description: 'Notification not found' })
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  @ApiOkResponse({ description: 'Notification marked as not read' })
  @ApiInternalServerErrorResponse({ description: 'Notification not found' })
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Get('count/recipient/:recipientId')
  @ApiOkResponse({
    description: 'Number of notifications of the informed recipient',
    type: CountRecipientNotificationsResponse,
  })
  async countByRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('recipient/:recipientId')
  @ApiOkResponse({
    description: 'Notifications of the informed recipient',
    type: GetRecipientNotificationsResponse,
  })
  async getByRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }
}
