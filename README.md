PoC for checking for app updates

Try it out by running:

```zsh
yarn install
```

then installing `serve` globally if not installed yet by running 

```zsh
yarn add serve -g
```

We need to build the app for production by running 
```zsh
yarn build
```

and then serve it by running 
```
serve -s build
```

It should open on `localhost:3000`

To see the version change and update/show it on the front page we have to
1. Change the `version` in `package.json`
2. Shut down the server 
3. Run `yarn build && serve -s build`
4. Remember not to refresh (so that the old app is running still) the page and let it find the update

What is required for this to work apart from the hook/js implementation are two things:
1. A metatag added to  index.html
```html  
<meta name="app-version" content="%REACT_APP_VERSION%" />
```
2. An env variable `REACT_APP_VERSION=$npm_package_version`

The metatag can be added to the HTML in numerous ways, one of them being HTMLWebpackPlugin which could inject it during build time.
