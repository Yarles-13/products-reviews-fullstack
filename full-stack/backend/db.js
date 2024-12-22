const mongoose = require('mongoose')
const Product = require('./models/Product')

mongoose.connect("mongodb://localhost:27017/ProductsDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("connected to mongoDB for adding data"))
.catch((err) => console.error(err))

const sampleProducts = [
  {
    name: "Baseball",
    price: 10,
    reviews: [
      {userName: "Kevin", text: "Most Authentic baseball out there"},
      {userName: "Ryan", text: "My absolute favorite"},
      {userName: "Jenny", text: "Helps me with my two-seamer heater"}
    ]
  },
  {
    name: "PS5",
    price: 400,
    reviews: [
      {userName: "Rebeca", text: "My son loved it"},
      {userName: "Joyce", text: "Better than Xbox"},
      {userName: "Lino", text: "I play all day after work.. its my 5-9"}
    ]
  },
  {
    name: "Basketball",
    price: 39,
    reviews: [
      {userName: "George", text: "Feels like the NBA Game ball"},
      {userName: "Miranda", text: "Best grip for indoor"},
      {userName: "Hannah", text: "Helps me with my three pointer"},
    ]
  }
];

const insertData = async () => {
  try {
    await Product.insertMany(sampleProducts);
    console.log("db inserted!")
    mongoose.connection.close();
  } catch (error){
    console.error(error)
  }
}

insertData();