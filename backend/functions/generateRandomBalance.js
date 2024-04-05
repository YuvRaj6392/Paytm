const generateRandomBalance = () => {
 const min = 100;
 const max = 100000;
 const randomNumber = Math.random() * (max - min) + min;
 const roundedNumber = Math.floor(randomNumber * 100) / 100; 
 return roundedNumber;
};

module.exports = { generateRandomBalance };
