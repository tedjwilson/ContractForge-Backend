import express from "express";
import cors from "cors";
import { generateContractText } from "./utils/ollama.js";
import { generatePDF } from "./utils/pdf.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.send("ContractForge backend running");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.post("/generate", async (req, res) => {
  try {
    const contractText = await generateContractText(req.body);
    const pdf = await generatePDF(contractText);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=contract.pdf"
    });

    res.send(pdf);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
});

/**
 * 🚨 THIS IS THE CRITICAL PART
 */
const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("PORT is not defined");
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
