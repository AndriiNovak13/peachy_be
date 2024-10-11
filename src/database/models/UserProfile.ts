import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt
} from "sequelize-typescript";

import { User } from "./User";

@Table({
  tableName: "user_profiles",
  timestamps: true
})
export class UserProfile extends Model<UserProfile> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID
  })
  id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  userId!: string;

  @Column({
    type: DataType.TEXT
  })
  bio?: string;

  @Column({
    type: DataType.STRING
  })
  address?: string;

  @Column({
    type: DataType.STRING
  })
  education?: string;

  @Column({
    type: DataType.STRING
  })
  company?: string;

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

  @BelongsTo(() => User)
  user!: User;
}
