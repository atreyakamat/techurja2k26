const mysql = require('mysql2/promise');

async function run() {
    const connection = await mysql.createConnection({
        host: "119.18.54.49",
        user: "aitdgki7_techurja",
        password: process.env.DB_PASSWORD,
        database: "aitdgki7_techurja"
    });

    console.log("> Connected to MySQL database.");

    const testEntries = [
        {
            id: 9001,
            name: "Cyber_Unit_01",
            email: "cyber01@example.com",
            phone: "9999999901",
            teamName: "TEAM_DESTRUCTION",
            institution: "AITD Arena",
            eventSlug: "robowar-15kg",
            eventName: "ROBOWAR (15KG)",
            paymentScreenshot: "UPLOADED_TO_FTP: /registrations/9001/test_receipt_9001.jpg",
            status: "pending",
            needsAccommodation: 1
        },
        {
            id: 9002,
            name: "Lead_Developer_X",
            email: "devx@example.com",
            phone: "9999999902",
            teamName: "GRID_RUNNERS",
            institution: "Silicon Valley",
            eventSlug: "techyothon",
            eventName: "TECHYOTHON",
            paymentScreenshot: "UPLOADED_TO_FTP: /registrations/9002/test_receipt_9002.jpg",
            status: "pending",
            needsAccommodation: 0
        },
        {
            id: 9003,
            name: "Arya_B",
            email: "aryab@example.com",
            phone: "9999999903",
            teamName: "SOLO_STRIKER",
            institution: "AITD Goa",
            eventSlug: "pixel-play",
            eventName: "PIXEL PLAY",
            paymentScreenshot: "UPLOADED_TO_FTP: /registrations/9003/test_receipt_9003.jpg",
            status: "pending",
            needsAccommodation: 0
        }
    ];

    try {
        for (const entry of testEntries) {
            console.log(`> Inserting Entry ${entry.id}...`);
            await connection.execute(
                `INSERT INTO Registration (id, name, email, phone, teamName, institution, eventSlug, eventName, paymentScreenshot, status, needsAccommodation, createdAt) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
                [entry.id, entry.name, entry.email, entry.phone, entry.teamName, entry.institution, entry.eventSlug, entry.eventName, entry.paymentScreenshot, entry.status, entry.needsAccommodation]
            );
        }
        console.log("--- DATABASE POPULATION COMPLETE ---");
    } catch (err) {
        console.error("Error inserting data:", err.message);
    } finally {
        await connection.end();
    }
}

run();