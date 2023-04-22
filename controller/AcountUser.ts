import { RequestHandler } from "express";
import { UserModel } from "../model/user";
import { DialogoModel } from "../model/conversaciones";
import {
  LosDatosDelArry,
  PostResq,
  DatosReq,
} from "../interface/AcountUserInter";
//import { client, io } from "./index";


let arregloDeMensages: any[] = [];

const DBDatos: LosDatosDelArry[] = [];

export const PostRute: RequestHandler = async (req, res) => {
  const { uriss, conver, precio, nombre, usuario, user_Id, img}: PostResq = req.body;

  const nunberPosition = nombre.indexOf("·");
  const precioPosition = precio.indexOf("-");


  let namePerson = nombre
    .substring(0, nunberPosition - 1)
    .toLocaleLowerCase()
    .trimEnd();

  const tipo = nombre;
  
  const praice = precio.substring(0, precioPosition - 1);

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
      const DBsave = new DialogoModel({
        cliente: namePerson,
        precio: praice,
        conversacion: arregloDeMensages,
        dueño: usuario,
        clase: tipo,
        user: user_Id,
        identificador: uriss,
        img
      });
      const newCover = await DBsave.save();

      console.log(newCover);
      arregloDeMensages = [];
      res.status(200).json({ kl: "save in db" });
    }
  }
};

// TODO: para arreglar mas afuturo
export const PutRute: RequestHandler = async (req, res) => {
  const DatosReq: DatosReq = req.body;

  const resArrey: DatosReq | any = await UserModel.findOne({usuario:DatosReq.usuario});

  if (resArrey === null || undefined) {
     const DBsave = new UserModel({
       user:DatosReq._id,
       uris:DatosReq.uris,
       usuario:DatosReq.usuario,
     })
     await DBsave.save();

    res.status(200).json({ resStrin: "!=no" });
  } else {
    const uris = resArrey.uris;

    if (resArrey.uris[0] !== DatosReq.uris[0]) {
      for (let index = 0; index < resArrey.uris.length - 1; index++) {
        const verificaUrl = DatosReq.uris[index];
        //TODO: ojo
        if (verificaUrl === uris[0]) {
          await UserModel.findOneAndUpdate(
            { usuario: DatosReq.usuario },
            {
              usuario: DatosReq.usuario,
              uris: DatosReq.uris,
            },
            { new: true }
          );
        console.log('iki',index, DatosReq.uris[index], uris[index]);
        const Position = { url: verificaUrl, position: index };

          // TODO: debuelve el dato si existe: URL
          res.status(200).json({Position: Position});
        } else {
          if (index === resArrey.uris.length - 1) {
            // TODO: crea datos nuevos con los datos no encontrados []
            res.status(200).json({ resStrin: "!=no" });
          }
        }
      }
    } else {
      // TODO: verifica si la conversacion es la misma {} en el bot
      const residentificador = await DialogoModel.findOne({
        identificador: uris[0],
      });
      console.log('aki moises');
      
      if (residentificador) {
        res.status(200).json({residentificador});
      } else {
        // TODO: verifica si la conversacion es la existe
        res.status(200).json({ no: "?no" });
      }
    }
  }
};
