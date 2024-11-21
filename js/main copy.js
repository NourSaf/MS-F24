(async () => {
  // Load data
  const data = await d3.json('./myData.json');
  console.log(data);

  // Helper function to process words
  const processWords = (text) => {
    const words = text.split(' ')
      .map(word => word.toLowerCase().replace(/[^a-zA-Z]/g, '').trim())
      .filter(word => word.length > 0);
    return words;
  };

  // Extract and process topics
  let allWords = [];
  data.forEach(item => {
    if (item.topic && Array.isArray(item.topic)) {
      item.topic.forEach(topic => {
        allWords = allWords.concat(processWords(topic));
      });
    }
  });

  // Calculate word frequencies
  const frequency = {};
  allWords.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Sort by frequency and filter
  const sorted = Object.entries(frequency)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);

  const topicFiltered = sorted.filter(item => item.word.length >= 2 && !['and', 'an', 'the'].includes(item.word));

  // Limit to top 150 topics
  const topicsArray = topicFiltered.slice(0, 150);
  console.log('Top Topics:', topicsArray);

  // Categorize topics
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

  const categorizedTopics = {};
  topicsArray.forEach(({ word, count }) => {
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.includes(word)) {
        if (!categorizedTopics[category]) {
          categorizedTopics[category] = [];
        }
        categorizedTopics[category].push({ word, count });
      }
    }
  });

  console.log('Categorized Topics:', categorizedTopics);

  // Visualization
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  const categoryColors = {};
  Object.keys(categories).forEach((category, index) => {
    categoryColors[category] = colorScale(index);
  });

  const container = d3.select("body").append("div").attr("class", "container");

  data.forEach(item => {
    const name = item.name;
    const topicCounts = categorizedTopics[name] || {};
    const totalTopics = Object.values(topicCounts).reduce((a, b) => a + b, 0);

    const div = container.append("div").attr("class", "bar-container");
    div.append("p").text(name);

    const barWidth = 300;
    const barHeight = 20;
    const svg = div.append("svg").attr("width", barWidth).attr("height", barHeight);

    let xOffset = 0;
    Object.entries(topicCounts).forEach(([category, count]) => {
      const rectWidth = totalTopics ? (count / totalTopics) * barWidth : 0;
      svg.append("rect")
        .attr("x", xOffset)
        .attr("y", 0)
        .attr("width", rectWidth)
        .attr("height", barHeight)
        .attr("fill", categoryColors[category]);
      xOffset += rectWidth;
    });
  });
})();
