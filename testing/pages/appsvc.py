from pages.login import LoginPage
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

class AppService(LoginPage):
    def __init__(self, driver):
        self.driver = driver
    def appSvcUpddate(self):
        self.driver.find_element(By.LINK_TEXT, "AppService").click()
        self.driver.find_element(By.CSS_SELECTOR, ".badge > span").click()
        dragged = self.driver.find_element(By.ID, "builtinFunc-FilterByDeviceName")
        dropped = self.driver.find_element(By.ID, "funcExecOrderSelectedBody")
        actions = ActionChains(self.driver)
        actions.drag_and_drop(dragged, dropped).perform()
        time.sleep(1)
        element = self.driver.find_element(By.CSS_SELECTOR, ".input-group-text")
        actions = ActionChains(self.driver)
        actions.move_to_element(element).click_and_hold().perform()
        element = self.driver.find_element(By.CSS_SELECTOR, ".combo-shielder")
        actions = ActionChains(self.driver)
        actions.move_to_element(element).release().perform()
        self.driver.find_element(By.CSS_SELECTOR, "app-device-combo-list").click()
        self.driver.find_element(By.CSS_SELECTOR, "tr:nth-child(2) input").click()
        self.driver.find_element(By.CSS_SELECTOR, ".combo-shielder").click()
        dropdown = self.driver.find_element(By.NAME, "FilterOut")
        dropdown.find_element(By.XPATH, "//option[. = 'true']").click()
        time.sleep(1)
        self.driver.find_element(By.CSS_SELECTOR, "option:nth-child(2)").click()
        self.driver.find_element(By.CSS_SELECTOR, ".mb-3:nth-child(2) > .card-body").click()
        self.driver.find_element(By.CSS_SELECTOR, ".btn-success > span").click()
        self.driver.execute_script("window.scrollTo(0,0)")
