import { css } from 'lit';

export const navMenuStyles = css`
  :host {
    display: block;
  }

  .nav-menu {
    background: var(--surface-color, #ffffff);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 1rem;
  }

  li {
    margin: 0;
  }

  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: var(--text-color, #333);
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    background: var(--hover-color, #f5f5f5);
  }

  .nav-link.active {
    background: rgb(237, 108, 45);
    color: white;
  }

  .icon {
    margin-right: 0.75rem;
    font-size: 1.2em;
  }
`;
