
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

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

const BOOK = "name";
const categoryColors = {};

let state = {
  data: [],
  filters: {
    menu: [],
    checked: [],
  },
  tooltip: {
    value: "",
    visible: false,
    coordinates: [0, 0],
  },
  dimensions: [window.innerWidth, window.innerHeight],
};

// initializing these globally will be useful later
let xScale, yScale, colorScale;

async function dataLoad() {
  // we can set up our layout before we have data
  //Set up the layout before the load of data -> call layoutIntialization();
  initializeLayout()
  const data = await d3.json('./myData.json');
  console.log("This is my Data",data);
  
  // we also populate our checkboxes with values from the data
  const categories_names = Object.keys(categories)
  console.log("This is Categories name",categories_names)
  //the same result as from Object.keys we get from Array.from after getting the keys from the object and puting then in an array
  const checkboxValues = Array.from(new Set(categories_names.map(d => d)))
  console.log("This is my checkbox Value", checkboxValues)
  
  setState({
    data: data.map((d,i) => ({
      ...d,
      id: d[BOOK] + "_" + i,
    })),
    filters: {
      manu: checkboxValues,
      checked: checkboxValues,
    }
  })
}

// whenever state changes, update the state variable, then redraw the viz
function setState(nextState) {
  // console.log("state updated");
  // using Object.assign keeps the state *immutable*
  state = Object.assign({}, state, nextState);
  console.log("This is my State",state)
  draw();
}

function onCheckboxChange(e){

  console.log("This is target Name", e.target.name);
  const index = state.filters.checked.indexOf(d.target.name)
  const isBoxChecked = index > -1;
  let nextCheckeValues;
  if(isBoxChecked){
    nextCheckeValues = [
      ...state.filters.checked.slice(0, index),
      ...state.filters.checked.slice(index + 1)
    ]
  }
  else {
    nextCheckeValues = [
      ...state.filters.checked,
      d.target.name,
    ]
  }
  setState({
    filters: {
      ...state.filters,
      checked: nextCheckeValues,
    },
  });
}

//--------------------------------
// HERE, you can ADD a MOUSEOVER function for a hover effect to show the details for each book
//--------------------------------

//This is layout function
function initializeLayout(){

  const SVG_ = 800;
  const SVG_HEIGHT = 800;
  const MARGIN = 80; 

  const parent = d3.select('.mainVizContent')
  const filterMenu = d3.select('.legend')
  filterMenu.append('div')
    .attr('class',)

  //legend for the first books and categories
  const legendDiv = d3.select('.legend')
  const legend = legendDiv.append("div").attr("class", "legend");

  colorScale = d3.scaleOrdinal(["#6e40aa","#bf3caf","#fe4b83","#ff7847","#e2b72f","#aff05b","#52f667","#1ddfa3","#23abd8","#4c6edb","#6e40aa"]);

  Object.keys(categories).forEach((category, index) => {
    categoryColors[category] = colorScale(index);
  });
  console.log("This is each category color",categoryColors);


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

  legendItem.append("span").text(category).attr('class','filters');
  });
}

function draw(){
  const filteredData = state.data
  .filter(d => state.filters.checked.indexOf(d[BOOK]>-1));
  

  const checkRow = d3 
    .select('.filters')
    .selectAll('.check-row')
    .data(state.filters.menu)
    .join('div')
    .attr('class','check-row')
    .html(
      d => `
      <input name="${d}" type = "checkbox" ${state.filters.checked.indexOf(d)>-1 ? "checked":""}></input>
      <lable for="${d}"> ${d} </lable>
      `
    );
  checkRow.select("input").on('change',onCheckboxChange);

  //----------------------------------------
  // Continue here to upade how many bars to show when clicked on a check box
  //----------------------------------------
}

async function dataProcessing() {

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

colorScale = d3.scaleOrdinal(["#6e40aa","#bf3caf","#fe4b83","#ff7847","#e2b72f","#aff05b","#52f667","#1ddfa3","#23abd8","#4c6edb","#6e40aa"]);

const categoryColors = {};
Object.keys(categories).forEach((category, index) => {
  categoryColors[category] = colorScale(index);
});
console.log("This is each category color",categoryColors);
}

async function draws(){
const data = await d3.json("./myData.json");
data.slice(0, 2000).forEach(item => {
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
}


dataLoad()