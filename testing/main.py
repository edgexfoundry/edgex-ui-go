from pages.driver import Driver
from pages.login import LoginPage
from pages.addNewDevice import AddNewDevice
from pages.devicesvc import DeviceService
from pages.appsvc import AppService
from pages.scheduler import Scheduler
from pages.notification import Notification
from pages.config import Config
import time

if __name__ == '__main__':
    print('EdgeX GUI AUTO TESTING Starting...')

    # driver = Driver()
    # time.sleep(2)

    lp = LoginPage()
    lp.login()

    time.sleep(2)
    ad = AddNewDevice(lp.getDriver())
    ad.addNewDevice()

    # time.sleep(1)
    # updateSvc = DeviceService(lp.getDriver())
    # updateSvc.updateSvc()

    # time.sleep(1)
    # ap = AppService(lp.getDriver())
    # ap.appSvcUpddate()

    # time.sleep(1)
    # sc = Scheduler(lp.getDriver())
    # sc.addIntervalAndAction()

    # time.sleep(1)
    # noti = Notification(lp.getDriver())
    # noti.addSub()

    time.sleep(2)
    lp.getDriver().quit()

