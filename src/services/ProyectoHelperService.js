export default class ProyectoHelperService {

    Axios;
    BaseUrl;

    constructor(Axios, BaseUrl) {
        this.Axios = Axios;
        this.BaseUrl = `${BaseUrl}proyecto/helper/`;
    }

    getPaises(){
        return this.Axios.get(`${this.BaseUrl}pais`);
    }

    getEstados(){
        return this.Axios.get(`${this.BaseUrl}estado`);
    }

    getOrganizaciones(){
        return this.Axios.get(`${this.BaseUrl}organizacion`);
    }

    getSocios(){
        return this.Axios.get(`${this.BaseUrl}socio`);
    }
}