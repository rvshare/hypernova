# Development

## Releasing

Once the `main` branch is in a state that you would like to cut a release from, you can do the following:

1. Checkout `main` locally and ensure you have no local changes.
2. Run `npm run release` - This will prompt for a new version number, update `package.json`, generate a tagged commit, and push it, triggering the `draft-release` workflow.
3. Review the draft release at https://github.com/rvshare/hypernova/releases (you may need to wait a minute for it to show up). Once it's to your liking, go ahead and publish it. This will kick off the `publish-release` workflow, which will publish the build to Github Packages.

After releasing, you'll likely want to update the version accordingly in `rvshare-marketplace`.