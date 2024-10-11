import {
  Table,
  Column,
  Model,
  HasOne,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt
} from "sequelize-typescript";

import { UserProfile } from "./UserProfile";

@Table({
  tableName: "users",
  timestamps: true
})
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email!: string;

  @CreatedAt
  @Column({
    type: DataType.DATE
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE
  })
  updatedAt!: Date;

  @HasOne(() => UserProfile, {
    onDelete: "CASCADE"
  })
  profile!: UserProfile;
}
