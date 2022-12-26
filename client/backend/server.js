const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const { clientApplication } = require("./scripts/client");

app.post("/createProduct", function (req, res) {
  let Client = new clientApplication();

  Client.generatedAndSubmitTxn(
    req.body.role,
    "Admin",
    "tntchannel",
    "chainCode",
    "ProductContract",
    "createProduct",
    req.body.productId,
    req.body.productType,
    req.body.productName,
    req.body.producerName,
    req.body.dom
  )
    .then((message) => {
      res
        .status(200)
        .send({ error: false, message: `Added product ${req.body.productId}` });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.post("/transferProduct", function (req, res) {
  let Client = new clientApplication();

  Client.generatedAndSubmitTxn(
    req.body.role,
    "Admin",
    "tntchannel",
    "chainCode",
    "ProductContract",
    "transferProduct",
    req.body.productId,
    req.body.newOwner
  )
    .then((message) => {
      res.status(200).send({
        error: false,
        message: `Transfered product ${req.body.productId} to ${req.body.newOwner}`,
      });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.post("/deleteProduct", function (req, res) {
  let Client = new clientApplication();

  Client.generatedAndSubmitTxn(
    req.body.role,
    "Admin",
    "tntchannel",
    "chainCode",
    "ProductContract",
    "deleteProduct",
    req.body.productId
  )
    .then((message) => {
      res.status(200).send({
        error: false,
        message: `Deleted product ${req.body.productId}`,
      });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.post("/readProduct", function (req, res) {
  let Client = new clientApplication();
  Client.generatedAndEvaluateTxn(
    req.body.role,
    "Admin",
    "tntchannel",
    "chainCode",
    "ProductContract",
    "readProduct",
    req.body.productId
  )
    .then((response) => {
      res.status(200).send({ error: false, message: response.toString() });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.get("/queryAllProducts", function (req, res) {
  let Client = new clientApplication();
  Client.generatedAndEvaluateTxn(
    "producer",
    "Admin",
    "tntchannel",
    "chainCode",
    "ProductContract",
    "queryAllProducts"
  )
    .then((response) => {
      res.status(200).send({ error: false, message: response.toString() });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.post("/getProductHistory", function (req, res) {
  let Client = new clientApplication();
  Client.generatedAndEvaluateTxn(
    req.body.role,
    "Admin",
    "tntchannel",
    "chainCode",
    "ProductContract",
    "getProductHistory",
    req.body.productId
  )
    .then((response) => {
      res.status(200).send({ error: false, message: response.toString() });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.post("/createOrder", function (req, res) {
  let Client = new clientApplication();

  const transientData = {
    productType: Buffer.from(req.body.productType),
    productName: Buffer.from(req.body.productName),
    producerName: Buffer.from(req.body.producerName),
    dom: Buffer.from(req.body.dom),
  };
  console.log("lol", transientData);

  Client.generatedAndSubmitPDC(
    req.body.role,
    "Admin",
    "tntchannel",
    "chainCode",
    "OrderContract",
    "createOrder",
    req.body.orderId,
    transientData
  )
    .then((message) => {
      res
        .status(200)
        .send({ error: false, message: `Created order ${req.body.orderId}` });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.post("/readOrder", async function (req, res) {
  let Client = new clientApplication();
  Client.generatedAndEvaluateTxn(
    req.body.role,
    "Admin",
    "tntchannel",
    "chainCode",
    "OrderContract",
    "readOrder",
    req.body.orderId
  )
    .then((response) => {
      res.status(200).send({ error: false, message: response.toString() });
    })
    .catch((error) => {
      res.status(500).send({ error: true, message: `${error.message}` });
    });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
