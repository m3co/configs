#!/bin/bash

echo 'Creating symbolic links for config files..'

paths=('.eslintrc'
       '.eslintignore'
       '.jsdoc.json'
      )

for path in "${paths[@]}"; do
  ln -s "$path" ../
done

echo 'Done..'