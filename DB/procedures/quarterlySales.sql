create procedure totalQuarterSales()
begin
    select sum(oi.quantity * oi.checkout_price) as total from orderItems oi
    join orders o on o.idOrder = oi.idOrder
    where o.orderDate >= date_sub(curdate(), interval 90 day)
    order by sum(quantity * checkout_price);
end;