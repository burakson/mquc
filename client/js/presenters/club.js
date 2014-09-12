'use strict';

var Backbone   = require('backbone')
  , Marionette = require('backbone.marionette')
  , Template   = require('../templates/club.jade')
  , Mcuq       = require('../mcuq');

module.exports = Backbone.Marionette.LayoutView.extend({

  template: Template,

  initialize: function() {
  },

  onRender: function() {
    Mcuq.vent.trigger('header:toggleSpinner', false);
  }

});
