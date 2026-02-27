const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Checks if a given string is a palindrome.
 * It ignores spaces, punctuation, and capitalization to handle phrases accurately.
 * * @param {string} str - The input string to check
 * @returns {boolean} - True if palindrome, false otherwise
 */
function isPalindrome(str) {
  const cleanStr = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
  
  const reversedStr = cleanStr.split('').reverse().join('');
  
  return cleanStr === reversedStr;
}


rl.question('Enter a string : ', (userInput) => {
  if (isPalindrome(userInput)) {
    console.log(`The string '${userInput}' is a palindrome`);
  } else {
    console.log(`The string '${userInput}' is not a palindrome`);
  }
  
  rl.close();
});