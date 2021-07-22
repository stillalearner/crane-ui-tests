export const planNameInput = '#planName';
export const selectSourceCluster = '#sourceCluster';
export const selectTargetCluster = '#targetCluster';
export const selectRepo = '#selectedStorage';
/*export const allDcCheckbox =
  '#converted-root > div > button > span.pf-c-tree-view__node-check > input[type=checkbox]';*/
export const searchInput = '#name-input';
export const searchButton = `[aria-label="search button for search input"]`;
export const directPvMigrationCheckbox = '#indirectVolumeMigration';
export const mappingDropdown = 'button.pf-c-select__toggle';
export const targetNetwork = '[aria-label="Select target..."]';
export const kebab = '.pf-c-dropdown__toggle.pf-m-plain';
export enum dataLabel {
  name = '[data-label=Name]',
  sourceProvider = '[data-label="Source provider"]',
  targetProvider = '[data-label="Target provider"]',
  vms = '[data-label=VMs]',
  status = '[data-label="Last state"]',
}