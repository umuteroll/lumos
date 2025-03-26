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
    this._dispatchSelectionChange();
  }

  toggleSelectEmployee(employee, e) {
    if (e.target.checked) {
      this.selectedEmployees = [...this.selectedEmployees, employee];
    } else {
      this.selectedEmployees = this.selectedEmployees.filter(emp => emp.id !== employee.id);
    }
    this._dispatchSelectionChange();
  }

  _dispatchSelectionChange() {
    this.dispatchEvent(new CustomEvent('selection-change', {
      detail: { selectedEmployees: this.selectedEmployees },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <table>
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
              <td>
                <div class="actions">
                  <button 
                    class="icon-button edit"
                    @click=${() => this.dispatchEvent(new CustomEvent('edit-employee', { detail: { employee } }))}
                    title="Edit"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.05c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>
                  <button 
                    class="icon-button delete"
                    @click=${() => this.dispatchEvent(new CustomEvent('delete-employee', { detail: { employee } }))}
                    title="Delete"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }
}

customElements.define('employee-table', EmployeeTable); 