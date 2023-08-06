
# CloudHacks-Summy

### Problem
There is too much information out there. It is impossible for students to consume all this information due to the amount of reading and understanding there is.

### Solution
Introducing... Summy, your personal AI companion that summarises both webpages and research papers!

Users can use this Google Extension to summarise the current page or provide links. 

Furthermore, you can ask Summy more questions and it will give you the answers about the current page.

Summy also generates a formatted poster containing all the summarised information to allow for faster and a more visually appealing summary!

### Future Implementation
1. Flashcards/Quizzes to gamify the experience and transform Summy into not just a knowledgeable study buddy but also your dynamic and fun-loving companion!
2. Show similar articles and resources to help make learning more attractive

### Installation
1. Git Clone this repository 
```bash
git clone
```

2. Create a .env file
```
OPENAI_API_KEY="--------YOUR OPENAI KEY--------"
PINECONE_API_KEY = "--------YOUR PINECONE API KEY--------"
PINECONE_INDEX_NAME = "--------YOUR PINECONE INDEX NAME--------"
PINECONE_ENVIRONMENT="--------YOUR PINECONE ENVIRONMENT--------"
HUGGING_FACE_API_KEY="--------YOUR HUGGINGFACE API KEY--------"
```

3. Install requirements.txt file [Ensure you have Python Installed >=3.7]
```bash
pip install -r requirements.txt
```

5. Run the app.py file
```bash
python app.py
```

##### For Chrome
6. Search ```chrome://extensions/``` on Chrome
7. Turn on developer mode
8. Click "Load unpacked"
9. Navigate and Select Folder ```YOUR_PATH/CloudHacks-Summy/extensions```
10. Congratulations! Summy is now yours! 

### How To Use
1. Navigate to a page you want to summarise
2. Click on Summy
3. Popup window should include Summary, Generate Poster
