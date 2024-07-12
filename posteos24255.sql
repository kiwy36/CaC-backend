-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-07-2024 a las 07:34:49
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `posteos24255`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `indumentaria`
--

CREATE TABLE `indumentaria` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `contenido` text DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `indumentaria`
--

INSERT INTO `indumentaria` (`id`, `titulo`, `contenido`, `precio`, `createdAt`, `updatedAt`) VALUES
(1, 'Camiseta Casual de Algodón', 'Camiseta unisex de algodón 100%, disponible en varios colores.', 200.00, '2024-07-09 03:08:35', '2024-07-09 19:22:29'),
(2, 'Pantalones Vaqueros Slim Fit', 'Pantalones vaqueros para hombre, ajuste slim fit, varios tamaños disponibles.', 39.99, '2024-07-09 03:09:28', '2024-07-09 15:54:37'),
(3, 'Zapatillas Deportivas Ultraligeras', 'Zapatillas deportivas para running, material transpirable y suela flexible.', 89.99, '2024-07-09 03:09:28', '2024-07-09 15:54:37'),
(4, 'Vestido Elegante de Noche', 'Vestido largo para ocasiones especiales, elegante diseño con detalles bordados.', 59.99, '2024-07-09 15:54:37', '2024-07-09 15:54:37'),
(5, 'Chaqueta de Cuero Vintage', 'Chaqueta de cuero genuino, estilo vintage con acabado envejecido.', 149.99, '2024-07-09 15:54:37', '2024-07-09 15:54:37'),
(6, 'Poleron magico', 'Vestimenta abrigada de varios colores y talles', 60.00, '2024-07-09 19:23:46', '2024-07-09 16:24:41'),
(14, 'post editado', 'huuhh', 12.00, '2024-07-10 00:57:59', '2024-07-10 00:57:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posteos`
--

CREATE TABLE `posteos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(30) DEFAULT NULL,
  `contenido` varchar(145) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `posteos`
--

INSERT INTO `posteos` (`id`, `titulo`, `contenido`, `createAt`, `updateAt`, `createdAt`, `updatedAt`) VALUES
(1, 'posteo actualizado', 'posteo actualizado', NULL, NULL, '2024-07-03 13:09:41', '2024-07-09 02:17:51'),
(2, 'asd', 'asd', NULL, NULL, '2024-07-03 13:09:41', '2024-07-03 13:09:41'),
(3, 'posteo creado', 'contenido creado', NULL, NULL, '2024-07-03 16:10:51', '2024-07-03 16:10:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones`
--

CREATE TABLE `sesiones` (
  `id` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `sesiones`
--

INSERT INTO `sesiones` (`id`, `usuarioId`, `token`, `createdAt`, `updatedAt`) VALUES
(3, 1, '67bcbd8d-70ad-4e28-aec6-07a8c676e540', '2024-07-11 16:29:36', '2024-07-11 16:29:36'),
(4, 16, '51f341e0-10b4-43e2-9e4f-7cfd2e3cd56a', '2024-07-12 05:05:35', '2024-07-12 05:05:35'),
(5, 16, '3907eb10-5605-4c6e-b5fc-4ced43533958', '2024-07-12 05:16:38', '2024-07-12 05:16:38'),
(6, 16, '413ca2ad-5d18-4d10-8586-22342daee1f3', '2024-07-12 05:19:28', '2024-07-12 05:19:28'),
(7, 16, 'e852e8ad-2486-4c87-b4c7-edddc9a9be22', '2024-07-12 05:26:52', '2024-07-12 05:26:52'),
(8, 16, 'a05cf629-1b51-4ee2-a776-46c088a380c1', '2024-07-12 05:26:56', '2024-07-12 05:26:56'),
(9, 16, '287d4d04-5aac-4bc8-a08f-5f7c39df1716', '2024-07-12 05:27:18', '2024-07-12 05:27:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiendas`
--

CREATE TABLE `tiendas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `contenido` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tiendas`
--

INSERT INTO `tiendas` (`id`, `titulo`, `contenido`, `createdAt`, `updatedAt`, `precio`) VALUES
(1, 'Pantalones Vaqueros Slim Fit', 'Pantalones vaqueros para hombre, ajuste slim fit, varios tamaños disponibles.', '2024-07-10 22:28:16', '2024-07-10 22:28:16', 39.99),
(2, 'Pantalones Vaqueros Slim Fit', 'Pantalones vaqueros para hombre, ajuste slim fit, varios tamaños disponibles.', '2024-07-11 17:06:41', '2024-07-11 17:06:41', 39.99);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `rol` enum('administrador','usuario') DEFAULT 'usuario',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contraseña`, `rol`, `createdAt`, `updatedAt`) VALUES
(1, 'adminkevin', 'admin@example.com', '$2b$10$ZbtlA45JW26HeRDLu94NCup969OPd.BaNYNgFWUTIPk.9wryMeiuS', 'administrador', '2024-07-11 02:48:37', '2024-07-11 02:53:28'),
(16, 'jose', 'jozzcarcamo50@gmail.com', '$2b$10$.JpmvmBYF6lN2nTqKR1gaey7VCZSnkiqYkI0XFQLtpMLYYFrUWfPy', 'usuario', '2024-07-11 04:18:30', '2024-07-11 04:18:30'),
(31, 'kevin', 'kevinwittner92@gmail.com', '$2b$10$grozkyD24Gb6Cbmhpb2Xs.3Zpl51XzoadYsuov0ySub96j0sI1i1y', 'usuario', '2024-07-11 15:10:09', '2024-07-11 15:10:09'),
(32, 'kiwy', 'sadas@sada', '$2b$10$kgyUrMHfryXHG9SOIlUgHelHiCi7LsTKI8h0xNYIDHZcA8iOstK5W', 'usuario', '2024-07-11 15:13:30', '2024-07-11 15:13:30'),
(33, 'prueba', 'asd@asd', '$2b$10$iq9zORqw/7BDirALRjGG1u6PCl6zgWMUOyuzJIZaAuUKJ60pfAsl2', 'usuario', '2024-07-11 16:28:53', '2024-07-11 16:28:53');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `indumentaria`
--
ALTER TABLE `indumentaria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `posteos`
--
ALTER TABLE `posteos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `indumentaria`
--
ALTER TABLE `indumentaria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `posteos`
--
ALTER TABLE `posteos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD CONSTRAINT `sesiones_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
