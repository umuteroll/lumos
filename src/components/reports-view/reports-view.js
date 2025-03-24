import { LitElement, html } from 'lit';
import { reportsStyles } from './reports.styles.js';

export class ReportsView extends LitElement {
  static styles = reportsStyles;

  render() {
    return html`
      <div class="reports">
        <h1>Reports</h1>
      </div>
    `;
  }
}

customElements.define('reports-view', ReportsView); 