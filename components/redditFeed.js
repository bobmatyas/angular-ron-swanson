function RedditFeed(RedditService, $q) {
  // have to add $q to use promises 

    const ctrl = this;
    
    // load on initial page load

    ctrl.$onInit = function() {
      ctrl.feed = [];
      ctrl.fetchAwwSubreddit();
    };

    
    ctrl.truncateString = function(str, num) {
      if (str.length > num) {
        return str.slice(0, num) + "...";
      } else {
        return str; 
      }
    }


    ctrl.fetchAwwSubreddit = () => {

      return $q(function(resolve, reject) {
        RedditService.fetchAwwSubreddit()
          .then( (response) => {

            ctrl.feed = response;
            ctrl.arrayToLoad = [];

            response.data.data.children.slice(1, 11).forEach( (child) => {
              // skipped the first post which is just an ad for a random sub-reddit
              
              //format the post date
              let redditPostDate = new Date();
              redditPostDate.setTime(child.data.created*1000);
              let dateString = redditPostDate.toLocaleString();
                     
              //modify permalink to add reddit link 
              let realPermalink = `https://www.reddit.com/${child.data.permalink}`;

              //cut title to a more managble length for predictability
              let postTitle = ctrl.truncateString(child.data.title, 90);

              //create an object of the current post
              let childObj = {
                title: postTitle,
                thumbnail: child.data.thumbnail,
                permalink: realPermalink,
                postDate: dateString
              }

              // add post information to array to be parsed later
              ctrl.arrayToLoad.push(childObj);
                
            });
            resolve();
          })
          .catch( function(error) {
            console.error(error);
            throw error;
          });

      });

        
    }
  }
  
  angular.module('RedditApp').component('redditFeed', {
    template: `
    <a href="{{ post.permalink }}" data-ng-repeat="post in $ctrl.arrayToLoad" class="reddit-post-link">
      <div class="reddit-post-block">  
        <div class="reddit-post-block-inner">
          <h2 class="reddit-post-title"> {{ post.title }}</h2>
          <img src="{{ post.thumbnail }}" class="reddit-post-image" alt="photo: {{ post.title }}" />
          <p class="reddit-post-date">Posted: {{ post.postDate }}</p>
        </div>
      </div>
    </a>
   `, // or use templateUrl
    controller: RedditFeed,
});