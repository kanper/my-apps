import Vue from 'vue'
import Vuex from 'vuex'
import services from './services'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    services,
    modelTitle: 'SIMEPADF',
    snackbarInformationVisible: false,
    snackbarInformationText: '',
    visibleNewDialog: false,
    visibleEditDialog: false,
    visibleDeleteDialog: false,
    visibleInfoDialog: false,
    CRUDModelID: 0,
    dataTable: []
  },
  mutations: {
    setModelName(state, name){
      state.modelTitle = name;
    },
    showInfo(state, text){
      state.snackbarInformationText = text;
      state.snackbarInformationVisible = true;
    },
    closeInfo(state){
      state.snackbarInformationVisible = false;
    },
    changeNewDialogVisibility(state){
      state.visibleNewDialog = !state.visibleNewDialog;
    },
    changeEditDialogVisibility(state){
      state.visibleEditDialog = !state.visibleEditDialog;
    },
    changeDeleteDialogVisibility(state){
      state.visibleDeleteDialog = !state.visibleDeleteDialog;
    },
    changeInfoDialogVisibility(state){
      state.visibleInfoDialog = !state.visibleInfoDialog;
    },
    closeAllDialogs(state){
      state.visibleNewDialog = false;
      state.visibleEditDialog = false;
      state.visibleDeleteDialog = false;
      state.visibleInfoDialog = false;
    },
    setCRUDModel(state,id){
      state.CRUDModelID = id;
    },
    updateDataTable(state, dataAction) {
      this.state.dataTable = dataAction;
    }
  },
  actions: {
    loadDataTable: async function({commit}) {
      services.objetivoService.getAll()
          .then(r => {
            commit('updateDataTable',r.data);
          })
          .catch(e => {
            commit('showInfo', e.toString())
          });
    }
  }
})
