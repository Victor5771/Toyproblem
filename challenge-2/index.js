const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculateDemeritPoints(speed) {
  const speedLimit = 70;
  const kmPerDemeritPoint = 5;

  if (speed < speedLimit) {
    console.log('Ok');
  } else {
    const demeritPoints = Math.floor((speed - speedLimit) / kmPerDemeritPoint);

    if (demeritPoints >= 12) {
      console.log('License suspended');
    } else {
      console.log(`Points: ${demeritPoints}`);
    }
  }
}

// Prompt the user to enter the car's speed
rl.question('Enter the car\'s speed (in km/h): ', (input) => {
  const carSpeed = parseFloat(input);

  if (isNaN(carSpeed)) {
    console.log('Invalid input. Please enter a valid number.');
  } else {
    calculateDemeritPoints(carSpeed);
  }

  rl.close();
});
