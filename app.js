var app = angular.module('todoApp', ['ngStorage']);

app.controller('IndexPageController', ['$scope', 'API',
    function ($scope, API) {
        $scope.list = API.get();
        $scope.submit = function () {
            var item = API.add({
                name: $scope.newItem,
                done: false
            });
            $scope.list.push(item);
            $scope.newItem = "";
        }
    }])

app.factory('API', ['$localStorage',
    function ($localStorage) {
        //generate id for every to do item
        var generateId = function () {
            return (new Date()).getTime();
        };

        //get current list from local storage
        var getList = function () {
            if (!$localStorage.todos) {
                return [];
            }
            return JSON.parse($localStorage.todos);
        };

//    set current list to local storage
        var setList = function (list) {
            if (!list) {
                list = [];
            }
            $localStorage.todos = JSON.stringify(list);
        };

        return {
            get: function () {
                return getList();
            },
            add: function (item) {
                var list = getList();
                item.id = generateId();
                list.push(item);
                setList();
                return item;
            }
        }

    }])

app.directive('todoItem', function () {
    return{
        restrict: "E",
        scope: {
            todo: "="
        },
        templateUrl: 'view/todoItem.html'
    }
})