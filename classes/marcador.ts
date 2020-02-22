// Esta clase va servir para trabajar la interface de mis marcadores

export class Marcador{
    constructor(
        public id:string,
        public nombre:string,
        public lng:number,
        public lat:number,
        public color:string
    ){

    }
}