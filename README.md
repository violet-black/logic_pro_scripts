# Logic Pro Scripts

This is a collection of my Logic Pro [scripter](https://support.apple.com/en-gb/guide/logicpro/lgce728c68f6/mac)
plugin scripts for working with MIDI.

## Installation

Logic Pro keeps binary data in presets, so the best way to install these scripts is to open the scripter
plugin on any preset, click "open in script editor" button and paste the script there, then click "run script" button,
and then "Save As" in the plugin menu to save it to your preset folder.

## Scripts

### CCMixer

[CCMixer](/scripts/CCMixer.js) is a mixer which merges two incoming CCs into one and sends it to a plugin parameter or CC.
This script may be useful when you have a plugin which doesn't have modulations, yet you
want to use both a knob to adjust a value and the modwheel to modulate the same value.

To increase the maximum number of mixing slots open the script and change `NUMBER` value.

### CCToPluginParam

[CCToPluginParam](/scripts/CCToPluginParam.js) allows you to remap a midi CC message to a plugin parameter.
You can specify more than one destination for the same CC.

To increase the maximum number of slots open the script and change `NUMBER` value.

### MidiChannelSwitcher

[MidiChannelSwitcher](/scripts/MidiChannelSwitcher.js) allows you to re-route midi CC messages
dynamically from one MIDI channel to another. Use CC#0 (by default) to change the channel. The channel switch message
can be received from any channel.

This script is useful when you have a hardware MIDI controller for a multi-layered synth, and you want an easy way
to switch between layers. Now you can map some buttons to CC#0 values 
(using something like [Novation Components](https://novationmusic.com/components) for example) and use the buttons to
switch between layers quickly.

### MoogLP2Controls

[MoogLP2Controls](/scripts/MoogLP2Controls.js) is a controller for [Moog Little Phatty State II](https://www.moogmusic.com/products/little-phatty-stage-ii)
synth. It doesn't implement all the params, but only those hidden in the menu (filter type, tuning scales, arp params, etc).
It can be useful to escape some deep menu diving on this synth.

To change tuning names to your own tunings open the script and modify `TUNINGS` list.

## Examples

If you happen to have a hardware controller with assignable CC switches,
like [Launch Control](https://novationmusic.com/products/launch-control-xl)
or similar, you can create a multi-layered control map for plugins using these scripts.

- First, map some of the switches to CC#0 (bank switch) with values from 0 to 15 (MIDI channels).
- In your plugin track insert a [midi channel switcher](#MidiChannelSwitcher) MIDI scripter plugin
- After this plugin insert one or more [CC to plugin param](#CCToPluginParam) instances
- For each instance you can set an unique MIDI channel and a map of CC to plugin values 

Now you can switch channels from your device using the switches, and the CC knobs will be controlling different sets
of params according to the state of the switches. The only limitation is that you can't obviously control multiple
layers at once.
