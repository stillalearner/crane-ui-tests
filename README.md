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

    3.Open Cypress and run test cases. For eg: the tests within the indirect_migration_using_S3.test.ts file can be run using this command.

      $(npm bin)/cypress run --browser firefox --spec "./cypress/integration/tests/indirect_migration_using_S3.test.ts" --no-exit
