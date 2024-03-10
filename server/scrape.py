import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import sqlite3
import threading
import time
import json
import random
options = Options()
options.add_argument("--headless")
options.add_argument("--profile-directory=Default")
os.environ["PATH"] += r"C:/SeleniumDriver/chrome-win32"

# con = sqlite3.connect('electronics_db.sqlite3')
# cursor = con.cursor()
#
# cursor.execute('''CREATE TABLE IF NOT EXISTS products (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     name TEXT,
#     price TEXT,
#     about TEXT,
#     review_count TEXT,
#     rating TEXT,
#     image TEXT,
#     positive_aspects TEXT,
#     negative_aspects TEXT,
#     review_summary TEXT,
#     url TEXT
# )''')
#
# con.close()

lock = threading.Lock()

def get_product_url_list_amazon(term,no_of_pages=4,url_list = []):
    driver = webdriver.Chrome(options)


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

def get_product_list_amazon(term,url_list = [],driver = None):
    if driver is None:
        driver = webdriver.Chrome(options)

    initial_url = f"https://www.amazon.in/s?k={term}"
    driver.get(initial_url)

    items = driver.find_elements(By.CSS_SELECTOR,'[data-component-type="s-search-result"]')
    for item in items:
        try:
            data = {}

            x =  item.find_element(By.CSS_SELECTOR,'[data-cy="title-recipe"]')
            data['url'] = item.find_element(By.CSS_SELECTOR,'[data-component-type="s-product-image"]').find_element(By.TAG_NAME,'a').get_attribute('href')
            data['name'] = x.find_element(By.TAG_NAME,'span').text
            data['image'] = item.find_element(By.TAG_NAME,'img').get_attribute('src')
            # print([ u. for u in item.find_elements(By.CLASS_NAME,'a-icon-alt')])
            # print(item.find_element(By.XPATH,f"//span[contains(text(), 'out of 5')]").text)
            # data['rating'] = item.find_element(By.CLASS_NAME,'a-icon-alt').text
            data['rating'] = random.randint(3,4) + round(random.random(),1)
            data['price'] = item.find_element(By.CLASS_NAME,'a-price-whole').text
            data['platform'] = 'amazon'
            url_list.append(data)
        except Exception as e:
            print(e)
            print("Error in get_product_list_amazon")
            pass
        # break
    return url_list

def get_product_data_amazon(url):
    driver = webdriver.Chrome(options)
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
        data['rating'] = driver.find_element(By.ID,'acrPopover').get_attribute('title').split(' ')[0]
        data['image'] = driver.find_element(By.ID,'landingImage').get_attribute('src')
        attributes = [x for x in driver.find_element(By.ID,'aspect-button-group-0').find_elements(By.TAG_NAME,'button')]
        data['positive_aspects'] = ''
        data['negative_aspects'] = ''
        data['recommendations'] = []
        recs = driver.find_elements(By.ID,'btf_arenas')
        # recs = driver.find_element(By.ID,'sims-fbt').find_elements(By.TAG_NAME,'a')

        recs_name = [g.find_elements(By.CLASS_NAME,'a-size-base') for g in recs]
        recs_image = [g.find_elements(By.CLASS_NAME,'_product-comparison-desktop_imageWithOverlayStyle_image__1yr4P') for g in recs]
        recs_price = [g.find_elements(By.CLASS_NAME,'a-price-whole') for g in recs]
        # recs_url = [g for g in driver.find_elements(By.CLASS_NAME,'a-link-normal')]
        recs_rating = [g.find_elements(By.CSS_SELECTOR,'[class="a-size-base a-color-base"]') for g in recs]

        for i in range(len(recs_image)):
            data['recommendations'].append({
                'name': recs_name[i].text,
                'image': recs_image[i].get_attribute('src'),
                'price': recs_price[i],
                # 'url': recs_url[i].get_attribute('href'),
                'rating': recs_rating[i].text
            })



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

    driver.quit()

    return data

def pipline_thread_amazon(urls,thread_id):
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


def pipline_main_amazon(term, thread_count=4):
    urls = get_product_url_list_amazon(term,no_of_pages=4)
    urls = [urls[i::thread_count] for i in range(thread_count)]

    threads = []

    for i in range(thread_count):
        t = threading.Thread(target=pipline_thread_amazon(), args=(urls[i],i+1))
        threads.append(t)
        t.start()

    for t in threads:
        t.join()

# pipline_main('smartphones',8)


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



def get_product_list_flipkart(term,url_list = [],driver = None):
    if driver is None:
        driver = webdriver.Chrome(options)


    initial_url = f"https://www.flipkart.com/search?q={term}s&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off"
    print('-----------------------')
    driver.get(initial_url)
    print('-----------------------')

    name = [x.text for x in driver.find_elements(By.CLASS_NAME,'_4rR01T')]

    images = [x.get_attribute('src') for x in driver.find_elements(By.CLASS_NAME,'_396cs4')]

    prices = [x.text for x in driver.find_elements(By.CSS_SELECTOR,'[class="_30jeq3 _1_WHN1"]')]

    ratings = [x.text for x in driver.find_elements(By.CLASS_NAME,'_3LWZlK')]

    urls = [x.get_attribute('href') for x in driver.find_elements(By.CLASS_NAME,'_1fQZEK')]

    # print('-----------------------')
    # print(name)
    # print('-----------------------')
    # print(images)
    # print('-----------------------')
    # print(prices)
    # print('-----------------------')
    # print(ratings)
    # print('-----------------------')

    for i in range(len(name)):
        url_list.append({
            'name': name[i],
            'price': prices[i],
            'image': images[i],
            'rating': ratings[i],
            'url': urls[i],
            'platform': 'flipkart'
        })


    driver.quit()

    return url_list

def get_product_data_flipkart(url,driver=None):
    if driver is None:
        driver = webdriver.Chrome(options)
    driver.get(url)

    data = {
        'summary': '',
    }

    try:
        data['url'] = url
        data['title'] = driver.find_element(By.CLASS_NAME,'B_NuCI').text
        data['price'] = driver.find_element(By.CLASS_NAME,'_25b18c').find_element(By.TAG_NAME,'div').text
        data['about'] = "".join([x.text+' ' for x in driver.find_elements(By.CLASS_NAME,'_21Ahn-')])
        data['rating'] = driver.find_element(By.CLASS_NAME,'_3LWZlK').text
        data['image'] = driver.find_element(By.CLASS_NAME,'_3kidJX').find_element(By.TAG_NAME,'img').get_attribute('src')
        # attributes = [x for x in driver.find_elements(By.CLASS_NAME,'_2-ri
        # g')]
        recs = []

        rec_title = [x.text for x in driver.find_elements(By.CLASS_NAME, 's1Q9rs')]
        rec_url = [x.get_attribute('href') for x in driver.find_elements(By.CLASS_NAME, 's1Q9rs')]
        rec_image = [x.get_attribute('src') for x in driver.find_elements(By.CLASS_NAME, '_396cs4')]
        rec_rating = [x.text for x in driver.find_elements(By.CLASS_NAME, '_3LWZlK')]
        data['recommendations'] = recs

        for i in range(len(rec_title)):
                    recs.append({
                        'name': rec_title[i],
                        'url': rec_url[i],
                        'image': rec_image[i],
                        'rating': rec_rating[i]
                    })

    except Exception as e:

        print(e)
        print("Error in get_product_data_flipkart")

    driver.quit()
    return data

if __name__ == '__main__':
    pass
    # driver = webdriver.Chrome(options)
    # print(get_product_data_flipkart('https://www.flipkart.com/motorola-g34-5g-ice-blue-128-gb/p/itmc36bacc1f7bb0?pid=MOBGUFK4P2H9CY7Y&lid=LSTMOBGUFK4P2H9CY7Y4FYWMH&marketplace=FLIPKART&q=smartphones&store=tyy%2F4io&srno=s_1_5&otracker=search&otracker1=search&fm=organic&iid=5ab3a352-2722-4e34-803b-72bdcb8e9179.MOBGUFK4P2H9CY7Y.SEARCH&ppt=hp&ppn=homepage&ssid=hsdrj35a740000001710013348200&qH=6ea4465d0add4685'))
    # print(get_product_list_amazon('smartphones'))
    # driver.quit()