import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = { 
        command: body.command || "Fix server" 
    };

    // 👇 THIS IS THE CRITICAL LINE. IT MUST MATCH YOUR YAML.
    // Format: .../webhook/<NAMESPACE>/<FLOW_ID>/<SECRET_KEY>
    const kestraUrl = 'http://localhost:8080/api/v1/executions/webhook/lighthouseops.app/lighthouse-ops-agent/hackathon-secret-123';
    
    console.log(`📡 PINGING: ${kestraUrl}`);

    const response = await fetch(kestraUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ KESTRA ERROR: ${response.status} - ${errorText}`);
        return NextResponse.json({ error: `Kestra Refused: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    console.log("✅ SUCCESS: Execution Started", data.id);
    return NextResponse.json(data);

  } catch (error) {
    console.error("❌ NETWORK ERROR:", error);
    return NextResponse.json({ error: "Connection Failed" }, { status: 500 });
  }
}