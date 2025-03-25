import { LitElement, html } from 'lit';
import { EmployeeService } from '../../services/employee.service.js';
import '../employee-table/employee-table.js';
import '../employee-list/employee-list.js';
import '../employee-form/employee-form.js';
import '../confirm-dialog/confirm-dialog.js';

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
    selectedEmployees: { type: Array },
    showDeleteDialog: { type: Boolean },
    employeeToDelete: { type: Object }
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
    this.showDeleteDialog = false;
    this.employeeToDelete = null;
    this.loadEmployees();
  }

  loadEmployees() {
    const result = this.employeeService.getEmployees({
      searchQuery: this.searchQuery,
      page: this.currentPage,
      itemsPerPage: this.itemsPerPage
    });
    this.employees = result.items;
    this.totalPages = result.pagination.totalPages;
  }

  handleSearch(e) {
    this.searchQuery = e.target.value;
    this.currentPage = 1;
    this.loadEmployees();
  }

  handlePageChange(e) {
    this.currentPage = e.detail.page;
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

  _confirmDelete(e) {
    this.employeeToDelete = e.detail.employee;
    this.showDeleteDialog = true;
  }

  _handleDeleteConfirmed() {
    if (this.employeeToDelete) {
      this.employeeService.deleteEmployee(this.employeeToDelete.id);
      this.loadEmployees();
      this.employeeToDelete = null;
    }
  }

  _handleDeleteCancelled() {
    this.employeeToDelete = null;
  }

  toggleView() {
    this.viewMode = this.viewMode === 'table' ? 'list' : 'table';
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

          ${this.viewMode === 'table' ? html`
            <employee-table
              .employees=${this.employees}
              .selectedEmployees=${this.selectedEmployees}
              @edit-employee=${this._editEmployee}
              @delete-employee=${this._confirmDelete}
              @selection-change=${this._handleSelectionChange}
            ></employee-table>
          ` : html`
            <employee-list
              .employees=${this.employees}
              .selectedEmployees=${this.selectedEmployees}
              @edit-employee=${this._editEmployee}
              @delete-employee=${this._confirmDelete}
              @selection-change=${this._handleSelectionChange}
            ></employee-list>
          `}
        `}

        <confirm-dialog
          ?open=${this.showDeleteDialog}
          title="Delete Employee"
          message=${this.employeeToDelete ? 
            `Are you sure you want to delete ${this.employeeToDelete.firstName} ${this.employeeToDelete.lastName}?` : 
            'Are you sure you want to delete this employee?'}
          confirmText="Delete"
          cancelText="Cancel"
          @dialog-confirmed=${() => {
            this._handleDeleteConfirmed();
            this.showDeleteDialog = false;
          }}
          @dialog-cancelled=${() => {
            this._handleDeleteCancelled();
            this.showDeleteDialog = false;
          }}
        ></confirm-dialog>
      </div>
    `;
  }
}

customElements.define('employee-management-app', EmployeeManagementApp); 