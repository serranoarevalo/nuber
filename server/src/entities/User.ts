import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Confirmation from "./Confirmation";
import Place from "./Place";
import Ride from "./Ride";

const BCRYPT_ROUNDS = 10;
const EMAIL = "EMAIL";
const FACEBOOK = "FACEBOOK";

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "text", nullable: true })
  facebookId: string;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text", enum: [FACEBOOK, EMAIL], default: EMAIL })
  loginType: string;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text", nullable: true })
  profilePhoto: string;

  @Column({ type: "boolean", default: false })
  isDriving: boolean;

  @Column({ type: "float", nullable: true })
  balance: number;

  @Column({ type: "text", default: "" })
  carPlates: string;

  @Column({ type: "float", nullable: true })
  lastLat: number;

  @Column({ type: "float", nullable: true })
  lastLng: number;

  @OneToMany(type => Confirmation, confirmation => confirmation.user)
  confirmations: Confirmation[];

  @OneToMany(type => Ride, ride => ride.passenger)
  ridesAsPassenger: Ride[];

  @OneToMany(type => Ride, ride => ride.driver)
  ridesAsDriver: Ride[];

  @OneToMany(type => Place, place => place.user)
  places: Place[];

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  hashPassword(password: string = ""): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  comparePassword(password: string, hashString: string): Promise<boolean> {
    return bcrypt.compare(password, hashString);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    const hashedPassword = await this.hashPassword(this.password);
    this.password = hashedPassword;
  }
}
export default User;
