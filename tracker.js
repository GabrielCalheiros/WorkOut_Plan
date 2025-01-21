// Reference to the main containers where sections will be added
const warmupContainer = document.querySelector('.swipe-view');
const workoutContainer = document.querySelector('.swipe-view');
const stretchingContainer = document.querySelector('.swipe-view');

// Function to render sections based on a list and container
function renderExercises(list, container) {
    list.forEach(exercise => {
        // Create the section container
        const section = document.createElement('section');
        section.classList.add('dark_section');

        // Create the inner container
        const innerContainer = document.createElement('div');
        innerContainer.classList.add('container');

        // Add description
        const description = document.createElement('div');
        description.classList.add('description');
        description.textContent = exercise.description;

        // Add image
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image');
        const image = document.createElement('img');
        image.src = exercise.image;
        image.alt = exercise.title;
        image.classList.add('card_image');
        imageContainer.appendChild(image);

        // Add title
        const title = document.createElement('div');
        title.classList.add('title');
        const titleText = document.createElement('h1');
        titleText.textContent = `${exercise.id} ${exercise.title}`;
        title.appendChild(titleText);

        // Add borders
        const upperBorder = document.createElement('div');
        upperBorder.classList.add('upper_border');
        const bottomBorder = document.createElement('div');
        bottomBorder.classList.add('botton_border');

        // Add buttons
        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
        const skipButton = document.createElement('button');
        skipButton.textContent = 'Skip 💀';
        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done ✔️';
        buttons.appendChild(skipButton);
        buttons.appendChild(doneButton);

        // Append all elements to the container
        innerContainer.appendChild(description);
        innerContainer.appendChild(imageContainer);
        innerContainer.appendChild(title);
        innerContainer.appendChild(upperBorder);
        innerContainer.appendChild(bottomBorder);
        innerContainer.appendChild(buttons);

        // Append the container to the section
        section.appendChild(innerContainer);

        // Add the section to the main container
        container.appendChild(section);
    });
}

// Render sections for each list
renderExercises(warmup, warmupContainer);
renderExercises(workout, workoutContainer);
renderExercises(stretching, stretchingContainer);


