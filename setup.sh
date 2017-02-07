#!/bin/bash

echo "Creating symbolic links for config files.."

config_directory=$(command dirname -- "${0}")
script_run_directory=$(command pwd)

paths=(".eslintrc"
       ".eslintignore"
       ".jsdoc.json"
       ".babelrc"
       "gulpfile.js"
      )

for path in "${paths[@]}"; do
  ln -s "${config_directory}/${path}" "${script_run_directory}"
done

echo "Done.." 