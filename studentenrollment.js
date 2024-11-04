const readline = require('readline');

let DSA = [];
let PL = [];
let Networks = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function selectSubject() {
  return new Promise((resolve) => {
    rl.question("Select the subject of choice to enroll a student:\n(A) DSA\n(B) PL\n(C) Networks\n(D) Exit\n", (subjectChoice) => {
      resolve(subjectChoice.toUpperCase());
    });
  });
}

function subjectOperations(subjectArray) {
  return new Promise((resolve) => {
    function performOperation() {
      rl.question("Select an option:\n(A) Enroll\n(B) Unenroll\n(C) Select Another Subject\n(D) Exit\n", (operation) => {
        operation = operation.toUpperCase();
        
        switch (operation) {
          case 'A':
            rl.question("Enter the name of the student to enroll: ", (studentToEnroll) => {
              subjectArray.push(studentToEnroll);
              console.log(`${studentToEnroll} has been enrolled in the subject.`);
              performOperation();
            });
            break;
            
          case 'B':
            if (subjectArray.length === 0) {
              console.log("No students enrolled in this subject.");
              performOperation();
            } else {
              console.log("Currently enrolled students: " + subjectArray.join(", "));
              rl.question("Enter the name of the student to unenroll: ", (studentToUnenroll) => {
                let index = subjectArray.indexOf(studentToUnenroll);
                if (index !== -1) {
                  subjectArray.splice(index, 1);
                  console.log(`${studentToUnenroll} has been unenrolled from the subject.`);
                } else {
                  console.log(`${studentToUnenroll} is not enrolled in the subject.`);
                }
                performOperation();
              });
            }
            break;
            
          case 'C':
            resolve();
            break;
            
          case 'D':
            console.log("Enrolled students in each subject:");
            console.log("DSA: " + DSA.join(", "));
            console.log("PL: " + PL.join(", "));
            console.log("Networks: " + Networks.join(", "));
            resolve();
            break;
            
          default:
            console.log("Invalid option. Please try again.");
            performOperation();
        }
      });
    }
    
    performOperation();
  });
}

async function main() {
  while (true) {
    let subjectChoice = await selectSubject();
    
    switch (subjectChoice) {
      case 'A':
        await subjectOperations(DSA);
        break;
        
      case 'B':
        await subjectOperations(PL);
        break;
        
      case 'C':
        await subjectOperations(Networks);
        break;
        
      case 'D':
        console.log("Exiting the program.");
        console.log("Enrolled students in each subject:");
        console.log("DSA: " + DSA.join(", "));
        console.log("PL: " + PL.join(", "));
        console.log("Networks: " + Networks.join(", "));
        rl.close();
        return;
        
      default:
        console.log("Invalid subject choice. Please try again.");
    }
  }
}

main();
