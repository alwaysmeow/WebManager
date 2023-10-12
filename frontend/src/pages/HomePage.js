import React from 'react';
import Header from '../components/Header';
import Category from "../components/Category"
import "../css/homePage.css"

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loaded: false
        }
        this.username = ""
        this.categories = []
        this.getData()
    }

    render()
    {
        if (this.state.loaded)
        {
            return(
                <>
                    <Header username={this.username}/>
                    <main className='home'>
                        <ol className="category-list">
                            {this.categories.map((item, i) => <Category data = {item} key={i}/>)}
                        </ol>
                    </main>
                </>
            )
        }
        else
        {
            return <div>loading</div>
        }
    }

    getData()
    {
        const request = {
            method: "GET",
            credentials: 'include'
        }
        
        fetch("api/data", request)
        .then(response => response.json())
        .then(data =>
        {
            this.setState({
                loaded: true
            })
            this.username = data.username
            this.categories = data.categories
            console.log(data);
        })
        .catch(() => {window.location.href = '/login'})
    }
}

export default HomePage