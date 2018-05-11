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
import User from "./User";

@Entity()
class Confirmation extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => User)
  user: User;

  @Column({ type: "boolean", default: false })
  sent: boolean;

  @Column({ type: "text" })
  key: string;

  @Column({
    type: "text",
    enum: ["email", "phone", "password"],
    default: "email"
  })
  type: string;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  @BeforeInsert()
  createKey(): void {
    this.key = Math.random()
      .toString(36)
      .substr(2);
  }
}
export default Confirmation;
