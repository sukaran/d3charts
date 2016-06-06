// Chart model with our data
var ChartModel = Backbone.Model.extend({
  // Default values for our view
  defaults: {
    // DIV number on page
    'el_num': 'one',
    // Location of data
    'csv': 'data/01_overdoses_2010-14-edit.csv',
    // Time value, x axis
    'chartable_columns': ['year'],
    // Lines in our line chart will correspond with these columns
    'chartable_values': ['Opioids', 'Psychoactive', 'Antiseizure', 'Cocaine and other narcotics', 'Other', 'Nonopioid pain killers'],
    // Columns with data that we only want to use in the tooltip
    'tooltip_columns': [],
    // Y scale domain
    'yscale_domain': [-5,100],
    'padding': [10, 30, 15, 35],
    'height': 0,
    'height-full': 250
  },

  initialize: function() {
    var hash = Backbone.history.getFragment();

    // Set DIV of chart
    this.set('el', '#svg-' + this.get('el_num') + '-container');
    
    // Set different heights for chart at different sizes
    this.set('height',this.defaults['height-full']);

    // if ( $(window).width() > 650) {
    //     this.set('height',this.defaults['height-full']);
    // } else {
    //     this.set('height',this.defaults['height-650']);
    // }
        
    // Ran if we are toggling charts
    if (hash !== '') {
      var hash_format = hash.replace('chart-','')

      // Set CSV link
      this.set('csv', 'data/' + hash_format + '.csv');
    }

    // Render chart view with custom options
    chartview = new LineChartView(this.attributes);
    pymChild = new pym.Child({ renderCallback: chartview.render()  });
  // Close initialize
  }
// Close model
});