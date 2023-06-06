import './App.css'
import Feed from './Pages/Feed/Feed'
import Login from './Pages/Login/Login'
import RecoveryRequest from './Pages/PwRecovery/RecoveryRequest'
import ResetPw from './Pages/PwRecovery/ResetPw'
import Register from './Pages/Register/Register'
import UserProfile from './Pages/UserProfile/UserProfile'
import EditUserProfile from './Pages/EditUserProfile/EditUserProfile'
import Router from './router/index'
import AnonymousProtectedRoute from './routing/AnonymousProtectedRoute'
import AuthenticationProtectedRoute from './routing/AuthenticationProtectedRoute'
import CompleteProfile from './components/CompleteProfile'
import Contact from './Pages/Contact/Contact';
import UploadAudioFile from './Pages/UploadAudio/UploadAudioFile'
import MusicCard from './components/MusicCard/MusicCard'
import './App.css'


const routes = [
    { 
        path: '/', 
        component: <Feed />,
    },
    { 
        path: '/login', 
        component: <Login />,
        protection: <AnonymousProtectedRoute></AnonymousProtectedRoute>
     },
    { 
        path: '/logout', 
        component: <Feed />,
        protection: (
            <AuthenticationProtectedRoute></AuthenticationProtectedRoute>
        ),
        onEnter: () => {localStorage.removeItem('token')}
    },
    { 
        path: '/register', 
        component: <Register />,
        protection: <AnonymousProtectedRoute></AnonymousProtectedRoute>
    },
    { 
        path: '/password-recovery', 
        component: <RecoveryRequest />,
        protection: <AnonymousProtectedRoute></AnonymousProtectedRoute>
    },
    { 
        path: '/reset-password/:token',
        component: <ResetPw />,
        protection: <AnonymousProtectedRoute></AnonymousProtectedRoute>
    },
    {
        path: '/user/:username',
        component: <UserProfile />,
    },
    {
        path: '/edit-profile',
        component: <EditUserProfile />,
        protection:  (
            <AuthenticationProtectedRoute></AuthenticationProtectedRoute>
        ),
    },
    {
        path: '/complete-profile',
        component: <CompleteProfile />,
        protection:  (
            <AuthenticationProtectedRoute></AuthenticationProtectedRoute>
        ),
    },

    {
        path: '/contact-Form',
        component: <Contact/>
    },
    {
        path: '/MusicCard',
        component: <MusicCard/> 
    },
    {
        path: '/upload',
        component: <UploadAudioFile/>, 
        protection:  (
            <AuthenticationProtectedRoute></AuthenticationProtectedRoute>
        ),
    }
   /*  {
        path: '/track/:id',
        component: <CommentSection/>,
        protection:  (
            <AuthenticationProtectedRoute></AuthenticationProtectedRoute>
        ),
    } */
]

function App() {
    return (
        <Router routes={routes} />  
    );
}

export default App;
