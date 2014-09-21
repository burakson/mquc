'use strict';

var $          = require('jquery')
  , _          = require('underscore')
  , Backbone   = require('backbone')
  , Marionette = require('backbone.marionette')
  , Stickit    = require('backbone.stickit')
  , PlayerModel = require('../models/player')
  , Template   = require('../templates/playerstage.jade')
  , Mquc       = require('../mquc');

module.exports = Marionette.CompositeView.extend({

  template: Template,

  events: {
    'click .btn-add'    : 'toggleAdd',
    'click .btn-edit'   : 'toggleEdit',
    'click .btn-delete' : 'deletePlayer',
    'click .btn-save'   : 'sendForm'
  },

  ui: {
    fields  : 'input',
    saveBtn : '.btn-save',
    error   : '.form-error'
  },

  bindings: {
    '.input-name'     : 'name',
    '.input-fullname' : 'fullname',
    '.input-age'      : 'age',
    '.input-jersey'   : 'jersey_number',
    '.input-url'      : 'url'
  },

  serializeData: function() {
    if ( !this.model ) return;
    var modelAttrs = _.extend({}, this.model.attributes);

    return {
      player : modelAttrs
    }
  },

  onRender: function() {
    this.updateSelection();
    if (this.model) {
      this.listenTo(this.model, 'change', this.toggleButton);
      this.stickit();
    }
  },

  playerSelected: function(model) {
    this.model = model;
    this.render();
  },

  updateSelection: function() {
    if (this.model) {
      Mquc.vent.trigger('header:toggleSpinner', false);
    }
  },

  toggleAdd: function(e) {
    e.preventDefault();

    this.model = new PlayerModel();
    this.render();
    this.toggleEdit();
  },

  toggleEdit: function(e) {
    if (e) e.preventDefault();

    if (!this.isEditMode()) {
      this.ui.fields.prop('readonly', false).removeClass('readonly');
      this.ui.saveBtn.removeClass('hide');
    } else {
      this.ui.fields.prop('readonly', true).addClass('readonly');
      this.ui.saveBtn.addClass('hide');
    }
  },

  toggleButton: function(enable) {
    this.ui.saveBtn.prop('disabled', (enable ? false : true));
  },

  isEditMode: function() {
    return !this.ui.fields.first().prop('readonly')
  },

  deletePlayer: function(e) {
    e.preventDefault();

    if (window.confirm('Do you want to delete this player?')) {
      Mquc.vent.trigger('header:toggleSpinner', true);

      this.model.destroy({
        success: _.bind(function() {
          Mquc.vent.trigger('header:toggleSpinner', false);
          // TODO: Do not just clear the layout but close the view!
          this.$el.html('');
          Backbone.history.navigate('players');
        }, this)
      });
    }
  },

  sendForm: function(e) {
    if (e) e.preventDefault();

    Mquc.vent.trigger('header:toggleSpinner', true);
    this.toggleButton(false);
    this.ui.error.addClass('hide');

    this.model.save({}, {
      validate : true,
      success  : _.bind(function() { this.afterSave(true) }, this),
      error    : _.bind(function() { this.afterSave(false) }, this),
    });

    if (this.model.validationError) {
      this.afterSave(false, this.model.validationError)
    }
  },

  afterSave: function(isSuccessful, errorMsg) {
    Mquc.vent.trigger('header:toggleSpinner', false);

    if (isSuccessful) {
      Mquc.vent.trigger('player:added', this.model);
      Backbone.history.navigate('players/'+this.model.get('id'));
      this.render();
    } else {
      errorMsg = errorMsg || 'Something went wrong.';
      this.ui.error.html(errorMsg)
                   .removeClass('hide');
    }
  }

});
