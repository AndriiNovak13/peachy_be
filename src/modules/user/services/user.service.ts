import { Op } from "sequelize";

import { User } from "@/database/models/User";
import { UserProfile } from "@/database/models/UserProfile";

import { PaginatedResponse, PaginationService } from "@/common/pagination";

import { UserRepository } from "../repositories";

import { ApiError, errorFieldMessage } from "@/shared/errors";
import { QueryParams } from "@/shared/types";
import { UserCreationAttributes, UserResponse } from "../shared/types";

export class UserService extends PaginationService<User> {
  private userRepository: UserRepository;

  constructor() {
    super(User);
    this.userRepository = new UserRepository();
  }

  checkUserExistByEmail = async (email: string): Promise<void> => {
    const existingUserByEmail = await this.userRepository.findByEmail(email);

    if (existingUserByEmail) {
      throw ApiError.BadRequest(
        errorFieldMessage("email", "User with this email already exists")
      );
    }
  };

  getMany = async (
    queryParams: QueryParams
  ): Promise<PaginatedResponse<User>> => {
    const { page, perPage, search = "" } = queryParams;

    return await this.paginate({
      page,
      perPage,
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${search}%` } },
          { lastName: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ]
      },
      include: [UserProfile]
    });
  };

  get = async (userId: string): Promise<UserResponse> => {
    const user = await this.userRepository.findById(userId);

    return {
      user
    };
  };

  create = async (body: UserCreationAttributes): Promise<UserResponse> => {
    const { email } = body;

    await this.checkUserExistByEmail(email);

    const createdUser = await this.userRepository.create(body);

    return {
      user: createdUser
    };
  };

  update = async (
    userId: string,
    body: UserCreationAttributes
  ): Promise<UserResponse> => {
    const { firstName, lastName, email, profile } = body;

    const user = await this.userRepository.findById(userId);

    const { email: currentEmail } = user ?? {};

    if (currentEmail !== email) {
      await this.checkUserExistByEmail(email);
    }

    await user?.update({ firstName, lastName, email });
    await user?.profile?.update(profile);

    const updatedUser = await this.userRepository.findById(userId);

    return {
      user: updatedUser
    };
  };

  delete = async (userId: string): Promise<void> => {
    const user = await this.userRepository.findById(userId);

    user?.destroy();

    return;
  };
}
