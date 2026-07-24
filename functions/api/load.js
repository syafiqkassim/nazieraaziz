export async function onRequestGet(context) {
  const { DB } = context.env;

  const row = await DB.prepare(
    "SELECT content FROM site_content WHERE section = ?"
  )
    .bind("hero")
    .first();

  if (!row) {
    return Response.json({
      error: "No data found"
    }, { status: 404 });
  }

  return Response.json({
    hero: JSON.parse(row.content)
  });
}