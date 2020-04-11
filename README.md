# R Markdown Snippets

This extension provides a few snippets and key bindings for common tasks in `.Rmd` documents, such as inserting code chunks

## Features

### Keyboard Shortcuts:

`Ctrl+Alt+I`(`⌘⌥I`) to insert a code chunk as you would do in RStudio.

### Snippets


#### Cross-referencing

`\ref`: general cross-reference; inserts `\@ref($1)`
`\refsec`: section cross-reference; inserts `Section \@ref($1)`
`\reffig`: figure cross-reference; inserts `Figure \@ref(fig:$1)`
`\reftab`: table cross-reference; inserts `Table \@ref(tab:$1)`

#### Chunks

`\code`: insert a code chunk
`\fig`: insert a chunk using `knitr::include_graphics()` to include an image; hit tabs to conviniently fill out label, `fig.cap` and `out.width`.


<!-- ## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z. -->
