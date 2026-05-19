// @ts-nocheck
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: "Echo Lantern Orchestrator",
    status: "active",
    wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
    platform: "Echo Lantern",
    version: "1.0.0"
  }, {
    headers: getCorsHeaders()
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: "success",
      message: "Agent interacted successfully",
      receivedAt: new Date().toISOString(),
      payload: body
    }, {
      headers: getCorsHeaders()
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid Agent request" }, 
      { status: 400, headers: getCorsHeaders() }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders()
  });
}

function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}
