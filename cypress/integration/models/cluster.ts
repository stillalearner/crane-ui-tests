import { addCluster, button } from '../types/constants';
import { clickByText, inputText, openSidebarMenu } from '../../utils/utils';
import { navMenuPoint } from '../views/menu.view';
import { ClusterData } from '../types/types';
import { clusterName, clusterUrl, instanceToken, addButtonModal } from '../views/cluster.view';

export class Cluster {
  protected static openLi(): void {
    openSidebarMenu();
    clickByText(navMenuPoint, 'Clusters');
  }

  protected openMenu(): void {
    //TODO: replace hardcoded timeout by expecting button to become clickable
    cy.wait(2000);
    Cluster.openLi();
  }

  protected runWizard(clusterData: ClusterData): void {
    const { name, url, token } = clusterData;
    clickByText(button, addCluster);
    inputText(clusterName, name);
    inputText(clusterUrl, url);
    inputText(instanceToken, token);
    clickByText(addButtonModal, addCluster);
  }

  create(clusterData: ClusterData): void {
    super.openMenu();
    this.runWizard(clusterData);
    //this.populate(providerData);
  }
}