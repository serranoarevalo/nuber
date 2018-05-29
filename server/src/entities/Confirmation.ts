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

  @ManyToOne(type => User, user => user.confirmations, {
    nullable: true
  })
  user: User;

  @Column({ type: "boolean", default: false })
  sent: boolean;

  @Column({ type: "text" })
  key: string;

  @Column({
    type: "text",
    enum: ["EMAIL", "PHONE", "PASSWORD"],
    default: "email"
  })
  type: string;

  @Column({
    type: "text",
    default: ""
  })
  payload: string;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  @BeforeInsert()
  createKey(): void {
    if (this.type === "PHONE") {
      this.key = Math.floor(Math.random() * 100000).toString();
    } else {
      this.key = Math.random()
        .toString(36)
        .substr(2);
    }
  }
}
export default Confirmation;
