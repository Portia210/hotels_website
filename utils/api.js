import { NextResponse } from "next/server";

const nextReturn = (payload, status = 200, statusText, headers) => {
  if (status > 300 || status < 200) {
    console.error("nextReturn error", JSON.stringify(payload));
  }
  return NextResponse.json(payload, {
    status,
    statusText,
  });
};

export { nextReturn };
