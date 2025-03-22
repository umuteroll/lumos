import { LitElement, html } from 'lit';
import { employeeTableStyles } from './employee-table.styles.js';

export class EmployeeTable extends LitElement {
  static properties = {
    employees: { type: Array },
    selectedEmployees: { type: Array }
  };

  static styles = employeeTableStyles;

  constructor() {
    super();
    this.employees = [];
    this.selectedEmployees = [];
  }

  toggleSelectAll(e) {
    if (e.target.checked) {
      this.selectedEmployees = [...this.employees];
    } else {
      this.selectedEmployees = [];
    }
    this.dispatchEvent(new CustomEvent('selection-change', {
      detail: { selectedEmployees: this.selectedEmployees },
      bubbles: true,
      composed: true
    }));
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
      <div class="table-container">
        <table class="table-view">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  class="checkbox"
                  @change=${this.toggleSelectAll}
                  .checked=${this.selectedEmployees.length === this.employees.length}
                />
              </th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Employment</th>
              <th>Date of Birth</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${this.employees.map(employee => html`
              <tr>
                <td>
                  <input
                    type="checkbox"
                    class="checkbox"
                    .checked=${this.selectedEmployees.some(emp => emp.id === employee.id)}
                    @change=${(e) => this.toggleSelectEmployee(employee, e)}
                  />
                </td>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.dateOfEmployment}</td>
                <td>${employee.dateOfBirth}</td>
                <td>${employee.phone}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td class="action-buttons">
                  <button class="icon-button" @click=${() => this.handleEdit(employee)}>
                    ✏️
                  </button>
                  <button class="icon-button" @click=${() => this.handleDelete(employee)}>
                    🗑️
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define('employee-table', EmployeeTable); 