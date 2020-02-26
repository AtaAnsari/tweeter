/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const tweetData = [{
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
},
{
  "user": {
    "name": "Descartes",
    "avatars": "https://i.imgur.com/nlhLi3I.png",
    "handle": "@rd" },
  "content": {
    "text": "Je pense , donc je suis"
  },
  "created_at": 1461113959088
}]

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

renderTweets(tweetData)

// const $tweet = createTweetElement(tweetData);
// $('.tweet-container').append($tweet)
})

