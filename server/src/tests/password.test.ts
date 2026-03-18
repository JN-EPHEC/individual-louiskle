import { validatePassword } from "../utils/password";

describe("Validation du mdp", () => {

  it("refuse mot de passe vide", () => {
    expect(validatePassword("", 25)).toBe(false);
  });

  it("refuse mot de passe trop court", () => {
    expect(validatePassword("Ab1!", 25)).toBe(false);
  });
  it("refuse mot de passe trop long", () => {
    expect(validatePassword("Abcdefghijklmnopqrstuv1!", 25)).toBe(false);
  });
  it("enfant sans minuscule", () => {
    expect(validatePassword("ABCDEFGH", 10)).toBe(false);
  });

  it("enfant avec minuscule", () => {
    expect(validatePassword("abcdefghi", 10)).toBe(true);
  });

  it("adulte sans majuscule", () => {
    expect(validatePassword("abc12345!", 25)).toBe(false);
  });

  it("adulte sans minuscule", () => {
    expect(validatePassword("ABC12345!", 25)).toBe(false);
  });

  it("adulte sans chiffre", () => {
    expect(validatePassword("Abcdefg!", 25)).toBe(false);
  });

  it("adulte sans caractère spécial", () => {
    expect(validatePassword("Abc12345", 25)).toBe(false);
  });

  it("adulte valide", () => {
    expect(validatePassword("Abc12345!", 25)).toBe(true);
  });

  it("senior sans chiffre ni majuscule", () => {
    expect(validatePassword("abcdefgh", 70)).toBe(false);
  });

  it("senior avec majuscule", () => {
    expect(validatePassword("Abcdefgh", 70)).toBe(true);
  });

  it("senior avec chiffre", () => {
    expect(validatePassword("abcdefg1", 70)).toBe(true);
  });

});