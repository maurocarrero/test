/**
 * Created by maurocarrero on 26/05/16.
 */
'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:comment
 * @description
 * # comment
 */
angular.module('angularApp')
  .filter('dateFormat', function () {

    function checkHowLongAgo(commentDate) {
      var now = new Date();
      var diff = now - commentDate;
      var days = Math.round(diff / 86400000); // days
      var hours = Math.round((diff % 86400000) / 3600000); // hours
      var minutes = Math.round(((diff % 86400000) % 3600000) / 60000); // minutes
      var seconds = (now.getTime() - commentDate.getTime()) / 1000; // seconds
      console.log(days + ' days, ' + hours + ' hours, ' + minutes +  ' minutes ' + seconds + ' seconds.');

      // TODO: This is NOT correct - Work in progress
      diff = seconds + ' second(s)';
      if (seconds > 59) {
        diff = minutes + ' minute(s)';
      }
      if (minutes > 59) {
        diff = hours + ' hour(s) ago';
      }
      if (hours > 23) {
        diff = days + ' day(s) ago';
      }
      return diff + ' ago';
    }

    return function (dateString) {
      // TODO: fix local time differences.
      var date = new Date(dateString);
      if (!isNaN(date)) {
        return checkHowLongAgo(date);
      }
      return 'Invalid date';
    };
  });
