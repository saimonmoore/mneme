const rn_bridge = require('rn-bridge');

console.log('Node is initializing.');
rn_bridge.channel.on('message', msg => {
  console.log('got message from react-native: ', msg);
  rn_bridge.channel.send(msg);
});

rn_bridge.channel.send('Node was initialized.');
