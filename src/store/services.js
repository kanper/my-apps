import Axios from 'axios'
import paisService from '../services/PaisService'
import socioService from '../services/SocioService'
import organizacionService from '../services/OrganizacionService'
import objetivoService from '../services/ObjetivoService'
import objetivoResultadoService from '../services/ObjetivoResultadoService'
import resultadoService from '../services/ResultadoService'
import resultadoActividadService from '../services/ResultadoActividadService'
import actividadService from '../services/ActividadService'
import indicadorService from '../services/IndicadorService'
import usuarioService from '../services/UsuarioService'

//let apiUrl = 'https://localhost:44320/';
let apiUrl = 'http://127.0.0.1:5000/';

// Axios Configuration
Axios.defaults.headers.common.Accept = 'application/json';

export default {
    paisService: new paisService(Axios, apiUrl),
    socioService: new socioService(Axios, apiUrl),
    organizacionService: new organizacionService(Axios, apiUrl),
    objetivoService: new objetivoService(Axios, apiUrl),
    objetivoResultadoService: new objetivoResultadoService(Axios, apiUrl),
    resultadoService: new resultadoService(Axios, apiUrl),
    resultadoActividadService: new resultadoActividadService(Axios, apiUrl),
    actividadService: new actividadService(Axios, apiUrl),
    indicadorService: new indicadorService(Axios, apiUrl),
    usuarioService: new usuarioService(Axios, apiUrl)
}