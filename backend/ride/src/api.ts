// @ts-nocheck
import express from "express";
import Ride from "./Ride";
import { sql } from "@vercel/postgres";
import crypto from "crypto";
import { validate } from "./CpfValidator";
import "dotenv/config";

const app = express();

app.use(express.json());

app.post("/calculate_ride", (req, res) => {
  try {
    const ride = new Ride();
    for (const segment of req.body.segments) {
      ride.addSegment(segment.distance, new Date(segment.date));
    }
    const price = ride.calculate();
    res.json({ price });
  } catch (e) {
    res.status(422).send(e.message);
  }
});

app.post("/passengers", async (req, res) => {
  try {
    if (!validate(req.body.document)) {
      throw new Error("Invalid cpf");
    }
    const passengerId = crypto.randomUUID();
    await sql`insert into cac.passenger(passenger_id, name, email, document) values (${passengerId}, ${req.body.name}, ${req.body.email}, ${req.body.document})`;
    res.json({
      passengerId,
    });
  } catch (e: any) {
    console.log(e);
    res.status(422).send(e.message);
  }
});

app.get("/passengers/:passengerId", async (req, res) => {
  const { rows } =
    await sql`select * from cac.passenger where passenger_id = ${req.params.passengerId};`;
  const [passengerData] = rows;
  res.json(passengerData);
});

app.post("/drivers", async (req, res) => {
  try {
    if (!validate(req.body.document)) {
      throw new Error("Invalid cpf");
    }
    const driverId = crypto.randomUUID();
    await sql`insert into cac.driver (driver_id, name, email, document, car_plate) values (${driverId}, ${req.body.name}, ${req.body.email}, ${req.body.document}, ${req.body.carPlate})`;
    res.json({
      driverId,
    });
  } catch (e: any) {
    res.status(422).send(e.message);
  }
});

app.get("/drivers/:driverId", async (req, res) => {
  const { rows } =
    await sql`select * from cac.driver where driver_id = ${req.params.driverId};`;
  const [driverData] = rows;
  res.json({
    driverId: driverData.driver_id,
    name: driverData.name,
    email: driverData.email,
    document: driverData.document,
    carPlate: driverData.car_plate,
  });
});

app.listen(3000);
