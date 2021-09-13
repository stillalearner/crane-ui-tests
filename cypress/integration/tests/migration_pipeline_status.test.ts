import { directImagePvPlan } from './cluster_config';
import { login } from '../../utils/utils';
import { Plan } from '../models/plan';
  
/* TO DO: Automate deployment of application 

Automates the following tests :

https://polarion.engineering.redhat.com/polarion/#/project/OSE/workitem?id=OCP-43137 test_check_progress_bar_for_restore
https://polarion.engineering.redhat.com/polarion/#/project/OSE/workitem?id=OCP-37708 Migration progress reporting when executing migration
https://polarion.engineering.redhat.com/polarion/#/project/OSE/workitem?id=OCP-37664 Migration progress reporting when executing stage */

describe('Automated test to verify pipeline status after migration, staged migration', () => {
    const plan = new Plan();
    const selectorTuple = [
      [directImagePvPlan, 'Direct image and PV migration'],
      [directImagePvPlan, 'Staged direct image and PV migration']
    ];
    
    beforeEach("Login", () => {
      login();
    });
  
    selectorTuple.forEach(($type) => {
      const [Data, migrationType] = $type;
  
      specify(`${migrationType}`, () => {
      plan.create(Data);
      plan.execute(Data);
      plan.pipelineStatus(migrationType);
      plan.delete(Data);
      });
    });
})
