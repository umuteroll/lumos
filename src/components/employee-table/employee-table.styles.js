import { css } from 'lit';

export const employeeTableStyles = css`
  :host {
    display: block;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
  }

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #666;
    white-space: nowrap;
  }

  tr:hover {
    background-color: #f8f9fa;
  }

  .checkbox {
    width: 18px;
    height: 18px;
    border: 2px solid #ddd;
    border-radius: 3px;
    cursor: pointer;
  }

  .actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }

  .edit-button, .delete-button {
    padding: 6px;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    border-radius: 4px;
  }

  .edit-button:hover {
    color: #007bff;
    background-color: rgba(0, 123, 255, 0.1);
  }

  .delete-button:hover {
    color: #dc3545;
    background-color: rgba(220, 53, 69, 0.1);
  }

  .search-bar {
    padding: 16px;
    background: white;
    border-bottom: 1px solid #e0e0e0;
  }

  .search-bar input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }

  .search-bar input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  .header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: white;
    border-bottom: 1px solid #e0e0e0;
  }

  .view-controls {
    display: flex;
    gap: 8px;
  }

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
  }

  button.primary {
    background-color: #007bff;
    color: white;
  }

  button.secondary {
    background-color: #e9ecef;
    color: #495057;
  }

  button:hover {
    opacity: 0.9;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background: white;
    border-top: 1px solid #e0e0e0;
  }

  .pagination button {
    padding: 6px 12px;
  }

  .pagination span {
    color: #666;
  }
`; 