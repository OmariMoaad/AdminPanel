/// <reference types="cypress" />

describe("Admin Console Navigation", () => {
  const email = "admin@gmail.com";
  const password = "admin";

  beforeEach(() => {
    cy.visit("http://localhost:5173"); // adapte l'URL si nécessaire
  });

  it("logs in and navigates through pages", () => {
    // Remplir les champs du formulaire
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Vérifie que la page Users s'affiche
    cy.contains("Users").should("exist");

    // Aller à la page Applications
    cy.contains("Applications").click();
    cy.contains("Applications").should("exist");

    // Aller à la page Permissions
    cy.contains("Permissions").click();
    cy.contains("Permissions").should("exist");
  });
});
  
