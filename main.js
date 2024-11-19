// const { toArray } = require("@amcharts/amcharts5/.internal/core/util/Array");

let myJson = "./dataTarget.json";




let politics = [
  "monarchy", "republic", "democracy", "dictatorship", "fascism", "anarchy", "oligarchy", 
  "parliament", "totalitarianism", "federalism", "theocracy", "autocracy", "liberalism", "conservatism", "feudalism", 
  "authoritarianism", "tyranny", "plutocracy", "rebellion", "revolt", 
  "resistance",  "change", "rights", "revolution", "independence", "self-determination",  
  "insurrection", "defiance", "overthrow", "abolition", "protest", "civil disobedience", "struggle", "leader", 
  "ruler", "dictator", "emperor", "king", "laws", "policy", "imperial", "authority", "tyranny", "command", 
  "sovereignty", "government", "control", "dominion", "oppression", "governance", "rule", "regime", "bureaucracy", 
  "empowerment", "subjugation", "lobbying", "diplomacy", "propaganda", "election", "campaign", "coup d'état", 
  "senate", "congress", "assembly", "council", "municipality", "legislation", "judiciary", "executive", "citizenship", 
  "patriotism", "nationalism", "separatism", "militarism", "civil service", "public policy", "social contract", 
  "taxation", "welfare state", "judicial review", "checks and balances", "centralism", "localism", "unionism", 
  "populism", "elitism", "meritocracy", "paternalism", "imperialism", "colonialism", "international law", 
  "geopolitics", "statecraft", "sanctions", "treaties", "alliances", "nonviolence", "peacekeeping", "national security", 
  "surveillance", "policing", "martial law", "emergency powers", "partisanship", "ideology", "sectarianism", "polarization", 
  "libertarianism", "progressivism", "traditionalism", "radicalism", "integration", "decentralization", "privatization", "politics,"
];

let socialmovement = [
  "feminism", "civil rights", "abolitionism", "suffrage", "human rights", "liberation", 
  "equality", "socialism", "communism", "freedom", "emancipation", "reform", "justice", "liberty", "christianity", "islam", "judaism", "buddhism", "hinduism", "atheism", "faith", 
  "ritual", "mythology", "spirituality", "paganism", "belief", "doctrine", "heresy", "islamic",
  "pilgrimage", "sacred"

];

let gender = [
  "women", "men", "masculinity", "femininity", "patriarchy", "motherhood", "fatherhood",
  "matriarchy", "gender roles", "gender identity", "womanhood", "manhood", "toxic masculinity", 
  "misogyny", "subordination", "sexuality", "gender norms", "gender binary", "non-binary", 
  "gender fluid", "transgender", "cisgender", "genderqueer", "intersex", "gender expression", 
  "gender dysphoria", "sexual orientation", "queer", "gender non-conforming", "gender parity", "agender", "demiboy", 
  "demigirl", "androgyne", "third gender", "gender transition", "transfeminine", "transmasculine", "gender abolition", 
  "gender spectrum","gender variance", "misandry", "gender affirmation", "gender euphoria", 
  "gender fluidity", "pangender", "bigender", "gender performance", "hegemonic masculinity", "intersectional feminism", 
  "sexual dimorphism", "gender-affirming care", "neutrois", "sissy", "butch", "femme", "androcentrism", "sexism", 
  "gender pay gap", "glass ceiling", "gender segregation", "body positivity", "self-identification", "allyship",
  "gender policing", "empowerment", "self-expression", "transmisogyny", "nonconforming", "gender inclusivity", 
  "feminist movement", "equal rights", "gender sensitivity", "social construct", "masculine-of-center", "feminine-of-center", 
  "gender fluidity", "queer theory", "masculine pride", "feminine pride", "machismo", "androgyny", "sexual autonomy", 
  "feminine mystique", "male privilege", "female empowerment", "LGBTQIA+", "socialization", "male gaze", 
  "heteronormativity", "gender equality", "gender stereotypes", "cisnormativity", "gender power dynamics", "inclusive language",
  "gender", "feminine", "masculine", "equality", "patriarchy", "matriarchy", 
  "suffrage", "womanhood", "manhood", "cisgender", "transgender", "non-binary", 
  "intersectionality", "misogyny", "man", "woman", "men", "women"
];


// Historical Eras and Events
let historicalErasAndEvents = [
  "colonial", "revolution", "independence", "industrial", "civil war", "world war", "renaissance", 
  "enlightenment", "modernity", "discovery", "invasion", "treaty", "abolition", "slavery", "emancipation", "history"
];



// Political Systems and Governance
let politicalSystemsAndGovernance = [
  "democracy", "monarchy", "republic", "dictatorship", "empire", "sovereignty", 
  "colonialism", "federalism", "parliament", "republicanism", "tyranny", "policy", "governance", "law"
];

// Social Structure and Class
let socialStructureAndClass = [
  "aristocracy", "bourgeoisie", "working class", "elite", "servitude", "peasants", "landowners", 
  "gentry", "indentured", "proletariat", "slavery", "serfdom", "capitalist", "tenant"
];

// Gender and Identity
let genderAndIdentity = [
  "gender", "feminine", "masculine", "equality", "patriarchy", "matriarchy", 
  "suffrage", "womanhood", "manhood", "feminism", "cisgender", "transgender", "non-binary", 
  "intersectionality", "misogyny", "man", "woman", "men", "women"
];

// Race, Ethnicity, and Culture
let raceEthnicityAndCulture = [
  "race", "ethnicity", "racism", "segregation", "diaspora", "colonial", "native", 
  "indigenous", "multicultural", "superiority", "inferiority", "exclusion", "diversity", 
  "heritage", "identity"
];

// Religion and Belief Systems
let religionAndBeliefSystems = [
  "christianity", "islam", "judaism", "buddhism", "hinduism", "atheism", "faith", 
  "ritual", "mythology", "spirituality", "paganism", "belief", "doctrine", "heresy", 
  "pilgrimage", "sacred"
];

// Economic Systems and Labor
let economicSystemsAndLabor = [
  "capitalism", "labor", "trade", "commerce", "industry", "markets", "economy", 
  "monopoly", "investment", "inequality", "wealth", "poverty", "industrialization", 
  "merchant", "globalization"
];

// Science and Innovation
let scienceAndInnovation = [
  "science", "technology", "innovation", "discovery", "exploration", "progress", 
  "invention", "experiment", "medicine", "physics", "biology", "chemistry", "astronomy", "natural history",
  "genetics", "neuroscience", "robotics", "artificial intelligence", "nanotechnology", "quantum mechanics",
  "biotechnology", "ecology", "environmental science", "geology", "meteorology", "oceanography", "paleontology",
  "space exploration", "engineering", "computer science", "data science", "machine learning", "cybersecurity",
  "renewable energy", "climate change", "sustainability", "biochemistry", "molecular biology", "astrophysics",
  "cognitive science", "materials science", "pharmacology", "bioinformatics", "theoretical physics", "astrobiology", "space"
];

// War and Conflict
let warAndConflict = [
  "war", "battle", "conflict", "military", "revolution", "uprising", "rebellion", 
  "resistance", "occupation", "treaty", "peace", "violence", "aggression", "soldiers", "victory"
];

// Cultural Expressions and Art
let culturalExpressionsAndArt = [
  "art", "literature", "music", "painting", "sculpture", "poetry", "drama", 
  "aesthetic", "artist", "exhibition", "craft", "folk", "design", "expression", "avant-garde"
];


console.log("those are gender terms:", gender)

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }
    const data = await response.json(myJson);   
    return data.slice(0, 20000);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
}

function showLoading() {
  const app = d3.select('.main');
  app.append('div')
    .attr('class', 'loading')
    .text('...LOADING...');
}

function hideLoading() {
  d3.select('.loading').remove();
}

showLoading();

const scienceColor = "rgb(249, 88, 105)";
const politicColor = "rgb(45, 84, 174)";
const genderColor = "rgb(45, 103, 88)";
const socialColor = "rgb(208, 138, 105)";
const invisitageColor = "rgb(255, 255, 255)";
const his_events_color = "rgb(101, 64, 112)";
const warColor = "rgb(94, 103, 97)";


const dataPromise = fetchData(myJson)
  .then(data => {
  hideLoading();
  console.log("this is My data", data);

  // Fragment use. to reduce reflows and improve performance
  const fragment = document.createDocumentFragment();
  
  // select the main div
  const app = d3.select('.main-viz');
  let btnContainer = app.append('div').attr('class','btns')
  let btns = document.createElement('div')
  btns.id = 'allBtnContainer'
  btns.className = "allBtns"
  btnContainer.node().appendChild(btns);

  const mainContainer = app.append('div').attr('class', 'main-viz-container');
  let subContainer = document.createElement('div');
  subContainer.className = 'sub-container x1';

  // Loop through data and return only the name property
  const names = data.map(item => item.name);
  const type = data.map(item => item.objectType);
  console.log("–––––––>> Thos are Names:",  names);
  console.log("type:",  type);
  
  names.forEach((name, index) => {
    const div = document.createElement('div');
    div.className = 'sub-div-text x1';
    div.id = 'sub-div-text'
    div.style.fontSize = '0.5em';
    div.style.padding = "0.4em"

    let lowerCaseName = name.toLowerCase();
    let tokens = lowerCaseName.split(' ');
    console.log('this is my tokens', tokens);

    subContainer.appendChild(div);
    
    if ((index+1) % 1 === 0) {
      fragment.appendChild(subContainer);
      subContainer = document.createElement('div');
      subContainer.className = 'sub-container x1';
      //console.log("----->>> INDEX",index)
    }

    tokens.forEach(token => { 
      const span = document.createElement('span');
      
      if (politics.some(w => token.toLowerCase() === w.toLowerCase())) {
        span.textContent = token;
        span.style.background = `${politicColor}`;
        span.classList.add('political');
      } else if (socialmovement.some(w => token.toLowerCase() === w.toLowerCase())) {
        span.textContent = token;
        span.style.background = `${socialColor}`;
        span.classList.add('social');
      } else if (gender.some(w => token.toLowerCase() === w.toLowerCase())) {
        span.textContent = token;
        span.style.background = `${genderColor}`;
        span.classList.add('gender');
      } 
       else if (historicalErasAndEvents.some(w => token.toLowerCase() === w.toLowerCase())) {
        span.textContent = token;
        span.style.background = `${his_events_color}`;
        span.classList.add('historicalEvent');
      } 
      else if (scienceAndInnovation.some(w => token.toLowerCase()===w.toLowerCase())){
        span.textContent = token;
        span.style.background = `${scienceColor}`;
        span.classList.add('science');
      }
      else if (warAndConflict.some(w => token.toLowerCase() === w.toLowerCase())){
        span.textContent = token;
        span.style.backgroundColor = `${warColor}`;
        span.classList.add('war');
      }
      
      else {
        span.textContent = token;
        span.classList.add('notHighlight');
      }
      div.appendChild(span);
      div.appendChild(document.createTextNode(' '));

      div.addEventListener('mouseover', () => {
        const titel_div = document.createElement('div');
        titel_div.className = 'popUpDiv';
        titel_div.textContent = `    ${span.textContent.toLocaleUpperCase()}`;
        span.classList.forEach(className => {
          titel_div.classList.add(className);
          if (className === 'historical') {
            titel_div.style.backgroundColor = historyColor;
          } else if (className === 'political') {
            titel_div.style.backgroundColor = politicColor;
          } else if (className === 'social') {
            titel_div.style.backgroundColor = socialColor;
          } else if (className === 'gender') {
            titel_div.style.backgroundColor = genderColor;
          } else if (className === 'historicalEvent'){
            titel_div.style.backgroundColor = his_events_color;
          } else if (className === 'science'){
            titel_div.style.backgroundColor = scienceColor;
          } else if (className === 'war'){
            titel_div.style.backgroundColor = warColor;
          }
        });
        const menu_div = document.querySelector('.menu-left');
        menu_div.appendChild(titel_div);
        console.log('HI you! Your are hovering on a sub-container');
      });

      div.addEventListener('mouseout', () => {
        const titel_div = document.querySelector('.popUpDiv');
        if (titel_div) {
          titel_div.remove();
        }
      });
    });
  }); 

    function createButton(category, color, className) {
        const button = document.createElement('button');
        button.textContent = `${category}`;
        button.style.backgroundColor = color;
        button.style.padding = '0.5em 2.5em 0.5em 2.5em';
        button.style.borderRadius = '1em'
        button.style.border = `0.1em solid ${color}`
        button.style.color = 'white'

        button.onmouseover = () => {
          button.style.backgroundColor = 'black';
          button.style.color = 'white';
          button.style.border = `0.1em solid ${color}`
          button.style.cursor = 'pointer';;
        };
        button.onmouseout = () => {
          button.style.backgroundColor = color;
          button.style.color = 'white';
          button.style.border = `0.1em solid ${color}`
        };
      
        button.addEventListener('click', () => {
          const spans = document.querySelectorAll(`.${className}`);
          spans.forEach(span => {
            if (span.style.backgroundColor === color) {
              span.style.backgroundColor = '';
            } else {
              span.style.backgroundColor = color;
            }
          });
          const rect = document.querySelector(`${className}`);
          if (rect) rect.classList.toggle('highlight');
        });
        return button;
      }

    function createIvisitageBtn(btnTitle, color, className) {
        const button = document.createElement('button');
        button.textContent = `${btnTitle}`;
        button.style.backgroundColor = color;
        button.style.padding = '0.5em 2.5em 0.5em 2.5em';
        button.style.borderRadius = '1em'
        button.style.border = `0.1em solid ${color}`

        button.onmouseover = () => {
          button.style.backgroundColor = 'black';
          button.style.color = 'white';
          button.style.border = `0.1em solid ${color}`
          button.style.cursor = 'pointer';;
        };
        button.onmouseout = () => {
          button.style.backgroundColor = color;
          button.style.color = 'black';
          button.style.border = `0.1em solid ${color}`
        };
      
        button.addEventListener('click', () => {
          const spans = document.querySelectorAll(`.${className}`);
          spans.forEach(span => {
            if (span.style.color === "black") {
              span.style.color = "white";
            } else {
              span.style.color = "black";
            }
          });
        });
        return button;
      }
      if (btns) {
        const buttonContainer = d3.select(btns).append('div').attr('class', 'button-container');
        const subButtonContainer = d3.select(btns).append('div').attr('class', 'subButton-container');
        subButtonContainer.node().appendChild(createIvisitageBtn('Invisitage', `${invisitageColor}`, 'notHighlight'));
        buttonContainer.node().appendChild(createButton('Politics', `${politicColor}`, 'political'));
        buttonContainer.node().appendChild(createButton('Gender', `${genderColor}`, 'gender'));
        buttonContainer.node().appendChild(createButton('Social Movement', `${socialColor}`, 'social'));
        buttonContainer.node().appendChild(createButton('Historiy', `${his_events_color}`, 'historicalEvent'));
        buttonContainer.node().appendChild(createButton('Science and Innovation', `${scienceColor}`, 'science'));
        buttonContainer.node().appendChild(createButton('War and Conflict', `${warColor}`, 'war'));
      } else {
        console.error('Element with ID "butnContainer" not found.');
      }

  let politicalCount = 0;
  let socialCount = 0;
  let genderCount = 0;
  let historicalErasAndEventsCount = 0;
  let scienceCount = 0;
  let warCount = 0;

  function countWords(data) {
    data.forEach(item => {
      const tokens = item.name.toLowerCase().split(' ');
      tokens.forEach(token => {
        if (socialmovement.some(w => token.toLowerCase() === w.toLowerCase())) {
          socialCount++;
        }
        if (politics.some(w => token.toLowerCase() === w.toLowerCase())) {
          politicalCount++;
        }
        if (gender.some(w => token.toLowerCase() === w.toLowerCase())) {
          genderCount++;
        } 
        if (historicalErasAndEvents.some(w => token.toLowerCase() === w.toLowerCase())){
          historicalErasAndEventsCount++
        } 
        if(scienceAndInnovation.some(w => token.toLowerCase() === w.toLowerCase())){
          scienceCount++;
        } 
        if (warAndConflict.some( W => token.toLowerCase() === W.toLowerCase())){
          warCount++;
        }
      });
    });
  
    //secondary visualization div structure
    const secVizContainer = app.append('div').attr('class','sec-viz-container')
    const chartContainer = secVizContainer.append('div').attr('id','chartContainer').attr('class','chartContainer')
    secVizContainer.node().appendChild(chartContainer.node());

    // Bar for each group
    const totalCount = politicalCount + socialCount + genderCount + historicalErasAndEventsCount + scienceCount + warCount;
    
    const politicalWidth = (politicalCount / totalCount) * 100;
    const socialWidth = (socialCount / totalCount) * 100;
    const genderWidth = (genderCount / totalCount) * 100;
    const historicalErasAndEventsWidth = (historicalErasAndEventsCount / totalCount) *100;
    const scienceWidth = (scienceCount/totalCount) * 100;
    const warWidth = (warCount / totalCount)*100;
    const barPadding = "0.5em"
    
    const stackedBar = chartContainer.append('div')
      .attr('class', 'stacked-bar')
      .style('display', 'flex')
      .style('width', '100%');
      
    stackedBar.append('div')
      .attr('class', 'rect-political')
      .style('width', `${politicalWidth}%`)
      .style('background-color', `${politicColor}`)
      .style('padding', `${barPadding}`);

    stackedBar.append('div')
      .attr('class', 'rect-gender')
      .style('width', `${genderWidth}%`)
      .style('background-color', `${genderColor}`)
      .style('padding', `${barPadding}`);

      
    stackedBar.append('div')
      .attr('class', 'rect-social')
      .style('width', `${socialWidth}%`)
      .style('background-color', `${socialColor}`)
      .style('padding', `${barPadding}`); 


    stackedBar.append('div')
      .attr('class', 'rect-historicalEvent')
      .style('width', `${historicalErasAndEventsWidth}%`)
      .style('background-color', `${his_events_color}`)
      .style('padding', `${barPadding}`)
      
    stackedBar.append('div')
      .attr('class', 'rect-science')
      .style('width', `${scienceWidth}%`)
      .style('background-color', `${scienceColor}`)
      .style('padding', `${barPadding}`)

    stackedBar.append('div')
      .attr('class', 'rect-war')
      .style('width', `${warWidth}%`)
      .style('background-color', `${warColor}`)
      .style('padding', `${barPadding}`)

    const textStackedBar = chartContainer.append('div')
      .attr('class', 'stacked-bar')
      .style('display', 'flex')
      .style('width', '100%');

    textStackedBar.append('div')
      .attr('class', 'rect-political')
      .style('width', `${politicalWidth}%`)
      .style('padding', `${barPadding}`)
      .text(`Potitics: ${politicalCount}`);

    textStackedBar.append('div')
      .attr('class', 'rect-gender')
      .style('width', `${genderWidth}%`)
      .style('padding', `${barPadding}`)
      .text(`Gender: ${genderCount}`);
      
    textStackedBar.append('div')
      .attr('class', 'rect-social')
      .style('width', `${socialWidth}%`)
      .style('padding', `${barPadding}`)
      .text(`Soical Movement: ${socialCount}`);
    

    textStackedBar.append('div')
      .attr('class', 'rect-historical')
      .style('width', `${historicalErasAndEventsWidth}%`)
      .style('padding', `${barPadding}`)
      .text(`History: ${historicalErasAndEventsCount}`);
    
    textStackedBar.append('div')
      .attr('class', 'rect-historical')
      .style('width', `${scienceWidth}%`)
      .style('padding', `${barPadding}`)
      .text(`Science and Innovation: ${scienceCount}`);

    textStackedBar.append('div')
      .attr('class', 'rect-war')
      .style('width', `${warWidth}%`)
      .style('padding', `${barPadding}`)
      .text(`War and Conflict: ${warCount}`);
    }

  countWords(data);

  if (subContainer.children.length > 0) {
    fragment.appendChild(subContainer);
  }
  mainContainer.append(() => fragment);

}).catch(error => {
  hideLoading();
  console.error('Error:', error);
});


  

 
  
  