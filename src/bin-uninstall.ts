import chalk = require('chalk')
import { uninstallDependencies } from 'typings-core'
import { logError, spinner } from './support/cli'

export function help () {
  return `
typings uninstall <name> [--save|--save-dev|--save-peer] [--global]

Options:
  [--save|-S]       Remove from "dependencies"
  [--save-dev|-D]   Remove from "devDependencies"
  [--save-peer|-P]  Remove from "peerDependencies"
  [--global|-G]     Remove from the global version of dependencies
    [-SG]           Remove from "globalDependencies"
    [-DG]           Remove from "globalDevDependencies"

Aliases: r, rm, remove, un
`
}

export interface Options {
  cwd: string
  save: boolean
  saveDev: boolean
  savePeer: boolean
  global: boolean
  verbose: boolean
  help: boolean
}

export function exec (args: string[], options: Options): Promise<void> {
  if (args.length === 0) {
    logError(help())
    return
  }

  return spinner(uninstallDependencies(args, options))
    .then((result) => {
      Object.keys(result.resolutions).forEach((name) => {
        args.forEach((arg) => {
          console.log(`- ${arg} ${chalk.grey(`(${name})`)}`)
        })
      })
    })
}
