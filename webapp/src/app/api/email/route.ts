import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json(); // Parse the JSON body

        console.log("POST request received");
        console.log(data);
        
        const { name, email, subject, message } = data;

        // Configure the email transport
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: process.env.NODE_ENV !== 'production',
            requireTLS: true, 
            auth: {
                user: "testemailnotificationbot@gmail.com",
                pass: "yroujkoaweqmbdbk",
            },
        });

        await transporter.sendMail({
            from: "Your Name <Mailer>",
            to: "testemailnotificationbot@gmail.com",
            subject: subject,
            text: message,
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Contact Us Message</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            background-color: #f9f9f9;
                            margin: 0;
                            padding: 0;
                            color: #333;
                        }
                        .container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #4CAF50;
                            color: white;
                            padding: 10px 0;
                            text-align: center;
                            border-radius: 8px 8px 0 0;
                        }
                        .header h1 {
                            margin: 0;
                        }
                        .content {
                            padding: 20px;
                        }
                        .content p {
                            font-size: 16px;
                            line-height: 1.6;
                            margin-bottom: 10px;
                        }
                        .footer {
                            background-color: #f1f1f1;
                            text-align: center;
                            padding: 10px;
                            margin-top: 20px;
                            font-size: 14px;
                            color: #777;
                            border-radius: 0 0 8px 8px;
                        }
                        .button {
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #4CAF50;
                            color: white;
                            text-decoration: none;
                            font-weight: bold;
                            border-radius: 4px;
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>New Contact Us Message</h1>
                        </div>
                        <div class="content">
                            <p><strong>We received a new message from the Contact Us form:</strong></p>
                            
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Subject:</strong> ${subject}</p>
                            <p><strong>Message:</strong></p>
                            <p>${message}</p>

                            <p>If you would like to reply to this message, click the link below:</p>
                            <a href="mailto:${email}" class="button">Reply to this message</a>
                        </div>
                        <div class="footer">
                            <p>&copy; 2025 Alfina. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } catch (error: any) {
        console.error("Email sending failed:", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
