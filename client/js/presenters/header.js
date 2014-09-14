'use strict';

var $           = require('jquery')
  , _           = require('underscore')
  , Backbone    = require('backbone')
  , Marionette  = require('backbone.marionette')
  , Mquc        = require('../mquc')
  , Template    = require('../templates/header.jade');

module.exports = Backbone.Marionette.LayoutView.extend({

  template : Template,

  ui : {
    home    : '.nav-home',
    players : '.nav-players',
    player  : '.nav-players',
    club    : '.nav-club',
    spinner : '.spinner'
  },

  initialize: function() {
    Mquc.vent.on('header:toggleSpinner', _.bind( this.toggleSpinner, this));
    Mquc.Router.on('route', _.bind( this.updateRoute, this));
  },

  onRender: function() {
    this.updateRoute();
  },

  updateRoute: function(route) {
    route = this.ui[route] ? route : 'home';
    this.setSelectedClass(route);
  },

  setSelectedClass: function(route) {
    this.$('li a').removeClass('selected');
    this.ui[route].addClass('selected');
  },

  toggleSpinner: function(show) {
    var spinner = (show ? this.ui.spinner.removeClass('hide') : this.ui.spinner.addClass('hide'));
    return spinner;
  }

});
