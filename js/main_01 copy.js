import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

const categories = {
  "Government & Politics": ["government", "politics", "political", "policy", "state", "presidents", "nationalism", "parties", "elections", "public"],
  "History & Society": ["history", "civilization", "antiquities", "historical", "social", "culture", "customs", "relations", "society"],
  "Economics & Labor": ["economic", "labor", "trade", "development", "agriculture", "resources", "industry"],
  "Rights & Law": ["rights", "civil", "legal", "laws", "slavery", "suffrage", "power", "determination", "conflict"],
  "Arts & Literature": ["art", "literature", "music", "painting", "architecture", "cartoons", "caricatures"]
};

const colorScale = d3.scaleOrdinal(["#6e40aa","#4c6edb","#fe4b83","#ff7847","#52f667","#aff05b","#52f667","#1ddfa3","#23abd8","#4c6edb","#6e40aa"]);

let categoryColors = {};

Object.keys(categories).forEach((category, index) => {
  categoryColors[category] = colorScale(index);
});
console.log(categoryColors);

async function loadData(){
  createLayout();
  const data = await d3.json('./myData.json');
  console.log(data);
  topicsCount(data);
}

function topicsCount(data) {
  
  //entering the topics for each book
  data.forEach(item => {
    const topics = item.topic;

    let newPhrase = [];
    topics.forEach(topic => {
      topic.split(' ').forEach(word => {
        word = word.toLowerCase().replace(/[^a-zA-Z ]/g, " ");
        if (word.length > 0) newPhrase.push(word);
      });
    });
    console.log('––––> newPhrase', newPhrase)
    let frequency = [];
    newPhrase.forEach(word => {
      word.split(' ').forEach(splited_word => {
        if (splited_word.length > 0) {
          let match = frequency.find(i => i.splited_word === splited_word);
          if (match) {
            match.count++;
          } else {
            frequency.push({ splited_word, count: 1 });
          }
        }
      });
    });

    const topicCounts = {};
    frequency.forEach(({ splited_word, count }) => {
      for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.includes(splited_word)) {
          if (!topicCounts[category]) {
            topicCounts[category] = 0;
          }
          topicCounts[category] += count;
        }
      }
    });
    
    //for each book how many topics from categories exesit in the book
    //-----------------------------------------------------------------
    console.log('This is topic count', topicCounts)
    //-----------------------------------------------------------------

  const mainContainer = d3.select(".mainVizContent")
    .style("display", "flex")
    .style("flex-wrap", "wrap")
    .style("gap", "5px");

  const div = mainContainer.append("div").attr("class", "bar-container");

  //aggregates the values of the categoreies values 
  const totalTopics = Object.values(topicCounts).reduce((a, b) => a + b, 0);
  console.log('This is reduced-->', totalTopics)

  //------------------------------------------------------------------------
  // creating a the stacked bar chart for each book
  //------------------------------------------------------------------------
  const barWidth = 25;
  const barHeight = 35;
  const svg = div.append("svg")
    .attr("width", barWidth)
    .attr("height", barHeight);

  const stack = d3.stack()
    .keys(Object.keys(topicCounts))
    .value((d, key) => topicCounts[key]);

  const series = stack([topicCounts]);
  console.log('this is Series', series)

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
    .attr("width", barWidth);
  })
};

function createLayout(){
const legendDiv = d3.select('.legend')
const legend = legendDiv.append("div").attr("class", "legend");

  Object.entries(categoryColors).forEach(([category, color]) => {
    const legendItem = legend.append("div").attr("class", "legend-item")
      .style("display", "flex")
      .style("align-items", "center")
      .style("margin-bottom", "5px");

    legendItem.append("div")
      .style("width", "12px")
      .style("height", "12px")
      .style("background-color", color)
      .style('border-radius','20px')
      .style("margin-right", "5px");

    legendItem.append("span").text(category);
  });
}

loadData();

async function wordsCategoriesCounter(){
  const topics_category = await d3.json("./topics_3.json");
  const categorizedTopics = {};
  topics_category.forEach(({ word, count }) => {
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.includes(word)) {
        if (!categorizedTopics[category]) {
          categorizedTopics[category] = [];
        }
        categorizedTopics[category].push({ word, count });
        break;
      }
    }
  });
  console.log('this is my data Topic Categories',categorizedTopics);
}
