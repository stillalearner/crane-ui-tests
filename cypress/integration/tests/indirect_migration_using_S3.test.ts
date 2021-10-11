import { noVerifyCopyPlanData, verifyCopyPlanData, directPvPlanData, verifyCopydirectPvPlan,
  directImagePlanData, directImagePvPlan, indirectMultipleProjects, directMultipleProjects, changeTargetNamespace } from './cluster_config';
import { login } from '../../utils/utils';
import { Plan } from '../models/plan'

// TO DO: Automate deployment of application and verify that the application is running before initiating
// application migration.

describe('Automated tests to do direct and indirect migrations using Amazon S3 using file system copy method', () => {
  const plan = new Plan();
  const selectorTuple = [
    //[directImagePlanData, 'Direct image migration without copy verification'],
    //[directPvPlanData, 'Direct PV migration without copy verification'],
    //[verifyCopydirectPvPlan, 'Direct PV migration with copy verification'],
    //[noVerifyCopyPlanData, 'Indirect migration without copy verification'],
    //[verifyCopyPlanData, 'Indirect migration with copy verification'],
    //[noVerifyCopyPlanData, 'Rollover indirect migration and then migrate'],
    //[directImagePvPlan, 'Rollover direct migration and then migrate'],
    //[indirectMultipleProjects, 'Indirect migration of multiple projects'],
    //[directMultipleProjects, 'Indirect migration of multiple projects'],
    [changeTargetNamespace, 'Direct migration of a single project to non-default target namespace'],
  ];
  
  before("Login", () => {
    login();
  });

  selectorTuple.forEach(($type) => {
    const [Data, migrationType] = $type;

    it(`${migrationType}`, () => {
      plan.create(Data);
      plan.execute(Data);
      if (`${migrationType}` == 'Rollover indirect migration and then migrate' ||
          `${migrationType}` == 'Rollover direct migration and then migrate') {
        plan.rollback(Data);
        plan.execute(Data);
      }
      plan.delete(Data);
    });
  });
})
