// Native.
/* eslint-disable no-useless-escape */

// Package.
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_ENTITY_FOUND,
  UNAUTHORIZED_REQUEST,
} from '../app.constants';
import { CommentService } from './comment.service';
import { Type } from 'class-transformer';
import { query } from 'express';
import { FirebaseAuthGuard, User, UserMetaData } from '@dev/auth';
import { AnswerByIdDto, CommentBodyDto } from './comment.dto';

@ApiBearerAuth('authorization')
@Controller('answers')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
@ApiTags('comments')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: 'api should return created questions',
  })
  @ApiCreatedResponse({
    description: 'returned created questions successfully',
  })
  @UseGuards(FirebaseAuthGuard)
  @Post('/:id/comment')
  public async createQuestions(
    @User() user: UserMetaData,
    @Body() body: CommentBodyDto,
    @Param() param: AnswerByIdDto,
  ) {
    return await this.service.createCommentOfAnswer(user, body, param);
  }

  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: 'api should return created questions',
  })
  @ApiCreatedResponse({
    description: 'returned created questions successfully',
  })
  @Get('/:id/comments')
  public async fetchComments(@Param() param: AnswerByIdDto) {
    return await this.service.fetchAllCommentOfAnswer(param);
  }
}
