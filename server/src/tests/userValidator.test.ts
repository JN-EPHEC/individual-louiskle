import { validateUserRegistration } from "../utils/userValidator";

describe("test user validator", () => {
  it("accepte un user adulte avec un bon email", () => {
    expect(validateUserRegistration(20, "user", "test@mail.com")).toBe(true);
  });

  it("accepte un admin adulte avec un bon email", () => {
    expect(validateUserRegistration(30, "admin", "admin@mail.com")).toBe(true);
  });

  it("accepte un stagiaire mineur", () => {
    expect(validateUserRegistration(17, "stagiaire", "test@mail.com")).toBe(true);
  });

  it("refuse un user mineur", () => {
    expect(validateUserRegistration(17, "user", "test@mail.com")).toBe(false);
  });

  it("refuse un admin mineur", () => {
    expect(validateUserRegistration(16, "admin", "test@mail.com")).toBe(false);
  });

  it("lance une erreur si age trop grand", () => {
    expect(() => validateUserRegistration(121, "user", "test@mail.com")).toThrow(
      "Âge invalide"
    );
  });

  it("lance une erreur si role invalide", () => {
    expect(() => validateUserRegistration(20, "chef", "test@mail.com")).toThrow(
      "Rôle invalide"
    );
  });

  it("refuse un email sans arobase", () => {
    expect(validateUserRegistration(20, "user", "testmail.com")).toBe(false);
  });

  it("refuse un email sans point", () => {
    expect(validateUserRegistration(20, "user", "test@mailcom")).toBe(false);
  });

  it("accepte un stagiaire adulte avec un bon email", () => {
    expect(validateUserRegistration(25, "stagiaire", "stagiaire@mail.com")).toBe(
      true
    );
  });
});