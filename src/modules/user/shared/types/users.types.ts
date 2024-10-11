import { Optional } from "sequelize";

import { User } from "@/database/models/User";
import { UserProfile } from "@/database/models/UserProfile";

export type UserCreationAttributes = User & {
  profile?: Optional<UserProfile, "id" | "createdAt" | "updatedAt">;
};

export interface UserResponse {
  user: User | null;
}
