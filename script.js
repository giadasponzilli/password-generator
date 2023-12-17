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



// Function to prompt user for password options
/* function getPasswordOptions() { */
  // Prompt for password length
  // At least 8 characters, no more than 128 characters
  // Conditional to check that the number that was entered is in range
  // Prompts store data as strings, so need to parse into a number
  // If the user's input is out of range, either return out of the function or call the function again
  
  // Confirm which character sets to use
  // If the user answers false for all, either return out of the function or call the function again

  // Once they select a character set:
  // Generate a random character for each selected character set
  // Either push selected character sets to a mega-array of all selected characters
  // OR you can keep the arrays separate and generate a random number to select the array and another to select the index
  
  // Once character sets are selected, move on to generating random characters

  // You can store the generatedPassword as a string and concat each character OR
// as an array and push each character, then join once you have enough characters

  // Need a variable to hold the password as it's being generated
  // Need a variable to hold the index that's being generated

  // For loop that loops the number of times that matches the length the user chose
  // Generate a random number
  // That number is the index for a character in the mega-array
  // So then, mega-array[generated-index] is the actual character
  // Add that character to the password

  // Once we finish the for loop, return the generated password



const charOptions = [];


let userInputLength;
// Function to prompt user for password options
function userPasswordOptions() {
  var passwordLength = prompt(`Choose a length between 8 and 128 characters for you password`);

  userInputLength = parseInt(passwordLength);

  if (userInputLength >= 8 && userInputLength <= 128) {
    confirm(`You chose a password of ${userInputLength} characters`);
      function userCharactersChoice() {
        var lowercase = confirm(`Do you want to include lowercase?`);
        var uppercase = confirm(`Do you want to include uppercase?`);
        var numeric = confirm(`Do you want to include numeric characters?`);
        var special = confirm(`Do you want to include special characters?`);
        if (lowercase) {
            var randomLowercaseIndex = Math.floor(Math.random() * lowerCasedCharacters.length);
            var randomLowercase = lowerCasedCharacters[randomLowercaseIndex];
            charOptions.push(randomLowercase) 
        }
        if (uppercase) {
            var randomUppercaseIndex = Math.floor(Math.random() * upperCasedCharacters.length);
            var randomUppercase = upperCasedCharacters[randomUppercaseIndex];
            charOptions.push(randomUppercase);
        }
        if (numeric) {
            var randomNumericIndex = Math.floor(Math.random() * numericCharacters.length);
            var randomNumeric = numericCharacters[randomNumericIndex];
            charOptions.push(randomNumeric) ;
        }
        if (special) {
            var randomSpecialCharactersIndex = Math.floor(Math.random() * specialCharacters.length);
            var randomSpecialCharacters = specialCharacters[randomSpecialCharactersIndex];
            charOptions.push(randomSpecialCharacters) ;
        }
        else if (lowercase === false && uppercase === false && numeric === false && special === false) {
          confirm(`You must coose at least one character type, please try again`);
          return userCharactersChoice();
        }
      }
      userCharactersChoice();
  } else {
    confirm(`You need to chose a password length between 8 and 128 characters, please try again`);
    return userPasswordOptions();
    }
  }

userPasswordOptions();

console.log(charOptions);



// Function for getting a random element from an array

let allCharacters = specialCharacters.concat(upperCasedCharacters,lowerCasedCharacters, numericCharacters);

var passwordGeneratedIndex = [];

function getRandom(r) {
  let numberOfIteration = (userInputLength - charOptions.length);
  for (let i = 0; i < numberOfIteration; i++) {
    var randomAllCharactersIndex = Math.floor(Math.random() * allCharacters.length);
    var randomAllCharacters = allCharacters[randomAllCharactersIndex];
    passwordGeneratedIndex.push(randomAllCharacters);
  }
}

getRandom();

console.log(passwordGeneratedIndex);


// Function to generate password with user input
function generatePassword() {
  const generatedPasswordArray = charOptions.concat(passwordGeneratedIndex); 
  console.log(generatedPasswordArray);
  return generatedPasswordArray.join(``);
}


/* var finalPassword = generatePassword();

confirm(finalPassword); */


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