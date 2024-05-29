console.log("Better CMC Extension Loaded");

// Function to add our custom content
function addCustomContent() {
  const newContentDiv = document.createElement("div");
  newContentDiv.className = "sc-f70bb44c-0 CCiJc glo-stat-item";
  const extensionVersion = chrome.runtime.getManifest().version;
  newContentDiv.innerHTML = `<span class="base-text">Better CMC:</span>&nbsp;<a href="https://github.com/Decryptu/Better-CoinMarketCap" class="cmc-link">${extensionVersion}</a>`;

  const globalStatsDiv = document.querySelector(
    ".sc-3813d849-1.bTzhKi.global-stats"
  );
  if (globalStatsDiv) {
    if (!globalStatsDiv.querySelector(".CCiJc")) {
      globalStatsDiv.appendChild(newContentDiv);
      console.log("Custom content added successfully.");
    }
  } else {
    console.log("Global stats div not found. Retry in 500ms...");
    setTimeout(addCustomContent, 500);
  }
}

// Callback for the observer when changes are detected
const observeChanges = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      const headerWrapper = document.querySelector(
        'div[data-role="global-header"]'
      );
      if (headerWrapper?.querySelector(".sc-3813d849-1.bTzhKi.global-stats")) {
        addCustomContent();
      }
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(observeChanges);

// Configuration for the observer
const config = { attributes: false, childList: true, subtree: true };

// Start observing the document body for changes
observer.observe(document.body, config);

// Retry adding custom content if the initial attempt fails
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(addCustomContent, 1000);
});

// Ensure the custom content is present continuously
setInterval(addCustomContent, 3000);
