import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { CreateNotificationResponse } from '../dtos/create-notification-response';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

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

    return { notification };
  }
}
