import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../../providers/UserContext"

interface IRoute {
  ProtectedRoutes: ()  => JSX.Element
}


export const ProtectedRoutes = ()  =>{

  const { users } = useContext(UserContext)
  console.log(users)

  return users? <Outlet/> : <Navigate to='/'/>
} 