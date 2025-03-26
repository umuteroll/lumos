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
    color: rgb(237, 108, 45);
    white-space: nowrap;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
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
    transition: all 0.2s ease;
  }

  .checkbox:checked {
    background-color: rgb(237, 108, 45);
    border-color: rgb(237, 108, 45);
  }

  .actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }

  .icon-button {
    padding: 8px;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    position: relative;
  }

  .icon-button svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  .icon-button.edit {
    color: rgb(237, 108, 45);
  }

  .icon-button.edit:hover {
    background-color: rgba(237, 108, 45, 0.1);
  }

  .icon-button.edit:hover svg {
    transform: scale(1.1);
  }

  .icon-button.delete {
    color: #dc3545;
  }

  .icon-button.delete:hover {
    background-color: rgba(220, 53, 69, 0.1);
  }

  .icon-button.delete:hover svg {
    transform: scale(1.1);
  }

  .icon-button::after {
    content: attr(title);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 0.75rem;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
  }

  .icon-button:hover::after {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-4px);
  }

  td {
    font-size: 0.875rem;
    color: #666;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 8px 12px;
    }
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