import { getManConfig, getManPageConfig } from "./manPage";

describe('generates man config from docs array', () => {
    const docs = [{
        category: 'Setting',
        action: 'Split windows horizontally',
        keybinding: 'Super + b'
    },
    {
        category: 'Navigation',
        action: 'Swap focus to the parent window',
        keybinding: 'Super + a'
    },
    {
        category: 'Setting',
        action: 'Split windows vertically',
        keybinding: 'Super + v'
    }]

    it('should return a list of valid manpage strings', () => {

        const manLines = getManConfig(docs)

        expect(manLines[0].category).toBe(docs[0].category)
        expect(manLines[1].manLines[1]).toBe(`${docs[1].action}:`)
        expect(manLines[2].manLines[4]).toContain(`${docs[2].keybinding.split(" + ")[1]}`)
    });
});

describe('generates man page from man config array', () => {
    const manConfigs = [{
        category: 'Navigation',
        manLines: ['Swap focus to the parent window:', '.I Super', '+', '.B a']
    },
    {
        category: 'Setting',
        manLines: ['Split windows horizontally:', '.I Super', '+', '.B b']
    },
    {
        category: 'Navigation',
        manLines: [
            'Move focussed window:',
            '.I Super',
            '+',
            '.B Shift ',
            '+',
            '.B  ↑ ↓ ← →'
        ]
    }]

    it('should return a list of valid manpage strings', () => {

        const manLines = getManPageConfig(manConfigs)

        expect(manLines["Navigation"]).toHaveLength(10)
        expect(manLines["Setting"]).toHaveLength(4)
    });
});