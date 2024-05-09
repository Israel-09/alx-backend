// store hash value

import { createClient, print } from 'redis'

const client = createClient()
  .on("connect", () => {
    console.log("Redis client connected to the server");
  })
  .on("error", (error) => {
    console.log("Redis client not connected to the server:", error)
  })

function storeHashSchool(field, value) {
  client.hset('HolbertonSchools', field, value, print)
}

storeHashSchool('Portland', 50);
storeHashSchool('Seattle', 80);
storeHashSchool('New York', 20);
storeHashSchool('Bogota', 20);
storeHashSchool('Cali', 40);
storeHashSchool('Paris', 2);

client.hgetall('HolbertonSchools', (err, reply) => {
  if (err) throw err;
  console.log(reply)
});
