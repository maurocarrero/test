'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:comment
 * @description
 * # comment
 */
angular.module('comment', [])
  .directive('commentModel', function () {
    return {
      template: '<div class="comment">' +
                  '<h2 class="commentAuthor">' +
                      '{{author}}' +
                  '</h2>' +
                  '<ng-transclude></ng-transclude>' +
                  '<div>{{ date | dateFormat }}</div>' +
                '</div>',
      restrict: 'E',
      transclude: true,
      scope: {
        author: '@',
        date: '@'
      }
    };
  });
