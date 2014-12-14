(function () {
    'use strict';

    var ProductService = function ($http) {
        // Instance attributes go here:
        this.$http = $http;
    };

    /** List all dependencies required by the service. */
    ProductService.$inject = ['$http'];

    // Instance methods go here:
    ProductService.prototype = {

        /** Returns the list of all available products on the server. */
        getProducts: function () {
            return this.$http.get('/data/products-featured.json')
                .then(function (resp) {
                    /*  then(successCallback, errorCallback, notifyCallback) – regardless of when the promise
                     was or will be resolved or rejected,
                     then calls one of the success or error callbacks asynchronously as soon as the result is available*/
                    //console.log('resp from promise: ' + JSON.stringify(resp));
                    return resp.data;
                });
        },

        /** Finds products with specified criteria.
         * NOTE: Search criteria are not implemented yet.
         */
        find: function () {
            return this.$http.get('/data/products-search.json')
                .then(function (resp) {
                    return resp.data;
                });
        },

        /** Finds products with specified criteria.
         * NOTE: Search criteria are not implemented yet.
         */
        getProductById: function (productId) {
            return this.getProducts().then(function (products) {
                return _.find(products, function (product) { //lodash with Underscore.js under the hood
                    return product.id === productId;
                })
            });
        }
    };

    // Register the service within AngularJS DI container.
    angular.module('auction').service('ProductService', ProductService);
}());
