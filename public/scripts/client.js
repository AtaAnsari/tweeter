/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
// loading tweets once DOM is ready

loadTweets()

// Fetching and rendering tweets 
  const $tweet = $('form');
  $tweet.on('submit', function () {
    event.preventDefault()
    if(isTooLong($tweet)) {
      alert("Your tweet is too long! Please shorten it.")
    } else if(isNull($tweet)) { 
      alert("Your Tweet is empty!")
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: $tweet.serialize(),
        success: () => {
          $.ajax({
            url: "/tweets",
            type: "GET",
            dataType: "JSON",
            success: () => {$('.tweet-container').empty()}
          })
          .then((data) => {renderTweets(data)})
        }
      })
    }
  });

  const $toggle = $('nav i');
  const $tweetForm = $('.new-tweet')
  // $toggle.toggle(() => {
  //   $tweetForm.css('position', 'absolute' )
  //   $tweetForm.css('top', '-13%' )
  // }, () => {
  //   $tweetForm.css('position', 'relative' )
  // })
  $toggle.click(function(){
    $tweetForm.slideToggle();
  });
  
  $toggle.hover(() => {
    $toggle.css('top', '68%' )
  }, () => {
    $toggle.css('top', '55%' )
  }) 

  });



// Helper Functions:

// Creating tweet element

const createTweetElement = function(database){
  const userName = database["user"]["name"];
  const tweeterHandle = database["user"]["handle"];
  const tweet = database["content"]["text"];
  const date = Date.now() - database["created_at"]
  const daysAgo = Math.floor(date/1000/60/60/24)
  const avatar = database["user"]["avatars"]
    const markup = `
    <article>
      <header>
          <div class="avatar-container">
          <img src="${avatar}" alt="user-image">
          </div> 
        <h3 class= "memmber-name">${userName}</h3>
        <h3 class= "tweeter-handle">${tweeterHandle}</h3>
      </header>
      <p class="tweet">${escape(tweet)}</p>
      <footer>
        <p>${daysAgo} days ago</p>
        <div class="icons">
          <div class="flag"><i class="fas fa-flag"></i></div>
          <div class="retweet"><i class="fas fa-retweet"></i></div>
          <div class="heart"><i class="fas fa-heart"></i></div>
        </div>
      </footer>
    </article>
    `;
    return markup
  };
  
  const renderTweets = function(tweetData) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for(const tweet of tweetData) {
      let $tweet = createTweetElement(tweet)
      $('.tweet-container').append($tweet)
    }
  
  }
  
  // Loads tweets when document is ready
  
  const loadTweets = function(){
    $.ajax({
      url: "/tweets",
      type: "GET",
      dataType: "JSON"
    })
    .then((data) => {renderTweets(data)})
  };

// determining if the tweet is too long or not entered at all.

const isTooLong = function ($tweet) {
  if(($tweet.find("textarea").val().length) > 140) {
    return true
  }
};

const isNull = function ($tweet) {
  if(($tweet.find("textarea").val().length) === 0) {
    return true
  }
}

// escape function to prevent XSS

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

