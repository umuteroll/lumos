import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { navMenuStyles } from './nav-menu.styles.js';

export class NavMenu extends LitElement {
  static properties = {
    currentPath: { type: String }
  };

  static styles = navMenuStyles;

  static routes = [
    { path: '/', label: 'Dashboard', icon: '' },
    { path: '/employees', label: 'Employees', icon: '' },
    { path: '/reports', label: 'Reports', icon: '' }
  ];

  constructor() {
    super();
    this.currentPath = window.location.pathname;
  }

  render() {
    return html`
      <nav class="nav-menu">
        <ul>
          ${this.constructor.routes.map(route => html`
            <li>
              <a 
                href=${route.path}
                class=${classMap({
                  'nav-link': true,
                  'active': this.currentPath === route.path
                })}
                @click=${this.handleClick}
              >
                <span class="icon">${route.icon}</span>
                ${route.label}
              </a>
            </li>
          `)}
        </ul>
      </nav>
    `;
  }

  handleClick(e) {
    e.preventDefault();
    const path = e.target.closest('a').getAttribute('href');
    window.history.pushState({}, '', path);
    this.currentPath = path;
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { path },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('nav-menu', NavMenu); 