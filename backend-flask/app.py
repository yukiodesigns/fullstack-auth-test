import jwt
import bcrypt
from flask import Flask, jsonify, request, session
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, create_access_token
from flask_bcrypt import check_password_hash, Bcrypt
from bson import ObjectId 

app = Flask(__name__)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
CORS(app)

app.config['MONGO_URI'] = 'mongodb+srv://yukio:yukiosrandoms2005@cluster0.3bk1dfx.mongodb.net/flask_project?retryWrites=true&w=majority'
mongo = PyMongo(app)

app.secret_key= 'secret key'
app.config['JWT_SECRET_KEY']='this-is-secret-key'

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/adminRegister', methods=['POST'])
def adminRegister():
    try:
        allusers = mongo.db.admins

        user = allusers.find_one({'email': request.json['email']})
        fullName = allusers.find_one({'fullName': request.json['fullName']})

        if user:
            return jsonify(message='Email already exists'), 401
        if fullName:
            return jsonify(message='Name already exists'), 401

        # Check if passwords match
        if request.json['password'] != request.json['cpassword']:
            return jsonify(message='Passwords do not match'), 401

        # Hash the passwords
        hashed_password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')
        hashed_cpassword = bcrypt.generate_password_hash(request.json['cpassword']).decode('utf-8')

        # Create access token
        access_token = create_access_token(identity=request.json['email'])

        # Insert user data into the collection
        allusers.insert_one({
            'email': request.json['email'],
            'fullName': request.json['fullName'],
            'password': hashed_password,
            'cpassword': hashed_cpassword,
            'tokens': [{'token': str(access_token)}]
        })

        return jsonify(token=str(access_token)), 201

    except Exception as e:
        print(f"Error in adminRegister route: {e}")
        return jsonify(error='Internal server error'), 500

@app.route('/adminLogin', methods=['POST'])
def adminLogin():
    allusers = mongo.db.admins
    user = allusers.find_one({'email': request.json['email']})

    if user:
        # Use check_password_hash to compare hashed password
        if check_password_hash(user['password'], request.json['password']):
            access_token = create_access_token(identity=request.json['email'])
            
            # Update the user document with a new token
            allusers.update_one(
                {'_id': ObjectId(user['_id'])},
                {'$push': {'tokens': {'token': str(access_token)}}}
            )

            return jsonify(token=str(access_token)), 201

    return jsonify(message='Invalid email or password'), 401
@app.route('/adminLogout', methods=['POST'])
def adminLogout():
    try:
        allusers = mongo.db.admins
        user = allusers.find_one({'tokens.token': request.json['auth']})

        if user:
            allusers.update_one(
                {'_id': user['_id']},
                {'$set': {'tokens': []}}
            )
            return jsonify(message='Successfully logged out'), 201

        return jsonify(message='Logout Failed'), 401

    except Exception as e:
        print(str(e))  
        return jsonify(error='Internal server error'), 500



if __name__ == '__main__':
    app.run(debug=True)

