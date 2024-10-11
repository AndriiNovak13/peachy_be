/* eslint-disable @typescript-eslint/no-explicit-any */

import { Model, FindOptions } from "sequelize";

import { PaginationOptions } from "../shared/types";

export class PaginationService<T extends Model> {
  constructor(
    private model: {
      findAndCountAll(
        options: FindOptions<T>
      ):
        | { count: number; rows: any }
        | PromiseLike<{ count: number; rows: any }>;
      new (): T;
    }
  ) {}

  async paginate({ page, perPage, where, include }: PaginationOptions) {
    const currentPage = Number(page ?? 1);
    const currentPerPage = Number(perPage ?? 10);

    const options: FindOptions<T> = {
      where,
      include,
      limit: currentPerPage,
      offset: (currentPage - 1) * currentPerPage
    };

    const { count, rows } = await this.model.findAndCountAll(options);

    const totalPages = Math.ceil(count / currentPerPage);

    return {
      data: rows,
      meta: {
        totalItems: count,
        totalPages,
        currentPage,
        perPage: currentPerPage,
        hasPrevPage: currentPage > 1,
        hasNextPage: totalPages > currentPage
      }
    };
  }
}
