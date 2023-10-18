import React from 'react';
import Header from '../components/Header';
import Category from "../components/Category"
import AddCategoryButton from "../components/AddCategoryButton"
import EditContext from '../components/EditContext';
import "../css/homePage.css"
import { getUserDataRequest } from '../tools/requests';

class HomePage extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loaded: false,
            editing: {
                editState: false,
                toggleEditState: () => {
                    this.setState({
                        editing: {...this.state.editing, editState: !this.state.editing.editState}
                    })
                }
            },
        }
        this.categories = []
        this.getData()
    }

    render()
    {
        if (this.state.loaded)
        {
            return(
                <>
                    <EditContext.Provider value={this.state.editing}>
                        <Header showPanel={true}/>
                        <main className='home'>
                            <ol className="category-list">
                                {this.categories.map((item, i) => <Category data={item} key={i}/>)}
                                {this.state.editing.editState ? <AddCategoryButton/> : <></>}
                            </ol>
                        </main>
                    </EditContext.Provider>
                </>
            )
        }
        else
        {
            return <div>loading</div>
        }
    }

    async getData()
    {
        const response = await getUserDataRequest()
        console.log(response)
        if (response === null)
            window.location.href = '/login'
        else
        {
            this.categories = response.categories
            this.setState({
                loaded: true
            })
        }
    }
}

export default HomePage