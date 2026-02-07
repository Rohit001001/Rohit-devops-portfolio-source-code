/**
 * POST /api/contact
 * 
 * Accepts contact form submissions with name, email, and message.
 * Currently logs the message to the server console.
 * 
 * To modify: Replace console.log with your preferred storage method:
 * - Write to a file (fs.appendFile)
 * - Send to a database
 * - Forward via email service (SendGrid, Resend, etc.)
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    // Log the contact message to server console
    // In production, replace this with database storage or email forwarding
    console.log("=== New Contact Message ===");
    console.log(`Name:    ${name}`);
    console.log(`Email:   ${email}`);
    console.log(`Message: ${message}`);
    console.log(`Time:    ${new Date().toISOString()}`);
    console.log("===========================");

    return NextResponse.json({
      success: true,
      message: "Contact message received successfully",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
