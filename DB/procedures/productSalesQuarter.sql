create procedure productSalesQuarter()
begin
    select p.title, sum(oi.checkout_price * oi.quantity) as total from orderitems oi
    join products p on oi.idProduct = p.idProduct
    join orders o on oi.idOrder = o.idOrder
    where o.orderDate >= date_sub(curdate(), interval 90 day)
    group by p.title
    order by p.title desc;
end;

