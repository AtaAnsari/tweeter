/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const createTweetElement = function(database){
const userName = database["user"]["name"];
const tweeterHandle = database["user"]["handle"];
const tweet = database["content"]["text"];
const date = Date.now() - database["created_at"]
const daysAgo = Math.floor(date/1000/60/60/24)
  const markup = `
  <article>
    <header>
        <div class="avatar-container">
        <i class="fas fa-user-circle"></i>
      </div> 
      <h3 class= "memmber-name">${userName}</h3>
      <h3 class= "tweeter-handle">${tweeterHandle}</h3>
    </header>
    <p class="tweet">${tweet}</p>
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
  .then(renderTweets)
};
loadTweets()


});

// Prevent default browser response of submitting form and instead handling it with an ajax request that will route the post request to /tweets/

$(function() {
  const $tweet = $('form');
  $tweet.on('submit', function () {
    event.preventDefault()
    $.ajax({
      type: "POST",
      url: "/tweets/",
      data: $tweet.serialize(),
      success: () => {
      }
    });
  });
});



