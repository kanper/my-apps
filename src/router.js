import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import OrganizacionIndex from './components/organizaciones/Index'
import PaisIndex from './components/paises/Index'
import SocioIndex from './components/socios/Index'
import ObjetivoIndex from './components/objetivos/Index'
import UsuarioIndex from './components/usuarios/Index'
import UsuarioCreateUpdate from './components/usuarios/CreateOrUpdate'

Vue.use(Router)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/organizaciones/', name: 'OrganizacionIndex', component: OrganizacionIndex },
  { path: '/paises/', name: 'PaisIndex', component: PaisIndex },
  { path: '/socios/', name: 'SocioIndex', component: SocioIndex },
  { path: '/objetivos/', name: 'ObjetivoIndex', component: ObjetivoIndex },
  { path: '/usuarios/', name: 'UsuarioIndex', component: UsuarioIndex },
  { path: '/usuarios/add', name: 'UsuarioCreate', component: UsuarioCreateUpdate },
  { path: '/usuario/:id/edit', name: 'usuarioEditar', component: UsuarioCreateUpdate }
]

export default new Router({
  routes
})
