import { Resend } from 'resend';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Email validation regex (RFC 5322 standard basic check)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return Response.json({ error: 'Invalid email address format' }, { status: 400 });
        }

        if (!process.env.RESEND_API_KEY) {
            console.error('Missing RESEND_API_KEY environment variable');
            return Response.json({ error: 'Mail service misconfigured' }, { status: 500 });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'regimuhammar@gmail.com',
            subject: subject || `New contact from ${name}`,
            replyTo: email,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
                    <h2 style="color: #e85002; margin-top: 0;">New Portfolio Message</h2>
                    <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject || '(No Subject)'}</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="margin: 10px 0; font-weight: bold;">Message:</p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; white-space: pre-wrap; color: #444;">${message}</div>
                </div>
            `,
        });

        if (error) {
            console.error('Resend API error:', error);
            return Response.json({ error: error.message }, { status: 400 });
        }

        return Response.json({ success: true, id: data.id }, { status: 200 });
    } catch (error) {
        console.error('Contact API error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}
