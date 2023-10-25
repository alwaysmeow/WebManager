import React from "react"
import "../css/linkBlock.css"
import UserDataContext from "./UserDataContext";
import { changeUrlRequest, renameLinkRequest } from "../tools/requests";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { X } from 'react-feather'

class LinkBlock extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            name: "",
            url: null,
            mouseover: false,
            focused: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        this.deleteLink = this.deleteLink.bind(this)
    }

    componentDidMount()
    {
        const item = this.context.userdata[this.props.categoryIndex].content[this.props.linkIndex]
        this.setState({
            name: item.name,
            url: item.url
        })
    }

    handleFocus(event)
    {
        this.setState({focused: true})
        if (event.target.name === "url")
        {
            // this timeout fixes autoselect
            setTimeout(() => {
                event.target.select()
            }, 10)
        }
    }

    handleChange(event)
    {
        this.setState({[event.target.name]: event.target.value})
    }

    handleBlur(event)
    {
        const trueValue = this.context.userdata[this.props.categoryIndex].content[this.props.linkIndex][event.target.name]
        if (this.state[event.target.name] !== trueValue)
        {
            // Change context
            this.context.changeLinkParameter(
                this.props.categoryIndex, 
                this.props.linkIndex, 
                event.target.name, 
                this.state[event.target.name]
            )
            
            // Request
            if (event.target.name === "url")
            {
                changeUrlRequest(
                    this.props.categoryIndex, 
                    this.props.linkIndex, 
                    this.state[event.target.name]
                )
            }
            else
            {
                renameLinkRequest(
                    this.props.categoryIndex, 
                    this.props.linkIndex, 
                    this.state[event.target.name]
                )
            }
        }
        this.setState({focused: false})
    }

    deleteLink()
    {
        this.context.deleteLink(this.props.categoryIndex, this.props.linkIndex)
    }

    getIcon()
    {
        try
        {
            return new URL(this.state.url).origin + '/favicon.ico'
        }
        catch
        {
            return null
        }
    }

    render()
    {
        if (this.state.url !== null)
        {
            if (this.props.editing)
            {
                return(
                    <div className="link-block"
                        onMouseOver={() => {this.setState({mouseover: true})}} 
                        onMouseLeave={() => {this.setState({mouseover: false})}}
                    >
                        <div className={"delete-link-button" + ((!this.props.minimized & this.state.mouseover) ? "" : " hidden")}
                            onClick={this.deleteLink}
                        >
                            <X/>
                        </div>
                        <TransitionGroup component="div" className="top-element-container">
                            {
                                this.state.mouseover || this.state.focused ?
                                    <CSSTransition key="url-input" timeout={{ enter: 250, exit: 250 }} classNames="url-input">
                                        <input value={this.state.url}
                                            className="url-input"
                                            name="url"
                                            onChange={this.handleChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            autoComplete="off"
                                        />
                                    </CSSTransition>
                                :
                                    <CSSTransition key="url-img" timeout={{ enter: 250, exit: 250 }} classNames="url-img">
                                        <img className="url-img" src={this.getIcon()}/>   
                                    </CSSTransition>
                            }
                        </TransitionGroup>
                        <input value={this.state.name}
                            className="link-name"
                            name="name"
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            autoComplete="off"
                        />
                    </div>
                )
            }
            else
            {
                return(
                    <a className="link-block" href={this.state.url} onClick={(event) => {if (this.props.minimized) {event.preventDefault()}}}>
                        <img className="url-img" src={this.getIcon()}/>
                        <div className="link-name">{this.state.name}</div>
                    </a>
                )
            }
        }
        else
            return <></>
    }
}

LinkBlock.contextType = UserDataContext

export default LinkBlock