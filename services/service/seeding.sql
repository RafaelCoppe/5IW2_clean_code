-- Types d'entreprise
INSERT INTO company_type (id, name) VALUES (1, 'Concessionnaire'), (2, 'Partenaire');

-- Catégories de modèles de moto
INSERT INTO moto_model_category (id, label) VALUES (1, 'ADVENTURE')
  , (2, 'MODERN CLASSICS')
  , (3, 'MOTOCROSS')
  , (4, 'ROADSTERS')
  , (5, 'ROCKET 3')
  , (6, 'SPORT')
  , (7, 'ELECTRIC BIKES (OSET)')
  , (8, 'SPECIAL EDITIONS');

-- Modèle de moto
INSERT INTO moto_model (id, label, fk_category) VALUES (1, 'TIGER 1200 RANGE', 1) -- ADVENTURE
  , (2, 'TIGER 900', 1) -- ADVENTURE
  , (3, 'TIGER 850 SPORT', 1) -- ADVENTURE
  , (4, 'SPEED TWIN 1200', 2) -- MODERN CLASSICS
  , (5, 'SPEED 400', 2) -- MODERN CLASSICS
  , (6, 'BONNEVILLE T100', 2) -- MODERN CLASSICS
  , (7, 'TF 450-RC EDITION', 3) -- MOTOCROSS
  , (8, 'TF 250-X', 3) -- MOTOCROSS
  , (9, 'SPEED TRIPLE 1900 RS', 4) -- ROADSTERS
  , (10, 'TRIDENT 660', 4) -- ROADSTERS
  , (11, 'SPEED TRIPLE 1200 RR', 4); -- ROADSTERS