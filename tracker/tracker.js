//  _____                                     ____                _____          _      
// |  __ \                                   |  _ \              / ____|        | |     
// | |__) | __ ___   __ _ _ __ ___  ___ ___  | |_) | __ _ _ __  | |     ___   __| | ___ 
// |  ___/ '__/ _ \ / _` | '__/ _ \/ __/ __| |  _ < / _` | '__| | |    / _ \ / _` |/ _ \
// | |   | | | (_) | (_| | | |  __/\__ \__ \ | |_) | (_| | |    | |___| (_) | (_| |  __/
// |_|   |_|  \___/ \__, |_|  \___||___/___/ |____/ \__,_|_|     \_____\___/ \__,_|\___|
//                   __/ |                                                              
//                  |___/                                                               


function calculateCompletionPercentage() {
    // Get the total number of exercises from all categories
    const totalExercises = [...warmup, ...workout, ...stretching].length;

    // Get the completed exercise IDs from the URL
    const urlParams = new URLSearchParams(window.location.search);
    let completedExercises = [];
    if (urlParams.has('list_concluidos')) {
        completedExercises = urlParams.get('list_concluidos').split(',').filter(Boolean); // Ensure no empty values
    }

    // Calculate the percentage of completed exercises
    const completedCount = completedExercises.length;
    const percentageCompleted = (completedCount / totalExercises) * 100;

    final_percentage = parseFloat(Math.min(Math.max(percentageCompleted, 0), 100).toFixed(2));

    // Return the percentage as a float with 2 decimal places between 0 and 100
    return final_percentage;
}

function updateProgress(percentage) {

    // Get progress label
    const progressLabel = document.getElementById("progressLabel");

    // Update progress label
    progressLabel.textContent = `Progress: ${percentage}%`;

    // If percentage is 100, show congratulations message
    if (percentage === 100) {
        const congratulationsMessage = document.getElementById("congratulations_card");
        const title_card = document.getElementById("title_card");
        congratulationsMessage.style.display = "block";
        title_card.style.display = "none";
    }

}

function resetProgress() {

    // Remove the 'list_concluidos' parameter from the URL
    const url = new URL(window.location.href);
    url.searchParams.delete('list_concluidos');
    
    // Reload the page
    window.location.href = url.href;

}

//  ____            _        ______                _   _                   _ _ _         
// |  _ \          (_)      |  ____|              | | (_)                 | (_) |        
// | |_) | __ _ ___ _  ___  | |__ _   _ _ __   ___| |_ _  ___  _ __   __ _| |_| |_ _   _ 
// |  _ < / _` / __| |/ __| |  __| | | | '_ \ / __| __| |/ _ \| '_ \ / _` | | | __| | | |
// | |_) | (_| \__ \ | (__  | |  | |_| | | | | (__| |_| | (_) | | | | (_| | | | |_| |_| |
// |____/ \__,_|___/_|\___| |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|\__,_|_|_|\__|\__, |
//                                                                                  __/ |
//                                                                                 |___/ 


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
            <h3>${exercise.id} - ${exercise.title}</h3>
            <img src=".${exercise.image}" alt="${exercise.title}" class="card_image">
            <div class="button_row">
                <button onclick="concluir('${exercise.id}')">Concluir</button>
            </div>
            <p><strong>[${exercise.title}]</strong> - ${exercise.description}</p>
        `;

        // Append the section to the container
        container.appendChild(section);
    });
}

// Function to remove completed exercises
function removeCompletedExercises() {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if 'list_concluidos' exists in the URL
    if (urlParams.has('list_concluidos')) {
        // Get the completed exercise IDs as an array
        const list_concluidos = urlParams.get('list_concluidos').split(',').filter(Boolean);
        
        // Loop through the completed exercise IDs
        list_concluidos.forEach((exerciseId) => {
            // Find the section with the corresponding ID
            const section = document.getElementById(exerciseId);
            
            // Remove the section if it exists
            if (section) {
                section.remove();
            }
        });
    }

    percentageCompleted = calculateCompletionPercentage();
    updateProgress(percentageCompleted);

}

// Function to mark an exercise as completed
function concluir(id) {
    // Check if list_concluidos is saved in the URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('list_concluidos')) {
        // Get the list_concluidos from the URL and convert it to an array
        const list_concluidos = urlParams.get('list_concluidos').split(',').filter(Boolean); // Ensure no empty values
        // Add the id to the list_concluidos
        list_concluidos.push(id);
        // Update the URL with the new list_concluidos
        const newUrl = `${window.location.pathname}?list_concluidos=${list_concluidos.join(',')}`;
        window.history.pushState({}, '', newUrl);
    } else {
        // If list_concluidos is not saved in the URL, create a new array with the id
        const list_concluidos = [id];
        // Update the URL with the new list_concluidos
        const newUrl = `${window.location.pathname}?list_concluidos=${list_concluidos.join(',')}`;
        window.history.pushState({}, '', newUrl);
    }

    removeCompletedExercises();

}

//  _____       _ _   _       _    _____      _               
// |_   _|     (_) | (_)     | |  / ____|    | |              
//   | |  _ __  _| |_ _  __ _| | | (___   ___| |_ _   _ _ __  
//   | | | '_ \| | __| |/ _` | |  \___ \ / _ \ __| | | | '_ \ 
//  _| |_| | | | | |_| | (_| | |  ____) |  __/ |_| |_| | |_) |
// |_____|_| |_|_|\__|_|\__,_|_| |_____/ \___|\__|\__,_| .__/ 
//                                                     | |    
//                                                     |_|    

// Render each list into the swipe-view with the corresponding class
renderExerciseList(warmup, "warmup_card");
renderExerciseList(workout, "workout_card");
renderExerciseList(stretching, "stretching_card");

// Remove the exercises already completed following the url
removeCompletedExercises();
