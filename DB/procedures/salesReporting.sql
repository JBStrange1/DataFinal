create procedure salesReporting()
begin
    select
        date(o.orderDate) as day,
        sum(oi.checkout_price) as totalSales
    from orders o
    join orderitems oi on o.idOrder = oi.idOrder
    where o.orderDate >= date_sub(curdate(), interval 90 day)
    group by day
    order by day;
end;

