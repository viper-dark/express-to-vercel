// file.mjs (ES module)
import express from 'express';
import path from 'path';

const app = express();
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const handler = async () => {
    try {
      const puppeteer = (await import('puppeteer-core')).default;
      const chromium = (await import('@sparticuz/chromium-min')).default;

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

      console.log("Chromium: vvvvvvvvvvvvvvvvvvvvvvvv", await browser.version());
      console.log("Page Title isssssssssssssssssssssssssssss:", await page.title());

      await page.close();

      await browser.close();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  handler()
    .then(() => {
      console.log("Done");
      res.status(200).send("ERROR no link or data found for match ");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(process.env.PORT || 3000);

export default app;
