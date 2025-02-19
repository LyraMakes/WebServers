#!/usr/bin/env python3
import requests
from bs4 import BeautifulSoup

def main():
    page = requests.get("http://localhost:8080/")

    soup = BeautifulSoup(page.text, 'html.parser')


    hidden_div = soup.find("div", class_="hide")
    hidden_h1 = hidden_div.find("h1")
    
    pass


if __name__ == "__main__":
    main()
