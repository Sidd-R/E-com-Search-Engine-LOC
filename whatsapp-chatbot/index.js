const {
  Client,
  LocalAuth,
  MessageMedia,
  Location,
  Buttons,
} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { Builder, By, Key, until } = require("selenium-webdriver");

const spawner = require("child_process").spawn;

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: ".wwebjs_cache",
  }),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.clear();
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  if (message.body === "!Hi") {
    message.reply("Hello!");
  }

  if (message.body.startsWith("!search")) {
    const search = message.body.split(" ").slice(1).join(" ");
    // const result = await googleIt({ 'query': search });
    async function getAmazonProductLink(productName) {
      let driver = await new Builder().forBrowser("chrome").build();
      try {
        // Open Amazon website
        await driver.get("https://www.amazon.in");

        // Find the search box and enter the product name
        await driver
          .findElement(By.id("twotabsearchtextbox"))
          .sendKeys(productName, Key.RETURN);

        // Wait for the search results to load
        await driver.wait(until.elementLocated(By.css(".s-result-item")), 5000);

        // Find the first search result and extract the product link
        const productLink = await driver
          .findElement(By.css(".s-underline-link-text"))
          .getAttribute("href");

        return productLink;
      } catch (error) {
        console.error("An error occurred:", error);
        return "An error occurred";
      } finally {
        // Close the browser
        await driver.quit();
      }
    }
    getAmazonProductLink(search)
      .then((productLink) => {
        console.log("Product Link:", productLink);
        const price = spawner("python", ["search.py", productLink]);
        price.stdout.on("data", async (data) => {
          console.log(data.toString());
          data = JSON.parse(data);
          console.log(data.product);

          const reply = `Product: ${data.product}\nLowest Price: ${
            data.lowest
          }\nAverage Price: ${data.average}\n\nPrices:\n${data.prices
            .map((item) => `- ${item.site}: ${item.price}\n  ${item.link}`)
            .join("\n")}`;
          
          console.log(reply);
          console.log(data.image);
          const media = await MessageMedia.fromUrl(data.image);
          // client.sendMessage(message.from, message);
          // console.log("Price:", data.toString());
          client.sendMessage(message.from, media, { caption: reply });
          // message.reply(reply);
        });
      })
      .catch((error) => console.error("An error occurred:", error));
  }

  if(message.body.startsWith("!recommend")) {
    console.log('test');
    const search = message.body.split(" ").slice(1).join(" ");
    const result = spawner("python", ["recommend.py", search]);
    result.stdout.on("data", async (data) => {
      console.log(data.toString());
      // data = data.toString();
      data = JSON.parse(data);
      // console.log(data.image);
      const media = await MessageMedia.fromUrl(data.image);
      client.sendMessage(message.from, media, { caption: data.title });
      client.sendMessage(message.from, "Name: " + data.name + "\nPrice: " + data.price);
    });
  }
});

client.initialize();
