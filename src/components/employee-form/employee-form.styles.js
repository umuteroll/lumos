import { css } from 'lit';
import { mainStyles } from '../../styles/main-styles.js';

export const employeeFormStyles = [
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

    .field-container {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    label {
      font-weight: 500;
      color: #666;
    }

    .required {
      color: #dc3545;
      margin-left: 0.25rem;
    }

    input, select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: all 0.2s ease;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    input.error, select.error {
      border-color: #dc3545;
    }

    input.error:focus, select.error:focus {
      box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    button.primary {
      background: #007bff;
      color: white;
    }

    button.primary:hover:not(:disabled) {
      background: #0056b3;
    }

    button.secondary {
      background: #e9ecef;
      color: #495057;
    }

    button.secondary:hover:not(:disabled) {
      background: #dde2e6;
    }

    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `
]; 