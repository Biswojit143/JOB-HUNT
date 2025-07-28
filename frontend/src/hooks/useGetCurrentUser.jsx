import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, setIsLoading } from '../app/slices/authSlice'

const useGetCurrentUser = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      dispatch(setIsLoading(true))
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/auth`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        let data = {}
        try {
          data = await res.json()
        } catch (e) {
          console.error('Invalid JSON in auth response')
        }

        if (data.success) {
          dispatch(setUser(data.user))
        } else {
          dispatch(setUser(null))
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        dispatch(setUser(null))
      } finally {
        dispatch(setIsLoading(false))
      }
    }

    getUser()
  }, [dispatch])
}

export default useGetCurrentUser
