import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return NextResponse.json(
      { error: "Cloudinary environment variables are not configured" },
      { status: 501 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  try {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", uploadPreset);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: uploadData,
    });

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: payload?.error?.message || "Upload failed" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      url: payload.secure_url,
      publicId: payload.public_id,
      bytes: payload.bytes,
      format: payload.format,
      originalFilename: payload.original_filename,
    });
  } catch (error) {
    console.error("POST /api/uploads", error);
    return NextResponse.json({ error: "Unable to upload file" }, { status: 500 });
  }
}
