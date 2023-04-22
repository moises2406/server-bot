import { RequestHandler } from "express";
import { LosDatosDelArry, PostResq } from "../interface/AcountUserInter";
import { AcountModel } from "../model/Acount";
import { DialogoModel } from "../model/conversaciones";

// TODO: esto es para cuando ballas a crear un usuario
export const PutUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await AcountModel.findById({ _id: req.params.id });

  const iter = user?.cuentas?.concat({ email, password });
  const newmodel = await AcountModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      cuentas: iter,
    },
    { new: true }
  );
  res.status(200).json(newmodel);
};

// TODO: esto es para cuando ballas a actualizar un usuario un usuario
export const PutUserApdate: RequestHandler = async (req, res) => {
  const apdate = req.body;

  const newmodel = await AcountModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      cuentas: apdate,
    },
    { new: true }
  );
  res.status(200).json(newmodel);
};

let arregloDeMensages: any[] = [];

export const PutRuteConver: RequestHandler = async (req, res) => {
  const { uriss, conver, nombre }: PostResq = req.body;

 
    const nunberPosition = nombre.indexOf("·");

    let namePerson = nombre
      .substring(0, nunberPosition - 1)
      .toLocaleLowerCase()
      .trimEnd();

    for (let ind = 0; ind < conver.length; ind++) {
      const message: string = conver[ind].toLocaleLowerCase();
      const Respondiste = message.includes("respondiste");
      const Respondió = message.includes("respondió");
      const boliano = message.includes("enviaste");

      const yea = message.includes("mensaje enviado");
      if (!yea) {
        if (Respondiste) {
          //TODO: logica para saver si respondio a un mensage tullo
          const numeroDeRes = 14 + namePerson.length + 17;
          arregloDeMensages.map((i: LosDatosDelArry) => {
            const rdt = message.includes(i.conversacion);
            const numer = numeroDeRes + i.conversacion.length;
            const numer2 = message.length - 5;
            const resddts = message.substring(numer, numer2).trimEnd();

            if (rdt) {
              arregloDeMensages.push({
                cliente: "TU",
                conversacion: i.conversacion,
                respuesta: resddts,
                posicion: ind,
              });
            }
          });
        } else if (Respondió) {
          //TODO: logica para saver si respondiste a un mensage tullo

          const ResName = namePerson.length + 30;
          const SusRes = message
            .substring(ResName, message.length - 5)
            .trimStart()
            .trimEnd();

          arregloDeMensages.map((i: LosDatosDelArry) => {
            const asiboolian = SusRes.includes(i.conversacion);

            if (asiboolian) {
              const resddts = SusRes.substring(
                i.conversacion.length,
                SusRes.length
              )
                .trimStart()
                .trimEnd();

              arregloDeMensages.push({
                cliente: namePerson,
                conversacion: i.conversacion,
                respuesta: resddts,
                posicion: ind,
              });
            }
          });
        } else if (boliano) {
          //TODO: logica de los mensages tullos
          const Sus = message
            .substring(8, message.length - 5)
            .trimStart()
            .trimEnd();
          arregloDeMensages.push({
            cliente: "Tu",
            conversacion: Sus,
            posicion: ind,
          });
        } else {
          //TODO: logica de los mensages del cliente
          const SustrConver = message
            .substring(namePerson.length, message.length - 5)
            .trimStart()
            .trimEnd();
          arregloDeMensages.push({
            cliente: namePerson,
            conversacion: SustrConver,
            posicion: ind,
          });
        }
      }
      // TODO: esta mal
      if (ind === conver.length - 1) {
        const DBsave = await DialogoModel.findOneAndUpdate(
          { identificador: uriss },
          {
            conversacion: arregloDeMensages,
          },
          {
            new: true,
          }
        );
        console.log(DBsave, "apdate in db");
        arregloDeMensages = [];
        res.status(200).json({ data: "apdate in db" });
      }
    }
};
