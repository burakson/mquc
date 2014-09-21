'use strict';

var $          = require('jquery')
  , Backbone   = require('backbone')
  , Marionette = require('backbone.marionette')
  , Mquc       = require('./mquc')
  , Home       = require('./presenters/home')
  , Players    = require('./presenters/players')
  , Club       = require('./presenters/club')
  , ClubModel  = require('./models/club')
  , PlayersCollection = require('./collections/players')
  , NewsCollection = require('./collections/news');

module.exports = Backbone.Marionette.AppRouter.extend({

    routes: {
        ''              : 'home',
        'home'          : 'home',
        'players'       : 'players',
        'players/(:id)' : 'player',
        'club'          : 'club'
    },

    initialize: function() {},

    beforeRoute: function() {
      Mquc.vent.trigger('header:toggleSpinner', true);
    },

    home: function () {
      this.beforeRoute();

      var collection = new NewsCollection();

      $.when( collection.fetch() ).always(function() {
        Mquc.main.show( new Home({ collection : collection }) );
      });
    },

    players: function (id) {
      this.beforeRoute();
      var collection = new PlayersCollection();

      $.when( collection.fetch() ).always(function() {
        Mquc.main.show( new Players({ collection : collection }) );
      });
    },

    player: function(id) {
      this.beforeRoute();

      // Fire the event only if the route has changed through playerlist
      if ( typeof Mquc.main.currentView !== 'undefined' && Mquc.main.currentView.PlayerStage) {
        var player = Mquc.main.currentView.collection.get(id);
        Mquc.main.currentView.PlayerStage.model = player;
        Mquc.main.currentView.PlayerStage.render()
        return;
      }

      var collection = new PlayersCollection();

      $.when( collection.fetch() ).always(function() {
          Mquc.main.show( new Players({
            collection : collection,
            playerId   : id
          }));
      });
    },

    club: function (id) {
      this.beforeRoute();

      var model = new ClubModel();
      $.when( model.fetch() ).always(function() {
        Mquc.main.show(new Club({
          model: model
        }));
      });

    },

    showError: function() {

    }

});
