from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

import time
from pages.driver import Driver
from pages.config import Config

class LoginPage():
    def __init__(self):
        self.cf = Config()
    def login(self):
        if self.cf.getBrowserDriver() == 'firefox':
            self.driver = webdriver.Firefox()
        elif self.cf.getBrowserDriver() == 'chrome':
            self.driver = webdriver.Chrome()
        self.driver.get(self.cf.getUrl())
        time.sleep(3)
        # self.driver.set_window_size(1680, 951)
        # time.sleep(1)
        self.driver.find_element(By.ID, "accessToken").send_keys(self.cf.getAccessToken())
        time.sleep(1)
        self.driver.find_element(By.CSS_SELECTOR, ".btn-success").click()

    def getDriver(self):
        return self.driver