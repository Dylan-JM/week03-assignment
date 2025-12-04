console.log("Hello, World!");

//game logic
//when the user clicks on the cookie, increase the cookie count by 1
//when the user clicks on the "buy" button in an upgrade in the shop, the total
// cookie count decreases by the cost of the upgrade, and the cookies per second goes up

const cookie = document.getElementById("cookie");
const cookieCountDisplay = document.getElementById("cookie-count");
const cookiesPerSecondDisplay = document.getElementById("cookies-per-second");

cookie.addEventListener("click", function () {
  stats.cookieCount += 1;
  cookieCountDisplay.textContent = stats.cookieCount;
});

//we need functions to contain the game logic
//we will get the shop upgrades data from the API
//https://cookie-upgrade-api.vercel.app/api/upgrades
//to create the logic for the shop upgrades:
//- OPTION 1: you could have a function to handle each upgrade
//- OPTION 2: you could have a reusable function that works for all upgrades (probably better)

//tip on local storage:
//- make sure the local sotrage values are updated after the user buys an
//upgrade and the user clicks on the cookie

//=============

//data storage
//global scope

let stats = {
  cookieCount: 0,
  cookiesPerSecond: 0,
};

//if there is data already in local storage, update stats with this data, so the user picks it up where they left off

//=============

//shop upgrades
//fetch the shop upgrades from the API
//create multiple DOM elements to contain the ugprades (loop)

//TODO: create DOM elements for the shop upgrades
//- create elemenet
//- assing the value to its property (textContent)
//- append it to the DOM

//after completed, you should see the upgrades in the shop container

//TODO: create function(s) to handle the purchase action
//the user needs a button to buy the item
//when the uesr clicks the button:
//subtract cost of upgrade from total cookie count
//increase cookies per second by the upgrade's cps value
//save new values in local storage

//=============

//the interval

setInterval(function () {
  stats.cookieCount += stats.cookiesPerSecond;
  //update the DOM to reflect changes in the values
  //save values in local storage
}, 1000);
