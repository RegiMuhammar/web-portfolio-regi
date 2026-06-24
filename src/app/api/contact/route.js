// API Route: /api/contact
// Handles contact form submissions.
// Currently logs to console — wire to email service (Resend, Nodemailer, Formspree) as needed.

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // TODO: Replace with email service integration
        // Example: await resend.emails.send({ from: '...', to: 'regimuhammar@gmail.com', ... })
        console.log('📬 New contact form submission:', { name, email, subject, message });

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Contact API error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}
