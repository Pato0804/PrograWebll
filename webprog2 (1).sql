-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 14-05-2026 a las 01:49:53
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
-- Base de datos: `webprog2`
--
CREATE DATABASE IF NOT EXISTS `webprog2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `webprog2`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id_category`, `name`, `description`) VALUES
(1, 'World Cup History', 'Posts related to FIFA World Cups'),
(2, 'test', 'example');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id_comment` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `id_user` int(11) NOT NULL,
  `id_post` int(11) NOT NULL,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `friendships`
--

CREATE TABLE `friendships` (
  `id_friendship` int(11) NOT NULL,
  `requester_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  `request_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notifications`
--

CREATE TABLE `notifications` (
  `id_notification` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `type` enum('friend','comment','reaction','system') NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id_post` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `approved_at` datetime DEFAULT NULL,
  `is_approved` tinyint(1) DEFAULT 0,
  `id_user` int(11) NOT NULL,
  `id_world_cup` int(11) NOT NULL,
  `id_category` int(11) DEFAULT NULL,
  `media_urls` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reactions`
--

CREATE TABLE `reactions` (
  `id_reaction` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_post` int(11) NOT NULL,
  `type` enum('like','dislike') NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id_subscription` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_world_cup` int(11) NOT NULL,
  `subscription_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subscriptions`
--

INSERT INTO `subscriptions` (`id_subscription`, `id_user`, `id_world_cup`, `subscription_date`) VALUES
(6, 8, 1, '2026-05-13 23:46:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `birth_date` date NOT NULL,
  `photo_url` text DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `birth_place` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_user_type` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `full_name`, `birth_date`, `photo_url`, `gender`, `country`, `birth_place`, `email`, `password`, `id_user_type`) VALUES
(1, 'bob', '2008-06-18', NULL, '', 'Chile', NULL, 'asdf@hotmail.com', 'Asdf1234', 1),
(2, 'waos', '2015-06-19', 'http://localhost:3000/uploads/profile_photos/1778711495063-Uanl-color-sim.png', '', 'México', NULL, 'Qwer@hotmail.com', 'Qwer1234', 1),
(7, 'bye', '2026-04-01', '', '', 'Colombia', NULL, 'Zxcv@hotmail.com', 'Zxcv1234', 1),
(8, 'Patricio Gonzalez', '2004-02-08', 'http://localhost:3000/uploads/profile_photos/1778716003325-image-removebg-preview.png', '', 'México', NULL, 'patogzz08@gmail.com', 'Pgzz080204', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_types`
--

CREATE TABLE `user_types` (
  `id_user_type` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_types`
--

INSERT INTO `user_types` (`id_user_type`, `name`, `description`) VALUES
(1, 'normal', 'Normal user'),
(2, 'admin', 'Administrator user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `world_cups`
--

CREATE TABLE `world_cups` (
  `id_world_cup` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `host` varchar(100) DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `world_cups`
--

INSERT INTO `world_cups` (`id_world_cup`, `name`, `date`, `host`, `image_url`, `description`) VALUES
(1, 'Mundial 1930', '1930-07-13', 'Uruguay 🇺🇾', 'https://flagcdn.com/w640/uy.png', 'El primer torneo mundialista de la historia, ganado por la selección anfitriona.'),
(2, 'Mundial 1934', '1934-05-27', 'Italia 🇮🇹', 'https://flagcdn.com/w640/it.png', 'El primer mundial disputado en Europa, marcado por el tenso contexto político de la época.'),
(3, 'Mundial 1938', '1938-06-04', 'Francia 🇫🇷', 'https://flagcdn.com/w640/fr.png', 'El último torneo antes de la Segunda Guerra Mundial; Italia logra el histórico bicampeonato.'),
(4, 'Mundial 1950', '1950-06-24', 'Brasil 🇧🇷', 'https://flagcdn.com/w640/br.png', 'El histórico e inolvidable \"Maracanazo\", donde Uruguay sorprendió al mundo entero.'),
(5, 'Mundial 1954', '1954-06-16', 'Suiza 🇨🇭', 'https://flagcdn.com/w640/ch.png', 'El \"Milagro de Berna\": la sorpresiva victoria de Alemania Federal ante la mítica Hungría.'),
(6, 'Mundial 1958', '1958-06-08', 'Suecia 🇸🇪', 'https://flagcdn.com/w640/se.png', 'El nacimiento de la leyenda de Pelé con tan solo 17 años y la primera estrella para Brasil.'),
(7, 'Mundial 1962', '1962-05-30', 'Chile 🇨🇱', 'https://flagcdn.com/w640/cl.png', 'Brasil logra el bicampeonato en un torneo recordado por su gran dureza física.'),
(8, 'Mundial 1966', '1966-07-11', 'Inglaterra 🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'https://flagcdn.com/w640/gb-eng.png', 'El único título mundial de los inventores del fútbol, logrado dramáticamente en casa.'),
(9, 'Mundial 1970', '1970-05-31', 'México 🇲🇽', 'https://flagcdn.com/w640/mx.png', 'Considerado uno de los mejores mundiales, con el Brasil de Pelé en su máximo esplendor.'),
(10, 'Mundial 1974', '1974-06-13', 'Alemania Federal 🇩🇪', 'https://flagcdn.com/w640/de.png', 'La victoria táctica alemana sobre la revolucionaria \"Naranja Mecánica\" de Johan Cruyff.'),
(11, 'Mundial 1978', '1978-06-01', 'Argentina 🇦🇷', 'https://flagcdn.com/w640/ar.png', 'La primera consagración de la Albiceleste en casa bajo el liderazgo goleador de Mario Kempes.'),
(12, 'Mundial 1982', '1982-06-13', 'España 🇪🇸', 'https://flagcdn.com/w640/es.png', 'El tercer título de Italia tras superar a un Brasil de ensueño y a una dura Alemania.'),
(13, 'Mundial 1986', '1986-05-31', 'México 🇲🇽', 'https://flagcdn.com/w640/mx.png', 'La consagración de Maradona y el mundial de \"La Mano de Dios\".'),
(14, 'Mundial 1990', '1990-06-08', 'Italia 🇮🇹', 'https://flagcdn.com/w640/it.png', 'La revancha de Alemania Federal ante Argentina en un torneo caracterizado por defensas férreas.'),
(15, 'Mundial 1994', '1994-06-17', 'Estados Unidos 🇺🇸', 'https://flagcdn.com/w640/us.png', 'La primera final definida en tanda de penales le otorgó el histórico tetracampeonato a Brasil.'),
(16, 'Mundial 1998', '1998-06-10', 'Francia 🇫🇷', 'https://flagcdn.com/w640/fr.png', 'Zinedine Zidane guía a la anfitriona Francia a conseguir su primer campeonato del mundo.'),
(17, 'Mundial 2002', '2002-05-31', 'Corea/Japón 🇰🇷🇯🇵', 'https://flagcdn.com/w640/jp.png', 'El primer mundial en Asia coronó a Brasil con su \"Pentacampeonato\" de la mano de Ronaldo.'),
(18, 'Mundial 2006', '2006-06-09', 'Alemania 🇩🇪', 'https://flagcdn.com/w640/de.png', 'El \"Cuento de Verano\". Un mundial con estadios increíbles donde Italia se llevó la copa en una final inolvidable.'),
(19, 'Mundial 2010', '2010-06-11', 'Sudáfrica 🇿🇦', 'https://flagcdn.com/w640/za.png', 'El mundial del Waka Waka y la primera estrella para la selección de España.'),
(20, 'Mundial 2014', '2014-06-12', 'Brasil 🇧🇷', 'https://flagcdn.com/w640/br.png', '¡El mundial de la alegría! Una fiesta total en las gradas, el inolvidable 7-1 y Alemania levantando la copa en el Maracaná.'),
(21, 'Mundial 2018', '2018-06-14', 'Rusia 🇷🇺', 'https://flagcdn.com/w640/ru.png', 'Un torneo lleno de sorpresas donde Francia demostró su poderío y la tecnología del VAR cambió el fútbol para siempre.'),
(22, 'Mundial 2022', '2022-11-20', 'Qatar 🇶🇦', 'https://flagcdn.com/w640/qa.png', 'El primer mundial en tierras árabes y el cierre épico para la carrera de Messi.'),
(23, 'Mundial 2026', '2026-06-11', 'MEX / USA / CAN', 'https://flagcdn.com/w640/us.png', 'El primer mundial organizado por tres naciones con un formato histórico de 48 equipos.');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_post` (`id_post`);

--
-- Indices de la tabla `friendships`
--
ALTER TABLE `friendships`
  ADD PRIMARY KEY (`id_friendship`),
  ADD KEY `requester_id` (`requester_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indices de la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id_notification`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id_post`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_world_cup` (`id_world_cup`),
  ADD KEY `id_category` (`id_category`);

--
-- Indices de la tabla `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`id_reaction`),
  ADD UNIQUE KEY `id_user` (`id_user`,`id_post`),
  ADD KEY `id_post` (`id_post`);

--
-- Indices de la tabla `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id_subscription`),
  ADD UNIQUE KEY `id_user` (`id_user`,`id_world_cup`),
  ADD KEY `id_world_cup` (`id_world_cup`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_user_type` (`id_user_type`);

--
-- Indices de la tabla `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id_user_type`);

--
-- Indices de la tabla `world_cups`
--
ALTER TABLE `world_cups`
  ADD PRIMARY KEY (`id_world_cup`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `friendships`
--
ALTER TABLE `friendships`
  MODIFY `id_friendship` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id_notification` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id_post` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `reactions`
--
ALTER TABLE `reactions`
  MODIFY `id_reaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id_subscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `user_types`
--
ALTER TABLE `user_types`
  MODIFY `id_user_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `world_cups`
--
ALTER TABLE `world_cups`
  MODIFY `id_world_cup` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`id_post`) REFERENCES `posts` (`id_post`) ON DELETE CASCADE;

--
-- Filtros para la tabla `friendships`
--
ALTER TABLE `friendships`
  ADD CONSTRAINT `friendships_ibfk_1` FOREIGN KEY (`requester_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `friendships_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id_user`);

--
-- Filtros para la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`id_world_cup`) REFERENCES `world_cups` (`id_world_cup`),
  ADD CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`);

--
-- Filtros para la tabla `reactions`
--
ALTER TABLE `reactions`
  ADD CONSTRAINT `reactions_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `reactions_ibfk_2` FOREIGN KEY (`id_post`) REFERENCES `posts` (`id_post`) ON DELETE CASCADE;

--
-- Filtros para la tabla `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`id_world_cup`) REFERENCES `world_cups` (`id_world_cup`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_user_type`) REFERENCES `user_types` (`id_user_type`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
