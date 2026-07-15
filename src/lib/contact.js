// Contact form delivery via Supabase REST API
//
// Setup: add your Supabase URL and anon key to `.env.local`:
//   VITE_SUPABASE_URL=https://...
//   VITE_SUPABASE_PUBLISHABLE_KEY=ey...

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

/**
 * Send a contact message.
 * @param {{ name: string, email: string, message: string, subject?: string, botcheck?: string }} fields
 * @throws {Error} when the delivery fails (caller should show the message)
 */
export async function sendContactMessage(fields) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    // No keys yet — pretend to send so the success UI still demonstrates in dev.
    await new Promise((resolve) => setTimeout(resolve, 1200))
    return
  }

  // Uses the Supabase REST API to insert into the 'messages' table
  const res = await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=minimal' // Don't return the inserted row to save bandwidth
    },
    body: JSON.stringify({
      name: fields.name,
      email: fields.email,
      message: fields.message
    }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || 'Message failed to send. Please try again.')
  }
}
