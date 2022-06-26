const { getTrendsAvailable , trendByid} = require('./src/twitter.class');
const fs = require('fs');

/**
 * Twitter Trending 
 * @author Abdul Muttaqin
 * @date 2022-06-27
 * @returns {any}
 */
function readJSON(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data));
        });
    });
}
/**
 * Twitter Trending 
 * @author Abdul Muttaqin
 * @date 2022-06-27
 * @returns {any}
 */
function writeTableMarkdown(country,trends) {
    let time = new Date();
    let timeminuteshours = time.getMinutes() + ":" + time.getHours();
    let table = '| Country  |  Trends | Times | \n|---|---|---|\n';
    for (let i = 0; i < trends.length; i++) {
        table += `|${country}| ${trends[i].name} | ${timeminuteshours}|\n`;
    }
    return table;
}
/**
 * Twitter Trending 
 * @author Abdul Muttaqin
 * @date 2022-06-27
 * @returns {any}
 */
async function Available() {
    let trends = await getTrendsAvailable();
    console.log(trends);

    fs.writeFile(`./trends/available.json`, JSON.stringify(trends,null, 2) ,'utf-8', (err) => {
        if (err) {
            console.log(err);
        }
    });
}

/**
 * Twitter Trending 
 * @author Abdul Muttaqin
 * @date 2022-06-27
 * @returns {any}
 */
async function main() {
    await Available();
    let file = await readJSON('./trends/available.json');
    let worlwide = await trendByid(file[0].woeid);
    let README = writeTableMarkdown(file[0].country,worlwide);
    fs.writeFile(`./trends/README.md`, README ,'utf-8', (err) => {
        if (err) {
            console.log(err);
        }
    });
    for (let i = 0; i < file.length; i++) {
        console.log("Saving trends for " + file[i].name);
        let trends = await trendByid(file[i].woeid);
        let table = writeTableMarkdown(file[i].country,trends);
        fs.writeFile(`./trends/${file[i].country}.md`, table ,'utf-8', (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    
}

main();