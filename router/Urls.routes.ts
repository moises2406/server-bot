import { Router } from "express";
import { PostRute, PutRute} from "../controller/AcountUser";
import { DeleteRute, DeleteRuteUserModel } from "../controller/DeleteRous";
import { GetRute, GetRuteID, GetRuteUrl } from "../controller/GetRouters";
import { PostUser,PostUserPrueba,PostUsersTheAcount} from "../controller/PostRouters";
import { PutRuteConver, PutUser, PutUserApdate } from "../controller/PutRouter";

const rute = Router();


rute.get("/uris/:id", GetRute);
rute.get("/id/:id", GetRuteID);
rute.post("/urisUrl", GetRuteUrl);
// TODO: post
rute.put("/uris", PutRute);
rute.put("/users/:id", PutUser);
rute.put("/apdateUsers/:id", PutUserApdate);
rute.put("/apdateConver", PutRuteConver);

// TODO: post
rute.post("/conver", PostRute);
rute.post("/user", PostUser);
rute.post("/users", PostUsersTheAcount);

// TODO: delete
rute.delete('/user',DeleteRute);
rute.delete('/usermodel',DeleteRuteUserModel)

rute.post("/p", PostUserPrueba);


export default rute;
