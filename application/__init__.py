# Import Flask
from flask import Flask

def create_app():
    app = Flask(__name__)

    # app.config.from_pyfile("config.cfg")
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # blueprint for non-auth parts of app
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
