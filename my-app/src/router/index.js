import { createRouter, createWebHistory } from 'vue-router'
import AtentionView from '/src/views/AtentionView.vue'
import RecordView from '/src/views/RecordView.vue'
import AdminView from '/src/views/AdminView.vue'
import PostRecordView from '/src/views/PostRecordView.vue'
import LoginView from '/src/views/LoginView.vue'
import MainView from '/src/views/MainView.vue'
import AppointmentsView from '../views/AppointmentsView.vue'
import RequestAppointmentView from '@/views/RequestAppointmentView.vue'
import PrescriptionsView from '@/views/PrescriptionsView.vue'

const routes = [
  { path: '/', component: LoginView },
  { 
    path: '/mainView', 
    component: MainView,
    children: [
      { path: '', component: AppointmentsView },
      { path: 'atentionView', component: AtentionView },
      { path: 'recordView', component: RecordView },
      { path: 'adminView', component: AdminView },
      { path: 'postRecordView', component: PostRecordView },
      { path: 'prescriptionsView', component: PrescriptionsView },
      { path: 'requestAppointmentView', component: RequestAppointmentView}
    ]
  }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;