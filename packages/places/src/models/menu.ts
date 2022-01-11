import mongoose from 'mongoose';

interface MenuAttrs {
  name: string;
  description?: string;
}

export interface MenuDoc extends mongoose.Document {
  name: string;
  description: string;
  version: number;
}

interface MenuModel extends mongoose.Model<MenuDoc> {
  build (attrs: MenuAttrs): MenuDoc;
}

export const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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

menuSchema.statics.build = (attrs: MenuAttrs) => {
  return new Menu(attrs);
};

const Menu = mongoose.model<MenuDoc, MenuModel>('Menu', menuSchema);

export { Menu };