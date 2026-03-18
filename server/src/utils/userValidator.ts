export function validateUserRegistration( age: number, role: string, email: string): boolean {
  if (age > 120) {
    throw new Error("Âge invalide");
  }

  if (role !== "admin" && role !== "user" && role !== "stagiaire") {
    throw new Error("Rôle invalide");
  }

  if (age < 18) {
    if (role === "stagiaire") {
      return true;
    }

    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    return false;
  }

  return true;
}