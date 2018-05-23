const fetch = require('node-fetch');
const Queue = require('./queue');

const letters = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));

// Get dictionary data, create a set of every word
const generateWordSet = function (url = 'http://codekata.com/data/wordlist.txt') {
  return fetch(url)
    .then(res => res.text())
    .then(body => new Set(body.split('\n')))
    .catch((err) => { throw err; });
};

const replaceStringCharacter = function (string, index, newCharacter) {
  return string.slice(0, index) + newCharacter + string.slice(index + 1);
}

const findWordChain = function (string1, string2) {
  const preferredQueue = new Queue();
  const secondaryQueue = new Queue();
  // Queues will contain arrays of strings

  preferredQueue.push([string1.toUpperCase()]);

  while (preferredQueue.getSize() || secondaryQueue.getSize()) {
    const item = preferredQueue.getSize() ? preferredQueue.dequeue() : secondaryQueue.dequeue();
    currentWord = item[item.length - 1];
    if (currentWord === string2.toUpperCase()) {
      item.push(currentWord);
      item.forEach(item => console.log(item));
      break;
    }

    for (let i = 0; i < currentWord.length; i++) {
      const currentLetter = currentWord[i];
      const targetLetter = string2[i].toUpperCase();

      if (currentLetter !== targetLetter) {
        const newWord = replaceStringCharacter(currentWord, i, targetLetter) 
        if (newWord in dictionaryWords) {
          const newItem = item.slice().push(newWord);
          preferredQueue.push(newItem);
        }
      }

      letters.forEach((letter) => {
        if (letter !== currentLetter && letter !== targetLetter) {
          const newItem = replaceStringCharacter(currentWord, i, letter);
          secondaryQueue.push(newItem); 
        }
      });
    }
  }

  // while there is items in one of the queue
  // pop item off preferred queue. If empty, pop off secondary queue. Save item.
  // iterate over each letter in last string of item
  // if item[i] does not equal string2[i], change letter to string2[i], add to new copy of item and push to preferred queue
  // iterate over all other letter changes, push to secondary queue
  // if letter change results in item === string2, exit loop and print resulting array.

};