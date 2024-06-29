// Function to calculate and display the Fully Diluted Valuation (FDV) with dynamic coloring based on MCAP to FDV ratio
function displayFDVWithDynamicColoring() {
  const rows = document.querySelectorAll(".cmc-table tbody tr");
  for (const row of rows) {
    const marketCapSpan = row.querySelector(
      'td:nth-child(8) span[data-nosnippet="true"]'
    );
    const circulatingSupplyColumn = row.querySelector("td:nth-child(10)");
    const fdvElementExists = row.querySelector(".custom-fdv");

    if (fdvElementExists || !marketCapSpan || !circulatingSupplyColumn)
      continue;

    const marketCap = Number.parseFloat(
      marketCapSpan.textContent.replace(/[$,]/g, "")
    );
    const progressBar = circulatingSupplyColumn.querySelector(
      'div[class^="sc-c50b4d85-1"]'
    );
    let fdv;
    let fdvText;
    let fdvColor;

    if (progressBar) {
      const progressBarWidth = progressBar.clientWidth;
      const containerWidth = progressBar.parentNode.clientWidth;
      const completionPercentage = progressBarWidth / containerWidth;
      fdv = marketCap / completionPercentage;
      const ratio = ((fdv - marketCap) / marketCap) * 100;

      // Determine color based on MCAP to FDV ratio
      if (ratio <= 10) {
        fdvColor = "var(--up-color)"; // Green
      } else if (ratio <= 50) {
        fdvColor = "#f6b87e"; // Yellow
      } else {
        fdvColor = "var(--down-color)"; // Red
      }

      fdvText = `FDV: <span style="color: ${fdvColor};">${Math.floor(fdv)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>`;
    } else {
      fdvText = "FDV: ∞";
    }

    // Theme-dependent class selection
    const pClass = document.body.classList.contains("NIGHT")
      ? "sc-4984dd93-0 bpmdQz"
      : "sc-4984dd93-0 ihZPK";

    // Create and append the FDV element
    const fdvElement = document.createElement("span");
    fdvElement.className = `${pClass} custom-fdv`; // Apply theme-dependent class
    fdvElement.style.display = "block";
    fdvElement.style.marginTop = "5px";
    fdvElement.innerHTML = fdvText;

    const marketCapContainer = marketCapSpan.parentNode;
    if (marketCapContainer) {
      marketCapContainer.appendChild(fdvElement);
    }
  }
}

// Initiate FDV display with dynamic coloring and observe for changes
function initFDVDynamicDisplay() {
  displayFDVWithDynamicColoring();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        displayFDVWithDynamicColoring();
      }
    }
  });

  const table = document.querySelector(".cmc-table tbody");
  if (table) {
    observer.observe(table, { childList: true, subtree: true });
  } else {
    console.log("CMC table not found.");
  }

  // Theme change observer to update FDV elements' classes
  const themeObserver = new MutationObserver(() => {
    for (const fdvElement of document.querySelectorAll(".custom-fdv")) {
      fdvElement.className = document.body.classList.contains("NIGHT")
        ? "sc-4984dd93-0 bpmdQz custom-fdv"
        : "sc-4984dd93-0 ihZPK custom-fdv";
    }
  });

  themeObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFDVDynamicDisplay);
} else {
  initFDVDynamicDisplay();
}

console.log(
  "FDV Script with dynamic coloring initialized and monitoring for updates."
);
