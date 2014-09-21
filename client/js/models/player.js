'use strict';

var _          = require('underscore')
  , Backbone   = require('backbone');

module.exports = Backbone.Model.extend({

  url : '/api/players',

  defaults: {
    'id'            : '',
    'name'          : '',
    'fullname'      : '',
    'jersey_number' : '',
    'age'           : '',
    'url'           : '',
    'is_god'        : 0
  },

  validate: function(attrs) {
    if (attrs.name === '') {
      return 'Name field is mandatory!';
    }
  },

  destroy: function (options) {
    var opts = _.extend({url: this.url +'/'+ this.id}, options || {});
    return Backbone.Model.prototype.destroy.call(this, opts);
  }

});
