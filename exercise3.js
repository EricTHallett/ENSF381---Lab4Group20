const userGrid = document.getElementById('userGrid');
const viewToggleBtn = document.getElementById('viewToggleBtn');
const deleteIdInput = document.getElementById('deleteIdInput');
const deleteBtn = document.getElementById('deleteBtn');
const sortByGroupBtn = document.getElementById('sortByGroupBtn');
const sortByIdBtn = document.getElementById('sortByIdBtn');

let users = [];
const apiURL = "https://69a1e4212e82ee536fa27f76.mockapi.io/users_api";

async function retrieveDate() {
    try {
        const result = await fetch(apiURL);
        const json = await result.json();
        users = json;
    } catch (e) {
        console.error("An error has occurred.", e);
        return;
    }
    
    render(users);
    console.log(users);
}

retrieveDate();

function render(arr) {
    userGrid.innerHTML = '';

    arr.forEach(user => {
        userGrid.innerHTML +=
            `<article class="user-card">
                <h3>${user.first_name ?? ""}</h3>
                <p>first_name: ${user.first_name ?? ""}</p>
                <p>user_group: ${user.user_group ?? ""}</p>
                <p>id: ${user.id ?? ""}</p>
            </article>`;
    });
}

viewToggleBtn.addEventListener('click', () => {
    if (userGrid.classList.contains('grid-view')) {
        userGrid.classList.replace('grid-view', 'list-view');
    } else if (userGrid.classList.contains('list-view')) {
        userGrid.classList.replace('list-view', 'grid-view');
    } else {
        userGrid.classList.add('grid-view');
    }
});

sortByGroupBtn.addEventListener('click', () => {
    render(users.sort((a, b) => a.user_group - b.user_group));
});

sortByIdBtn.addEventListener('click', () => {
    render(users.sort((a, b) => a.id - b.id));
});

deleteBtn.addEventListener('click', async () => {
    const idToDelete = deleteIdInput.value;
    if (!idToDelete) {
        console.error("No ID entered.");
        return;
    }

    try {
        const response = await fetch(`${apiURL}/${idToDelete}`, { method: 'DELETE' });
        if (!response.ok) {
            console.error("Failed to delete user. Invalid ID or API error.");
            return;
        }

        let toRemove = -1;

        for (let i = 0; i < users.length; i++) {
            if (users[i].id == idToDelete) {
                toRemove = i;
                break;
            }
        }

        if (toRemove != -1) {
            users.splice(toRemove, 1);
        } else {
            console.error("User not found.")
        }

        render(users);

        console.log(`User ${idToDelete} deleted from API.`);
    } catch (err) {
        console.error("Cannot delete user:", err);
    }
});
