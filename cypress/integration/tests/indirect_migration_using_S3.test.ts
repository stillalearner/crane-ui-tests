import { noVerifyCopyPlanData, verifyCopyPlanData, directPvPlanData } from './cluster_config';
import { login } from '../../utils/utils';
import { Plan } from '../models/plan';

describe('Automated test to do an indirect migration using Amazon S3 using file system copy method', () => {
  const plan = new Plan();
  const selectorTuple = [
    [noVerifyCopyPlanData, 'Indirect migration without copy verification'],
    [verifyCopyPlanData, 'Indirect migration with copy verification'],
    [directPvPlanData, 'Direct PV migration'],
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
