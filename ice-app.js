/**
 * Copyright 2025 Jericho P. Reyes
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

// Import the supporting components
import "./lib/cost-input.js";
import "./lib/team-summary.js";

/**
 * `ice-planner`
 * A web component for calculating ice hockey team costs per player
 * 
 * @demo index.html
 * @element ice-planner
 */
export class IcePlanner extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ice-planner";
  }

  constructor() {
    super();
    
    // Try to load from URL, otherwise use defaults
    this.loadFromURL();
    
    // Initialize translation object if it doesn't exist
    if (!this.t) {
      this.t = {};
    }
    this.t.title = "Ice Hockey Team Cost Calculator";
    this.t.teamName = "Team Name";
    this.t.iceCost = "Ice Cost per Hour ($)";
    this.t.hours = "Number of Hours";
    this.t.coachCost = "Coach Cost ($)";
    this.t.jerseysCost = "Jerseys Cost ($)";
    this.t.transitionPercent = "Transition Fee (%)";
    this.t.transitionFixed = "Fixed Transition Fee ($)";
    this.t.numberOfPlayers = "Number of Players";
    this.t.calculate = "Calculate Cost";
    this.t.costPerPlayer = "Cost per Player";
    this.t.clear = "Clear All";
    this.t.toggleDarkMode = "Toggle Dark Mode";
    this.t.shareResults = "Share Results";
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ice-planner.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Check if URL has parameters
  hasURLParameters() {
    const params = new URLSearchParams(window.location.search);
    return params.has('teamName') || params.has('iceCost') || params.has('players');
  }

  // Load values from URL
  loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Get values from URL or use defaults
    this.teamName = params.get('teamName') || "";
    this.iceCostPerHour = parseFloat(params.get('iceCost')) || 0;
    this.hours = parseFloat(params.get('hours')) || 0;
    this.coachCost = parseFloat(params.get('coachCost')) || 0;
    this.jerseysCost = parseFloat(params.get('jerseys')) || 0;
    this.transitionPercent = parseFloat(params.get('transitionPercent')) || 0;
    this.transitionFixed = parseFloat(params.get('transitionFixed')) || 0.99;
    this.numberOfPlayers = parseInt(params.get('players')) || 1;
    this.costPerPlayer = parseFloat(params.get('costPerPlayer')) || 0;
    this.isDarkMode = params.get('darkMode') === 'true';
    
    // Turn on dark mode if needed
    if (this.isDarkMode) {
      this.classList.add('dark-mode');
    }
  }

  // Create shareable URL
  createShareURL() {
    const params = new URLSearchParams();
    
    // Add values to URL if they exist
    if (this.teamName) params.set('teamName', this.teamName);
    if (this.iceCostPerHour > 0) params.set('iceCost', this.iceCostPerHour.toString());
    if (this.hours > 0) params.set('hours', this.hours.toString());
    if (this.coachCost > 0) params.set('coachCost', this.coachCost.toString());
    if (this.jerseysCost > 0) params.set('jerseys', this.jerseysCost.toString());
    if (this.transitionPercent > 0) params.set('transitionPercent', this.transitionPercent.toString());
    if (this.transitionFixed !== 0.99) params.set('transitionFixed', this.transitionFixed.toString());
    if (this.numberOfPlayers !== 1) params.set('players', this.numberOfPlayers.toString());
    if (this.costPerPlayer > 0) params.set('costPerPlayer', this.costPerPlayer.toString());
    if (this.isDarkMode) params.set('darkMode', 'true');
    
    // Build the full URL
    return window.location.origin + window.location.pathname + '?' + params.toString();
  }

  // Share results button clicked
  shareResults() {
    const shareURL = this.createShareURL();
    
    // Try to copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareURL);
      alert('Link copied to clipboard!');
    } else {
      // Show the link if clipboard doesn't work
      prompt('Copy this link:', shareURL);
    }
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      teamName: { type: String },
      iceCostPerHour: { type: Number },
      hours: { type: Number },
      coachCost: { type: Number },
      jerseysCost: { type: Number },
      transitionPercent: { type: Number },
      transitionFixed: { type: Number },
      numberOfPlayers: { type: Number },
      costPerPlayer: { type: Number },
      isDarkMode: { type: Boolean }
    };
  }


  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background: var(--ddd-theme-default-gradient-hero);
        font-family: var(--ddd-font-primary);
        min-height: 100vh;
        padding: var(--ddd-spacing-4);
      }
      
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: var(--ddd-spacing-4);
        background-color: rgba(2,2,2,0.3);
        border-radius: var(--ddd-radius-md);
        box-shadow: var(--ddd-boxShadow-sm);
      }
      
      h1 {
        text-align: center;
        color: var(--ddd-theme-primary);
        font-size: var(--ddd-font-size-xl);
        margin-bottom: var(--ddd-spacing-6);
        font-weight: var(--ddd-font-weight-bold);
      }
      
      .form-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--ddd-spacing-4);
        margin-bottom: var(--ddd-spacing-6);
      }
      
      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--ddd-spacing-4);
      }
      
      .full-width {
        grid-column: 1 / -1;
      }
      
      /* Input styling for visibility and hover effects - targeting actual input elements */
      cost-input #input {
        border: 2px solid var(--ddd-theme-default-white);
        border-radius: var(--ddd-radius-sm);
        padding: var(--ddd-spacing-2);
        background-color: var(--ddd-theme-default-limestoneLight);
        transition: all 0.3s ease;
        color: #2c2c2c;
      }
      
      cost-input #input:hover {
        border-color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-bg-accent);
        box-shadow: var(--ddd-boxShadow-sm);
      }
      
      cost-input #input:focus {
        border-color: var(--ddd-theme-accent);
        box-shadow: 0 0 0 3px var(--ddd-theme-accent-light);
        outline: none;
      }
      
      .button-group {
        display: flex;
        gap: var(--ddd-spacing-4);
        justify-content: center;
        margin: var(--ddd-spacing-6) 0;
      }
      
      button {
        background-color: var(--ddd-theme-primary);
        color: var(--ddd-theme-bg-primary);
        border: 1px solid var(--ddd-theme-default-shrineLight);
        padding: var(--ddd-spacing-3) var(--ddd-spacing-6);
        border-radius: var(--ddd-radius-sm);
        font-size: var(--ddd-font-weight-regular);
        font-weight: var(--ddd-font-weight-medium);
        cursor: pointer;
        transition: all 0.3s ease;
        min-width: 110px;
      }
      
      button:hover {
        background-color: var(--ddd-theme-accent);
        transform: translateY(-2px);
        box-shadow: var(--ddd-boxShadow-sm);
      }
      
      button:active {
        transform: translateY(0);
      }
      
      button.secondary {
        background-color: var(--ddd-theme-primary);
        color: var(--ddd-theme-bg-primary);
        border: 2px solid var(--ddd-theme-default-shrineLight);
      }
      
      button.secondary:hover {
        background-color: var(--ddd-theme-primary);
        color: var(--ddd-theme-bg-primary);
      }
      
      /* Mobile responsive design */
      @media (max-width: 768px) {
        :host {
          padding: var(--ddd-spacing-2);
        }
        
        .container {
          padding: var(--ddd-spacing-3);
        }
        
        .form-row {
          grid-template-columns: 1fr;
        }
        
        h1 {
          font-size: var(--ddd-font-size-lg);
        }
        
        .button-group {
          flex-direction: column;
          align-items: center;
          gap: var(--ddd-spacing-2);
        }
        
        button {
          width: 100%;
          max-width: 200px;
        }
      }
      
      @media (max-width: 480px) {
        h1 {
          font-size: var(--ddd-font-size-md);
        }
      }
      
     
      
      /* Custom dark mode styles */
      :host(.dark-mode) {
        background: var(--ddd-theme-default-gradient-hero);
        color: white;
      }
      
      :host(.dark-mode) .container {
        background-color: var(--ddd-theme-default-white);
        color: black;
      }
      
      :host(.dark-mode) h1 {
        color: black;
      }
      
      /* Dark mode invert colors */
      :host(.dark-mode) button {
        background-color: var(--ddd-theme-bg-primary);
        color: var(--ddd-theme-primary);
        border-color: var(--ddd-theme-primary);
      }
      
      :host(.dark-mode) button:hover {
        background-color: var(--ddd-theme-primary);
        color: var(--ddd-theme-bg-primary);
        border-color: var(--ddd-theme-bg-primary);
      }
      
      :host(.dark-mode) button.secondary {
        background-color: var(--ddd-theme-primary);
        color: var(--ddd-theme-bg-primary);
        border-color: var(--ddd-theme-bg-primary);
      }
      
      :host(.dark-mode) button.secondary:hover {
        background-color: var(--ddd-theme-bg-primary);
        color: var(--ddd-theme-primary);
        border-color: var(--ddd-theme-primary);
      }
      
      /* Dark mode input styling - targeting actual input elements */
      :host(.dark-mode) cost-input input {
        border-color: #666;
        background-color: #f5f5f5;
      }
      
      :host(.dark-mode) cost-input input:hover {
        border-color: #999;
        background-color: #fff;
        box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
      }
      
      :host(.dark-mode) cost-input input:focus {
        border-color: #ccc;
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
      }
    `];
  }

  // Calculate cost per player
  calculateCost() {
    if (this.numberOfPlayers <= 0) {
      this.costPerPlayer = 0;
      return;
    }
    
    // Formula: ((ice cost * hours) + coach cost + jerseys cost) * (1 + transition %) + transition fixed) / players
    const totalIceCost = this.iceCostPerHour * this.hours;
    const subtotal = totalIceCost + this.coachCost + this.jerseysCost;
    const withTransitionPercent = subtotal * (1 + (this.transitionPercent / 100));
    const totalCost = withTransitionPercent + this.transitionFixed;
    this.costPerPlayer = totalCost / this.numberOfPlayers;
  }
  
  // Clear all form data
  clearForm() {
    this.teamName = "";
    this.iceCostPerHour = 0;
    this.hours = 0;
    this.coachCost = 0;
    this.jerseysCost = 0;
    this.transitionPercent = 0;
    this.transitionFixed = 0.99;
    this.numberOfPlayers = 1;
    this.costPerPlayer = 0;
  }
  

  handleInputChange(field, event) {

    const inputValue = event.detail.value;
    
    // Check if this is the team name field (text input)
    if (field === 'teamName') {
      this[field] = inputValue;
    } else {
      // For all number fields, convert text to number
      const numberValue = parseFloat(inputValue);
      
      // If conversion failed, use 0 instead
      if (isNaN(numberValue)) {
        this[field] = 0;
      } else {
        this[field] = numberValue;
      }
    }
    
    // Special rule: number of players must be at least 1
    if (field === 'numberOfPlayers' && this[field] < 1) {
      this[field] = 1;
    }
    
 
  }
  
  // Toggle dark mode
  darkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.classList.add('dark-mode');
    } else {
      this.classList.remove('dark-mode');
    }
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="container">
        <h1>${this.t.title}</h1>
        
        <div class="form-grid">
          <cost-input 
            class="full-width"
            label="${this.t.teamName}"
            .value="${this.teamName}"
            @value-changed="${(e) => this.handleInputChange('teamName', e)}"
          ></cost-input>
          
          <div class="form-row">
            <cost-input 
              label="${this.t.iceCost}"
              .value="${this.iceCostPerHour.toString()}"
              @value-changed="${(e) => this.handleInputChange('iceCostPerHour', e)}"
            ></cost-input>
            
            <cost-input 
              label="${this.t.hours}"
              .value="${this.hours.toString()}"
              @value-changed="${(e) => this.handleInputChange('hours', e)}"
            ></cost-input>
          </div>
          
          <div class="form-row">
            <cost-input 
              label="${this.t.coachCost}"
              .value="${this.coachCost.toString()}"
              @value-changed="${(e) => this.handleInputChange('coachCost', e)}"
            ></cost-input>
            
            <cost-input 
              label="${this.t.jerseysCost}"
              .value="${this.jerseysCost.toString()}"
              @value-changed="${(e) => this.handleInputChange('jerseysCost', e)}"
            ></cost-input>
          </div>
          
          <div class="form-row">
            <cost-input 
              label="${this.t.transitionPercent}"
              .value="${this.transitionPercent.toString()}"
              @value-changed="${(e) => this.handleInputChange('transitionPercent', e)}"
            ></cost-input>
            
            <cost-input 
              label="${this.t.transitionFixed}"
              .value="${this.transitionFixed.toString()}"
              @value-changed="${(e) => this.handleInputChange('transitionFixed', e)}"
            ></cost-input>
          </div>
          
          <cost-input 
            class="full-width"
            label="${this.t.numberOfPlayers}"
            .value="${this.numberOfPlayers.toString()}"
            @value-changed="${(e) => this.handleInputChange('numberOfPlayers', e)}"
          ></cost-input>
        </div>
        
        <div class="button-group">
          <button @click="${this.calculateCost}">${this.t.calculate}</button>
          <button class="secondary" @click="${this.clearForm}">${this.t.clear}</button>
          <button @click="${this.shareResults}">${this.t.shareResults}</button>
          <button @click="${this.darkMode}">${this.t.toggleDarkMode}</button>
        </div>
        
        <team-summary 
          .teamName="${this.teamName}"
          .costPerPlayer="${this.costPerPlayer}"
          .numberOfPlayers="${this.numberOfPlayers}"
        ></team-summary>
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

globalThis.customElements.define(IcePlanner.tag, IcePlanner);
