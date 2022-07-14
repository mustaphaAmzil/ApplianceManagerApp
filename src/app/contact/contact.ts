import { Client } from "../client/client";

export interface Contact {
    id:number;
    email :string;
    fonction : string;
    nom : string;
    prenom : string;
    telephone : string;

    client : Client;


    


  
}