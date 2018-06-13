import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne
} from "typeorm";
import User from "./User";

const EMAIL = "EMAIL";
const PHONE = "PHONE";
const PASSWORD = "PASSWORD";

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
    enum: [EMAIL, PHONE, PASSWORD],
    default: EMAIL
  })
  type: string;

  @Column({
    type: "text",
    default: ""
  })
  payload: string;

  @Column({
    type: "boolean",
    default: false
  })
  verified: boolean;

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
