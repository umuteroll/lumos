import { LitElement, html, css } from 'lit';
import { mainStyles } from '../../styles/main-styles.js';

export class EmployeeForm extends LitElement {
  static properties = {
    employee: { type: Object },
    isEdit: { type: Boolean }
  };

  static styles = [
    mainStyles,
    css`
      .form-container {
        padding: 1rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      .form-field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      label {
        font-weight: 500;
        color: #666;
      }

      input {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1rem;
      }
    `
  ];

  constructor() {
    super();
    this.employee = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: '',
      position: ''
    };
    this.isEdit = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    const event = new CustomEvent(this.isEdit ? 'employee-updated' : 'employee-added', {
      detail: { employee: { ...this.employee } },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  handleInput(e, field) {
    this.employee = {
      ...this.employee,
      [field]: e.target.value
    };
  }

  render() {
    return html`
      <div class="form-container">
        <h2>${this.isEdit ? 'Edit Employee' : 'Add New Employee'}</h2>
        <form @submit=${this.handleSubmit}>
          <div class="form-grid">
            <div class="form-field">
              <label for="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                .value=${this.employee.firstName}
                @input=${(e) => this.handleInput(e, 'firstName')}
                required
              />
            </div>
            <div class="form-field">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                .value=${this.employee.lastName}
                @input=${(e) => this.handleInput(e, 'lastName')}
                required
              />
            </div>
            <div class="form-field">
              <label for="dateOfEmployment">Date of Employment</label>
              <input
                type="date"
                id="dateOfEmployment"
                .value=${this.employee.dateOfEmployment}
                @input=${(e) => this.handleInput(e, 'dateOfEmployment')}
                required
              />
            </div>
            <div class="form-field">
              <label for="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                .value=${this.employee.dateOfBirth}
                @input=${(e) => this.handleInput(e, 'dateOfBirth')}
                required
              />
            </div>
            <div class="form-field">
              <label for="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                .value=${this.employee.phone}
                @input=${(e) => this.handleInput(e, 'phone')}
                required
              />
            </div>
            <div class="form-field">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                .value=${this.employee.email}
                @input=${(e) => this.handleInput(e, 'email')}
                required
              />
            </div>
            <div class="form-field">
              <label for="department">Department</label>
              <input
                type="text"
                id="department"
                .value=${this.employee.department}
                @input=${(e) => this.handleInput(e, 'department')}
                required
              />
            </div>
            <div class="form-field">
              <label for="position">Position</label>
              <input
                type="text"
                id="position"
                .value=${this.employee.position}
                @input=${(e) => this.handleInput(e, 'position')}
                required
              />
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="secondary" @click=${this._cancel}>
              Cancel
            </button>
            <button type="submit" class="primary">
              ${this.isEdit ? 'Update' : 'Add'} Employee
            </button>
          </div>
        </form>
      </div>
    `;
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('form-cancelled', {
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('employee-form', EmployeeForm); 