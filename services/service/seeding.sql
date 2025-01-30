-- Types d'entreprise
INSERT INTO company_type (id, name) VALUES (1, 'Concessionnaire'), (2, 'Partenaire');

-- Entreprises
INSERT INTO company (id, name, fk_type, address, number, city, citycode, contact_first_name, contact_last_name, contact_mail, contact_phone)
  VALUES ('2bbe6bdc-6aee-42d9-bfd6-c303826eaea8', 'Agence Druet', 1, 'rue de la Paix', '1', 'Paris', '75000', 'Jean', 'Druet', 'jeandruet@voituresdruet.com', '01 02 03 04 05')
  , ('6e7f2bb7-411d-4cf4-9f6e-cc51ca726143', 'Agence Dupont', 1, 'rue de la Liberté', '20', 'Lyon', '69000', 'Pierre', 'Dupont', 'contact@agencedupont.com', '06 07 08 09 10')
  , ('9521c673-3135-4512-bf8b-5809b18eef3a', 'SAS livraisons Didier', 2, 'rue de la République', '10', 'Marseille', '13000', 'Henry', 'Didier', 'henry.didier.livraison@gmail.com', '03 44 53 64 93');

-- Utilisateurs
INSERT INTO app_user (first_name, last_name, email, phone, password, fk_company) 
  VALUES ('Jean', 'Druet', 'jeandruet@voituresdruet.com', '01 02 03 04 05', 'password123', '2bbe6bdc-6aee-42d9-bfd6-c303826eaea8')
  , ('Henry', 'Didier', 'henry.didier.livraison@gmail.com', '03 44 53 64 93', 'password123', '9521c673-3135-4512-bf8b-5809b18eef3a');


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

-- Moto
INSERT INTO moto (id, fk_model, serial_number, price, color, capacity, year, warranty_end, next_service_date, next_service_distance)
  VALUES ('15e425bd-4565-41e7-85e5-0f8bdf42d536', 1, 'T1200-2', 12000, 'Noir mat', 20, 2021, '2023-01-01', '2025-09-01', 55000)
  , ('02c65295-0e7a-48ea-85d5-56c4bb2456c4', 5, 'S400-1', 23000, 'Bleu roi', 25, 2023, '2025-01-01', '2027-11-01', 60000)
  , ('0d985b74-7326-4b54-8d3f-a677e089bdc1', 10, 'T660-5', 20000, 'Ambre', 20, 2022, '2024-01-01' , '2026-03-01', 50000);