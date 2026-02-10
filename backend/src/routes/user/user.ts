import { Router, Request, Response } from "express";
import pool from "../../server/pgserver.ts";

const router = Router();

router.post("/waitlist", async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // 1️⃣ Validate input
        if (!email || typeof email !== "string") {
            return res.status(400).json({
                error: "Email is required",
            });
        }

        // 2️⃣ Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: "Invalid email format",
            });
        }

        // 3️⃣ Insert into DB
        const result = await pool.query(
            `
            INSERT INTO waiting_list (email, created_at, updated_at)
            VALUES ($1, NOW(), NOW())
            RETURNING id, email, created_at
            `,
            [email.toLowerCase()]
        );

        return res.status(201).json({
            message: "Successfully added to waiting list",
            data: result.rows[0],
        });

    } catch (err: any) {
        // 4️⃣ Handle duplicate email
        if (err.code === "23505") {
            return res.status(409).json({
                error: "Email already exists in waiting list",
            });
        }

        console.error("Waiting list error:", err);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
});

export default router;
