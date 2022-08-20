from flask import Flask, render_template, request, redirect, session, url_for, escape
import bcrypt
import requests

import data_handler

app = Flask(__name__)
app.secret_key = 'secretkey'


@app.route('/', methods=['GET', 'POST'])
def base_page():
    return render_template('base.html', isIndex=True)


@app.route('/planets', methods=['GET', 'POST'])
def planet_list():
    source = 'https://swapi.dev/api/planets/'
    data = requests.get(source).json()
    if request.method == 'POST':
        if 'nextbutton' in request.form and request.form['nextbutton'] != 'None':
            source = request.form['nextbutton']
            data = requests.get(source).json()
        elif 'prevbutton' in request.form and request.form['prevbutton'] != 'None':
            source = request.form['prevbutton']
            data = requests.get(source).json()

    return render_template('planets.html', data=data)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    else:
        username = request.form.get('username')
        hashed_pw = hash_password(request.form.get('password'))
        print(username,hashed_pw)
        checkuser = data_handler.get_users_for_login(username)
        if checkuser:
            taken = True
            return render_template('register.html', taken=taken)
        else:
            if username and hashed_pw:
                data_handler.add_user(username, hashed_pw)
                session['username'] = username
                return redirect(url_for('planet_list'))
            else:
                return redirect(url_for('register'))


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.pop('username', 'password')
    return redirect(url_for('base_page'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        username = request.form.get('username')
        password = request.form.get('password')
        hash_password(password)
        users = data_handler.get_users_for_login(username)
        if users != None:
            password_in_database = data_handler.get_password_for_login(username)
            if username == users.get('username') and verify_password(password, password_in_database.get('password')):
                session['username'] = username
                session['password'] = password
                return redirect(url_for('planet_list'))


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


if __name__ == "__main__":
    app.run()
