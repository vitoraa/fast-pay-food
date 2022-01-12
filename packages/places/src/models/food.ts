import mongoose from 'mongoose';
import { FoodCategoryDoc } from './food-category';

interface FoodAttrs {
  name: string;
  price: number;
  photoUrl?: string;
  foodCategory: FoodCategoryDoc;
}

export interface FoodDoc extends mongoose.Document {
  name: string;
  price: number;
  photoUrl: string;
  foodCategory: FoodCategoryDoc;
}

interface FoodModel extends mongoose.Model<FoodDoc> {
  build (attrs: FoodAttrs): FoodDoc;
}

export const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photoUrl: {
      type: String,
      required: false,
    },
    foodCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodCategory',
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

foodSchema.statics.build = (attrs: FoodAttrs) => {
  return new Food(attrs);
};

const Food = mongoose.model<FoodDoc, FoodModel>('Food', foodSchema);

export { Food };