CREATE TABLE lobos.tipo_documento(
	id SERIAL PRIMARY KEY,
	abrv VARCHAR(5) NOT NULL,
	descripcion VARCHAR(100) NOT NULL
);

INSERT INTO lobos.tipo_documento(abrv,descripcion)
VALUES
('DNI','DOCUMENTO NACIONAL DE IDENTIDAD.');

INSERT INTO lobos.tipo_documento(abrv,descripcion)
VALUES
('CE','CARNET DE EXTRANJERIA.');

INSERT INTO lobos.tipo_documento(abrv,descripcion)
VALUES
('RUC','REGISTRO UNICO DE CONTRIBUYENTE.');


INSERT INTO lobos.tipo_documento(abrv,descripcion)
VALUES
('PS','PASAPORTE.');

INSERT INTO lobos.tipo_documento(abrv,descripcion)
VALUES
('OTRO','OTRO TIPO DE DOCUMENTO O NO PRESENTO SU DOCUMENTO.');

CREATE TABLE lobos.control_vehiculo
(
	id SERIAL PRIMARY KEY,
	id_documento INT, 
	fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
	placa_vehiculo VARCHAR(7) NOT NULL,
	color_vehiculo VARCHAR(15),
	cant_pasajero INT,
	nombre_visita VARCHAR(100) NOT NULL,
	direccion_visita VARCHAR(100) NOT NULL,
	motivo_ingreso VARCHAR(100) NOT NULL,
	fecha_salida TIMESTAMP,
	foto BYTEA,
	CONSTRAINT fk_doc FOREIGN KEY(id_documento) REFERENCES lobos.tipo_documento(id)
);

CREATE TABLE lobos.rol 
(
	id SERIAL PRIMARY KEY,
	abrv VARCHAR(5) UNIQUE NOT NULL,
	name VARCHAR(15) UNIQUE NOT NULL,
	descripcion VARCHAR(100) NOT NULL
);
INSERT INTO lobos.rol
(abrv,name,descripcion)
VALUES
('USUA','USUARIO','rol para que los usuarios solo vean los registros diarios.');

INSERT INTO lobos.rol
(abrv,name,descripcion)
VALUES
('ADMIN','ADMINISTRADOR','rol para que el usuario elimine,registre,actualize liste los registros de los vehiculos.');

CREATE TABLE lobos.usuario
(
	id SERIAL PRIMARY KEY,
	dni INTEGER UNIQUE NOT NULL,
	name VARCHAR(30) NOT NULL,
	apellidos VARCHAR(30) NOT NULL,
	status BOOLEAN DEFAULT true NOT NULL,
	locked BOOLEAN DEFAULT true NOT NULL
);

CREATE TABLE lobos.auth(
	id_user INT NOT NULL,
	passwordEncrypt VARCHAR(300) NOT NULL
);

CREATE TABLE lobos.user_rol
(
	id_user INT NOT NULL,
	id_rol  INT NOT NULL,
	PRIMARY KEY(id_user,id_rol)
);
