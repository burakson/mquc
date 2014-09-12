'use strict';

var Backbone  = require('backbone');

module.exports = Backbone.Collection.extend({

  url: 'test/http://www.fcbarcelona.com/list/articles.rss',

  parse: function(response) {
    if ( response.responseStatus === 200 && response.responseData ) {
      return response.responseData.feed.entries;
    }

    return [];
  },

  sync: function(method, model, options) {
    if ( method === 'read' ) {
      var protocol = window.location.protocol;
      this.url = protocol +'//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q='+ this.url;
    }
    return Backbone.sync.apply( this, [method, model, options] );
  }

});
