import nltk
nltk.download('stopwords')
nltk.download('punkt')
import regex as re
import string
import sys
import json
from nltk.corpus import stopwords
stop_words = set(stopwords.words('english'))
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem import PorterStemmer, WordNetLemmatizer

stemmer = PorterStemmer()
lemmatizer = WordNetLemmatizer()

import joblib

vectorizer = joblib.load('vectorizer.joblib')
description_vectors = joblib.load('description_vectors.joblib')
df = joblib.load('df.joblib')
# cosine_similarity = joblib.load('cosine_sim_matrix.joblib')

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

# input_title = 'High performance 11gb ram 5000mAh battery'
input_title = sys.argv[1]
preprocessed_input = preprocess_text(input_title)
# print(preprocessed_input)

input_vector = vectorizer.transform([preprocessed_input])
cosine_sim_scores = cosine_similarity(input_vector, description_vectors)[0]
top_indices = cosine_sim_scores.argsort()[::-1][:1]
top_recommendations = df.loc[top_indices, ['name', 'price', 'about', 'rating', 'image']]


# print("Top Recommendation:")
ans = {}
for i, recommendation in enumerate(top_recommendations.itertuples(), start=1):
    name = recommendation.name
    ans['name'] = name
    price = recommendation.price
    ans['price'] = price
    about = recommendation.about
    ans['about'] = about
    rating = recommendation.rating
    ans['rating'] = rating
    image = recommendation.image
    ans['image'] = image
    # print(f"Recommendation {i}:")
    print(json.dumps(ans))