export interface DatosReq {
    uris: string[];
    urisArray: any;
    _id: string;
    usuario:string;
    
  }
  
  export interface PostResq {
    uriss: string;
    conver: string[];
    precio: string;
    nombre: string;
    usuario: string;
    user_Id:string;
    img:string;
  }
  
  export interface LosDatosDelArry {
    cliente: string;
    conversacion: string;
    respuesta: string;
    posicion: number;
  }

  export interface Msg {
    user: string;
    url: string;
    msg: string;
  }

  export interface Users {
    email:string;
    password:string;
  }
  