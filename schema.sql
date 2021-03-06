CREATE TABLE articles (
    pid SERIAL PRIMARY KEY,
    title VARCHAR(255),
    body VARCHAR(255),
    author VARCHAR(255),
    author_id integer,
    url VARCHAR(255),
    date timestamp(4) with time zone
);


CREATE TABLE gifs (
    gid serial NOT NULL ,
    title character(255),
    author character(255),
    author_id integer,
    avatar text,
    url character(255),
    date timestamp(4) with time zone,
    id integer,
    CONSTRAINT gifs_pkey PRIMARY KEY (gid)
);

CREATE TABLE comments (
    cid serial NOT NULL,
    comment character(255),
    post_id integer,
    gif_id integer,
    author character(255),
    author_id integer,
    avatar character(255),
    date timestamp(4) with time zone,
    id integer NOT NULL,
    CONSTRAINT comments_pkey PRIMARY KEY (cid)
);


create TABLE users (
    uid serial NOT NULL,
    username character(255),
    email character(255),
    password text,
    about character(255),
    twitter character(255),
    github character(255),
    facebook character(255),
    url character(255),
    CONSTRAINT users_pkey PRIMARY KEY (uid)
);