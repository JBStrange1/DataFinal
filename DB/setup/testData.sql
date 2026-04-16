Insert Into Customers (name, address, phone) values
('John Strange', '123 River Rd', '906-555-1111'),
('Sarah Miller', '456 Lake St', '906-555-2222'),
('Tyler Woods', '789 Pine Ave', '906-555-3333'),
('Emma Johnson', '321 Cedar Ln', '906-555-4444'),
('Chris Adams', '654 Birch St', '906-555-5555'),
('Liam Carter', '987 Oak Dr', '906-555-6666'),
('Olivia Brown', '222 Maple Rd', '906-555-7777'),
('Noah Davis', '111 Spruce Ln', '906-555-8888'),
('Ava Wilson', '555 Elm St', '906-555-9999'),
('Ethan Moore', '999 Pine Rd', '906-555-0000');

Insert Into Products (title, price, description, color, category, imagePath, stock) values
('Wooly Bugger', 3.99, 'Streamer fly', 'Olive', 'flies', './assets/WoolyBugger.jpeg', 65),
('Adams Dry Fly', 2.49, 'Dry fly', 'Gray', 'flies', './assets/Adams.jpeg', 65),
('Pheasant Tail Nymph', 2.99, 'Nymph fly', 'Brown', 'flies', './assets/PheasantTail.jpeg', 65),
('Zebra Midge', 2.29, 'Small midge', 'Black', 'flies', './assets/ZebraMidge.jpeg', 65),
('Elk Hair Caddis', 2.79, 'Caddis imitation', 'Tan', 'flies', './assets/ElkHairCaddis.jpeg', 65),
('Stonefly Nymph', 3.49, 'Large nymph', 'Dark Brown', 'flies', './assets/StoneflyNymph.jpeg', 65),

('Fly Rod 5WT', 149.99, 'Beginner rod', 'Black', 'equipment', './assets/FlyRod5wt.jpeg', 65),
('Fly Rod 8WT', 199.99, 'Heavy rod', 'Green', 'equipment', './assets/FlyRod8wt.jpeg', 65),
('Fly Reel Standard', 89.99, 'Smooth reel', 'Silver', 'equipment', './assets/FlyReelStandard.jpeg', 65),
('Fly Reel Pro', 129.99, 'High-end reel', 'Black', 'equipment', './assets/FlyReelPro.jpeg', 65),
('Floating Fly Line', 59.99, 'Floating line', 'Yellow', 'equipment', './assets/FlyLineFloating.jpeg', 65),
('Waders', 199.99, 'Chest waders', 'Brown', 'equipment', './assets/waders.jpeg', 65),

('Hackle Feather Pack', 12.99, 'Feathers', 'Mixed', 'materials', './assets/Hackle.jpeg', 65),
('Thread Spool', 4.99, 'Thread', 'Black', 'materials', './assets/flyThread.jpeg', 65),
('Hook Pack Size 10', 9.99, 'Hooks', 'Silver', 'materials', './assets/HookPack.jpeg', 65),
('Bead Heads', 6.99, 'Beads', 'Gold', 'materials', './assets/BeadHeads.jpeg', 65),
('Dubbing Pack', 8.99, 'Dubbing', 'Mixed', 'materials', './assets/Dubbing.jpeg', 65);

Insert Into Flies (idProduct, size, type) values
(1, '8', 'Streamer'),
(2, '14', 'Dry'),
(3, '16', 'Nymph'),
(4, '18', 'Midge'),
(5, '12', 'Dry'),
(6, '10', 'Nymph');

Insert Into Equipment (idProduct, type, size, gender) values
(7, 'Rod', '5WT', 'Unisex'),
(8, 'Rod', '8WT', 'Unisex'),
(9, 'Reel', 'Medium', 'Unisex'),
(10, 'Reel', 'Large', 'Unisex'),
(11, 'Line', 'WF5F', 'Unisex'),
(12, 'Waders', 'L', 'Unisex');

Insert Into Materials (idProduct, amount, type) values
(13, '20 pack', 'Feather'),
(14, '1 spool', 'Thread'),
(15, '25 pack', 'Hook'),
(16, '50 pack', 'Bead'),
(17, '1 bag', 'Dubbing');

Insert Into Orders (OrderDate, idCustomer) values
('2026-03-01', 1),
('2026-03-02', 2),
('2026-03-03', 3),
('2026-03-04', 4),
('2026-03-05', 5),
('2026-03-06', 6),
('2026-03-07', 7),
('2026-03-08', 8),
('2026-03-09', 9),
('2026-03-10', 10);

Insert Into OrderItems (idProduct, checkout_price, idOrder, quantity) values
(1, 3.99, 1, 2),
(7, 149.99, 1, 3),
(2, 2.49, 2, 3),
(13, 12.99, 2, 3),
(3, 2.99, 3, 3),
(9, 89.99, 3, 3),
(4, 2.29, 4, 3),
(14, 4.99, 4, 3),
(5, 2.79, 5, 3),
(10, 129.99, 5, 3),
(6, 3.49, 6, 3),
(11, 59.99, 6, 3),
(1, 3.99, 7, 3),
(12, 199.99, 7, 3),
(2, 2.49, 8, 3),
(15, 9.99, 8, 3),
(3, 2.99, 9, 3),
(16, 6.99, 9, 3),
(4, 2.29, 10, 3),
(17, 8.99, 10, 3);