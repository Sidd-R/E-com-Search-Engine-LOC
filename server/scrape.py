import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import sqlite3
import threading
import time
import json

options = Options()
options.add_argument("--headless")
options.add_argument("--profile-directory=Default")
os.environ["PATH"] += r"C:/SeleniumDriver/chrome-win32"

con = sqlite3.connect('electronics_db.sqlite3')
cursor = con.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price TEXT,
    about TEXT,
    review_count TEXT,
    rating TEXT,
    image TEXT,
    positive_aspects TEXT,
    negative_aspects TEXT,
    review_summary TEXT,
    url TEXT
)''')

lock = threading.Lock()

def get_product_url_list_amazon(term,no_of_pages=4):
    driver = webdriver.Chrome(options)
    url_list = []

    initial_url = f"https://www.amazon.in/s?k={term}"
    driver.get(initial_url)

    for i in range(no_of_pages):
        try:
            img_w_link =  driver.find_elements(By.CSS_SELECTOR,'[data-component-type="s-product-image"]')
            for x in img_w_link:
                k = x.find_element(By.TAG_NAME,'a').get_attribute('href')
                url_list.append(k)
        except Exception as e:
            print(e)
            print("Error in get_product_url_list_amazon")
            pass
        if i == no_of_pages - 1: continue
        try:
            pg_links = driver.find_element(By.CSS_SELECTOR,'[class="s-pagination-strip"]').find_elements(By.TAG_NAME,'a')
            temp = []
            for g in pg_links:
                temp.append(g)
            next_page_url = temp[-1].get_attribute('href')
            driver.get(next_page_url)
            # time.sleep(6)
        except Exception as e:
            print(e)
            print("Error in get_product_url_list_amazon")
            pass

    driver.quit()

    return url_list

def get_product_data_amazon(url,driver):
    driver.get(url)

    data = {
        'summary': '',
    }

    try:
        data['url'] = url
        data['title'] = driver.find_element(By.ID,'productTitle').text
        data['price'] = driver.find_element(By.ID,'corePriceDisplay_desktop_feature_div').find_element(By.CLASS_NAME,'a-price-whole').text.replace(',','')
        data['about'] = "".join([x.find_element(By.CLASS_NAME,'a-list-item').text+' ' for x in driver.find_element(By.ID,'feature-bullets').find_elements(By.TAG_NAME,'li')])
        data['review_count'] = driver.find_element(By.CSS_SELECTOR,'[data-hook="total-review-count"]').text
        data['rating'] = driver.find_element(By.CSS_SELECTOR,'[data-hook="total-review-count"]').text.split(' ')[0]
        data['image'] = driver.find_element(By.ID,'landingImage').get_attribute('src')
        attributes = [x for x in driver.find_element(By.ID,'aspect-button-group-0').find_elements(By.TAG_NAME,'button')]
        data['positive_aspects'] = ''
        data['negative_aspects'] = ''

        for k in attributes:
            atr = k.get_attribute('aria-describedby').split(' ')
            if atr[0][0] == 'P':
                data['positive_aspects'] +=  atr[-1] + ', '
            else:
                data['negative_aspects'] += atr[-1] + ', '



        data['summary'] = driver.find_element(By.ID,'product-summary').find_element(By.TAG_NAME,'span').text
    except Exception as e:
        print(e)
        print("Error in get_product_data_amazon")

    return data

def pipline_thread(urls,thread_id):
    driver = webdriver.Chrome(options=options)
    for i, url in enumerate(urls):
        print('-----------------------------------')
        print("Thread id: ",thread_id)
        print(f"started processing [{i+1}/{len(urls)}]")
        print('-----------------------------------')
        data = get_product_data_amazon(url,driver)
        try:
            with lock:
                con = sqlite3.connect('electronics_db.sqlite3')
                cursor = con.cursor()
                cursor.execute("INSERT INTO products (name, price, about, review_count, rating, image, positive_aspects, negative_aspects, review_summary, url) VALUES (?,?,?,?,?,?,?,?,?,?)",(data['title'],data['price'],data['about'],data['review_count'],data['rating'],data['image'],data['positive_aspects'],data['negative_aspects'],data['summary'],data['url']))
                con.commit()
        except Exception as e:
            print(e)
            print("Error in pipline_thread",thread_id)
            print("error",e)
        finally:
            con.close()
        print('-----------------------------------')
        print("Thread id: ",thread_id)
        print(f"finished processing [{i+1}/{len(urls)}]")
        print('-----------------------------------')
    driver.quit()


def pipline_main(term, thread_count=4):
    urls = get_product_url_list_amazon(term,no_of_pages=4)
    urls = [urls[i::thread_count] for i in range(thread_count)]

    threads = []

    for i in range(thread_count):
        t = threading.Thread(target=pipline_thread, args=(urls[i],i+1))
        threads.append(t)
        t.start()

    for t in threads:
        t.join()

pipline_main('smartphones',8)


# start_time = time.time()
# print('---------------')
# driver = webdriver.Chrome(options=options)
# print('---------------')
# h = get_product_data_amazon('https://www.amazon.in/Samsung-Galaxy-Mint-128GB-Storage/dp/B0CJ4S724M/ref=sr_1_63?th=1',driver)
# print(h)
# print('---------d------')
# driver.quit()
# print('---------d------')
# end_time = time.time()
# #
# print(f"Time taken: {end_time-start_time} seconds")




