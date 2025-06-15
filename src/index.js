
//Adds an event listener to the form to handle submissions
document.getElementById('guestForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    let name = document.getElementById('guestName').value.trim();
    let email = document.getElementById('guestEmail').value.trim();
    let category = document.getElementById('guestCategory').value;

    const guestList = document.getElementById('guestList');

    // Limit the guest list to 10 people -alert the user if they exceed the limit 
    if (guestList.children.length >= 10) {
        alert('Guest list has reached its maximum limit of 10 people.');
        return;
    }
     
    //Create a new list item for the guest
    const listItem = document.createElement('li');
    //get the current date and time
    const timeAdded = new Date().toLocaleString();

    //Adds a css class to the list item based on the category
    listItem.classList.add(`category-${category}`);

    // Function to update list item HTML
    function updateListItemHTML() {
        listItem.innerHTML = `
            ${name} (${email}) (${category}) (Added at: ${timeAdded})
            <button class="remove">Remove</button>
            <button class="rsvp">Toggle RSVP</button>
            <button class="edit">Edit</button>
            <span class="status">Not Attending</span>
        `;
        attachEventListeners(); // Reattach listeners after HTML update
    }

    // Function to attach all button event listeners
    // should be able to remove a guest from the list using a delete button
    function attachEventListeners() {
        listItem.querySelector('.remove').addEventListener('click', function () {
            guestList.removeChild(listItem);
        });

        // should be able to toggle the RSVP status of a guest using a button
        listItem.querySelector('.rsvp').addEventListener('click', function () {
            const statusSpan = listItem.querySelector('.status');
            statusSpan.textContent = statusSpan.textContent === 'Not Attending' ? 'Attending' : 'Not Attending';
        });
      // should be able to edit the name and email of a guest using a button
      //edit guest name and email
        listItem.querySelector('.edit').addEventListener('click', function () {
            const newName = prompt('Enter a new name:', name);
            const newEmail = prompt('Enter a new email:', email);

            if (newName && newEmail) {
                name = newName;
                email = newEmail;
                updateListItemHTML(); // Re-render the updated content
            }
        });
    }

    updateListItemHTML(); // Initial render
    // Append the new list item to the guest list
    guestList.appendChild(listItem);
});
