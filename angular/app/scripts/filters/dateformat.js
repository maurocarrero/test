/**
 * Created by maurocarrero on 26/05/16.
 */
'use strict';

/**
 * @ngdoc directive
 * @name filters.filter:dateFormat
 * @description A filter to return how long ago the comment was written.
 *
 * Many of these operations between 2 dates could be addressed by using a library as Moment.js, avoiding to
 * reinvent the wheel, nevertheless I built this logic here because this is a test, and I assumed it was the
 * expected thing to do.
 *
 */
angular.module('filters', [])
  .filter('dateFormat', function () {

    function responseStringBuilder(value, time) {
      return value + ' ' + time + (value > 1 ? 's' : '') + ' ago';
    }

    // dateString param could be a date object as well, as it is used in the tests
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
  });
