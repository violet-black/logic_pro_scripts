/*
Moog LP Stage II controls

v.1
Updates: https://github.com/viovar-black/logic_pro_scripts/blob/master/scripts/MoogLP2Controls.js

Allows you to control various parameters hidden in the menus.
Replace `TUNINGS` values with different names if needed.
*/

const TUNINGS = [
    "STANDARD", "HARMONIC", "PYTHAGOREAN", "1/3 MEANTONE", "1/4 MEANTONE",
    "5-LIMIT", "WERCK VI", "7EDO", "CENTAUR", "9EDO", "10EDO", "11EDO",
    "ZETA", "13EDO", "LYRICAL", "15", "16", "17", "18", "19EDO",
    "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
    "31", "GLOBAL"
]

var PluginParameters = [

    // pitch

    {
        name: "Tuning",
        type: "menu",
        valueStrings: TUNINGS,
        cc: 113,
        ccMod: 1
    },
    {
        name: "Note priority",
        type: "menu",
        valueStrings: ["GLOBAL", "LOW", "HIGH", "LAST"],
        cc: 111,
        ccMod: 32
    },
    {
        name: "PW up",
        type: "menu",
        valueStrings: ["0", "+2", "+3", "+4", "+5", "+7", "+12"],
        cc: 107,
        ccMod: 16
    },
    {
        name: "PW down",
        type: "menu",
        valueStrings: ["0", "-2", "-3", "-4", "-5", "-7", "-12"],
        cc: 108,
        ccMod: 16
    },
    {
        name: "Glide on",
        type: "checkbox",
        defaultValue: 0,
        cc: 65,
        ccMod: 64
    },
    {
        name: "Glide retrig",
        type: "menu",
        valueStrings: ["ON", "LEGATO"],
        cc: 94,
        ccMod: 64
    },


    // amp

    {
        name: "AMP vel",
        type: "lin",
        numberOfSteps: 15,
        defaultValue: 0,
        minValue: 0,
        maxValue: 15,
        cc: 92,
        ccMod: 8
    },


    // filter

    {
        name: "FLT vel",
        type: "lin",
        numberOfSteps: 16,
        defaultValue: 0,
        minValue: -8,
        maxValue: 8,
        cc: 110,
        ccMod: 7,
        ccOffset: 62
    },
    {
        name: "FLT slope",
        type: "menu",
        valueStrings: ["6db", "12db", "18db", "24db"],
        cc: 109,
        ccMod: 32
    },

    // env

    {
        name: "ENV release",
        type: "checkbox",
        defaultValue: 1,
        cc: 88,
        ccMod: 64
    },
    {
        name: "ENV retrig",
        type: "menu",
        valueStrings: ["ON", "OFF", "RESET"],
        cc: 112,
        ccMod: 43
    },

    // modulation

    {
        name: "MOD source",
        type: "menu",
        valueStrings: ["TRI", "SQUARE", "SAW", "RAMP", "SRC5", "SRC6"],
        cc: 68,
        ccMod: 16
    },
    {
        name: "MOD 5th source",
        type: "menu",
        valueStrings: ["FLT ENV", "S&H"],
        cc: 104,
        ccMod: 64
    },
    {
        name: "MOD 6th source",
        type: "menu",
        valueStrings: ["OSC2", "NOISE"],
        cc: 105,
        ccMod: 64
    },
    {
        name: "MOD 1st dest",
        type: "menu",
        valueStrings: ["PITCH", "FLT", "WAVE", "OSC2"],
        cc: 69,
        ccMod: 16
    },
    {
        name: "MOD 2nd dest",
        type: "menu",
        valueStrings: ["OFF", "PITCH", "FLT", "WAVE", "OSC2"],
        cc: 106,
        ccMod: 25
    },

    // LFO

    {
        name: "LFO key trig",
        type: "menu",
        valueStrings: ["OFF", "ON", "AUTO"],
        cc: 93,
        ccMod: 43
    },
    {
        name: "LFO clock (g)",
        type: "menu",
        valueStrings: ["INT", "MIDI"],
        cc: 102,
        ccMod: 65
    },
    {
        name: "LFO rate (g)",
        type: "menu",
        valueStrings: [
            "1/32T", "1/32", "1/16T", "1/16", "1/8T", "1/16DOT", "1/8",
            "1/4T", "1/8DOT", "1/4", "1/2T", "1/4DOT", "1/2", "WH T", "1/2DOT",
            "WH", "WH+1/4", "WH+1/2", "WH+1/2DOT", "2WH", "3WH", "4WH"
        ],
        maxValue: 127,
        cc: 103,
        ccMod: 6
    },

    // ARP

    {
        name: "ARP on",
        type: "checkbox",
        defaultValue: 1,
        cc: 90,
        ccMod: 64
    },
    {
        name: "ARP latch",
        type: "checkbox",
        defaultValue: 0,
        cc: 91,
        ccMod: 64
    },
    {
        name: "ARP clock",
        type: "menu",
        valueStrings: ["INT", "MIDI", "GLOBAL"],
        cc: 114,
        ccMod: 43
    },
    {
        name: "ARP rate",
        type: "menu",
        valueStrings: [
            "1/32T", "1/32", "1/16T", "1/16", "1/8T", "1/16DOT", "1/8",
            "1/4T", "1/8DOT", "1/4", "1/2T", "1/4DOT", "1/2", "WH T", "1/2DOT",
            "WH", "WH+1/4", "WH+1/2", "WH+1/2DOT", "2WH", "3WH", "4WH", "GLOBAL"
        ],
        maxValue: 127,
        cc: 115,
        ccMod: 6
    },
    {
        name: "ARP gate",
        type: "menu",
        valueStrings: ["50%", "100%", ">100%", "GLOBAL"],
        cc: 95,
        ccMod: 32
    },
    {
        name: "ARP octaves",
        type: "menu",
        valueStrings: ["-3", "-2", "-1", "0", "+1", "+2", "+3"],
        cc: 116,
        ccMod: 19
    },
    {
        name: "ARP pattern",
        type: "menu",
        valueStrings: ["UP", "DOWN", "ORDER"],
        cc: 117,
        ccMod: 43
    },
    {
        name: "ARP mode",
        type: "menu",
        valueStrings: ["LOOP", "B/F", "ONCE"],
        cc: 118,
        ccMod: 43
    }

];

// globals

var _currentCC;
var _parameterMapCC = new Map();
for (const param of PluginParameters) {
    _parameterMapCC.set(param.cc, param);
}

// functions

function ParameterChanged(param, value) {
    param = PluginParameters[param];
    if (_currentCC && param.cc === _currentCC.number && value === _currentCC.value) {
        // do not send back the same event
        return;
    }
    var cc = new ControlChange;
    if (param.ccMod) {
        value = value * param.ccMod;
    }
    if (param.ccOffset) {
        value = param.ccOffset + value;
    }
    value = Math.min(value, 127);
    cc.number = param.cc;
    cc.value = value;
    cc.send();
    // cc.trace();
}

function HandleMIDI(event) {
    // event.trace();
    if (event instanceof ControlChange) {
        _currentCC = event;
        var param = _parameterMapCC.get(event.number);
        if (param) {
            var value = event.value;
            if (param.ccMod) {
                value = Math.ceil(value / param.ccMod);
            }
            SetParameter(param.name, value);
        }
    }
    event.send();
}