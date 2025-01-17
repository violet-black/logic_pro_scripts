/* Mix MIDI CC from two sources and reroute them to a plugin param.

v.1
Updates: https://github.com/viovar-black/logic_pro_scripts/blob/master/scripts/CCMixer.js

SRC A - first midi CC number
SRC B - second midi CC number
DEST - destination CC or param
OFFSET - offset added to the value

The mix value is obviously limited to 127.

Set NUMBER for more slots.
*/

const NUMBER = 2;

var Sources_1 = Array();
var Sources_2 = Array();
var Offsets = Array();
var Destinations = Array();

var PluginParameters = [];

for (var n = 0; n < NUMBER; n++) {
    var slot = {
        name: "Mix " + (n + 1),
        type: "text"
    }
    var src_1 = {
        name: "SRC A " + n,
        type: "lin",
        minValue: 1,
        maxValue: 127,
        numberOfSteps: 126,
        defaultValue: 1,
        p_type: "src",
        p_id: n,
        enabled: false,
        cc_value: 0
    }
    var src_2 = {
        name: "SRC B " + n,
        type: "lin",
        minValue: 1,
        maxValue: 127,
        numberOfSteps: 126,
        defaultValue: 1,
        p_type: "src",
        p_id: n,
        enabled: false,
        cc_value: 0
    };
        var offset = {
        name: "OFFSET " + n,
        type: "lin",
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127,
        defaultValue: 1,
        p_type: "offset",
        p_id: n
    };
    var dest = {
        name: "DEST " + n,
        type: "target",
        p_type: "dest",
        p_id: n,
        defaultValue: -1,  // OFF
        cc_value: 0
    };
    PluginParameters.push(slot);
    PluginParameters.push(src_1);
    PluginParameters.push(src_2);
    PluginParameters.push(offset);
    PluginParameters.push(dest);
    Sources_1.push(src_1);
    Sources_2.push(src_2);
    Offsets.push(offset);
    Destinations.push(dest);
}



PluginParameters.push(
    {
        name: "*change NUMBER for more slots",
        type: "text"
    }
)

PluginParameters.push(
    {
        name: "Thru",
        type: "checkbox",
        defaultValue: 0
    }
)


function ParameterChanged(param, value) {
    var param_obj = PluginParameters[param];
    param_obj.value = value
    if (param_obj.p_type === "dest") {
        Sources_1[param_obj.p_id].enabled = value !== -1;
        Sources_2[param_obj.p_id].enabled = value !== -1;
        if (value !== -1) {
            sendMixEvent(param_obj.p_id);
        }
    }
}

function sendMixEvent(dest_id) {
    var dest = Destinations[dest_id];
    var offset = Offsets[dest_id];
    var event = new TargetEvent();
    event.target = "DEST " + dest_id;
    event.value = Math.min(127, offset.value + dest.cc_value) / 127.0;
    event.send();
}

function HandleMIDI(event) {
    // event.trace();

    if (event instanceof ControlChange) {

        var n, src, src_b, dest;

        for (n = 0; n < Sources_1.length; n++) {
            src = Sources_1[n];
            if (src.enabled && src.value === event.number) {
                dest = Destinations[n];
                src_b = Sources_2[n];
                src.cc_value = event.value;
                dest.cc_value = Math.min(127, event.value + src_b.cc_value);
                sendMixEvent(dest.p_id);
                if (GetParameter("Thru")) {
                    event.send();
                }
            }
        }

        for (n = 0; n < Sources_2.length; n++) {
            src = Sources_2[n];
            if (src.enabled && src.value === event.number) {
                src_b = Sources_1[n];
                dest = Destinations[n];
                src.cc_value = event.value;
                dest.cc_value = Math.min(127, event.value + src_b.value);
                sendMixEvent(dest.p_id);
                if (GetParameter("Thru")) {
                    event.send();
                }
            }
        }
    } else {
        event.send();
    }
}
