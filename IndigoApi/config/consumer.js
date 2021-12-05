import amqp from 'amqplib/callback_api.js';
import { confirmBooking } from '../api/routers/bookingRouter.js';
const CONN_URL = `amqps://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PWD}@puffin.rmq2.cloudamqp.com/${process.env.RABBITMQ_USER}`;

const messageQueue = amqp.connect(CONN_URL, (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }
        const queueName = 'ConfirmBooking';
        channel.assertQueue(queueName, {
            durable: false
        });
        channel.consume(queueName, async (msg) => {
            await confirmBooking(JSON.parse(msg.content));
            channel.ack(msg);
        });
    });
});

export default messageQueue;