// Contact form delivery via Web3Forms (https://web3forms.com).
//
// Setup: create a free access key at https://web3forms.com (just enter the
// email you want messages delivered to — no dashboard/signup), then add it to
// a `.env` file at the project root:
//
//   VITE_WEB3FORMS_KEY=your-access-key-here
//
// Until a key is configured, the form falls back to a simulated send so the UI
// still works in development.

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const ENDPOINT = 'https://api.web3forms.com/submit'

/**
 * Send a contact message.
 * @param {{ name: string, email: string, message: string, subject?: string, botcheck?: string }} fields
 * @throws {Error} when the delivery fails (caller should show the message)
 */
export async function sendContactMessage(fields) {
  if (!ACCESS_KEY) {
    // No key yet — pretend to send so the success UI still demonstrates.
    await new Promise((resolve) => setTimeout(resolve, 1200))
    return
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      from_name: 'Abbdullah Portfolio',
      subject: fields.subject || `New message from ${fields.name}`,
      ...fields,
    }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Message failed to send. Please try again.')
  }
}
