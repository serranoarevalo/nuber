import { Model, ModelOptions, QueryContext } from "objection";
import bcrypt from "bcrypt";

class User extends Model {
  static tableName = "users";
  readonly id!: number;
  username!: string;
  phone!: number;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;

  hashPassword = (password?: string): Promise<void | string> => {
    if (password) {
      return bcrypt.hash(password, 12);
    } else {
      return Promise.resolve();
    }
  };

  verifyPassword = (password: string): Promise<boolean> => {
    return bcrypt.compare(password, this.password);
  };

  $beforeInsert(context: QueryContext): Promise<void> {
    const mandatoryPromise = super.$beforeInsert(context);

    return Promise.resolve(mandatoryPromise).then(() => {
      this.hashPassword(this.password).then(hash => {
        this.password = hash || "";
        this.createdAt = new Date();
        this.updatedAt = new Date();
      });
    });
  }

  $beforeUpdate(options: ModelOptions, context: QueryContext): Promise<void> {
    const mandatoryPromise = super.$beforeUpdate(options, context);

    return Promise.resolve(mandatoryPromise).then(() => {
      const password = this.password;
      this.updatedAt = new Date();
      if (password) {
        return this.hashPassword(this.password).then(hash => {
          this.password = hash || "";
        });
      }
      return Promise.resolve();
    });
  }
}

export default User;
