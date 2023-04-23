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
    example: "Why useState hooks are npt working with latest react route change"
  })
  @IsString()
  @MinLength(2)
  public questions_text!: string;

  @ApiProperty({
    description: 'tags for creating question',
    required: false,
    example: 'java, node_js, react',
  })
  @IsString()
  @MinLength(2)
  public tags!: string;

  @ApiProperty({
    description: 'url for info',
    required: false,
    example: 'https://stackoverflow.com/questions/50493011/react-ui-router-test-state-change',
  })
  @IsString()
  @MinLength(2)
  public url!: string;

  @ApiProperty({
    description: 'image upload url',
    required: false,
    example: 'https://cdn-media-1.freecodecamp.org/images/1*TKvlTeNqtkp1s-eVB5Hrvg@2x.png',
  })
  @IsString()
  @MinLength(2)
  public image!: string;

  @ApiProperty({
    description: 'technology name like java',
    required: false,
    example: 'java',
  })
  @IsString()
  @MinLength(2)
  public technology!: string;
}

export class UpdateQuestionBody extends PartialType(QuestionBodyDto) { }

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
