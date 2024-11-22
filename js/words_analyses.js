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
