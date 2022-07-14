import { Appliance } from './../appliance/appliance';
import { Client } from "../client/client";

export interface Pov {

    id:number;
    libelle_pov : string;
    analyse_cyber : string ;
    compte_manager :string;
    ingenieur_cyber : string;
    date_debut : Date;
    date_fin : Date;
    description : string;

    client : Client;
    appliance : Appliance;

  
}