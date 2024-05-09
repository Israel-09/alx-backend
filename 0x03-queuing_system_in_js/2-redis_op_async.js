// set and get key-value from redis server
const { promisify } = require('util')
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

const getAsync = promisify(client.get).bind(client)

async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    console.log(value);
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}

main()
