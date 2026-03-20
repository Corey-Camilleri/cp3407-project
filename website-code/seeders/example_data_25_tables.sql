-- Auto-generated sample data: default 15 rows per table with table-specific overrides
USE `cp3407_staging`;
SET FOREIGN_KEY_CHECKS = 0;

-- Address
DELETE FROM `Address`;
INSERT INTO `Address` (`Address_ID`, `Person_ID`, `Address_Type`, `Street`, `City`, `State`, `Zip`, `Lat`, `Lng`, `Instructions`) VALUES
(1, 1, 'CUSTOMER', 'Address_Street_1', 'Address_City_1', 'Address_State_1', 'Address_Zip_1', 1.100000, 1.100000, 'Address_Instructions_1'),
(2, 2, 'RESTAURANT', 'Address_Street_2', 'Address_City_2', 'Address_State_2', 'Address_Zip_2', 2.100000, 2.100000, 'Address_Instructions_2'),
(3, 3, 'CUSTOMER', 'Address_Street_3', 'Address_City_3', 'Address_State_3', 'Address_Zip_3', 3.100000, 3.100000, 'Address_Instructions_3'),
(4, 4, 'RESTAURANT', 'Address_Street_4', 'Address_City_4', 'Address_State_4', 'Address_Zip_4', 4.100000, 4.100000, 'Address_Instructions_4'),
(5, 5, 'CUSTOMER', 'Address_Street_5', 'Address_City_5', 'Address_State_5', 'Address_Zip_5', 5.100000, 5.100000, 'Address_Instructions_5'),
(6, 6, 'RESTAURANT', 'Address_Street_6', 'Address_City_6', 'Address_State_6', 'Address_Zip_6', 6.100000, 6.100000, 'Address_Instructions_6'),
(7, 7, 'CUSTOMER', 'Address_Street_7', 'Address_City_7', 'Address_State_7', 'Address_Zip_7', 7.100000, 7.100000, 'Address_Instructions_7'),
(8, 8, 'RESTAURANT', 'Address_Street_8', 'Address_City_8', 'Address_State_8', 'Address_Zip_8', 8.100000, 8.100000, 'Address_Instructions_8'),
(9, 9, 'CUSTOMER', 'Address_Street_9', 'Address_City_9', 'Address_State_9', 'Address_Zip_9', 9.100000, 9.100000, 'Address_Instructions_9'),
(10, 10, 'RESTAURANT', 'Address_Street_10', 'Address_City_10', 'Address_State_10', 'Address_Zip_10', 10.100000, 10.100000, 'Address_Instructions_10'),
(11, 11, 'CUSTOMER', 'Address_Street_11', 'Address_City_11', 'Address_State_11', 'Address_Zip_11', 11.100000, 11.100000, 'Address_Instructions_11'),
(12, 12, 'RESTAURANT', 'Address_Street_12', 'Address_City_12', 'Address_State_12', 'Address_Zip_12', 12.100000, 12.100000, 'Address_Instructions_12'),
(13, 13, 'CUSTOMER', 'Address_Street_13', 'Address_City_13', 'Address_State_13', 'Address_Zip_13', 13.100000, 13.100000, 'Address_Instructions_13'),
(14, 14, 'RESTAURANT', 'Address_Street_14', 'Address_City_14', 'Address_State_14', 'Address_Zip_14', 14.100000, 14.100000, 'Address_Instructions_14'),
(15, 15, 'CUSTOMER', 'Address_Street_15', 'Address_City_15', 'Address_State_15', 'Address_Zip_15', 15.100000, 15.100000, 'Address_Instructions_15'),
(16, 16, 'RESTAURANT', 'Address_Street_16', 'Address_City_16', 'Address_State_16', 'Address_Zip_16', 16.100000, 16.100000, 'Address_Instructions_16'),
(17, 17, 'CUSTOMER', 'Address_Street_17', 'Address_City_17', 'Address_State_17', 'Address_Zip_17', 17.100000, 17.100000, 'Address_Instructions_17'),
(18, 18, 'RESTAURANT', 'Address_Street_18', 'Address_City_18', 'Address_State_18', 'Address_Zip_18', 18.100000, 18.100000, 'Address_Instructions_18'),
(19, 19, 'CUSTOMER', 'Address_Street_19', 'Address_City_19', 'Address_State_19', 'Address_Zip_19', 19.100000, 19.100000, 'Address_Instructions_19'),
(20, 20, 'RESTAURANT', 'Address_Street_20', 'Address_City_20', 'Address_State_20', 'Address_Zip_20', 20.100000, 20.100000, 'Address_Instructions_20');

-- Admin
DELETE FROM `Admin`;
INSERT INTO `Admin` (`Person_ID`, `Role_Type`, `Access_Level`) VALUES
(1, 'Support', 'L2'),
(2, 'Operations', 'L2'),
(3, 'Finance', 'L1'),
(4, 'TrustSafety', 'L3'),
(5, 'Platform', 'L3');

-- Category
DELETE FROM `Category`;
INSERT INTO `Category` (`Category_ID`, `Menu_ID`, `Name`, `Sort_Order`) VALUES
(1, 1, 'Bowls', 1),
(2, 1, 'Ramen', 2),
(3, 1, 'Sides', 3),
(4, 2, 'Tacos', 1),
(5, 2, 'Nachos', 2),
(6, 2, 'Drinks', 3),
(7, 3, 'Pasta', 1),
(8, 3, 'Salads', 2),
(9, 3, 'Desserts', 3),
(10, 4, 'Power Bowls', 1),
(11, 4, 'Wraps', 2),
(12, 4, 'Smoothies', 3),
(13, 5, 'Burgers', 1),
(14, 5, 'Chicken', 2),
(15, 5, 'Shakes', 3);

-- Category_Item
DELETE FROM `Category_Item`;
INSERT INTO `Category_Item` (`Item_ID`, `Category_ID`) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 3),
(6, 3),
(7, 4),
(8, 4),
(9, 4),
(10, 5),
(11, 5),
(12, 6),
(13, 7),
(14, 7),
(15, 7),
(16, 8),
(17, 8),
(18, 9),
(19, 10),
(20, 10),
(21, 11),
(22, 11),
(23, 12),
(24, 12),
(25, 13),
(26, 13),
(27, 13),
(28, 14),
(29, 14),
(30, 15);

-- Customer
DELETE FROM `Customer`;
INSERT INTO `Customer` (`Person_ID`, `Default_Address_ID`, `Loyalty_Points`, `Preferred_Payment_Method`) VALUES
(1, 1, 220, 'VISA'),
(2, 2, 140, 'MasterCard'),
(3, 3, 80, 'PayPal'),
(4, 4, 360, 'ApplePay'),
(5, 5, 40, 'Cash');

-- Delivery
DELETE FROM `Delivery`;
INSERT INTO `Delivery` (`Delivery_ID`, `Order_ID`, `Driver_Person_ID`, `Status`, `Pickup_Time`, `Dropoff_Time`, `Distance_KM`, `Estimated_Duration`) VALUES
(1, 1, 1, 'ASSIGNED', '2026-01-01 08:00:00', '2026-01-01 08:00:00', 1.10, 1.10),
(2, 2, 2, 'PICKED_UP', '2026-01-02 09:07:00', '2026-01-02 09:07:00', 2.10, 2.10),
(3, 3, 3, 'IN_TRANSIT', '2026-01-03 10:14:00', '2026-01-03 10:14:00', 3.10, 3.10),
(4, 4, 4, 'DELIVERED', '2026-01-04 11:21:00', '2026-01-04 11:21:00', 4.10, 4.10),
(5, 5, 5, 'FAILED', '2026-01-05 12:28:00', '2026-01-05 12:28:00', 5.10, 5.10),
(6, 6, 6, 'CANCELLED', '2026-01-06 13:35:00', '2026-01-06 13:35:00', 6.10, 6.10),
(7, 7, 7, 'ASSIGNED', '2026-01-07 14:42:00', '2026-01-07 14:42:00', 7.10, 7.10),
(8, 8, 8, 'PICKED_UP', '2026-01-08 15:49:00', '2026-01-08 15:49:00', 8.10, 8.10),
(9, 9, 9, 'IN_TRANSIT', '2026-01-09 16:56:00', '2026-01-09 16:56:00', 9.10, 9.10),
(10, 10, 10, 'DELIVERED', '2026-01-10 17:03:00', '2026-01-10 17:03:00', 10.10, 10.10),
(11, 11, 11, 'FAILED', '2026-01-11 18:10:00', '2026-01-11 18:10:00', 11.10, 11.10),
(12, 12, 12, 'CANCELLED', '2026-01-12 19:17:00', '2026-01-12 19:17:00', 12.10, 12.10),
(13, 13, 13, 'ASSIGNED', '2026-01-13 08:24:00', '2026-01-13 08:24:00', 13.10, 13.10),
(14, 14, 14, 'PICKED_UP', '2026-01-14 09:31:00', '2026-01-14 09:31:00', 14.10, 14.10),
(15, 15, 15, 'IN_TRANSIT', '2026-01-15 10:38:00', '2026-01-15 10:38:00', 15.10, 15.10),
(16, 16, 16, 'DELIVERED', '2026-01-16 11:45:00', '2026-01-16 11:45:00', 16.10, 16.10),
(17, 17, 17, 'FAILED', '2026-01-17 12:52:00', '2026-01-17 12:52:00', 17.10, 17.10),
(18, 18, 18, 'CANCELLED', '2026-01-18 13:59:00', '2026-01-18 13:59:00', 18.10, 18.10),
(19, 19, 19, 'ASSIGNED', '2026-01-19 14:06:00', '2026-01-19 14:06:00', 19.10, 19.10),
(20, 20, 20, 'PICKED_UP', '2026-01-20 15:13:00', '2026-01-20 15:13:00', 20.10, 20.10),
(21, 21, 21, 'IN_TRANSIT', '2026-01-21 16:20:00', '2026-01-21 16:20:00', 21.10, 21.10),
(22, 22, 22, 'DELIVERED', '2026-01-22 17:27:00', '2026-01-22 17:27:00', 22.10, 22.10),
(23, 23, 23, 'FAILED', '2026-01-23 18:34:00', '2026-01-23 18:34:00', 23.10, 23.10),
(24, 24, 24, 'CANCELLED', '2026-01-24 19:41:00', '2026-01-24 19:41:00', 24.10, 24.10),
(25, 25, 25, 'ASSIGNED', '2026-01-25 08:48:00', '2026-01-25 08:48:00', 25.10, 25.10),
(26, 26, 26, 'PICKED_UP', '2026-01-26 09:55:00', '2026-01-26 09:55:00', 26.10, 26.10),
(27, 27, 27, 'IN_TRANSIT', '2026-01-27 10:02:00', '2026-01-27 10:02:00', 27.10, 27.10),
(28, 28, 28, 'DELIVERED', '2026-01-28 11:09:00', '2026-01-28 11:09:00', 28.10, 28.10),
(29, 29, 29, 'FAILED', '2026-02-01 12:16:00', '2026-02-01 12:16:00', 29.10, 29.10),
(30, 30, 30, 'CANCELLED', '2026-02-02 13:23:00', '2026-02-02 13:23:00', 30.10, 30.10);

-- Driver
DELETE FROM `Driver`;
INSERT INTO `Driver` (`Person_ID`, `License_Number`, `Vehicle_Type`, `Background_Check_Status`, `Is_Online`, `Rating_Avg`) VALUES
(11, 'QLD-DR-1001', 'Scooter', 'APPROVED', 1, 4.9),
(12, 'QLD-DR-1002', 'Car', 'APPROVED', 1, 4.75),
(13, 'QLD-DR-1003', 'Bike', 'APPROVED', 0, 4.6),
(14, 'QLD-DR-1004', 'Car', 'APPROVED', 1, 4.82),
(15, 'QLD-DR-1005', 'Scooter', 'PENDING', 0, 4.4);

-- Driver_Location_Log
DELETE FROM `Driver_Location_Log`;
INSERT INTO `Driver_Location_Log` (`Log_ID`, `Driver_Person_ID`, `Lat`, `Lng`, `Timestamp`) VALUES
(1, 1, 1.100000, 1.100000, '2026-01-01 08:00:00'),
(2, 2, 2.100000, 2.100000, '2026-01-02 09:07:00'),
(3, 3, 3.100000, 3.100000, '2026-01-03 10:14:00'),
(4, 4, 4.100000, 4.100000, '2026-01-04 11:21:00'),
(5, 5, 5.100000, 5.100000, '2026-01-05 12:28:00'),
(6, 6, 6.100000, 6.100000, '2026-01-06 13:35:00'),
(7, 7, 7.100000, 7.100000, '2026-01-07 14:42:00'),
(8, 8, 8.100000, 8.100000, '2026-01-08 15:49:00'),
(9, 9, 9.100000, 9.100000, '2026-01-09 16:56:00'),
(10, 10, 10.100000, 10.100000, '2026-01-10 17:03:00'),
(11, 11, 11.100000, 11.100000, '2026-01-11 18:10:00'),
(12, 12, 12.100000, 12.100000, '2026-01-12 19:17:00'),
(13, 13, 13.100000, 13.100000, '2026-01-13 08:24:00'),
(14, 14, 14.100000, 14.100000, '2026-01-14 09:31:00'),
(15, 15, 15.100000, 15.100000, '2026-01-15 10:38:00'),
(16, 16, 16.100000, 16.100000, '2026-01-16 11:45:00'),
(17, 17, 17.100000, 17.100000, '2026-01-17 12:52:00'),
(18, 18, 18.100000, 18.100000, '2026-01-18 13:59:00'),
(19, 19, 19.100000, 19.100000, '2026-01-19 14:06:00'),
(20, 20, 20.100000, 20.100000, '2026-01-20 15:13:00'),
(21, 21, 21.100000, 21.100000, '2026-01-21 16:20:00'),
(22, 22, 22.100000, 22.100000, '2026-01-22 17:27:00'),
(23, 23, 23.100000, 23.100000, '2026-01-23 18:34:00'),
(24, 24, 24.100000, 24.100000, '2026-01-24 19:41:00'),
(25, 25, 25.100000, 25.100000, '2026-01-25 08:48:00'),
(26, 26, 26.100000, 26.100000, '2026-01-26 09:55:00'),
(27, 27, 27.100000, 27.100000, '2026-01-27 10:02:00'),
(28, 28, 28.100000, 28.100000, '2026-01-28 11:09:00'),
(29, 29, 29.100000, 29.100000, '2026-02-01 12:16:00'),
(30, 30, 30.100000, 30.100000, '2026-02-02 13:23:00');

-- Driver_Rating
DELETE FROM `Driver_Rating`;
INSERT INTO `Driver_Rating` (`Rating_ID`, `Driver_Person_ID`, `Score`, `Order_ID`) VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 3, 3),
(4, 4, 4, 4),
(5, 5, 5, 5),
(6, 6, 6, 6),
(7, 7, 7, 7),
(8, 8, 8, 8),
(9, 9, 9, 9),
(10, 10, 10, 10),
(11, 11, 11, 11),
(12, 12, 12, 12),
(13, 13, 13, 13),
(14, 14, 14, 14),
(15, 15, 15, 15),
(16, 16, 16, 16),
(17, 17, 17, 17),
(18, 18, 18, 18),
(19, 19, 19, 19),
(20, 20, 20, 20);

-- Item
DELETE FROM `Item`;
INSERT INTO `Item` (`Item_ID`, `Restaurant_ID`, `Name`, `Description`, `Base_Price`, `Is_Available`, `Image_URL`) VALUES
(1, 1, 'Teriyaki Chicken Bowl', 'Grilled chicken and rice', 15.9, 1, '/img/i-teriyaki.png'),
(2, 1, 'Salmon Poke Bowl', 'Salmon poke with edamame', 18.5, 1, '/img/i-poke.png'),
(3, 1, 'Spicy Beef Ramen', 'Rich broth and slow beef', 17.8, 1, '/img/i-ramen-beef.png'),
(4, 1, 'Tonkotsu Ramen', 'Creamy pork broth ramen', 16.9, 1, '/img/i-ramen-tonk.png'),
(5, 1, 'Gyoza 6pc', 'Pan-fried pork gyoza', 9.9, 1, '/img/i-gyoza.png'),
(6, 1, 'Seaweed Salad', 'Sesame seaweed salad', 7.4, 1, '/img/i-seaweed.png'),
(7, 2, 'Beef Birria Tacos', 'Slow-cooked birria tacos', 14.2, 1, '/img/i-birria.png'),
(8, 2, 'Chicken Street Tacos', 'Chargrilled chicken tacos', 13.5, 1, '/img/i-chicken-tacos.png'),
(9, 2, 'Fish Baja Tacos', 'Crispy fish and slaw', 14.8, 1, '/img/i-fish-tacos.png'),
(10, 2, 'Loaded Nachos', 'Beef, cheese, jalapenos', 15.2, 1, '/img/i-nachos.png'),
(11, 2, 'Fries Supreme', 'Loaded fries with salsa', 12.4, 1, '/img/i-fries-supreme.png'),
(12, 2, 'Horchata', 'Sweet cinnamon rice drink', 5.5, 1, '/img/i-horchata.png'),
(13, 3, 'Chicken Alfredo', 'Creamy alfredo fettuccine', 19.2, 1, '/img/i-alfredo.png'),
(14, 3, 'Spaghetti Bolognese', 'Classic beef bolognese', 18.4, 1, '/img/i-bolognese.png'),
(15, 3, 'Pesto Penne', 'Basil pesto and parmesan', 17.5, 1, '/img/i-pesto.png'),
(16, 3, 'Caesar Salad', 'Cos lettuce and croutons', 13.2, 1, '/img/i-caesar.png'),
(17, 3, 'Rocket Pear Salad', 'Rocket, pear and walnuts', 14.1, 1, '/img/i-rocket-pear.png'),
(18, 3, 'Tiramisu', 'Coffee layered dessert', 8.8, 1, '/img/i-tiramisu.png'),
(19, 4, 'Protein Power Bowl', 'Chicken, quinoa and kale', 16.7, 1, '/img/i-power-bowl.png'),
(20, 4, 'Vegan Green Bowl', 'Tofu, rice and greens', 15.6, 1, '/img/i-vegan-bowl.png'),
(21, 4, 'Falafel Wrap', 'Falafel, tahini, veggies', 12.9, 1, '/img/i-falafel-wrap.png'),
(22, 4, 'Chicken Avocado Wrap', 'Chicken with avocado', 13.9, 1, '/img/i-avocado-wrap.png'),
(23, 4, 'Berry Blast Smoothie', 'Mixed berries and yogurt', 7.9, 1, '/img/i-berry-smoothie.png'),
(24, 4, 'Mango Green Smoothie', 'Mango spinach smoothie', 7.7, 1, '/img/i-mango-smoothie.png'),
(25, 5, 'Classic Beef Burger', 'Beef patty with pickles', 14.6, 1, '/img/i-classic-burger.png'),
(26, 5, 'Double Cheeseburger', 'Double beef and cheese', 17.2, 1, '/img/i-double-burger.png'),
(27, 5, 'Crispy Chicken Burger', 'Crispy chicken and slaw', 15.3, 1, '/img/i-chicken-burger.png'),
(28, 5, 'Buffalo Wings 8pc', 'Spicy buffalo wings', 12.8, 1, '/img/i-wings.png'),
(29, 5, 'Loaded Fries', 'Cheese, bacon and aioli', 10.9, 1, '/img/i-loaded-fries.png'),
(30, 5, 'Vanilla Shake', 'Thick vanilla milkshake', 6.9, 1, '/img/i-vanilla-shake.png');

-- Item_Option
DELETE FROM `Item_Option`;
INSERT INTO `Item_Option` (`Option_ID`, `Group_ID`, `Name`, `Price_Delta`) VALUES
(1, 1, 'Item_Option_Name_1', 1.10),
(2, 2, 'Item_Option_Name_2', 2.10),
(3, 3, 'Item_Option_Name_3', 3.10),
(4, 4, 'Item_Option_Name_4', 4.10),
(5, 5, 'Item_Option_Name_5', 5.10),
(6, 6, 'Item_Option_Name_6', 6.10),
(7, 7, 'Item_Option_Name_7', 7.10),
(8, 8, 'Item_Option_Name_8', 8.10),
(9, 9, 'Item_Option_Name_9', 9.10),
(10, 10, 'Item_Option_Name_10', 10.10),
(11, 11, 'Item_Option_Name_11', 11.10),
(12, 12, 'Item_Option_Name_12', 12.10),
(13, 13, 'Item_Option_Name_13', 13.10),
(14, 14, 'Item_Option_Name_14', 14.10),
(15, 15, 'Item_Option_Name_15', 15.10),
(16, 16, 'Item_Option_Name_16', 16.10),
(17, 17, 'Item_Option_Name_17', 17.10),
(18, 18, 'Item_Option_Name_18', 18.10),
(19, 19, 'Item_Option_Name_19', 19.10),
(20, 20, 'Item_Option_Name_20', 20.10),
(21, 21, 'Item_Option_Name_21', 21.10),
(22, 22, 'Item_Option_Name_22', 22.10),
(23, 23, 'Item_Option_Name_23', 23.10),
(24, 24, 'Item_Option_Name_24', 24.10),
(25, 25, 'Item_Option_Name_25', 25.10);

-- Item_Option_Group
DELETE FROM `Item_Option_Group`;
INSERT INTO `Item_Option_Group` (`Group_ID`, `Item_ID`, `Name`, `Min_Select`, `Max_Select`) VALUES
(1, 1, 'Item_Option_Group_Name_1', 1, 1),
(2, 2, 'Item_Option_Group_Name_2', 2, 2),
(3, 3, 'Item_Option_Group_Name_3', 3, 3),
(4, 4, 'Item_Option_Group_Name_4', 4, 4),
(5, 5, 'Item_Option_Group_Name_5', 5, 5),
(6, 6, 'Item_Option_Group_Name_6', 6, 6),
(7, 7, 'Item_Option_Group_Name_7', 7, 7),
(8, 8, 'Item_Option_Group_Name_8', 8, 8),
(9, 9, 'Item_Option_Group_Name_9', 9, 9),
(10, 10, 'Item_Option_Group_Name_10', 10, 10),
(11, 11, 'Item_Option_Group_Name_11', 11, 11),
(12, 12, 'Item_Option_Group_Name_12', 12, 12),
(13, 13, 'Item_Option_Group_Name_13', 13, 13),
(14, 14, 'Item_Option_Group_Name_14', 14, 14),
(15, 15, 'Item_Option_Group_Name_15', 15, 15),
(16, 16, 'Item_Option_Group_Name_16', 16, 16),
(17, 17, 'Item_Option_Group_Name_17', 17, 17),
(18, 18, 'Item_Option_Group_Name_18', 18, 18),
(19, 19, 'Item_Option_Group_Name_19', 19, 19),
(20, 20, 'Item_Option_Group_Name_20', 20, 20);

-- Menu
DELETE FROM `Menu`;
INSERT INTO `Menu` (`Menu_ID`, `Restaurant_ID`, `Name`, `Is_Active`) VALUES
(1, 1, 'Sakura Main Menu', 1),
(2, 2, 'Urban Tacos Menu', 1),
(3, 3, 'Bella Pasta Menu', 1),
(4, 4, 'Green Leaf Menu', 1),
(5, 5, 'Sunrise Menu', 1);

-- Merchant
DELETE FROM `Merchant`;
INSERT INTO `Merchant` (`Person_ID`, `Business_Name`, `Business_Type`, `Tax_ID`, `Approval_Status`) VALUES
(6, 'Sakura Bowl Co', 'Japanese', 'AUS-TAX-2001', 'APPROVED'),
(7, 'Urban Tacos', 'Mexican', 'AUS-TAX-2002', 'APPROVED'),
(8, 'Bella Pasta Bar', 'Italian', 'AUS-TAX-2003', 'APPROVED'),
(9, 'Green Leaf Kitchen', 'Healthy', 'AUS-TAX-2004', 'APPROVED'),
(10, 'Sunrise Burgers', 'Burgers', 'AUS-TAX-2005', 'APPROVED');

-- Order
DELETE FROM `Order`;
INSERT INTO `Order` (`Order_ID`, `Customer_Person_ID`, `Restaurant_ID`, `Delivery_Address_ID`, `Order_Status`, `Subtotal`, `Tax`, `Delivery_Fee`, `Service_Fee`, `Tip`, `Total`, `Created_At`) VALUES
(1, 1, 1, 1, 'PENDING', 1.10, 1.10, 1.10, 1.10, 1.10, 1.10, '2026-01-01 08:00:00'),
(2, 2, 2, 2, 'CONFIRMED', 2.10, 2.10, 2.10, 2.10, 2.10, 2.10, '2026-01-02 09:07:00'),
(3, 3, 3, 3, 'PREPARING', 3.10, 3.10, 3.10, 3.10, 3.10, 3.10, '2026-01-03 10:14:00'),
(4, 4, 4, 4, 'OUT_FOR_DELIVERY', 4.10, 4.10, 4.10, 4.10, 4.10, 4.10, '2026-01-04 11:21:00'),
(5, 5, 5, 5, 'DELIVERED', 5.10, 5.10, 5.10, 5.10, 5.10, 5.10, '2026-01-05 12:28:00'),
(6, 6, 6, 6, 'CANCELLED', 6.10, 6.10, 6.10, 6.10, 6.10, 6.10, '2026-01-06 13:35:00'),
(7, 7, 7, 7, 'PENDING', 7.10, 7.10, 7.10, 7.10, 7.10, 7.10, '2026-01-07 14:42:00'),
(8, 8, 8, 8, 'CONFIRMED', 8.10, 8.10, 8.10, 8.10, 8.10, 8.10, '2026-01-08 15:49:00'),
(9, 9, 9, 9, 'PREPARING', 9.10, 9.10, 9.10, 9.10, 9.10, 9.10, '2026-01-09 16:56:00'),
(10, 10, 10, 10, 'OUT_FOR_DELIVERY', 10.10, 10.10, 10.10, 10.10, 10.10, 10.10, '2026-01-10 17:03:00'),
(11, 11, 11, 11, 'DELIVERED', 11.10, 11.10, 11.10, 11.10, 11.10, 11.10, '2026-01-11 18:10:00'),
(12, 12, 12, 12, 'CANCELLED', 12.10, 12.10, 12.10, 12.10, 12.10, 12.10, '2026-01-12 19:17:00'),
(13, 13, 13, 13, 'PENDING', 13.10, 13.10, 13.10, 13.10, 13.10, 13.10, '2026-01-13 08:24:00'),
(14, 14, 14, 14, 'CONFIRMED', 14.10, 14.10, 14.10, 14.10, 14.10, 14.10, '2026-01-14 09:31:00'),
(15, 15, 15, 15, 'PREPARING', 15.10, 15.10, 15.10, 15.10, 15.10, 15.10, '2026-01-15 10:38:00'),
(16, 16, 16, 16, 'OUT_FOR_DELIVERY', 16.10, 16.10, 16.10, 16.10, 16.10, 16.10, '2026-01-16 11:45:00'),
(17, 17, 17, 17, 'DELIVERED', 17.10, 17.10, 17.10, 17.10, 17.10, 17.10, '2026-01-17 12:52:00'),
(18, 18, 18, 18, 'CANCELLED', 18.10, 18.10, 18.10, 18.10, 18.10, 18.10, '2026-01-18 13:59:00'),
(19, 19, 19, 19, 'PENDING', 19.10, 19.10, 19.10, 19.10, 19.10, 19.10, '2026-01-19 14:06:00'),
(20, 20, 20, 20, 'CONFIRMED', 20.10, 20.10, 20.10, 20.10, 20.10, 20.10, '2026-01-20 15:13:00'),
(21, 21, 21, 21, 'PREPARING', 21.10, 21.10, 21.10, 21.10, 21.10, 21.10, '2026-01-21 16:20:00'),
(22, 22, 22, 22, 'OUT_FOR_DELIVERY', 22.10, 22.10, 22.10, 22.10, 22.10, 22.10, '2026-01-22 17:27:00'),
(23, 23, 23, 23, 'DELIVERED', 23.10, 23.10, 23.10, 23.10, 23.10, 23.10, '2026-01-23 18:34:00'),
(24, 24, 24, 24, 'CANCELLED', 24.10, 24.10, 24.10, 24.10, 24.10, 24.10, '2026-01-24 19:41:00'),
(25, 25, 25, 25, 'PENDING', 25.10, 25.10, 25.10, 25.10, 25.10, 25.10, '2026-01-25 08:48:00'),
(26, 26, 26, 26, 'CONFIRMED', 26.10, 26.10, 26.10, 26.10, 26.10, 26.10, '2026-01-26 09:55:00'),
(27, 27, 27, 27, 'PREPARING', 27.10, 27.10, 27.10, 27.10, 27.10, 27.10, '2026-01-27 10:02:00'),
(28, 28, 28, 28, 'OUT_FOR_DELIVERY', 28.10, 28.10, 28.10, 28.10, 28.10, 28.10, '2026-01-28 11:09:00'),
(29, 29, 29, 29, 'DELIVERED', 29.10, 29.10, 29.10, 29.10, 29.10, 29.10, '2026-02-01 12:16:00'),
(30, 30, 30, 30, 'CANCELLED', 30.10, 30.10, 30.10, 30.10, 30.10, 30.10, '2026-02-02 13:23:00');

-- Order_Item
DELETE FROM `Order_Item`;
INSERT INTO `Order_Item` (`Order_Item_ID`, `Order_ID`, `Item_ID`, `Item_Name_Snapshot`, `Unit_Price`, `Quantity`, `Notes`) VALUES
(1, 1, 1, 'Order_Item_Item_Name_Snapshot_1', 1.10, 1, 'Order_Item_Notes_1'),
(2, 2, 2, 'Order_Item_Item_Name_Snapshot_2', 2.10, 2, 'Order_Item_Notes_2'),
(3, 3, 3, 'Order_Item_Item_Name_Snapshot_3', 3.10, 3, 'Order_Item_Notes_3'),
(4, 4, 4, 'Order_Item_Item_Name_Snapshot_4', 4.10, 4, 'Order_Item_Notes_4'),
(5, 5, 5, 'Order_Item_Item_Name_Snapshot_5', 5.10, 5, 'Order_Item_Notes_5'),
(6, 6, 6, 'Order_Item_Item_Name_Snapshot_6', 6.10, 6, 'Order_Item_Notes_6'),
(7, 7, 7, 'Order_Item_Item_Name_Snapshot_7', 7.10, 7, 'Order_Item_Notes_7'),
(8, 8, 8, 'Order_Item_Item_Name_Snapshot_8', 8.10, 8, 'Order_Item_Notes_8'),
(9, 9, 9, 'Order_Item_Item_Name_Snapshot_9', 9.10, 9, 'Order_Item_Notes_9'),
(10, 10, 10, 'Order_Item_Item_Name_Snapshot_10', 10.10, 10, 'Order_Item_Notes_10'),
(11, 11, 11, 'Order_Item_Item_Name_Snapshot_11', 11.10, 11, 'Order_Item_Notes_11'),
(12, 12, 12, 'Order_Item_Item_Name_Snapshot_12', 12.10, 12, 'Order_Item_Notes_12'),
(13, 13, 13, 'Order_Item_Item_Name_Snapshot_13', 13.10, 13, 'Order_Item_Notes_13'),
(14, 14, 14, 'Order_Item_Item_Name_Snapshot_14', 14.10, 14, 'Order_Item_Notes_14'),
(15, 15, 15, 'Order_Item_Item_Name_Snapshot_15', 15.10, 15, 'Order_Item_Notes_15'),
(16, 16, 16, 'Order_Item_Item_Name_Snapshot_16', 16.10, 16, 'Order_Item_Notes_16'),
(17, 17, 17, 'Order_Item_Item_Name_Snapshot_17', 17.10, 17, 'Order_Item_Notes_17'),
(18, 18, 18, 'Order_Item_Item_Name_Snapshot_18', 18.10, 18, 'Order_Item_Notes_18'),
(19, 19, 19, 'Order_Item_Item_Name_Snapshot_19', 19.10, 19, 'Order_Item_Notes_19'),
(20, 20, 20, 'Order_Item_Item_Name_Snapshot_20', 20.10, 20, 'Order_Item_Notes_20'),
(21, 21, 21, 'Order_Item_Item_Name_Snapshot_21', 21.10, 21, 'Order_Item_Notes_21'),
(22, 22, 22, 'Order_Item_Item_Name_Snapshot_22', 22.10, 22, 'Order_Item_Notes_22'),
(23, 23, 23, 'Order_Item_Item_Name_Snapshot_23', 23.10, 23, 'Order_Item_Notes_23'),
(24, 24, 24, 'Order_Item_Item_Name_Snapshot_24', 24.10, 24, 'Order_Item_Notes_24'),
(25, 25, 25, 'Order_Item_Item_Name_Snapshot_25', 25.10, 25, 'Order_Item_Notes_25'),
(26, 26, 26, 'Order_Item_Item_Name_Snapshot_26', 26.10, 26, 'Order_Item_Notes_26'),
(27, 27, 27, 'Order_Item_Item_Name_Snapshot_27', 27.10, 27, 'Order_Item_Notes_27'),
(28, 28, 28, 'Order_Item_Item_Name_Snapshot_28', 28.10, 28, 'Order_Item_Notes_28'),
(29, 29, 29, 'Order_Item_Item_Name_Snapshot_29', 29.10, 29, 'Order_Item_Notes_29'),
(30, 30, 30, 'Order_Item_Item_Name_Snapshot_30', 30.10, 30, 'Order_Item_Notes_30'),
(31, 31, 31, 'Order_Item_Item_Name_Snapshot_31', 31.10, 31, 'Order_Item_Notes_31'),
(32, 32, 32, 'Order_Item_Item_Name_Snapshot_32', 32.10, 32, 'Order_Item_Notes_32'),
(33, 33, 33, 'Order_Item_Item_Name_Snapshot_33', 33.10, 33, 'Order_Item_Notes_33'),
(34, 34, 34, 'Order_Item_Item_Name_Snapshot_34', 34.10, 34, 'Order_Item_Notes_34'),
(35, 35, 35, 'Order_Item_Item_Name_Snapshot_35', 35.10, 35, 'Order_Item_Notes_35'),
(36, 36, 36, 'Order_Item_Item_Name_Snapshot_36', 36.10, 36, 'Order_Item_Notes_36'),
(37, 37, 37, 'Order_Item_Item_Name_Snapshot_37', 37.10, 37, 'Order_Item_Notes_37'),
(38, 38, 38, 'Order_Item_Item_Name_Snapshot_38', 38.10, 38, 'Order_Item_Notes_38'),
(39, 39, 39, 'Order_Item_Item_Name_Snapshot_39', 39.10, 39, 'Order_Item_Notes_39'),
(40, 40, 40, 'Order_Item_Item_Name_Snapshot_40', 40.10, 40, 'Order_Item_Notes_40');

-- Order_Item_Option
DELETE FROM `Order_Item_Option`;
INSERT INTO `Order_Item_Option` (`ID`, `Order_Item_ID`, `Option_Name`, `Price_Delta`) VALUES
(1, 1, 'Order_Item_Option_Option_Name_1', 1.10),
(2, 2, 'Order_Item_Option_Option_Name_2', 2.10),
(3, 3, 'Order_Item_Option_Option_Name_3', 3.10),
(4, 4, 'Order_Item_Option_Option_Name_4', 4.10),
(5, 5, 'Order_Item_Option_Option_Name_5', 5.10),
(6, 6, 'Order_Item_Option_Option_Name_6', 6.10),
(7, 7, 'Order_Item_Option_Option_Name_7', 7.10),
(8, 8, 'Order_Item_Option_Option_Name_8', 8.10),
(9, 9, 'Order_Item_Option_Option_Name_9', 9.10),
(10, 10, 'Order_Item_Option_Option_Name_10', 10.10),
(11, 11, 'Order_Item_Option_Option_Name_11', 11.10),
(12, 12, 'Order_Item_Option_Option_Name_12', 12.10),
(13, 13, 'Order_Item_Option_Option_Name_13', 13.10),
(14, 14, 'Order_Item_Option_Option_Name_14', 14.10),
(15, 15, 'Order_Item_Option_Option_Name_15', 15.10),
(16, 16, 'Order_Item_Option_Option_Name_16', 16.10),
(17, 17, 'Order_Item_Option_Option_Name_17', 17.10),
(18, 18, 'Order_Item_Option_Option_Name_18', 18.10),
(19, 19, 'Order_Item_Option_Option_Name_19', 19.10),
(20, 20, 'Order_Item_Option_Option_Name_20', 20.10),
(21, 21, 'Order_Item_Option_Option_Name_21', 21.10),
(22, 22, 'Order_Item_Option_Option_Name_22', 22.10),
(23, 23, 'Order_Item_Option_Option_Name_23', 23.10),
(24, 24, 'Order_Item_Option_Option_Name_24', 24.10),
(25, 25, 'Order_Item_Option_Option_Name_25', 25.10),
(26, 26, 'Order_Item_Option_Option_Name_26', 26.10),
(27, 27, 'Order_Item_Option_Option_Name_27', 27.10),
(28, 28, 'Order_Item_Option_Option_Name_28', 28.10),
(29, 29, 'Order_Item_Option_Option_Name_29', 29.10),
(30, 30, 'Order_Item_Option_Option_Name_30', 30.10),
(31, 31, 'Order_Item_Option_Option_Name_31', 31.10),
(32, 32, 'Order_Item_Option_Option_Name_32', 32.10),
(33, 33, 'Order_Item_Option_Option_Name_33', 33.10),
(34, 34, 'Order_Item_Option_Option_Name_34', 34.10),
(35, 35, 'Order_Item_Option_Option_Name_35', 35.10),
(36, 36, 'Order_Item_Option_Option_Name_36', 36.10),
(37, 37, 'Order_Item_Option_Option_Name_37', 37.10),
(38, 38, 'Order_Item_Option_Option_Name_38', 38.10),
(39, 39, 'Order_Item_Option_Option_Name_39', 39.10),
(40, 40, 'Order_Item_Option_Option_Name_40', 40.10);

-- Order_Status_History
DELETE FROM `Order_Status_History`;
INSERT INTO `Order_Status_History` (`History_ID`, `Order_ID`, `Status`, `Changed_At`, `Changed_By_Person_ID`) VALUES
(1, 1, 'PLACED', '2026-01-01 08:00:00', 1),
(2, 2, 'CONFIRMED', '2026-01-02 09:07:00', 2),
(3, 3, 'PREPARING', '2026-01-03 10:14:00', 3),
(4, 4, 'READY_FOR_PICKUP', '2026-01-04 11:21:00', 4),
(5, 5, 'OUT_FOR_DELIVERY', '2026-01-05 12:28:00', 5),
(6, 6, 'DELIVERED', '2026-01-06 13:35:00', 6),
(7, 7, 'CANCELLED', '2026-01-07 14:42:00', 7),
(8, 8, 'REFUNDED', '2026-01-08 15:49:00', 8),
(9, 9, 'PLACED', '2026-01-09 16:56:00', 9),
(10, 10, 'CONFIRMED', '2026-01-10 17:03:00', 10),
(11, 11, 'PREPARING', '2026-01-11 18:10:00', 11),
(12, 12, 'READY_FOR_PICKUP', '2026-01-12 19:17:00', 12),
(13, 13, 'OUT_FOR_DELIVERY', '2026-01-13 08:24:00', 13),
(14, 14, 'DELIVERED', '2026-01-14 09:31:00', 14),
(15, 15, 'CANCELLED', '2026-01-15 10:38:00', 15),
(16, 16, 'REFUNDED', '2026-01-16 11:45:00', 16),
(17, 17, 'PLACED', '2026-01-17 12:52:00', 17),
(18, 18, 'CONFIRMED', '2026-01-18 13:59:00', 18),
(19, 19, 'PREPARING', '2026-01-19 14:06:00', 19),
(20, 20, 'READY_FOR_PICKUP', '2026-01-20 15:13:00', 20),
(21, 21, 'OUT_FOR_DELIVERY', '2026-01-21 16:20:00', 21),
(22, 22, 'DELIVERED', '2026-01-22 17:27:00', 22),
(23, 23, 'CANCELLED', '2026-01-23 18:34:00', 23),
(24, 24, 'REFUNDED', '2026-01-24 19:41:00', 24),
(25, 25, 'PLACED', '2026-01-25 08:48:00', 25),
(26, 26, 'CONFIRMED', '2026-01-26 09:55:00', 26),
(27, 27, 'PREPARING', '2026-01-27 10:02:00', 27),
(28, 28, 'READY_FOR_PICKUP', '2026-01-28 11:09:00', 28),
(29, 29, 'OUT_FOR_DELIVERY', '2026-02-01 12:16:00', 29),
(30, 30, 'DELIVERED', '2026-02-02 13:23:00', 30),
(31, 31, 'CANCELLED', '2026-02-03 14:30:00', 31),
(32, 32, 'REFUNDED', '2026-02-04 15:37:00', 32),
(33, 33, 'PLACED', '2026-02-05 16:44:00', 33),
(34, 34, 'CONFIRMED', '2026-02-06 17:51:00', 34),
(35, 35, 'PREPARING', '2026-02-07 18:58:00', 35),
(36, 36, 'READY_FOR_PICKUP', '2026-02-08 19:05:00', 36),
(37, 37, 'OUT_FOR_DELIVERY', '2026-02-09 08:12:00', 37),
(38, 38, 'DELIVERED', '2026-02-10 09:19:00', 38),
(39, 39, 'CANCELLED', '2026-02-11 10:26:00', 39),
(40, 40, 'REFUNDED', '2026-02-12 11:33:00', 40);

-- Payment
DELETE FROM `Payment`;
INSERT INTO `Payment` (`Payment_ID`, `Order_ID`, `Provider`, `Provider_Transaction_ID`, `Amount`, `Currency`, `Status`, `Paid_At`) VALUES
(1, 1, 'Payment_Provider_1', 'Payment_Provider_Transaction_ID_1', 1.10, 'Payment_Currency_1', 'PENDING', '2026-01-01 08:00:00'),
(2, 2, 'Payment_Provider_2', 'Payment_Provider_Transaction_ID_2', 2.10, 'Payment_Currency_2', 'AUTHORIZED', '2026-01-02 09:07:00'),
(3, 3, 'Payment_Provider_3', 'Payment_Provider_Transaction_ID_3', 3.10, 'Payment_Currency_3', 'PAID', '2026-01-03 10:14:00'),
(4, 4, 'Payment_Provider_4', 'Payment_Provider_Transaction_ID_4', 4.10, 'Payment_Currency_4', 'FAILED', '2026-01-04 11:21:00'),
(5, 5, 'Payment_Provider_5', 'Payment_Provider_Transaction_ID_5', 5.10, 'Payment_Currency_5', 'REFUNDED', '2026-01-05 12:28:00'),
(6, 6, 'Payment_Provider_6', 'Payment_Provider_Transaction_ID_6', 6.10, 'Payment_Currency_6', 'PARTIALLY_REFUNDED', '2026-01-06 13:35:00'),
(7, 7, 'Payment_Provider_7', 'Payment_Provider_Transaction_ID_7', 7.10, 'Payment_Currency_7', 'PENDING', '2026-01-07 14:42:00'),
(8, 8, 'Payment_Provider_8', 'Payment_Provider_Transaction_ID_8', 8.10, 'Payment_Currency_8', 'AUTHORIZED', '2026-01-08 15:49:00'),
(9, 9, 'Payment_Provider_9', 'Payment_Provider_Transaction_ID_9', 9.10, 'Payment_Currency_9', 'PAID', '2026-01-09 16:56:00'),
(10, 10, 'Payment_Provider_10', 'Payment_Provider_Transaction_ID_10', 10.10, 'Payment_Currency_10', 'FAILED', '2026-01-10 17:03:00'),
(11, 11, 'Payment_Provider_11', 'Payment_Provider_Transaction_ID_11', 11.10, 'Payment_Currency_11', 'REFUNDED', '2026-01-11 18:10:00'),
(12, 12, 'Payment_Provider_12', 'Payment_Provider_Transaction_ID_12', 12.10, 'Payment_Currency_12', 'PARTIALLY_REFUNDED', '2026-01-12 19:17:00'),
(13, 13, 'Payment_Provider_13', 'Payment_Provider_Transaction_ID_13', 13.10, 'Payment_Currency_13', 'PENDING', '2026-01-13 08:24:00'),
(14, 14, 'Payment_Provider_14', 'Payment_Provider_Transaction_ID_14', 14.10, 'Payment_Currency_14', 'AUTHORIZED', '2026-01-14 09:31:00'),
(15, 15, 'Payment_Provider_15', 'Payment_Provider_Transaction_ID_15', 15.10, 'Payment_Currency_15', 'PAID', '2026-01-15 10:38:00'),
(16, 16, 'Payment_Provider_16', 'Payment_Provider_Transaction_ID_16', 16.10, 'Payment_Currency_16', 'FAILED', '2026-01-16 11:45:00'),
(17, 17, 'Payment_Provider_17', 'Payment_Provider_Transaction_ID_17', 17.10, 'Payment_Currency_17', 'REFUNDED', '2026-01-17 12:52:00'),
(18, 18, 'Payment_Provider_18', 'Payment_Provider_Transaction_ID_18', 18.10, 'Payment_Currency_18', 'PARTIALLY_REFUNDED', '2026-01-18 13:59:00'),
(19, 19, 'Payment_Provider_19', 'Payment_Provider_Transaction_ID_19', 19.10, 'Payment_Currency_19', 'PENDING', '2026-01-19 14:06:00'),
(20, 20, 'Payment_Provider_20', 'Payment_Provider_Transaction_ID_20', 20.10, 'Payment_Currency_20', 'AUTHORIZED', '2026-01-20 15:13:00'),
(21, 21, 'Payment_Provider_21', 'Payment_Provider_Transaction_ID_21', 21.10, 'Payment_Currency_21', 'PAID', '2026-01-21 16:20:00'),
(22, 22, 'Payment_Provider_22', 'Payment_Provider_Transaction_ID_22', 22.10, 'Payment_Currency_22', 'FAILED', '2026-01-22 17:27:00'),
(23, 23, 'Payment_Provider_23', 'Payment_Provider_Transaction_ID_23', 23.10, 'Payment_Currency_23', 'REFUNDED', '2026-01-23 18:34:00'),
(24, 24, 'Payment_Provider_24', 'Payment_Provider_Transaction_ID_24', 24.10, 'Payment_Currency_24', 'PARTIALLY_REFUNDED', '2026-01-24 19:41:00'),
(25, 25, 'Payment_Provider_25', 'Payment_Provider_Transaction_ID_25', 25.10, 'Payment_Currency_25', 'PENDING', '2026-01-25 08:48:00'),
(26, 26, 'Payment_Provider_26', 'Payment_Provider_Transaction_ID_26', 26.10, 'Payment_Currency_26', 'AUTHORIZED', '2026-01-26 09:55:00'),
(27, 27, 'Payment_Provider_27', 'Payment_Provider_Transaction_ID_27', 27.10, 'Payment_Currency_27', 'PAID', '2026-01-27 10:02:00'),
(28, 28, 'Payment_Provider_28', 'Payment_Provider_Transaction_ID_28', 28.10, 'Payment_Currency_28', 'FAILED', '2026-01-28 11:09:00'),
(29, 29, 'Payment_Provider_29', 'Payment_Provider_Transaction_ID_29', 29.10, 'Payment_Currency_29', 'REFUNDED', '2026-02-01 12:16:00'),
(30, 30, 'Payment_Provider_30', 'Payment_Provider_Transaction_ID_30', 30.10, 'Payment_Currency_30', 'PARTIALLY_REFUNDED', '2026-02-02 13:23:00');

-- Person
DELETE FROM `Person`;
INSERT INTO `Person` (`Person_ID`, `First_Name`, `Last_Name`, `Email`, `Phone`, `Password_Hash`, `Account_Status`, `Created_At`) VALUES
(1, 'Emma', 'Nguyen', 'emma.nguyen@feedme.com', 40111001, 'hash_emma', 'ACTIVE', '2026-02-01 09:00:00'),
(2, 'Liam', 'Carter', 'liam.carter@feedme.com', 40111002, 'hash_liam', 'ACTIVE', '2026-02-01 09:05:00'),
(3, 'Sophia', 'Wilson', 'sophia.wilson@feedme.com', 40111003, 'hash_sophia', 'ACTIVE', '2026-02-01 09:10:00'),
(4, 'Noah', 'Brown', 'noah.brown@feedme.com', 40111004, 'hash_noah', 'ACTIVE', '2026-02-01 09:15:00'),
(5, 'Ava', 'Patel', 'ava.patel@feedme.com', 40111005, 'hash_ava', 'ACTIVE', '2026-02-01 09:20:00'),
(6, 'Mason', 'Lee', 'mason.lee@feedme.com', 40111006, 'hash_mason', 'ACTIVE', '2026-02-02 08:30:00'),
(7, 'Charlotte', 'Davis', 'charlotte.davis@feedme.com', 40111007, 'hash_charlotte', 'ACTIVE', '2026-02-02 08:40:00'),
(8, 'Ethan', 'Miller', 'ethan.miller@feedme.com', 40111008, 'hash_ethan', 'ACTIVE', '2026-02-02 08:50:00'),
(9, 'Mia', 'Lopez', 'mia.lopez@feedme.com', 40111009, 'hash_mia', 'ACTIVE', '2026-02-02 09:00:00'),
(10, 'Lucas', 'King', 'lucas.king@feedme.com', 40111010, 'hash_lucas', 'ACTIVE', '2026-02-02 09:10:00'),
(11, 'Harper', 'Scott', 'harper.scott@feedme.com', 40111011, 'hash_harper', 'ACTIVE', '2026-02-03 10:00:00'),
(12, 'James', 'Green', 'james.green@feedme.com', 40111012, 'hash_james', 'ACTIVE', '2026-02-03 10:10:00'),
(13, 'Amelia', 'Hall', 'amelia.hall@feedme.com', 40111013, 'hash_amelia', 'ACTIVE', '2026-02-03 10:20:00'),
(14, 'Benjamin', 'Young', 'ben.young@feedme.com', 40111014, 'hash_ben', 'ACTIVE', '2026-02-03 10:30:00'),
(15, 'Ella', 'Allen', 'ella.allen@feedme.com', 40111015, 'hash_ella', 'ACTIVE', '2026-02-03 10:40:00');

-- Rating
DELETE FROM `Rating`;
INSERT INTO `Rating` (`Rating_ID`, `Order_ID`, `Customer_Person_ID`, `Comment`, `Created_At`) VALUES
(1, 1, 1, 'Rating_Comment_1', '2026-01-01 08:00:00'),
(2, 2, 2, 'Rating_Comment_2', '2026-01-02 09:07:00'),
(3, 3, 3, 'Rating_Comment_3', '2026-01-03 10:14:00'),
(4, 4, 4, 'Rating_Comment_4', '2026-01-04 11:21:00'),
(5, 5, 5, 'Rating_Comment_5', '2026-01-05 12:28:00'),
(6, 6, 6, 'Rating_Comment_6', '2026-01-06 13:35:00'),
(7, 7, 7, 'Rating_Comment_7', '2026-01-07 14:42:00'),
(8, 8, 8, 'Rating_Comment_8', '2026-01-08 15:49:00'),
(9, 9, 9, 'Rating_Comment_9', '2026-01-09 16:56:00'),
(10, 10, 10, 'Rating_Comment_10', '2026-01-10 17:03:00'),
(11, 11, 11, 'Rating_Comment_11', '2026-01-11 18:10:00'),
(12, 12, 12, 'Rating_Comment_12', '2026-01-12 19:17:00'),
(13, 13, 13, 'Rating_Comment_13', '2026-01-13 08:24:00'),
(14, 14, 14, 'Rating_Comment_14', '2026-01-14 09:31:00'),
(15, 15, 15, 'Rating_Comment_15', '2026-01-15 10:38:00'),
(16, 16, 16, 'Rating_Comment_16', '2026-01-16 11:45:00'),
(17, 17, 17, 'Rating_Comment_17', '2026-01-17 12:52:00'),
(18, 18, 18, 'Rating_Comment_18', '2026-01-18 13:59:00'),
(19, 19, 19, 'Rating_Comment_19', '2026-01-19 14:06:00'),
(20, 20, 20, 'Rating_Comment_20', '2026-01-20 15:13:00');

-- Refund
DELETE FROM `Refund`;
INSERT INTO `Refund` (`Refund_ID`, `Payment_ID`, `Amount`, `Reason`, `Status`, `Processed_At`) VALUES
(1, 1, 1.10, 'Refund_Reason_1', 'REQUESTED', '2026-01-01 08:00:00'),
(2, 2, 2.10, 'Refund_Reason_2', 'APPROVED', '2026-01-02 09:07:00'),
(3, 3, 3.10, 'Refund_Reason_3', 'REJECTED', '2026-01-03 10:14:00'),
(4, 4, 4.10, 'Refund_Reason_4', 'PROCESSED', '2026-01-04 11:21:00'),
(5, 5, 5.10, 'Refund_Reason_5', 'REQUESTED', '2026-01-05 12:28:00'),
(6, 6, 6.10, 'Refund_Reason_6', 'APPROVED', '2026-01-06 13:35:00'),
(7, 7, 7.10, 'Refund_Reason_7', 'REJECTED', '2026-01-07 14:42:00'),
(8, 8, 8.10, 'Refund_Reason_8', 'PROCESSED', '2026-01-08 15:49:00'),
(9, 9, 9.10, 'Refund_Reason_9', 'REQUESTED', '2026-01-09 16:56:00'),
(10, 10, 10.10, 'Refund_Reason_10', 'APPROVED', '2026-01-10 17:03:00'),
(11, 11, 11.10, 'Refund_Reason_11', 'REJECTED', '2026-01-11 18:10:00'),
(12, 12, 12.10, 'Refund_Reason_12', 'PROCESSED', '2026-01-12 19:17:00'),
(13, 13, 13.10, 'Refund_Reason_13', 'REQUESTED', '2026-01-13 08:24:00'),
(14, 14, 14.10, 'Refund_Reason_14', 'APPROVED', '2026-01-14 09:31:00'),
(15, 15, 15.10, 'Refund_Reason_15', 'REJECTED', '2026-01-15 10:38:00'),
(16, 16, 16.10, 'Refund_Reason_16', 'PROCESSED', '2026-01-16 11:45:00'),
(17, 17, 17.10, 'Refund_Reason_17', 'REQUESTED', '2026-01-17 12:52:00'),
(18, 18, 18.10, 'Refund_Reason_18', 'APPROVED', '2026-01-18 13:59:00'),
(19, 19, 19.10, 'Refund_Reason_19', 'REJECTED', '2026-01-19 14:06:00'),
(20, 20, 20.10, 'Refund_Reason_20', 'PROCESSED', '2026-01-20 15:13:00');

-- Restaurant
DELETE FROM `Restaurant`;
INSERT INTO `Restaurant` (`Restaurant_ID`, `Merchant_Person_ID`, `Name`, `Phone`, `Description`, `Logo_URL`, `Status`, `Service_Radius_KM`) VALUES
(1, 6, 'Sakura Bowl', 47221001, 'Fresh rice bowls and ramen', '/img/sakura-logo.png', 'ACTIVE', 8.5),
(2, 7, 'Urban Tacos', 47221002, 'Street tacos and loaded fries', '/img/taco-logo.png', 'ACTIVE', 7),
(3, 8, 'Bella Pasta', 47221003, 'Handmade pasta and salads', '/img/pasta-logo.png', 'ACTIVE', 6.5),
(4, 9, 'Green Leaf', 47221004, 'Healthy bowls and wraps', '/img/green-logo.png', 'ACTIVE', 9),
(5, 10, 'Sunrise Burgers', 47221005, 'Burgers, wings and shakes', '/img/burger-logo.png', 'ACTIVE', 10);

-- Restaurant_Rating_ID
DELETE FROM `Restaurant_Rating_ID`;
INSERT INTO `Restaurant_Rating_ID` (`Rating_ID`, `Restaurant_ID`, `Score`, `Order_ID`) VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 3, 3),
(4, 4, 4, 4),
(5, 5, 5, 5),
(6, 6, 6, 6),
(7, 7, 7, 7),
(8, 8, 8, 8),
(9, 9, 9, 9),
(10, 10, 10, 10),
(11, 11, 11, 11),
(12, 12, 12, 12),
(13, 13, 13, 13),
(14, 14, 14, 14),
(15, 15, 15, 15),
(16, 16, 16, 16),
(17, 17, 17, 17),
(18, 18, 18, 18),
(19, 19, 19, 19),
(20, 20, 20, 20);

-- Support_Ticket
DELETE FROM `Support_Ticket`;
INSERT INTO `Support_Ticket` (`Ticket_ID`, `Admin_Person_ID`, `Customer_ID`, `Issue_Type`, `Status`, `Created_At`, `Resolved_At`) VALUES
(1, 1, 1, 'Support_Ticket_Issue_Type_1', 'OPEN', '2026-01-01 08:00:00', '2026-01-01 08:00:00'),
(2, 2, 2, 'Support_Ticket_Issue_Type_2', 'ASSIGNED', '2026-01-02 09:07:00', '2026-01-02 09:07:00'),
(3, 3, 3, 'Support_Ticket_Issue_Type_3', 'IN_PROGRESS', '2026-01-03 10:14:00', '2026-01-03 10:14:00'),
(4, 4, 4, 'Support_Ticket_Issue_Type_4', 'WAITING_FOR_CUSTOMER', '2026-01-04 11:21:00', '2026-01-04 11:21:00'),
(5, 5, 5, 'Support_Ticket_Issue_Type_5', 'RESOLVED', '2026-01-05 12:28:00', '2026-01-05 12:28:00'),
(6, 6, 6, 'Support_Ticket_Issue_Type_6', 'CLOSED', '2026-01-06 13:35:00', '2026-01-06 13:35:00'),
(7, 7, 7, 'Support_Ticket_Issue_Type_7', 'OPEN', '2026-01-07 14:42:00', '2026-01-07 14:42:00'),
(8, 8, 8, 'Support_Ticket_Issue_Type_8', 'ASSIGNED', '2026-01-08 15:49:00', '2026-01-08 15:49:00'),
(9, 9, 9, 'Support_Ticket_Issue_Type_9', 'IN_PROGRESS', '2026-01-09 16:56:00', '2026-01-09 16:56:00'),
(10, 10, 10, 'Support_Ticket_Issue_Type_10', 'WAITING_FOR_CUSTOMER', '2026-01-10 17:03:00', '2026-01-10 17:03:00'),
(11, 11, 11, 'Support_Ticket_Issue_Type_11', 'RESOLVED', '2026-01-11 18:10:00', '2026-01-11 18:10:00'),
(12, 12, 12, 'Support_Ticket_Issue_Type_12', 'CLOSED', '2026-01-12 19:17:00', '2026-01-12 19:17:00'),
(13, 13, 13, 'Support_Ticket_Issue_Type_13', 'OPEN', '2026-01-13 08:24:00', '2026-01-13 08:24:00'),
(14, 14, 14, 'Support_Ticket_Issue_Type_14', 'ASSIGNED', '2026-01-14 09:31:00', '2026-01-14 09:31:00'),
(15, 15, 15, 'Support_Ticket_Issue_Type_15', 'IN_PROGRESS', '2026-01-15 10:38:00', '2026-01-15 10:38:00'),
(16, 16, 16, 'Support_Ticket_Issue_Type_16', 'WAITING_FOR_CUSTOMER', '2026-01-16 11:45:00', '2026-01-16 11:45:00'),
(17, 17, 17, 'Support_Ticket_Issue_Type_17', 'RESOLVED', '2026-01-17 12:52:00', '2026-01-17 12:52:00'),
(18, 18, 18, 'Support_Ticket_Issue_Type_18', 'CLOSED', '2026-01-18 13:59:00', '2026-01-18 13:59:00'),
(19, 19, 19, 'Support_Ticket_Issue_Type_19', 'OPEN', '2026-01-19 14:06:00', '2026-01-19 14:06:00'),
(20, 20, 20, 'Support_Ticket_Issue_Type_20', 'ASSIGNED', '2026-01-20 15:13:00', '2026-01-20 15:13:00');

SET FOREIGN_KEY_CHECKS = 1;
