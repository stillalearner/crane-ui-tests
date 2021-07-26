import { repoData, planData } from './cluster_config';
import { login } from '../../utils/utils';
import { Repo } from '../models/repo';
import { Plan } from '../models/plan';

describe('Automated test to do an indirect migration using Amazon S3 using file system copy method', () => {
  const plan = new Plan();
  
  before(() => {
    login();
  });

  it('Create and execute migration plan', () => {
    plan.create(planData);
    plan.execute(planData);
  });
});
