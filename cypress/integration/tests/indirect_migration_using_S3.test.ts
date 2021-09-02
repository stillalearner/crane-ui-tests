import { noVerifyCopyPlanData, verifyCopyPlanData, directPvPlanData, verifyCopydirectPvPlan,
  directImagePlanData } from './cluster_config';
import { login } from '../../utils/utils';
import { Plan } from '../models/plan';

describe('Automated test to do an indirect migration using Amazon S3 using file system copy method', () => {
  const plan = new Plan();
  const selectorTuple = [
    [directImagePlanData, 'Direct image migration without copy verification'],
    [directPvPlanData, 'Direct PV migration without copy verification'],
    [verifyCopydirectPvPlan, 'Direct PV migration with copy verification'],
    [noVerifyCopyPlanData, 'Indirect migration without copy verification'],
    [verifyCopyPlanData, 'Indirect migration with copy verification'],
  ];
  
  beforeEach("Login", () => {
    login();
  });

  selectorTuple.forEach(($type) => {
    const [Data, migrationType] = $type;

    specify(`${migrationType}`, () => {
      plan.create(Data);
      plan.execute(Data);
      plan.delete(Data);
    });
  });
})
