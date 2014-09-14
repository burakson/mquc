'use strict';

var _         = require('underscore')
  , Backbone  = require('backbone');

module.exports = Backbone.Model.extend({

  defaults: {
    'id'         : '',
    'name'       : '',
    'fullname'   : '',
    'jersey'     : '',
    'age'        : '',
    'url'        : ''
  }

});
