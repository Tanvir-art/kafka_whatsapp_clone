import {Kafka} from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({ 
    clientId: 'socket-gateway',
    brokers: [process.env.KAFKA_BROKER]
 });

 export const consumer = kafka.consumer({groupId : "socket-group"});