# Change Log

All notable changes to the "rmarkdown" extension will be documented in this file.

## [0.0.1] - 2020-04-12

- Initial release

## [0.0.2] - 2020-04-12

### Added

- aliases for `\ref`, `\refsec`, `\reffig`, `reftab`, whichs are `\@ref`, `\@sec`, `\@fig`, `\@tab`, respectively
- `Knit` command with keyboard shortcut `Cmd+Shift+K` or `Ctrl+Shift+K`

## [0.0.3] - 2020-04-13

### Added

- adapted some functions from [microsoft/vscode](https://github.com/microsoft/vscode/tree/master/extensions/markdown-language-features) and [yzhang-gh/vscode-markdown](https://github.com/yzhang-gh/vscode-markdown), especially syntax highlighting and key bindings for bold/itatic toggling.

## [0.0.4] - 2020-04-13

### Added

- added a Python script to convert markdown's `tmLanguage.json` to rmarkdown's
  - R code chunks (with curly braces after ` ``` `) are now highlighted properly

## [0.0.5] - 2020-04-14

### Added

- Blogdown New Post Helper (command palette `New Post`)

## [0.0.6] - 2020-04-14

### Added

- 'Blogdown: Serve Site' command

### Changed

- Slugify function preserves CJK characters