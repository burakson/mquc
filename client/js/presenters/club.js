'use strict';

var Backbone   = require('backbone')
  , Marionette = require('backbone.marionette')
  , Template   = require('../templates/club.jade')
  , Mquc       = require('../mquc');

module.exports = Backbone.Marionette.LayoutView.extend({

  template: Template,

  initialize: function() {
  },

  onRender: function() {
    Mquc.vent.trigger('header:toggleSpinner', false);
  }

});
