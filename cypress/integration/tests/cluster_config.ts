import { ClusterData, PlanData } from '../types/types';
import { RepoData } from '../types/types';

export const clusterData: ClusterData = {
  name: 'source-cluster-1s',
  url: 'https://ec2-3-93-47-241.compute-1.amazonaws.com:8443',
  token: '8443',
};

export const repoData: RepoData = {
  type: 'AWS S3',
  name: 'automatic-1',
  bucket: 'camreplication',
  region: 'us-east-2',
  key: 'key',
  secret: 'secret',
};

export const planData: PlanData = {
  name: 'july25',
  source: 'mgn04',
  target: 'host',
  repo: 'automatic-1',
  namespaceList: ['july23'],
};
