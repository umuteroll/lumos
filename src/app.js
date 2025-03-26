import { LitElement, html, css } from 'lit';
import { mainStyles } from './styles/main-styles.js';
import { Router } from '@vaadin/router';
import './components/nav-menu/nav-menu.js';
import './router.js';

export class App extends LitElement {
  static styles = [
    mainStyles,
    css`
      .app-container {
        min-height: 100vh;
        background-color: #f5f5f5;
      }

      main {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }
    `
  ];

  constructor() {
    super();
    this.router = null;
  }

  firstUpdated() {
    const outlet = this.shadowRoot.querySelector('main');
    this.router = new Router(outlet);
    
    this.router.setRoutes([
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
    ]);

    window.addEventListener('popstate', () => {
      this.router.render(window.location.pathname);
    });

    this.router.render(window.location.pathname);
  }

  render() {
    return html`
      <div class="app-container">
        <nav-menu @navigate=${this.handleNavigate}></nav-menu>
        <main>
          <!-- Router will render components here -->
        </main>
      </div>
    `;
  }

  handleNavigate(e) {
    if (this.router) {
      this.router.render(e.detail.path);
    }
  }
}

customElements.define('lumos-app', App); 