from selenium import webdriver
from pages.config import Config

class Driver():
    def __init__(self):
        cf = Config()
        print(cf.getBrowserDriver())
        if cf.getBrowserDriver() == 'firefox':
            self.driver = webdriver.Firefox()
        elif cf.getBrowserDriver() == 'chrome':
            self.driver = webdriver.Chrome()
        self.driver.get(cf.getUrl())
    def getDriver(self):
        return self.driver
