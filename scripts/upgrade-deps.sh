echo 'upgrading...'

cd "$(dirname "$0")/.."

# remove old dependencies
yarn remove inel_auth_library

# install new dependencies
yarn add inel_auth_library@latest -E

