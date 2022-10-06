import mongoose from 'mongoose';

interface SaleAttrs {
  productId: string;
}

interface SaleModel extends mongoose.Model<SaleDoc> {
  build(attrs: SaleAttrs): SaleDoc;
}

interface SaleDoc extends mongoose.Document {
  productId: string;
}

const saleSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
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

saleSchema.statics.build = (attrs: SaleAttrs) => {
  return new Sale(attrs);
};

const Sale = mongoose.model<SaleDoc, SaleModel>('Sale', saleSchema);

export { Sale };
