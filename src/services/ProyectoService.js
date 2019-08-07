import AbstractService from './AbstractService'

export default class ProyectoService extends AbstractService {

    constructor(axios, baseUrl) {
        super(axios, `${baseUrl}proyecto`);
    }
}