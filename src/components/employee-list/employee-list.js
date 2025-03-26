import { LitElement, html } from 'lit';
import { employeeListStyles } from './employee-list.styles.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import editIcon from '../../assets/icons/edit.svg?raw';
import deleteIcon from '../../assets/icons/delete.svg?raw';

export class EmployeeList extends LitElement {
  static properties = {
    employees: { type: Array },
    selectedEmployees: { type: Array }
  };

  static styles = employeeListStyles;

  constructor() {
    super();
    this.employees = [];
    this.selectedEmployees = [];
  }

  toggleSelectEmployee(employee, e) {
    if (e.target.checked) {
      this.selectedEmployees = [...this.selectedEmployees, employee];
    } else {
      this.selectedEmployees = this.selectedEmployees.filter(emp => emp.id !== employee.id);
    }
    this.dispatchEvent(new CustomEvent('selection-change', {
      detail: { selectedEmployees: this.selectedEmployees },
      bubbles: true,
      composed: true
    }));
  }

  handleEdit(employee) {
    this.dispatchEvent(new CustomEvent('edit-employee', {
      detail: { employee },
      bubbles: true,
      composed: true
    }));
  }

  handleDelete(employee) {
    this.dispatchEvent(new CustomEvent('delete-employee', {
      detail: { employee },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="list-view">
        ${this.employees.map(employee => html`
          <div class="list-item">
            <div class="list-item-header">
              <div class="checkbox-container">
                <input
                  type="checkbox"
                  class="checkbox"
                  .checked=${this.selectedEmployees.some(emp => emp.id === employee.id)}
                  @change=${(e) => this.toggleSelectEmployee(employee, e)}
                />
                <h3>${employee.firstName} ${employee.lastName}</h3>
              </div>
              <div class="action-buttons">
                <button 
                  class="icon-button edit"
                  @click=${() => this.handleEdit(employee)}
                  title="Edit"
                >
                  ${unsafeSVG(editIcon)}
                </button>
                <button 
                  class="icon-button delete"
                  @click=${() => this.handleDelete(employee)}
                  title="Delete"
                >
                  ${unsafeSVG(deleteIcon)}
                </button>
              </div>
            </div>
            <div class="list-item-content">
              <div class="list-item-details">
                <div class="detail-group">
                  <span class="detail-label">Department</span>
                  <span class="detail-value">${employee.department}</span>
                </div>
                <div class="detail-group">
                  <span class="detail-label">Position</span>
                  <span class="detail-value">${employee.position}</span>
                </div>
                <div class="detail-group">
                  <span class="detail-label">Email</span>
                  <span class="detail-value">${employee.email}</span>
                </div>
                <div class="detail-group">
                  <span class="detail-label">Phone</span>
                  <span class="detail-value">${employee.phone}</span>
                </div>
                <div class="detail-group">
                  <span class="detail-label">Date of Employment</span>
                  <span class="detail-value">${employee.dateOfEmployment}</span>
                </div>
                <div class="detail-group">
                  <span class="detail-label">Date of Birth</span>
                  <span class="detail-value">${employee.dateOfBirth}</span>
                </div>
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList); 