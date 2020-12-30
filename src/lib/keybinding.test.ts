import { findKeybindingForLine, getDocsConfig, getDocsList } from './keybinding';

describe('keybinding extraction', () => {
    it('should extract idependent from subsequent params', () => {
        const lines = [
            '## Launch // Exit Menu ##',
            'bindsym $mod+Shift+e exec $shutdown',
        ];
        expect(findKeybindingForLine(lines[0], lines)).toBe('$mod+Shift+e');
    });

    it('should extract xf keys', () => {
        const lines = [
            '## Action // Increase volume of Master ##',
            'bindsym XF86AudioRaiseVolume $lala',
        ];
        expect(findKeybindingForLine(lines[0], lines)).toBe('XF86AudioRaiseVolume');
    });

});

describe('docs config generator', () => {
    it('should generate docs', () => {
        const lines = [
            '## Action // Increase volume of Master ##',
            'bindsym XF86AudioRaiseVolume $lala',
        ];
        const [result] = getDocsConfig(lines);
        expect(result.action).toBe('Increase volume of Master');
        expect(result.category).toBe('Action');
        expect(result.keybinding).toBe('XF86AudioRaiseVolume');
    });
});