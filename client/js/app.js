'use strict';

var $          = require('jquery')
  , _          = require('underscore')
  , Backbone   = require('backbone');
    Backbone.$ = $;

var Marionette = require('backbone.marionette')
  , Mquc       = require('./mquc')
  , Router     = require('./router')
  , Header     = require('./presenters/header');


Mquc.addInitializer(function (options){

  this.addRegions({
    header     : '#header',
    main       : '#main',
    footer     : '#footer'
  });

  this.header.show(new Header());

  Backbone.history.start();

});

Mquc.Router = new Router();
Mquc.start();
