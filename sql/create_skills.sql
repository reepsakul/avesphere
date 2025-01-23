CREATE TABLE general_skill (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    rule TEXT,
    conditions TEXT,
    price NUMERIC
);

CREATE TABLE command_skill (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    rule TEXT,
    conditions TEXT,
    fighting_techniques TEXT,
    price NUMERIC
);

CREATE TABLE fight_skill (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    rule TEXT,
    conditions TEXT,
    fighting_techniques TEXT,
    price NUMERIC
);

CREATE TABLE brawl_skill (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    rule TEXT,
    conditions TEXT,
    fighting_techniques TEXT,
    price NUMERIC
);

CREATE TABLE destiny_skill (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    rule TEXT,
    conditions TEXT,
    price NUMERIC
);