import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { QuestionEntity } from './question.entity';
import { Like, Repository, Connection, QueryRunner } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QuestionBodyDto,
  SearchParamDto,
  UpdateQuestionBody,
} from './question.dto';
import { debug } from 'debug';
import { UserMetaData } from '@dev/auth';
import { QuestionByIdDto } from '../answers/answer.dto';

const verbose = debug('api:verbose:handler');
const error = debug('api:error:handler');

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepo: Repository<QuestionEntity>,
  ) { }

  async createQuestion(body: QuestionBodyDto, user: UserMetaData) {
    try {
      return await this.questionRepo.save({
        ...body,
        user_id: user.uid,
        user_metadata: {
          email: user.email,
          picture: user.picture,
          name: user.name
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async validateAuthorization(user: UserMetaData, param: QuestionByIdDto) {
    const { id } = param;
    const question = await this.questionRepo.findOne({
      where: {
        id,
      },
    });
    if (!question) {
      throw new NotFoundException();
    }
    if (question.user_id === user.uid) {
      return question;
    }
    throw new UnauthorizedException();
  }

  async updateQuestion(
    body: UpdateQuestionBody,
    user: UserMetaData,
    param: QuestionByIdDto,
  ) {
    try {
      const question = await this.validateAuthorization(user, param);
      return await this.questionRepo.save({
        ...question,
        ...body,
      });
    } catch (err) {
      throw err;
    }
  }
  async deleteQuestion(user: UserMetaData, param: QuestionByIdDto) {
    try {
      await this.questionRepo.delete({ id: param.id });
    } catch (err) {
      throw err;
    }
  }

  async getQuestionById(param: QuestionByIdDto) {
    try {
      return await this.questionRepo.findOne({
        where: { id: param.id },
        relations: ['answers'],
      });
    } catch (err) {
      throw err;
    }
  }

  async getAllQuestions(queryInput: SearchParamDto) {
    try {
      const column = [
        'count(*) OVER() AS count',
        'questions_text',
        'tags',
        'technology',
        'url',
        'image',
        'user_metadata',
        'user_id',
        'comment',
        'created_at',
        'updated_at',
        'id',
      ];
      const { tags, search_term, page, limit } = queryInput;
      const skippedItems = (page - 1) * limit;
      verbose(queryInput);
      let query = `SELECT ${column.join(
        ',',
      )} FROM questions where questions_text is not null`;

      if (search_term) {
        const queryString = `(
           questions_text ILIKE '%${search_term}%'
           OR 
           technology ILIKE '%${search_term}%'
        )`;
        query = `${query} AND ${queryString}`;
      }
      if (tags && tags.length > 0) {
        let queryString = ``;
        for (const tag of tags.split(',')) {
          if (!queryString) {
            queryString = `${queryString} tags ILIKE '%${tag}%'`;
          } else {
            queryString = `${queryString} OR tags ILIKE '%${tag}%'`;
          }
        }
        query = `${query} AND (${queryString})`;
      }
      query = `${query} ORDER BY questions_text  ASC LIMIT ${limit} offset ${skippedItems}`;

      const questions = await this.questionRepo.query(query);
      const count = parseInt((questions[0] && questions[0].count) || 0);

      return {
        questions,
        totalCount: count,
      };
    } catch (err) {
      throw err;
    }
  }
}
