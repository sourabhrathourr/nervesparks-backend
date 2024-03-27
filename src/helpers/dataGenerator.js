import { faker } from "@faker-js/faker";
import { getDatabase } from "../config/database.js";

const generateFakeData = async () => {
  const db = getDatabase();
  const usersCollection = db.collection("users");
  const dealershipsCollection = db.collection("dealerships");
  // const carsCollection = db.collection("cars");
  // const dealsCollection = db.collection('deals');

  // Generate fake users
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

  // Generate fake dealerships
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

  // Generate fake cars
  // const fakeCars = [];
  // for (let i = 0; i < 100; i++) {
  //   const car = {
  //     make: faker.vehicle.manufacturer(),
  //     model: faker.vehicle.model(),
  //     year: faker.date.past(20).getFullYear(),
  //     price: faker.commerce.price(),
  //     dealershipId: faker.random.arrayElement(
  //       fakeDealerships.map((d) => d._id),
  //     ),
  //   };
  //   fakeCars.push(car);
  // }
  // await carsCollection.insertMany(fakeCars);

  // Generate fake deals
  // const fakeDeals = [];
  // for (let i = 0; i < 50; i++) {
  //   const deal = {
  //     carId: faker.random.arrayElement(fakeCars.map((c) => c._id)),
  //     buyerId: faker.random.arrayElement(
  //       fakeUsers.filter((u) => u.role === "client").map((u) => u._id),
  //     ),
  //     sellerId: faker.random.arrayElement(
  //       fakeUsers.filter((u) => u.role === "dealer").map((u) => u._id),
  //     ),
  //     price: faker.commerce.price(),
  //     date: faker.date.past(),
  //   };
  //   fakeDeals.push(deal);
  // }
  // await dealsCollection.insertMany(fakeDeals);
};

export default generateFakeData;
