const userGrid = document.getElementById('userGrid');
const viewToggleBtn = document.getElementById('viewToggleBtn');
const deleteIdInput =  document.getElementById('deleteIdInput');
const deleteBtn = document.getElementById('deleteBtn');
const sortByGroupBtn = document.getElementById('sortByGroupBtn');
const sortByIdBtn = document.getElementById('sortByIdBtn');

const apiUrl = 'https://69a1e5882e82ee536fa28541.mockapi.io/users_api';

let users = [];

/*
Write an async function retrieveData that does the following:
    1. Fetch all user data from the API (use the same endpoint address for users_api that you created in Exercise2.
    2. Store the retrieved data in the users array.
    3. log the users array to the console.
    Note: retrieveData should run as soon as the page loads.
*/
async function retrieveData() {
    const result = await fetch(apiUrl);

    const json = await result.json();

    json.forEach((user) => {
        users.push(user);
    });

    render(users);
}

function render(users) {

    // Remove "no users" message
    userGrid.innerHTML = '';

    users.forEach(
        user => {
            userGrid.innerHTML +=
                `<article class="user-card">
                <h3>${user.first_name ?? ""}</h3>
                <p>first_name: ${user.first_name ?? ""}</p>
                <p>user_group: ${user.user_group ?? ""}</p>
                <p>id: ${user.id ?? ""}</p>
                </article>
                `
        }
    );
}

retrieveData();

/*
Add an event listener on the view toggle (Grid / List) button. When the button is clicked,
the page should toggle between grid and list view. Implement this by modifying the class
of the user grid container: if userGrid.classList contains 'grid-view', remove it and add
'list-view'; if userGrid.classList contains 'list-view', remove it and add 'grid-view'.
*/
viewToggleBtn.addEventListener('click', ()=>{
    if (userGrid.classList.contains('grid-view')) {
        userGrid.classList.replace('grid-view','list-view');
    }
    else if (userGrid.classList.contains('list-view')) {
        userGrid.classList.replace('list-view','grid-view');
    }
    else {
        // Just in case neither class exists...
        userGrid.classList.add('grid-view');
    }
});

/*
Add an event listener on the Sort by Group button (sortByGroupBtn). When clicked,
sort the users array by user_group (ascending order), then call render(users).
*/
sortByGroupBtn.addEventListener('click', ()=>{
    render(
        users.sort((a,b)=>a.user_group - b.user_group)
    );
});


/*
Add an event listener on the Sort by ID button (sortByIdBtn). When clicked, sort the
users array by the numeric value of the id (Number(user.id)) in ascending order, then call
render(users).
*/
sortByIdBtn.addEventListener('click', ()=>{
    render(
        users.sort((a,b)=>a.id - b.id)
    );
});


/*
Add a click event listener to the Delete button (deleteBtn). When clicked, read the user
ID from the deletion input (deleteIdInput), delete that user from the API, and remove the
user from the displayed list. If the ID is invalid, no matching user exists, or the API
deletion request fails, log an appropriate error message to the console.
*/
deleteBtn.addEventListener('click', ()=>{
    const id = deleteIdInput.value;
    deleteUser(id);
});
async function deleteUser(id) {
    await fetch(apiUrl + '/' + id, { method: 'DELETE' });
    retrieveData();
}