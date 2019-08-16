export default class ProyectoHelperService {

    Axios;
    BaseUrl;

    constructor(Axios, BaseUrl) {
        this.Axios = Axios;
        this.BaseUrl = `${BaseUrl}proyecto`;
    }

    getPaises(){
        return this.Axios.get(`${this.BaseUrl}/helper/pais`);
    }

    getEstados(){
        return this.Axios.get(`${this.BaseUrl}/helper/estado`);
    }

    getOrganizaciones(){
        return this.Axios.get(`${this.BaseUrl}/helper/organizacion`);
    }

    getSocios(){
        return this.Axios.get(`${this.BaseUrl}/helper/socio`);
    }

    getIndicadores(){
        return this.Axios.get(`${this.BaseUrl}/helper/indicador`)
    }

    getUnselectedIndicadores(idProyecto) {
        return this.Axios.get(`${this.BaseUrl}/${idProyecto}/helper/indicador`)
    }

    getFuentes(){
        return this.Axios.get(`${this.BaseUrl}/helper/fuente`)
    }

    getFrecuencias(){
        return this.Axios.get(`${this.BaseUrl}/helper/frecuencia`)
    }

    getNiveles(){
        return this.Axios.get(`${this.BaseUrl}/helper/nivel`)
    }

    getDesagregaciones(){
        return this.Axios.get(`${this.BaseUrl}/helper/desagregacion`)
    }
}