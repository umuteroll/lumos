import { LitElement, html } from 'lit';
import { dashboardStyles } from './dashboard.styles.js';

export class DashboardView extends LitElement {
  static styles = dashboardStyles;

  render() {
    return html`
      <div class="dashboard">
        <h1>Dashboard</h1>
      </div>
    `;
  }
}

customElements.define('dashboard-view', DashboardView); 