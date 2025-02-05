export interface GristFields {
    title: string;
    short: string;
    long: string;
    // Ajoutez d'autres champs si nécessaire
  }
  
  export interface GristRecord {
    id: number;
    fields: GristFields;
  }
  
  export interface GristResponse {
    records: GristRecord[];
  }
  
  // Vous pouvez également définir un type pour vos chapitres côté front si vous souhaitez
  export interface Chapter {
    id: number;
    title: string;
    short: string;
    long: string;
  }