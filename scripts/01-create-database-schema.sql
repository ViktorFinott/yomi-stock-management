-- Criação completa do banco de dados para o sistema Yomi

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'manager', 'user')),
    avatar TEXT,
    phone VARCHAR(50),
    department VARCHAR(100),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de inventário
CREATE TABLE IF NOT EXISTS inventory_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    min_quantity INTEGER NOT NULL DEFAULT 0,
    location VARCHAR(255) NOT NULL,
    supplier VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) NOT NULL CHECK (status IN ('in-stock', 'low-stock', 'out-of-stock')),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES users(id)
);

-- Tabela de solicitações
CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('inventory', 'support', 'maintenance')),
    priority VARCHAR(50) NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'in-progress', 'approved', 'rejected', 'completed')),
    requester_id INTEGER NOT NULL REFERENCES users(id),
    assigned_to INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Tabela de canais de comunicação
CREATE TABLE IF NOT EXISTS channels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de membros dos canais
CREATE TABLE IF NOT EXISTS channel_members (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(channel_id, user_id)
);

-- Tabela de mensagens
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
    sender_id INTEGER NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    message_type VARCHAR(50) NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'system', 'file')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de logs de atividades
CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INTEGER,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_inventory_status ON inventory_items(status);
CREATE INDEX idx_inventory_category ON inventory_items(category);
CREATE INDEX idx_requests_status ON requests(status);
CREATE INDEX idx_requests_requester ON requests(requester_id);
CREATE INDEX idx_messages_channel ON messages(channel_id);
CREATE INDEX idx_messages_created ON messages(created_at);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);

-- Triggers para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_requests_updated_at BEFORE UPDATE ON requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
