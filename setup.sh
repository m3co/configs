#!/bin/bash

echo "Creating symbolic links for config files.."

config_directory=$(command dirname -- "${0}")
script_run_directory=$(command pwd)

paths=(".eslintrc"
       ".eslintignore"
       ".jsdoc.json"
       ".babelrc"
       ".gitignore"
       "gulpfile.js"
      )

for path in "${paths[@]}"; do
  ln -s "${config_directory}/${path}" "${script_run_directory}"
done


echo "Installing dependencies.."

npm init -y
npm i -D babel-preset-es2015 gulp gulp-babel gulp-connect gulp-csslint gulp-eslint gulp-file-include gulp-htmlhint gulp-if gulp-jsdoc3 yargs


echo 'Done..'
