# End-to-end Cypress tests for Crane UI

# Getting Started

# Requirements

    1.Operating system

      Fedora 21 and above (64-bit only)

    2.Install Node.js 12 or 14 and above

      sudo dnf install nodejs
      OR
      sudo dnf install npm    # also installs nodejs

    3.Upgrade Node to 12 or 14 or above

      sudo npm install -g n

# Install and run automation
    1.Clone automation repository

      git clone https://github.com/konveyor/crane-ui-tests.git

    2.Go to folder and install

      cd crane-ui-tests

      npm install

    3.Specify Crane/MTC URL and and kubeadmin password in the cypress.json file
      For eg:
      [user1@localhost crane-ui-tests]$ cat cypress.json
        {
            "viewportWidth": 1280,
            "viewportHeight": 800,
            "supportFile": "cypress/support/commands.js",
            "env": {
                "user": "kubeadmin",
                "pass": "password",
                "craneUrl": "https://migration-openshift-migration.apps.cam-tgt-1122.gcp.devcluster.openshift.com/"
            }
        }

    4.Open Cypress and run test cases. For eg: the tests within the indirect_migration_using_S3.test.ts file can be run using this command.
      [user1@localhost]$ cd crane-ui-tests
      [user1@localhost crane-ui-tests]$ npx cypress run --browser firefox --spec "./cypress/integration/tests/indirect_migration_using_S3.test.ts"
