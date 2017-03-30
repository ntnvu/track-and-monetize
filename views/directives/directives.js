'use strict';
var directives = angular.module('directives', []);

directives.directive('todoItem', function () {
    return{
        restrict: "E",
        scope: {
            todo: "=",
            update: "&"
        },
        templateUrl: 'views/directives/todoItem.html'
    }
});

directives.directive('archiveItem', function(){
    return {
        restrict: 'E',
        scope: {
            todo: "=",
            update: "&"
        },
        templateUrl: 'views/directives/todoItem.html'
    }
})