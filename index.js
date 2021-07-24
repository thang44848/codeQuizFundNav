const puppeteer = require('puppeteer');

(async () => {
    const fundName = (process.argv.slice(2))[0];
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://codequiz.azurewebsites.net/');
    await page.waitForSelector("input"); 
    await page.click("input");
    await page.waitForSelector("table");
    var data = await page.evaluate(() => {
        const rows = document.querySelectorAll('body table tbody tr');
        return Array.from(rows, row => {
            const columns = row.querySelectorAll('td');
            return Array.from(columns, column => column.innerText);
        });
    });
    await data.shift();
    for(let i = 0; i < data.length; i++) {
        if(data[i][0] === fundName) {
            console.log(data[i][1]);
            break;
        }
    }
    await browser.close();
})();