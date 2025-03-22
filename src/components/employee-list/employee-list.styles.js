import { css } from 'lit';

export const employeeListStyles = css`
  .list-view {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .list-item {
    padding: 1rem;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    transition: box-shadow 0.2s ease;
  }

  .list-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .list-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .list-item-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.2rem;
  }

  .list-item-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .list-item-details p {
    margin: 0;
    color: #666;
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

  .checkbox-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .checkbox {
    width: 18px;
    height: 18px;
    border: 2px solid #ddd;
    border-radius: 3px;
  }
`; 