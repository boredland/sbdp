# SwayBindsymDocsParser

SwayBindsymDocsParser (sbdp) is a small Typescript for parsing keybinding hints in a compact form suitable for tiling window environments. It is intended for use with the sway window manager but it's also able to display keybindings from any suitably formatted config file.

The program functions by scanning and parsing comments in a specific format (described directly below), then displaying them in a one-layer categorized list view. The program stores the state of which sections are expanded, allowing for use on screens with limited resolution.

## Format

sbdp utilizes the concept of a category to group items, action to denote the human description, and keybinding to define the specific keys corresponding to the action. The format is designed to be both easily parsable by program but also readable in it's native form by people in two easy forms:

- explicitly write down docs for a certain command. $-variables will be replaces by their values.

```
## <category> // <action> // <keybinding> ##
```

- implicitly write down docs for a certain command followed by said command.
```
## <category> // <action> ##
bindsym keys cmd
```

Text within `<category>`, `<action>`, and `<keybinding>` must not contain the sequences `##`, `//`, or line feeds.

Examples:

```
...
## Navigate // Relative Window // <Super> ↑ ↓ ← → ##
bindsym $mod+Left focus left
...
```

```
...
## Launch // Application ## 
bindsym $mod+space exec $i3-wm.program.launcher.app
```

Any line that doesn't contain the structure listed here will be ignored.

### includes

sbdp follows includes (relative, absolute, with path substitution and including globs)

```
# global variables
include /etc/sway/definitions

# user config
include ~/.config/sway/config.d/*

# local extension
include extension
```

### parameters

by default it will output all entries as an array. you can generate a list of man-compatible items using it like this:

```
sbdp ~/.config/sway/config man
```

# Credits

Concept is taken and extended from [regolith linux 'remontoire'](https://github.com/regolith-linux/remontoire#model).