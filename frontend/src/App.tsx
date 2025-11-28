
// import { Button } from "@/components/ui/button"
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AuthCallbackPage from './pages/AuthCallbackPage.jsx'
import { axiosInstance } from './lib/axios.js'


const App = () => {

  return (
    <>
      {/* <header>
        <SignedOut>
          <SignInButton >
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header> */}

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth-callback' element={<AuthCallbackPage />} />
      </Routes>
    </>
  )
}

export default App