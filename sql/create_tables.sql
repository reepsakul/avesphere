CREATE TABLE end_user (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    pw TEXT NOT NULL,
    email TEXT UNIQUE
);

CREATE TABLE general_info (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    sex TEXT NOT NULL,
    race TEXT NOT NULL,
    culture TEXT NOT NULL,
    profession TEXT NOT NULL,
    social_status TEXT NOT NULL,
    hometown TEXT NOT NULL,
    family TEXT NOT NULL,
    age NUMERIC NOT NULL,
    date_of_birth TEXT NOT NULL,
    hair_color TEXT NOT NULL,
    eye_color TEXT NOT NULL,
    size NUMERIC NOT NULL,
    weight NUMERIC NOT NULL,
    characteristics TEXT NOT NULL
);

CREATE TABLE base_stats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    MU NUMERIC,
    KL NUMERIC,
    "IN" NUMERIC,
    CH NUMERIC,
    FF NUMERIC,
    GE NUMERIC,
    KO NUMERIC,
    KK NUMERIC,
    LeP_zukauf NUMERIC,
    AsP_zukauf NUMERIC,
    KaP_zukauf NUMERIC
);

CREATE TABLE talents (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fliegen NUMERIC,
    gaukeleien NUMERIC,
    faehrtenlesen NUMERIC,
    klettern NUMERIC,
    koerperbeherrschung NUMERIC,
    kraftakt NUMERIC,
    reiten NUMERIC,
    schwimmen NUMERIC,
    selbstbeherrschung NUMERIC,
    singen NUMERIC,
    sinnesschärfe NUMERIC,
    tanzen NUMERIC,
    taschendiebstahl NUMERIC,
    verbergen NUMERIC,
    zechen NUMERIC,
    bekehren_überzeugen NUMERIC,
    betoeren NUMERIC,
    einschuechtern NUMERIC,
    etikette NUMERIC,
    gassenwissen NUMERIC,
    menschenkenntnis NUMERIC,
    ueberreden NUMERIC,
    verkleiden NUMERIC,
    willenskraft NUMERIC,
    fesseln NUMERIC,
    fischen_angeln NUMERIC,
    orientierung NUMERIC,
    pflanzenkunde NUMERIC,
    tierkunde NUMERIC,
    wildnisleben NUMERIC,
    brett_glücksspiel NUMERIC,
    geographie NUMERIC,
    geschichtswissen NUMERIC,
    goetter_kulte NUMERIC,
    kriegskunst NUMERIC,
    magiekunde NUMERIC,
    mechanik NUMERIC,
    rechnen NUMERIC,
    rechtskunde NUMERIC,
    sagen_legenden NUMERIC,
    sphaerenkunde NUMERIC,
    sternkunde NUMERIC,
    alchimie NUMERIC,
    boote_schiffe NUMERIC,
    fahrzeuge NUMERIC,
    handel NUMERIC,
    heilkunde_gift NUMERIC,
    heilkunde_krankheiten NUMERIC,
    heilkunde_seele NUMERIC,
    heilkunde_wunden NUMERIC,
    holzbearbeitung NUMERIC,
    lebensmittelbearbeitung NUMERIC,
    lederbearbeitung NUMERIC,
    malen_zeichnen NUMERIC,
    metallbearbeitung NUMERIC,
    musizieren NUMERIC,
    schloesserknacken NUMERIC,
    steinbearbeitung NUMERIC,
    stoffbearbeitung NUMERIC
);

CREATE TABLE role (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT
);

CREATE TABLE character(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    end_user_id BIGINT REFERENCES end_user (id) ON DELETE CASCADE,
    general_info_id BIGINT REFERENCES general_info (id),
    base_stats_id BIGINT REFERENCES base_stats (id),
    talents_id BIGINT REFERENCES talents (id),
    AP_collected NUMERIC
);

CREATE TABLE campaign (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    gamemaster_id BIGINT REFERENCES end_user (id)
);