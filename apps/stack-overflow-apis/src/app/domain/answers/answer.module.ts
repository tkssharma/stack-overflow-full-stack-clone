import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { AnswerEntity } from './answers.entity';
import { QuestionEntity } from '../questions/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity, QuestionEntity])],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
