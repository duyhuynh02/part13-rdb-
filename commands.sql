/*
  id (unique, incrementing id)
  author (string)
  url (string that cannot be empty)
  title (string that cannot be empty)
  likes (integer with default value zero)
*/
CREATE TABLE blogs(
  id SERIAL PRIMARY KEY, 
  author text,
  url text NOT NULL, 
  title text NOT NULL, 
  likes integer default 0
);

INSERT INTO blogs (author, url, title) values ('todsacerdoti', 
        'https://sqlite.org/draft/whybytecode.html', 
        'Why SQLite Uses ByteCode',
        );
INSERT INTO blogs (author, url, title) values (
  'ubolonton_', 
  'https://typespec.io/blog/2024-04-25-introducing', 
  'Introducing TypeSpec: A New Language for API-Centric Development');

-- For POSTMAN
{
  "author": "markostamcar",
  "url": "https://www.racunalniski-muzej.si/en40-years-later-a-game-for-the-zx-spectrum-will-be-once-again-broadcast-over-fm-radio/",
  "title": "40 years later, a game for the ZX Spectrum will be again broadcast over FM radio",
  "likes": 116
}

{
  "author": "pavel_lishin",
  "url": "https://blog.plover.com/tech/its-an-age-of-marvels.html/",
  "title": "It's an Age of Marvels ",
  "likes": 35
}

-- user POSTMAN
{
  "username": "duyhuynh",
  "name": "Duy Huynh 01",
  "email": "duyhuynh01@gmail.com",
}

-- TO Login 
{
  "username": "duyhuynh",
  "password": "password"
}