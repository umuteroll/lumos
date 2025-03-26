import { LitElement, html } from 'lit';
import { employeeTableStyles } from './employee-table.styles.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

// SVG dosyalarını import et
import editIcon from '../../assets/icons/edit.svg?raw';
import deleteIcon from '../../assets/icons/delete.svg?raw';

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
            <th>First name</th>
            <th>Last name</th>
            <th>Date of employment</th>
            <th>Date of birth</th>
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
                    ${unsafeSVG(editIcon)}
                  </button>
                  <button 
                    class="icon-button delete"
                    @click=${() => this.dispatchEvent(new CustomEvent('delete-employee', { detail: { employee } }))}
                    title="Delete"
                  >
                    ${unsafeSVG(deleteIcon)}
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