// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];


// Function to prompt the user for password options. The first prompt asks a desired password length to the user, then a variable stores the desired length transforming the string into a number with parseInt. Then there are four prompts about character set options the user wants to absolutely include in the final password. If the prompts are true the loops will generate a random character (Math.floor(Math.random()) for each of the desired character sets. Then the final characters are pushed to the global scope array charOptions, so it can be used later in the code. If all the prompts are false the function is called again.


const charOptions = [];

let userInputLength;

let generatedArraySelectedChars = [];


function userPasswordOptions() {
  
  var passwordLength = prompt(`Choose a length between 8 and 128 characters for your password`);

  userInputLength = parseInt(passwordLength);

  if (userInputLength >= 8 && userInputLength <= 128) {
    confirm(`You chose a password of ${userInputLength} characters`);
      
      function userCharactersChoice() {
        var lowercase = confirm(`Do you want to include lowercase?`);
        var uppercase = confirm(`Do you want to include uppercase?`);
        var numeric = confirm(`Do you want to include numeric characters?`);
        var special = confirm(`Do you want to include special characters?`);


        // Get one random character for each array of characters selected by the user
        function getRandomCharacter(charArray){
          var randomIndex = Math.floor(Math.random() * charArray.length);
          return charArray[randomIndex]
        }

        // Push the random character to the charOptions array
        function pushRandomCharacter (charOptions, charArray) {
          var randomCharacter = getRandomCharacter(charArray);
          charOptions.push(randomCharacter);
        }

        // Creating an array of the arrays of the selected characters by the user
        function allPushedCharactersSelected(generatedArraySelectedChars, charArray) {
          generatedArraySelectedChars.push(charArray);
        }

        function userChoice() {
          // Calling functions based on if the user selected that specific set of characters
          if (lowercase) {
            pushRandomCharacter(charOptions, lowerCasedCharacters);
            allPushedCharactersSelected(generatedArraySelectedChars, lowerCasedCharacters)
          }
          if (uppercase) {
            pushRandomCharacter(charOptions, upperCasedCharacters);
            allPushedCharactersSelected(generatedArraySelectedChars, upperCasedCharacters)
          }
          if (numeric) {
            pushRandomCharacter(charOptions, numericCharacters);
            allPushedCharactersSelected(generatedArraySelectedChars, numericCharacters)
          }
          if (special) {
            pushRandomCharacter(charOptions, specialCharacters);
            allPushedCharactersSelected(generatedArraySelectedChars, specialCharacters)
          }
          else if (!lowercase && !uppercase && !numeric && !special) {
            confirm(`You must choose at least one character type, please try again`);
            return userCharactersChoice();
          }
        }
        userChoice(generatedArraySelectedChars);
      }
      userCharactersChoice();
  } 
  else {
    confirm(`You need to choose a password length between 8 and 128 characters, please try again`);
    return userPasswordOptions();
  }
  // console.log(`charOptions : ${charOptions}`);
  // console.log(`generatedArraySelectedChars : ${generatedArraySelectedChars}`)
}

userPasswordOptions();



// Function for getting a random character from the array of arrays generatedArraySelectedChars. To get random characters, generatedArraySelectedChars is transformed in a flat array where the for loop iterates x number of times (User's desired password length - User's number of character set choices) to give a random index (using Math.floor(Math.random() method) which is then applied to the mega array and pushed it to a new array (outside of the function so it can be used globally).

var randomPasswordGenerated = [];

function getRandom(arr) {

  const flattenedGeneratedArraySelectedChars = [].concat(...generatedArraySelectedChars);

  let numberOfIteration = (userInputLength - charOptions.length);
  for (let i = 0; i < numberOfIteration; i++) {
    var randomAllCharactersIndex = Math.floor(Math.random() * flattenedGeneratedArraySelectedChars.length);
    var randomAllCharacters = flattenedGeneratedArraySelectedChars[randomAllCharactersIndex];
    randomPasswordGenerated.push(randomAllCharacters);
  }
  // console.log(randomPasswordGenerated);
}

getRandom();


// Function to generate password with user input. The function concatenates the two arrays (the random password generated array and the array of character set options chosen by the user) to create a single array and thanks to the .join method the array is transformed into a string message.

function generatePassword() {
  const generatedPasswordArray = charOptions.concat(randomPasswordGenerated); 

  return generatedPasswordArray.join(``);
}


// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
