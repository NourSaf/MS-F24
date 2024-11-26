import categories from './categories.js';

//------------------------------------------------
// Gloable variables
//------------------------------------------------
let colorScale, xScale, yScale;
const BOOKNAME = 'name';

//------------------------------------------------
// Loading data
//------------------------------------------------
async function loadData(){
  createLayout()
  const data = await d3.json('./myData.json');
  console.log('This is all the data', data)
  
}

//------------------------------------------------
// Create an initial layout for the page before the date loaded
//------------------------------------------------
function createLayout(){

  colorScale = d3.scaleOrdinal(["#6e40aa","#bf3caf","#fe4b83","#ff7847","#e2b72f","#aff05b","#52f667","#1ddfa3","#23abd8","#4c6edb","#6e40aa"]);
  
  //assinging a color for each main category from categories object keys
  const categoryColors = {};
  Object.keys(categories).forEach((category, index) => {
    categoryColors[category] = colorScale(index);
  });

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
loadData()


// const topics_category = await d3.json("./topics_3.json");
// // console.log('This is Categories for filtering', categories)

// const categorizedTopics = {};
// topics_category.forEach(({ word, count }) => {
//   for (const [category, keywords] of Object.entries(categories)) {
//     if (keywords.includes(word)) {
//       if (!categorizedTopics[category]) {
//         categorizedTopics[category] = [];
//       }
//       categorizedTopics[category].push({ word, count });
//       break;
//     }
//   }
// });
// console.log("This is Categorized Topics",categorizedTopics);
