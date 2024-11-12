document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("[data-form]");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const searchTerm = document.querySelector("input[type='text']").value.trim();
        if (searchTerm === "") {
            displayMessage("Please enter a search term.");
            return;
        }

        const url = `https://google-search74.p.rapidapi.com/?query=${encodeURIComponent(searchTerm)}&limit=10&related_keywords=true`;
        bringData(url);
    });
});

export const bringData = async (url) => {
    const h2Element = document.querySelector("h2");
    if (h2Element) {
        h2Element.classList.add("d-none");
    } else {
        console.error("h2 element not found");
    }

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'bfc7953943msh431067ed91529abp181653jsncc01aac63a53', // Replace with your actual API key
            'x-rapidapi-host': 'google-search74.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        if (result.results && result.results.length > 0) {
            showData(result);
        } else {
            displayMessage("No results found.");
        }
    } catch (error) {
        console.error(error);
        const spinner = document.querySelector(".spinner-container");
        if (spinner) {
            spinner.style.display = "none"; 
        }
        const dynamicDataContainer = document.querySelector(".dynamic_data");
        if (dynamicDataContainer) {
            dynamicDataContainer.innerHTML = `<pre>${error.message}</pre>`;
        }
    }
};

const showData = (data) => {
    const spinner = document.querySelector(".spinner-container");
    if (spinner) {
        spinner.classList.add("d-none"); 
    }

    const h2Element = document.querySelector("h2");
    if (h2Element) {
        h2Element.classList.remove("d-none"); 
    }

    const container = document.querySelector(".dynamic_data");
    data.results.forEach((result) => {
        const resultHtml = `
            <div class="col">
                <article class="card">
                    <div class="card-body">
                        <h5 class="card-title"><a href="${result.url}" target="_blank">${result.title}</a></h5>
                        <p class="card-text">${result.description}</p>
                    </div>
                </article>
            </div>
        `;
        container.innerHTML += resultHtml;
    });
};

const displayMessage = (message) => {
    const container = document.querySelector(".dynamic_data");
    container.innerHTML = `<p>${message}</p>`;
};
