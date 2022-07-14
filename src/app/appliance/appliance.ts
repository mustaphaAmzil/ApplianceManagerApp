import { TypeAppliance } from './../type-appliance/TypeAppliance';
export interface Appliance {
    id:number;
    dbid : string;
    disponibilite :boolean;
    libelle_appliance : string;
    reference : string;

    typeAppliance : TypeAppliance;
  
}