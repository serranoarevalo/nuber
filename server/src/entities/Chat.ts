import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Message from "./Message";
import Ride from "./Ride";
import User from "./User";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ nullable: true })
  rideId: number;

  @OneToOne(type => Ride, ride => ride.chat)
  @JoinColumn()
  ride: Ride;

  @OneToMany(type => User, user => user.chat, { nullable: true })
  participants: User[];

  @OneToMany(type => Message, message => message.chat, { nullable: true })
  messages: Message[];

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}
export default Chat;
