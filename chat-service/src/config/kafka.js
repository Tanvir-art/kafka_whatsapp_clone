import { Kafka } from "kafkajs";

export const kafkaclient = new Kafka({
    clientId : 'chat-service',
    brokers: [process.env.KAFKA_BROKER]
});

export const producer = kafkaclient.producer();