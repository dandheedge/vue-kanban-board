import express from "express";
import cors from "cors";
import { contacts } from "../mocks/contacts";
import { stages } from "../mocks/stages";
import { contactsResponseSchema } from "./types/contact";
import { stagesResponseSchema } from "./types/stages";

// Create an Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Define the API endpoint
app.get("/api/contacts", (req, res) => {
  const validatedData = contactsResponseSchema.parse(contacts);

  // Send the validated data as the response
  res.json(validatedData);
});

app.get("/api/stages", (req, res) => {
  const validatedData = stagesResponseSchema.parse(stages);

  // Send the validated data as the response
  res.json(validatedData);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
