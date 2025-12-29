import puppeteer from "puppeteer";

export async function generatePDF(contractText) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ]
  });

  const page = await browser.newPage();

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial; padding: 40px; }
          h1 { text-align: center; }
          p { line-height: 1.6; }
        </style>
      </head>
      <body>
        <h1>Service Agreement</h1>
        <p>${contractText.replace(/\n/g, "<br>")}</p>
      </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true
  });

  await browser.close();
  return pdf;
}
