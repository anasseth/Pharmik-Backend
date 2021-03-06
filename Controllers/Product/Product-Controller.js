const Product = require("../../Models/Product/Product-Model");

const getAllProduct = (req, res, next) => {
  Product.find({}).then((product) => {
    res.json(product);
  });
};

const newProduct = (req, res, next) => {
  const body = req.body;
  console.log(req.body);
  if (body.name == undefined) {
    return res.status(400).json({ error: "content missing" });
  }
  const product = new Product({
    name: body.name,
    composition: body.composition,
    category: body.category,
    tag: body.tag,
    imageURLID: body.imageURLID,
    featureProduct: body.featureProduct,
    prescription: body.prescription,
    type: body.type,
    typesOfPill: [],
  });

  for (var i = 0; i < body.typesOfPill.length; i++) {
    var typesOfPillObject = {
      power: body.typesOfPill[i].power,
      quantity: body.typesOfPill[i].quantity,
      price_per_pills: (Number(body.typesOfPill[i].our_price)/Number(body.typesOfPill[i].quantity)).toString(),
      our_price: body.typesOfPill[i].our_price,
    };
    product.typesOfPill.push(typesOfPillObject);
  }

  console.log(body);
  console.log(product);

  product.save().then((savedProduct) => {
    res.json(savedProduct);
  });
};

//DELETE '/tea'
const deleteAllProduct = (req, res, next) => {
  res.json({ message: "DELETE all Product" });
};

//GET '/tea/:name'
const getOneProduct = (req, res, next) => {
  res.json({ message: "GET 1 Product" });
};

//POST '/tea/:name'
const newComment = (req, res, next) => {
  res.json({ message: "POST 1 Product comment" });
};

//DELETE '/tea/:name'
const deleteOneProduct = (req, res, next) => {
  Product.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
};

//export controller functions
module.exports = {
  getAllProduct,
  newProduct,
  deleteAllProduct,
  getOneProduct,
  newComment,
  deleteOneProduct,
};
