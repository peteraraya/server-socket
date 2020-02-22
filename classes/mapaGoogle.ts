
import { MarcadorGoogle } from './marcadorGoogle';

// Es el encargado de manejar todos los marcadores y todo lo que voy hacer con ellos
export class MapaGoogle {

    public marcadores: MarcadorGoogle[] = [];

    constructor(){}

    getMarcadores(){
        return this.marcadores;
    }

    agregarMarcador ( marcador: MarcadorGoogle ){
        this.marcadores.push( marcador );
    }

    borrarMarcador(id: string){
       this.marcadores = this.marcadores.filter( marker => marker.id !== id );
        return this.marcadores; 
    }

    moverMarcador(marcador: MarcadorGoogle){
        
        for (const i in this.marcadores) {
            // obtengo marcador
            if (this.marcadores[i].id === marcador.id) {
                this.marcadores[i].lat = marcador.lat;
                this.marcadores[i].lng = marcador.lng;   
                break;
            }
        }
    }
}