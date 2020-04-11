# R Markdown for VS Code

This extension provides a few snippets and key bindings for common tasks in `.Rmd` documents, such as inserting code chunks and including images using `knitr::include_graphics()`[^include_graphics].

[^include_graphics]: In R Markdown, `knitr::include_graphics()` is [preferred over](http://zevross.com/blog/2017/06/19/tips-and-tricks-for-working-with-images-and-figures-in-r-markdown-documents/#more-functionality-from-include_graphics) Markdown's native `![alt](uri)` syntax

## Features

### Keyboard Shortcuts:

Key bindings are mostly consistent with RStudio.

|    Description    |   Windows    |      Mac       |                                       Note                                       |
| :---------------: | :----------: | :------------: | :------------------------------------------------------------------------------: |
| Insert Code Chunk | `Ctrl+Alt+I` | `Cmd+Option+I` | The first tab stop allows for easy configuration, the second for the actual code |

### Snippets


#### Cross-referencing

`\ref`: general cross-reference; inserts `\@ref($1)`    
`\refsec`: section cross-reference; inserts `Section \@ref($1)`    
`\reffig`: figure cross-reference; inserts `Figure \@ref(fig:$1)`    
`\reftab`: table cross-reference; inserts `Table \@ref(tab:$1)`    

#### Chunks

`\code`: insert a code chunk   
`\fig`: insert a chunk using `knitr::include_graphics()` to include an image; hit tabs to conviniently fill out label, `fig.cap` and `out.width`.

## TODO

- general
  - use some `.md` -specific services
  - Keyboard shortcut for "Knit"
  - insert tables (with labels and captions)
- bookdown support
- blogdown support
  - new post snippet (c.f. psql)


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
