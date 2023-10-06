// Load user data from data.js
const userData = users;

// Define the number of users to display per page
const usersPerPage = 10;

// Calculate the total number of pages based on user data
const totalPages = Math.ceil(userData.length / usersPerPage);

// Initialize the current page to the first page
let currentPage = 1;

// Function to display a list of users for the given page
function displayUsers(page) {
  const userList = document.querySelector('.contact-list');
  userList.innerHTML = ''; // Clear the existing list

  // Calculate the starting and ending indices for the current page
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = Math.min(startIndex + usersPerPage, userData.length);

  // Loop through the user data for the current page
  for (let i = startIndex; i < endIndex; i++) {
    const user = userData[i];

    // Create HTML elements for each user and append them to the list
    const listItem = document.createElement('li');
    listItem.classList.add('contact-item', 'cf');
    listItem.innerHTML = `
      <div class="contact-details">
        <img class="avatar" src="${user.image}">
        <h3>${user.name}</h3>
        <span class="email">${user.email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${user.joined}</span>
      </div>
    `;

    userList.appendChild(listItem);
  }

  // Update the total number of contacts displayed
  const totalContacts = document.getElementById('totalContacts');
  totalContacts.textContent = userData.length;
}

// Function to create pagination buttons
function createPaginationButtons() {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = ''; // Clear existing buttons

  // Create "Previous" button
  const prevButton = document.createElement('li');
  prevButton.classList.add('pagination-item');
  prevButton.innerHTML = '<a href="#">&laquo; Previous</a>';
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayUsers(currentPage);
    }
  });
  pagination.appendChild(prevButton);

  // Create page number buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('li');
    pageButton.classList.add('pagination-item', 'page-number');
    pageButton.innerHTML = `<a href="#">${i}</a>`;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      displayUsers(currentPage);
    });
    pagination.appendChild(pageButton);
  }

  // Create "Next" button
  const nextButton = document.createElement('li');
  nextButton.classList.add('pagination-item');
  nextButton.innerHTML = '<a href="#">Next &raquo;</a>';
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayUsers(currentPage);
    }
  });
  pagination.appendChild(nextButton);

  // Highlight the current page button
  const pageButtons = document.querySelectorAll('.page-number');
  pageButtons.forEach((button, index) => {
    if (index + 1 === currentPage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// Initialize the page with the first set of users and pagination buttons
displayUsers(currentPage);
createPaginationButtons();
