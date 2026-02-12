import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, companyName, date } = body;

        const scriptUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL;

        if (!scriptUrl) {
            return NextResponse.json(
                { message: 'Google Sheets URL not configured' },
                { status: 500 }
            );
        }

        // Send data to Google Apps Script
        // GAS often redirects, so valid response might be a redirect.
        // We send standard JSON with the Japanese keys matched to the GAS script expectation.
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                "会社名": companyName, // Match the GAS script expectation
                "日付": date
            }),
        });

        // GAS Web App often returns a redirect to a status page.
        // If fetch follows it successfully, it's fine.

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error submitting to Google Sheets:', error);
        return NextResponse.json(
            { message: 'Failed to submit', error: error.message },
            { status: 500 }
        );
    }
}
