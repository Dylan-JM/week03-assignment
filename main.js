console.log("Hello, World!");

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
    const btnContainer = document.createElement("container");
    const upgradeBtn = document.createElement("button");
    const upgradeText = document.createElement("p");
    upgradeBtn.textContent = upgrade.name;
    btnContainer.appendChild(upgradeBtn);
    btnContainer.appendChild(upgradeText);
    shopContainer.appendChild(btnContainer);

    upgradeText.textContent = `Cost: ${upgrade.cost} Cookies Per Second: ${upgrade.increase}`;
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

setInterval(function () {
  stats.cookieCount += stats.cookiesPerSecond;
  saveLocalStorage();
  updateStats();
}, 1000);
