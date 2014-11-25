CREATE TABLE AVERAGE_SPENT (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    MONTH VARCHAR(20) NOT NULL,
    AMOUNT DOUBLE NOT NULL,
    PLAYER VARCHAR(20) NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO AVERAGE_SPENT (PLAYER, MONTH, AMOUNT)
VALUES
    ('Mitchell', 'JAN', 120),
    ('Mitchell', 'FEB', 20),
    ('Mitchell', 'MAR', 120),
    ('Mitchell', 'APR', 200),
    ('Mitchell', 'MAY', 10),
    ('Mitchell', 'JUN', 60),
    ('Mitchell', 'JUL', 400),
    ('Mitchell', 'AUG', 120),
    ('Mitchell', 'SEP', 60),
    ('Mitchell', 'OCT', 10),
    ('Mitchell', 'NOV', 350),
    ('Mitchell', 'DEC', 275),

    ('Zac', 'JAN', 60),
    ('Zac', 'FEB', 60),
    ('Zac', 'MAR', 20),
    ('Zac', 'APR', 20),
    ('Zac', 'MAY', 15),
    ('Zac', 'JUN', 120),
    ('Zac', 'JUL', 180),
    ('Zac', 'AUG', 60),
    ('Zac', 'SEP', 50),
    ('Zac', 'OCT', 30),
    ('Zac', 'NOV', 180),
    ('Zac', 'DEC', 240),

    ('Bob', 'JAN', 80),
    ('Bob', 'FEB', 240),
    ('Bob', 'MAR', 120),
    ('Bob', 'APR', 10),
    ('Bob', 'MAY', 0),
    ('Bob', 'JUN', 100),
    ('Bob', 'JUL', 750),
    ('Bob', 'AUG', 120),
    ('Bob', 'SEP', 240),
    ('Bob', 'OCT', 0),
    ('Bob', 'NOV', 575),
    ('Bob', 'DEC', 615);