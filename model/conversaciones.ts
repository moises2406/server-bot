import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    id: false,
  },
})
class Dialogo {
  @prop({ required: true, trim: true, default: ''  })
  public user?: string;

  @prop({ required: true, trim: true, default: ''  })
  public cliente?: string;

  @prop({ required: true, trim: true, default: "void" })
  public dueño?: string;

  @prop({ required: true, default: ''  })
  public identificador?: string;

  @prop({ required: true, trim: true, default: ''  })
  public precio?: string;

  @prop({ required: true, default: '' })
  public clase?: string;

  @prop({ required: true, default: '' })
  public img?: string;

  @prop({ required: true, default: [] })
  public conversacion?: object[];
}

export const DialogoModel = getModelForClass(Dialogo); // UserModel is a regular Mongoose Model with correct types
