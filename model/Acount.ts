import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { Users } from "../interface/AcountUserInter";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    id: false,
  },
})
class Acount {
  @prop({ required: true, trim: true, unique: true })
  public email?: string;

  @prop({ required: true, trim: true })
  public password?: string;

  @prop({ required: true, trim: true, default: [] })
  public cuentas?: Users[];

  @prop({ required: true, trim: true, default: [] })
  public palabras?: object[];


}

export const AcountModel = getModelForClass(Acount); // UserModel is a regular Mongoose Model with correct types
