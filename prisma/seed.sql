-- Seed data for Event table
INSERT INTO `Event` (`slug`, `name`, `description`, `category`, `level`, `date`, `venue`, `updatedAt`) VALUES
('robo-wars-arena', 'Robo Wars Arena', 'Teams engineer autonomous or manually controlled robots and compete in a high-impact elimination bracket.', 'Robotics', 'college', '2026-02-06 05:30:00.000', 'Main Combat Cage', NOW()),
('line-tracer-x', 'Line Tracer X', 'Build a line-following robot optimized for speed, control, and stability across dynamic turns and disruptions.', 'Robotics', 'college', '2026-02-05 04:30:00.000', 'Automation Lab', NOW()),
('code-siege-24', 'Code Siege 24', 'A full-stack buildathon where teams solve real-world challenge statements and ship working prototypes.', 'Computer Science', 'college', '2026-02-07 03:30:00.000', 'Dev Grid Hall', NOW()),
('capture-the-stack', 'Capture The Stack', 'Participants attack and defend systems in a controlled CTF environment with progressive difficulty flags.', 'Computer Science', 'college', '2026-02-06 08:30:00.000', 'Security Bay', NOW()),
('neuro-puzzle-rift', 'Neuro Puzzle Rift', 'A rapid sequence of brain-game stages focused on pattern recognition, deduction, and computational thinking.', 'Puzzle / Logic', 'college', '2026-02-05 07:30:00.000', 'Mind Arena', NOW()),
('data-detective-jr', 'Data Detective Jr.', 'A beginner-friendly analytics challenge that teaches chart reading, reasoning, and quick decision-making.', 'School-Level', 'school', '2026-02-06 04:00:00.000', 'Junior Innovation Room', NOW()),
('school-robot-sprint', 'School Robot Sprint', 'Students receive standard kits and complete speed and accuracy challenges under mentor supervision.', 'School-Level', 'school', '2026-02-07 04:30:00.000', 'Junior Robotics Lane', NOW()),
('cipher-chase', 'Cipher Chase', 'A team-based puzzle gauntlet featuring substitution ciphers, steganography, and lateral logic constraints.', 'Puzzle / Logic', 'college', '2026-02-07 09:30:00.000', 'Cryptic Zone', NOW());
