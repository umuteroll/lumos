import { css } from 'lit';

export const confirmDialogStyles = css`
  .dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
  }

  .dialog-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    width: 90%;
    max-width: 400px;
    animation: slideIn 0.3s ease;
  }

  .dialog-header {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dialog-header h2 {
    margin: 0;
    font-size: 1.25rem;
    color: rgb(237, 108, 45);
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #666;
    cursor: pointer;
    padding: 0.25rem;
    line-height: 1;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .close-button:hover {
    background: #f5f5f5;
    color: rgb(237, 108, 45);
  }

  .dialog-content {
    padding: 1.5rem;
    text-align: center;
  }

  .warning-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: rgb(237, 108, 45);
  }

  .dialog-content p {
    margin: 0;
    color: #666;
    line-height: 1.5;
  }

  .dialog-actions {
    padding: 1rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button.primary {
    background: rgb(237, 108, 45);
    color: white;
  }

  button.primary:hover {
    background: rgb(213, 97, 41);
  }

  button.secondary {
    background: #f5f5f5;
    color: #666;
  }

  button.secondary:hover {
    background: #eee;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    .dialog-container {
      width: 95%;
      margin: 1rem;
    }
  }
`; 