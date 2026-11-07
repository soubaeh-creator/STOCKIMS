-- =====================================================================
-- StockIMS - export MySQL (structure + 3 articles de test)
-- Compatible MySQL local 8.x. Aucun mot de passe dans ce fichier.
--
-- ATTENTION : ce script SUPPRIME puis recrée les tables article, entree
-- et sortie de la base ci-dessous. Toutes les données de ces trois
-- tables sont perdues. C'est voulu : on repart d'un stock de 0.
--
-- Nom de la base : stockims_db (le même que dans application.properties).
-- Si tu changes de nom, modifie ici CREATE DATABASE et USE, puis
-- spring.datasource.url dans application-local.properties.
-- =====================================================================

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS stockims_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE stockims_db;

-- On supprime d'abord les tables qui dépendent d'article (clés étrangères).
DROP TABLE IF EXISTS sortie;
DROP TABLE IF EXISTS entree;
DROP TABLE IF EXISTS article;

-- ---------------------------------------------------------------------
-- Table article : id, reference unique, designation
-- ---------------------------------------------------------------------
CREATE TABLE article (
  id          BIGINT       NOT NULL AUTO_INCREMENT,
  reference   VARCHAR(20)  NOT NULL,
  designation VARCHAR(80)  NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT uk_article_reference UNIQUE (reference)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table entree : id, article_id, quantite, date_mouvement
-- La quantité enregistrée est toujours positive.
-- ---------------------------------------------------------------------
CREATE TABLE entree (
  id              BIGINT  NOT NULL AUTO_INCREMENT,
  article_id      BIGINT  NOT NULL,
  quantite        INT     NOT NULL,
  date_mouvement  DATE    NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_entree_article FOREIGN KEY (article_id) REFERENCES article (id),
  CONSTRAINT ck_entree_quantite CHECK (quantite > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table sortie : id, article_id, quantite, date_mouvement
-- La quantité enregistrée est toujours positive (l'effet négatif sur le
-- stock est calculé par le code Java : Sortie.quantiteSignee()).
-- ---------------------------------------------------------------------
CREATE TABLE sortie (
  id              BIGINT  NOT NULL AUTO_INCREMENT,
  article_id      BIGINT  NOT NULL,
  quantite        INT     NOT NULL,
  date_mouvement  DATE    NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_sortie_article FOREIGN KEY (article_id) REFERENCES article (id),
  CONSTRAINT ck_sortie_quantite CHECK (quantite > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Trois articles de test, SANS aucun mouvement : stock de départ = 0
-- ---------------------------------------------------------------------
INSERT INTO article (id, reference, designation) VALUES
  (1, 'TIS-001', 'Rouleau de coton'),
  (2, 'TIS-002', 'Bobine de fil'),
  (3, 'TIS-003', 'Rouleau de denim');