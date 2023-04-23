import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { AnswerEntity } from '../answers/answers.entity';

@Entity('questions')
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', select: true })
  public questions_text!: string;

  @Column({ type: 'varchar', default: null })
  public tags!: string;

  @Column({ type: 'varchar', default: null })
  public technology!: string;

  @Column({ type: 'varchar', default: null })
  public comment!: string;

  @Column({ type: 'varchar', default: null })
  public url!: string;

  @Column({ type: 'varchar', default: null })
  public image!: string;

  @Column({ type: 'varchar', default: null })
  public user_id!: string;

  @Column({ type: 'jsonb', default: null })
  public user_metadata!: any;

  @OneToMany(() => AnswerEntity, (event) => event.question)
  public answers!: AnswerEntity[];

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
