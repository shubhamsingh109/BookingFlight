import amqp from 'amqplib/callback_api.js';
const CONN_URL = `amqps://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PWD}@puffin.rmq2.cloudamqp.com/${process.env.RABBITMQ_USER}`;

export const sendMessageToQueue = async (queueName, msgData) => {
    amqp.connect(CONN_URL, (err, connection) => {
        if (err) {
            throw err;
        }
        connection.createChannel((err, channel) => {
            if (err) {
                throw err;
            }
            channel.assertQueue(queueName, {
                durable: false
            });
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msgData)));
            setTimeout(() => {
                channel.close();
            }, 1000);
        });
    });
}