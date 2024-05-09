// set and get key-value from redis server

import { createClient, print } from 'redis'

const client = createClient()
  .on("connect", () => {
    console.log("Redis client connected to the server");
  })
  .on("error", (error) => {
    console.log("Redis client not connected to the server:", error)
  })

const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, print);
};

const displaySchoolValue = (schoolName) => {
  const value = client.get(schoolName, (err, reply) => {
    if (err) console.log(err);
    console.log(reply);
  });
};


displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
