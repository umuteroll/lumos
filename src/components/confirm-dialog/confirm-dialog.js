import { LitElement, html } from 'lit';
import { confirmDialogStyles } from './confirm-dialog.styles.js';

export class ConfirmDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    title: { type: String },
    message: { type: String },
    confirmText: { type: String },
    cancelText: { type: String }
  };

  static styles = confirmDialogStyles;

  constructor() {
    super();
    this.open = false;
    this.title = '';
    this.message = '';
    this.confirmText = 'Confirm';
    this.cancelText = 'Cancel';
  }

  render() {
    if (!this.open) return null;

    return html`
      <div class="dialog-backdrop" @click=${this._handleBackdropClick}>
        <div class="dialog-container" @click=${this._stopPropagation}>
          <div class="dialog-header">
            <h2>${this.title}</h2>
            <button class="close-button" @click=${this._cancel}>×</button>
          </div>
          <div class="dialog-content">
            <div class="warning-icon">⚠️</div>
            <p>${this.message}</p>
          </div>
          <div class="dialog-actions">
            <button class="secondary" @click=${this._cancel}>
              ${this.cancelText}
            </button>
            <button class="primary" @click=${this._confirm}>
              ${this.confirmText}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  _handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      this._cancel();
    }
  }

  _stopPropagation(e) {
    e.stopPropagation();
  }

  _cancel() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('dialog-cancelled', {
      bubbles: true,
      composed: true
    }));
  }

  _confirm() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('dialog-confirmed', {
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('confirm-dialog', ConfirmDialog); 