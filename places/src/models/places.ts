import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface PlaceAttrs {
  name: string;
  address: string;
  type: string;
}

interface PlaceDoc extends mongoose.Document {
  name: string;
  address: string;
  type: string;
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

placeSchema.set('versionKey', 'version');
placeSchema.plugin(updateIfCurrentPlugin);

placeSchema.statics.build = (attrs: PlaceAttrs) => {
  return new Place(attrs);
};

const Place = mongoose.model<PlaceDoc, PlaceModel>('Place', placeSchema);

export { Place };