const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const DEFAULT_ROWS_PER_TABLE = Number(process.env.SEED_DEFAULT_ROWS || 15);
const TABLE_ROW_OVERRIDES = {
  Address: 20,
  Cart_Item: 30,
  Delivery: 30,
  Driver_Rating: 20,
  Driver_Location_Log: 30,
  Item_Option: 25,
  Item_Option_Group: 20,
  Order: 30,
  Order_Item: 40,
  Order_Item_Option: 40,
  Order_Status_History: 40,
  Payment: 30,
  Rating: 20,
  Refund: 20,
  Restaurant_Rating_ID: 20,
  Support_Ticket: 20
};

function parseVarcharLength(columnType) {
  const match = String(columnType || '').match(/\((\d+)\)/);
  return match ? Number(match[1]) : null;
}

function parseEnumValues(columnType) {
  const values = [];
  const regex = /'((?:\\'|[^'])*)'/g;
  let match;

  while ((match = regex.exec(String(columnType || ''))) !== null) {
    values.push(match[1].replace(/\\'/g, "'"));
  }

  return values;
}

function escapeSqlString(value) {
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function buildCalendarDate(rowIndex) {
  const day = ((rowIndex - 1) % 28) + 1;
  const month = (Math.floor((rowIndex - 1) / 28) % 12) + 1;
  return `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function buildClockTime(rowIndex) {
  const hour = 8 + ((rowIndex - 1) % 12);
  const minute = ((rowIndex - 1) * 7) % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
}

const CUSTOM_TABLE_ROWS = {
  Person: [
    { Person_ID: 1, First_Name: 'Emma', Last_Name: 'Nguyen', Email: 'emma.nguyen@feedme.com', Phone: 40111001, Password_Hash: 'hash_emma', Account_Status: 'ACTIVE', Created_At: '2026-02-01 09:00:00' },
    { Person_ID: 2, First_Name: 'Liam', Last_Name: 'Carter', Email: 'liam.carter@feedme.com', Phone: 40111002, Password_Hash: 'hash_liam', Account_Status: 'ACTIVE', Created_At: '2026-02-01 09:05:00' },
    { Person_ID: 3, First_Name: 'Sophia', Last_Name: 'Wilson', Email: 'sophia.wilson@feedme.com', Phone: 40111003, Password_Hash: 'hash_sophia', Account_Status: 'ACTIVE', Created_At: '2026-02-01 09:10:00' },
    { Person_ID: 4, First_Name: 'Noah', Last_Name: 'Brown', Email: 'noah.brown@feedme.com', Phone: 40111004, Password_Hash: 'hash_noah', Account_Status: 'ACTIVE', Created_At: '2026-02-01 09:15:00' },
    { Person_ID: 5, First_Name: 'Ava', Last_Name: 'Patel', Email: 'ava.patel@feedme.com', Phone: 40111005, Password_Hash: 'hash_ava', Account_Status: 'ACTIVE', Created_At: '2026-02-01 09:20:00' },
    { Person_ID: 6, First_Name: 'Mason', Last_Name: 'Lee', Email: 'mason.lee@feedme.com', Phone: 40111006, Password_Hash: 'hash_mason', Account_Status: 'ACTIVE', Created_At: '2026-02-02 08:30:00' },
    { Person_ID: 7, First_Name: 'Charlotte', Last_Name: 'Davis', Email: 'charlotte.davis@feedme.com', Phone: 40111007, Password_Hash: 'hash_charlotte', Account_Status: 'ACTIVE', Created_At: '2026-02-02 08:40:00' },
    { Person_ID: 8, First_Name: 'Ethan', Last_Name: 'Miller', Email: 'ethan.miller@feedme.com', Phone: 40111008, Password_Hash: 'hash_ethan', Account_Status: 'ACTIVE', Created_At: '2026-02-02 08:50:00' },
    { Person_ID: 9, First_Name: 'Mia', Last_Name: 'Lopez', Email: 'mia.lopez@feedme.com', Phone: 40111009, Password_Hash: 'hash_mia', Account_Status: 'ACTIVE', Created_At: '2026-02-02 09:00:00' },
    { Person_ID: 10, First_Name: 'Lucas', Last_Name: 'King', Email: 'lucas.king@feedme.com', Phone: 40111010, Password_Hash: 'hash_lucas', Account_Status: 'ACTIVE', Created_At: '2026-02-02 09:10:00' },
    { Person_ID: 11, First_Name: 'Harper', Last_Name: 'Scott', Email: 'harper.scott@feedme.com', Phone: 40111011, Password_Hash: 'hash_harper', Account_Status: 'ACTIVE', Created_At: '2026-02-03 10:00:00' },
    { Person_ID: 12, First_Name: 'James', Last_Name: 'Green', Email: 'james.green@feedme.com', Phone: 40111012, Password_Hash: 'hash_james', Account_Status: 'ACTIVE', Created_At: '2026-02-03 10:10:00' },
    { Person_ID: 13, First_Name: 'Amelia', Last_Name: 'Hall', Email: 'amelia.hall@feedme.com', Phone: 40111013, Password_Hash: 'hash_amelia', Account_Status: 'ACTIVE', Created_At: '2026-02-03 10:20:00' },
    { Person_ID: 14, First_Name: 'Benjamin', Last_Name: 'Young', Email: 'ben.young@feedme.com', Phone: 40111014, Password_Hash: 'hash_ben', Account_Status: 'ACTIVE', Created_At: '2026-02-03 10:30:00' },
    { Person_ID: 15, First_Name: 'Ella', Last_Name: 'Allen', Email: 'ella.allen@feedme.com', Phone: 40111015, Password_Hash: 'hash_ella', Account_Status: 'ACTIVE', Created_At: '2026-02-03 10:40:00' }
  ],
  Customer: [
    { Person_ID: 1, Loyalty_Points: 220, Preferred_Payment_Method: 'VISA' },
    { Person_ID: 2, Loyalty_Points: 140, Preferred_Payment_Method: 'MasterCard' },
    { Person_ID: 3, Loyalty_Points: 80, Preferred_Payment_Method: 'PayPal' },
    { Person_ID: 4, Loyalty_Points: 360, Preferred_Payment_Method: 'ApplePay' },
    { Person_ID: 5, Loyalty_Points: 40, Preferred_Payment_Method: 'Cash' }
  ],
  Merchant: [
    { Person_ID: 6, Business_Name: 'Sakura Bowl Co', Business_Type: 'Japanese', Tax_ID: 'AUS-TAX-2001', Approval_Status: 'APPROVED' },
    { Person_ID: 7, Business_Name: 'Urban Tacos', Business_Type: 'Mexican', Tax_ID: 'AUS-TAX-2002', Approval_Status: 'APPROVED' },
    { Person_ID: 8, Business_Name: 'Bella Pasta Bar', Business_Type: 'Italian', Tax_ID: 'AUS-TAX-2003', Approval_Status: 'APPROVED' },
    { Person_ID: 9, Business_Name: 'Green Leaf Kitchen', Business_Type: 'Healthy', Tax_ID: 'AUS-TAX-2004', Approval_Status: 'APPROVED' },
    { Person_ID: 10, Business_Name: 'Sunrise Burgers', Business_Type: 'Burgers', Tax_ID: 'AUS-TAX-2005', Approval_Status: 'APPROVED' }
  ],
  Driver: [
    { Person_ID: 11, License_Number: 'QLD-DR-1001', Vehicle_Type: 'Scooter', Background_Check_Status: 'APPROVED', Is_Online: 1, Rating_Avg: 4.90 },
    { Person_ID: 12, License_Number: 'QLD-DR-1002', Vehicle_Type: 'Car', Background_Check_Status: 'APPROVED', Is_Online: 1, Rating_Avg: 4.75 },
    { Person_ID: 13, License_Number: 'QLD-DR-1003', Vehicle_Type: 'Bike', Background_Check_Status: 'APPROVED', Is_Online: 0, Rating_Avg: 4.60 },
    { Person_ID: 14, License_Number: 'QLD-DR-1004', Vehicle_Type: 'Car', Background_Check_Status: 'APPROVED', Is_Online: 1, Rating_Avg: 4.82 },
    { Person_ID: 15, License_Number: 'QLD-DR-1005', Vehicle_Type: 'Scooter', Background_Check_Status: 'PENDING', Is_Online: 0, Rating_Avg: 4.40 }
  ],
  Admin: [
    { Person_ID: 1, Role_Type: 'Support', Access_Level: 'L2' },
    { Person_ID: 2, Role_Type: 'Operations', Access_Level: 'L2' },
    { Person_ID: 3, Role_Type: 'Finance', Access_Level: 'L1' },
    { Person_ID: 4, Role_Type: 'TrustSafety', Access_Level: 'L3' },
    { Person_ID: 5, Role_Type: 'Platform', Access_Level: 'L3' }
  ],
  Restaurant: [
    { Restaurant_ID: 1, Merchant_Person_ID: 6, Name: 'Sakura Bowl', Phone: 47221001, Description: 'Fresh rice bowls and ramen', Logo_URL: '/img/sakura-logo.png', Status: 'ACTIVE', Service_Radius_KM: 8.5 },
    { Restaurant_ID: 2, Merchant_Person_ID: 7, Name: 'Urban Tacos', Phone: 47221002, Description: 'Street tacos and loaded fries', Logo_URL: '/img/taco-logo.png', Status: 'ACTIVE', Service_Radius_KM: 7.0 },
    { Restaurant_ID: 3, Merchant_Person_ID: 8, Name: 'Bella Pasta', Phone: 47221003, Description: 'Handmade pasta and salads', Logo_URL: '/img/pasta-logo.png', Status: 'ACTIVE', Service_Radius_KM: 6.5 },
    { Restaurant_ID: 4, Merchant_Person_ID: 9, Name: 'Green Leaf', Phone: 47221004, Description: 'Healthy bowls and wraps', Logo_URL: '/img/green-logo.png', Status: 'ACTIVE', Service_Radius_KM: 9.0 },
    { Restaurant_ID: 5, Merchant_Person_ID: 10, Name: 'Sunrise Burgers', Phone: 47221005, Description: 'Burgers, wings and shakes', Logo_URL: '/img/burger-logo.png', Status: 'ACTIVE', Service_Radius_KM: 10.0 }
  ],
  Menu: [
    { Menu_ID: 1, Restaurant_ID: 1, Name: 'Sakura Main Menu', Is_Active: 1 },
    { Menu_ID: 2, Restaurant_ID: 2, Name: 'Urban Tacos Menu', Is_Active: 1 },
    { Menu_ID: 3, Restaurant_ID: 3, Name: 'Bella Pasta Menu', Is_Active: 1 },
    { Menu_ID: 4, Restaurant_ID: 4, Name: 'Green Leaf Menu', Is_Active: 1 },
    { Menu_ID: 5, Restaurant_ID: 5, Name: 'Sunrise Menu', Is_Active: 1 }
  ],
  Category: [
    { Category_ID: 1, Menu_ID: 1, Name: 'Bowls', Sort_Order: 1 },
    { Category_ID: 2, Menu_ID: 1, Name: 'Ramen', Sort_Order: 2 },
    { Category_ID: 3, Menu_ID: 1, Name: 'Sides', Sort_Order: 3 },
    { Category_ID: 4, Menu_ID: 2, Name: 'Tacos', Sort_Order: 1 },
    { Category_ID: 5, Menu_ID: 2, Name: 'Nachos', Sort_Order: 2 },
    { Category_ID: 6, Menu_ID: 2, Name: 'Drinks', Sort_Order: 3 },
    { Category_ID: 7, Menu_ID: 3, Name: 'Pasta', Sort_Order: 1 },
    { Category_ID: 8, Menu_ID: 3, Name: 'Salads', Sort_Order: 2 },
    { Category_ID: 9, Menu_ID: 3, Name: 'Desserts', Sort_Order: 3 },
    { Category_ID: 10, Menu_ID: 4, Name: 'Power Bowls', Sort_Order: 1 },
    { Category_ID: 11, Menu_ID: 4, Name: 'Wraps', Sort_Order: 2 },
    { Category_ID: 12, Menu_ID: 4, Name: 'Smoothies', Sort_Order: 3 },
    { Category_ID: 13, Menu_ID: 5, Name: 'Burgers', Sort_Order: 1 },
    { Category_ID: 14, Menu_ID: 5, Name: 'Chicken', Sort_Order: 2 },
    { Category_ID: 15, Menu_ID: 5, Name: 'Shakes', Sort_Order: 3 }
  ],
  Item: [
    { Item_ID: 1, Restaurant_ID: 1, Name: 'Teriyaki Chicken Bowl', Description: 'Grilled chicken and rice', Base_Price: 15.90, Is_Available: 1, Image_URL: '/img/i-teriyaki.png' },
    { Item_ID: 2, Restaurant_ID: 1, Name: 'Salmon Poke Bowl', Description: 'Salmon poke with edamame', Base_Price: 18.50, Is_Available: 1, Image_URL: '/img/i-poke.png' },
    { Item_ID: 3, Restaurant_ID: 1, Name: 'Spicy Beef Ramen', Description: 'Rich broth and slow beef', Base_Price: 17.80, Is_Available: 1, Image_URL: '/img/i-ramen-beef.png' },
    { Item_ID: 4, Restaurant_ID: 1, Name: 'Tonkotsu Ramen', Description: 'Creamy pork broth ramen', Base_Price: 16.90, Is_Available: 1, Image_URL: '/img/i-ramen-tonk.png' },
    { Item_ID: 5, Restaurant_ID: 1, Name: 'Gyoza 6pc', Description: 'Pan-fried pork gyoza', Base_Price: 9.90, Is_Available: 1, Image_URL: '/img/i-gyoza.png' },
    { Item_ID: 6, Restaurant_ID: 1, Name: 'Seaweed Salad', Description: 'Sesame seaweed salad', Base_Price: 7.40, Is_Available: 1, Image_URL: '/img/i-seaweed.png' },

    { Item_ID: 7, Restaurant_ID: 2, Name: 'Beef Birria Tacos', Description: 'Slow-cooked birria tacos', Base_Price: 14.20, Is_Available: 1, Image_URL: '/img/i-birria.png' },
    { Item_ID: 8, Restaurant_ID: 2, Name: 'Chicken Street Tacos', Description: 'Chargrilled chicken tacos', Base_Price: 13.50, Is_Available: 1, Image_URL: '/img/i-chicken-tacos.png' },
    { Item_ID: 9, Restaurant_ID: 2, Name: 'Fish Baja Tacos', Description: 'Crispy fish and slaw', Base_Price: 14.80, Is_Available: 1, Image_URL: '/img/i-fish-tacos.png' },
    { Item_ID: 10, Restaurant_ID: 2, Name: 'Loaded Nachos', Description: 'Beef, cheese, jalapenos', Base_Price: 15.20, Is_Available: 1, Image_URL: '/img/i-nachos.png' },
    { Item_ID: 11, Restaurant_ID: 2, Name: 'Fries Supreme', Description: 'Loaded fries with salsa', Base_Price: 12.40, Is_Available: 1, Image_URL: '/img/i-fries-supreme.png' },
    { Item_ID: 12, Restaurant_ID: 2, Name: 'Horchata', Description: 'Sweet cinnamon rice drink', Base_Price: 5.50, Is_Available: 1, Image_URL: '/img/i-horchata.png' },

    { Item_ID: 13, Restaurant_ID: 3, Name: 'Chicken Alfredo', Description: 'Creamy alfredo fettuccine', Base_Price: 19.20, Is_Available: 1, Image_URL: '/img/i-alfredo.png' },
    { Item_ID: 14, Restaurant_ID: 3, Name: 'Spaghetti Bolognese', Description: 'Classic beef bolognese', Base_Price: 18.40, Is_Available: 1, Image_URL: '/img/i-bolognese.png' },
    { Item_ID: 15, Restaurant_ID: 3, Name: 'Pesto Penne', Description: 'Basil pesto and parmesan', Base_Price: 17.50, Is_Available: 1, Image_URL: '/img/i-pesto.png' },
    { Item_ID: 16, Restaurant_ID: 3, Name: 'Caesar Salad', Description: 'Cos lettuce and croutons', Base_Price: 13.20, Is_Available: 1, Image_URL: '/img/i-caesar.png' },
    { Item_ID: 17, Restaurant_ID: 3, Name: 'Rocket Pear Salad', Description: 'Rocket, pear and walnuts', Base_Price: 14.10, Is_Available: 1, Image_URL: '/img/i-rocket-pear.png' },
    { Item_ID: 18, Restaurant_ID: 3, Name: 'Tiramisu', Description: 'Coffee layered dessert', Base_Price: 8.80, Is_Available: 1, Image_URL: '/img/i-tiramisu.png' },

    { Item_ID: 19, Restaurant_ID: 4, Name: 'Protein Power Bowl', Description: 'Chicken, quinoa and kale', Base_Price: 16.70, Is_Available: 1, Image_URL: '/img/i-power-bowl.png' },
    { Item_ID: 20, Restaurant_ID: 4, Name: 'Vegan Green Bowl', Description: 'Tofu, rice and greens', Base_Price: 15.60, Is_Available: 1, Image_URL: '/img/i-vegan-bowl.png' },
    { Item_ID: 21, Restaurant_ID: 4, Name: 'Falafel Wrap', Description: 'Falafel, tahini, veggies', Base_Price: 12.90, Is_Available: 1, Image_URL: '/img/i-falafel-wrap.png' },
    { Item_ID: 22, Restaurant_ID: 4, Name: 'Chicken Avocado Wrap', Description: 'Chicken with avocado', Base_Price: 13.90, Is_Available: 1, Image_URL: '/img/i-avocado-wrap.png' },
    { Item_ID: 23, Restaurant_ID: 4, Name: 'Berry Blast Smoothie', Description: 'Mixed berries and yogurt', Base_Price: 7.90, Is_Available: 1, Image_URL: '/img/i-berry-smoothie.png' },
    { Item_ID: 24, Restaurant_ID: 4, Name: 'Mango Green Smoothie', Description: 'Mango spinach smoothie', Base_Price: 7.70, Is_Available: 1, Image_URL: '/img/i-mango-smoothie.png' },

    { Item_ID: 25, Restaurant_ID: 5, Name: 'Classic Beef Burger', Description: 'Beef patty with pickles', Base_Price: 14.60, Is_Available: 1, Image_URL: '/img/i-classic-burger.png' },
    { Item_ID: 26, Restaurant_ID: 5, Name: 'Double Cheeseburger', Description: 'Double beef and cheese', Base_Price: 17.20, Is_Available: 1, Image_URL: '/img/i-double-burger.png' },
    { Item_ID: 27, Restaurant_ID: 5, Name: 'Crispy Chicken Burger', Description: 'Crispy chicken and slaw', Base_Price: 15.30, Is_Available: 1, Image_URL: '/img/i-chicken-burger.png' },
    { Item_ID: 28, Restaurant_ID: 5, Name: 'Buffalo Wings 8pc', Description: 'Spicy buffalo wings', Base_Price: 12.80, Is_Available: 1, Image_URL: '/img/i-wings.png' },
    { Item_ID: 29, Restaurant_ID: 5, Name: 'Loaded Fries', Description: 'Cheese, bacon and aioli', Base_Price: 10.90, Is_Available: 1, Image_URL: '/img/i-loaded-fries.png' },
    { Item_ID: 30, Restaurant_ID: 5, Name: 'Vanilla Shake', Description: 'Thick vanilla milkshake', Base_Price: 6.90, Is_Available: 1, Image_URL: '/img/i-vanilla-shake.png' }
  ],
  Category_Item: [
    { Item_ID: 1, Category_ID: 1 }, { Item_ID: 2, Category_ID: 1 }, { Item_ID: 3, Category_ID: 2 },
    { Item_ID: 4, Category_ID: 2 }, { Item_ID: 5, Category_ID: 3 }, { Item_ID: 6, Category_ID: 3 },
    { Item_ID: 7, Category_ID: 4 }, { Item_ID: 8, Category_ID: 4 }, { Item_ID: 9, Category_ID: 4 },
    { Item_ID: 10, Category_ID: 5 }, { Item_ID: 11, Category_ID: 5 }, { Item_ID: 12, Category_ID: 6 },
    { Item_ID: 13, Category_ID: 7 }, { Item_ID: 14, Category_ID: 7 }, { Item_ID: 15, Category_ID: 7 },
    { Item_ID: 16, Category_ID: 8 }, { Item_ID: 17, Category_ID: 8 }, { Item_ID: 18, Category_ID: 9 },
    { Item_ID: 19, Category_ID: 10 }, { Item_ID: 20, Category_ID: 10 }, { Item_ID: 21, Category_ID: 11 },
    { Item_ID: 22, Category_ID: 11 }, { Item_ID: 23, Category_ID: 12 }, { Item_ID: 24, Category_ID: 12 },
    { Item_ID: 25, Category_ID: 13 }, { Item_ID: 26, Category_ID: 13 }, { Item_ID: 27, Category_ID: 13 },
    { Item_ID: 28, Category_ID: 14 }, { Item_ID: 29, Category_ID: 14 }, { Item_ID: 30, Category_ID: 15 }
  ]
};

function getCustomTableRows(tableName) {
  return CUSTOM_TABLE_ROWS[tableName] || null;
}

function getRowCountForTable(tableName, customRows) {
  if (customRows && customRows.length > 0) {
    return customRows.length;
  }

  return TABLE_ROW_OVERRIDES[tableName] || DEFAULT_ROWS_PER_TABLE;
}

function buildCustomValue(column, customRow, rowIndex, tableIndex) {
  const hasValue = Object.prototype.hasOwnProperty.call(customRow, column.COLUMN_NAME);

  if (!hasValue) {
    return buildValue(column, rowIndex, tableIndex);
  }

  const value = customRow[column.COLUMN_NAME];

  if (value === null || value === undefined) {
    return 'NULL';
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'boolean') {
    return value ? '1' : '0';
  }

  return escapeSqlString(value);
}

function buildValue(column, rowIndex, tableIndex) {
  const dataType = String(column.DATA_TYPE || '').toLowerCase();
  const columnType = String(column.COLUMN_TYPE || '').toLowerCase();
  const columnName = String(column.COLUMN_NAME || 'column');
  const tableName = String(column.TABLE_NAME || 'table');

  if (dataType === 'enum') {
    const enumValues = parseEnumValues(column.COLUMN_TYPE);
    const selected = enumValues.length ? enumValues[(rowIndex - 1) % enumValues.length] : 'VALUE';
    return escapeSqlString(selected);
  }

  if (['tinyint', 'smallint', 'mediumint', 'int', 'bigint'].includes(dataType)) {
    if (columnType.includes('tinyint(1)')) {
      return rowIndex % 2 === 0 ? '0' : '1';
    }

    return String(rowIndex);
  }

  if (['decimal', 'numeric', 'float', 'double', 'real'].includes(dataType)) {
    const decimalMatch = columnType.match(/\((\d+),(\d+)\)/);

    if (decimalMatch) {
      const scale = Number(decimalMatch[2]);
      return (rowIndex + 0.1).toFixed(scale);
    }

    return String(rowIndex);
  }

  if (['char', 'varchar', 'text', 'tinytext', 'mediumtext', 'longtext'].includes(dataType)) {
    let textValue = `${tableName}_${columnName}_${rowIndex}`;
    const maxLength = parseVarcharLength(column.COLUMN_TYPE);

    if (maxLength && textValue.length > maxLength) {
      textValue = textValue.slice(0, maxLength);
    }

    return escapeSqlString(textValue);
  }

  if (dataType === 'date') {
    return escapeSqlString(buildCalendarDate(rowIndex));
  }

  if (['datetime', 'timestamp'].includes(dataType)) {
    return escapeSqlString(`${buildCalendarDate(rowIndex)} ${buildClockTime(rowIndex)}`);
  }

  if (dataType === 'time') {
    return escapeSqlString(buildClockTime(rowIndex));
  }

  if (dataType === 'year') {
    return '2026';
  }

  if (dataType === 'json') {
    return escapeSqlString(JSON.stringify({ sample: rowIndex, table: tableName }));
  }

  if (['binary', 'varbinary', 'blob', 'tinyblob', 'mediumblob', 'longblob', 'bit'].includes(dataType)) {
    return "X'01'";
  }

  return escapeSqlString(`${tableName}_${columnName}_${rowIndex}`);
}

async function generate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'cp3407'
  });

  const [tables] = await connection.query(`
    SELECT TABLE_NAME
    FROM information_schema.tables
    WHERE table_schema = 'cp3407' AND table_type = 'BASE TABLE'
    ORDER BY TABLE_NAME
  `);

  const statements = [];
  statements.push(`-- Auto-generated sample data: default ${DEFAULT_ROWS_PER_TABLE} rows per table with table-specific overrides`);
  statements.push(`USE \`${process.env.DB_NAME || 'cp3407'}\`;`);
  statements.push('SET FOREIGN_KEY_CHECKS = 0;');
  statements.push('');

  let tableIndex = 0;

  for (const tableRow of tables) {
    tableIndex += 1;
    const tableName = tableRow.TABLE_NAME;

    const [columns] = await connection.query(`
      SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, COLUMN_TYPE, IS_NULLABLE, EXTRA
      FROM information_schema.columns
      WHERE table_schema = 'cp3407' AND table_name = ?
      ORDER BY ORDINAL_POSITION
    `, [tableName]);

    const insertableColumns = columns.filter((column) => {
      const extra = String(column.EXTRA || '').toLowerCase();
      return !extra.includes('auto_increment') && !extra.includes('generated');
    });

    statements.push(`-- ${tableName}`);
    statements.push(`DELETE FROM \`${tableName}\`;`);

    if (insertableColumns.length === 0) {
      statements.push('');
      continue;
    }

    const columnList = insertableColumns.map((column) => `\`${column.COLUMN_NAME}\``).join(', ');
    const customRows = getCustomTableRows(tableName);
    const rows = [];

    if (customRows && customRows.length > 0) {
      customRows.forEach((customRow, rowIdx) => {
        const rowIndex = rowIdx + 1;
        const values = insertableColumns.map((column) => buildCustomValue(column, customRow, rowIndex, tableIndex));
        rows.push(`(${values.join(', ')})`);
      });
    } else {
      const rowCount = getRowCountForTable(tableName, customRows);

      for (let rowIndex = 1; rowIndex <= rowCount; rowIndex += 1) {
        const values = insertableColumns.map((column) => buildValue(column, rowIndex, tableIndex));
        rows.push(`(${values.join(', ')})`);
      }
    }

    statements.push(`INSERT INTO \`${tableName}\` (${columnList}) VALUES`);
    statements.push(`${rows.join(',\n')};`);
    statements.push('');
  }

  statements.push('SET FOREIGN_KEY_CHECKS = 1;');

  const outputPath = path.join(__dirname, 'example_data_25_tables.sql');
  fs.writeFileSync(outputPath, `${statements.join('\n')}\n`, 'utf8');

  console.log(`Generated: ${outputPath}`);
  console.log(`Tables: ${tables.length}`);

  await connection.end();
}

generate().catch((error) => {
  console.error(error);
  process.exit(1);
});
