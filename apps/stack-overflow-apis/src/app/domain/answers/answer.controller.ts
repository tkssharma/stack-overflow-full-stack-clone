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
import { AnswerService } from './answer.service';
import { Type } from 'class-transformer';
import { query } from 'express';
import { FirebaseAuthGuard, User, UserMetaData } from '@dev/auth';
import {
  ActionOnAnswerDto,
  AnswerBodyDto,
  QuestionAnswerByIdDto,
  QuestionByIdDto,
} from './answer.dto';

@ApiBearerAuth('authorization')
@Controller('questions')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
@ApiTags('answers')
export class AnswerController {
  constructor(private readonly service: AnswerService) {}

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
  @Post('/:id/answers')
  public async createQuestions(
    @User() user: UserMetaData,
    @Body() body: AnswerBodyDto,
    @Param() param: QuestionByIdDto,
  ) {
    return await this.service.createAnswerOfQuestion(user, body, param);
  }

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
  @Put('/:id/answers/:answer_id')
  public async updateQuestionById(
    @Query() query: ActionOnAnswerDto,
    @Body() body: AnswerBodyDto,
    @Param() param: QuestionAnswerByIdDto,
  ) {
    return await this.service.updateQuestionById(body, param, query);
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
  @Get('/:id/answers')
  public async fetchAnswers(@Param() param: QuestionByIdDto) {
    return await this.service.fetchAnswers(param);
  }
}
