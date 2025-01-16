// Remap MIDI CC to plugin parameters or other CC.
//
// Set NUMBER for more slots.

const NUMBER = 6;

var Sources = new Array();
var Destinations = new Map();

var PluginParameters = [
	{
        name: "Channel",
        type: "lin",
        defaultValue: 1,
        minValue: 1,
        maxValue: 16,
        numberOfSteps: 15
	},
	{
        name: "Thru",
        type: "checkbox",
        defaultValue: 0
	}
];

for (var n = 0; n < NUMBER; n++) {
    var src =         {
        name: "CC_" + n,
        type: "lin",
        minValue: 1,
        maxValue: 127,
        numberOfSteps: 126,
        defaultValue: 1,
        p_type: "src",
        p_id: n,
        enabled: true
    }
    var dest =         {
            name: "CC_" + n + "_DEST",
            type: "target",
            p_type: "dest",
            p_id: n,
            defaultValue: -1  // OFF
	    }
    PluginParameters.push(src);
    Sources.push(src);
    PluginParameters.push(dest);
    Destinations.set(src.name, dest);
}

PluginParameters.push(
    {
    	    name: "*change NUMBER for more slots",
    	    type: "text"
    }
)

function ParameterChanged(param, value) {
  var param_obj = PluginParameters[param];
  param_obj.value = value
  if (param_obj.p_type == "dest") {
  	if (value == -1) {
  		Sources[param_obj.p_id].enabled = false;
  	} else {
  	    Sources[param_obj.p_id].enabled = true;
  	}
  }
}

function HandleMIDI(event) {
	if (event instanceof ControlChange) {
	    if (GetParameter("Channel") == event.channel) {
	    for (var n = 0; n < Sources.length; n++) {
	    	    var src = Sources[n];
	        if (src.enabled && src.value == event.number) {
	            	var new_event = new TargetEvent();
	            	new_event.target = src.name + "_DEST";
		        	new_event.value = event.value / 127.0;
		        	new_event.send();
	        }
	    }
	    if (GetParameter("Thru")) {  // MIDI_THRU
	        event.send();
	    }
	    }
	} else {
	    event.send();
	}
}
