var DataTypes = require("sequelize").DataTypes;
var _Address = require("./Address");
var _Admin = require("./Admin");
var _Category = require("./Category");
var _CategoryItem = require("./CategoryItem");
var _Customer = require("./Customer");
var _Delivery = require("./Delivery");
var _Driver = require("./Driver");
var _DriverLocationLog = require("./DriverLocationLog");
var _DriverRating = require("./DriverRating");
var _Item = require("./Item");
var _ItemOption = require("./ItemOption");
var _ItemOptionGroup = require("./ItemOptionGroup");
var _Menu = require("./Menu");
var _Merchant = require("./Merchant");
var _Order = require("./Order");
var _OrderItem = require("./OrderItem");
var _OrderItemOption = require("./OrderItemOption");
var _OrderStatusHistory = require("./OrderStatusHistory");
var _Payment = require("./Payment");
var _Person = require("./Person");
var _Rating = require("./Rating");
var _Refund = require("./Refund");
var _Restaurant = require("./Restaurant");
var _RestaurantRatingId = require("./RestaurantRatingId");
var _SupportTicket = require("./SupportTicket");

function initModels(sequelize) {
  var Address = _Address(sequelize, DataTypes);
  var Admin = _Admin(sequelize, DataTypes);
  var Category = _Category(sequelize, DataTypes);
  var CategoryItem = _CategoryItem(sequelize, DataTypes);
  var Customer = _Customer(sequelize, DataTypes);
  var Delivery = _Delivery(sequelize, DataTypes);
  var Driver = _Driver(sequelize, DataTypes);
  var DriverLocationLog = _DriverLocationLog(sequelize, DataTypes);
  var DriverRating = _DriverRating(sequelize, DataTypes);
  var Item = _Item(sequelize, DataTypes);
  var ItemOption = _ItemOption(sequelize, DataTypes);
  var ItemOptionGroup = _ItemOptionGroup(sequelize, DataTypes);
  var Menu = _Menu(sequelize, DataTypes);
  var Merchant = _Merchant(sequelize, DataTypes);
  var Order = _Order(sequelize, DataTypes);
  var OrderItem = _OrderItem(sequelize, DataTypes);
  var OrderItemOption = _OrderItemOption(sequelize, DataTypes);
  var OrderStatusHistory = _OrderStatusHistory(sequelize, DataTypes);
  var Payment = _Payment(sequelize, DataTypes);
  var Person = _Person(sequelize, DataTypes);
  var Rating = _Rating(sequelize, DataTypes);
  var Refund = _Refund(sequelize, DataTypes);
  var Restaurant = _Restaurant(sequelize, DataTypes);
  var RestaurantRatingId = _RestaurantRatingId(sequelize, DataTypes);
  var SupportTicket = _SupportTicket(sequelize, DataTypes);

  Category.belongsToMany(Item, { as: 'Item_ID_Items', through: CategoryItem, foreignKey: "Category_ID", otherKey: "Item_ID" });
  Item.belongsToMany(Category, { as: 'Category_ID_Categories', through: CategoryItem, foreignKey: "Item_ID", otherKey: "Category_ID" });
  Customer.belongsTo(Address, { as: "Default_Address", foreignKey: "Default_Address_ID"});
  Address.hasMany(Customer, { as: "Customers", foreignKey: "Default_Address_ID"});
  Order.belongsTo(Address, { as: "Delivery_Address", foreignKey: "Delivery_Address_ID"});
  Address.hasMany(Order, { as: "Orders", foreignKey: "Delivery_Address_ID"});
  SupportTicket.belongsTo(Admin, { as: "Admin_Person", foreignKey: "Admin_Person_ID"});
  Admin.hasMany(SupportTicket, { as: "Support_Tickets", foreignKey: "Admin_Person_ID"});
  CategoryItem.belongsTo(Category, { as: "Category", foreignKey: "Category_ID"});
  Category.hasMany(CategoryItem, { as: "Category_Items", foreignKey: "Category_ID"});
  Order.belongsTo(Customer, { as: "Customer_Person", foreignKey: "Customer_Person_ID"});
  Customer.hasMany(Order, { as: "Orders", foreignKey: "Customer_Person_ID"});
  Rating.belongsTo(Customer, { as: "Customer_Person", foreignKey: "Customer_Person_ID"});
  Customer.hasMany(Rating, { as: "Ratings", foreignKey: "Customer_Person_ID"});
  SupportTicket.belongsTo(Customer, { as: "Customer", foreignKey: "Customer_ID"});
  Customer.hasMany(SupportTicket, { as: "Support_Tickets", foreignKey: "Customer_ID"});
  Delivery.belongsTo(Driver, { as: "Driver_Person", foreignKey: "Driver_Person_ID"});
  Driver.hasMany(Delivery, { as: "Deliveries", foreignKey: "Driver_Person_ID"});
  DriverLocationLog.belongsTo(Driver, { as: "Driver_Person", foreignKey: "Driver_Person_ID"});
  Driver.hasMany(DriverLocationLog, { as: "Driver_Location_Logs", foreignKey: "Driver_Person_ID"});
  DriverRating.belongsTo(Driver, { as: "Driver_Person", foreignKey: "Driver_Person_ID"});
  Driver.hasMany(DriverRating, { as: "Driver_Ratings", foreignKey: "Driver_Person_ID"});
  CategoryItem.belongsTo(Item, { as: "Item", foreignKey: "Item_ID"});
  Item.hasMany(CategoryItem, { as: "Category_Items", foreignKey: "Item_ID"});
  ItemOptionGroup.belongsTo(Item, { as: "Item", foreignKey: "Item_ID"});
  Item.hasMany(ItemOptionGroup, { as: "Item_Option_Groups", foreignKey: "Item_ID"});
  OrderItem.belongsTo(Item, { as: "Item", foreignKey: "Item_ID"});
  Item.hasMany(OrderItem, { as: "Order_Items", foreignKey: "Item_ID"});
  ItemOption.belongsTo(ItemOptionGroup, { as: "Group", foreignKey: "Group_ID"});
  ItemOptionGroup.hasMany(ItemOption, { as: "Item_Options", foreignKey: "Group_ID"});
  Category.belongsTo(Menu, { as: "Menu", foreignKey: "Menu_ID"});
  Menu.hasMany(Category, { as: "Categories", foreignKey: "Menu_ID"});
  Restaurant.belongsTo(Merchant, { as: "Merchant_Person", foreignKey: "Merchant_Person_ID"});
  Merchant.hasMany(Restaurant, { as: "Restaurants", foreignKey: "Merchant_Person_ID"});
  Delivery.belongsTo(Order, { as: "Order", foreignKey: "Order_ID"});
  Order.hasMany(Delivery, { as: "Deliveries", foreignKey: "Order_ID"});
  DriverRating.belongsTo(Order, { as: "Order", foreignKey: "Order_ID"});
  Order.hasOne(DriverRating, { as: "Driver_Rating", foreignKey: "Order_ID"});
  OrderItem.belongsTo(Order, { as: "Order", foreignKey: "Order_ID"});
  Order.hasMany(OrderItem, { as: "Order_Items", foreignKey: "Order_ID"});
  OrderStatusHistory.belongsTo(Order, { as: "Order", foreignKey: "Order_ID"});
  Order.hasMany(OrderStatusHistory, { as: "Order_Status_Histories", foreignKey: "Order_ID"});
  Payment.belongsTo(Order, { as: "Order", foreignKey: "Order_ID"});
  Order.hasMany(Payment, { as: "Payments", foreignKey: "Order_ID"});
  Rating.belongsTo(Order, { as: "Order", foreignKey: "Order_ID"});
  Order.hasMany(Rating, { as: "Ratings", foreignKey: "Order_ID"});
  RestaurantRatingId.belongsTo(Order, { as: "Order", foreignKey: "Order_ID"});
  Order.hasOne(RestaurantRatingId, { as: "Restaurant_Rating_ID", foreignKey: "Order_ID"});
  OrderItemOption.belongsTo(OrderItem, { as: "Order_Item", foreignKey: "Order_Item_ID"});
  OrderItem.hasMany(OrderItemOption, { as: "Order_Item_Options", foreignKey: "Order_Item_ID"});
  Refund.belongsTo(Payment, { as: "Payment", foreignKey: "Payment_ID"});
  Payment.hasMany(Refund, { as: "Refunds", foreignKey: "Payment_ID"});
  Address.belongsTo(Person, { as: "Person", foreignKey: "Person_ID"});
  Person.hasMany(Address, { as: "Addresses", foreignKey: "Person_ID"});
  Admin.belongsTo(Person, { as: "Person", foreignKey: "Person_ID"});
  Person.hasOne(Admin, { as: "Admin", foreignKey: "Person_ID"});
  Customer.belongsTo(Person, { as: "Person", foreignKey: "Person_ID"});
  Person.hasOne(Customer, { as: "Customer", foreignKey: "Person_ID"});
  Driver.belongsTo(Person, { as: "Person", foreignKey: "Person_ID"});
  Person.hasOne(Driver, { as: "Driver", foreignKey: "Person_ID"});
  Merchant.belongsTo(Person, { as: "Person", foreignKey: "Person_ID"});
  Person.hasOne(Merchant, { as: "Merchant", foreignKey: "Person_ID"});
  OrderStatusHistory.belongsTo(Person, { as: "Changed_By_Person", foreignKey: "Changed_By_Person_ID"});
  Person.hasMany(OrderStatusHistory, { as: "Order_Status_Histories", foreignKey: "Changed_By_Person_ID"});
  DriverRating.belongsTo(Rating, { as: "Rating", foreignKey: "Rating_ID"});
  Rating.hasOne(DriverRating, { as: "Driver_Rating", foreignKey: "Rating_ID"});
  RestaurantRatingId.belongsTo(Rating, { as: "Rating", foreignKey: "Rating_ID"});
  Rating.hasOne(RestaurantRatingId, { as: "Restaurant_Rating_ID", foreignKey: "Rating_ID"});
  Item.belongsTo(Restaurant, { as: "Restaurant", foreignKey: "Restaurant_ID"});
  Restaurant.hasMany(Item, { as: "Items", foreignKey: "Restaurant_ID"});
  Menu.belongsTo(Restaurant, { as: "Restaurant", foreignKey: "Restaurant_ID"});
  Restaurant.hasMany(Menu, { as: "Menus", foreignKey: "Restaurant_ID"});
  Order.belongsTo(Restaurant, { as: "Restaurant", foreignKey: "Restaurant_ID"});
  Restaurant.hasMany(Order, { as: "Orders", foreignKey: "Restaurant_ID"});
  RestaurantRatingId.belongsTo(Restaurant, { as: "Restaurant", foreignKey: "Restaurant_ID"});
  Restaurant.hasMany(RestaurantRatingId, { as: "Restaurant_Rating_IDs", foreignKey: "Restaurant_ID"});

  return {
    Address,
    Admin,
    Category,
    CategoryItem,
    Customer,
    Delivery,
    Driver,
    DriverLocationLog,
    DriverRating,
    Item,
    ItemOption,
    ItemOptionGroup,
    Menu,
    Merchant,
    Order,
    OrderItem,
    OrderItemOption,
    OrderStatusHistory,
    Payment,
    Person,
    Rating,
    Refund,
    Restaurant,
    RestaurantRatingId,
    SupportTicket,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
