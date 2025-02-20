CREATE TABLE USERS {
    ID INT AUTO_INCREMENT PRIMARY KEY,
    USERNAME VARCHAR(255) NOT NULL,
    UPASSWORD VARCHAR(255) NOT NULL,
    CREATED DATETIME TIMESTAMP DEFAULT TIMESTAMP,
    UDESCRIPTION TEXT,
    LAST_MODIFIED TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
}


