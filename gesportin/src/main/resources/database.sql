CREATE TABLE `Tipoarticulo` (
  `id` bigint NOT NULL,
  `descripcion` varchar(255) COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

ALTER TABLE `Tipoarticulo`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Tipoarticulo`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;
COMMIT;
