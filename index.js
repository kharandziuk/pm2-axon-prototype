const pm2 = require('pm2')

pm2.connect(function(err) {
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
    function(err, proc) {
      if(err) {
        throw err
      }
      console.log(proc)
      console.log(proc.bus)
      console.log(proc.launchBus)
    });

})
pm2.launchBus((err, bus) => {
  bus.on('log:out', data => {
    process.stdout.write(data.data);
  });
  bus.on('log:err', data => {
    process.stderr.write(data.data);
  });
});
