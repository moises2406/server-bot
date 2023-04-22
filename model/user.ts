import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    id: false,
  },
})
class User {
  @prop({ required: true, trim: true, default: ['hv', 'gjkh'] })
  public uris?: string[];

  @prop({ required: true, trim: true, default: 'moises' })
  public user?: string;

  @prop({ required: true, trim: true, default: 'gmail' })
  public usuario?: string;
  
}

export const UserModel = getModelForClass(User); // UserModel is a regular Mongoose Model with correct types
