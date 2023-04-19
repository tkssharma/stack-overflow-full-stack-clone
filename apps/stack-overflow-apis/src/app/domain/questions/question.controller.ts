// Native.
/* eslint-disable no-useless-escape */

// Package.
import {
  Body,
  Controller,
  Delete,
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
import { QuestionService } from './question.service';
import { Type } from 'class-transformer';
import { query } from 'express';
import {
  QuestionBodyDto,
  SearchParamDto,
  UpdateQuestionBody,
} from './question.dto';
import { FirebaseAuthGuard, User, UserMetaData } from '@dev/auth';
import { QuestionByIdDto } from '../answers/answer.dto';

@ApiBearerAuth('authorization')
@Controller('questions')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
@ApiTags('questions')
export class QuestionController {
  constructor(private readonly service: QuestionService) {}

  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: 'api should return all questions',
  })
  @ApiOkResponse({
    description: 'returned questions successfully',
  })
  @Get('')
  public async getAllQuestions(@Query() query: SearchParamDto) {
    return await this.service.getAllQuestions(query);
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
  @Post('')
  public async createQuestions(
    @Body() body: QuestionBodyDto,
    @User() user: UserMetaData,
  ) {
    console.log(user);
    return await this.service.createQuestion(body, user);
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
  @Put('/:id')
  public async updateQuestions(
    @Body() body: UpdateQuestionBody,
    @User() user: UserMetaData,
    @Param() param: QuestionByIdDto,
  ) {
    console.log(user);
    return await this.service.updateQuestion(body, user, param);
  }

  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: 'api should return with responses questions',
  })
  @ApiCreatedResponse({
    description: 'returned created questions with responses successfully',
  })
  @Get('/:id')
  public async getQuestionById(@Param() param: QuestionByIdDto) {
    return await this.service.getQuestionById(param);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
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
  @Delete('/:id')
  public async deleteQuestions(
    @User() user: UserMetaData,
    @Param() param: QuestionByIdDto,
  ) {
    console.log(user);
    return await this.service.deleteQuestion(user, param);
  }
}
