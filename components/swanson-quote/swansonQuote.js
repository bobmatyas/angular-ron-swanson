function SwansonQuote(SwansonService, $q) {
  // have to add $q to use promises 

    const ctrl = this;
    
    // load on initial page load

    ctrl.$onInit = function() {
      ctrl.quote = '';
      ctrl.fetchSwansonQuote();
    };

    ctrl.fetchSwansonQuote = () => {

      return $q(function(resolve, reject) {
        SwansonService.fetchSwansonQuote()
          
          .then( (response) => {

            console.log(response.data);  
            ctrl.quote = response.data[0];  
            resolve();
          })
          
          .catch( function(error) {
            console.error(error);
            throw error;
          });

      });

        
    }
  }
  
  angular.module('SwansonApp').component('swansonQuote', {
    template: `
      <p>{{ $ctrl.quote }}</p>
      <div style="text-align: center;">
        <button data-ng-click="$ctrl.fetchSwansonQuote()" class="swanson-wisdom-button">More wisdom</button>
      </div>
    `, // or use templateUrl
    controller: SwansonQuote,
});