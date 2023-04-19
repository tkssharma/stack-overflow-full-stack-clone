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

export class AnswerByIdDto {
  @ApiProperty({
    description: 'question id',
    required: false,
    example: '5aed29ed-4e8f-4aa0-ae0f-690038a94926',
  })
  @IsUUID()
  public id!: string;
}

export class CommentBodyDto {
  @ApiProperty({
    description: 'comment_text [name, description for search',
    required: false,
  })
  @IsString()
  @MinLength(2)
  public comment_text!: string;
}
