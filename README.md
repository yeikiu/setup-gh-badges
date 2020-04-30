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
