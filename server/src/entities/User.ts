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
export class User extends BaseEntity {
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
  savePassword(): void {
    this.hashPassword(this.password).then((hash: string): void => {
      this.password = hash;
    });
  }

  @BeforeUpdate()
  updatePassword(): void {
    if (this.password) {
      this.hashPassword(this.password).then((hash: string): void => {
        this.password = hash;
      });
    }
  }
}
