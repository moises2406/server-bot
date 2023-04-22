import { io } from "../index";
import { Msg } from "../interface/AcountUserInter";
import { DialogoModel } from "../model/conversaciones";

interface Datas {
  cliente:string; 
  conversacion:string; 
  posicion: number;
}
interface Msg2 {msg:string,identificador:string}
// TODO: lansar los dados
io.on("connection", (socket) => {
  console.log("user connected with id:", socket.id);

  socket.on("msg-client",(arg: Msg) =>{
    socketId(arg);
  })
  socket.on('chatMsg',async (arg: Msg2) =>{
    const Datos = await DialogoModel.findOne({ identificador: arg.identificador });
    if (Datos) {
      const numreo = Datos.conversacion?.length ? Datos.conversacion.length : 0;
      const arr: Datas = {cliente:'el',conversacion: arg.msg, posicion: numreo};
      const Arr = Datos.conversacion?.concat([arr])
      const MSG = await DialogoModel.findOneAndUpdate(
        { identificador: arg.identificador },
        {
          conversacion: Arr,
          bln: true,
        },
        {
          new: true,
        }
      );
      
      socket.emit('miMsg',MSG)
    } 
   
  })
  
});
        
const socketId = ({msg,url,user}: Msg) => {
  io.emit("msg-client-bot", {url, msg, user});
};
