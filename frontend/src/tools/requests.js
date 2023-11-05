// User Requests

export async function loginRequest(login, passwordHash)
{
    const postdata = {
        login: login,
        passwordHash: passwordHash
    }

    const request = {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
    }
    
    return await fetch('/api/login', request)
    .then(response => response.json())
}

export async function logoutRequest()
{
    const request = {
        method: "GET",
        credentials: 'include'
    }
        
    return await fetch('/api/logout', request)
    .then(response => response.json())
}

export async function getUserDataRequest()
{
    const request = {
        method: "GET",
        credentials: 'include'
    }
    
    return await fetch("api/userdata", request)
    .then(response => response.json())
    .catch(() => null)
}

// Category Requests

export function renameCategoryRequest(categoryIndex, newName)
{
    const postdata = {
        categoryIndex: categoryIndex,
        newName: newName
    }

    const request = {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
    }

    fetch("api/rename_category", request)
}

export function deleteCategoryRequest(categoryIndex)
{
    const postdata = {
        categoryIndex: categoryIndex
    }

    const request = {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
    }

    fetch("api/delete_category", request)
}

export function newCategoryRequest()
{
    const request = {
        method: "POST",
        credentials: 'include'
    }

    fetch("api/new_category", request)
}

// Link Requests

export function renameLinkRequest(categoryIndex, linkIndex, newName)
{
    const postdata = {
        categoryIndex: categoryIndex,
        linkIndex: linkIndex,
        newName: newName
    }

    const request = {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
    }

    fetch("api/rename_link", request)
}

export function changeUrlRequest(categoryIndex, linkIndex, newUrl)
{
    const postdata = {
        categoryIndex: categoryIndex,
        linkIndex: linkIndex,
        newUrl: newUrl
    }

    const request = {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
    }

    fetch("api/change_url", request)
}

export function deleteLinkRequest(categoryIndex, linkIndex)
{
    const postdata = {
        categoryIndex: categoryIndex,
        linkIndex: linkIndex
    }

    const request = {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
    }

    fetch("api/delete_link", request)
}

export function newLinkRequest(categoryIndex)
{
    const postdata = {
        categoryIndex: categoryIndex
    }

    const request = {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
    }

    fetch("api/new_link", request)
}

// Key Requests

export function sendKeyRequest(email)
{
    const postdata = {
        email: email
    }

    const request = {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
    }

    fetch("api/send_key", request)
}

export async function createAccountRequest(key, username, passwordHash)
{
    const postdata = {
        key: key,
        username: username,
        passwordHash: passwordHash
    }

    const request = {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postdata)
    }

    return await fetch("api/create_account", request)
    .then(response => response.json())
}