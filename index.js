const pm2 = require('pm2')

pm2.connect(true, function(err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  pm2.start([
    {
      script             : "master.js",
    },
    {
      script             : "worker.js",
    },
  ],
    function(err, procs) {
      if(err) {
        throw err
      }
    });

pm2.launchBus((err, bus) => {
  bus.on('log:out', data => {
    process.stdout.write(data.data);
  });
  bus.on('log:err', data => {
    process.stderr.write(data.data);
  });
 })
})


process.stdin.resume();//so the program will not close instantly

function exitHandler(options, exitCode) {
    if (options.cleanup) console.log('clean');
    pm2.killDaemon(function(err) {
        if(err) {
          throw err
        }
        pm2.disconnect()
        if (options.exit) process.exit();
    })
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
