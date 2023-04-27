const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BrandName = require("./model");
const app = express();
app.use(express.json());

// https://cloud.mongodb.com/v2/6442234d25ab8c1251dc5be9#/metrics/replicaSet/64422873e34e165e7bf7d911/explorer/test/brandnames/find

mongoose
  .connect(
    "mongodb+srv://srinivasvangara96:Srinu7899@cluster0.qutnzhk.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log("error", err));

app.get("/", (req, res) => {
  res.send(`<h1>Server Started Successfully!</h1>`);
});

//post method
app.post("/addbrands", async (req, res) => {
  const { vendor_name, vendor_phone, brandName, quantity } = req.body;
  console.log("itemitem", req.body);
  try {
    const newData = new BrandName({
      vendor_name,
      vendor_phone,
      brandName,
      quantity,
    });
    await newData.save();
    return res.json(await BrandName.find());
  } catch (err) {
    console.log(err.message);
  }
});

//get all Brands
app.get("/getallbrands", async (req, res) => {
  try {
    const allData = await BrandName.find();
    return res.json(allData);
  } catch (err) {
    console.log("error", err);
  }
});

//get onebrand by Id
app.get("/getbranditem/:id", async (req, res) => {
  try {
    const data = await BrandName.findById(req.params.id);
    return res.json(data);
  } catch (err) {
    console.log("error", err);
  }
});

//deletebrand
app.delete("/deletebrand/:id", async (req, res) => {
  try {
    await BrandName.findByIdAndDelete(req.params.id);
    return res.json(await BrandName.find());
  } catch (err) {
    console.log("err", err);
  }
});

//update
app.put("/updatebrand/:id", (request, response) => {
  const body = request.body;
  const blog = {
    vendor_name: body.vendor_name,
    vendor_phone: body.vendor_phone,
    brandName: body.brandName,
    quantity: body.quantity,
  };
  BrandName.findByIdAndUpdate(request.params.id, blog)
    .then((updatedBlog) => {
      console.log("updatedBlog", updatedBlog);
      response.json({
        status: "success",
        message: "Updated successfully",
      });
    })
    .catch((error) =>
      response.json({
        status: "error",
        message: "Update failed",
      })
    );
});

app.listen(3005, () => console.log("Server running......"));
