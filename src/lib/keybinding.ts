import translations from "./translations"

/**
 * looks into the next line for a keybinding
 * @param line line which we search the keybinding for
 * @param docs all lines to search in
 */
export const findKeybindingForLine = (line: string, lines: string[]) => {
    const lineIndex = lines.indexOf(line)
    return lines[lineIndex + 1].split(" ")[1]
}

/**
 * get a record of all "set $foo bar" combinations
 * @param lines to search in
 */
export const getSymbolRecord = (lines: string[]) => {
    const setRegex = /^set\s+(?<variable>\$.+?)\s(?<value>.+)?$/ig

    const setMap: Record<string, string> = {}

    lines.filter(el => {
        return el.match(setRegex)


    }).map(el => {
        const cap = setRegex.exec(el)
        if (cap && cap?.groups?.variable) setMap[cap.groups.variable] = cap.groups.value
    })

    return setMap;
}

/**
 * get category, action and kebinding from all lines that contain the doc pattern
 * @param lines to search in
 */
export const getDocsConfig = (lines: string[]) => {
    const docsLineRegex = /^##\s+(?<category>.+?)\s+\/\/\s+(?<action>.+?)\s+(\/\/\s+(?<keybinding>.+?)\s+)*##$/ig

    const docsLines = lines.filter(el => {
        return docsLineRegex.exec(el)
    })

    const docsConfig = docsLines.map(line => {
        const [category, action, keybinding] = line.replace(/##/g, '').split("//").map(el => el.trim())

        return {
            category, action, keybinding: keybinding ? keybinding : findKeybindingForLine(line, lines)
        }
    })

    return docsConfig
}

/**
 * generate a list of docs entries
 * @param lines to generate the docs entries from
 */
export const getDocsList = (lines: string[]) => {
    const docsConfig = getDocsConfig(lines)
    const setMap = getSymbolRecord(lines);

    const sanitizedConfig = docsConfig.map(el => {
        const replaceFromMap = (keybinding: string) => {
            const elements = keybinding.split("+").map(el => el.trim()).map(el => {
                const key = setMap[el] || el
                return translations[key] || key
            }).join(" + ")
            return elements
        }
        return { ...el, keybinding: replaceFromMap(el.keybinding) }
    })

    return sanitizedConfig.sort((a, b) => {
        if (a.category < b.category) { return -1; }
        return 1;
    });
}