'use strict'
module.exports = function(path){
  page.base(path)
  page();
}

var request = require('superagent');
var page = require('page');
var template = require('./template');

page('/', index);
page('/users*', user_show);
page('/questions*', user_questions);
page('*', not_found);

function not_found(req) {
  debugger
}

function index(req) {
  render('index');
  hijackSubmit();
}

function user_show(req) {
  request.get('http://api.stackexchange.com/2.1/users/')
}

function user_questions(req) {
}

function render(template) {
  document.body.innerHTML = domify().querySelector('#' + template).innerHTML;
}

function domify() {
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = template;
  return tempDiv
}

function hijackSubmit() {
  document.addEventListener('submit', function(e){
    e.preventDefault();
    var url = e.target.attributes.action.value + queryString(e.target);
    page.show(url);
  })
}

function queryString(form) {
  var result = [];
  [].slice.call(form.querySelectorAll('input')).forEach(function(item) {
     if (!item.name) return
     result.push(item.name + "=" + item.value)
  })
  return "?" + result.join("&");
}
