'use strict';

var _           = require('underscore')
  , Marionette  = require('backbone.marionette')
  , Mquc        = require('../mquc')
  , Template    = require('../templates/player.jade')
  , Player      = Marionette.ItemView.extend({
      tagName: 'li',
      template: Template
    });

module.exports = Marionette.CollectionView.extend({

  tagName: 'ul',

  childView: Player,

  initialize: function() {
    Mquc.vent.on('player:added', _.bind( this.playerAdded, this));
  },

  onRender: function() {
    Mquc.vent.trigger('header:toggleSpinner', false);
  },

  playerAdded: function(playerModel) {
    this.collection.add(playerModel);
  }

});
