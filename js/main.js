

const data = await d3.json('./myData.json')
console.log(data)

const topic = data.map(i => i.topic)
// console.log('This is topic', topic)

let topics = [];
for (let i = 0; i < topic.length; i++){
  // console.log(topic[i])
  for (let j = 0; j < topic[i].length; j++){
    let topic_book = topic[i][j];
    topics.push(topic_book)
  }
}
console.log(topics)

//words processing to get the most frequent topics within the book collection
let phrase;
let newPhrase = []
topics.forEach( topic => {
  let split = topic.split(' ')
  let words = split.map(word => word.toLowerCase());
  // console.log(words)
  words.forEach(word => {
    // remove empty words
    if(word.length == 0) return;
    // remove special characters
    phrase = word.replace(/[^a-zA-Z ]/g, " ");
    // console.log('this is phrase', phrase)
    newPhrase.push(phrase)
  })
});
console.log('this is my new phrase',newPhrase)

let splited;
let frequency = [];
newPhrase.forEach(word => {
  splited = word.split(' ');
  console.log('This is splited', splited)
  splited.forEach(i => {
    let splited_word = i;
    if (splited_word.length == 0) return; 
    // console.log("this is splited words",splited_word)
    let match = false;
    frequency.forEach( i => { 
      if (i.splited_word == splited_word){
        i.count++;
        match = true;
      }
      
    });
    if (!match){
      frequency.push({
        splited_word: splited_word,
        count: 1,
      });
    }

  })
})
const sorted =  frequency.sort((a, b) => (a.count < b.count) ? 1 : -1);
console.log("this is sorted frequency", sorted)




// function analyzeData(lines) {
//   let phrase;
//   let frequency = [];
//   // loop over the array
//   lines.forEach(line => {
//     // split the line into words
//     let words = line.split(' ');
//     // loop over the words
//     words.forEach(word => {
//       // remove empty words
//       if(word.length == 0) return;
//       // remove special characters
//       phrase = word.replace(/[^a-zA-Z ]/g, "");
//       // check if the word is in the array
//       let match = false;
//       frequency.forEach(i => {
//         if(i.word == word) {
//           i.count++;
//           match = true;
//         }
//       });
//       // if not, add it to the array
//       if(!match) {
//         frequency.push({
//           word: phrase,
//           count: 1
//         });
//       }
//     });
//   });

//   // show the frequency map
//   console.log(frequency);
//   // sort the frequency map
//   frequency.sort((a, b) => (a.count < b.count) ? 1 : -1);
//   return frequency;
// }

// check if the word is in the array
    // let match = false;
    // frequency.forEach(i => {
    //   if(i.word == word) {
    //     i.count++;
    //     match = true;
    //   }
    // });

    // // if not, add it to the array
    // if(!match) {
    //   frequency.push({
    //     word: phrase,
    //     count: 1
    //   });
    // };


    // // sort the frequency map
// const sorted = frequency.sort((a, b) => (a.count < b.count) ? 1 : -1);
// console.log("this is my words sorted",sorted)
