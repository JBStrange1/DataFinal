Create table if not exists Products(
    idProduct int auto_increment,
    title varchar(45),
    price DECIMAL(8,2),
    description varchar(45),
    color varchar(45),
    category varchar(45),
    imagePath varchar(45),
    stock int,
    Primary Key (idProduct),
    Check (price >= 0),
    Check (stock >= 0)
);

Create table if not exists Customers(
    idCustomer int auto_increment,
    name varchar(45),
    address varchar(45),
    phone varchar(45),
    Primary Key (idCustomer)
);

Create table if not exists Orders(
    idOrder int auto_increment,
    OrderDate DATE,
    idCustomer int,
    Primary Key (idOrder),
    Foreign Key (idCustomer) References Customers(idCustomer)
);

Create table if not exists OrderItems(
    idOrderItem int auto_increment,
    idProduct int,
    checkout_price DECIMAL(8,2),
    idOrder int,
    quantity int,
    Primary Key (idOrderItem),
    Unique (idOrder, idProduct),
    Foreign Key (idProduct) References Products(idProduct),
    Foreign Key (idOrder) References Orders(idOrder),
    Check (checkout_price >= 0),
    Check (quantity > 0)
);

Create table if not exists Equipment(
    idProduct int,
    type varchar(45),
    size varchar(45),
    gender varchar(45),
    Primary Key (idProduct),
    Foreign Key (idProduct) References Products(idProduct)
);

Create table if not exists Materials(
    idProduct int,
    amount varchar(45),
    type varchar(45),
    Primary Key (idProduct),
    Foreign Key (idProduct) References Products(idProduct)
);

Create table if not exists Flies(
    idProduct int,
    size varchar(45),
    type varchar(45),
    Primary Key (idProduct),
    Foreign Key (idProduct) References Products(idProduct)
);