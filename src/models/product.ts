import mongoose from 'mongoose';

interface ProductAttrs {
  name: string;
  companyId: string;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

interface ProductDoc extends mongoose.Document {
  name: string;
  companyId: string;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    companyId: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  'Product',
  productSchema
);

export { Product };
