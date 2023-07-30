const express = require('express');
const app = express();
const path = require('path');
   const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium-min");

app.use(express.static('public'))

app.get('/', (req, res) => {
 

const handler = async () => {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v110.0.1/chromium-v110.0.1-pack.tar"
      ),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    await page.goto("https://www.google.com/", { waitUntil: "networkidle0" });

    console.log("Chromium:", await browser.version());
    console.log("Page Title:", await page.title());

    await page.close();

    await browser.close();
  } catch (error) {
    throw new Error(error.message);
  }
};

handler().then(() => console.log("Done"));
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

app.listen(process.env.PORT || 3000);

module.exports = app;
