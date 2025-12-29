import express from "express";
import cors from "cors";
import { generateContractText } from "./utils/ollama.js";
import { generatePDF } from "./utils/pdf.js";

const app = express();

app.use(cors({
  origin: "https://contractforge.org"
}));

app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.send("ContractForge backend running");
});

app.post("/generate", async (req, res) => {
  try {
    const formData = req.body;

    const contractText = await generateContractText(formData);
    const pdfBuffer = await generatePDF(contractText);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=contract.pdf"
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate contract" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
import express from "express";
import cors from "cors";
import { generateContractText } from "./utils/ollama.js";
import { generatePDF } from "./utils/pdf.js";

const app = express();

app.use(cors({
  origin: "https://contractforge.org"
}));

app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.send("ContractForge backend running");
});

app.post("/generate", async (req, res) => {
  try {
    const formData = req.body;

    const contractText = await generateContractText(formData);
    const pdfBuffer = await generatePDF(contractText);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=contract.pdf"
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate contract" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
