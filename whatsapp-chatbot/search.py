from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import os
import sys
import time
import pyperclip
import re
import json

options = Options()
options.add_argument("--headless")
options.add_argument("--profile-directory=Default")

os.environ["PATH"] += r"C:\SeleniumDriver\chrome-win64"

def search(product):
    try:
        driver = webdriver.Chrome()
        driver.get("https://buyhatke.com/")
        pyperclip.copy(product)
        search_box = driver.find_element(By.ID, "product-search-bar")
        search_box.clear()
        search_box.send_keys(Keys.CONTROL, 'v')
        time.sleep(5)
        price = driver.find_element(By.CSS_SELECTOR, "div.text-base")
        image = driver.find_element(By.CSS_SELECTOR, "img.product_image").get_attribute("src")
        sites = driver.find_elements(By.CSS_SELECTOR, "img.rounded-full")
        picture_links = []
        for site in sites:
            # picture_links.append(site.get_attribute("src"))
            site = site.get_attribute("src")
            match = re.search(r'/([^/]+)\.png$', site).group(1)
            picture_links.append(match)
        prices = driver.find_elements(By.CSS_SELECTOR, "span.font-bold")
        price_list = []
        for price in prices[:3]:
            price_list.append(price.text)
        
        link = driver.find_elements(By.CSS_SELECTOR, "a.px-3")
        links_list = []
        for l in link[:3]:
            links_list.append(l.get_attribute("href"))
        
        costs = driver.find_elements(By.CSS_SELECTOR, "p.leading-6")
        cost_list = []
        for cost in costs:
            cost_list.append(cost.text)
        cost_list = cost_list[2:]
        cost_ans = []
        for i in range(3):
            cost_ans.append({"site": picture_links[i], "price": price_list[i], "link": links_list[i]})
        # print(ans)
        ans = {}
        ans["product"] = product
        ans['image'] = image
        ans["prices"] = cost_ans
        ans["lowest"] = cost_list[0]
        ans["average"] = cost_list[1]
        print(json.dumps(ans)) 

    except Exception as e:
        print(e)
    finally:
        driver.quit()

link = sys.argv[1]
# link = "https://www.amazon.in/OnePlus-Misty-Green-128GB-Storage/dp/B0C7V7VH6Q/ref=sr_1_1?dib=eyJ2IjoiMSJ9.yxu-J8K01Kwqy2L1hyS_byB3Aw1LFhijGEb5WIT4Y3ZXlgi_BzF_x0yN0typbm7F-5oGeDvG6nrEm9wHICsyYAhNZTJ_YAbAEP37_98HKCe5JYf1XXQTxc-NYrkrF5cKKX2sVhNkphl0V2ga3igr502nyHUsq-vJ3Gk0TBJ0x7u5wTFhfXMS4stDH8qsB1DgyjSIjZzaUuSkAijGywe-ZJfFmOn90GwnQvXlbx0EYyg.XLyDGVuERPdg8yLwUnVXQVPG7V7cgbWcoT4xk0wTcM4&dib_tag=se&keywords=oneplus+nord+3&qid=1710021195&sr=8-1"
search(link)