-- Types d'entreprise
INSERT INTO company_type (id, name) VALUES (1, 'Concessionnaire'), (2, 'Partenaire');

-- Entreprises
INSERT INTO company (id, name, fk_type, address, number, city, citycode, contact_first_name, contact_last_name, contact_mail, contact_phone)
  VALUES ('2bbe6bdc-6aee-42d9-bfd6-c303826eaea8', 'Agence Druet', 1, 'rue de la Paix', '1', 'Paris', '75000', 'Jean', 'Druet', 'jeandruet@voituresdruet.com', '01 02 03 04 05')
  , ('6e7f2bb7-411d-4cf4-9f6e-cc51ca726143', 'Agence Dupont', 1, 'rue de la Liberté', '20', 'Lyon', '69000', 'Pierre', 'Dupont', 'contact@agencedupont.com', '06 07 08 09 10')
  , ('9521c673-3135-4512-bf8b-5809b18eef3a', 'SAS livraisons Didier', 2, 'rue de la République', '10', 'Marseille', '13000', 'Henry', 'Didier', 'henry.didier.livraison@gmail.com', '03 44 53 64 93');

-- Utilisateurs
INSERT INTO app_user (id, first_name, last_name, email, phone, password, fk_company) 
  VALUES ('fb913537-12cf-446c-88d0-1d1e9cb2e24b', 'Jean', 'Druet', 'jeandruet@voituresdruet.com', '01 02 03 04 05', 'password123', '2bbe6bdc-6aee-42d9-bfd6-c303826eaea8') -- Concessionnaire
  , ('be326539-c9de-4dcb-a979-1933995e9df4', 'Henry', 'Didier', 'henry.didier.livraison@gmail.com', '03 44 53 64 93', 'password123', '9521c673-3135-4512-bf8b-5809b18eef3a'); -- Partenaire


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
INSERT INTO moto (id, fk_model, serial_number, price, color, capacity, year, warranty_end, next_service_date, next_service_distance, fk_dealer, fk_owner)
  VALUES ('15e425bd-4565-41e7-85e5-0f8bdf42d536', 1, 'T1200-2', 12000, 'Noir mat', 20, 2021, '2023-01-01', '2025-09-01', 55000, '2bbe6bdc-6aee-42d9-bfd6-c303826eaea8', NULL)
  , ('02c65295-0e7a-48ea-85d5-56c4bb2456c4', 5, 'S400-1', 23000, 'Bleu roi', 25, 2023, '2025-01-01', '2027-11-01', 60000, '2bbe6bdc-6aee-42d9-bfd6-c303826eaea8', 'be326539-c9de-4dcb-a979-1933995e9df4')
  , ('0d985b74-7326-4b54-8d3f-a677e089bdc1', 10, 'T660-5', 20000, 'Ambre', 20, 2022, '2024-01-01' , '2026-03-01', 50000, '6e7f2bb7-411d-4cf4-9f6e-cc51ca726143', NULL);

-- Pièces détachées
INSERT INTO spare_part (id, label, picture_link) 
  VALUES (1, 'Bougie', 'spare_parts/bougies.png'), (2, 'Chaine', 'spare_parts/chaine.png')
  , (3, 'Pignon', 'spare_parts/pignon.png'), (4, 'Bobine', 'spare_parts/bobine.png');

-- Pièces détachées : Company
INSERT INTO spare_part_company (fk_part, fk_company, stock)
  VALUES (1, '2bbe6bdc-6aee-42d9-bfd6-c303826eaea8', 10), (2, '2bbe6bdc-6aee-42d9-bfd6-c303826eaea8', 5), (3, '2bbe6bdc-6aee-42d9-bfd6-c303826eaea8', 3), (4, '2bbe6bdc-6aee-42d9-bfd6-c303826eaea8', 7)
  , (1, '6e7f2bb7-411d-4cf4-9f6e-cc51ca726143', 5), (2, '6e7f2bb7-411d-4cf4-9f6e-cc51ca726143', 3), (3, '6e7f2bb7-411d-4cf4-9f6e-cc51ca726143', 2), (4, '6e7f2bb7-411d-4cf4-9f6e-cc51ca726143', 4);

-- Pièces détachées : Commandes
INSERT INTO spare_part_command (id, fk_spare_part, fk_company, remaining_quantity, ordered_quantity, total_price, date_order, date_received)
  VALUES (1, 1, '2bbe6bdc-6aee-42d9-bfd6-c303826eaea8', 2, 10, 233.99, '2022-01-01', '2022-01-10'), (2, 4, '2bbe6bdc-6aee-42d9-bfd6-c303826eaea8', 5, 5, 50.00, '2022-01-01', '2022-01-10')
  , (3, 3, '2bbe6bdc-6aee-42d9-bfd6-c303826eaea8', 1, 5, 100.00, '2022-01-01', '2022-01-10'), (4, 2, '6e7f2bb7-411d-4cf4-9f6e-cc51ca726143', 3, 5, 150.00, '2022-01-01', '2022-01-10');

-- Réparations moto
INSERT INTO moto_service (id, fk_moto, date, cost, note)
  VALUES (1, '15e425bd-4565-41e7-85e5-0f8bdf42d536', '2022-01-01', 200, 'Réparation de la roue arrière'), (2, '15e425bd-4565-41e7-85e5-0f8bdf42d536', '2022-01-01', 100, 'Réparation de la roue avant');

-- Panne moto
INSERT INTO moto_breakdown (id, fk_moto, date, note)
  VALUES (1, '15e425bd-4565-41e7-85e5-0f8bdf42d536', '2022-01-01', 'Panne de la roue arrière'), (2, '15e425bd-4565-41e7-85e5-0f8bdf42d536', '2022-01-01', 'Panne de la roue avant');