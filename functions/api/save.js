export async function onRequestPost(context) {
  const { DB } = context.env;

  try {
    const body = await context.request.json();

    await DB.prepare(`
      UPDATE site_content
      SET content = ?, updated_at = CURRENT_TIMESTAMP
      WHERE section = ?
    `)
      .bind(JSON.stringify(body.hero), "hero")
      .run();

    return Response.json({
      success: true,
      message: "Content saved successfully"
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: err.message
      },
      { status: 500 }
    );
  }
}