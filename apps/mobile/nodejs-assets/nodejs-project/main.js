const bridge = require('bridge');
const {Client} = require('@mneme/backend');

const userDataPath = bridge.app.datadir();
// const env = 'development';

console.log('userDataPath', userDataPath);
console.log('[nodejs-project] ---------------> ', {Client});
console.log('[nodejs-project] ---------------> ', {bridge});

console.log('Node is initializing.');
// Instantiate backend
await Client(bridge.channel, userDataPath);

bridge.channel.on('message', msg => {
  console.log('got message from react-native: ', msg);

  if (typeof msg === 'object') {
    console.log('[nodejs-project] Message is not an object');
    return;
  }

  if (typeof msg === 'string') {
    console.log('[nodejs-project] Message is a string! Echoing!');
    bridge.channel.send(msg);
  }
});

bridge.channel.send('Node was initialized.');
