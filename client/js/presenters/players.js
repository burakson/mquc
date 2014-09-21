'use strict';

var _           = require('underscore')
  , Backbone    = require('backbone')
  , Marionette  = require('backbone.marionette')
  , Mquc        = require('../mquc')
  , Template    = require('../templates/players.jade')
  , PlayerModel = require('../models/player')
  , Playerlist  = require('./playerlist')
  , PlayerStage = require('./playerstage');

module.exports = Marionette.LayoutView.extend({

  regions: {
    stage : '.playerstage',
    list  : '.playerlist'
  },

  template: Template,

  initialize: function() {
    var player;

    if ( this.options.playerId ) {
      player = this.collection.get(this.options.playerId);
    }

    this.PlayerlistView = new Playerlist({
      collection: this.collection
    });

    this.PlayerStage = new PlayerStage({
      model: player
    });
  },

  onRender: function() {
    this.stage.show(this.PlayerStage);
    this.list.show(this.PlayerlistView);

    Mquc.vent.trigger('header:toggleSpinner', false);
  }

});
