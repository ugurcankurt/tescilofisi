import { supabase } from './supabase'

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('Sign in error:', error)
    }
    
    return { data, error }
  } catch (err) {
    console.error('Unexpected sign in error:', err)
    return { data: null, error: { message: 'Unexpected error occurred' } }
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export async function isAuthenticated() {
  const { user } = await getCurrentUser()
  return !!user
}

// Simple admin check - in production, you might want to use Supabase roles
export async function isAdmin() {
  const { user } = await getCurrentUser()
  return user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL || user?.email === 'admin@tescilofisi.com'
}