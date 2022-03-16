from pages.login import LoginPage
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class AddNewDevice(LoginPage):
    def __init__(self, driver):
        self.driver = driver
    def addNewDevice(self):
        time.sleep(2)
        self.driver.find_element(By.CSS_SELECTOR, ".nav-link:nth-child(3) > span").click()
        self.driver.find_element(By.LINK_TEXT, "Device").click()
        self.driver.find_element(By.CSS_SELECTOR, ".btn-info > span > span").click()
        self.driver.find_element(By.CSS_SELECTOR, "tr:nth-child(1) input").click()
        self.driver.find_element(By.CSS_SELECTOR, ".btn-primary > span").click()
        element = self.driver.find_element(By.CSS_SELECTOR, ".btn-primary > span")
        actions = ActionChains(self.driver)
        actions.move_to_element(element).perform()
        element = self.driver.find_element(By.CSS_SELECTOR, "body")
        actions = ActionChains(self.driver)
        actions.move_to_element(element).perform()
        self.driver.find_element(By.CSS_SELECTOR, ".page-link > span:nth-child(1)").click()
        self.driver.find_element(By.CSS_SELECTOR, "tr:nth-child(2) input").click()
        self.driver.find_element(By.CSS_SELECTOR, ".btn-primary > span").click()
        self.driver.find_element(By.NAME, "deviceDescription").click()
        self.driver.find_element(By.NAME, "deviceDescription").send_keys("test add virtual device 01")
        time.sleep(1)
        self.driver.find_element(By.NAME, "deviceName").click()
        self.driver.find_element(By.NAME, "deviceName").send_keys("test-device-01")
        time.sleep(1)
        self.driver.find_element(By.CSS_SELECTOR, ".btn-primary > span").click()
        self.driver.find_element(By.NAME, "interval").click()
        self.driver.find_element(By.NAME, "interval").send_keys("10")
        time.sleep(1)
        dropdown = self.driver.find_element(By.NAME, "eventIntervalUnit")
        dropdown.find_element(By.XPATH, "//option[. = 'minute']").click()
        time.sleep(1)
        self.driver.find_element(By.CSS_SELECTOR, ".ng-valid > option:nth-child(3)").click()
        self.driver.find_element(By.NAME, "resource").click()
        time.sleep(1)
        dropdown = self.driver.find_element(By.NAME, "resource")
        dropdown.find_element(By.XPATH, "//option[. = 'EnableRandomization_Float32']").click()
        time.sleep(1)
        self.driver.find_element(By.CSS_SELECTOR, ".is-valid > option:nth-child(1)").click()
        self.driver.find_element(By.CSS_SELECTOR, ".btn-primary > span").click()
        time.sleep(1)
        self.driver.find_element(By.NAME, "protocolName").click()
        dropdown = self.driver.find_element(By.NAME, "protocolName")
        dropdown.find_element(By.XPATH, "//option[. = 'device-virtual']").click()
        time.sleep(1)
        self.driver.find_element(By.CSS_SELECTOR, "option:nth-child(3)").click()
        self.driver.find_element(By.CSS_SELECTOR, ".btn-success > span").click()
        element = self.driver.find_element(By.CSS_SELECTOR, ".page-item:nth-child(4) > .page-link")
        actions = ActionChains(self.driver)
        actions.move_to_element(element).perform()
        element = self.driver.find_element(By.CSS_SELECTOR, "body")
        actions = ActionChains(self.driver)
        actions.move_to_element(element).perform()
