#!/usr/bin/env bash

echo "Switching to the release branch..."
current_branch=`git rev-parse --abbrev-ref HEAD`
git checkout release
git pull

echo "Building..."
npm run build-electron

echo "Releasing to GitHub..."
version=`git describe --tags --abbrev=0`
escaped_version=${version//./_}
changelog_file=./changelogs/$escaped_version.md
attachment=./electron-out/make/squirrel.windows/x64/PowWorld-$version\ Setup.exe
hub release create --file=$changelog_file --attach=$attachment --browse $version

echo "Switching back to the original branch..."
git checkout $current_branch

echo "Done 🚀"
