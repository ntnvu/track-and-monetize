"use strict";

var factories = angular.module('factories', ['ngStorage']);

factories.factory('API', ['$localStorage', '_',
    function ($localStorage, _) {
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
                item.createdAt = (new Date()).getTime();
                item.updatedAt = item.createdAt;
                list.push(item);
                setList(list);
                return item;
            },
            update: function (item) {
                if (!item.id) {
                    throw new Error('item id not found');
                }
                var list = getList();
                var it = _.findWhere(list, {id: item.id});

                if (!it) {
                    throw new Error('item not found');
                }
                _.extend(it, item);
                it.updatedAt = (new Date()).getTime();
                setList(list);
                return it;
            }
        }

    }]);