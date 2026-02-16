
document.addEventListener("DOMContentLoaded", () => {
    const nomInput = document.getElementById("inputNom");
    const prenomInput = document.getElementById("inputPrenom");
    const addButton = document.getElementById("addButton");
    const studentList = document.getElementById("studentList");

    addButton.addEventListener("click", () => {
        const nom = nomInput.value.trim();
        const prenom = prenomInput.value.trim();
        if (nom && prenom) {
            const newStudent = { "nom":nom, "prenom": prenom };
            fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newStudent)
            })
            .then(response => response.json())
            .then(data => {
                console.log("Added student:", data);
                const listItem = document.createElement("li");
                listItem.textContent = `${data.prenom} ${data.nom}`;
                studentList.appendChild(listItem);
                nomInput.value = "";
                prenomInput.value = "";
            })
            .catch(error => console.error("Error adding student:", error));
        }
    });

    fetch("/api/users")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched students:", data);
            data.forEach(student => {
                const listItem = document.createElement("li");
                listItem.textContent = `${student.prenom} ${student.nom}`;
                studentList.appendChild(listItem);
            });
        })
});