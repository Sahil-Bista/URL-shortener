import Redis from 'redis';

const client = Redis.createClient();

client.on('error', (err) => console.error('Redis Client Error', err));

await client.connect();

export default client;
