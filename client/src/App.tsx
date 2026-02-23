import { useEffect, useState } from "react";

interface Student {
  id: number;
  nom: string;
  prenom: string;
}

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState({ nom: "", prenom: "" });

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then(res => res.json())
      .then(setStudents)
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addStudent = async () => {
    if (!form.nom.trim() || !form.prenom.trim()) return;

    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const newStudent = await res.json();
    setStudents(prev => [...prev, newStudent]);
    setForm({ nom: "", prenom: "" });
  };

  const deleteStudent = async (id: number) => {
    await fetch(`http://localhost:3000/api/users/${id}`, { method: "DELETE" });
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "700px" }}>
          <h2 className="text-center mb-4 fw-bold">Gestion des étudiants</h2>

          {/* Formulaire */}
          <div className="row g-2 mb-3">
            <div className="col-md-5">
              <input
                type="text"
                name="nom"
                className="form-control form-control-lg"
                placeholder="Nom"
                value={form.nom}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                name="prenom"
                className="form-control form-control-lg"
                placeholder="Prénom"
                value={form.prenom}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-primary btn-lg" onClick={addStudent}>
                +
              </button>
            </div>
          </div>

          {/* Liste */}
          <ul className="list-group list-group-flush">
            {students.map((s) => (
              <li
                key={s.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{s.prenom} {s.nom}</strong>
                  <span className="badge bg-secondary ms-2">
                    ID {s.id}
                  </span>
                </div>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteStudent(s.id)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}