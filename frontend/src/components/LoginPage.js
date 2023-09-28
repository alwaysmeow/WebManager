import React from 'react';
import '../css/loginPage.css'
import LoginForm from './LoginForm';
import Header from './Header';

class LoginPage extends React.Component
{
    render()
    {
        return(
            <>
                <Header/>
                <main>
                    <LoginForm/>
                </main>
            </>
        )
    }
}

export default LoginPage