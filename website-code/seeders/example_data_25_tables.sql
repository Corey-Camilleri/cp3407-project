-- Auto-generated sample data: 5 rows per table
USE `cp3407`;
SET FOREIGN_KEY_CHECKS = 0;

-- Address
DELETE FROM `Address`;
INSERT INTO `Address` (`Address_ID`, `Person_ID`, `Address_Type`, `Street`, `City`, `State`, `Zip`, `Lat`, `Lng`, `Instructions`) VALUES
(1, 1, 'CUSTOMER', 'Address_Street_1', 'Address_City_1', 'Address_State_1', 'Address_Zip_1', 1.100000, 1.100000, 'Address_Instructions_1'),
(2, 2, 'RESTAURANT', 'Address_Street_2', 'Address_City_2', 'Address_State_2', 'Address_Zip_2', 2.100000, 2.100000, 'Address_Instructions_2'),
(3, 3, 'CUSTOMER', 'Address_Street_3', 'Address_City_3', 'Address_State_3', 'Address_Zip_3', 3.100000, 3.100000, 'Address_Instructions_3'),
(4, 4, 'RESTAURANT', 'Address_Street_4', 'Address_City_4', 'Address_State_4', 'Address_Zip_4', 4.100000, 4.100000, 'Address_Instructions_4'),
(5, 5, 'CUSTOMER', 'Address_Street_5', 'Address_City_5', 'Address_State_5', 'Address_Zip_5', 5.100000, 5.100000, 'Address_Instructions_5');

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
(1, 1, 1, 'ASSIGNED', '2026-01-01 10:00:00', '2026-01-01 10:00:00', 1.10, 1.10),
(2, 2, 2, 'PICKED_UP', '2026-01-02 10:00:00', '2026-01-02 10:00:00', 2.10, 2.10),
(3, 3, 3, 'IN_TRANSIT', '2026-01-03 10:00:00', '2026-01-03 10:00:00', 3.10, 3.10),
(4, 4, 4, 'DELIVERED', '2026-01-04 10:00:00', '2026-01-04 10:00:00', 4.10, 4.10),
(5, 5, 5, 'FAILED', '2026-01-05 10:00:00', '2026-01-05 10:00:00', 5.10, 5.10);

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
(1, 1, 1.100000, 1.100000, '2026-01-01 10:00:00'),
(2, 2, 2.100000, 2.100000, '2026-01-02 10:00:00'),
(3, 3, 3.100000, 3.100000, '2026-01-03 10:00:00'),
(4, 4, 4.100000, 4.100000, '2026-01-04 10:00:00'),
(5, 5, 5.100000, 5.100000, '2026-01-05 10:00:00');

-- Driver_Rating
DELETE FROM `Driver_Rating`;
INSERT INTO `Driver_Rating` (`Rating_ID`, `Driver_Person_ID`, `Score`, `Order_ID`) VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 3, 3),
(4, 4, 4, 4),
(5, 5, 5, 5);

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
(5, 5, 'Item_Option_Name_5', 5.10);

-- Item_Option_Group
DELETE FROM `Item_Option_Group`;
INSERT INTO `Item_Option_Group` (`Group_ID`, `Item_ID`, `Name`, `Min_Select`, `Max_Select`) VALUES
(1, 1, 'Item_Option_Group_Name_1', 1, 1),
(2, 2, 'Item_Option_Group_Name_2', 2, 2),
(3, 3, 'Item_Option_Group_Name_3', 3, 3),
(4, 4, 'Item_Option_Group_Name_4', 4, 4),
(5, 5, 'Item_Option_Group_Name_5', 5, 5);

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
(1, 1, 1, 1, 'PENDING', 1.10, 1.10, 1.10, 1.10, 1.10, 1.10, '2026-01-01 10:00:00'),
(2, 2, 2, 2, 'CONFIRMED', 2.10, 2.10, 2.10, 2.10, 2.10, 2.10, '2026-01-02 10:00:00'),
(3, 3, 3, 3, 'PREPARING', 3.10, 3.10, 3.10, 3.10, 3.10, 3.10, '2026-01-03 10:00:00'),
(4, 4, 4, 4, 'OUT_FOR_DELIVERY', 4.10, 4.10, 4.10, 4.10, 4.10, 4.10, '2026-01-04 10:00:00'),
(5, 5, 5, 5, 'DELIVERED', 5.10, 5.10, 5.10, 5.10, 5.10, 5.10, '2026-01-05 10:00:00');

-- Order_Item
DELETE FROM `Order_Item`;
INSERT INTO `Order_Item` (`Order_Item_ID`, `Order_ID`, `Item_ID`, `Item_Name_Snapshot`, `Unit_Price`, `Quantity`, `Notes`) VALUES
(1, 1, 1, 'Order_Item_Item_Name_Snapshot_1', 1.10, 1, 'Order_Item_Notes_1'),
(2, 2, 2, 'Order_Item_Item_Name_Snapshot_2', 2.10, 2, 'Order_Item_Notes_2'),
(3, 3, 3, 'Order_Item_Item_Name_Snapshot_3', 3.10, 3, 'Order_Item_Notes_3'),
(4, 4, 4, 'Order_Item_Item_Name_Snapshot_4', 4.10, 4, 'Order_Item_Notes_4'),
(5, 5, 5, 'Order_Item_Item_Name_Snapshot_5', 5.10, 5, 'Order_Item_Notes_5');

-- Order_Item_Option
DELETE FROM `Order_Item_Option`;
INSERT INTO `Order_Item_Option` (`ID`, `Order_Item_ID`, `Option_Name`, `Price_Delta`) VALUES
(1, 1, 'Order_Item_Option_Option_Name_1', 1.10),
(2, 2, 'Order_Item_Option_Option_Name_2', 2.10),
(3, 3, 'Order_Item_Option_Option_Name_3', 3.10),
(4, 4, 'Order_Item_Option_Option_Name_4', 4.10),
(5, 5, 'Order_Item_Option_Option_Name_5', 5.10);

-- Order_Status_History
DELETE FROM `Order_Status_History`;
INSERT INTO `Order_Status_History` (`History_ID`, `Order_ID`, `Status`, `Changed_At`, `Changed_By_Person_ID`) VALUES
(1, 1, 'PLACED', '2026-01-01 10:00:00', 1),
(2, 2, 'CONFIRMED', '2026-01-02 10:00:00', 2),
(3, 3, 'PREPARING', '2026-01-03 10:00:00', 3),
(4, 4, 'READY_FOR_PICKUP', '2026-01-04 10:00:00', 4),
(5, 5, 'OUT_FOR_DELIVERY', '2026-01-05 10:00:00', 5);

-- Payment
DELETE FROM `Payment`;
INSERT INTO `Payment` (`Payment_ID`, `Order_ID`, `Provider`, `Provider_Transaction_ID`, `Amount`, `Currency`, `Status`, `Paid_At`) VALUES
(1, 1, 'Payment_Provider_1', 'Payment_Provider_Transaction_ID_1', 1.10, 'Payment_Currency_1', 'PENDING', '2026-01-01 10:00:00'),
(2, 2, 'Payment_Provider_2', 'Payment_Provider_Transaction_ID_2', 2.10, 'Payment_Currency_2', 'AUTHORIZED', '2026-01-02 10:00:00'),
(3, 3, 'Payment_Provider_3', 'Payment_Provider_Transaction_ID_3', 3.10, 'Payment_Currency_3', 'PAID', '2026-01-03 10:00:00'),
(4, 4, 'Payment_Provider_4', 'Payment_Provider_Transaction_ID_4', 4.10, 'Payment_Currency_4', 'FAILED', '2026-01-04 10:00:00'),
(5, 5, 'Payment_Provider_5', 'Payment_Provider_Transaction_ID_5', 5.10, 'Payment_Currency_5', 'REFUNDED', '2026-01-05 10:00:00');

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
(1, 1, 1, 'Rating_Comment_1', '2026-01-01 10:00:00'),
(2, 2, 2, 'Rating_Comment_2', '2026-01-02 10:00:00'),
(3, 3, 3, 'Rating_Comment_3', '2026-01-03 10:00:00'),
(4, 4, 4, 'Rating_Comment_4', '2026-01-04 10:00:00'),
(5, 5, 5, 'Rating_Comment_5', '2026-01-05 10:00:00');

-- Refund
DELETE FROM `Refund`;
INSERT INTO `Refund` (`Refund_ID`, `Payment_ID`, `Amount`, `Reason`, `Status`, `Processed_At`) VALUES
(1, 1, 1.10, 'Refund_Reason_1', 'REQUESTED', '2026-01-01 10:00:00'),
(2, 2, 2.10, 'Refund_Reason_2', 'APPROVED', '2026-01-02 10:00:00'),
(3, 3, 3.10, 'Refund_Reason_3', 'REJECTED', '2026-01-03 10:00:00'),
(4, 4, 4.10, 'Refund_Reason_4', 'PROCESSED', '2026-01-04 10:00:00'),
(5, 5, 5.10, 'Refund_Reason_5', 'REQUESTED', '2026-01-05 10:00:00');

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
(5, 5, 5, 5);

-- Support_Ticket
DELETE FROM `Support_Ticket`;
INSERT INTO `Support_Ticket` (`Ticket_ID`, `Admin_Person_ID`, `Customer_ID`, `Issue_Type`, `Status`, `Created_At`, `Resolved_At`) VALUES
(1, 1, 1, 'Support_Ticket_Issue_Type_1', 'OPEN', '2026-01-01 10:00:00', '2026-01-01 10:00:00'),
(2, 2, 2, 'Support_Ticket_Issue_Type_2', 'ASSIGNED', '2026-01-02 10:00:00', '2026-01-02 10:00:00'),
(3, 3, 3, 'Support_Ticket_Issue_Type_3', 'IN_PROGRESS', '2026-01-03 10:00:00', '2026-01-03 10:00:00'),
(4, 4, 4, 'Support_Ticket_Issue_Type_4', 'WAITING_FOR_CUSTOMER', '2026-01-04 10:00:00', '2026-01-04 10:00:00'),
(5, 5, 5, 'Support_Ticket_Issue_Type_5', 'RESOLVED', '2026-01-05 10:00:00', '2026-01-05 10:00:00');

SET FOREIGN_KEY_CHECKS = 1;
