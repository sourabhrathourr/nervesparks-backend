import { faker } from "@faker-js/faker";
import { getDatabase } from "../config/database.js";

const generateFakeData = async () => {
  const db = getDatabase();
  const usersCollection = db.collection("users");
  const dealershipsCollection = db.collection("dealerships");

  const fakeUsers = [];
  for (let i = 0; i < 50; i++) {
    const user = {
      name: faker.person.fullName(),
      user_email: faker.internet.email(),
      user_location: faker.location.city(),
      password: faker.internet.password(),
    };
    fakeUsers.push(user);
  }
  await usersCollection.insertMany(fakeUsers);

  const fakeDealerships = [];
  for (let i = 0; i < 10; i++) {
    const dealership = {
      dealership_name: faker.company.buzzVerb(),
      dealership_email: faker.internet.email(),
      dealership_location: faker.location.city(),
      password: faker.internet.password(),
    };
    fakeDealerships.push(dealership);
  }
  await dealershipsCollection.insertMany(fakeDealerships);



  export default generateFakeData;
