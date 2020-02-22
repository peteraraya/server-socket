import { Marcador } from './marcador';
// Esta Clase :manejara todos los marcadores y la información relacionada al mapa

export class Mapa{

    // Lo manejare como un objeto y no un arreglo
    private marcadores:{[key:string]:Marcador} = {
    '1':{
      id: "1",
      nombre: "Fernando",
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      color: "#dd8fee"
    },
    '2':{
      id: "2",
      nombre: "Amy",
      lng: -75.75195645527508,
      lat: 45.351584045823756,
      color: "#790af0"
    },
    '3':{
      id: "3",
      nombre: "Orlando",
      lng: -75.75900589557777,
      lat: 45.34794635758547,
      color: "#19884b"
    }
    }
    constructor(){}

    getMarcadores(){
        return this.marcadores;
    }

    agregarMarcador(marcador:Marcador){
        // Debemos crear un nuevo objeto que tengo su id y el objeto
        this.marcadores[ marcador.id] = marcador;
    }

    borrarMarcador(id:string){
        
        delete this.marcadores[id];
        return this.getMarcadores();
    }

    moverMarcador(marcador: Marcador){
        // Recibimos el nuevo marcador (todo el objeto)
        
        // Modificamos los movimientos de marcadores
        this.marcadores[marcador.id].lng = marcador.lng;
        this.marcadores[marcador.id].lat = marcador.lat;

    }
}