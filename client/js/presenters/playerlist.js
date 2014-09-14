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

  onRender: function() {
    Mquc.vent.trigger('header:toggleSpinner', false);
  }

});
