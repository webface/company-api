import mongoose from 'mongoose';

interface CompanyAttrs {
  name: string;
}

interface CompanyModel extends mongoose.Model<CompanyDoc> {
  build(attrs: CompanyAttrs): CompanyDoc;
}

interface CompanyDoc extends mongoose.Document {
  name: string;
}

const companySchema = new mongoose.Schema(
  {
    name: {
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

companySchema.statics.build = (attrs: CompanyAttrs) => {
  return new Company(attrs);
};

const Company = mongoose.model<CompanyDoc, CompanyModel>(
  'Company',
  companySchema
);

export { Company };
