-- Auto-generated sample data: 5 rows per table
USE `cp3407_staging`;
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
(1, 'Admin_Role_Type_1', 'Admin_Access_Level_1'),
(2, 'Admin_Role_Type_2', 'Admin_Access_Level_2'),
(3, 'Admin_Role_Type_3', 'Admin_Access_Level_3'),
(4, 'Admin_Role_Type_4', 'Admin_Access_Level_4'),
(5, 'Admin_Role_Type_5', 'Admin_Access_Level_5');

-- Category
DELETE FROM `Category`;
INSERT INTO `Category` (`Category_ID`, `Menu_ID`, `Name`, `Sort_Order`) VALUES
(1, 1, 'Category_Name_1', 1),
(2, 2, 'Category_Name_2', 2),
(3, 3, 'Category_Name_3', 3),
(4, 4, 'Category_Name_4', 4),
(5, 5, 'Category_Name_5', 5);

-- Category_Item
DELETE FROM `Category_Item`;
INSERT INTO `Category_Item` (`Item_ID`, `Category_ID`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Customer
DELETE FROM `Customer`;
INSERT INTO `Customer` (`Person_ID`, `Default_Address_ID`, `Loyalty_Points`, `Preferred_Payment_Method`) VALUES
(1, 1, 1, 'Customer_Preferred_Payment_Method_1'),
(2, 2, 2, 'Customer_Preferred_Payment_Method_2'),
(3, 3, 3, 'Customer_Preferred_Payment_Method_3'),
(4, 4, 4, 'Customer_Preferred_Payment_Method_4'),
(5, 5, 5, 'Customer_Preferred_Payment_Method_5');

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
(1, 'Driver_License_Number_1', 'Driver_Vehicle_Type_1', 'PENDING', 1, 1.10),
(2, 'Driver_License_Number_2', 'Driver_Vehicle_Type_2', 'APPROVED', 0, 2.10),
(3, 'Driver_License_Number_3', 'Driver_Vehicle_Type_3', 'REJECTED', 1, 3.10),
(4, 'Driver_License_Number_4', 'Driver_Vehicle_Type_4', 'PENDING', 0, 4.10),
(5, 'Driver_License_Number_5', 'Driver_Vehicle_Type_5', 'APPROVED', 1, 5.10);

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
(1, 1, 'Item_Name_1', 'Item_Description_1', 1.10, 1, 'Item_Image_URL_1'),
(2, 2, 'Item_Name_2', 'Item_Description_2', 2.10, 0, 'Item_Image_URL_2'),
(3, 3, 'Item_Name_3', 'Item_Description_3', 3.10, 1, 'Item_Image_URL_3'),
(4, 4, 'Item_Name_4', 'Item_Description_4', 4.10, 0, 'Item_Image_URL_4'),
(5, 5, 'Item_Name_5', 'Item_Description_5', 5.10, 1, 'Item_Image_URL_5');

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
(1, 1, 'Menu_Name_1', 1),
(2, 2, 'Menu_Name_2', 0),
(3, 3, 'Menu_Name_3', 1),
(4, 4, 'Menu_Name_4', 0),
(5, 5, 'Menu_Name_5', 1);

-- Merchant
DELETE FROM `Merchant`;
INSERT INTO `Merchant` (`Person_ID`, `Business_Name`, `Business_Type`, `Tax_ID`, `Approval_Status`) VALUES
(1, 'Merchant_Business_Name_1', 'Merchant_Business_Type_1', 'Merchant_Tax_ID_1', 'PENDING'),
(2, 'Merchant_Business_Name_2', 'Merchant_Business_Type_2', 'Merchant_Tax_ID_2', 'APPROVED'),
(3, 'Merchant_Business_Name_3', 'Merchant_Business_Type_3', 'Merchant_Tax_ID_3', 'REJECTED'),
(4, 'Merchant_Business_Name_4', 'Merchant_Business_Type_4', 'Merchant_Tax_ID_4', 'SUSPENDED'),
(5, 'Merchant_Business_Name_5', 'Merchant_Business_Type_5', 'Merchant_Tax_ID_5', 'PENDING');

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
(1, 'Person_First_Name_1', 'Person_Last_Name_1', 'Person_Email_1', 1, 'Person_Password_Hash_1', 'ACTIVE', '2026-01-01 10:00:00'),
(2, 'Person_First_Name_2', 'Person_Last_Name_2', 'Person_Email_2', 2, 'Person_Password_Hash_2', 'SUSPENDED', '2026-01-02 10:00:00'),
(3, 'Person_First_Name_3', 'Person_Last_Name_3', 'Person_Email_3', 3, 'Person_Password_Hash_3', 'DEACTIVATED', '2026-01-03 10:00:00'),
(4, 'Person_First_Name_4', 'Person_Last_Name_4', 'Person_Email_4', 4, 'Person_Password_Hash_4', 'BANNED', '2026-01-04 10:00:00'),
(5, 'Person_First_Name_5', 'Person_Last_Name_5', 'Person_Email_5', 5, 'Person_Password_Hash_5', 'ACTIVE', '2026-01-05 10:00:00');

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
(1, 1, 'Restaurant_Name_1', 1, 'Restaurant_Description_1', 'Restaurant_Logo_URL_1', 'ACTIVE', 1.10),
(2, 2, 'Restaurant_Name_2', 2, 'Restaurant_Description_2', 'Restaurant_Logo_URL_2', 'INACTIVE', 2.10),
(3, 3, 'Restaurant_Name_3', 3, 'Restaurant_Description_3', 'Restaurant_Logo_URL_3', 'TEMP_CLOSED', 3.10),
(4, 4, 'Restaurant_Name_4', 4, 'Restaurant_Description_4', 'Restaurant_Logo_URL_4', 'SUSPENDED', 4.10),
(5, 5, 'Restaurant_Name_5', 5, 'Restaurant_Description_5', 'Restaurant_Logo_URL_5', 'ACTIVE', 5.10);

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
