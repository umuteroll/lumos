import { css } from 'lit';

export const employeeTableStyles = css`
  .table-container {
    overflow-x: auto;
  }

  .table-view {
    width: 100%;
    border-collapse: collapse;
    background: white;
  }

  .table-view th,
  .table-view td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }

  .table-view th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #666;
    position: sticky;
    top: 0;
  }

  .table-view tr:hover {
    background-color: #f8f9fa;
  }

  .checkbox {
    width: 18px;
    height: 18px;
    border: 2px solid #ddd;
    border-radius: 3px;
  }

  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .icon-button {
    background: none;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    color: #666;
  }

  .icon-button:hover {
    color: #ff6b35;
  }
`; 