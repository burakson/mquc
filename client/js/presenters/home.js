'use strict';

var Backbone   = require('backbone')
  , Marionette = require('backbone.marionette')
  , Template   = require('../templates/home.jade')
  , Mquc       = require('../mquc');

module.exports = Backbone.Marionette.LayoutView.extend({

  template: Template,

  onRender: function() {
    Mquc.vent.trigger('header:toggleSpinner', false);
    if ( this.collection.length === 0 ) {
      // TODO: something went wrong
    }
  }

});
