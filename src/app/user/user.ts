import { Role } from "../role/role";

export interface User {

       id : number;
       nom : String;
       prenom:String;
       email : String;
       username : String;
       password : String;
       telephone : String;
       
       roles : Role[];

}