/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
// loading tweets once DOM is ready

loadTweets()

// Fetching and rendering tweets as well as error responses
  const $tweet = $('form');
  const $toLong = $('.too-long')
  const $null = $('.null')
  const $textarea = $("form textarea")

  $textarea.on("input", () => {
    if(isTooLong($tweet)) {
      $toLong.show()
      $null.hide()
    } else if(isNull($tweet)) { 
      $toLong.hide()
      $null.show()
    } else {
      $toLong.hide()
      $null.hide()
    }
  })

  $tweet.on('submit', function () {
    event.preventDefault()
    if(isTooLong($tweet)){
      $toLong.show()
    } else if(isNull($tweet)) {
      $null.show()
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
const $scrollArrow = $('.scroll-arrow')
// scrolling to the top of the page when the scroll up arrow is clicked. This also brings the textarea into focus

// REFERENCE: PLEASE NOTE THAT I OBTAINED THE SOURCE CODE FOR THIS ANIMATION FROM HERE: https://stackoverflow.com/questions/1144805/scroll-to-the-top-of-the-page-using-javascript

$scrollArrow.click(function() {
  $tweetForm.slideToggle();
  $tweet.find('textarea').focus();
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});  

// toggling the write a tweet form
    $toggle.click(function(){
    $tweetForm.slideToggle();
    $tweet.find('textarea').focus();
  });

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
      $('.tweet-container').prepend($tweet)
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

