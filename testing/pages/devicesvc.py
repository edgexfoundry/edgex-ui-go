import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

from pages.login import LoginPage

class DeviceService(LoginPage):
    def __init__(self, driver):
        self.driver = driver
    def updateSvc(self):
        self.driver.find_element(By.CSS_SELECTOR, ".nav-link:nth-child(3) > span").click()
        self.driver.find_element(By.CSS_SELECTOR, ".list-group-item:nth-child(1) .badge-secondary > span").click()
        self.driver.find_element(By.NAME, "deviceSvcDescription").click()
        self.driver.find_element(By.NAME, "deviceSvcDescription").send_keys("this is device rest service")
        time.sleep(1)
        self.driver.find_element(By.CSS_SELECTOR, ".btn-success").click()
