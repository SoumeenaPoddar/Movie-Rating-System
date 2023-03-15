from multiprocessing.reduction import register
from urllib import response
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_cors import cross_origin
import requests,json
import smtplib


API_KEY = '0e1b58bb51adc4658bb4a07359bca892'
SENDER_EMAIL = "sumitjanajana@gmail.com"
SENDER_PASSWORD = "dobjpnuelglwokmd"
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://root:kinginfernet@localhost:3306/testdatabase'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)

class Register(db.Model):
    email = db.Column(db.String(255), primary_key=True)
    firstName = db.Column(db.String(50))
    lastName = db.Column(db.String(50))
    userName = db.Column(db.String(50))
    contactNumber = db.Column(db.String(10))
    password = db.Column(db.String(50))

    def __repr__(self):
        return "<Register %s>" % self.name

class RegisterAdmin(db.Model):
    email = db.Column(db.String(255), primary_key=True)
    firstName = db.Column(db.String(50))
    lastName = db.Column(db.String(50))
    contactNumber = db.Column(db.String(10))
    password = db.Column(db.String(50))

    def __repr__(self):
        return "<Register %s>" % self.name

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    movieId = db.Column(db.Integer)
    title = db.Column(db.String(100))
    image = db.Column(db.String(100))
    userName = db.Column(db.String(50))
    comment = db.Column(db.String(255))
    rating = db.Column(db.Integer)
    isApproved = db.Column(db.Boolean)


    def __repr__(self):
        return "<Review %s>" % self.name

db.create_all()

class RegisterSchema(ma.Schema):
    class Meta:
        fields = ("email", "firstName", "lastName")

class RegisterAdminSchema(ma.Schema):
    class Meta:
        fields = ("email", "firstName", "lastName")

class LoginSchema(ma.Schema):
    class Meta:
        fields = ("userName","firstName")

class ReviewSchema(ma.Schema):
    class Meta:
        fields = ("id","movieId","userName","comment","rating","image","title","isApproved")



register_schema = RegisterSchema()
register_admin_schema = RegisterAdminSchema()
login_schema = LoginSchema()
review_schema = ReviewSchema()
review_schemas = ReviewSchema(many=True)


class RegisterResource(Resource):
    def post(self):
        emailCheck = request.json["email"]
        userNameCheck = request.json['userName']
        user = Register.query.get(emailCheck)
        # if(user is not None):
        #     return "",404
        # user = Register.query.filter_by(userName=userNameCheck)
        # if(user is not None):
        #     return "",404
        new_register = Register(
            email=request.json["email"],
            firstName=request.json["firstName"],
            lastName=request.json["lastName"],
            userName=request.json["userName"],
            contactNumber=request.json["contactNumber"],
            password=request.json["password"]
        )
        db.session.add(new_register)
        db.session.commit()
        return register_schema.dump(new_register)

class LoginResource(Resource):
    def post(self):
        email = request.json["email"]
        password = request.json["password"]
        user = Register.query.get(email)
        if(user is None):
            return "",404
        if(user.password != password):
            return "",204
        return login_schema.dump(user)

class RegisterAdminResource(Resource):
    def post(self):
        emailCheck = request.json["email"]
        userNameCheck = request.json['userName']
        user = RegisterAdmin.query.get(emailCheck)
        # if(user is not None):
        #     return "",404
        # user = Register.query.filter_by(userName=userNameCheck)
        # if(user is not None):
        #     return "",404
        new_register = RegisterAdmin(
            email=request.json["email"],
            firstName=request.json["firstName"],
            lastName=request.json["lastName"],
            contactNumber=request.json["contactNumber"],
            password=request.json["password"]
        )
        db.session.add(new_register)
        db.session.commit()
        return register_schema.dump(new_register)

class LoginAdminResource(Resource):
    def post(self):
        email = request.json["email"]
        password = request.json["password"]
        user = RegisterAdmin.query.get(email)
        if(user is None):
            return "",404
        if(user.password != password):
            return "",204
        return login_schema.dump(user)

class MovieListResource(Resource):
    def get(self,movie_type):
        response = requests.get('https://api.themoviedb.org/3/discover/movie?api_key='+API_KEY+'&language=en-US&include_adult=false&'+movie_type)
        if response.status_code == 200:
            return response.json()
        return "",204


class MovieResource(Resource):
    def get(self,movie_id):
        response = requests.get('https://api.themoviedb.org/3/movie/'+movie_id+'?api_key='+API_KEY+'&language=en-US&append_to_response=videos')
        if response.status_code == 200:
            data = response.json()
            return data
        return "",204

class MovieSearchResource(Resource):
    def get(self,val):
        response = requests.get('https://api.themoviedb.org/3/search/movie?api_key='+API_KEY+'&language=en-US&include_adult=false&query='+val)
        if response.status_code == 200:
            data = response.json()
            return data
        return "",204

class ReviewGetResource(Resource):
    def get(self,movie_id):
        reviews = Review.query.filter_by(movieId=movie_id).all()
        return review_schemas.dump(reviews)

class ReviewAdminGetResource(Resource):
    def get(self):
        reviews = Review.query.filter_by(isApproved=False).all()
        return review_schemas.dump(reviews)

class ReviewPostResource(Resource):
    def post(self):
        new_review = Review(
            movieId = request.json["movieId"],
            title = request.json["title"],
            image = request.json["image"],
            userName=request.json["userName"],
            comment=request.json["comment"],
            rating = request.json["rating"],
            isApproved = False
        )
        db.session.add(new_review)
        db.session.commit()
        admins = RegisterAdmin.query.all()
        li = []
        for admin in admins:
            li.append(admin.email)

        for dest in li:
            s = smtplib.SMTP('smtp.gmail.com', 587)
            s.starttls()
            s.login(SENDER_EMAIL, SENDER_PASSWORD)
            message = """Subject: Movie Review Posted

            Hi , a review on the movie:{movie} was posted by {user}. Please validate the review."""
            s.sendmail("sender_email_id", dest, message.format(movie=new_review.title,user=new_review.userName))
            s.quit()
        return review_schema.dump(new_review)

class ReviewAdminResource(Resource):
    def patch(self, movie_id):
        review = Review.query.filter_by(id=movie_id).update(dict(isApproved=1))
        db.session.commit()
        return "",200

    def delete(self, movie_id):
        review = Review.query.filter_by(id=movie_id).delete()
        db.session.commit()
        return review_schema.dump(review)

api.add_resource(RegisterResource, "/Register/")
api.add_resource(LoginResource, "/Login/")
api.add_resource(RegisterAdminResource, "/RegisterAdmin/")
api.add_resource(LoginAdminResource, "/LoginAdmin/")
api.add_resource(MovieListResource, "/MoviePopular/<string:movie_type>")
api.add_resource(MovieResource, "/Movie/<string:movie_id>")
api.add_resource(MovieSearchResource, "/Search/<string:val>")
api.add_resource(ReviewGetResource, "/Review/<int:movie_id>")
api.add_resource(ReviewAdminGetResource, "/ReviewAdmin/")
api.add_resource(ReviewAdminResource, "/Admin/<int:movie_id>")
api.add_resource(ReviewPostResource, "/Review/")

if __name__ == "__main__":
    app.run(debug=True)