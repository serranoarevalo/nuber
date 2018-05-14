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
import User from "./User";

@Entity()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({
    type: "text",
    enum: ["accepted", "onroute", "finished", "canceled", "requesting"],
    default: "requesting"
  })
  status: string;

  @Column({ type: "float" })
  driverRating: number;

  @Column({ type: "float" })
  passengerRating: number;

  @ManyToOne(type => User, user => user.ridesAsPassenger)
  passenger: User;

  @ManyToOne(type => User, user => user.ridesAsDriver)
  driver: User;

  @Column({ type: "text" })
  pickUpLocation: string;

  @Column({ type: "text" })
  dropOffLocation: string;

  @Column({ type: "decimal" })
  price: number;

  @Column({ type: "text", enum: ["cash", "card"] })
  paymentMethod: string;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}
export default Ride;
