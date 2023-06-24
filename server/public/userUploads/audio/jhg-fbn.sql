-- 1 Crea un procedimiento almacenado que realice una calculadora 
-- simple, (suma, resta, multiplicación y división) para 3 parámetros 
-- insertados.

CREATE OR REPLACE PROCEDURE calculadora(IN n1 decimal(3,2), IN n2 decimal(3,2), IN op varchar, OUT res decimal(3, 2))
	LANGUAGE plpgsql
AS $$
BEGIN
	IF op = 'suma' THEN
		SELECT n1 + n2 INTO res;
	ELSE 
		IF op = 'resta' THEN
			SELECT n1 - n2 INTO res;
		ELSE
			IF op = 'mult' THEN
				SELECT n1 * n2 INTO res;
			ELSE 
				SELECT n1 / n2 INTO res;
			END IF;
		END IF;
	END IF;
END; $$

CALL calculadora(1,2, 'suma', 0); -- 3
CALL calculadora(1,2, 'resta', 0); -- -1
CALL calculadora(1,2, 'mult', 0); -- 2
CALL calculadora(1,2, 'div', 0); -- 0.500000000

-- 2 Crea un procedimiento almacenado que muestre el 
-- número mayor de dos enteros que se le enviaran como parámetros, 
-- entregar solución cuando los dos números sean iguales.

CREATE OR REPLACE PROCEDURE mayor(IN n1 int, IN n2 int, OUT res varchar)
	LANGUAGE plpgsql
AS $$
BEGIN
	IF n1 > n2 THEN
		SELECT n1 INTO res;
	ELSE 
		IF n2 > n1 THEN
			SELECT n2 INTO res;
		ELSE
			SELECT 'Son iguales' INTO res;
		END IF;
	END IF;
END; $$

CALL mayor(2,1, '') -- 2
CALL mayor(1,3, '') -- 3
CALL mayor(10,10, '') -- Son iguales

-- 3 Crea un procedimiento almacenado que muestre el 
-- número mayor de tres enteros que se le enviaran como parámetros.

CREATE OR REPLACE PROCEDURE mayor3(IN n1 int, IN n2 int, IN n3 int, OUT res varchar)
	LANGUAGE plpgsql
AS $$
BEGIN
	IF n1 > n2 AND n1 > n3 THEN
		SELECT n1 INTO res;
	ELSE 
		IF n2 > n1 AND n2 > n3 THEN
			SELECT n2 INTO res;
		ELSE
			IF n3 > n2 AND n3 > n1 THEN
				SELECT n3 INTO res;
			ELSE 
				SELECT 'Son iguales' INTO res;
			END IF;
		END IF;
	END IF;
END; $$

CALL mayor3(3,2,1, '') -- 3
CALL mayor3(1,4,3, '') -- 4
CALL mayor3(1,2,5, '') -- 5
CALL mayor3(2,2,7, '') -- 7
CALL mayor3(2,2,2, '') -- Son iguales

-- 4 Crea la tabla producto, pedido e inserta 3 datos para cada tabla.

CREATE TABLE producto (
	idPRoducto varchar(10) primary key,
	descripcion varchar(30),
	stock int,
	precio decimal(10,2),
	precioV decimal(10,2),
	ganancia int GENERATED ALWAYS AS (precioV - precio) stored,
	check (precioV > precio)
);

CREATE TABLE pedido(
	idPedido varchar(10) primary key,
	idProducto varchar(10) REFERENCES producto(idProducto),
	cantidad int
)

INSERT INTO producto VALUES ('P1', 'Coca cola', 50, 7, 10);
INSERT INTO producto VALUES ('P2', 'Sprite', 10, 5, 8);
INSERT INTO producto VALUES ('P3', 'Fanta', 89, 9, 10);

INSERT INTO pedido VALUES ('PD1', 'P1', 5);
INSERT INTO pedido VALUES ('PD2', 'P2', 7);
INSERT INTO pedido VALUES ('PD3', 'P3', 13);


-- 5 Crea un procedimiento almacenado que inserte un 
-- nuevo dato si es que el IdProducto o Descripcion no existen 
-- de lo contrario enviar un mensaje por defecto.

CREATE OR REPLACE PROCEDURE insertarProducto(IN id varchar(10), IN descr varchar(30), IN st int, IN p decimal(10,2), IN pv decimal(10,2), OUT res varchar, OUT temp int)
	LANGUAGE plpgsql
AS $$
BEGIN
	SELECT COUNT(*) FROM producto WHERE idProducto = id INTO temp;
	IF temp > 0 THEN
		SELECT 'Ya existe un producto con este ID' INTO res;
	ELSE
		SELECT COUNT(*) FROM producto WHERE descripcion = descr INTO temp;
		IF temp > 0 THEN
			SELECT 'Ya existe un producto con esta descripción' INTO res;
		ELSE
			INSERT INTO producto VALUES(id, descr, st, p, pv);
		END IF;
	END IF;
END; $$

CALL insertarProducto('P3', 'Hola', 30, 1, 2, '', 0);
CALL insertarProducto('P5', 'Sprite', 30, 1, 2, '', 0);
CALL insertarProducto('P4', 'Pepsi', 30, 7, 10, '', 0);
SELECT * FROM producto;


-- 6 Crea un procedimiento almacenado que modifique el 
-- Stock actual mas el valor ingresado por
-- parámetro, cuando el IdProducto exista de lo contrario 
-- enviar un mensaje por defecto

CREATE OR REPLACE PROCEDURE aumentarStockEn(IN id varchar, IN cant int, OUT res varchar, OUT temp int)
	LANGUAGE plpgsql
AS $$
BEGIN
	SELECT COUNT(*) FROM producto WHERE idProducto = id INTO temp;
	IF temp > 0 THEN
	IF  temp > 0 THEN
		UPDATE producto SET stock = (stock + cant) WHERE idProducto = id;
		SELECT stock FROM producto WHERE idProducto = id INTO res;
	ELSE 
		SELECT 'El id ingresado no existe' INTO res;
	END IF;
END; $$

CALL aumentarStockEn('hola', 30, '', 0) -- default msg
CALL aumentarStockEn('P1', 30, '', 0) -- 80, 1

-- 7 Crea un Procedimiento almacenado que permita realizar 
-- un pedido de dicha tabla, este procedimiento tiene que 
-- verificar si el código de producto ingresado existe en la tabla 
-- Producto, en caso de que no se encuentre deberá mostrar un mensaje por defecto, además si
-- la cantidad a pedir del producto es mayor a el Stock deberá mostrar un mensaje por defecto.
-- En caso de que la cantidad a pedir sea menor o igual deberá modificar o actualizar el valor del
-- Stock de la tabla Producto.

CREATE OR REPLACE PROCEDURE insertarPedido(IN idPed varchar, IN idProd varchar, IN cant int, OUT res varchar, OUT temp int)
	LANGUAGE plpgsql
AS $$
BEGIN
	SELECT COUNT(*) FROM pedido WHERE idPedido = idPed INTO temp; -- Almaceno la cantidad de veces que se repite el idPedido en la tabla pedido en "temp"
	IF temp = 0 THEN
		SELECT COUNT(*) FROM producto WHERE idProducto = idProd INTO temp; -- Almaceno la cantidad de veces que se repite el idProducto en la tabla producto
		IF  temp > 0 THEN
			SELECT stock FROM producto WHERE idProducto = idProd INTO temp; -- Almaceno el stock restante del producto en temp
			IF temp >= cant THEN -- Si el stock es mayor a la cantidad pedida
				INSERT INTO pedido VALUES (idPed, idProd, cant);
				UPDATE producto SET stock = (stock - cant) WHERE idProducto = idProd;			
			ELSE
				SELECT 'La cantidad a pedir es mayor a la del stock restante' INTO res;
			END IF;
		ELSE 
			SELECT 'No existe ninguna producto con este ID' INTO res;
		END IF;
	ELSE 
		SELECT 'Ya existe un pedido con este ID' INTO res;
	END IF;
END; $$

call insertarPedido('PD1', 'P1', 333, '', 0);
call insertarPedido('PD4', 'hola', 333, '', 0);
call insertarPedido('PD4', 'P1', 333, '', 0);
call insertarPedido('PD4', 'P1', 30, '', 0);

SELECT * from pedido
SELECT * from producto
