CREATE TABLE GAME_REVIEW (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    SCORE INT NOT NULL,
    GAME VARCHAR(100) NOT NULL,
    COMPANY VARCHAR(255),
    COMMENTS VARCHAR (500),
    PRIMARY KEY (ID)
);


INSERT INTO GAME_REVIEW (SCORE, GAME, COMPANY)
VALUES (95, 'Far Cry 4', 'MetaCritic'),
       (100, 'Far Cry 4', 'IGN'),
       (100, 'Call of Duty 9', 'IGN'),
       (45, 'Call of Duty 9', 'MetaCritic'),
       (70, 'Terraria', 'IGN'),
       (87, 'Terraria', 'GameSpot'),
       (91, 'Terraria', 'MetaCrtic');