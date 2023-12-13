import { Time } from "@angular/common";

export interface Evento{
    Subject:string,
    Description?:string,
    EndDateTime?:string,
    StartDateTime:string,
    WhoId:string,
    Type:string,
    Estado_de_la_Entrevista__c:string,
    DurationInMinutes: number,
    Location?:string,
    Link_Reunion__c?:string
}