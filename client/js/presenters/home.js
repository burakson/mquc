'use strict';

var Backbone   = require('backbone')
  , Marionette = require('backbone.marionette')
  , Template   = require('../templates/home.jade')
  , Mcuq       = require('../mcuq');

module.exports = Backbone.Marionette.LayoutView.extend({

  template: Template,

  onRender: function() {
    Mcuq.vent.trigger('header:toggleSpinner', false);
    if ( this.collection.length === 0 ) {
      // TODO: something went wrong
    }
  }

});
