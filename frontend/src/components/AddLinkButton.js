import React from "react"
import "../css/addLinkButton.css"

class AddLinkButton extends React.Component
{
    render()
    {
        return(
            <div className={"add-link-button" + (this.props.minimized ? " minimized" : "")}><div>+</div></div>
        )
    }
}

export default AddLinkButton