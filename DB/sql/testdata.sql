-- =========================
-- CUSTOMERS
-- =========================
INSERT INTO Customers (idCustomer, name, address, phone) VALUES
(1, 'John Strange', '123 River Rd', '906-555-1111'),
(2, 'Sarah Miller', '456 Lake St', '906-555-2222'),
(3, 'Tyler Woods', '789 Pine Ave', '906-555-3333'),
(4, 'Emma Johnson', '321 Cedar Ln', '906-555-4444'),
(5, 'Chris Adams', '654 Birch St', '906-555-5555'),
(6, 'Liam Carter', '987 Oak Dr', '906-555-6666'),
(7, 'Olivia Brown', '222 Maple Rd', '906-555-7777'),
(8, 'Noah Davis', '111 Spruce Ln', '906-555-8888'),
(9, 'Ava Wilson', '555 Elm St', '906-555-9999'),
(10, 'Ethan Moore', '999 Pine Rd', '906-555-0000');

-- =========================
-- PRODUCTS
-- =========================
INSERT INTO Products (idProduct, title, price, description, color) VALUES
-- Flies
(1, 'Wooly Bugger', 3.99, 'Streamer fly', 'Olive'),
(2, 'Adams Dry Fly', 2.49, 'Dry fly', 'Gray'),
(3, 'Pheasant Tail Nymph', 2.99, 'Nymph fly', 'Brown'),
(4, 'Zebra Midge', 2.29, 'Small midge', 'Black'),
(5, 'Elk Hair Caddis', 2.79, 'Caddis imitation', 'Tan'),
(6, 'Stonefly Nymph', 3.49, 'Large nymph', 'Dark Brown'),

-- Equipment
(7, 'Fly Rod 5WT', 149.99, 'Beginner rod', 'Black'),
(8, 'Fly Rod 8WT', 199.99, 'Heavy rod', 'Green'),
(9, 'Fly Reel Standard', 89.99, 'Smooth reel', 'Silver'),
(10, 'Fly Reel Pro', 129.99, 'High-end reel', 'Black'),
(11, 'Floating Fly Line', 59.99, 'Floating line', 'Yellow'),
(12, 'Waders', 199.99, 'Chest waders', 'Brown'),

-- Materials
(13, 'Hackle Feather Pack', 12.99, 'Feathers', 'Mixed'),
(14, 'Thread Spool', 4.99, 'Thread', 'Black'),
(15, 'Hook Pack Size 10', 9.99, 'Hooks', 'Silver'),
(16, 'Bead Heads', 6.99, 'Beads', 'Gold'),
(17, 'Dubbing Pack', 8.99, 'Dubbing', 'Mixed');

-- =========================
-- FLIES
-- =========================
INSERT INTO Flies (idProduct, size, type) VALUES
(1, '8', 'Streamer'),
(2, '14', 'Dry'),
(3, '16', 'Nymph'),
(4, '18', 'Midge'),
(5, '12', 'Dry'),
(6, '10', 'Nymph');

-- =========================
-- EQUIPMENT
-- =========================
INSERT INTO Equipment (idProduct, type, size, gender) VALUES
(7, 'Rod', '5WT', 'Unisex'),
(8, 'Rod', '8WT', 'Unisex'),
(9, 'Reel', 'Medium', 'Unisex'),
(10, 'Reel', 'Large', 'Unisex'),
(11, 'Line', 'WF5F', 'Unisex'),
(12, 'Waders', 'L', 'Unisex');

-- =========================
-- MATERIALS
-- =========================
INSERT INTO Materials (idProduct, amount, type) VALUES
(13, '20 pack', 'Feather'),
(14, '1 spool', 'Thread'),
(15, '25 pack', 'Hook'),
(16, '50 pack', 'Bead'),
(17, '1 bag', 'Dubbing');

-- =========================
-- ORDERS
-- =========================
INSERT INTO Orders (idOrder, OrderDate, idCustomer) VALUES
(1, '2026-03-01', 1),
(2, '2026-03-02', 2),
(3, '2026-03-03', 3),
(4, '2026-03-04', 4),
(5, '2026-03-05', 5),
(6, '2026-03-06', 6),
(7, '2026-03-07', 7),
(8, '2026-03-08', 8),
(9, '2026-03-09', 9),
(10, '2026-03-10', 10);

-- =========================
-- ORDER ITEMS
-- =========================
INSERT INTO OrderItems (idOrderItem, idProduct, checkout_price, idOrder) VALUES
(1, 1, 3.99, 1),
(2, 7, 149.99, 1),

(3, 2, 2.49, 2),
(4, 13, 12.99, 2),

(5, 3, 2.99, 3),
(6, 9, 89.99, 3),

(7, 4, 2.29, 4),
(8, 14, 4.99, 4),

(9, 5, 2.79, 5),
(10, 10, 129.99, 5),

(11, 6, 3.49, 6),
(12, 11, 59.99, 6),

(13, 1, 3.99, 7),
(14, 12, 199.99, 7),

(15, 2, 2.49, 8),
(16, 15, 9.99, 8),

(17, 3, 2.99, 9),
(18, 16, 6.99, 9),

(19, 4, 2.29, 10),
(20, 17, 8.99, 10);