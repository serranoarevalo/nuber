import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne
} from "typeorm";
import { IsEmail } from "class-validator";
import bcrypt, { hash } from "bcrypt";
import User from "./User";

const BCRYPT_ROUNDS = 10;

@Entity()
class EmailConfirmation extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => User)
  @IsEmail()
  user: User;

  @Column({ type: "boolean", default: false })
  sent: boolean;

  @Column({ type: "text" })
  key: string;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  @BeforeInsert()
  createKey(): void {
    this.key = Math.random()
      .toString(36)
      .substr(2);
  }
}
export default EmailConfirmation;
