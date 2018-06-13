import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ type: "float", nullable: true })
  driverRating: number;

  @Column({ type: "float", nullable: true })
  passengerRating: number;

  @ManyToOne(type => User, user => user.ridesAsPassenger)
  passenger: User;

  @ManyToOne(type => User, user => user.ridesAsDriver)
  driver: User;

  @Column({ type: "text" })
  pickUpLocation: string;

  @Column({ type: "text" })
  pickUpCoords: string;

  @Column({ type: "text" })
  dropOffLocation: string;

  @Column({ type: "json", nullable: true })
  drivePath: string;

  @Column({ type: "decimal" })
  price: number;

  @Column({ type: "text", enum: ["CASH", "CARD"] })
  paymentMethod: string;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}
export default Ride;
