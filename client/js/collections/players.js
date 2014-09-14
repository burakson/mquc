'use strict';

var Backbone  = require('backbone')
  , Model     = require('../models/player');

module.exports = Backbone.Collection.extend({

  model: Model,

  url: '/api/players',

  comparator: function(model) {
    return model.get('name');
  }

});
