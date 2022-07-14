import { TypePrestation } from './../type-prestation/TypePrestation';
import { Pov } from "../pov/pov";

export interface Suivi {

    id:number;
    compte_rendu : string;
    montant : number; 
    
    offer_commercial : boolean; 


    pov : Pov;
    typePrestation : TypePrestation;
}