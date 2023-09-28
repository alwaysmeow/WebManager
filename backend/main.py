from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_cors import CORS

from dotenv import load_dotenv
from os import getenv
import json

from user import User

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = getenv("KEY")
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def loadUser(user_id):
    return User(user_id)

@app.route('/')
def welcome():
    if current_user.is_authenticated:
        url = url_for('loadManager')
    else:
        url = url_for('loadLoginPage')
    return redirect(url, 301)

@app.route('/login')
def loadLoginPage():
    return render_template("login.html", title = "Log In")

@app.route('/home')
@login_required
def loadManager():
    print(current_user.id)
    return render_template("home.html", title = "WebManager", login = current_user.id)

@app.route('/api/submit', methods=["POST"])
def authorization():
    data = request.get_json()
    if data['login'] == "meowmeow":
        response = {"success": True, "redirect_url": "/home"}
        login_user(User("meowmeow"))
        return jsonify(response), 200
    elif data['login'] == "barkbark":
        response = {"success": True, "redirect_url": "/home"}
        login_user(User("barkbark"))
        return jsonify(response), 200
    else:
        response = {"success": False}
        return jsonify(response), 200

@app.route('/api/logout', methods=["GET"])
@login_required
def logoutCurrentUser():
    logout_user()
    response = {"success": True, "redirect_url": "/login"}
    return jsonify(response)

@app.route('/api/data', methods=["GET"])
@login_required
def throwData():
    file = open(f"testjson/{current_user.id}.json")
    return file, 200

@app.route('/api/username', methods=["GET"])
def getUserName():
    try:
        response = {"logged": True, "name": current_user.id}
    except:
        response = {"logged": False}
    return jsonify(response), 200

if __name__ == "__main__":
    app.run(debug=True, port="8000")