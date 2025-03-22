import { LitElement, html } from 'lit';
import { employeeListStyles } from './employee-list.styles.js';

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
                <button class="icon-button" @click=${() => this.handleEdit(employee)}>
                  ✏️
                </button>
                <button class="icon-button" @click=${() => this.handleDelete(employee)}>
                  🗑️
                </button>
              </div>
            </div>
            <div class="list-item-details">
              <p><strong>Department:</strong> ${employee.department}</p>
              <p><strong>Position:</strong> ${employee.position}</p>
              <p><strong>Email:</strong> ${employee.email}</p>
              <p><strong>Phone:</strong> ${employee.phone}</p>
              <p><strong>Date of Employment:</strong> ${employee.dateOfEmployment}</p>
              <p><strong>Date of Birth:</strong> ${employee.dateOfBirth}</p>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList); 