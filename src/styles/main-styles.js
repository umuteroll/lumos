import { css } from 'lit';

export const mainStyles = css`
  :host {
    display: block;
    font-family: Arial, sans-serif;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
    border-bottom: 1px solid #e0e0e0;
  }

  .header h1 {
    margin: 0;
    color: #ff6b35;
    font-size: 1.5rem;
  }

  .view-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .search-bar {
    padding: 1rem;
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
  }

  .search-bar input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  .table-view {
    width: 100%;
    border-collapse: collapse;
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
  }

  .table-view tr:hover {
    background-color: #f8f9fa;
  }

  .list-view {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .list-item {
    padding: 1rem;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }

  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
  }

  button.primary {
    background-color: #ff6b35;
    color: white;
  }

  button.secondary {
    background-color: #e0e0e0;
    color: #333;
  }

  button:hover {
    opacity: 0.9;
  }

  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background: #fff;
    border-top: 1px solid #e0e0e0;
  }

  .checkbox {
    width: 18px;
    height: 18px;
    border: 2px solid #ddd;
    border-radius: 3px;
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