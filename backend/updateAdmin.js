
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

async function updateAdmin() {
    try {
        const currentUsername = await ask("Current admin username: ");
        const newUsername = (await ask("Client's admin username: ")).trim();
        const newEmail = (await ask("Client's admin email: ")).trim();
        const newPassword = await ask("Client's new admin password: ");

        if (!currentUsername.trim() || !newUsername || !newEmail || !newPassword) {
            throw new Error("All fields are required.");
        }

        if (newPassword.length < 12) {
            throw new Error("Use a password with at least 12 characters.");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
            throw new Error("Enter a valid email address.");
        }

        const passwordHash = await bcrypt.hash(newPassword, 12);

        const [result] = await pool.execute(
            `UPDATE admins
             SET username = ?, email = ?, password_hash = ?
             WHERE username = ? AND is_active = TRUE`,
            [newUsername, newEmail, passwordHash, currentUsername.trim()]
        );

        if (result.affectedRows === 0) {
            throw new Error(
                "No account was updated. Check the current username and account status."
            );
        }

        console.log("Admin username, email and password updated successfully.");
    } catch (error) {
        console.error("Admin update failed:", error.message);
        process.exitCode = 1;
    } finally {
        rl.close();
        await pool.end();
    }
}

updateAdmin();
