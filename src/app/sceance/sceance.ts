import { Pov } from "../pov/pov";

export interface Sceance {

    id:number;
    date_sceance : string;
    resume : string; 

    pov : Pov;
}