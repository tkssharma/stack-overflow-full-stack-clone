import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@dev/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DBModule } from '@dev/database';
import { QuestionEntity } from './questions/question.entity';
import { CommentEntity } from './comments/comment.entity';
import { AnswerEntity } from './answers/answers.entity';
import { QuestionModule } from './questions/question.module';
import { AuthModule } from '@dev/auth';
import { AnswerModule } from './answers/answer.module';
import { CommentModule } from './comments/comment.module';

@Module({
  imports: [
    AuthModule,
    AnswerModule,
    CommentModule,
    QuestionModule,
    EventEmitterModule.forRoot(),
    ConfigModule,
    DBModule.forRoot({
      entities: [QuestionEntity, CommentEntity, AnswerEntity],
    }),
  ],
  providers: [],
  controllers: [],
})
export class DomainModule {}
