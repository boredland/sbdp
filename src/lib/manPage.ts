export const getManConfig = (docs: {
    category: string,
    action: string,
    keybinding: string
}[]) => {
    const manConfigs = docs.map(({
        category,
        action,
        keybinding
    }) => {
        const splitIndex = keybinding.indexOf(' ');
        const mod = keybinding.slice(0, splitIndex)

        const result = {
            category,
            manLines: [
                ``,
                `.B ${action}:`,
                `.I ${keybinding}`
            ]
        }

        return result
    }).flat()
    return manConfigs
}

export const getManPageConfig = (manconfig: {
    category: string,
    manLines: string[]
}[]) => {
    const result: Record<string, string[]> = {}
    manconfig.forEach(
        ({ category, manLines }) => {
            if (!result[category]) return result[category] = manLines
            return result[category].push(...manLines)
        }
    )
    return result
}

export const parseManPageConfig = (config: Record<string, string[]>) => {
    const categories = Object.keys(config)
    const result = categories.map(category => {
        return [
            "",
            `.SS ${category}`,
            "",
            ...config[category]
        ]
    }).flat()
    return result.join('\n')
}