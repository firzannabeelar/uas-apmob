create database api_rn;

use api_rn;

CREATE TABLE mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    npm VARCHAR(50),
    nama VARCHAR(50),
    program_studi VARCHAR(50),
    tanggal_input TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO mahasiswa (npm, nama, program_studi) VALUES
('2100012349', 'Edwin', 'Manajemen');

SELECT * FROM mahasiswa ;

CREATE TABLE jobdesk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_jobdesk VARCHAR(255) NOT NULL
);

CREATE TABLE pegawai_jobdesk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pegawai_id INT NOT NULL,
    jobdesk_id INT NOT NULL,
    FOREIGN KEY (pegawai_id) REFERENCES mahasiswa(id),
    FOREIGN KEY (jobdesk_id) REFERENCES jobdesk(id)
);

INSERT INTO jobdesk (nama_jobdesk) VALUES 
('Manager Proyek'),
('Analis Sistem'),
('Pengembang Perangkat Lunak'),
('Penguji Perangkat Lunak'),
('Administrator Basis Data'),
('Teknisi Jaringan'),
('Desainer UI/UX'),
('Spesialis Keamanan Cyber'),
('Technical Support'),
('Konsultan IT');

-- Add status column to pegawai_jobdesk
ALTER TABLE pegawai_jobdesk 
ADD COLUMN status TINYINT DEFAULT 0;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
