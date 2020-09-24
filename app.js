const game = document.querySelector('.game');
let cards = [];
const cardImg = 'url("img/cheese_';
let storeSelectedCards = [];
const allCards = game.children;
let right = 0;
let error = 0;
let endGame = 0;
let sortRandom = [1, 2, 3, 4, 5, 6, 7, 8];
let enterName = prompt('enter your name');

for(i = 1; i < 5; i += 1){
   cards.push(cardImg + i + '.png")');
}

//functions

function sortingCards(callback) {
   sortRandom.sort(function(a, b){return 0.5 - Math.random()});
   callback(sortRandom[0],
            sortRandom[1],
            sortRandom[2],
            sortRandom[3],
            sortRandom[4],
            sortRandom[5],
            sortRandom[6],
            sortRandom[7],)
 }

function playing (firstCard, lastCard, cardImg){
   game.addEventListener('click', (e)=> matching(e, firstCard, lastCard, cardImg, (first, last)=>{
      if(right === 2 && (first.item(0).style.backgroundImage === last.item(0).style.backgroundImage)){
         alert('ok');
         storeSelectedCards[0].style.backgroundColor = 'blue';
         storeSelectedCards[1].style.backgroundColor = 'blue';
         storeSelectedCards = [];
         right = 0;
         endGame += 1;
         localStorage.setItem(enterName, error);
         if(endGame === 4){
         game.innerHTML = "<div><h1>you win</h1><p>"
         +enterName
         +localStorage.getItem(enterName)
         +"</p></div>";
         }
      } else if (right === 2 && (first.item(0).style.backgroundImage !== last.item(0).style.backgroundImage)){
         alert('nope');
         setTimeout(()=>{
            storeSelectedCards[0].style.backgroundImage = '';
            storeSelectedCards[1].style.backgroundImage = '';
            storeSelectedCards = [];
            right = 0;
            error += 1;
         }, 1000);
         
      }
   }));
}

function matching (e, firstCard, lastCard, cardImg, results) {
   if(e.target.className === firstCard || e.target.className === lastCard){
      e.target.style.backgroundImage = cardImg;
      e.target.innerHTML = '';
      right += 1;
      let cardOne = document.getElementsByClassName(firstCard);
      let cardTwo = document.getElementsByClassName(lastCard);
      results (cardOne, cardTwo);
   } else if(e.target.className === 'card-9'){
      e.target.style.backgroundImage = 'url("img/mouse.png")';
      e.target.style.backgroundColor = 'red';
      setTimeout(()=>{
      for( i = 0; i < 10; i += 1){
         allCards[i].style.backgroundImage = '';
         allCards[i].style.backgroundColor = '';
         storeSelectedCards = [];
         right = 0;
      }
      }, 1000)
   }
}

//events

game.addEventListener('click', (e) => {
   storeSelectedCards.push(e.target);
})

sortingCards((a, b, c, d, e, f, g, h)=>{
   playing(`card-${a}`, `card-${b}`, cards[0]);
   playing(`card-${c}`, `card-${d}`, cards[1]);
   playing(`card-${e}`, `card-${f}`, cards[2]);
   playing(`card-${g}`, `card-${h}`, cards[3]);
   
})

for(var key in localStorage){
   console.log(key);
}




