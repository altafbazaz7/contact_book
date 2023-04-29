  





export interface ICovidData {
    cases: number;
    deaths: number;
    recovered: number;
    }


    

    export interface MapProps  {
   countries: Array<CountryType>
   center: [number, number] 
   zoom: number
}


 export interface   IDestructuredValues {
    isLoading : boolean; error : boolean ;data : [] | {}
 }

 export interface CountryType {
   country: string
   countryInfo: {
      lat: number
      long: number
      flag: string //link to flag
   }
   cases: number
}




export type MainDataType = {
   cases: number
   recovered: number
   deaths: number
   updated: number
}

export type DailyDataType = {
   cases: { [date: string]: number }
   recovered: { [date: string]: number }
   deaths: { [date: string]: number }
}
