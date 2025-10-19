/**
 * Copyright 2025 Jericho P. Reyes
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `cost-input`
 * A reusable input component for the ice planner with DDD styling
 * 
 * @element cost-input
 */
export class CostInput extends DDDSuper(LitElement) {
  
  static get tag() {
    return "cost-input";
  }

  constructor() {
    super();
    this.label = "";
    this.value = "";
    /** 
     * @type {"hidden"|"text"|"search"|"tel"|"url"|"email"|"password"|"datetime"|"date"|"month"|"week"|"time"|"datetime-local"|"number"|"range"|"color"|"checkbox"|"radio"|"file"|"submit"|"image"|"reset"|"button"}
     */
    this.type = "text";
    this.min = "";
    this.max = "";
    this.step = "";
    this.placeholder = "";
    this.required = false;
    this.disabled = false;
  }

  // Lit reactive properties
  static get properties() {
    return {
      /**
       * @type {"hidden"|"text"|"search"|"tel"|"url"|"email"|"password"|"datetime"|"date"|"month"|"week"|"time"|"datetime-local"|"number"|"range"|"color"|"checkbox"|"radio"|"file"|"submit"|"image"|"reset"|"button"}
       */
      type: { type: String },
      label: { type: String },
      value: { type: String },
      type: { type: String },
      min: { type: String },
      max: { type: String },
      step: { type: String },
      placeholder: { type: String },
      required: { type: Boolean },
      disabled: { type: Boolean }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }
      
      .input-container {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-2);
      }
      
      label {
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-medium);
        color: var(--ddd-theme-primary);
        margin-bottom: var(--ddd-spacing-1);
      }
      
      input {
        width: 100%;
        padding: var(--ddd-spacing-3);
        border: 2px solid var(--ddd-theme-default);
        border-radius: var(--ddd-radius-sm);
        font-size: var(--ddd-font-size-s);
        font-family: var(--ddd-font-primary);
        background-color: var(--ddd-theme-bg-primary);
        color: var(--ddd-theme-primary);
        transition: all 0.3s ease;
        box-sizing: border-box;
      }
      
      input:focus {
        outline: none;
        border-color: var(--ddd-theme-accent);
        box-shadow: 0 0 0 3px var(--ddd-theme-accent-transparent, rgba(var(--ddd-theme-accent-rgb, 0, 123, 255), 0.25));
      }
      
      input:hover:not(:disabled) {
        border-color: var(--ddd-theme-primary);
      }
      
      input:disabled {
        background-color: var(--ddd-theme-default);
        color: var(--ddd-theme-disabled);
        cursor: not-allowed;
        opacity: 0.6;
      }
      
      input[type="number"] {
        -moz-appearance: textfield;
      }
      
      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      
      /* Required indicator */
      label.required::after {
        content: " *";
        color: var(--ddd-theme-error, #d32f2f);
      }
      
      /* Error states */
      input:invalid {
        border-color: var(--ddd-theme-error, #d32f2f);
      }
      
      input:invalid:focus {
        box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.25);
      }
      
      /* Dark mode support - handled automatically by DDD CSS variables */
    `];
  }

  // Handle input changes
  _handleInput(e) {
    const value = e.target.value;
    this.value = value;
    
    // Dispatch custom event for parent components
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: {
        value: value,
        type: this.type
      },
      bubbles: true,
      composed: true
    }));
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="input-container">
        <label class="${this.required ? 'required' : ''}" for="input">
          ${this.label}
        </label>
        <input
          id="input"
          type="${this.type}"
          .value="${this.value}"
          min="${this.min}"
          max="${this.max}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          ?disabled="${this.disabled}"
          @input="${this._handleInput}"
        />
      </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CostInput.tag, CostInput);