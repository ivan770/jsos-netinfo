// NetInfo application
// By ivan770

// Gonna add MAC later

'use strict';

function main (cmd, args, api, res) {
  const io = api.stdio;

  function interfaces() {
    const io = api.stdio;
    const interfaces = require('../../core/net/interfaces');

    try {
      var arr = interfaces.getAll();
      arr.forEach(function (item, i, arr) {
        io.writeLine(i + ': ' + item.name);
      });
    } catch (err) {
      io.setColor('red');
      io.writeLine('Unable to get network interfaces');

      return res(1);
    }
  }

  function stats() {
    const netstat = require('../../core/net/net-stat');

    try {
      var receiveCount = netstat.receiveCount;
      var transmitCount = netstat.transmitCount;
      io.writeLine(`'Receive: ${receiveCount}'`);
      io.writeLine(`'Transmit: ${transmitCount}'`);
    } catch (err) {
      io.setColor('red');
      io.writeLine('Unable to get network stats');

      return res(1);
    }
  }

  function ip() {
    const ip = require('../../core/net/ip4-address');

    var IPLoopback = ip.LOOPBACK;
    var IPAny = ip.ANY;
    var IPBroadcast = ip.BROADCAST;
    io.writeLine(`'IPV4 Loopback: ${IPLoopback}'`);
    io.writeLine(`'IPV4 Any: ${IPAny}'`);
    io.writeLine(`'IPV4 Broadcast: ${IPBroadcast}'`);
  }

  if (args === 'interfaces'){
    interfaces();
  } else if (args === '') {
    io.setColor('red');
    io.writeLine('NetInfo testing tool.');
    io.writeLine('Created by ivan770');
    io.writeLine('');
    io.setColor('green');
    io.writeLine('interfaces - Get all network interfaces');
    io.writeLine('stats - Get network usage stats');
    io.writeLine('ip - Get IPv4 addresses');
  } else if (args === 'stats') {
    stats();
  } else if (args === 'ip'){
    ip();
  } else {
    io.setColor('red')
    io.writeLine(`'Invalid argument : ${args}'`);

    return res(1);
  }

  return res(0);
}

exports.call = main;

exports.commands = ['netinfo'];
