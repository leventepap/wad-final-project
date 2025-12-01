INSERT INTO BOOK (ISBN, TITLE, EDITION, PUBLICATION) VALUES
(9780606323451, 'Harry Potter and the Philosopher''s Stone', '1st', '1997-06-26'),
(9780007129713, 'The Lord of the Rings: The Fellowship of the Ring', '1st', '1954-07-29'),
(9780007459483, 'A Game of Thrones', '1st', '1996-08-06'),
(9780747538486, 'Harry Potter and the Chamber of Secrets', '1st', '1998-07-02'),
(9780747542155, 'Harry Potter and the Prisoner of Azkaban', '1st', '1999-07-08'),
(9780007203543, 'The Lord of the Rings: The Two Towers', '1st', '1954-11-11'),
(9780007123803, 'The Lord of the Rings: The Return of the King', '1st', '1955-10-20'),
(9780007447848, 'A Clash of Kings', '1st', '1998-11-16'),
(9780007447855, 'A Storm of Swords', '1st', '2000-08-08'),
(9780545010221, 'Harry Potter and the Goblet of Fire', '1st', '2000-07-08'),
(9780316015844, 'The Name of the Wind', '1st', '2007-03-27'),
(9780575081406, 'The Final Empire', '1st', '2006-07-17'),
(9780553801477, 'The Da Vinci Code', '1st', '2003-03-18');

INSERT INTO COPY (ID, ACQUIRED, RETIRED, ISBN) VALUES
(1, '2000-01-01', NULL, 9780606323451),
(2, '2005-05-15', NULL, 9780606323451),
(1, '1960-03-10', NULL, 9780007129713),
(2, '1970-07-20', '1990-01-01', 9780007129713),
(1, '1997-09-01', NULL, 9780007459483),
(3, '2010-06-15', NULL, 9780606323451),
(4, '2015-12-01', NULL, 9780606323451),
(1, '2000-07-15', NULL, 9780747538486),
(2, '2000-07-15', NULL, 9780747538486),
(1, '2000-08-01', NULL, 9780747542155),
(2, '2000-08-01', '2020-01-01', 9780747542155),
(3, '1970-07-20', NULL, 9780007129713),
(1, '1960-03-10', NULL, 9780007203543),
(2, '1960-03-10', NULL, 9780007203543),
(1, '1960-03-10', NULL, 9780007123803),
(2, '1998-12-01', NULL, 9780007447848),
(1, '2000-09-01', NULL, 9780007447855),
(1, '2007-04-01', NULL, 9780316015844),
(1, '2006-08-15', NULL, 9780575081406),
(1, '2003-04-01', NULL, 9780553801477);

INSERT INTO PERSON (NAME, ADDRESS, EMAIL, PHONE_NUMBER) VALUES
('J.K. Rowling', 'Edinburgh, Scotland', 'jkrowling@example.com', 44131234567),
('J.R.R. Tolkien', 'Oxford, England', 'tolkien@example.com', 441865765432),
('George R.R. Martin', 'Santa Fe, USA', 'grrm@example.com', 15055551234),
('Sarah Miller', '9 Staff Ave, Miami', 'sarah@example.com', 41794561234),
('Tom Smith', '12 Member St, New York', 'tom@example.com', 41795678901),
('Patrick Rothfuss', 'Wisconsin, USA', 'rothfuss@example.com', 14145551234),
('Brandon Sanderson', 'Utah, USA', 'brandon@example.com', 18015557890),
('Dan Brown', 'New Hampshire, USA', 'brown@example.com', 16035559876),
('John Davis', '45 Reader Lane, Boston', 'john@example.com', 41796789012),
('Emma Wilson', '78 Book Road, Chicago', 'emma@example.com', 41797890123),
('Michael Chang', '23 Library Ave, Seattle', 'michael@example.com', 41798901234),
('Lisa Johnson', '56 Novel Street, Portland', 'lisa@example.com', 41799012345),
('David Brown', '89 Story Road, Austin', 'david@example.com', 41790123456),
('Mary Williams', '34 Chapter Lane, Denver', 'mary@example.com', 41791234567),
('James Anderson', '67 Plot Avenue, Phoenix', 'james@example.com', 41792345678);

INSERT INTO AUTHOR (PERSON_ID) VALUES
(1),
(2),
(3),
(6),
(7),
(8);

INSERT INTO AUTHOR_BOOK (author, book) VALUES
(1, 1),
(2, 2),
(3, 3),
(1, 4),
(1, 5),
(1, 8),
(2, 6),
(2, 7),
(3, 9),
(3, 10),
(6, 11),
(7, 12),
(8, 13);

INSERT INTO MEMBER (PERSON_ID, JOINED, TERMINATED) VALUES
(5, '2022-05-15', NULL),
(9, '2022-06-01', NULL),
(10, '2022-07-15', NULL),
(11, '2022-08-30', NULL),
(12, '2022-09-20', NULL),
(13, '2023-01-10', '2023-12-01'),
(14, '2023-02-15', NULL);

INSERT INTO STAFF (PERSON_ID, JOINED, TERMINATED, ROLE) VALUES
(4, '2018-09-01', NULL, 'Librarian'),
(15, '2019-01-15', NULL, 'Assistant Librarian'),
(16, '2020-03-01', NULL, 'Library Technician');

INSERT INTO LOAN (BORROW_DATE, DUE_DATE, RETURN_DATE, COPY_ID_ID, COPY_ID_ISBN, ISSUER_ID, MEMBER_ID) VALUES
('2023-01-10 10:00:00', '2023-02-10 10:00:00', '2023-02-05 14:00:00', 1, 9780606323451, 4, 5),
('2023-03-01 09:30:00', '2023-03-31 09:30:00', NULL, 1, 9780007459483, 4, 5),
('2023-04-01 11:00:00', '2023-05-01 11:00:00', '2023-04-28 16:30:00', 1, 9780747538486, 4, 9),
('2023-04-15 14:30:00', '2023-05-15 14:30:00', '2023-05-10 10:15:00', 1, 9780747542155, 15, 10),
('2023-05-01 09:45:00', '2023-05-31 09:45:00', '2023-05-25 11:20:00', 2, 9780007203543, 4, 11),
('2023-05-15 13:15:00', '2023-06-15 13:15:00', '2023-06-10 14:45:00', 1, 9780316015844, 16, 12),
('2023-06-01 10:00:00', '2023-07-01 10:00:00', '2023-06-28 15:30:00', 1, 9780575081406, 15, 14),
('2023-06-15 15:45:00', '2023-07-15 15:45:00', NULL, 1, 9780553801477, 4, 9),
('2025-12-01 11:30:00', '2026-01-31 11:30:00', NULL, 2, 9780747538486, 16, 10),
('2025-12-01 14:00:00', '2026-01-31 14:00:00', NULL, 1, 9780007447848, 15, 11);