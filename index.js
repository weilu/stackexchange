'use strict'
module.exports = function(path){
  page.base(path)
  page();
}

var request = require('cors');
var page = require('page');
var _ = require('underscore');
var query = require('querystring');
var indexTemplate = require('./templates/index');
var userShowTemplate = require('./templates/user_show');
var userQuestionsTemplate = require('./templates/user_questions');

page('/', index);
page('/users/:id', user_show);
page('/users/:id/questions', user_questions);
page('*', not_found);

function not_found(req) {
  console.error("page not found");
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
  var user_id = req.params.id;
  var queries = query.parse(req.querystring);
  var url = 'http://api.stackexchange.com/2.1/users/' + user_id + '/questions';
  if(queries.type) {
    url += '/' + queries.type;
  }

  request.get({
    url: url + '?site=stackoverflow',
    success: function(data){
      var questions = JSON.parse(data).items;
      var data = {
        questions: questions,
        user_id: user_id,
        type: queries.type
      }
      render(userQuestionsTemplate, data);
      redirectToUserQuestions();
    }
  })
}

function render(template, data) {
  var compiled = _.template(template);
  document.body.innerHTML = compiled(data);
}

function domify() {
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = template;
  return tempDiv
}

function redirectToUserShow() {
  var form = document.querySelector('form.user-show');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    page.show("/users/" + e.target.querySelector('input[name="id"]').value);
  })
}

function redirectToUserQuestions() {
  var form = document.querySelector('form.question-filter');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    page.show(e.target.attributes.action.value + "?type=" + e.target.querySelector('select').value);
  })
}
