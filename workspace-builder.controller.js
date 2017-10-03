const config = require('config.js');  // has option config.appName

class WorkspaceBuilderController {
  constructor($sce, SymphonyService) {
    this.SymphonyService = SymphonyService;
    this.$sce = $sce;

    this.widgetList = this.widgetConfig();
    this.activeTab = 0;

    this.themes = [ 'fts-light', 'fts-dark' ];
    this.selectedTheme = this.themes[0];
  }

  /**
   * @returns an already-instanciated SymphonyWorkspaceBuilder object
   */
  get _workspaceBuilder() {
    return this.SymphonyService.getWorkspaceBuilder();
  }

  show() {
    const url = this.generateUrl();
    if (!url) {
      return;
    }
    this._workspaceBuilder.show({
      url: url,
      title: this.widgetList[this.selectedWidget].name
    });
  }

  generateSceUrl() {
    // for Angular iframes
    return this.$sce.trustAsResourceUrl(this.generateUrl());
  }

  generateUrl() {
    if (this.selectedWidget === undefined)
      return;

    const widget = this.widgetList[this.selectedWidget];

    let root = window.location.protocol + '//' + window.location.host;
    root += '/widgets/' + widget.id;

    let hasOptions = false;
    for (let option in this.activeOptions) {
      if (this.activeOptions.hasOwnProperty(option) && this.activeOptions[option] !== null) {
        if (hasOptions) {
          root += '&';
        }
        else {
          root += '?';
          hasOptions = true;
        }
        root += option + '=' + encodeURIComponent(this.activeOptions[option]);
      }
    }
    root += (hasOptions ? '&' : '?') + 'noauth';
    if (this.selectedTheme)
      root += '&theme=' + this.selectedTheme;

    return root;
  }

  /**
   * Might grab these configurations from an API
   */
  widgetConfig() {
    return [
      {
        id: 'trending-events', name: 'Event Stream',
        options: [
          { name: 'card', type: 'bool' },
          { name: 'type', type: 'select', options: [ 'company', 'exec', 'region', 'topic'] }
        ]
      },
      {
        id: 'fx-widget', name: 'FX Widget',
        options: [
          { name: 'card', type: 'bool' }
        ]
      },
      {
        id: 'market-futures-widget', name: 'Market Futures Widget',
        options: [
          { name: 'card', type: 'bool' }
        ]
      },
      {
        id: 'global-news-hotspots', name: 'Global News Hotspots',
        options: [
          { name: 'card', type: 'bool' },
          { name: 'height' }
        ]
      },
      {
        id: 'us-news-hotspots', name: 'U.S. News Hotspots',
        options: [
          { name: 'card', type: 'bool' },
          { name: 'height' }
        ]
      },
      {
        id: 'trending-sources', name: 'Trending Sources',
        options: [
          { name: 'card', type: 'bool' }
        ]
      },
      {
        id: 'trending-entities', name: 'Trending Entities',
        options: [
          { name: 'card', type: 'bool' },
          { name: 'type', type: 'select', options: [ 'company', 'exec', 'region', 'topic'] }
        ]
      },
      {
        id: 'trending-news', name: 'Trending News',
        options: [
          { name: 'card', type: 'bool' },
          { name: 'entities' }
        ]
      },
      {
        id: 'entity-media-coverage', name: 'Entity Media Coverage',
        options: [
          { name: 'card', type: 'bool' },
          { name: 'id' },
          { name: 'symbol' },
          { name: 'searcher', type: 'bool' }
        ]
      },
      {
        id: 'entity-events', name: 'Entity Events',
        options: [
          { name: 'card', type: 'bool' },
          { name: 'id' },
          { name: 'symbol' },
          { name: 'searcher', type: 'bool' }
        ]
      },
      {
        id: 'entity-associations', name: 'Entity Relationship Graph',
        options: [
          { name: 'navigation' },
          { name: 'id' },
          { name: 'symbol' },
          { name: 'date' },
          { name: 'searcher', type: 'bool' }
        ]
      },
      {
        id: 'entity-comention-word-cloud', name: 'Entity Word Cloud',
        options: [
          { name: 'card', type: 'bool' },
          { name: 'count' },
          { name: 'start' },
          { name: 'end' },
          { name: 'ids' }
        ]
      },
      {
        id: 'entity-news', name: 'Entity News',
        options: [
          { name: 'count' },
          { name: 'card', type: 'bool' },
          { name: 'id' },
          { name: 'symbol' },
          { name: 'symbols' },
          { name: 'filters' },
          { name: 'controls' },
          { name: 'display' },
          { name: 'title' }
        ]
      },
      {
        id: 'entity-profile', name: 'Entity Profile',
        options: [
          { name: 'symbol' }
        ]
      },
      {
        id: 'entity-quote', name: 'Entity Quote',
        options: [
          { name: 'symbol' }
        ]
      },
      {
        id: 'entity-options', name: 'Entity Options',
        options: [
          { name: 'symbol' }
        ]
      },
      {
        id: 'entity-analyst', name: 'Entity Analyst',
        options: [
          { name: 'symbol' }
        ]
      },
      {
        id: 'entity-corporate-events', name: 'Entity Corporate Events',
        options: [
          { name: 'symbol' }
        ]
      },
      {
        id: 'entity-filings', name: 'Entity Filings',
        options: [
          { name: 'symbol' }
        ]
      },
      {
        id: 'entity-insiders', name: 'Entity Insiders',
        options: [
          { name: 'symbol' }
        ]
      },
      {
        id: 'entity-charting', name: 'Entity Charting',
        options: [
          { name: 'symbol' }
        ]
      },
      {
        id: 'entity-shares', name: 'Entity Share Information',
        options: [
          { name: 'symbol' }
        ]
      },
      {
        id: 'entity-trades', name: 'Entity Trades Information',
        options: [
          { name: 'symbol' }
        ]
      },
      {
        id: 'entity-history', name: 'Entity Pricing History',
        options: [
          { name: 'symbol' }
        ]
      },
      {
        id: 'entity-financials', name: 'Entity Financials',
        options: [
          { name: 'symbol' }
        ]
      },
      {
        id: 'entity-earnings', name: 'Entity Earnings',
        options: [
          { name: 'symbol' }
        ]
      },
      {
        id: 'entity-ratios', name: 'Entity Key Ratios',
        options: [
          { name: 'symbol' }
        ]
      }
    ];
  }
}

angular.module(config.appName)
  .controller('WorkspaceBuilderController', WorkspaceBuilderController);
