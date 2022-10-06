import mongoose from 'mongoose';

interface CustomerAttrs {
  name: string;
  companyId: string;
}

interface CustomerModel extends mongoose.Model<CustomerDoc> {
  build(attrs: CustomerAttrs): CustomerDoc;
}

interface CustomerDoc extends mongoose.Document {
  name: string;
  companyId: string;
}

const customerSchema = new mongoose.Schema(
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

customerSchema.statics.build = (attrs: CustomerAttrs) => {
  return new Customer(attrs);
};

const Customer = mongoose.model<CustomerDoc, CustomerModel>(
  'Customer',
  customerSchema
);

export { Customer };
