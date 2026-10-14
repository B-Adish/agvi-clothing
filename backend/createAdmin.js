
require("dotenv").config();

const bcrypt = require("bcryptjs");
const pool = require("./config/db");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (question) =>
    new Promise((resolve) => rl.question(question, resolve));

async function createAdmin() {
    try {
        const username = (await ask("Admin username: ")).trim();
        const email = (await ask("Admin email: ")).trim();
        const password = await ask("Admin password (input will be visible): ");

        if (!username || !email || !password) {
            throw new Error("All fields are required.");
        }

        if (password.length < 12) {
            throw new Error("Use a password with at least 12 characters.");
        }

        const passwordHash = await bcrypt.hash(password, 12);

        await pool.execute(
            `INSERT INTO admins (username, email, password_hash)
             VALUES (?, ?, ?)`,
            [username, email, passwordHash]
        );

        console.log("Admin account created successfully.");
    } catch (error) {
        console.error("Could not create admin:", error.message);
        process.exitCode = 1;
    } finally {
        rl.close();
        await pool.end();
    }
}

createAdmin();
