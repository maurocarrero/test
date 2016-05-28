'use strict';

var React = require('react/addons');
var CommentBox = require('components/CommentBox/CommentBox');

// CSS
require('normalize.css');
require('styles/main.css');

var imageURL = require('../images/yeoman.png');

var ReactApp = React.createClass({

  getInitialState: function () {
      /**
       * I added the formatter to the prototype of the Date object instead of filtering
       * as in the Angular sample.
       */
      if (typeof Date.testFormat !== 'function') {
          Date.testFormat = (function () {
              function responseStringBuilder(value, time) {
                  return value + ' ' + time + (value > 1 ? 's' : '') + ' ago';
              }

              return function (dateString) {
                  var commentDate = new Date(dateString);
                  var now = new Date();

                  // the comment date should always be a valid date and previous to today
                  if (typeof dateString !== 'boolean' && !isNaN(Date.parse(dateString)) && now > commentDate) {
                      var millis = now - commentDate; // diff in milliseconds

                      var seconds = Math.floor(millis / 1000); // seconds
                      var minutes = Math.floor(seconds / 60); // minutes
                      var hours = Math.floor(minutes / 60); // hours
                      var days = Math.floor(hours / 24); // days

                      if (seconds < 60) {
                          return responseStringBuilder(1, 'minute');
                      }
                      if (minutes < 60) {
                          return responseStringBuilder(minutes, 'minute');
                      }
                      if (hours < 24) {
                          return responseStringBuilder(hours, 'hour');
                      }

                      return responseStringBuilder(days, 'day');
                  }

                  return 'Invalid date';
              };
          })();
      }

      return null;
  },

  render: function() {
    return (
        <CommentBox url="http://localhost:2403/comments/" pollInterval={2000}/>
    );
  }
});

React.render(
    <ReactApp/>,
    document.getElementById('content')
);

module.exports = ReactApp;
