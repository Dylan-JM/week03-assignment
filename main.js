console.log("Hello, World!");

//game logic
//when the user clicks on the "buy" button in an upgrade in the shop, the total
// cookie count decreases by the cost of the upgrade, and the cookies per second goes up

const cookie = document.getElementById("cookie");
const cookieCountDisplay = document.getElementById("cookie-count");
const cookiesPerSecondDisplay = document.getElementById("cookies-per-second");

cookieCountDisplay.textContent = "0";
cookiesPerSecondDisplay.textContent = "0";

cookie.addEventListener("click", function () {
  stats.cookieCount += 1;
  cookieCountDisplay.textContent = stats.cookieCount;
  saveLocalStorage();
});

//we need functions to contain the game logic
//we will get the shop upgrades data from the API
//https://cookie-upgrade-api.vercel.app/api/upgrades
//to create the logic for the shop upgrades:
//- OPTION 1: you could have a function to handle each upgrade
//- OPTION 2: you could have a reusable function that works for all upgrades (probably better)

async function getUpgradesData() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const data = await response.json();
  console.log(data);
  return data;
}

const shopContainer = document.getElementById("shop-container");

async function createUpgradeElements() {
  const upgradeData = await getUpgradesData();
  await upgradeData.forEach(function (upgrade) {
    const upgradeBtn = document.createElement("button");
    upgradeBtn.textContent = upgrade.name;
    shopContainer.appendChild(upgradeBtn);
    upgradeBtn.addEventListener("click", function () {
      if (stats.cookieCount >= upgrade.cost) {
        stats.cookiesPerSecond += upgrade.increase;
        stats.cookieCount -= upgrade.cost;
        updateStats();
        saveLocalStorage();
      }
    });
  });
}
createUpgradeElements();

let stats = {
  cookieCount: 0,
  cookiesPerSecond: 0,
};

function updateStats() {
  cookieCountDisplay.textContent = stats.cookieCount;
  cookiesPerSecondDisplay.textContent = stats.cookiesPerSecond;
}

function saveLocalStorage() {
  let stringifiedStats = JSON.stringify(stats);
  localStorage.setItem("stats", stringifiedStats);
}

function loadLocalStorage() {
  const storedStats = localStorage.getItem("stats");
  const parsedStats = JSON.parse(storedStats);
  stats = parsedStats;
  updateStats();
}

loadLocalStorage();
//=============

//data storage
//global scope

//if there is data already in local storage, update stats with this data, so the user picks it up where they left off

//=============

//the interval

setInterval(function () {
  stats.cookieCount += stats.cookiesPerSecond;
  //update the DOM to reflect changes in the values
  //save values in local storage
  saveLocalStorage();
  updateStats();
}, 1000);
