import { LitElement, html } from 'lit';
import { employeeFormStyles } from './employee-form.styles.js';
import { EmployeeService } from '../../services/employee.service.js';

export class EmployeeForm extends LitElement {
  static properties = {
    employee: { 
      type: Object,
      hasChanged(newVal, oldVal) {
        return newVal !== oldVal;
      }
    },
    isEdit: { type: Boolean }
  };

  static styles = employeeFormStyles;

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

  formFields = [
    {
      id: 'firstName',
      label: 'First Name',
      type: 'text',
      value: 'firstName'
    },
    {
      id: 'lastName',
      label: 'Last Name',
      type: 'text',
      value: 'lastName'
    },
    {
      id: 'dateOfEmployment',
      label: 'Date of Employment',
      type: 'date',
      value: 'dateOfEmployment'
    },
    {
      id: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      value: 'dateOfBirth'
    },
    {
      id: 'phone',
      label: 'Phone',
      type: 'tel',
      value: 'phone'
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      value: 'email'
    },
    {
      id: 'department',
      label: 'Department',
      type: 'select',
      value: 'department',
      options: EmployeeService.DEPARTMENTS
    },
    {
      id: 'position',
      label: 'Position',
      type: 'select',
      value: 'position',
      options: EmployeeService.POSITIONS
    }
  ];

  updated(changedProperties) {
    if (changedProperties.has('employee')) {
      if (this.employee === null) {
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
      }
    }
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

  renderFormField(field) {
    const value = this.employee?.[field.value] || '';
    
    if (field.type === 'select') {
      return html`
        <select
          id=${field.id}
          .value=${value}
          @change=${(e) => this.handleInput(e, field.value)}
        >
          <option value="">Select ${field.label}</option>
          ${field.options.map(option => html`
            <option value=${option}>${option}</option>
          `)}
        </select>
      `;
    }

    return html`
      <input
        type=${field.type}
        id=${field.id}
        .value=${value}
        @input=${(e) => this.handleInput(e, field.value)}
      />
    `;
  }

  render() {
    return html`
      <div class="form-container">
        <h2>${this.isEdit ? 'Edit Employee' : 'Add New Employee'}</h2>
        <form @submit=${this.handleSubmit}>
          <div class="form-grid">
            ${this.formFields.map(field => html`
              <div class="form-field">
                <label for=${field.id}>${field.label}</label>
                ${this.renderFormField(field)}
              </div>
            `)}
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