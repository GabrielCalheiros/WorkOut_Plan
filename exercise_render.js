// Function to render a list of exercises into a container
function renderExercises(containerSelector, exerciseList) {
    // Reference to the container div
    const container = document.querySelector(containerSelector);

    // Loop through each exercise in the list and create a card for it
    exerciseList.forEach(exercise => {
        // Create the card container
        const card = document.createElement('div');
        card.classList.add('feed_card');
        
        // Add the image section
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('feed_image');
        const image = document.createElement('img');
        image.src = exercise.image;
        image.classList.add('feed_img');
        imageContainer.appendChild(image);
        
        // Add the text section
        const textContainer = document.createElement('div');
        textContainer.classList.add('feed_text');
        const title = document.createElement('h3');
        title.textContent = `${exercise.id} ${exercise.title}`;
        const description = document.createElement('p');
        description.style.textIndent = '0%';
        description.innerHTML = `<strong>${exercise.description.split(' ')[0]}</strong> <br> ${exercise.description}`;
        textContainer.appendChild(title);
        textContainer.appendChild(description);
        
        // Append sections to the card
        card.appendChild(imageContainer);
        card.appendChild(textContainer);
        
        // Add the card to the container
        container.appendChild(card);

        // Add a line break after each card
        container.appendChild(document.createElement('br'));
    });
}

// Render the warmup, workout, and stretching lists
renderExercises('.warmup', warmup);
renderExercises('.workout', workout);
renderExercises('.stretching', stretching);
