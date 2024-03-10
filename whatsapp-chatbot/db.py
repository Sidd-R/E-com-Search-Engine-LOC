import sqlite3
import pandas as pd

# Connect to SQLite database
conn = sqlite3.connect('electronics_db.sqlite3')  
query = 'SELECT * FROM products'

# Use pandas to read the query result into a DataFrame
df = pd.read_sql_query(query, conn)

# Close the database connection
conn.close()


import nltk
nltk.download('stopwords')
nltk.download('punkt')
import regex as re
import string
from nltk.corpus import stopwords
stop_words = set(stopwords.words('english'))
from nltk.stem import PorterStemmer, WordNetLemmatizer

stemmer = PorterStemmer()
lemmatizer = WordNetLemmatizer()


def preprocess_text(text):
    try:
        text = text.lower()  # Convert to lowercase
        text = re.sub(r'\W+', ' ', text)  # Remove non-alphanumeric characters

        # Tokenize the text
        tokens = nltk.word_tokenize(text)

        # Remove stopwords
        tokens = [token for token in tokens if token not in stop_words]

        # Stem the tokens
        stemmed_tokens = [stemmer.stem(token) for token in tokens]

        # Join the tokens back into a single string
        processed_text = ' '.join(stemmed_tokens)
        
        return processed_text
    except Exception as e:
        print(e)
        print('Text: ',text)


df['desc'] = df['about'].apply(preprocess_text)


from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

# Convert descriptions to vectors using TF-IDF
vectorizer = TfidfVectorizer(analyzer='word',min_df=0.05)
description_vectors = vectorizer.fit_transform(df['desc'])

# Calculate the cosine distance matrix
cosine_sim_matrix = cosine_similarity(description_vectors)

import joblib

# Save the vectorizer
joblib.dump(vectorizer, 'vectorizer.joblib')

joblib.dump(df, 'df.joblib')

# Save the description vectors
joblib.dump(description_vectors, 'description_vectors.joblib')

# Save the cosine similarity matrix
joblib.dump(cosine_sim_matrix, 'cosine_sim_matrix.joblib')