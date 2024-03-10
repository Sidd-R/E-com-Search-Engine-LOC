import json

from flask import Flask, request, jsonify
from flask_cors import CORS
from scrape import get_product_data_flipkart, get_product_data_amazon, get_product_list_amazon, get_product_list_flipkart
import threading
from redis import Redis
from chatbot import query

app = Flask(__name__)
redis_client = Redis(host='localhost', port=6379, db=0)


CORS(app)

@app.route('/search', methods=['GET'])
def search():
    term = request.args.get('term').replace(' ', '+').lower().replace('.','')

    cached_data = redis_client.get(term)

    if cached_data:
        return jsonify(json.loads(cached_data.decode('utf-8')))

    print(term)
    result = []

    amazon_thread = threading.Thread(target=get_product_list_amazon, args=(term,result))
    flipkart_thread = threading.Thread(target=get_product_list_flipkart, args=(term,result))

    amazon_thread.start()
    flipkart_thread.start()

    amazon_thread.join()
    flipkart_thread.join()

    print(result)
    result_str = json.dumps(result)

    redis_client.set(term, result_str)
    return jsonify(result)

@app.route('/product_amazon', methods=['GET'])
def product_amazon():
    url = request.args.get('url')
    cached_data = redis_client.get(url)

    if cached_data:
        return jsonify(json.loads(cached_data.decode('utf-8')))

    result = get_product_data_amazon(url)

    redis_client.set(url, json.dumps(result))
    return jsonify(result)

@app.route('/product_flipkart', methods=['GET'])
def product_flipkart():
    url = request.args.get('url')
    cached_data = redis_client.get(url)

    if cached_data:
        return jsonify(json.loads(cached_data.decode('utf-8')))

    result = get_product_data_flipkart(url)

    redis_client.set(url, json.dumps(result))
    return jsonify(result)

@app.route('/track', methods=['GET'])
def track():
    url = request.args.get('par')
    l = 0
    cached_data = redis_client.get(url)

    if cached_data:
        return jsonify(cached_data.decode('utf-8'))

    result = ['33',33,'989']

    redis_client.set(url, 'kjkj')


    return jsonify(result)


@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    question = data['question']
    details = data['details']

    result = query(question, details)

    return jsonify({'answer':result})

if __name__ == '__main__':
    app.run(debug=True)