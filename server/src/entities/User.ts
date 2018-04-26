import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import { IsEmail } from "class-validator";
import bcrypt, { hash } from "bcrypt";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int" })
  age: number;

  @Column({ type: "text" })
  password: string;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  @BeforeInsert()
  async savePassword(): Promise<void> {
    const hashedPassword = await this.hashPassword(this.password);
    this.password = hashedPassword;
  }

  // This isn't working.
  @BeforeUpdate()
  async updatePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }
}
export default User;
