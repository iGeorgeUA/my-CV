const amqp = require("amqplib");
const fs = require("fs");

class Logger {
  constructor() {
    this.transports = [];
  }

  addTransport(transport) {
    this.transports.push(transport);
  }

  log(level, message) {
    for (const transport of this.transports) {
      transport.log(level, message);
    }
  }
}

class FileTransport {
  constructor(filePath) {
    this.filePath = filePath;
  }

  log(level, message) {
    const logMessage = `${new Date().toISOString()} - ${level}: ${message}\n`;
    fs.appendFile(this.filePath, logMessage, (err) => {
      if (err) throw err;
    });
  }
}

class RabbitMQTransport {
  constructor(connectionUrl, queueName) {
    this.connectionUrl = connectionUrl;
    this.queueName = queueName;
  }

  async log(level, message) {
    const logMessage = `${new Date().toISOString()} - ${level}: ${message}`;
    const connection = await amqp.connect(this.connectionUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(this.queueName);
    channel.sendToQueue(this.queueName, Buffer.from(logMessage));
    setTimeout(() => {
      connection.close();
    }, 500);
  }
}

module.exports = { Logger, FileTransport, RabbitMQTransport };