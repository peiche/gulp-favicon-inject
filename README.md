# Gulp Favicon Inject
## Sample Gulp project that generates a set of favicon files and injects them into the <head> of a page.

This repo is not meant to be used directly, but rather as an example for how to set up favicon markup injection into the project of your choice.

### Set up

After cloning or downloading the project, run this command:

```
$ npm install
```

This will install the Gulp plugins. After that, it's pretty simple. Run this command to generate the favicon graphics and markup:

```
$ gulp
```

### Task Breakdown

There are three tasks defined in `gulpfile.js`.

#### First Task: `clean`

This cleans the `dist` directory of any previously generated favicon files.

#### Second Task: `favicon-generate`

This does the real work, taking the single 512x512 `favicon.png` and generating all the graphics files, configuration files, and markup. The markup outputs to a separate file, `favicon.html`.

#### Third Task: `inject-favicon`

This takes the contents of `favicon.html` and injects it into `index.html`. It looks for this text for where to inject:

```
<!-- inject:head:html -->
<!-- endinject -->
```

#### Fourth Task: `clean-favicon`

This just deletes the generated file, `favicon.html`. After the markup has been injected into the real HTML file, it's not needed anymore.

#### Default Task

The default task is set up to execute the entire task chain in order, making it extremely simple to generate new favicon assets and markup.

### Configuration

There is a single `config` object defined at the top of `gulpfile.js`. Use it to personalize the configuration files generated in `favicon-generate`.

- `appName`: The name of your web app.
- `appDescription`: The description of your web app.
- `url`: Your web app's URL.
- `version`: The version of your web app.
- `developerName`: The name of the developer, be it a person or organization.
- `developerURL`: The developer's URL.
- `background`: The hex code of the color of your choice. Used by:
  - Apple and Yandex for the favicon's background color.
  - Microsoft for the tile background in Windows 8 and 10.
  - Google Chrome for Android tab color.
- `path`: The path where all the generated assets are located.

### Thanks

[Favicons.io](http://favicons.io/) - Module for Node.js for generating favicons and their associated files.  
[Launcher Icon Generator](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html) - Icon generator which allows you to quickly and easily generate icons from existing source images, clipart, or text.
