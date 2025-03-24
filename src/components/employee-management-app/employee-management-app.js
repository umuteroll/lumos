import { LitElement, html } from 'lit';
import { EmployeeService } from '../../services/employee.service.js';
import '../employee-table/employee-table.js';
import '../employee-list/employee-list.js';
import '../employee-form/employee-form.js';

export class EmployeeManagementApp extends LitElement {
  static properties = {
    viewMode: { type: String },
    searchQuery: { type: String },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    showForm: { type: Boolean },
    editingEmployee: { type: Object },
    employees: { type: Array },
    totalPages: { type: Number },
    selectedEmployees: { type: Array }
  };

  constructor() {
    super();
    this.employeeService = new EmployeeService();
    this.viewMode = 'table';
    this.searchQuery = '';
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.showForm = false;
    this.editingEmployee = null;
    this.employees = [];
    this.totalPages = 1;
    this.selectedEmployees = [];
    this.loadEmployees();
  }

  loadEmployees() {
    const { items, pagination } = this.employeeService.getEmployees({
      searchQuery: this.searchQuery,
      page: this.currentPage,
      itemsPerPage: this.itemsPerPage
    });

    this.employees = items;
    this.totalPages = pagination.totalPages;
    this.currentPage = pagination.currentPage;
  }

  handleSearch(e) {
    this.searchQuery = e.target.value;
    this.currentPage = 1;
    this.loadEmployees();
  }

  toggleView() {
    this.viewMode = this.viewMode === 'table' ? 'list' : 'table';
  }

  changePage(newPage) {
    this.currentPage = newPage;
    this.loadEmployees();
  }

  handleEmployeeAdded(e) {
    this.employeeService.addEmployee(e.detail.employee);
    this.showForm = false;
    this.loadEmployees();
  }

  handleEmployeeUpdated(e) {
    this.employeeService.updateEmployee(this.editingEmployee.id, e.detail.employee);
    this.showForm = false;
    this.editingEmployee = null;
    this.loadEmployees();
  }

  handleFormCancelled() {
    this.showForm = false;
    this.editingEmployee = null;
  }

  _addEmployee() {
    this.showForm = true;
    this.editingEmployee = null;
  }

  _editEmployee(e) {
    this.editingEmployee = e.detail.employee;
    this.showForm = true;
  }

  _deleteEmployee(e) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(e.detail.employee.id);
      this.loadEmployees();
    }
  }

  handleSelectionChange(e) {
    this.selectedEmployees = e.detail.selectedEmployees;
  }

  _deleteSelectedEmployees() {
    if (this.selectedEmployees.length === 0) return;
    
    if (confirm(`Are you sure you want to delete ${this.selectedEmployees.length} selected employees?`)) {
      this.selectedEmployees.forEach(employee => {
        this.employeeService.deleteEmployee(employee.id);
      });
      this.selectedEmployees = [];
      this.loadEmployees();
    }
  }

  render() {
    return html`
      <div class="container">
        ${this.showForm ? html`
          <employee-form
            .employee=${this.editingEmployee}
            .isEdit=${this.editingEmployee?.id !== undefined}
            @employee-added=${this.handleEmployeeAdded}
            @employee-updated=${this.handleEmployeeUpdated}
            @form-cancelled=${this.handleFormCancelled}
          ></employee-form>
        ` : html`
          <div class="header">
            <h1>Employee List</h1>
            <div class="view-controls">
              <button class="secondary" @click=${this.toggleView}>
                ${this.viewMode === 'table' ? 'Switch to List View' : 'Switch to Table View'}
              </button>
              <button class="primary" @click=${this._addEmployee}>Add New</button>
              ${this.selectedEmployees.length > 0 ? html`
                <button class="danger" @click=${this._deleteSelectedEmployees}>
                  Delete Selected (${this.selectedEmployees.length})
                </button>
              ` : ''}
            </div>
          </div>

          <div class="search-bar">
            <input
              type="text"
              placeholder="Search employees..."
              .value=${this.searchQuery}
              @input=${this.handleSearch}
            />
          </div>

          ${this.viewMode === 'table'
            ? html`
                <employee-table
                  .employees=${this.employees}
                  .selectedEmployees=${this.selectedEmployees}
                  @selection-change=${this.handleSelectionChange}
                  @edit-employee=${this._editEmployee}
                  @delete-employee=${this._deleteEmployee}
                ></employee-table>
              `
            : html`
                <employee-list
                  .employees=${this.employees}
                  @edit-employee=${this._editEmployee}
                  @delete-employee=${this._deleteEmployee}
                ></employee-list>
              `}

          <div class="pagination">
            <button
              class="secondary"
              ?disabled=${this.currentPage === 1}
              @click=${() => this.changePage(this.currentPage - 1)}
            >
              Previous
            </button>
            <span>Page ${this.currentPage} of ${this.totalPages}</span>
            <button
              class="secondary"
              ?disabled=${this.currentPage === this.totalPages}
              @click=${() => this.changePage(this.currentPage + 1)}
            >
              Next
            </button>
          </div>
        `}
      </div>
    `;
  }
}

customElements.define('employee-management-app', EmployeeManagementApp); 