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
import subprocess
import pinecone
# Langchain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Pinecone
from langchain.document_loaders import TextLoader
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA, LLMChain, LLMCheckerChain
from langchain.callbacks import wandb_tracing_enabled
from langchain.prompts import (
    PromptTemplate,
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.prompts.few_shot import FewShotPromptTemplate

from typing import Optional
from langchain.chains import SimpleSequentialChain, SequentialChain

from langchain.chains.openai_functions import (
    create_openai_fn_chain,
    create_structured_output_chain,
)
from langchain.schema import HumanMessage, AIMessage, ChatMessage



load_dotenv()

main = Blueprint('main', __name__)
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
INDEX_NAME = os.environ.get("PINECONE_INDEX_NAME")
PINECONE_ENVIRONMENT = os.environ.get("PINECONE_ENVIRONMENT")

pinecone.init(
    api_key=PINECONE_API_KEY,  # find at app.pinecone.io
    environment=PINECONE_ENVIRONMENT,  # next to api key in console
)
embeddings = OpenAIEmbeddings(model='text-embedding-ada-002')
index = pinecone.Index(INDEX_NAME) 
model_name = "gpt-4-0613"
temperature = 0.0
llm_qa = ChatOpenAI(model_name=model_name, temperature=temperature)
vectorstore = Pinecone(index, embeddings.embed_query, "text")


supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


@main.route('/')
@main.route('/index')
@main.route('/home')
def index():
    return render_template("/index.html")


@main.route('/question')
def question():
    return render_template("/question.html")


@main.route("/test")
def test():
    response = supabase.table('user').select("*").execute()
    print(response)
    return render_template("index.html")

# @main.route("/sendMessage")


commandArr = [
    "wget -r -np -nd -A.html,.txt,.tmp -P websites",
    "python cleaner.py",
    "python chunker.py",
    "python vectorizor.py",
]


@main.route("/getSummary", methods=["GET", "POST"])
def getSummary():
    if request.method == "POST":
        return jsonify({'message': f'success'})
        if request.json['url']:
            url = request.json['url']
            print(url)
            for command in commandArr:
                if "wget" in command:
                    command = command + " " + url
                result = subprocess.run(
                    command, shell=True, capture_output=True, text=True, cwd="./Sn33k")
            qa_chain = RetrievalQA.from_chain_type(
                llm=llm_qa,
                chain_type="refine",
                retriever=vectorstore.as_retriever(),
                # verbose=True,
            )
            query = "What is happening at Singapore on Saturday?"
            response = qa_chain(query)
            print(response)
            return jsonify({'message': f'{response}'})    
        return jsonify({'message': f'invalid url'})
    return render_template("index.html")
