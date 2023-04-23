import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository, Connection, QueryRunner } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { debug } from 'debug';
import { QuestionBodyDto } from '../questions/question.dto';
import { QuestionEntity } from '../questions/question.entity';
import { AnswerEntity } from './answers.entity';
import {
  ActionOnAnswerDto,
  ActionType,
  AnswerBodyDto,
  QuestionAnswerByIdDto,
  QuestionByIdDto,
} from './answer.dto';
import { UserMetaData } from '@dev/auth';

const verbose = debug('api:verbose:handler');
const error = debug('api:error:handler');

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepo: Repository<QuestionEntity>,
    @InjectRepository(AnswerEntity)
    private answerRepo: Repository<AnswerEntity>,
  ) { }

  async updateQuestionById(
    param: QuestionAnswerByIdDto,
    query: ActionOnAnswerDto,
  ) {
    try {
      const { id, answer_id } = param;
      const { action_type } = query;
      const question = await this.questionRepo.findOne({
        where: {
          id,
        },
      });
      if (!question) {
        throw new NotFoundException();
      }
      const answer = await this.answerRepo.findOne({
        where: {
          id: answer_id,
        },
      });
      if (!answer) {
        throw new NotFoundException();
      }
      if (action_type === ActionType.upvote) {
        const latestUpVote = answer.upvote + 1;
        await this.answerRepo.save({
          id: answer_id,
          upvote: latestUpVote
        });
        return await this.answerRepo.findOne({ where: { id: answer_id } })
      }
      const latestDownVote = answer.downvote + 1;
      await this.answerRepo.save({
        id: answer_id,
        downvote: latestDownVote,
      });
      return await this.answerRepo.findOne({ where: { id: answer_id } })
    } catch (err) {
      throw err;
    }
  }

  async createAnswerOfQuestion(
    user: UserMetaData,
    body: AnswerBodyDto,
    param: QuestionByIdDto,
  ) {
    try {
      const { id } = param;
      const question = await this.questionRepo.findOne({
        where: {
          id,
        },
      });
      if (!question) {
        throw new NotFoundException();
      }

      return await this.answerRepo.save({
        user_id: user.uid,
        user_metadata: {
          email: user.email,
          picture: user.picture,
          name: user.name
        },
        question,
      });
    } catch (err) {
      throw err;
    }
  }

  async fetchAnswers(param: QuestionByIdDto) {
    try {
      const { id } = param;
      return await this.questionRepo.findOne({
        where: {
          id,
        },
        relations: ['answers'],
      });
    } catch (err) {
      throw err;
    }
  }
}
