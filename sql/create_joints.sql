CREATE TABLE character_general_skill (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    character_id BIGINT REFERENCES character(id) ON DELETE CASCADE,
    skill_id BIGINT REFERENCES general_skill (id) ON DELETE CASCADE
);

CREATE TABLE character_command_skill (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    character_id BIGINT REFERENCES character(id) ON DELETE CASCADE,
    skill_id BIGINT REFERENCES command_skill (id) ON DELETE CASCADE
);

CREATE TABLE character_fight_skill (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    character_id BIGINT REFERENCES character(id) ON DELETE CASCADE,
    skill_id BIGINT REFERENCES fight_skill (id) ON DELETE CASCADE
);

CREATE TABLE character_brawl_skill (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    character_id BIGINT REFERENCES character(id) ON DELETE CASCADE,
    skill_id BIGINT REFERENCES brawl_skill (id) ON DELETE CASCADE
);

CREATE TABLE character_destiny_skill (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    character_id BIGINT REFERENCES character(id) ON DELETE CASCADE,
    skill_id BIGINT REFERENCES destiny_skill (id) ON DELETE CASCADE
);

CREATE TABLE campaign_players (
    campaign_id BIGINT REFERENCES campaign (id) ON DELETE CASCADE,
    end_user_id BIGINT REFERENCES end_user (id) ON DELETE CASCADE,
    character_id BIGINT REFERENCES character(id),
    role_id BIGINT REFERENCES role (id),
    primary key (campaign_id, end_user_id)
);