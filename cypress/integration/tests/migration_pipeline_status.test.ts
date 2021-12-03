import { directImagePvPlan } from './cluster_config';
import { login } from '../../utils/utils';
import { Plan } from '../models/plan';
import { clickByText, click, inputText, next, selectFromDroplist } from '../../utils/utils';
import { navMenuPoint } from '../views/menu.view';
  
const sourceCluster = Cypress.env('sourceCluster');
const targetCluster = Cypress.env('targetCluster');
const configurationScript = "./cypress/utils/configuration_script.sh"

/* Automates the following tests :

https://polarion.engineering.redhat.com/polarion/#/project/OSE/workitem?id=OCP-43137 test_check_progress_bar_for_restore
https://polarion.engineering.redhat.com/polarion/#/project/OSE/workitem?id=OCP-37708 Migration progress reporting when executing migration
https://polarion.engineering.redhat.com/polarion/#/project/OSE/workitem?id=OCP-37664 Migration progress reporting when executing stage */

describe('Automated test to verify pipeline status after migration, staged migration', () => {
    const plan = new Plan();
    const selectorTuple = [
      [directImagePvPlan, 'Direct image and PV migration'],
    ];
    
    before("Login", () => {
      login();
    });
  
    selectorTuple.forEach(($type) => {
      const [Data, migrationType] = $type;
  
      it(`${migrationType}`, () => {
        cy.exec(`"${configurationScript}" setup_source_cluster ${Data.namespaceList} "${sourceCluster}"`, { timeout: 200000 });
        cy.exec(`"${configurationScript}" setup_target_cluster ${Data.namespaceList} "${targetCluster}"`, { timeout: 200000 });
        plan.create(Data);
        plan.execute(Data);
        plan.pipelineStatus(migrationType, Data);
        plan.delete(Data);
        cy.exec(`"${configurationScript}" post_migration_verification_on_target ${Data.namespaceList} "${targetCluster}"`, { timeout: 100000 });
        cy.exec(`"${configurationScript}" cleanup_source_cluster ${Data.namespaceList} "${sourceCluster}"`, { timeout: 100000 });
      });
    });
})
