import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository, Connection, QueryRunner } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { debug } from 'debug';
import { QuestionBodyDto } from '../questions/question.dto';
import { QuestionEntity } from '../questions/question.entity';
import { AnswerEntity } from '../answers/answers.entity';
import { CommentEntity } from './comment.entity';
import { AnswerByIdDto, CommentBodyDto } from './comment.dto';
import { UserMetaData } from '@dev/auth';

const verbose = debug('api:verbose:handler');
const error = debug('api:error:handler');

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
    @InjectRepository(AnswerEntity)
    private answerRepo: Repository<AnswerEntity>,
  ) {}

  async createCommentOfAnswer(
    user: UserMetaData,
    body: CommentBodyDto,
    param: AnswerByIdDto,
  ) {
    try {
      const { id } = param;
      const answer = await this.answerRepo.findOne({
        where: {
          id,
        },
      });
      if (!answer) {
        throw new NotFoundException();
      }

      return await this.commentRepo.save({
        ...body,
        user_id: user.uid,
        answer,
      });
    } catch (err) {
      throw err;
    }
  }
  async fetchAllCommentOfAnswer(param: AnswerByIdDto) {
    try {
      const { id } = param;
      return await this.answerRepo.findOne({
        where: {
          id,
        },
        relations: ['comments'],
      });
    } catch (err) {
      throw err;
    }
  }
}
