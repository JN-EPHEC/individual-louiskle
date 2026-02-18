
document.addEventListener("DOMContentLoaded", () => {
    const titreInput = document.getElementById("inputTitre");
    const descriptionInput = document.getElementById("inputDescription");
    const addCourseButton = document.getElementById("addCourseButton");
    const courseList = document.getElementById("courseList");
    function createCourseElement(course) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `<span>${course.titre}<span class="badge bg-secondary ms-2">ID: ${course.id}</span></span>
            <button class="btn btn-sm btn-danger delete-course-btn" data-id="${course.id}">X</button>`;
        return li;
    }
    async function loadCourses() {
        try {
            const response = await fetch("/api/courses");
            const courses = await response.json();
            courseList.innerHTML = "";
            courses.forEach(course => {
                courseList.appendChild(createCourseElement(course));
            }
            );
        } catch (error) {
            console.error("Erreur chargement cours:", error);
        }
    }
    async function addCourse() {
        const titre = titreInput.value.trim();
        const description = descriptionInput.value.trim();
        if (!titre || !description) return;
        try {
            const response = await fetch("/api/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titre, description })
            });
            const newCourse = await response.json();
            courseList.appendChild(createCourseElement(newCourse));
            titreInput.value = "";
            descriptionInput.value = "";
        } catch (error) {
            console.error("Erreur ajout cours:", error);
        }
    }
    async function deleteCourse(id, element) {
        try {
            const response = await fetch(`/api/courses/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                element.remove();
            } else {
                console.error("Erreur suppression cours:", response.statusText);
            }
        } catch (error) {
            console.error("Erreur suppression cours:", error);
        }
    }
    addCourseButton.addEventListener("click", addCourse);
    courseList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-course-btn")) {
            const courseId = event.target.getAttribute("data-id");
            deleteCourse(courseId, event.target.closest("li"));
        }
    });
    loadCourses();
});
