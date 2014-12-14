(function () {
  'use strict';

  var ProductController = function (product) {
    this.product = product;
    /*That is all. No any service is needed. Object is passed via params and fetched in route.resolve*/
  };

  ProductController.$inject = ['product']; //worked without it
  angular.module('auction').controller('ProductController', ProductController);
}());
