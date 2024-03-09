from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

options = Options()
options.add_argument("--headless")
options.add_argument("--profile-directory=Default")

# Path to your Chrome WebDriver executable
os.environ["PATH"] += r"C:\SeleniumDriver\chrome-win64"

# Function to scrape the price from Flipkart
def scrape_flipkart_price(product_name):
    try:
        # Initialize Chrome WebDriver
        # service = Service(webdriver_path)
        driver = webdriver.Chrome()

        # Open Flipkart and search for the product
        driver.get("https://www.flipkart.com/")
        search_box = driver.find_element(By.CSS_SELECTOR, '[name="q"]')
        search_box.send_keys(product_name)
        search_box.send_keys(Keys.RETURN)

        # Find the first product and get its price
        products = driver.find_elements(By.CSS_SELECTOR, "div._13oc-S")
        for product in products:
            # Check if the product is sponsored
            # print("Product:", product.text)
            if "Sponsored" not in product.text:
                price_element = product.find_element(By.CSS_SELECTOR, "div._30jeq3")
                price = price_element.text
                print("Price:", price)
                return price
        
        # print("Price:", price)

        # return price
    except Exception as e:
        print("Error scraping Flipkart price:", e)
    finally:
        driver.quit()

@app.route('/get_flipkart_price', methods=['POST'])
def get_flipkart_price():
    amazon_title = request.json['amazon_title']
    flipkart_price = scrape_flipkart_price(amazon_title)
    return jsonify({'flipkart_price': flipkart_price})

if __name__ == '__main__':
    app.run(debug=True)
