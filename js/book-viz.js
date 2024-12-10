
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
        updateCategoryBarChart();
        updateTopicWordsBarChart(); // Add this line


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
    updateCategoryBarChart()
    updateTopicWordsBarChart(); 

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
        .style("padding", "2px")
        .on("mouseover", function() {
          d3.select(this).style("opacity", 0.5)
          .style('cursor', 'crosshair');
      })
      .on("mouseout", function() {
        d3.select(this).style("opacity", 1);
    });
      

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
        })

        .on("mouseout", function() {
            d3.select(this).style("opacity", 1);
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
    updateCategoryBarChart();
}

function updateCategoryBarChart() {
  const categoryData = Array.from(activeCategories).map(category => ({
      category,
      count: allData.reduce((sum, { topicCounts }) => sum + (topicCounts[category] || 0), 0)
  }));

  const margin = { top: 20, right: 20, bottom: 20, left: 40 };
  const width = 400 - margin.left - margin.right;
  const height = 200 - margin.top - margin.bottom;

  d3.select("#category-bar-chart").selectAll("*").remove();

  const svg = d3.select("#category-bar-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

  const y = d3.scaleLinear()
      .range([height, 0]);

  x.domain(categoryData.map(d => d.category));
  y.domain([0, d3.max(categoryData, d => d.count)]);

  svg.selectAll(".bar")
      .data(categoryData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.category))
      .attr("width", x.bandwidth())
      .attr("y", d => y(d.count))
      .attr("height", d => height - y(d.count))
      .attr("fill", d => categoryColors[d.category])
      .on("mouseover", function(event, d) {
        d3.select(this).style('opacity',0.5).style('cursor', 'crosshair')
        d3.select(".tooltip")
          .style("left", `${event.pageX}px`)
          .style("top", `${event.pageY}px`)
          .style("opacity", 1)
          .html(`
          <div><strong>Category:</strong> ${d.category}</div>
          <div><strong>Count:</strong> ${d.count}</div>
          `);
      })
      .on("mouseout", function() {
        d3.select(this).style('opacity',1).style('cursor', 'crosshair')       
        d3.select(".tooltip").style("opacity", 0);
      });

  svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .select('.domain').remove()
      svg.selectAll(".tick ").remove();

  svg.append("g")
      .call(d3.axisLeft(y).ticks(4).tickSize(-width).tickFormat(d3.format("d"))).style('opacity',0.5)
      .select('.domain').remove()
}

function updateTopicWordsBarChart() {
    const wordCounts = {};
    
    // Filter data based on active categories
    const filteredData = allData.filter(({ topicCounts }) => 
        Object.keys(topicCounts).some(category => activeCategories.has(category))
    );

    // Count words from filtered data
    filteredData.forEach(({ item }) => {
        item.topic.forEach(topic => {
            topic.toLowerCase().split(' ').forEach(word => {
                if (word.length > 4) { // Only count words longer than 4 characters
                    wordCounts[word] = (wordCounts[word] || 0) + 1;
                }
            });
        });
    });

    // Sort and take the top 50 words
    const sortedWords = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 30);

    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    d3.select("#topic-words-bar-chart").selectAll("*").remove();

    const svg = d3.select("#topic-words-bar-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .range([height, 0]);

    x.domain(sortedWords.map(d => d[0]));
    y.domain([0, d3.max(sortedWords, d => d[1])]);

    svg.selectAll(".bar")
        .data(sortedWords)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d[0]))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d[1]))
        .attr("height", d => height - y(d[1]))
        .attr("fill", d => {
            // Assign color based on category if word belongs to it
            for (const [category, keywords] of Object.entries(categories)) {
                if (keywords.includes(d[0])) {
                    return categoryColors[category];
                }
            }
            return "#4c6edb"; // Default color if word doesn't match any category
        })
        .on("mouseover", function (event, d) {
            d3.select(this).style("opacity", 0.5).style("cursor", "crosshair");
            d3.select(".tooltip")
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 10}px`)
                .style("opacity", 1)
                .html(`
                    <div><strong>Word:</strong> ${d[0]}</div>
                    <div><strong>Count:</strong> ${d[1]}</div>
                `);
        })
        .on("mouseout", function () {
            d3.select(this).style("opacity", 1);
            d3.select(".tooltip").style("opacity", 0);
        });

        svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .select('.domain').remove()
        svg.selectAll(".tick ").remove();
  
    svg.append("g")
        .call(d3.axisLeft(y).ticks(4).tickSize(-width).tickFormat(d3.format("d"))).style('opacity',0.5)
        .select('.domain').remove()
}


initialize();