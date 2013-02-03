'use strict'
module.exports = function(path){
  page.base(path)
  page();
}

var request = require('cors');
var page = require('page');
var _ = require('underscore');
var indexTemplate = require('./templates/index');
var userShowTemplate = require('./templates/user_show');

page('/', index);
page('/users/:id', user_show);
page('/users/:id/questions', user_questions);
page('*', not_found);

function not_found(req) {
  debugger
}

function index(req) {
  render(indexTemplate);
  redirectToUserShow();
}

function user_show(req) {
  request.get({
    url: 'http://api.stackexchange.com/2.1/users/' + req.params.id + '?site=stackoverflow',
    success: function(data){
      var user = JSON.parse(data).items[0];
      render(userShowTemplate, { user: user });
    }
  })
}

function user_questions(req) {
}

function render(template, data) {
  debugger
  var compiled = _.template(template);
  document.body.innerHTML = compiled(data);
}

function domify() {
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = template;
  return tempDiv
}

function redirectToUserShow() {
  document.addEventListener('submit', function(e){
    e.preventDefault();
    page.show("/users/" + e.target.querySelector('input[name="id"]').value);
  })
}
