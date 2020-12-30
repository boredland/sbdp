#!/usr/bin/env node
import { getDocsList } from "./lib/keybinding"
import { getManConfig, getManPageConfig, parseManPageConfig } from "./lib/manPage"
import readFile from "./lib/readFile"

const rootPath = process.argv[2] || '/etc/sway/config'
const style = process.argv[3]

const main = async () => {
    const lines = await readFile(rootPath)
    const docs = getDocsList(lines)
    if (style === "man") {
        const manContent = getManConfig(docs)
        const manPageConfig = getManPageConfig(manContent)
        return console.log(parseManPageConfig(manPageConfig))
    }
    return console.log(docs)
}

(async () => {
    await main();
})();