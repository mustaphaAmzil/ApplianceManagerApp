import { Contact } from './../contact/contact';
export interface Client {
    contact: any;
    id:number;
    activite :string;
    libelle : string;
    secteur : string;
    
    contacts : Contact[];


   /*public  getContactsByClientId(id) {
      return Contacts; }*/
  
    
}