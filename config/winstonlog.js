var appRoot = require('app-root-path');
var winston = require('winston');
require('winston-daily-rotate-file');


var transport = new winston.transports.DailyRotateFile({
  filename: `Radiator_%DATE%.log`,
  dirname:`${appRoot}/logs/`,
  datePattern: 'MM-DD-YYYY',
  zippedArchive: true,
  maxSize: '500m',
  maxFiles: '30d',
  colorize:true,   
  format: winston.format.combine(   
        winston.format.timestamp(),
        winston.format.printf((info) => {
          if(info.username===undefined)
          {
            info.username="NA"
          }        
          return `{"DateTime":"${new Date(info.timestamp).toLocaleString()}","Level":"${info.level}","Username":"${info.username}","Module":"${info.reqdetails}","Message": "${info.message}"}`;
        }),
       
      )
    
})

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.createLogger({
  transports: [
    // new winston.transports.File(options.file)    
    transport
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};



module.exports = logger;