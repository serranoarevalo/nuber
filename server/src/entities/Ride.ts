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
    enum: ["accepted", "on-route", "finished", "canceled", "requesting"],
    default: "requesting"
  })
  status: string;

  @Column({ type: "decimal" })
  driverRating: number;

  @Column({ type: "decimal" })
  passengerRating: number;

  @ManyToOne(type => User, user => user.rideAsPassenger)
  passenger: User;

  @ManyToOne(type => User, user => user.rideAsDriver)
  driver: User;

  @Column({ type: "text" })
  pickUpLocation: string;

  @Column({ type: "text" })
  dropOffLocation: string;

  @Column({ type: "decimal" })
  price: number;

  @Column({ type: "text", enum: ["cash", "card"] })
  paymentMethod: string;

  @Column({ type: "text" })
  driverLocation: string;

  @Column({ type: "json" })
  ridePath: string;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}
export default Ride;
