const fs = require('fs')
const recursive = require('recursive-readdir')
const { argv } = require('yargs')

const COMPONENTS_DIR = argv.dir

fs.mkdirSync(COMPONENTS_DIR, { recursive: true })

recursive(COMPONENTS_DIR, function (error, components) {
  components.forEach(componentFile => {
    const [nestedComponentDir, nestedComponentExt] = componentFile.split('.')

    fs.mkdirSync(nestedComponentDir, { recursive: true })
    fs.renameSync(componentFile, `${nestedComponentDir}/index.${nestedComponentExt}`)
  })
})