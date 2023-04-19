import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';

export enum ActionType {
  'upvote' = 'upvote',
  'downvote' = 'downvote',
}

export class ActionOnAnswerDto {
  @ApiProperty({
    description: 'action_type',
    enum: ActionType,
    example: ActionType.upvote,
  })
  @IsEnum(ActionType)
  @IsDefined()
  public action_type!: string;
}
export class QuestionByIdDto {
  @ApiProperty({
    description: 'question id',
    required: false,
    example: '5aed29ed-4e8f-4aa0-ae0f-690038a94926',
  })
  @IsUUID()
  public id!: string;
}

export class QuestionAnswerByIdDto extends QuestionByIdDto {
  @ApiProperty({
    description: 'answer_id',
    required: false,
    example: '5aed29ed-4e8f-4aa0-ae0f-690038a94921',
  })
  @IsUUID()
  public answer_id!: string;
}

export class AnswerBodyDto {
  @ApiProperty({
    description: 'answer_text [name, description for search',
    required: false,
  })
  @IsString()
  @MinLength(2)
  public answer_text!: string;

  @ApiProperty({
    description: 'technology name like java',
    required: false,
    example: 'java',
  })
  @IsOptional()
  @MinLength(2)
  public comment!: string;
}
