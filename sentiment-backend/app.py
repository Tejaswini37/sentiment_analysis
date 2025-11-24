from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import nltk

nltk.download('stopwords')
nltk.download('wordnet')

app = Flask(__name__)
CORS(app)

model = joblib.load('sentiment_model_compressed.pkl')
vectorizer = joblib.load('vectorizer.pkl')

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def preprocess(text):
    review = re.sub('[^a-zA-Z]', ' ', text)
    review = review.lower().split()
    review = [lemmatizer.lemmatize(word) for word in review if word not in stop_words]
    return ' '.join(review)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data['text']
    clean_text = preprocess(text)
    vectorized = vectorizer.transform([clean_text])
    prediction = model.predict(vectorized)[0]
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
