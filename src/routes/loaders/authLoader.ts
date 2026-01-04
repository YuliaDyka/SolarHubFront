import { AuthAPI } from '@/features/auth/api'
import { redirect, type LoaderFunctionArgs } from 'react-router'

export const authRequireLoader = async ({ request }: LoaderFunctionArgs) => {
  try {
    await AuthAPI.refresh()

    const user = await AuthAPI.me()
    console.log(user)
    return { user }
  } catch {
    const url = new URL(request.url);
    return redirect(`/auth/login?redirect=${url.pathname}`)
  }
}

export const getUserLoader = async () => {
    try {
        await AuthAPI.refresh()

        const user = await AuthAPI.me();

        return { user };
    } catch {
        return { user: undefined };
    }
}

export const redirectIfAuth = async () => {
  try {
    await AuthAPI.refresh()
    await AuthAPI.me()

    return redirect('/')
  } catch {
    return null
  }
}

export const AdminRequireLoader = async () => {
  try {
    await AuthAPI.refresh()

    const user = await AuthAPI.me()

    if (user?.role !== "Admin") return redirect('/')

    return { user }
  } catch {
    return redirect('/403')
  }
}