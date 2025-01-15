// Switch channel dynamically with MIDI CC
//
// Ch. Switch CC - CC message to switch the MIDI channel, CC#0 by default
// Channel - channel to re-route other CC messages to
//
// This function can be used to send CC to different synth layers
// when you are controlling a multi-layered synth

var PluginParameters = [
    {
        name: "Ch. Switch CC",
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
		if (event.number == GetParameter("Ch. Switch CC")) {
			SetParameter("Channel", Math.min(event.value + 1, 16))
		} else {
			event.channel = GetParameter("Channel");
			event.send();
		}
	} else {
	    event.send();
	}
}
