import mongoose from 'mongoose';
import { PlaceDoc } from './place';

interface FoodCategoryAttrs {
  name: string;
}

export interface FoodCategoryDoc extends mongoose.Document {
  name: string;
}

interface FoodCategoryModel extends mongoose.Model<FoodCategoryDoc> {
  build (attrs: FoodCategoryAttrs): FoodCategoryDoc;
}

export const foodCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  {
    toJSON: {
      transform (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

foodCategorySchema.statics.build = (attrs: FoodCategoryAttrs) => {
  return new FoodCategory(attrs);
};

const FoodCategory = mongoose.model<FoodCategoryDoc, FoodCategoryModel>('FoodCategory', foodCategorySchema);

export { FoodCategory };