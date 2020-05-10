<img src=".ci_badges/npm-version-badge.svg" /> <img src=".ci_badges/npm-dependencies-badge.svg" /> <img src=".ci_badges/npm-devdependencies-badge.svg" />

# setup-gh-badges

> [gh-badges](https://www.npmjs.com/package/gh-badges) made simple 

## 🛠️ Add it to `devDependencies`

- `yarn add -D setup-gh-badges`

- Add this snippet to the very top of your `README.md` file:

```
    <img src=".ci_badges/npm-version-badge.svg" /> <img src=".ci_badges/npm-dependencies-badge.svg" /> <img src=".ci_badges/npm-devdependencies-badge.svg" />
```

ℹ️   Usage:

        $ npx sync-badges

## 📌 Setup as a `GitHub Action`workflow

- create `.github/workflows/sync_badges.yml`

```
    jobs:
      sync_badges:
        runs-on: ubuntu-18.04
        steps:
          - uses: actions/checkout@v2
          - uses: actions/setup-node@v1
          - run: |
              rm -rf .ci_badges
              yarn add setup-gh-badges
              npx sync-badges
              git config --local user.email "action@github.com"
              git config --local user.name "GitHub Action"
              git add .ci_badges
              git commit -m "[CI:deploy] sync_badges job"

          - uses: ad-m/github-push-action@master
            with:
              github_token: ${{ secrets.GITHUB_TOKEN }}
```

## 📌 Recommended if you don't have a CI server

- `yarn add -D husky`

- Then add the following hook to your `package.json`:
```
    "husky": {
        "hooks": {
            "pre-push": "npx sync-badges"
        }
    },
```
