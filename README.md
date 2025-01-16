# Logic Pro Scripts

This is a collection of my Logic Pro [scripter](https://support.apple.com/en-gb/guide/logicpro/lgce728c68f6/mac)
plugin scripts for working with MIDI.

## Installation

Logic Pro keeps binary data in presets, so the best way to install these scripts is to open the scripter
plugin on any preset, click "open in script editor" button and paste the script there, then click "run script" button,
and then "Save As" in the plugin menu to save it to your preset folder.

## Scripts

### MidiCCToPluginParam

[MidiCCToPluginParam](/scripts/MidiCCToPluginParam.js) allows you to remap a midi CC message to a plugin parameter.
You can specify more than one destination for the same CC. To increase the maximum number of slots open the script and
change the `NUMBER` value.

### MidiChModifier

[MidiChModifier](/scripts/MidiChModifier.js) allows you to re-route midi CC messages dynamically from one MIDI channel
to another. Use a CC#0 (default) to change the channel on the fly.

This script is useful when you have a hardware MIDI controller for a multi-layered synth, and you want an easy way
to switch between layers. Now you can map some buttons to CC#0 values 
(using something like [Novation Components](https://novationmusic.com/components) for example) and use the buttons to
switch between layers quickly.

### MoogLP2Controls

[MoogLP2Controls](/scripts/MoogLP2Controls.js) is a controller for [Moog Little Phatty State II](https://www.moogmusic.com/products/little-phatty-stage-ii)
synth. It doesn't implement all the params, but only those hidden in the menu (filter type, tuning scales, arp params, etc).
It can be useful to escape some deep menu diving on this synth.
