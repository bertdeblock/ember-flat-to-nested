#!/usr/bin/env node

const fs = require('fs')
const recursive = require('recursive-readdir')
const { argv } = require('yargs')

const componentsDir = argv.dir

recursive(componentsDir, function (error, componentFiles) {
  componentFiles.forEach(flatToNestedComponent)
})

function flatToNestedComponent (componentFile) {
  if (isNestedComponent(componentFile)) {
    return
  }
  
  const [
    nestedComponentDir,
    nestedComponentExt
  ] = componentFile.split('.')
  
  const nestedComponentFile = `${nestedComponentDir}/index.${nestedComponentExt}`
  
  fs.mkdirSync(nestedComponentDir, { recursive: true })
  fs.renameSync(componentFile, nestedComponentFile)
}

function isNestedComponent (componentFile) {
  return componentFile.includes('/index.')
}