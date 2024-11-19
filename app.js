// Load RiTa.js
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/rita/1.3.4/rita.min.js';
script.onload = () => {
  // Load JSON files
  fetch('dataTarget.json')
    .then(response => response.json())
    .then(dataTarget => {
      fetch('dataSet.json')
        .then(response => response.json())
        .then(dataSet => {
          const historical_context = dataSet.historical_context.time_periods;
          console.log(dataSet.historical_context.time_periods);
          // Create a dictionary for quick lookup
          const wordDict = historical_context.reduce((acc, word) => {
            acc[word.word] = word.category;
            return acc;
          }, {});

          // Tokenize the target text
          const tokens = RiTa.tokenize(dataTarget.text);
          //console.log(historical_context)
          // Highlight words and build HTML
          const highlightedText = tokens.map(token => {
            if (wordDict[token]) {
              const category = wordDict[token];
              return `<span class="${category}">${token}</span>`;
            } else {
              return token;
            }
          }).join(' ');
          console.log(highlightedText);

          // Update the HTML element
          document.getElementById('highlighted-text').innerHTML = highlightedText;
        });
    });
};
document.head.appendChild(script);

