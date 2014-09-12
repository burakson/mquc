'use strict';

var Marionette = require('backbone.marionette')
  , Template   = require('../templates/players.jade')
  , PlayerTemplate = require('../templates/player.jade')
  , Player     = Marionette.ItemView.extend({ template: PlayerTemplate})
  , Mquc       = require('../mquc');

module.exports = Marionette.CompositeView.extend({

  childView: Player,

  childViewContainer: '.playerlist',

  regions : {
    'stage' : '.player-stage'
  },

  template: Template,

  initialize: function() {},

  onRender: function() {
    Mquc.vent.trigger('header:toggleSpinner', false);
  }

});
