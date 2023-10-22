from pymongo.mongo_client import MongoClient

uri = "mongodb://localhost:27017"

client = MongoClient('localhost', 27017)

db = client['WebManagerDB']
collection = db['UserData']

# Account Interface

def getUserData(username):
    return collection.find_one({"username" : username}, {"_id": False, "passwordHash": False})

def authentication(username, passwordHash):
    return not collection.find_one({"username": username, "passwordHash": passwordHash}) is None

def isNameFree(username):
    return collection.find_one({"username": username}) is None

def createAccount(username, passwordHash):
    userData = {
        "username": username,
        "passwordHash": passwordHash,
        "categories": []
    }
    collection.insert_one(userData)

def deleteAccount(username):
    collection.delete_one({"username": username})

# Category Interface

def deleteCategory(username, categoryIndex):
    collection.update_one(
        {"username": username}, 
        {"$unset": {f"categories.{categoryIndex}": 1}}
    )
    collection.update_one(
        {"username": username}, 
        {"$pull": {"categories": None}}
    )

def renameCategory(username, categoryIndex, newName):
    collection.update_one(
        {"username": username},
        {"$set": {f"categories.{categoryIndex}.name": newName}}
    )

def newCategory(username, categoryName):
    collection.update_one(
        {"username": username},
        {
            "$push": 
            {
                "categories": 
                {
                    "name": categoryName, 
                    "content": []
                }
            }
        }
    )

# Link Interface

def deleteLink(username, categoryIndex, linkIndex):
    collection.update_one(
        {"username": username}, 
        {"$unset": {f"categories.{categoryIndex}.content.{linkIndex}": 1}}
    )
    collection.update_one(
        {"username": username}, 
        {"$pull": {f"categories.{categoryIndex}.content": None}}
    )

def renameLink(username, categoryIndex, linkIndex, newName):
    collection.update_one(
        {"username": username},
        {"$set": {f"categories.{categoryIndex}.content.{linkIndex}.name": newName}}
    )

def changeUrl(username, categoryIndex, linkIndex, newUrl):
    collection.update_one(
        {"username": username},
        {"$set": {f"categories.{categoryIndex}.content.{linkIndex}.url": newUrl}}
    )

def newLink(username, categoryIndex, linkName, url):    
    collection.update_one(
        {"username": username},
        {
            "$push": 
            {
                f"categories.{categoryIndex}.content": 
                {
                    "name": linkName, 
                    "url": url
                }
            }
        }
    )