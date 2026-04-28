-- Dados iniciais com o usuário admin solicitado

-- Inserir usuário administrador
-- Nota: A senha 'Mudar@123' deve ser hasheada na aplicação real
-- Este é apenas um exemplo com hash bcrypt simulado
INSERT INTO users (name, email, password_hash, role, department) VALUES
('Viktor Cesar', 'Viktorcesar66@gmail.com', '$2a$10$example.hash.for.Mudar@123', 'admin', 'TI');

-- Inserir canais padrão
INSERT INTO channels (name, description, created_by) VALUES
('geral', 'Discussões gerais da equipe', 1),
('suporte-ti', 'Suporte técnico e problemas', 1),
('atualizacoes-inventario', 'Notificações de mudanças no inventário', 1);

-- Adicionar admin aos canais
INSERT INTO channel_members (channel_id, user_id) VALUES
(1, 1),
(2, 1),
(3, 1);

-- Mensagem de boas-vindas
INSERT INTO messages (channel_id, sender_id, content, message_type) VALUES
(1, 1, 'Bem-vindo ao sistema Yomi de gestão de estoque!', 'system');

-- Exemplos de itens de inventário
INSERT INTO inventory_items (name, category, quantity, min_quantity, location, supplier, price, status, description, created_by) VALUES
('Dell Latitude 5420', 'Hardware', 15, 5, 'Almoxarifado A', 'Dell Brasil', 4500.00, 'in-stock', 'Notebook corporativo i5 11ª geração', 1),
('Monitor LG 24"', 'Hardware', 8, 3, 'Almoxarifado A', 'LG Electronics', 850.00, 'in-stock', 'Monitor Full HD IPS', 1),
('Teclado Logitech K120', 'Accessories', 25, 10, 'Almoxarifado B', 'Logitech', 45.00, 'in-stock', 'Teclado USB padrão', 1),
('Mouse Logitech M170', 'Accessories', 30, 10, 'Almoxarifado B', 'Logitech', 35.00, 'in-stock', 'Mouse wireless', 1),
('Switch TP-Link 24 portas', 'Networking', 3, 2, 'Sala de Servidores', 'TP-Link', 1200.00, 'low-stock', 'Switch Gigabit gerenciável', 1),
('Licença Windows 11 Pro', 'Software', 50, 20, 'Digital', 'Microsoft', 800.00, 'in-stock', 'Licença corporativa', 1);
