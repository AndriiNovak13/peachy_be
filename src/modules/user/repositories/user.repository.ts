import { User } from "@/database/models/User";
import { UserProfile } from "@/database/models/UserProfile";

import { ApiError } from "@/shared/errors";
import { UserCreationAttributes } from "../shared/types";

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await User.findByPk(id, {
      include: UserProfile
    });

    if (!user) {
      throw ApiError.NotFound(`User with id ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({
      where: { email }
    });
  }

  async create(data: UserCreationAttributes): Promise<User | null> {
    return await User.create(data, {
      include: UserProfile
    });
  }

  async update(
    userId: string,
    data: UserCreationAttributes
  ): Promise<[affectedCount: number]> {
    return await User.update(data, {
      where: { id: userId }
    });
  }

  async delete(id: string): Promise<number> {
    return await User.destroy({ where: { id } });
  }
}

export default UserRepository;
