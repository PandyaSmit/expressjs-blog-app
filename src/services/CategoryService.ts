import CategoryModel from "../models/CategoryModel";

export class CategoryService {
  static async findMany(payload) {
    try {
      return CategoryModel.find(payload);
    } catch (error) {
      throw error;
    }
  }
}
