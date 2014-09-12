'use strict';

var $          = require('jquery')
  , _          = require('underscore')
  , Backbone   = require('backbone');
    Backbone.$ = $;

var Marionette = require('backbone.marionette')
  , Mcuq       = require('./mcuq')
  , Router     = require('./router')
  , Header     = require('./presenters/header');


Mcuq.addInitializer(function (options){

  this.addRegions({
    header     : '#header',
    main       : '#main',
    footer     : '#footer'
  });

  this.header.show(new Header());

  Backbone.history.start();

});

Mcuq.Router = new Router();
Mcuq.start();
