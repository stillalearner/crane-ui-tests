import { PlanData } from '../types/types';
import {
  clickByText,
  click,
  inputText,
} from '../../utils/utils';
import { navMenuPoint } from '../views/menu.view';
import { planNameInput, selectSourceCluster, selectTargetCluster, selectRepo, 
  searchInput, searchButton, directPvMigrationCheckbox, dataLabel } from '../views/plan.view';

export class Plan {
  protected static openList(): void {
    //openSidebarMenu();
    clickByText(navMenuPoint, 'Migration plans');
  }
  
  protected generalStep(planData: PlanData): void {
    const { name, source, target, repo } = planData;
    inputText(planNameInput, name);
    clickByText('button', 'Select source');
    clickByText('button', source);
    clickByText('button', 'Select target');
    clickByText('button', target);
    clickByText('button', 'Select repository');
    clickByText('button', repo);
    clickByText('button', 'Next');
    //clickByText(storageProvider, type);
  }

  protected selectNamespace(planData: PlanData): void {
    const { namespaceList } = planData;
    //const selector = `[aria-label="search button for search input"]`;
    namespaceList.forEach((name) => {
      inputText(searchInput, name);
      click(searchButton);
      cy.get('td')
        .contains(name)
        .parent('tr')
        .within(() => {
          click('input');
        });
    });
    clickByText('button', 'Next');
  }

  protected persistentVolumes(): void {
    //Wait for PVs to be listed and the 'Next' button to be enabled
    cy.contains('button', 'Next', { timeout: 100000 }).should('be.enabled');
    clickByText('button', 'Next');
  }

  protected copyOptions(): void {
    clickByText('button', 'Next');
  }

  protected migrationOptions(): void {
    cy.get(directPvMigrationCheckbox, { timeout: 20000 }).should('be.enabled').uncheck();
    clickByText('button', 'Next');
  }

  protected hooks(): void {
    clickByText('button', 'Finish');
  }

  protected run(name: string): void {
    cy.get('td')
      .contains(name)
      .parent('td')
      .parent('tr')
      .within(() => {
        clickByText('button', 'Migrate');
    });
  }

  protected waitForReady(name: string): void {
    cy.get('td')
      .contains(name)
      .closest('tr')
      .within(() => {
        cy.get(dataLabel.status).contains('Ready', { timeout: 100000 });
      });
  }

  protected waitForSuccess(name: string): void {
    cy.get('td')
      .contains(name)
      .closest('tr')
      .within(() => {
        cy.get(dataLabel.status).contains('Migration succeeeded', { timeout: 200000 });
      });
  }
  
  create(planData: PlanData): void {
    const { name } = planData;
    Plan.openList();
    clickByText('button', 'Add migration plan');
    this.generalStep(planData);
    this.selectNamespace(planData);
    this.persistentVolumes();
    this.copyOptions();
    this.migrationOptions();
    this.hooks();
    cy.get('h3').should('contain', 'Validation successful')
    clickByText('button', 'Close');
    this.waitForReady(name);
    /*this.vmSelectionStep(planData);
    this.networkMappingStep(planData);
    this.storageMappingStep(planData);
    this.selectMigrationTypeStep(planData);
    this.hooksStep();
    this.finalReviewStep(planData);*/
  }

  execute(planData: PlanData): void {
    const { name } = planData;
    Plan.openList();
    this.run(name);
    this.waitForSuccess(name);
  }
}

