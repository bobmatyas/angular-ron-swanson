"use strict";

function SwansonService($http) { 
  const service = this;

     service.fetchSwansonQuote = () => {
        return $http.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      };
      
}

angular.module('SwansonApp')
.service('SwansonService', ['$http', SwansonService])
// passing $http service as dependency for our service