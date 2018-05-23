const fetch = require('node-fetch');
const Queue = require('./queue');

const letters = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
let dictionaryWords;

// Get dictionary data, assigns dictionaryWords to a set of the words
const generateWordSet = function (url = 'http://codekata.com/data/wordlist.txt') {
  return fetch(url)
    .then(res => res.text())
    .then(body => body.split('\n'))
    .then(words => {
      dictionaryWords = new Set(words);
      findWordChain();
    })
    .catch((err) => { throw err; });
};

// Takes a string and returns a new string with a character at a given index replaced
const replaceStringCharacter = function (string, index, newCharacter) {
  return string.slice(0, index) + newCharacter + string.slice(index + 1);
}

// Replaces a letter in the given word, adds it to the queue item, and enqueues it
const enqueueNewWord = function (queue, item, currentWord, index, newLetter, target) {
  const newWord = replaceStringCharacter(currentWord, index, newLetter);

  if (dictionaryWords.has(newWord)) {
    const newItem = item.slice();
    newItem.push(newWord);
    if (newWord === target) return newItem;
    queue.enqueue(newItem); 
  }
}

// Finds a word chain from one string to another and prints the chain to the console
const findWordChain = function (string1, string2) {
  if (!dictionaryWords) {
    throw new Error('Cannot find word chain until dictionary words are fetched!');
  }

  string1 = string1.toUpperCase();
  string2 = string2.toUpperCase();

  const preferredQueue = new Queue();
  const secondaryQueue = new Queue();

  preferredQueue.enqueue([string1]);

  while (preferredQueue.getSize() || secondaryQueue.getSize()) {
    const item = preferredQueue.getSize() ? preferredQueue.dequeue() : secondaryQueue.dequeue();
    currentWord = item[item.length - 1];

    for (let i = 0; i < currentWord.length; i++) {
      const currentLetter = currentWord[i];
      const targetLetter = string2[i];

      if (currentLetter !== targetLetter) {
        const result = enqueueNewWord(preferredQueue, item, currentWord, i, targetLetter, string2);
        if (result) {
          result.forEach(item => console.log(item));
          return
        }
      }

      letters.forEach((letter) => {
        if (letter !== currentLetter && letter !== targetLetter) {
          enqueueNewWord(secondaryQueue, item, currentWord, i, letter)
        }
      });
    }
  }
};

generateWordSet()

module.exports = findWordChain;