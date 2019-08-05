import Axios from 'axios'
import paisService from '../services/PaisService'
import socioService from '../services/SocioService'
import organizacionService from '../services/OrganizacionService'
import objetivoService from '../services/ObjetivoService'
import usuarioService from '../services/UsuarioService'

//let apiUrl = 'https://localhost:44320/';
//let apiUrl = 'http://127.0.0.1:5000/';
let apiUrl = 'http://localhost:5000/';


// Axios Configuration
Axios.defaults.headers.common.Accept = 'application/json';

export default {
    paisService: new paisService(Axios, apiUrl),
    socioService: new socioService(Axios, apiUrl),
    organizacionService: new organizacionService(Axios, apiUrl),
    objetivoService: new objetivoService(Axios, apiUrl),
    usuarioService: new usuarioService(Axios, apiUrl)
}