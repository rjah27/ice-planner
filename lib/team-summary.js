/**
 * Copyright 2025 Jericho P. Reyes
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `team-summary`
 * A component to display the calculated cost summary for the ice hockey team
 * 
 * @element team-summary
 */
export class TeamSummary extends DDDSuper(I18NMixin(LitElement)) {
  
  static get tag() {
    return "team-summary";
  }

  constructor() {
    super();
    this.teamName = "";
    this.costPerPlayer = 0;
    this.numberOfPlayers = 1;
    
    this.t = this.t || {};
    this.t = {
      ...this.t,
      summary: "Team Cost Summary",
      teamName: "Team Name",
      costPerPlayer: "Cost per Player",
      totalTeamCost: "Total Team Cost",
      numberOfPlayers: "Number of Players",
      noTeamName: "Enter team name above",
      currency: "$"
    };
    
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/team-summary.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      teamName: { type: String },
      costPerPlayer: { type: Number },
      numberOfPlayers: { type: Number }
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
      
      .summary-container {
        background-color: var(--ddd-theme-bg-secondary, var(--ddd-theme-bg-primary));
        border: 2px solid var(--ddd-theme-accent);
        border-radius: var(--ddd-radius-md);
        padding: var(--ddd-spacing-6);
        margin-top: var(--ddd-spacing-4);
        box-shadow: var(--ddd-boxShadow-sm);
      }
      
      .summary-header {
        text-align: center;
        color: var(--ddd-theme-primary);
        font-size: var(--ddd-font-size-lg);
        font-weight: var(--ddd-font-weight-bold);
        margin-bottom: var(--ddd-spacing-4);
        border-bottom: 2px solid var(--ddd-theme-accent);
        padding-bottom: var(--ddd-spacing-2);
      }
      
      .summary-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--ddd-spacing-4);
        margin-bottom: var(--ddd-spacing-4);
      }
      
      .summary-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: var(--ddd-spacing-3);
        background-color: var(--ddd-theme-bg-primary);
        border-radius: var(--ddd-radius-sm);
        border: 1px solid var(--ddd-theme-default);
      }
      
      .summary-label {
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-medium);
        color: var(--ddd-theme-primary);
        margin-bottom: var(--ddd-spacing-1);
        text-align: center;
      }
      
      .summary-value {
        font-size: var(--ddd-font-size-md);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-accent);
        text-align: center;
      }
      
      .cost-highlight {
        font-size: var(--ddd-font-size-xl);
        color: var(--ddd-theme-primary);
      }
      
      .team-name-display {
        grid-column: 1 / -1;
        text-align: center;
        background: linear-gradient(135deg, var(--ddd-theme-primary) 0%, var(--ddd-theme-accent) 100%);
        color: var(--ddd-theme-bg-primary);
        border-radius: var(--ddd-radius-sm);
        padding: var(--ddd-spacing-4);
        margin-bottom: var(--ddd-spacing-2);
      }
      
      .team-name-display .summary-label {
        color: var(--ddd-theme-bg-primary);
        opacity: 0.9;
      }
      
      .team-name-display .summary-value {
        color: var(--ddd-theme-bg-primary);
        font-size: var(--ddd-font-size-lg);
        margin-top: var(--ddd-spacing-2);
      }
      
      .no-calculation {
        text-align: center;
        color: var(--ddd-theme-secondary, var(--ddd-theme-primary));
        font-style: italic;
        opacity: 0.7;
        padding: var(--ddd-spacing-4);
      }
      
      .total-cost-item {
        grid-column: 1 / -1;
        background: linear-gradient(135deg, var(--ddd-theme-accent) 0%, var(--ddd-theme-primary) 100%);
        color: var(--ddd-theme-bg-primary);
        border: none;
        margin-top: var(--ddd-spacing-2);
      }
      
      .total-cost-item .summary-label,
      .total-cost-item .summary-value {
        color: var(--ddd-theme-bg-primary);
      }
      
      /* Mobile responsive design */
      @media (max-width: 768px) {
        .summary-grid {
          grid-template-columns: 1fr;
        }
        
        .team-name-display {
          grid-column: 1;
        }
        
        .total-cost-item {
          grid-column: 1;
        }
        
        .summary-header {
          font-size: var(--ddd-font-size-md);
        }
      }
      
      /* Accessibility improvements */
      @media (prefers-reduced-motion: reduce) {
        * {
          transition: none;
        }
      }
      
      /* Dark mode support - handled automatically by DDD CSS variables */
    `];
  }

  // Format currency
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  // Calculate total team cost
  get totalTeamCost() {
    return this.costPerPlayer * this.numberOfPlayers;
  }

  // Lit render the HTML
  render() {
    const hasCalculation = this.costPerPlayer > 0 || this.teamName.trim() !== "";
    const displayTeamName = this.teamName.trim() || this.t.noTeamName;
    
    return html`
      <div class="summary-container">
        <div class="summary-header">
          ${this.t.summary}
        </div>
        
        ${hasCalculation ? html`
          <div class="summary-grid">
            <div class="summary-item team-name-display">
              <div class="summary-label">${this.t.teamName}</div>
              <div class="summary-value">${displayTeamName}</div>
            </div>
            
            <div class="summary-item">
              <div class="summary-label">${this.t.numberOfPlayers}</div>
              <div class="summary-value">${this.numberOfPlayers}</div>
            </div>
            
            <div class="summary-item">
              <div class="summary-label">${this.t.costPerPlayer}</div>
              <div class="summary-value cost-highlight">
                ${this.formatCurrency(this.costPerPlayer)}
              </div>
            </div>
            
            <div class="summary-item total-cost-item">
              <div class="summary-label">${this.t.totalTeamCost}</div>
              <div class="summary-value cost-highlight">
                ${this.formatCurrency(this.totalTeamCost)}
              </div>
            </div>
          </div>
        ` : html`
          <div class="no-calculation">
            Enter team information above to see cost calculations
          </div>
        `}
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

globalThis.customElements.define(TeamSummary.tag, TeamSummary);