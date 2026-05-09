-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-05-2026 a las 22:06:51
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

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id_comment`, `content`, `created_at`, `id_user`, `id_post`, `active`) VALUES
(13, 'aaaaaaa', '2026-04-18 14:47:39', 7, 57, 1),
(14, 'ffffffffff', '2026-04-18 14:47:43', 7, 57, 1),
(15, 'aaaaaaa', '2026-04-18 15:38:54', 7, 57, 1),
(16, 'aaaaaaa2', '2026-04-18 15:40:03', 7, 57, 1),
(17, 'aaaaaaasssss', '2026-04-18 16:33:40', 7, 57, 1),
(18, 'prueba 2', '2026-05-09 18:52:40', 7, 57, 1);

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

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id_post`, `title`, `content`, `created_at`, `approved_at`, `is_approved`, `id_user`, `id_world_cup`, `id_category`, `media_urls`) VALUES
(57, 'titulo 3', 'cont 3', '2026-04-18 14:47:04', NULL, 0, 7, 1, 1, NULL),
(59, 'asdsada', 'sdadasd', '2026-05-07 22:48:27', NULL, 0, 7, 1, 1, NULL),
(60, '2', '2', '2026-05-09 18:47:57', NULL, 0, 7, 1, 1, '[{\"type\":\"image\",\"url\":\"/uploads/1778352477305-60265239-cobblestones-floor-texture.jpg\"}]'),
(61, '2', '2', '2026-05-09 18:48:12', NULL, 0, 7, 1, 1, '[{\"type\":\"video\",\"url\":\"/uploads/1778352492917-ATE_AAPG_A4.mp4\"}]'),
(62, '2', '222', '2026-05-09 18:49:21', NULL, 0, 7, 1, 1, '[{\"type\":\"image\",\"url\":\"/uploads/1778352561847-60265239-cobblestones-floor-texture.jpg\"}]');

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
(3, 7, 1, '2026-04-25 15:13:18');

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
(1, 'bob', '2008-06-18', '', '', 'Chile', NULL, 'asdf@hotmail.com', 'Asdf1234', 1),
(2, 'waos', '2015-06-19', '', '', 'México', NULL, 'Qwer@hotmail.com', 'Qwer1234', 1),
(7, 'bye', '2026-04-01', '', '', 'Colombia', NULL, 'Zxcv@hotmail.com', 'Zxcv1234', 1);

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
(1, 'World Cup Test', '2022-11-20', 'Qatar', NULL, 'Mundial de prueba');

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
  MODIFY `id_post` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `reactions`
--
ALTER TABLE `reactions`
  MODIFY `id_reaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id_subscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `user_types`
--
ALTER TABLE `user_types`
  MODIFY `id_user_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `world_cups`
--
ALTER TABLE `world_cups`
  MODIFY `id_world_cup` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
