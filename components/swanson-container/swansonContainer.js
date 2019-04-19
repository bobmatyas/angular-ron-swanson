function SwansonContainer() {
    const ctrl = this;
    
  }
  
  angular.module('SwansonApp').component('swansonContainer', {
    template: `
    <div class="swanson-container">
    <header class="swanson-header">
      <h1 class="swanson-logo">Deep Thoughts from Ron Swanson</h1>
    </header>
    <div class="speech-bubble">
      <div class="swanson-quote-container">
      <swanson-quote></swanson-quote>
      </div>  
    </div>
  </div>
    
    `, // or use templateUrl
    controller: SwansonContainer,
});