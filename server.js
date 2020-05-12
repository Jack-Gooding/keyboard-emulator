const robot = require("robotjs");
      robot.setKeyboardDelay(1);
      
const mqtt = require('mqtt'); //MQTT protocols

const client  = mqtt.connect('mqtt://jack-gooding.com', {
    port: 1883,
    clientId: "Desk PC",
});

let vol_up_count = 0;
let vol_down_count = 0;

let vol_up_timeout;
let vol_down_timeout;

client.on('connect', () => {
  client.subscribe('keyboard/key');
});


client.on('message', async (topic, msg) => {
  message = msg.toString('utf8');

  if (topic === 'keyboard/key') {
    switch (message) {
      case "mute":
        robot.keyTap("audio_mute");
        break;
      case "vol_down":
      if (vol_down_count < 5) {
        vol_down_count++;
      }
      for (let i = 0; i < vol_down_count; i++) {
        robot.keyTap("audio_vol_down");
      }
      clearTimeout(vol_down_timeout);
      vol_down_timeout = setTimeout(async function() {
          vol_down_count = 0;
      },500);
        break;
      case "vol_up":
      if (vol_up_count < 5) {
        vol_up_count++;
      }
        for (let i = 0; i < vol_up_count; i++) {
          robot.keyTap("audio_vol_up");
        }
        clearTimeout(vol_up_timeout);
        vol_up_timeout = setTimeout(async function() {
            vol_up_count = 0;
        },500);

        break;
      case "play":
        robot.keyTap("audio_play");
        break;
      case "pause":
        robot.keyTap("audio_pause");
        break;
      case "stop":
        robot.keyTap("audio_stop");
        break;
      case "prev":
        robot.keyTap("audio_prev");
        break;
      case "next":
        robot.keyTap("audio_next");
        break;
    }
  };


});
