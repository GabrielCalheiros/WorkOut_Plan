// Function to create and append sections for a given list of exercises
function renderExerciseList(exerciseList, cardClass) {
    // Get the swipe-view container
    const container = document.querySelector(".swipe-view");

    // Loop through each exercise in the list
    exerciseList.forEach((exercise) => {
        // Create a new section element
        const section = document.createElement("section");
        section.className = cardClass; // Set the class (e.g., warmup_card, workout_card, etc.)
        section.id = exercise.id; // Set the id of the section

        // Add the inner content of the section
        section.innerHTML = `
            <h3>${exercise.title}</h3>
            <img src=".${exercise.image}" alt="${exercise.title}" class="card_image">
            <div class="button_row">
                <button onclick="concluir('${exercise.id}')">Concluir</button>
                <button onclick="desistir('${exercise.id}')">Desistir</button>
            </div>
            <p><strong>[${exercise.title}]</strong> - ${exercise.description}</p>
        `;

        // Append the section to the container
        container.appendChild(section);
    });
}

// Render each list into the swipe-view with the corresponding class
renderExerciseList(warmup, "warmup_card");
renderExerciseList(workout, "workout_card");
renderExerciseList(stretching, "stretching_card");

// Example functions for buttons
function concluir(id) {
    alert(`Exercise ${id} marked as done!`);
}

function desistir(id) {
    alert(`Exercise ${id} skipped.`);
}
