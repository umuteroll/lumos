import { LitElement, html } from 'lit';
import { employeeFormStyles } from './employee-form.styles.js';
import { EmployeeService } from '../../services/employee.service.js';
import '../confirm-dialog/confirm-dialog.js';

export class EmployeeForm extends LitElement {
  static properties = {
    employee: { 
      type: Object,
      hasChanged(newVal, oldVal) {
        return newVal !== oldVal;
      }
    },
    isEdit: { type: Boolean },
    errors: { type: Object },
    showConfirmDialog: { type: Boolean }
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
    this.errors = {};
    this.employeeService = new EmployeeService();
    this.showConfirmDialog = false;
  }

  formFields = [
    {
      id: 'firstName',
      label: 'First Name',
      type: 'text',
      value: 'firstName',
      required: true,
      minLength: 2,
      maxLength: 50
    },
    {
      id: 'lastName',
      label: 'Last Name',
      type: 'text',
      value: 'lastName',
      required: true,
      minLength: 2,
      maxLength: 50
    },
    {
      id: 'dateOfEmployment',
      label: 'Date of Employment',
      type: 'date',
      value: 'dateOfEmployment',
      required: true
    },
    {
      id: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      value: 'dateOfBirth',
      required: true
    },
    {
      id: 'phone',
      label: 'Phone',
      type: 'tel',
      value: 'phone',
      required: true,
      pattern: '^\\+?[1-9]\\d{1,14}$'
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      value: 'email',
      required: true,
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    },
    {
      id: 'department',
      label: 'Department',
      type: 'select',
      value: 'department',
      required: true,
      options: EmployeeService.DEPARTMENTS
    },
    {
      id: 'position',
      label: 'Position',
      type: 'select',
      value: 'position',
      required: true,
      options: EmployeeService.POSITIONS
    }
  ];

  validateField(field, value) {
    const errors = [];

    if (field.required && !value) {
      errors.push(`${field.label} is required`);
    }

    if (field.minLength && value.length < field.minLength) {
      errors.push(`${field.label} must be at least ${field.minLength} characters`);
    }

    if (field.maxLength && value.length > field.maxLength) {
      errors.push(`${field.label} must not exceed ${field.maxLength} characters`);
    }

    if (field.pattern && value) {
      const regex = new RegExp(field.pattern);
      if (!regex.test(value)) {
        if (field.type === 'email') {
          errors.push('Please enter a valid email address');
        } else if (field.type === 'tel') {
          errors.push('Please enter a valid phone number');
        }
      }
    }

    if (field.type === 'date') {
      const date = new Date(value);
      const today = new Date();
      
      if (field.id === 'dateOfBirth') {
        if (date >= today) {
          errors.push('Date of birth must be in the past');
        }
      }

      if (field.id === 'dateOfEmployment') {
        if (date > today) {
          errors.push('Date of employment cannot be in the future');
        }
      }
    }

    return errors;
  }

  async validateEmail(email) {
    if (!this.isEdit) {
      const isEmailTaken = this.employeeService.isEmailTaken(email);
      if (isEmailTaken) {
        return ['This email is already registered'];
      }
    }
    return [];
  }

  async validateForm() {
    const newErrors = {};
    let hasErrors = false;

    for (const field of this.formFields) {
      const value = this.employee[field.value];
      const fieldErrors = this.validateField(field, value);
      
      if (field.id === 'email') {
        const emailErrors = await this.validateEmail(value);
        fieldErrors.push(...emailErrors);
      }

      if (fieldErrors.length > 0) {
        newErrors[field.value] = fieldErrors;
        hasErrors = true;
      }
    }

    this.errors = newErrors;
    return !hasErrors;
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const isValid = await this.validateForm();
    if (!isValid) {
      return;
    }

    if (this.isEdit) {
      this.showConfirmDialog = true;
    } else {
      this._dispatchEmployeeEvent('employee-added');
    }
  }

  _dispatchEmployeeEvent(eventName) {
    const event = new CustomEvent(eventName, {
      detail: { employee: { ...this.employee } },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  handleInput(e, field) {
    const value = e.target.value;
    this.employee = {
      ...this.employee,
      [field]: value
    };

    if (this.errors[field]) {
      this.errors = {
        ...this.errors,
        [field]: []
      };
    }
  }

  renderFormField(field) {
    const value = this.employee?.[field.value] || '';
    const fieldErrors = this.errors[field.value] || [];
    
    if (field.type === 'select') {
      return html`
        <div class="field-container">
          <select
            id=${field.id}
            .value=${value}
            @change=${(e) => this.handleInput(e, field.value)}
            class=${fieldErrors.length ? 'error' : ''}
            required=${field.required}
          >
            <option value="" ?selected=${!value}>Select ${field.label}</option>
            ${field.options.map(option => html`
              <option value=${option} ?selected=${option === value}>${option}</option>
            `)}
          </select>
          ${fieldErrors.map(error => html`
            <span class="error-message">${error}</span>
          `)}
        </div>
      `;
    }

    return html`
      <div class="field-container">
        <input
          type=${field.type}
          id=${field.id}
          .value=${value}
          @input=${(e) => this.handleInput(e, field.value)}
          class=${fieldErrors.length ? 'error' : ''}
          required=${field.required}
          minlength=${field.minLength || ''}
          maxlength=${field.maxLength || ''}
          pattern=${field.pattern || ''}
        />
        ${fieldErrors.map(error => html`
          <span class="error-message">${error}</span>
        `)}
      </div>
    `;
  }

  render() {
    return html`
      <div class="form-container">
        <h2>${this.isEdit ? 'Edit Employee' : 'Add New Employee'}</h2>
        <form @submit=${this.handleSubmit} novalidate>
          <div class="form-grid">
            ${this.formFields.map(field => html`
              <div class="form-field">
                <label for=${field.id}>
                  ${field.label}
                  ${field.required ? html`<span class="required">*</span>` : ''}
                </label>
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

        <confirm-dialog
          ?open=${this.showConfirmDialog}
          title="Update Employee"
          message=${`Are you sure you want to update ${this.employee.firstName} ${this.employee.lastName}'s information?`}
          confirmText="Update"
          cancelText="Cancel"
          @dialog-confirmed=${() => {
            this._dispatchEmployeeEvent('employee-updated');
            this.showConfirmDialog = false;
          }}
          @dialog-cancelled=${() => {
            this.showConfirmDialog = false;
          }}
        ></confirm-dialog>
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