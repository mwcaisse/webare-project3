CREATE TABLE HOURS_PLAYED (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    GAME VARCHAR(100) NOT NULL,
    HOURS INT NOT NULL,
    PLAYER VARCHAR(100) NOT NULL,
    PRIMARY KEY (ID)
)