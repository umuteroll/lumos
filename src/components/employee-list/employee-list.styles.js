import { css } from 'lit';

export const employeeListStyles = css`
  .list-view {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .list-item {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.2s ease;
  }

  .list-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  .list-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
  }

  .list-item-header h3 {
    margin: 0;
    color: #333;
    font-size: 18px;
    font-weight: 600;
  }

  .list-item-content {
    padding: 20px;
  }

  .list-item-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .detail-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .detail-label {
    color: #666;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .detail-value {
    color: #333;
    font-size: 14px;
  }

  .action-buttons {
    display: flex;
    gap: 8px;
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
  }

  .icon-button:hover svg {
    transform: scale(1.1);
  }

  .icon-button.edit {
    color: rgb(237, 108, 45);
  }

  .icon-button.edit:hover {
    background: rgba(237, 108, 45, 0.1);
  }

  .icon-button.delete {
    color: #dc3545;
  }

  .icon-button.delete:hover {
    background: rgba(220, 53, 69, 0.1);
  }

  .checkbox-container {
    display: flex;
    align-items: center;
    gap: 12px;
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
`; 