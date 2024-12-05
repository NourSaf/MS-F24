// import * as d3 from "./path/to/d3";

const categories = {
    "Government": ["government", "politics", "policy", "administration", "governance", "bureaucracy", "regulation", "authority", "state"],
    "History & Society": ["public", "nationalism", "history", "civilization", "antiquities", "historical", "social", "culture", "customs", "relations", "society"],
    "Economics & Labor": ["parties", "economic", "labor", "trade", "development", "agriculture", "resources", "industry"],
    "Rights & Law": ["rights", "civil", "legal", "laws", "slavery", "suffrage", "power", "determination", "conflict"],
    "Arts & Literature": ["art", "literature", "music", "painting", "architecture", "cartoons", "caricatures"]
};

const colorScale = d3.scaleOrdinal(["#6e40aa","#4c6edb","#fe4b83","#ff7847","#52f667","#aff05b","#52f667","#1ddfa3","#23abd8","#4c6edb","#6e40aa"]);
const categoryColors = Object.fromEntries(Object.keys(categories).map((category, index) => [category, colorScale(index)]));

let allData = [];
let activeCategories = new Set(Object.keys(categories));

async function initialize() {
    createLayout();
    try {
        const rawData = await d3.json('./myData.json');
        console.log(rawData)
        allData = processData(rawData);
        updateVisualization();
    } catch (error) {
        console.error("Error loading or processing data:", error);
    }
}

function processData(rawData) {
    return rawData.map(item => ({
        item,
        topicCounts: countTopics(item.topic)
    }));
}

function countTopics(topics) {
    const words = topics.flatMap(topic => 
        topic.toLowerCase().replace(/[^a-zA-Z ]/g, " ").split(' ').filter(word => word.length > 0)
    );
    const topicCounts = {};
    
    words.forEach(word => {
        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords.includes(word)) {
                topicCounts[category] = (topicCounts[category] || 0) + 1;
                break;
            }
        }
    });
    return topicCounts;
}

function updateVisualization() {
    const filteredData = allData.filter(({ topicCounts }) => 
        Object.keys(topicCounts).some(category => activeCategories.has(category))
    );

    const mainContainer = d3.select(".mainVizContent");
    mainContainer.selectAll("*").remove();

    filteredData.forEach(({ item, topicCounts }) => {
        const div = mainContainer.append("div").attr("class", "bar-container");
        createStackedBar(div, topicCounts, item);
    });
}

function createStackedBar(container, topicCounts, bookInfo) {
    const barWidth = 25;
    const barHeight = 35;
    const totalTopics = Object.values(topicCounts).reduce((a, b) => a + b, 0);
    const sortedCategories = Object.keys(categories);
    const sortedTopicCounts = sortedCategories.reduce((acc, category) => {
        if (topicCounts[category]) {
            acc[category] = topicCounts[category];
        }
        return acc;
    }, {});

    const stack = d3.stack()
        .keys(Object.keys(sortedTopicCounts))
        .value((_, key) => sortedTopicCounts[key]);
    const svg = container.append("svg")
        .attr("width", barWidth)
        .attr("height", barHeight)
        .style("padding", "2px");

    const series = stack([topicCounts]);

    const yScale = d3.scaleLinear()
        .domain([0, totalTopics])
        .range([barHeight, 0]);

    svg.selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .attr("fill", d => categoryColors[d.key])
        .selectAll("rect")
        .data(d => d)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", d => yScale(d[1]))
        .attr("height", d => yScale(d[0]) - yScale(d[1]))
        .attr("width", barWidth)
        .on("mouseover", function(event) {
            d3.select(".tooltip")
                .style("left", `${event.pageX}px`)
                .style("top", `${event.pageY}px`)
                .style("opacity", 1)
                .html(`
                    <div><strong>Title:</strong> ${bookInfo.name.toLowerCase()}</div>
                    <div><strong>Author:</strong> ${bookInfo.authorName}</div>
                    <div><strong>Year:</strong> ${bookInfo.bookYear}</div>
                    <div><strong>Language:</strong> ${bookInfo.language}</div>
                `);
        });
      }
function createLayout() {
    const legend = d3.select('.legend');

    Object.entries(categoryColors).forEach(([category, color]) => {
        const legendItem = legend.append("div")
            .attr("class", "legend-item");

        legendItem.append("input")
            .attr("type", "checkbox")
            .attr("id", `checkbox-${category}`)
            .property("checked", true)
            .on("change", function () {
                toggleCategory(category, this.checked);
            });

        legendItem.append("div")
            .attr("class", "custom-checkbox")
            .style("background-color", color)
            .style('border-radius', '20px');

        legendItem.append("label")
            .attr("for", `checkbox-${category}`)
            .text(category);
    });
}

document.addEventListener("click", function(event) {
    if (!event.target.closest("rect")) {
        d3.select(".tooltip").style("opacity", 0);
    }
});

function toggleCategory(category, isActive) {
    if (isActive) {
        activeCategories.add(category);
    } else {
        activeCategories.delete(category);
    }
    updateVisualization();
}

initialize();