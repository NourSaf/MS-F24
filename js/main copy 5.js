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
console.log("this is my cat topic",categorizedTopics);

const colorScale = d3.scaleOrdinal(["#6e40aa","#bf3caf","#fe4b83","#ff7847","#e2b72f","#aff05b","#52f667","#1ddfa3","#23abd8","#4c6edb","#6e40aa"]);

const categoryColors = {};
Object.keys(categories).forEach((category, index) => {
  categoryColors[category] = colorScale(index);
});
console.log(categoryColors);

data.slice(0, 20).forEach(item => {
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
  console.log("This is Total Topics Count", totalTopics);

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
    .domain([0, totalTopics ])
    .range([barHeight, 0]);
console.log('this is yscale',yScale)
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

//legend for the first books and categories
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

  

//Donut Chart
const donChart_width  = 150;
const donChart_height = 150;
const donChart_margin = 10;
const innerRadiusCharts = 50;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
let radius = Math.min(donChart_width, donChart_height) / 2 - donChart_margin


//---------------------------------------------
// Create a structure so that you select .my_dataviz only once
//---------------------------------------------
// append the svg object to the div called 'my_dataviz'
let svg = d3.select(".my_dataviz")
  .append("svg")
    .attr("width", donChart_width)
    .attr("height", donChart_height)
  .append("g")
    .attr("transform", "translate(" + donChart_width / 2 + "," + donChart_height / 2 + ")");

// var testData = {a: 9, b: 20, c:30, d:8, e:12}

const testData = [
  {
      word: "art",
      count: 818
  },
  {
      word: "literature",
      count: 178
  },
  {
      word: "cartoons",
      count: 101
  },
  {
      word: "music",
      count: 99
  },
  {
      "word": "architecture",
      count: 95
  },
  {
      word: "caricatures",
      count: 74
  },
  {
      word: "painting",
      count: 50
  }
];

const testData_print = testData.map(d => d.word);
const dataCount = testData.map(d => d.count);

console.log("This is data tested printed", Object.values(testData_print));
console.log("This is data tested printed", Object.values(dataCount));

// const eachCat = Array.from(testData_print).map(entry => entry[1])
// console.log('this is my test data Object –––––>', Object.keys(eachCat))

// set the color scale
var color = d3.scaleOrdinal()
  .domain(Object.values(testData_print))
  .range([
    "#2a184e", // Deepest shade
    "#3a2270", // Darkest shade
    "#56328b", // Dark shade
    "#6e40aa", // Base color
    "#8557b5", // Mid-light shade
    "#a17dcf", // Light shade
    "#c6a7e3", // Lighter shade
    "#e2d3f3"  // Lightest shade
  ])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value((d) => d)
var data_ready = pie(Object.values(dataCount))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.

svg
  .selectAll('h')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(innerRadiusCharts) // This is the size of the donut hole
    .outerRadius(radius) 
  )
  .attr('fill', (d) => {
    const word = testData.find(item => item.count === d.data).word;
    console.log('this is WORD', word);
    return color(word);
  })
  .on("mouseover", function(event, d) {
    const word = testData.find(item => item.count === d.data).word;
    const count = d.data;
    d3.select(this)
      .style("opacity","0.7");
    d3.select(".tooltip-container").append("div")
      .attr("class", "tooltip")
      .text(`${word}: ${count}`)
      .style("color", "white")
      .style("height", "auto")
      .style("font-size","0.7em");
  })
  .on("mouseout", function() {
    d3.select(this)
      .style("opacity", 1);
    d3.select(".tooltip").remove();
  })
  .text(Object.keys(categorizedTopics)[0])
  .style("color","white");
  
const economicData = [
  {
    word: "economic",
    count: 692
  },
  {
    word: "labor",
    count: 128
  },
  {
    word: "industry",
    count: 65
  },
  {
    word: "development",
    count: 64
  },
  {
    word: "trade",
    count: 61
  },
  {
    word: "agriculture",
    count: 54
  },
  {
    word: "resources",
    count: 53
  }
];

const economicData_print = economicData.map(d => d.word);
const economicDataCount = economicData.map(d => d.count);

console.log("This is economic data printed", Object.values(economicData_print));
console.log("This is economic data count printed", Object.values(economicDataCount));

var economicColor = d3.scaleOrdinal()
  .domain(Object.values(economicData_print))
  .range([
    "#732e18", // Deepest shade
    "#a63f23", // Darkest shade
    "#d35232", // Dark shade
    "#ff7847", // Base color
    "#ff9b72", // Mid-light shade
    "#ffbba1", // Light shade
    "#ffd9c9", // Lighter shade
    "#ffece4"  // Lightest shade
  ]);

let svg_2 = d3.select(".my_dataviz2")
  .append("svg")
    .attr("width", donChart_width)
    .attr("height", donChart_height)
  .append("g")
    .attr("transform", "translate(" + donChart_width / 2 + "," + donChart_height / 2 + ")");
var economicPie = d3.pie()
  .value((d) => d);
var economicData_ready = economicPie(Object.values(economicDataCount));
 
svg_2
  .selectAll('g')
  .data(economicData_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(innerRadiusCharts) // This is the size of the donut hole
    .outerRadius(radius) 
  )

  .attr('fill', (d) => {
    const word = economicData.find(item => item.count === d.data).word;
    console.log('this is WORD', word);
    return economicColor(word);
  })
  .on("mouseover", function(event, d) {
    const word = economicData.find(item => item.count === d.data).word;
    const count = d.data;
    d3.select(this)
      .style("opacity","0.7");
    d3.select(".tooltip-container").append("div")
      .attr("class", "tooltip")
      .text(`${word}: ${count}`)
      .style("color", "white")
      .style("height", "auto")
      .style("font-size","0.7em");
  })
  .on("mouseout", function() {
    d3.select(this)
      .style("opacity", 1);
    d3.select(".tooltip").remove();
  })
  .text(Object.keys(categorizedTopics)[4])
  .style("color","white");





const object_cat = Object.values(categories)
console.log("this is my object cat",object_cat)

const topics_year = d3.rollup(data,
  (v)=> v.length,
  (d) => d.bookYear,
)


console.log("Topic year",topics_year)


