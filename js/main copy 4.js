import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

const data = await d3.json('./myData.json');
console.log(data);

const topic = data.map(i => i.topic);

let topics = [];
topic.forEach(t => {
  t.forEach(topic_book => {
    topics.push(topic_book);
  });
});
console.log(topics);

let newPhrase = [];
topics.forEach(topic => {
  topic.split(' ').forEach(word => {
    word = word.toLowerCase().replace(/[^a-zA-Z ]/g, " ");
    if (word.length > 0) newPhrase.push(word);
  });
});
console.log('this is my new phrase', newPhrase);

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

const sorted = frequency.sort((a, b) => b.count - a.count);
const topic_filtered = sorted.filter(item => !["and", "an","in","of","etc"].includes(item.splited_word) && item.splited_word.length > 2);
console.log("this count filtered",topic_filtered)


const categories = {
  "Government & Politics": ["government", "politics", "political", "policy", "state", "presidents", "nationalism", "parties", "elections", "public"],
  "History & Society": ["history", "civilization", "antiquities", "historical", "social", "culture", "customs", "relations", "society"],
  "Ethnic & Cultural Identity": ["african", "americans", "race", "ethnic", "indigenous", "mayas", "indian", "mexican", "black", "hispanic"],
  "Economics & Labor": ["economic", "labor", "trade", "development", "agriculture", "resources", "industry"],
  "Rights & Law": ["rights", "civil", "legal", "laws", "slavery", "suffrage", "power", "determination", "conflict"],
  "War & Military": ["war", "military", "reconstruction", "imperialism", "violence"],
  "Arts & Literature": ["art", "literature", "music", "painting", "architecture", "cartoons", "caricatures"],
  "Science & Technology": ["science", "studies", "anthropology", "conservation", "health", "development"],
  "Religion & Philosophy": ["religion", "religious", "philosophy", "moral", "belief"],
  "Environment": ["environmental", "land"]
};


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
console.log("this is my cat topic", categorizedTopics);

const colorScale = d3.scaleOrdinal(["#6e40aa","#bf3caf","#fe4b83","#ff7847","#e2b72f","#aff05b","#52f667","#1ddfa3","#23abd8","#4c6edb","#6e40aa"]);

const categoryColors = {};
Object.keys(categories).forEach((category, index) => {
  categoryColors[category] = colorScale(index);
});
console.log(categoryColors);



data.forEach(item => {
  const topics = item.topic;

  let newPhrase = [];
  topics.forEach(topic => {
    topic.split(' ').forEach(word => {
      word = word.toLowerCase().replace(/[^a-zA-Z ]/g, " ");
      if (word.length > 0) newPhrase.push(word);
    });
  });

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



const mainContainer = d3.select(".mainBodyContent")
  .style("display", "flex")
  .style("flex-wrap", "wrap")
  .style("gap", "5px");

const div = mainContainer.append("div").attr("class", "bar-container");

const totalTopics = Object.values(topicCounts).reduce((a, b) => a + b, 0);
const barWidth = 25;
const barHeight = 35;
const svg = div.append("svg")
  .attr("width", barWidth)
  .attr("height", barHeight);

const stack = d3.stack()
  .keys(Object.keys(topicCounts))
  .value((d, key) => topicCounts[key]);

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
  .attr("width", barWidth);

  
});

const topics_year = d3.rollup(data,
  (v)=> v.length,
  (d) => d.bookYear,
)

// const timelineSvg = d3.select(".timeline")
//   .append("svg")
//   .attr("width", 800)
//   .attr("height", 400);

// const xScale = d3.scaleBand()
//   .domain(Array.from(topics_year.keys()))
//   .range([0, 1000])
//   .padding(0.1);

// const yScale = d3.scaleLinear()
//   .domain([0, d3.max(Array.from(topics_year.values()))])
//   .range([400, 0]);

// timelineSvg.append("g")
//   .attr("transform", "translate(0, 380)")
//   .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

// timelineSvg.append("g")
//   .attr("transform", "translate(20, 0)")
//   .call(d3.axisLeft(yScale));

// timelineSvg.selectAll(".bar")
//   .data(Array.from(topics_year.entries()))
//   .enter()
//   .append("rect")
//   .attr("class", "bar")
//   .attr("x", d => xScale(d[0]))
//   .attr("y", d => yScale(d[1]))
//   .attr("width", xScale.bandwidth())
//   .attr("height", d => 400 - yScale(d[1]))
//   .attr("fill", "#69b3a2");

console.log("Topic year",topics_year)
const plotData = Array.from(topics_year.entries()).map(([year, count]) => ({ year, count }));

const plot = Plot.plot({
  grid: false,
  inset: 10,
  color: { legend: false },
  marks: [
    // Plot.frame(),
    Plot.dot(plotData, { x: "year", y: "count", stroke: "count" })
  ]
});

const timeline_div = document.querySelector(".timeline");
timeline_div.appendChild(plot);

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

const plotData_2 = Object.entries(categorizedTopics).flatMap(([category, words]) => 
  words.map(({ word, count }) => ({ category, word, count }))
).sort((a, b) => b.count - a.count).slice(0,20);

const plot_2 = Plot.plot({
  grid: true,
  x: { label: "Word" },
  y: { label: "Count" },
  symbol: { legend: true },
  marks: [
    Plot.dot(plotData_2, { x: "word", y: "count", stroke: "category", symbol: "category" })
  ],
  style: {
    fontFamily: "Mono",
    fontSize: "5px"
  }
});

const timeline_div_2 = document.querySelector(".timeline");
timeline_div.appendChild(plot_2)

const donChart_width  = 150;
const donChart_height = 150;
const donChart_margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
let radius = Math.min(donChart_width, donChart_height) / 2 - donChart_margin

// append the svg object to the div called 'my_dataviz'
let svg = d3.select(".my_dataviz")
  .append("svg")
    .attr("width", donChart_width)
    .attr("height", donChart_height)
  .append("g")
    .attr("transform", "translate(" + donChart_width / 2 + "," + donChart_height / 2 + ")");

var testData = {a: 9, b: 20, c:30, d:8, e:12}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(Object.keys(categories))
  .range(["#6e40aa","#bf3caf","#fe4b83","#ff7847","#e2b72f","#aff05b","#52f667","#1ddfa3","#23abd8","#4c6edb","#6e40aa"])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value((d) => d)
var data_ready = pie(Object.values(testData))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('whatever')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(50)         // This is the size of the donut hole
    .outerRadius(radius)
  )
  .attr('fill', function(d, i){ return(color(Object.keys(testData)[i])) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

  const object_cat = Object.values(categories)
  console.log("this is my object cat",object_cat)
  