const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a sentence: ', (sentence) => {
  const cleanSentence = sentence.trim();
  
  const wordsArray = cleanSentence === '' ? [] : cleanSentence.split(/\s+/);
  
  const wordCount = wordsArray.length;
  
  const reversedSentence = wordsArray.slice().reverse().join(' ');
  
  const modifiedSentence = cleanSentence.replace(/\s+/g, '-');
  

  console.log(`Number of words: ${wordCount}`);
  console.log(`Reversed sentence: ${reversedSentence}`);
  console.log(`Modified sentence: ${modifiedSentence}`);

  rl.close();
});