document.addEventListener("DOMContentLoaded", () => {
    const nomInput = document.getElementById("inputNom");
    const prenomInput = document.getElementById("inputPrenom");
    const addButton = document.getElementById("addButton");
    const studentList = document.getElementById("studentList");

    function createStudentElement(student) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `<span>${student.prenom} ${student.nom}<span class="badge bg-secondary ms-2">ID: ${student.id}</span></span>
            <button class="btn btn-sm btn-danger delete-btn" data-id="${student.id}">X</button>`;

        return li;
    }

    async function loadStudents() {
        try {
            const response = await fetch("/api/users");
            const students = await response.json();

            studentList.innerHTML = "";
            students.forEach(student => {
                studentList.appendChild(createStudentElement(student));
            });
        } catch (error) {
            console.error("Erreur chargement étudiants:", error);
        }
    }

    async function addStudent() {
        const nom = nomInput.value.trim();
        const prenom = prenomInput.value.trim();

        if (!nom || !prenom) return;

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nom, prenom })
            });

            const newStudent = await response.json();

            studentList.appendChild(createStudentElement(newStudent));

            nomInput.value = "";
            prenomInput.value = "";
        } catch (error) {
            console.error("Erreur ajout étudiant:", error);
        }
    }

    async function deleteStudent(id, element) {
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                element.remove();
            } else {
                console.error("Échec suppression");
            }
        } catch (error) {
            console.error("Erreur suppression:", error);
        }
    }

    addButton.addEventListener("click", addStudent);

    studentList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = e.target.dataset.id;
            const li = e.target.closest("li");
            deleteStudent(id, li);
        }
    });
    loadStudents();
});
