CREATE TABLE cliente(
	    id INT(11) PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(20) NOT NULL,
        apellido VARCHAR(20) NOT NULL,
        cedula VARCHAR(11) UNIQUE NOT NULL,
        telefono VARCHAR(12) NULL,
        direccion VARCHAR(50) NULL,
        correo VARCHAR(30)
	);

    CREATE TABLE divisa(
	    id INT(11) PRIMARY KEY AUTO_INCREMENT,
        divisa VARCHAR(45) NOT NULL UNIQUE
    );

    INSERT INTO divisa(divisa) VALUES ('Bs'),('Dolar'),('Pesos Colombianos');

    CREATE TABLE entrenador(
	    id INT(11) PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(40) NOT NULL,
        cedula VARCHAR(22) UNIQUE NOT NULL,
        numCuenta VARCHAR(23),
        telefono VARCHAR(20) NULL,
        direccion VARCHAR(50) NULL,
        correo VARCHAR(30)
	);

    CREATE TABLE entrenador_cliente(
	    id INT PRIMARY KEY AUTO_INCREMENT,
        vencimiento DATE NOT NULL,
        tarifa DECIMAL(20,2) NOT NULL,
        idDivisa INT NOT NULL,
        idEntrenador INT NOT NULL,
        idCliente INT NOT NULL,
        CONSTRAINT fkCli FOREIGN KEY(idCliente) REFERENCES cliente(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fkEnt FOREIGN KEY(idEntrenador) REFERENCES entrenador(id) ON DELETE CASCADE ON UPDATE CASCADE
	);

    CREATE TABLE metodo_pago (
        id INT PRIMARY KEY AUTO_INCREMENT,
        metodo VARCHAR(45) NOT NULL
    );

    INSERT INTO metodo_pago(metodo) VALUES ('Transferencia'),('Efectivo'),('Punto de venta');

    CREATE TABLE pago(
	    id INT PRIMARY KEY AUTO_INCREMENT,
        monto DECIMAL(20,2) NOT NULL,
        fechaPago date NOT NULL,
        fechaIngreso date NOT NULL,
        referencia VARCHAR(20)
	);

    CREATE TABLE pago_cliente(
	    id INT PRIMARY KEY AUTO_INCREMENT,
        fechaVencimiento DATE NOT NULL,
        idPago INT NOT NULL,
        idCliente INT NOT NULL,
        idDivisa INT NOT NULL,
        idMetodo INT NOT NULL,
        CONSTRAINT fk_Pago FOREIGN KEY(idPago) REFERENCES pago(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_Cli FOREIGN KEY(idCliente) REFERENCES cliente(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_Div FOREIGN KEY(idDivisa) REFERENCES divisa(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_Met FOREIGN KEY(idMetodo) REFERENCES metodo_pago(id) ON DELETE CASCADE ON UPDATE CASCADE
  	);

    CREATE TABLE nivel(
        id INT PRIMARY KEY,
        cargo VARCHAR(20) NOT NULL
    );

    INSERT INTO nivel VALUES(1, 'Administrador'),(2, 'Encargado'),(3, 'Cajero');

    CREATE TABLE usuario(
	    id INT PRIMARY KEY AUTO_INCREMENT,
        user VARCHAR(15) NOT NULL UNIQUE,
        pass VARCHAR(255) NOT NULL,
        intento INT(1) DEFAULT 0,
        fecha DATE NOT NULL
    );

    CREATE TABLE nivel_usuario(
        id INT PRIMARY KEY AUTO_INCREMENT,
        idUsuario INT UNIQUE,
        idNivel INT,
        CONSTRAINT fk_user FOREIGN KEY(idUsuario) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_nivel FOREIGN KEY(idNivel) REFERENCES nivel(id) ON DELETE CASCADE ON UPDATE CASCADE
    );

    INSERT INTO `usuario` (`id`, `user`, `pass`, `fecha`) VALUES
        (1, 'admin', 'YWRtaW4=', DATE_ADD(CURRENT_DATE, INTERVAL 5 DAY));

    INSERT INTO nivel_usuario(idUsuario, idNivel) VALUES(1, 1);

    CREATE TABLE pregunta(
	    id INT PRIMARY KEY AUTO_INCREMENT,
        pregunta VARCHAR(45) NOT NULL
    );

    INSERT INTO `pregunta` (`pregunta`) VALUES
        ('¿Nombre de mi canción favorita?'),
        ('¿Segundo nombre de mi mamá?'),
        ('¿Mejor amigo de la infancia?'),
        ('¿Nombre del primer colegio de primaria?'),
        ('¿Profesor favorito?'),
        ('¿Carrera siempre deseada de ejercer?'),
        ('¿Nombre de la primera pareja?'),
        ('¿Película favorita?');

    CREATE TABLE respuesta(
	    id INT PRIMARY KEY AUTO_INCREMENT,
        respuesta VARCHAR(40) NOT NULL,
        idUsuario INT NOT NULL,
        idPregunta int NOT NULL,
        CONSTRAINT fk_usuario FOREIGN KEY(idUsuario) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_pregunta FOREIGN KEY(idPregunta) REFERENCES pregunta(id) ON DELETE CASCADE ON UPDATE CASCADE
    );

    INSERT INTO respuesta(`respuesta`, `idUsuario`,  `idPregunta`) VALUES
        ('admin', 1, 1),
        ('admin', 1, 2),
        ('admin', 1, 3),
        ('admin', 1, 4);