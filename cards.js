(() => {
  let initialized = false;

  function uniqueCreateMarketOverviewExtensionV5() {
    console.log("Attempting to initialize Market Overview Extension...");

    const updateThemeClasses = () => {
      const isNight = document.body.classList.contains("NIGHT");
      const pElements = document.querySelectorAll(".card-info-p");
      for (const p of pElements) {
        p.classList.remove("etDiuO", "kKpPOn");
        if (isNight) {
          p.classList.add("etDiuO");
        } else {
          p.classList.add("kKpPOn");
        }
      }
    };

    const updateMarketOverview = () => {
      if (initialized) {
        console.log(
          "Market Overview Extension already initialized. Skipping..."
        );
        return;
      }

      const targetDivs = document.querySelectorAll(
        '.grid > div[style="padding-top:1px"] > div > div > div[data-sensors-click="true"]'
      );

      if (targetDivs.length > 1) {
        const secondTargetDiv = targetDivs[1];

        console.log(
          'Second target div with data-sensors-click="true" found. Proceeding with updates...'
        );
        initialized = true;

        const newDiv = document.createElement("div");
        newDiv.className = "sc-1a5c8bdf-1 aZNqQ";
        newDiv.innerHTML = `
        <div>
          <div class="sc-61710cb6-0 fyYcGd">
            <div class="card-title">
              <span class="card-title-icon">🪐</span>
              <span class="card-title-text">Market Overview</span>
            </div>
            <a href="/charts">
              <span>More</span>
            </a>
          </div>
          <div class="sc-c50d2aab-13 kilDhP card-1 card-row">
            <div class="card-info-div">
              <p class="sc-4984dd93-0 etDiuO card-info-p">Market Cap:</p>
            </div>
            <div class="card-data-div">
              <span class="card-data-span kilDhP price-change"></span>
              <span class="card-change-span"></span>
            </div>
          </div>
          <div class="sc-c50d2aab-13 kilDhP card-2 card-row">
            <div class="card-info-div">
              <p class="sc-4984dd93-0 etDiuO card-info-p">24h Vol:</p>
            </div>
            <div class="card-data-div">
              <span class="card-data-span kilDhP price-change"></span>
              <span class="card-change-span"></span>
            </div>
          </div>
          <div class="sc-c50d2aab-13 kilDhP card-3 card-row">
            <div class="card-info-div">
              <p class="sc-4984dd93-0 etDiuO card-info-p">Dominance:</p>
            </div>
            <div class="card-data-div">
              <span class="card-data-span kilDhP price-change"></span>
            </div>
          </div>
        </div>`;

        secondTargetDiv.appendChild(newDiv);
        updateThemeClasses();

        const globalHeader = document.querySelector(
          'div[data-role="global-header"]'
        );
        const statItems = globalHeader.querySelectorAll(".glo-stat-item");
        const cards = newDiv.querySelectorAll(".sc-c50d2aab-13.kilDhP");

        [2, 3, 4].forEach((index, i) => {
          console.log(`Attempting to fetch data for card ${i + 1}`);
          if (statItems[index]) {
            let data = "";
            let svgHtml = "";
            let percentageChange = "";

            if (i < 2) {
              const dataElement = statItems[index].querySelector("a");
              const percentageElement = dataElement
                ? dataElement.nextElementSibling.querySelector("span")
                : null;
              const svgElement = percentageElement
                ? percentageElement.previousElementSibling
                : null;

              data = dataElement ? dataElement.innerText : "";
              svgHtml = svgElement ? svgElement.outerHTML : "";
              percentageChange = percentageElement
                ? percentageElement.outerHTML
                : "";
            } else {
              const dominanceElement = statItems[index].querySelector("a");
              data = dominanceElement ? dominanceElement.innerText : "";
            }

            if (data) {
              console.log(`Successfully fetched data for card ${i + 1}`);
              cards[i].querySelector(".card-data-span").innerText = data;

              if (i < 2) {
                cards[i].querySelector(".card-change-span").innerHTML =
                  svgHtml + percentageChange;
              }
            } else {
              console.log(`Failed to fetch data for card ${i + 1}`);
            }
          } else {
            console.log(`Stat item not found for card ${i + 1}`);
          }
        });

        const themeObserver = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.attributeName === "class") {
              updateThemeClasses();
            }
          }
        });
        themeObserver.observe(document.body, { attributes: true });

        const firstInnerDiv = secondTargetDiv.querySelector("div");
        if (firstInnerDiv) {
          firstInnerDiv.style.display = "none";
        }
      } else {
        console.log("Target div not found. Retry in 500ms...");
        setTimeout(updateMarketOverview, 500);
      }
    };

    const observer = new MutationObserver((mutations) => {
      updateMarketOverview();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  uniqueCreateMarketOverviewExtensionV5();
})();
