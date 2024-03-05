(function() {
    let initialized = false;

    function uniqueCreateMarketOverviewExtensionV5() {
        console.log('Attempting to initialize Market Overview Extension...');

        const updateThemeClasses = () => {
            const isNight = document.body.classList.contains('NIGHT');
            const pElements = document.querySelectorAll('.card-info-p');
            pElements.forEach(p => {
                p.classList.remove('etDiuO', 'kKpPOn');
                if (isNight) {
                    p.classList.add('etDiuO');
                } else {
                    p.classList.add('kKpPOn');
                }
            });
        };

        const updateMarketOverview = () => {
            if (initialized) {
                console.log('Market Overview Extension already initialized. Skipping...');
                return;
            }

            // Use querySelectorAll to get all matching elements
            const targetDivs = document.querySelectorAll('.grid > div[style="padding-top:1px"] > div > div > div[data-sensors-click="true"]');

            // Check if there are at least two elements matching the selector
            if (targetDivs.length > 1) {
                // Specifically select the second div with [data-sensors-click="true"]
                const secondTargetDiv = targetDivs[1]; // Second element has index 1

                console.log('Second target div with data-sensors-click="true" found. Proceeding with updates...');
                initialized = true;                

                const newDiv = document.createElement('div');
                newDiv.className = 'sc-1a5c8bdf-1 aZNqQ';
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
                        <div class="sc-c50d2aab-13 kilDhP card-1">
                            <div class="card-info-div">
                                <p class="sc-4984dd93-0 etDiuO card-info-p"></p>
                            </div>
                            <div class="card-data-div">
                                <span class="card-data-span kilDhP price-change"></span>
                                <span class="card-change-span"></span>
                            </div>
                        </div>
                        <div class="sc-c50d2aab-13 kilDhP card-2">
                            <div class="card-info-div">
                                <p class="sc-4984dd93-0 etDiuO card-info-p"></p>
                            </div>
                            <div class="card-data-div">
                                <span class="card-data-span kilDhP price-change"></span>
                                <span class="card-change-span"></span>
                            </div>
                        </div>
                        <div class="sc-c50d2aab-13 kilDhP card-3">
                            <div class="card-info-div">
                                <p class="sc-4984dd93-0 etDiuO card-info-p"></p>
                            </div>
                            <div class="card-data-div">
                                <span class="card-data-span kilDhP price-change"></span>
                            </div>
                        </div>
                    </div>`;

                    // Append the new div as a child of the secondTargetDiv
                    secondTargetDiv.appendChild(newDiv);
                    updateThemeClasses();
    
                    const globalHeader = document.querySelector('div[data-role="global-header"]');
                    const statItems = globalHeader.querySelectorAll('.glo-stat-item');
                    const cards = newDiv.querySelectorAll('.sc-c50d2aab-13.kilDhP');
    
                    // Adjusted indexes to match the correct elements, assuming [2, 3, 4] are Market Cap, 24H Volume, and Dominance respectively
                    [2, 3, 4].forEach((index, i) => {
                        console.log(`Attempting to fetch data for card ${i + 1}`);
                        if (statItems[index]) {
                            const textElement = statItems[index].querySelector('.sc-f70bb44c-0.jNqpFI.base-text');
                            const text = textElement ? textElement.innerText : '';
    
                            let data, svgHtml = '', percentageChange = '';
    
                            if (i < 2) { // For Market Cap and 24H Volume
                                const dataElement = statItems[index].querySelector('a');
                                const percentageElement = statItems[index].querySelector('.sc-59e437b5-3');
                                const svgElement = statItems[index].querySelector('svg');
    
                                data = dataElement ? dataElement.innerText : '';
                                svgHtml = svgElement ? svgElement.outerHTML : '';
                                percentageChange = percentageElement ? percentageElement.outerHTML : '';
                            } else { // For Dominance
                                const dominanceElement = statItems[index].querySelector('a');
                                data = dominanceElement ? dominanceElement.innerText : '';
                            }
    
                            if (data) {
                                console.log(`Successfully fetched data for card ${i + 1}`);
                                cards[i].querySelector('.card-info-p').innerText = text;
                                cards[i].querySelector('.card-data-span').innerText = data;
    
                                if (i < 2) { // Only for Market Cap and 24H Volume
                                    cards[i].querySelector('.card-change-span').innerHTML = svgHtml + percentageChange;
                                }
                            } else {
                                console.log(`Failed to fetch data for card ${i + 1}`);
                            }
                        } else {
                            console.log(`Stat item not found for card ${i + 1}`);
                        }
                    });
    
                    const themeObserver = new MutationObserver(mutations => {
                        mutations.forEach(mutation => {
                            if (mutation.attributeName === 'class') {
                                updateThemeClasses();
                            }
                        });
                    });
                    themeObserver.observe(document.body, { attributes: true });

                    // Hide the first div inside the second div with data-sensors-click="true"
                    const firstInnerDiv = secondTargetDiv.querySelector('div');
                    if (firstInnerDiv) {
                        firstInnerDiv.style.display = 'none';
                    }
                } else {
                    console.log('Target div not found. Retry in 500ms...');
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