/* Switch MIDI channel dynamically with CC

v.1
Updates: https://github.com/viovar-black/logic_pro_scripts/blob/master/scripts/MidiChannelSwitcher.js

Ch. Switch CC - CC message to switch the MIDI channel, CC#0 (bank) by default
Channel - channel to re-route CC messages to
All - re-route all events including notes, aftertouch, etc.
*/

var PluginParameters = [
    {
        name: "Switch CC",
        type: "lin",
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127,
        defaultValue: 0
    },
    {
        name: "Channel",
        type: "lin",
        minValue: 1,
        maxValue: 16,
        numberOfSteps: 15,
        defaultValue: 0
    }
];

function HandleMIDI(event) {
    if (event instanceof ControlChange) {
        if (event.number === GetParameter("Switch CC")) {
            SetParameter("Channel", Math.min(event.value + 1, 16))
        } else {
            event.channel = GetParameter("Channel");
            event.send();
        }
    } else {
        event.send();
    }
}
