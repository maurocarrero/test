'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:commentBox
 * @description
 * # commentBox
 */
angular.module('commentBox', ['commentList', 'commentForm'])
  .directive('commentBox', function ($http) {
    return {
      template: '<div class="commentBox">' +
                  '<h1>Comments</h1>' +
                  '<comment-list comments="data"></comment-list>' +
                  '<comment-form></comment-form>' +
                '</div>',
      restrict: 'E',
      scope: {
        url: '@',
        pollInterval: '@'
      },
      link: function postLink(scope) {
        var loadCommentsFromServer = function () {
          $http.get(scope.url)
            .success(function(data){
              scope.data = data;
            })
            .error(function(data, status){
              console.log(status);
            });
        };
        var handleCommentSubmit = function (event, data) {
          var comment = data;
          comment.date = new Date();
          scope.data.concat([comment]);
          $http.post(scope.url, comment)
            .success(function(){
              console.log('success')
            })
            .error(function(data, status){
              console.log(status);
            });
        };
        loadCommentsFromServer();
        setInterval(loadCommentsFromServer, scope.pollInterval);
        scope.$on('submitted', handleCommentSubmit);
      }
  }});
