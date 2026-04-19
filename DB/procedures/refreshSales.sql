create procedure refreshSales()
begin
    update orders o
    set total = (
        select ifnull(sum(oi.checkout_price * oi.quantity), 0)
        from orderitems oi
        where oi.idOrder = o.idOrder
);end;

