function SwitchMode() {
    var switchIcon = document.getElementById("switch-icon");
    var bg_img_container = document.getElementById("bg-img-container");
    var page_body = document.getElementById("body");
    page_body.classList.toggle("Switch-Mode");
    if (switchIcon.src.includes("icon-moon.svg")) {
        switchIcon.src = "images/icon-sun.svg"; 
    } 
    else {
        switchIcon.src = "images/icon-moon.svg";
    }
}

// Make the current year dynamic in the footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// add to do note when enter key is pressed
document.addEventListener("keydown", function(event) {
    var new_to_do = document.getElementById("to-do-template");
    var add_text_area = document.getElementById("add-text-area");
    // Check if Enter key is pressed
    if (event.key === "Enter") { 
        if (add_text_area.value !== "") {
            let clonedElement = new_to_do.cloneNode(true);
            clonedElement.classList.remove("template");
            clonedElement.style.display = "flex";

            let noteText = clonedElement.querySelector("#note-text");
            if (noteText) {
                noteText.textContent = add_text_area.value;
            }
            add_text_area.value = ""; 
            document.getElementById("todo-list").appendChild(clonedElement);
        }
    }
});

function AddNote() {
    var new_to_do = document.getElementById("to-do-template");
    var add_text_area = document.getElementById("add-text-area");
    if (add_text_area.value !== "") {
        let clonedElement = new_to_do.cloneNode(true);
        clonedElement.classList.remove("template");
        clonedElement.style.display = "flex";

        let noteText = clonedElement.querySelector("#note-text");
        if (noteText) {
            noteText.textContent = add_text_area.value;
        }
        add_text_area.value = ""; 
        document.getElementById("todo-list").appendChild(clonedElement);
    }
}

// delete to do note when delete icon is clicked
function RemoveNote(thisElement) {
    const liElement = thisElement.closest('li'); // Ensure `thisElement` is valid
    if (liElement) {
        liElement.style.display = "none"; // Hide the <li> element
    } else {
        console.error("Error: Could not find the parent <li> element.");
    }
}
// Another way to remove the to do note

// document.querySelectorAll('.delete-btn').forEach(button => {
//     button.addEventListener('click', function() {
//         const liElement = this.closest('li'); // Selects the parent <li>
//         liElement.style.display = "none";
//     });
// });


// Highlight the selected filter button
document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active')); 
        this.classList.add('active');
    });
});


// Filter the to-do notes based on the selected filter button
function FilterNotes(filter) {
    // Get the <ul> or <ol> element containing the to-do notes
    const todoList = document.getElementById('todo-list'); 
    // Convert to array & filter out the template <li> elements
    const todoItems = [...todoList.children].filter(item => !item.classList.contains('template')); 

    todoItems.forEach(item => {
        // Get the checkbox inside <li> element
        const checkbox = item.querySelector('.task-checkbox'); 
        switch (filter) {
            case 'all':
                item.style.display = 'flex';
                break;
            case 'active':
                item.style.display = checkbox.checked ? 'none' : 'flex';
                break;
            case 'completed':
                item.style.display = checkbox.checked ? 'flex' : 'none';
                break;
            default:
                console.error('Invalid filter value');
        }
    });
}

function ClearCompleted() {
    const todoList = document.getElementById('todo-list');
    const todoItems = [...todoList.children].filter(item => !item.classList.contains('template'));
    todoItems.forEach(item => {
        const checkbox = item.querySelector('.task-checkbox');
        if (checkbox.checked) {
            item.remove();
        }
    });
}