import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { FoodDoc, foodSchema } from './food';
import { FoodCategoryDoc, foodCategorySchema } from './food-category';
import { MenuDoc, menuSchema } from './menu';

interface PlaceAttrs {
  name: string;
  address: string;
  type: string;
}

export interface PlaceDoc extends mongoose.Document {
  name: string;
  address: string;
  type: string;
  menus: MenuDoc[];
  foodCategories: FoodCategoryDoc[];
  foods: FoodDoc[];
  version: number;
}

interface PlaceModel extends mongoose.Model<PlaceDoc> {
  build (attrs: PlaceAttrs): PlaceDoc;
}

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    menus: [menuSchema],
    foodCategories: [foodCategorySchema],
    foods: [foodSchema]
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

placeSchema.set('versionKey', 'version');
placeSchema.plugin(updateIfCurrentPlugin);

placeSchema.statics.build = (attrs: PlaceAttrs) => {
  return new Place(attrs);
};

const Place = mongoose.model<PlaceDoc, PlaceModel>('Place', placeSchema);

export { Place };