# ABWorld Website
The central source for the official ABWorld website!

## Cloning
When cloning the site to work on it locally, please ensure you run `git submodule update --init --recursive` to make sure any sub-modules, such as the icons, which are pulled from https://github.com/ABCo-Src/Icons get put on your system too and the pages load correctly.

## Docs
The documentation *engine* is found in `docs`. However, the actual documentation itself that gets placed in there on the web-server automatically can be found in a `docs` folder on each individual product's repo. 

So if you want to modify documentation for ABSave, go onto the ABSave repo and modify the `docs` folder within there.