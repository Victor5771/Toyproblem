const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to calculate and display the student's grade
function calculateStudentGrade() {
  rl.question('Enter the student\'s marks (0-100): ', (input) => {
    const marks = parseFloat(input);

    if (isNaN(marks) || marks < 0 || marks > 100) {
      console.log('Invalid input. Marks should be between 0 and 100.');
    } else {
      let grade;
      if (marks > 79) {
        grade = 'A';
      } else if (marks >= 60) {
        grade = 'B';
      } else if (marks >= 50) {
        grade = 'C';
      } else if (marks >= 40) {
        grade = 'D';
      } else {
        grade = 'E';
      }

      console.log(`Student's grade: ${grade}`);
    }

    rl.close();
  });
}

// Call the function to start the program
calculateStudentGrade();
