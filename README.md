# l10n-demo

This package demonstrates the usage of the @lxg/l10n library in a web component. Check out the code, it should be pretty self-explainatory. Also have a look at the documentation of the @lxg/l10n library to understand how it works.

## Run locally

Running the code is pretty straightforward:

```
npm i @lxg/l10n-demo
npm run dev
```

This will give you a web server which provides the demo page with the example. Feel free to play with the `./src/demo.js` file and update/add translations.

To update the message catalog and translation table, run the `npx l10n -ec` command.

You can add new languages in the `l10n` config in the `package.json` file.

Read more about the library and how to use it in the [`@lxg/l10n`](https://github.com/lxg/l10n) documentation.


## A note on licensing

While this work is under the ISC license for legal reasons, you can basically copy and paste it, no attribution needed. This is boilerplate code and should be treated as such.
