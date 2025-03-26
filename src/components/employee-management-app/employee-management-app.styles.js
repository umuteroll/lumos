import { css } from 'lit';

export const employeeManagementStyles = css`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: white;
    border-radius: 12px;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .header h1 {
    margin: 0;
    color: #333;
    font-size: 24px;
    font-weight: 600;
  }

  .header-content {
    display: flex;
    align-items: center;
  }

  .header-actions {
    display: flex;
    align-items: center;
    margin-left: 38px;
  }

  .view-controls {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
    color: #666;
  }

  .icon-button svg {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
  }

  .icon-button:hover {
    background: rgba(237, 108, 45, 0.1);
    color: rgb(237, 108, 45);
  }

  .icon-button:hover svg {
    transform: scale(1.1);
  }

  .icon-button.primary {
    background: rgb(237, 108, 45);
    color: white;
    padding: 8px;
  }

  .icon-button.primary:hover {
    background: rgb(220, 100, 40);
  }

  .search-container {
    position: relative;
    width: 300px;
  }

  .search-input {
    width: 200px;
    padding: 8px 36px 8px 36px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 14px;
    transition: all 0.2s ease;
    background: #f8f9fa;
  }

  .search-input:focus {
    outline: none;
    border-color: rgb(237, 108, 45);
    box-shadow: 0 0 0 3px rgba(237, 108, 45, 0.1);
    background: white;
  }

  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: #666;
  }
`; 