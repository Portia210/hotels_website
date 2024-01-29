import { nextReturn } from "@/utils/api";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    
    return NextResponse.redirect(response);
  } catch (error) {
    return nextReturn(error, 500, "INTERNAL_SERVER_ERROR");
  }
}
