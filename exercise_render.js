document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("exercise-body");

    const STORAGE_KEY = "workout-progress";

    function loadProgress() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    }

    function saveProgress(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    const progressData = loadProgress();

    // 🔽 RENDER
    exercise_list.forEach(ex => {
        const row = document.createElement("tr");

        const checkboxCount = ex.sets || 1;
        const savedValue = progressData[ex.id] || 0;

        row.innerHTML = `
            <td>
                <img src="${ex.image}" alt="${ex.title}">
            </td>

            <td>
                <button class="progress-btn" 
                    data-current="${savedValue}" 
                    data-max="${checkboxCount}"
                    data-id="${ex.id}">
                    ${savedValue}/${checkboxCount}
                </button>
            </td>

            <td>
                <strong>${ex.id} - ${ex.title}</strong><br>
                <small>${ex.description}</small>
            </td>
        `;

        const btn = row.querySelector(".progress-btn");

        if (savedValue === checkboxCount) {
            btn.classList.add("completed");
        } else if (savedValue > 0) {
            btn.classList.add("in-progress");
        }

        tbody.appendChild(row);
    });

    // 🔽 SORTING
    function getState(row) {
        const btn = row.querySelector(".progress-btn");
        const current = parseInt(btn.dataset.current);
        const max = parseInt(btn.dataset.max);

        if (current === 0) return 0;       // not started
        if (current === max) return 2;     // completed
        return 1;                          // in progress
    }

    function sortRows() {
        const rows = Array.from(tbody.children);

        rows.sort((a, b) => getState(a) - getState(b));

        rows.forEach(r => tbody.appendChild(r));
    }

    // sort after initial render
    sortRows();

    // 🔽 CLICK HANDLER
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("progress-btn")) {

            const btn = e.target;
            const id = btn.dataset.id;

            let current = parseInt(btn.dataset.current);
            const max = parseInt(btn.dataset.max);

            current++;
            if (current > max) current = 0;

            btn.dataset.current = current;
            btn.innerText = `${current}/${max}`;

            btn.classList.remove("completed", "in-progress");

            if (current === max) {
                btn.classList.add("completed");
            } else if (current > 0) {
                btn.classList.add("in-progress");
            }

            // 💾 SAVE
            progressData[id] = current;
            saveProgress(progressData);

            // 🔽 re-sort after change
            sortRows();
        }
    });

    // 🔽 RESET FUNCTION (now correctly scoped)
    window.resetWorkout = function () {
        localStorage.removeItem(STORAGE_KEY);

        document.querySelectorAll(".progress-btn").forEach(btn => {
            const max = btn.dataset.max;

            btn.dataset.current = 0;
            btn.innerText = `0/${max}`;
            btn.classList.remove("completed", "in-progress");
        });

        sortRows();
    };
});
