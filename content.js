console.log("Better CMC Extension Loaded");

function addCustomContent() {
  const newContentDiv = document.createElement("div");
  newContentDiv.className = "sc-65e7f566-0 lcsYsQ glo-stat-item";
  
  // Hardcoded version instead of fetching
  const extensionVersion = "1.3.0";
  
  newContentDiv.innerHTML = `
    <span class="sc-65e7f566-0 egHtVD base-text">Better CMC:</span>&nbsp;
    <a href="https://github.com/Decryptu/Better-CoinMarketCap" 
       class="sc-65e7f566-0 eQBACe cmc-link">${extensionVersion}</a>
  `;

  const globalStatsDiv = document.querySelector(".sc-30d0c97e-0.fCFRqZ.global-stats");
  if (globalStatsDiv) {
    if (!globalStatsDiv.querySelector(".lcsYsQ:last-child")) {
      globalStatsDiv.appendChild(newContentDiv);
      console.log("Custom content added successfully.");
    }
  } else {
    console.log("Global stats div not found. Retry in 500ms...");
    setTimeout(addCustomContent, 500);
  }
}

const observeChanges = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      const headerWrapper = document.querySelector(".HeaderV3_secondary-header__eg_xA");
      if (headerWrapper?.querySelector(".global-stats")) {
        addCustomContent();
      }
    }
  }
};

const observer = new MutationObserver(observeChanges);
const config = { attributes: false, childList: true, subtree: true };
observer.observe(document.body, config);

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(addCustomContent, 1000);
});

setInterval(addCustomContent, 3000);