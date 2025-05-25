import {Routes,Route} from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import Home from './pages/Home'
import SignUpForm from './pages/SignUpForm'
import SignInForm from './pages/SignInForm'
import TermsPage from './pages/TermPage'
import { AuthProvider } from './lib/AuthContext'
import DisclaimerPage from './pages/Disclaimer'
import PrivacyPolicy from './pages/PrivacyPolicy'
// import RegisterForm from './pages/RegisterForm'
// import MultiStepForm from './pages/MultiStepForm'
// import AntDForm from './pages/AntDForm'

const App = () => {
  return (
    <AuthProvider>
    <Routes>
    <Route element={<AuthLayout/>}>
    <Route path='/sign-up' element={<SignUpForm/>}/>
    {/* <Route path='/sign-up' element={<RegisterForm/>}/> */}
    <Route path='/sign-in' element={<SignInForm/>}/>
    {/* <Route path='/multi' element={<AntDForm/>}/> */}
    {/* <Route path='/multi' element={<MultiStepForm/>}/> */}
    </Route>
    <Route element={<RootLayout/>}>
    <Route path='/' element={<Home/>}/>
    </Route>
    <Route path='/terms' element={<TermsPage/>}/>
    <Route path='/disclaimer' element={<DisclaimerPage/>}/>
    <Route path='/privacy' element={<PrivacyPolicy/>}/>
    </Routes>
    </AuthProvider>
  )
}

export default App