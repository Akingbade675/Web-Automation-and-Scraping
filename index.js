const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

try {
    (async () => {
        const browser = await puppeteer.launch(
            {
                headless: false,
                defaultViewport: false
            }
        );
        const page = await browser.newPage();
        await page.goto(process.env.URL);
        //await page.screenshot({ path: '***' })
    
        await page.type('#UsernameTextBox', process.env.UNAME, {delay: 100})
        await page.type('#PasswordTextBox', process.env.PSWORD, {delay: 100})
        await page.click('input[type="submit"]', { delay: 300 })
        
        await page.waitForSelector('#Contents_accommodationconfirmationdiv').then(async () => 
            await page.click('#Contents_accommodationconfirmationdiv')
        )
    
        await page.waitForSelector('#errordiv');
    
        
        // get the innerHTML of the div
        const errorDivContent = await page.$eval('#errordiv', el => el.innerHTML);
      
        console.log(errorDivContent); // "No valid accommodation reservation found"
        // await browser.close();
    })();
} catch (error) {
    console.error(error);
}