import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { QuestionEntity } from '../questions/question.entity';
import { CommentEntity } from '../comments/comment.entity';

@Entity('answers')
export class AnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar' })
  public answer_text!: string;

  @Column({ type: 'int', default: 0 })
  public upvote!: number;

  @Column({ type: 'int', default: 0 })
  public downvote!: number;

  @Column({ type: 'varchar', default: null })
  public comment!: string;

  @Column({ type: 'varchar', default: null })
  public user_id!: string;

  @ManyToOne(() => QuestionEntity, (event) => event.answers)
  @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
  public question!: QuestionEntity;

  @OneToMany(() => CommentEntity, (event) => event.answer)
  public comments!: CommentEntity[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public updated_at!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public deleted_at!: Date;
}
