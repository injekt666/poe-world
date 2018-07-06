#!/usr/bin/env bash

version_type=$1

if ! [[ "$version_type" =~ ^(major|minor|patch)$ ]]; then
  echo "You must specify the type of the next version : [ major | minor | patch ]"
  exit 1
fi

echo "Preparing a $version_type release..."

echo "Bumping the package version 📦"
new_version=`npm version $version_type --no-git-tag-version`
new_version=${new_version:1}

echo "Drafting a new changelog for $new_version 📝"
changelog_filename=${new_version//./_}.md
cp ./changelogs/_template.md ./changelogs/$changelog_filename
sed -i '' -e "s/{{version}}/$new_version/g" ./changelogs/$changelog_filename
git add ./changelogs/$changelog_filename

echo "Let's go ! 🚀"
