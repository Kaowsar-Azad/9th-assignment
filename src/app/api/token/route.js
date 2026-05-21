import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const { token } = await req.json();
    const cookieStore = await cookies();
    if (token) {
      cookieStore.set('jwt_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 20 * 24 * 60 * 60,
      });
    } else {
      cookieStore.set('jwt_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
      });
    }
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
