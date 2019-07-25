<template>
  <v-app>
    <v-toolbar app class="blue-grey darken-4" dark>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-img src="logo1.png"  max-height="30" max-width="100"></v-img>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer" absolute dark temporary>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0 pb-0" dense v-for="item in items" :key="item.title">
        <v-divider light></v-divider>
        <v-list-group :prepend-icon="item.icon">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile v-for="ite in item.children" :key="ite.title" @click="redirect(ite.path)">
            <v-list-tile-action>
              <v-icon>{{ite.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{ite.title}}</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      items: [
          { 
            title: 'Usuarios', 
            icon: 'mdi-account-circle', 
            children: [
              //{ icon:'mdi-plus-box', title:'Agregar', path:'/usuarios/add' },
              { icon:'mdi-format-list-bulleted', title:'Listar', path:'/usuarios' },
            ] 
          },
          { 
            title: 'Administración de Catalogos', 
            icon: 'mdi-view-dashboard', 
            children: [
              { icon:'mdi-format-list-bulleted', title:'Organizaciones', path:'/organizaciones' },
              { icon:'mdi-format-list-bulleted', title:'Socios', path:'/socios' },
              { icon:'mdi-format-list-bulleted', title:'País', path:'/paises' },
            ] 
          },
          {
            title: 'Plan de Monitoreo y Evaluación',
            icon: 'mdi-compass-outline',
            children: [
              { icon:'mdi-flag-variant', title:'Indicador', path:'/objetivos' },
              { icon:'mdi-calendar-multiple-check', title:'Actividad', path:'/objetivos' },
              { icon:'mdi-lightbulb', title:'Resultado', path:'/objetivos' },
              { icon:'mdi-checkbox-marked-circle-outline', title:'Objetivo', path:'/objetivos' },
            ]
          },
        ],
      right: false
    }
  },
  methods: {
    redirect(path) {
      if (path === undefined) return;
      this.$router.push(path);
    }
  }
};
</script>
