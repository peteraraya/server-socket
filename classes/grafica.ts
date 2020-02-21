
export class GraficaData{

    //Label
    private meses: string[] = ['enero','febrero','marzo','abril'];

    // Data
    private valores: number[] = [0,0,0,0];

    constructor(){

    }

    // Metodo que nos ayude a obtener la data
    getDataGrafica(){
        // Regresa la info tal cual para mostrar
        return[
            { data: this.valores , label: 'Ventas' }
        ];
    }

    // Metodo para incrementar valores en el arreglo
    incrementarValor( mes:string, valor:number){
        // A minusculas y limpio sin espacios adelante ni atras
        mes = mes.toLowerCase().trim();

        for (const i in this.meses) {
            // Si encuentra el mes aumenta el valor
            if (this.meses[i] === mes) {
                this.valores[i] += valor;
            }
        }

        return this.getDataGrafica();
    }
}