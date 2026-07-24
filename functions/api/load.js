export async function onRequestGet() {
  return new Response(
    JSON.stringify({
      hero: {
        name: "Dr. Naziera Aziz",
        title: "Autism Researcher",
        description: "Welcome to my website."
      }
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}