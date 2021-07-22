export type ClusterData = {
    name: string;
    url: string;
    token: string;
};

export type RepoData = {
  type: string;
  name: string;
  bucket: string;
  region: string;
  key: string;
  secret: string;
};

export type PlanData = {
  name: string;
  source: string;
  target: string;
  repo: string;
  namespaceList : string[];
};