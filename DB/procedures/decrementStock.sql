create procedure decrementStock(IN id int, IN qty int)
begin
    update products
    set stock = stock - qty
    where idProduct = id;
end;
