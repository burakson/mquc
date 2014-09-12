'use strict';

var _         = require('underscore')
  , Backbone  = require('backbone');

module.exports = Backbone.Model.extend({

  url: '/api/club_data',

  parse: function(response) {
    response = _.omit(response, 'id');
    return response;
  }

});
