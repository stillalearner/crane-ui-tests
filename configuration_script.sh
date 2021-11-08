setup_source_cluster() {
    #This function creates a new project and application for migration on source cluster.
    oc login -u opentlc-mgr -p 'r3dh4t1!' https://master.rdj2ocp3.mg.dog8code.com:443 --insecure-skip-tls-verify
    if (oc get project nandini 2>/dev/null); then
        oc delete project nandini
    fi
    sleep 30
    oc new-project nandini
    oc new-app django-psql-persistent
    curl $(oc get routes -n nandini | grep django| awk '{print $2}')
}

setup_target_cluster() {
    #This function deletes any existing plan(s) and target namespace on the target cluster.
    #TO DO: Remove hardcoding of project name.
    oc login https://api.cluster-rdj2ocp4b.rdj2ocp4b.mg.dog8code.com:6443 -u kubeadmin -p  8IuXo-ChDKW-cKxkG-X3ML3 --insecure-skip-tls-verify
    if (oc get project nandini 2>/dev/null); then
        oc delete project nandini
    fi
    oc delete migplan --all -n openshift-migration
}

cleanup_source_cluster() {
    #This function cleans up the source cluster by deleting the application created for migration.
    oc login -u opentlc-mgr -p 'r3dh4t1!' https://master.rdj2ocp3.mg.dog8code.com:443 --insecure-skip-tls-verify
    if (oc get project nandini 2>/dev/null); then
        oc delete project nandini
    fi
 }

post_migration_verification_on_target() {
    #This function verifies that the migrated application is running fine on the target cluster.
    oc login https://api.cluster-rdj2ocp4b.rdj2ocp4b.mg.dog8code.com:6443 -u kubeadmin -p  8IuXo-ChDKW-cKxkG-X3ML3 --insecure-skip-tls-verify
    if (oc get routes -n nandini | grep django 2>/dev/null); then
        curl $(oc get routes -n nandini | grep django| awk '{print $2}')
    fi
    if (oc get project nandini 2>/dev/null); then
        oc delete project nandini
    fi
}

if [ $1 == "setup_source_cluster" ]; then
    setup_source_cluster
elif [ $1 == "setup_target_cluster" ]; then
    setup_target_cluster
elif [ $1 == "cleanup_source_cluster" ]; then
    cleanup_source_cluster
elif [ $1 == "post_migration_verification_on_target" ]; then
    post_migration_verification_on_target
fi
