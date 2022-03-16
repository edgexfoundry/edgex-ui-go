import configparser
import os

class Config():
    def __init__(self):
        self.cf = configparser.ConfigParser()
        self.cfpath = os.path.dirname(os.path.abspath('.')) + '/common/configuration.ini'
        self.cf.read(self.cfpath)
    def getConfig(self):
        return self.cf
    def getBrowserDriver(self):
        return self.cf.get('browser', 'name')
    def getUrl(self):
        return self.cf.get('browser', 'url')
    def getAccessToken(self):
        return self.cf.get('browser', 'accessToken')