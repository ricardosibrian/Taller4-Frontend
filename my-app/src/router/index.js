import { createRouter, createWebHistory } from 'vue-router'
import QRView from '/src/views/QRView.vue'
import MyHomeView from '/src/views/MyHomeView.vue'
import EntryView from '/src/views/EntryView.vue'
import PermissionView from '/src/views/PermissionView.vue'
import AdminView from '/src/views/AdminView.vue'
import GraphView from '/src/views/GraphView.vue'
import AdminHouseView from '/src/views/AdminHouseView.vue'
import AdminScanerView from '/src/views/AdminScanerView.vue'
import AdminVigilantView from '/src/views/AdminVigilantView.vue'
import LoginView from '/src/views/LoginView.vue'
import MainView from '/src/views/MainView.vue'
import AdminHouseDetailView from '@/views/AdminHouseDetailView.vue'
import VigilantView from '@/views/VigilantView.vue'
import ScanQRView from '@/views/ScanQRView.vue'
import CreateEntryView from '@/views/CreateEntryView.vue'
import VisitantePermissionView from '/src/views/VisitantePermissionView.vue'

const routes = [
  { path: '/', component: LoginView },
  { 
    path: '/mainView', 
    component: MainView,
    children: [
      { path: '', component: QRView },
      { path: 'myHomeView', component: MyHomeView },
      { path: 'entryView', component: EntryView },
      { path: 'permissionView', component: PermissionView },
      { path: 'adminView', component: AdminView },
      { path: 'graphView', component: GraphView },
      { path: 'adminHouseView', component: AdminHouseView },
      { path: 'adminScanerView', component: AdminScanerView },
      { path: 'adminVigilantView', component: AdminVigilantView },
      { path: 'adminHouseDetailView', component: AdminHouseDetailView },
      { path: 'visitantePermissionView', component: VisitantePermissionView }
    ]
  },
  { 
    path: '/vigilantView', 
    component: VigilantView,
    children: [
      { path: '', component: ScanQRView },
      { path: 'createEntryView', component: CreateEntryView },
    ]
  }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;