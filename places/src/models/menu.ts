import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { PlaceDoc } from './place'

interface MenuAttrs {
  name: string;
  place: PlaceDoc;
}

interface MenuDoc extends mongoose.Document {
  name: string;
  place: PlaceDoc;
  version: number;
}

interface MenuModel extends mongoose.Model<MenuDoc> {
  build (attrs: MenuAttrs): MenuDoc;
}

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place'
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

menuSchema.set('versionKey', 'version');
menuSchema.plugin(updateIfCurrentPlugin);

menuSchema.statics.build = (attrs: MenuAttrs) => {
  return new Menu(attrs);
};

const Menu = mongoose.model<MenuDoc, MenuModel>('Menu', menuSchema);

export { Menu };