CREATE TABLE IF NOT EXISTS account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    balance BIGINT,
    number BIGINT
);

INSERT INTO
    account (balance, number)
VALUES
    (1000, 1234567890);

CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    account_id INT,
    FOREIGN KEY (account_id) REFERENCES account(id)
);

INSERT INTO
    user (email, password, name, account_id)
VALUES
    (
        'teste@example.com',
        'senha123',
        'Usuário Teste',
        1
    );

CREATE TABLE IF NOT EXISTS transaction (
    id VARCHAR(255) PRIMARY KEY,
    account_id INT,
    external_id VARCHAR(255) NULL,
    amount double,
    type VARCHAR(255),
    sourceDestinationName VARCHAR(255),
    status VARCHAR(255),
    date DATETIME,
    CONSTRAINT FK_account_id FOREIGN KEY (account_id) REFERENCES account(id)
);