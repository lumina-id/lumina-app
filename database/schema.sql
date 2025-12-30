CREATE TABLE IF NOT EXISTS audio_cache (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text_hash VARCHAR(64) NOT NULL,
    text_content TEXT NOT NULL,
    audio_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_text_hash (text_hash)
);
