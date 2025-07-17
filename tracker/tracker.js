function calculateCompletionPercentage() {
    const urlParams = new URLSearchParams(window.location.search);
    let completedExercises = [];
    if (urlParams.has('list_concluidos')) {
        completedExercises = urlParams.get('list_concluidos').split(',').filter(Boolean);
    }
    const completedCount = completedExercises.length;
    const percentageCompleted = (completedCount / totalExercises) * 100;
    return parseFloat(Math.min(Math.max(percentageCompleted, 0), 100).toFixed(2));
}

function updateProgress(percentage) {
    const progressLabel = document.getElementById("progressLabel");
    progressLabel.textContent = `Progress: ${percentage}%`;

    if (percentage === 100) {
        document.getElementById("congratulations_card").style.display = "block";
        document.getElementById("title_card").style.display = "none";
    }
}

function renderExerciseList(exerciseList, cardClass) {
    const container = document.querySelector(".swipe-view");

    exerciseList.forEach((exercise) => {
        const section = document.createElement("section");
        section.className = cardClass;
        section.id = exercise.id;

        let recordControls = "";
        if (cardClass === "workout_card") {
            recordControls = `
                <tr>
                    <td>
                        <button onclick="changePersonalRecord('${exercise.id}', -1)">-</button>
                        <span id="pr_display_${exercise.id}" class="pr_display">0 </span><span class="pr_displayUnity">${exercise.unity}</span>
                        <button onclick="changePersonalRecord('${exercise.id}', 1)">+</button>
                    </td>
                </tr>
            `;
        }

        section.innerHTML = `
            <h3>${exercise.id} - ${exercise.title}</h3>
            <img src=".${exercise.image}" alt="${exercise.title}" class="card_image">
            <div class="button_row">
            <table>
                ${recordControls}
                <tr>
                    <td><button style="width: 100%;" onclick="concluir('${exercise.id}')">Concluir</button></td>
                </tr>
            </table>   
            </div>
        `;

        container.appendChild(section);
    });
}

function resetProgress() {
    const url = new URL(window.location.href);
    url.searchParams.delete('list_concluidos');
    window.location.href = url.href; // Reload page preserving other parameters
}

function removeCompletedExercises() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('list_concluidos')) {
        const list_concluidos = urlParams.get('list_concluidos').split(',').filter(Boolean);
        list_concluidos.forEach((exerciseId) => {
            const section = document.getElementById(exerciseId);
            if (section) section.remove();
        });
    }

    const percentageCompleted = calculateCompletionPercentage();
    updateProgress(percentageCompleted);
}

function concluir(id) {
    setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let list_concluidos = [];
        if (urlParams.has('list_concluidos')) {
            list_concluidos = urlParams.get('list_concluidos').split(',').filter(Boolean);
        }
        if (!list_concluidos.includes(id)) list_concluidos.push(id);
        urlParams.set('list_concluidos', list_concluidos.join(','));
        window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);

        removeCompletedExercises();
    }, 300);
}

function changePersonalRecord(exerciseId, delta) {
    const display = document.getElementById(`pr_display_${exerciseId}`);
    let current = parseInt(display.textContent.replace(/\D/g, ''), 10) || 0;
    current = Math.max(current + delta, 0);
    display.textContent = current;
    savePersonalRecordToURL(exerciseId, current);
}

function savePersonalRecordToURL(exerciseId, value) {
    const urlParams = new URLSearchParams(window.location.search);
    let personalRecords = [];
    if (urlParams.has('personal_records')) {
        personalRecords = urlParams.get('personal_records').split(';').filter(Boolean);
    }

    personalRecords = personalRecords.filter(record => !record.startsWith(`${exerciseId}:`));
    personalRecords.push(`${exerciseId}:${value}`);

    urlParams.set('personal_records', personalRecords.join(';'));
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
}

function loadPersonalRecords() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('personal_records')) {
        const personalRecords = urlParams.get('personal_records').split(';').filter(Boolean);
        personalRecords.forEach(record => {
            const [exerciseId, value] = record.split(':');
            const display = document.getElementById(`pr_display_${exerciseId}`);
            if (display) display.textContent = value || "0";
        });
    }
}

function resetPersonalRecords() {
    const url = new URL(window.location.href);
    url.searchParams.delete('personal_records');
    window.location.href = url.href;
}

// Render lists
renderExerciseList(warmup, "warmup_card");
renderExerciseList(workout, "workout_card");
renderExerciseList(stretching, "stretching_card");
renderExerciseList(post_workout, "postworkout_card");

// Remove completed and load records
removeCompletedExercises();
loadPersonalRecords();
