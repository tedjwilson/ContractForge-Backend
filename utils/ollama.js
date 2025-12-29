import fetch from "node-fetch";

export async function generateContractText(data) {
  const prompt = `
Create a professional legal contract using the following details:

Client Name: ${data.clientName}
Service Description: ${data.service}
Payment Terms: ${data.payment}
Jurisdiction: ${data.jurisdiction}

Write in formal legal language.
`;

  const response = await fetch("https://api.ollama.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OLLAMA_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const json = await response.json();
  return json.choices[0].message.content;
}
