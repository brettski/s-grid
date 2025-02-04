import { Builder, By, Key, until, Browser } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import sleep from './sleep.js';

async function run() {
  const search = 'WebDriver';
  const agentString =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36';

  const options = new chrome.Options();
  options.addArguments(`user-agent=${agentString}`);

  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  // options.addArguments('--incognito');
  options.addArguments('--headless');
  options.setLoggingPrefs({ browser: 'ALL' });
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .usingServer('http://172.27.0.40:4444/wd/hub')
    .build();

  try {
    await driver.get('http://duckduckgo.com');
    await sleep(Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000);
    let searchBox = await driver.findElement(By.name('q'));
    await sleep(Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000);
    await searchBox.sendKeys(search, Key.RETURN);
    await driver.wait(until.titleIs(`${search} at DuckDuckGo`), 30000);
  } catch (err) {
    console.error(`There was an error:`, err);
  } finally {
    const data = await driver.manage().logs().get('browser');
    console.log(data);
    await driver.quit();
    console.log('done');
  }
}

run();
