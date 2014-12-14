(function () {
    'use strict';

    angular.module('auction', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            var title = function (page) {
                return page + ' | Auction';
            };

            $routeProvider
                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'HomeController',
                    controllerAs: 'ctrl',
                    title: title('Home')
                })
                .when('/search', {
                    templateUrl: 'views/search.html',
                    controller: 'SearchController',
                    controllerAs: 'ctrl',
                    title: title('Search')
                })
                .when('/product/:productId', {
                    templateUrl: 'views/product.html',
                    controller: 'ProductController',
                    controllerAs: 'ctrl',
                    title: title('Product Details'),
                    resolve: {
                        /*resolve - {Object.<string, function>=} - An optional map of dependencies which should be injected into the controller.
                         If any of these dependencies are promises, the router will wait for them all to be resolved or one to be rejected before the controller is instantiated.
                         If all the promises are resolved successfully, the values of the resolved promises are injected
                         and $routeChangeSuccess event is fired. If any of the promises are rejected the $routeChangeError event is fired. */
                        product: ['$route', 'ProductService', function ($route, productService) {
                            var productId = parseInt($route.current.params.productId);
                            return productService.getProductById(productId);
                            }
                        ]
                    }

                })
                .otherwise({
                    redirectTo: '/'
                });
        }])
        .run(['$rootScope', function ($rootScope) {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                $rootScope.pageTitle = next.$$route.title;
            });
        }]);
}());
  
