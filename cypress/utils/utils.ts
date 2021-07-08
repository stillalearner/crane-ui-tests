import * as loginView from '../integration/views/login.view';

const userName = Cypress.env('user');
const userPassword = Cypress.env('pass');
const craneUiUrl = Cypress.env('craneUrl');

export function inputText(fieldId: string, text: string): void {
  cy.get(fieldId).clear().type(text);
}

export function clickByText(fieldId: string, buttonText: string): void {
  cy.contains(fieldId, buttonText).click();
}

export function click(fieldId: string): void {
  cy.get(fieldId).click();
}

export function login(): void {
  cy.visit(craneUiUrl);
  //clickByText('button', 'flexy-htpasswd-provider');
  cy.wait(20000);
  inputText(loginView.userNameInput, userName);
  inputText(loginView.userPasswordInput, userPassword);
  clickByText('button', 'Log in');
}