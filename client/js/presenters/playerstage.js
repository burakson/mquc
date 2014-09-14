'use strict';

var $          = require('jquery')
  , _          = require('underscore')
  , Backbone   = require('backbone')
  , Marionette = require('backbone.marionette')
  , Stickit    = require('backbone.stickit')
  , Template   = require('../templates/playerstage.jade')
  , Mquc       = require('../mquc');

module.exports = Marionette.CompositeView.extend({

  template: Template,

  events: {
    'click .btn-edit'   : 'toggleForm',
    'click .btn-delete' : 'deletePlayer',
    'click .btn-save'   : 'sendForm'
  },

  ui: {
    emptyStage    : '.stage-empty',
    valueFixed    : '.value.fixed',
    valueEditable : '.value.editable',
    saveBtn       : '.btn-save'
  },

  bindings: {
    '.input-name'     : 'name',
    '.input-fullname' : 'fullname',
    '.input-age'      : 'age',
    '.input-jersey'   : 'jersey',
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
      this.listenTo(this.model, 'change', this.enableSaveButton);
      this.stickit();
    }
  },

  playerSelected: function(model) {
    this.model = model;
    this.render();
  },

  updateSelection: function() {
    if (this.model) {
      this.ui.emptyStage.addClass('hide');
      Mquc.vent.trigger('header:toggleSpinner', false);
    }
  },

  toggleForm: function(e) {
    e.preventDefault();

    if (!this.isEditMode()) {
      this.ui.valueFixed.addClass('hide');
      this.ui.valueEditable.removeClass('hide');
    } else {
      this.ui.valueEditable.addClass('hide');
      this.ui.valueFixed.removeClass('hide');
    }
  },

  enableSaveButton: function() {
    this.ui.saveBtn.prop('disabled', false);
  },

  isEditMode: function() {
    return !this.ui.valueEditable.first().hasClass('hide')
  },

  deletePlayer: function(e) {
    e.preventDefault();
    Mquc.vent.trigger('header:toggleSpinner', true);

    this.model.destroy({
      success: function() {
        Mquc.vent.trigger('header:toggleSpinner', false);
      }
    });
  },

  sendForm: function(e) {
    e.preventDefault();
  }

});
