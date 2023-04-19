import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class QuestionBodyDto {
  @ApiProperty({
    description: 'question_text [name, description for search',
    required: false,
  })
  @IsString()
  @MinLength(2)
  public questions_text!: string;

  @ApiProperty({
    description: 'tags for creating question',
    required: false,
    example: 'java, node js, react',
  })
  @IsString()
  @MinLength(2)
  public tags!: string;

  @ApiProperty({
    description: 'technology name like java',
    required: false,
    example: 'java',
  })
  @IsString()
  @MinLength(2)
  public technology!: string;
}

export class UpdateQuestionBody extends PartialType(QuestionBodyDto) {}

export class SearchParamDto {
  @ApiProperty({
    description: 'search_term [name, description for search',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  public search_term!: string;

  @ApiProperty({
    description: 'tags for search',
    type: String,
    example: 'tag',
    required: false,
  })
  @IsOptional()
  @IsString()
  public tags?: string;

  @ApiProperty({
    description: 'page number for request',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  public page?: number;

  @ApiProperty({
    description: 'number of records in a request',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  public limit?: number;
}
