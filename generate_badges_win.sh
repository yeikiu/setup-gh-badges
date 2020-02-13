#!/bin/bash

export VERSION="$(cat package.json | node_modules/node-jq/bin/jq.exe -r '.version')";
badge version "$VERSION" :brightgreen .svg > .ci_badges/npm-version-badge.svg

export NDEPENDENCIES="$(cat package.json | node_modules/node-jq/bin/jq.exe -r '.dependencies | length')";
badge dependencies "$NDEPENDENCIES" :green .svg > .ci_badges/npm-dependencies-badge.svg

export NDEVDEPENDENCIES="$(cat package.json | node_modules/node-jq/bin/jq.exe -r '.devDependencies | length')";
badge devDependencies "$NDEVDEPENDENCIES" :orange .svg > .ci_badges/npm-devdependencies-badge.svg

export OUTDATED_OUTPUT="$(yarn outdated --json --long)";
if [ -z "$OUTDATED_OUTPUT" ]; then
  export OUTDATED_OUTPUT='[]';
fi
export NUM_OUTDATED="$(echo "$OUTDATED_OUTPUT" | node_modules/node-jq/bin/jq.exe -r '.' | format-yarn-outdated --format json | node_modules/node-jq/bin/jq.exe -r '[.major[],.minor[],.patch[]] | length')";
export OUTDATED_COLOR=":brightgreen";
if [ "$NUM_OUTDATED" -gt 1 ]; then
  export OUTDATED_COLOR=":yellow";
fi
if [ "$NUM_OUTDATED" -gt 10 ]; then
  export OUTDATED_COLOR=":red";
fi
badge outdated "$NUM_OUTDATED" "$OUTDATED_COLOR" .svg > .ci_badges/npm-outdated-dependencies-badge.svg

export FIRST_LINE="$(sed -n 1p README.md)";
export BADGES_HTML="<img src=\".ci_badges/npm-version-badge.svg\" /> <img src=\".ci_badges/npm-dependencies-badge.svg\" /> <img src=\".ci_badges/npm-devdependencies-badge.svg\" /> <img src=\".ci_badges/npm-outdated-dependencies-badge.svg\" />\n";

if [[ "$BADGES_HTML" != *"$FIRST_LINE"* ]]; then
  sed -i "1i $BADGES_HTML" README.md
fi
