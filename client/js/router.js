'use strict';

var $          = require('jquery')
  , Backbone   = require('backbone')
  , Marionette = require('backbone.marionette')
  , Mcuq       = require('./mcuq')
  , Home       = require('./presenters/home')
  , Players    = require('./presenters/players')
  // , Player     = require('./presenters/player')
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
      Mcuq.vent.trigger('header:toggleSpinner', true);
    },

    home: function () {
      this.beforeRoute();

      var collection = new NewsCollection();

      $.when( collection.fetch() ).done( function( ) {
        Mcuq.main.show( new Home({ collection : collection }) );
      });
    },

    players: function (id) {
      this.beforeRoute();
      var collection = new PlayersCollection();

      collection.fetch({
        success: function() {
          Mcuq.main.show( new Players({ collection : collection }) );
        }
      });
    },

    player: function(id) {
      this.beforeRoute();
    },

    club: function (id) {
      this.beforeRoute();

      var model = new ClubModel();
      model.fetch({
        success: function() {
          Mcuq.main.show(new Club({
            model: model
          }));
        }
      });

    },

    showError: function() {

    }

});
