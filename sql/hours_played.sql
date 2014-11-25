CREATE TABLE HOURS_PLAYED (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    GAME VARCHAR(100) NOT NULL,
    HOURS INT NOT NULL,
    PLAYER VARCHAR(100) NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO HOURS_PLAYED (GAME, HOURS, PLAYER)
    VALUES

    ('Terraria', 15, 'Mitchell'),
    ('Far Cry 4', 10, 'Mitchell'),
    ('Minecraft', 2, 'Mitchell'),
    ('Space Engineers', 45, 'Mitchell'),
    ('Terraria', 10, 'Zac'),
    ('Minecraft', 13, 'Zac'),
    ('Binding of Isaac', 23, 'Zac'),
    ('Call of Duty 6', 10, 'Bob'),
    ('Call of Duty 7', 15, 'Bob'),
    ('Assasins Creed 4', 10, 'Bob'),
    ('Assasins Creed Unity', 20, 'Bob');
