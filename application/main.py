from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask import json, jsonify
import random
from flask_cors import CORS, cross_origin
import base64
import requests
import numpy as np
import re
import datetime
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()

main = Blueprint('main', __name__)
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY')

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


@main.route('/')
@main.route('/index')
@main.route('/home')
def index():
    return render_template("index.html")


@main.route("/test")
def test():
    response = supabase.table('user').select("*").execute()
    print(response)
    return render_template("index.html")
