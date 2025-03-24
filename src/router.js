import { Router } from '@vaadin/router';
import './components/employee-management-app/employee-management-app.js';
import './components/dashboard-view/dashboard-view.js';
import './components/reports-view/reports-view.js';

export const routes = [
  {
    path: '/',
    component: 'dashboard-view'
  },
  {
    path: '/employees',
    component: 'employee-management-app'
  },
  {
    path: '/reports',
    component: 'reports-view'
  }
];

export default Router; 