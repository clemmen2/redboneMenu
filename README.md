# Redbone Alley Set Menu Web App
## Install

To install development environment run ```npm install```.

## Running

To run the program for testing run ```npm start```.

## Distributing

To get the compressed files for distribution run ```grunt dist```.

## Developing

The environment variable __DEV__ is used to help with development. If this variable is set to true, then the distributed javascript source file is not uglified (it is still concatenated). This allows for easier Stack flow traces. When you're about to distribute the application make sure to set the __DEV__ variable back to false (or anything else that is not true).
