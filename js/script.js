/*
Treehouse Techdegree: Data Pagination and Filtering
*/

/**
 * Code Necessary for 'Meets Expectations.'
 */

//Sets number of items to display to 9. (Not sure how to dynamically change this yet.)

let numOfItems = 9;


//showPage function. Takes a list of students as the first parameter and which page the user is on as the second.
//Constructs an li element with the student info and appends it inside the ul element of the source HTML.

function showPage(list, page) {
   const startIndex = ( page * numOfItems ) - numOfItems;
   const endIndex = page * numOfItems;
   const student_list = document.querySelector('.student-list');
   student_list.innerHTML = '';

   for (i = 0; i < list.length; i++) {
      const student_info = `
      <li class="student-item cf">
         <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
          </div>
       </li>
      `;
      if (i >= startIndex && i < endIndex) {
         student_list.insertAdjacentHTML('beforeend', student_info);
      }
   }
}


//The addPagination function which accepts a list of students as a parameter.
//Determines how many pages are needed, depending on the number of items to be displayed per page.
//Adds a button for each page needed.
//If there is at least one button, the first gets the class of 'active'.
//Changes which button is active upon click.
//Calls the showPage function with the page number clicked passed in as the second parameter.

function addPagination (list) {
   const numOfPages = Math.ceil(list.length / numOfItems);
   const link_list = document.querySelector('.link-list');
   link_list.innerHTML = '';
   for (i = 0; i < numOfPages; i++) {
      const pageButton = `
         <li>
            <button type="button">${i + 1}</button>
         </li>
      `;
      link_list.insertAdjacentHTML('beforeend', pageButton);
   }
   
   if (link_list.getElementsByTagName('li').length > 0) {
      const firstButton = link_list.firstElementChild.firstElementChild;
      firstButton.className = 'active';
   }

   link_list.addEventListener('click', (e) => {
      if (e.target.type === 'button') {
         const btns = document.querySelectorAll('button');
         for (i = 0; i < btns.length; i++) {
            btns[i].className = '';
         }
         e.target.className = 'active';
         showPage(list, parseInt(e.target.innerText));
      }
   });
}

// Calls both functions
showPage(data, 1);
addPagination(data);

/*
* Code necessary for 'Exceeds Expectations'.
*/

//Creates a search bar to be appended inside the header at the end.

const searchBar = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;
document.querySelector('.header').insertAdjacentHTML('beforeend', searchBar);

//Variables that store the input of the user in the search bar, the search button, and which list of students match the user's input, respectively.

const search = document.querySelector('#search');
const submit = document.querySelector('.student-search button');
let studentMatches = [];

//The searchForStudents function which takes a search input and a list of names as parameters.
//Resets the array of studentMatches to an empty array each time it is called.
//Iterates through list of names, storing the first and last in a variable called 'studentName'
//If the user input is included in the studentName, the name gets pushed to the studentMatches array.

function searchForStudents (searchInput, names) {
   studentMatches = [];
   for (i = 0; i < names.length; i++){
      const studentName = names[i].name.first.toLowerCase() + ' ' + names[i].name.last.toLowerCase();
      if (studentName.includes(searchInput.value.toLowerCase()) ) {
         studentMatches.push(names[i]);
      }
   }
}


//Event listener on the search button.
//Calls the searchForStudents function to fill the studentMatches array.
//Then calls the showPage and addPagination functions passing them the studentMatches array.
//If there are no matches, changes the inner text of the <h2> element to 'No results found.' Otherwise, resets it to 'STUDENTS'.
submit.addEventListener('click', () => {
   searchForStudents(search, data);
   showPage(studentMatches, 1);
   addPagination(studentMatches);
   const header = document.querySelector('h2');
   if (studentMatches.length === 0) {
      header.innerText = 'No results found.';
   } else {
      header.innerText = 'STUDENTS';
   }
});

//An event listener that is much the same as the previous, but listening for key strokes in the search bar instead.

search.addEventListener('keyup', () => {
   searchForStudents(search, data);
   showPage(studentMatches, 1);
   addPagination(studentMatches);
   const header = document.querySelector('h2');
   if (studentMatches.length === 0) {
      header.innerText = 'No results found.';
   } else {
      header.innerText = 'STUDENTS';
   }
});







