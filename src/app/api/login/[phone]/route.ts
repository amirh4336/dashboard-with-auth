import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { phone: string } }
) {
  try {
    const { phone } = await params;
    console.log({phone});
    return NextResponse.json({
      phone,
      name: "Amirhossien Heydarpour",
      email: "john.doe@example.com",
      picture:
        "https://static.digiato.com/digiato/2025/08/a-blood-moon-is-coming-1-910x600.jpg.webp",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
