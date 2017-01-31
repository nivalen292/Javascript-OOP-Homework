/* Task Description */
/* 
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {
	var Course = {

		init: function(title, presentations) {
      this.students = [];
      this.title = title;
      this.presentations = presentations;
      studentIDs = 0;
      presentationCount = presentations.length;


      function isValidTitle(title) {
        if (title === '') { 
          return false;
        }
        if (title[0] === ' ' || title[title.length - 1] === ' ') {
          return false;
        }
        for (let i = 0, len = title.length; i < len; i++) {
          if (title[i] === ' ' && title[i + 1] === ' ') {
            return false;
          }
        }
        return true;
      }

      this.presentations.forEach(function(presentation) {
        if (!isValidTitle(presentation)) {
          throw 'Invalid presentation title';
        }
      });

      if (!isValidTitle(this.title)) {
        throw 'Invalid title';
      }

      if (this.presentations.length === 0) {
        throw 'There are no presentations';
      }

      return this;
		},

		addStudent: function(name) {
      let student = {};
      let nameArr = name.split(' ');
      let firstName = nameArr[0];
      let lastName = nameArr[1];

      if (nameArr.length > 2) {
        throw 'A student can have 2 names only';
      }
      function nameIsValid(name) {
        return (/^[A-Z][a-z]*$/).test(name);
      }
      if (!nameIsValid(firstName) || !nameIsValid(lastName)) {
        throw 'Invalid name!';
      }

      studentIDs++;

      student.firstname = firstName;
      student.lastname = lastName;
      student.id = studentIDs;

      this.students.push(student);
      return studentIDs; // or current id -> student.id
		},

		getAllStudents: function() {
      return this.students.slice(0);
		},

		submitHomework: function(studentID, homeworkID) {
      // let student = students[students.findWithAttr('id', studentID)];
      // let allHomework = presentations.length;

      // student.allHomework = allHomework;
      // student.homework = [];
      // student.homework.push({
      //   homeworkID: true
      // })

      // if (isNaN(studentID) || studentID > this.students.length || this.students[studentID] === undefined) {
      //   throw 'Invalid studentID';
      // }

      // if (isNaN(homeworkID) || homeworkID > this.presentations.length) {
      //   throw 'Invalid homeworkID';
      // }

      function isStudentIdValid(studentID) {
          if (isNaN(studentID) || studentID < 1 || studentID > studentIDs || (studentID !== (studentID | 0))) {
              return false;
          }
          return true;
      }

      function isHomeworkIdValid(homeworkID) {
          if (isNaN(homeworkID) || homeworkID < 1 || homeworkID > presentationCount || (homeworkID !== (homeworkID | 0))) {
              return false;
          }
          return true;
      }

      if (!isStudentIdValid(studentID) || !isHomeworkIdValid(homeworkID)) {
        throw 'Invalid ID!';
      }

      this.students.forEach(function (student) {
            if (student.id === studentID) {
                if (student.homeworks === undefined) {
                    student.homeworks = 1;
                } else {
                    student.homeworks++;
                }
            }
        });

      // Array.prototype.findWithAttr = function(attr, value) {
      // for(let i = 0; i < this.length; i += 1) {
      //   if(this[i][attr] === value) {
      //         return i;
      //     }
      //   }
      //   return -1;
      // }

      return this;
		},

		pushExamResults: function(results) {
      if (!isExamResultsValid(results)) {
        throw 'Invalid results';
      }

      function isExamResultsValid(results) {
        var i,
            j,
            len;
        if (!(Array.isArray(results))) {
            return false;
        }
        
        if (results.length === 0) {
          return false;
        }

        if (results.some(function(item) {
                return (isNaN(item.StudentID) || isNaN(item.score) || item.StudentID < 1 || item.StudentID > studentIDs);
            })) {
            return false;
        }

        for (i = 0, len = results.length; i < len; i += 1) {
            for (j = i + 1; j < len; j += 1) {
                if (results[i].StudentID === results[j].StudentID) {
                    return false;
                }
            }
        }
        return true;
      }

      return this;
		},

		getTopStudents: function() {
      let topStudents = [];

      for (let i = 0, len = this.students.length; i < len; i++) {
        this.students[i].finalScore = this.students[i].homeworks / this.presentations.length * 25 + this.students[i].Score * 0.75;
      }

      this.students.sort((a, b) => a.finalScore - b.finalScore);
      this.students.reverse();
      for (let i = 0; i < 10; i++) {
        if (typeof this.stundets[i] !== undefined) {
          topStudents.push(this.students[i]);
        }
      }
      return topStudents;
		},
	};

	return Course;
}


module.exports = solve;
