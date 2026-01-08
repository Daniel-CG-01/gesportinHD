

CREATE TABLE `partido` (
  `id` bigint NOT NULL,
  `nombre_rival` varchar(255) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `id_equipo` bigint NOT NULL,
  `local` tinyint(1) NOT NULL,
  `resultado` varchar(255) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

ALTER TABLE `partido`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `partido`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;
COMMIT;