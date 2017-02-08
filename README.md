# Configs
Hold the templates for .eslint .jsdocs and so on

This repo is not intended to be posted through npm, bower or similar. It's intended to use as a resource for diferent repos at Clover Group, +3 Constructora SAS and related places.

## Setup

1. In existing project run: `git submodule add git@github.com:m3co/configs.git resources/configs`
2. Delete config files from existing project, which you would replace
3. In existing project folder run `./resources/configs/setup.sh`
4. Commit changes in existing project

## Style

Here's a list of tags that should be in comment's commit:

- __\[TEST\]__ commit's description related to test
- __\[DOC\]__ commit's description related to docs
- __\[DEMO\]__ commit's description related to demos
- __\[TRUNK\]__ commit's description related to trunk
- *NO TAG* commit's description related to src

Also, it's very important to [write commits according to this article](http://chris.beams.io/posts/git-commit/).
