import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentEntity } from './comment.entity';
import { QuestionEntity } from '../questions/question.entity';
import { AnswerEntity } from '../answers/answers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity, CommentEntity])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
