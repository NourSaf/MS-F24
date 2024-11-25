(async () => {
  // Load data
  const data = await d3.json('./myData.json');
  console.log(data);

  // Validate and process data
  const topics = [];
  data.forEach(item => {
    if (item.topic && Array.isArray(item.topic)) {
      item.topic.forEach(topic => topics.push(topic));
    }
  });

  // Process words into normalized phrases
  const processWords = (text) => {
    return text
      .split(' ')
      .map(word => word.toLowerCase().replace(/[^a-zA-Z]/g, '').trim())
      .filter(word => word.length > 0);
  };

  const newPhrase = topics.flatMap(processWords);
  console.log('Processed words:', newPhrase);

  // Calculate word frequencies
  const frequency = {};
  newPhrase.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  const sorted = Object.entries(frequency)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);

  const topicFiltered = sorted.filter(item =>
    item.word.length >= 2 && !['and', 'an', 'the'].includes(item.word)
  );

  console.log('Filtered topics:', topicFiltered);

  // Define categories
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

  // Categorize topics
  const categorizedTopics = {};
  topicFiltered.forEach(({ word, count }) => {
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.includes(word)) {
        if (!categorizedTopics[category]) {
          categorizedTopics[category] = [];
        }
        categorizedTopics[category].push({ word, count });
        return;
      }
    }
  });

  console.log('Categorized topics:', categorizedTopics);

  // Define color scale
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  const categoryColors = {};
  Object.keys(categories).forEach((category, index) => {
    categoryColors[category] = colorScale(index);
  });

  console.log('Category colors:', categoryColors);

  // Create stacked bar chart for each book
  const barWidth = 40;
  const barHeight = 60;

  const mainContainer = d3.select(".mainVizContent")
    .style("display", "flex")
    .style("flex-wrap", "wrap")
    .style("gap", "5px");

  data.forEach(item => {
    const name = item.name;
    const topicCounts = {};

    if (item.topic) {
      item.topic.forEach(topic => {
        processWords(topic).forEach(word => {
          for (const [category, keywords] of Object.entries(categories)) {
            if (keywords.includes(word)) {
              topicCounts[category] = (topicCounts[category] || 0) + 1;
            }
          }
        });
      });
    }

    const totalTopics = Object.values(topicCounts).reduce((a, b) => a + b, 0);

    const div = mainContainer.append("div").attr("class", "bar-container");
    div.append("p").text(name);

    const svg = div.append("svg")
      .attr("width", barWidth)
      .attr("height", barHeight);

    let yOffset = 0;
    Object.entries(topicCounts).forEach(([category, count]) => {
      const rectHeight = (count / totalTopics) * barHeight;
      svg.append("rect")
        .attr("x", 0)
        .attr("y", yOffset)
        .attr("width", barWidth)
        .attr("height", rectHeight)
        .attr("fill", categoryColors[category]);
      yOffset += rectHeight;
    });
  });
})();
