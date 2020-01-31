const generateHTML = require('./generateHTML')
const puppeteer = require('puppeteer');
const axios = require("axios");
const inquirer = require("inquirer");
// const generate = require("./generateHTML");
// const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
    {
        type: "input",
        name: "color",
        message: "What is your favorite color?"
    },
    {
        type: "input",
        name: "github",
        message: "Enter your GitHub Username"
    }
];


function promptUser() {
    return inquirer.prompt(questions);
}
promptUser()
    .then(function (data) {
        // console.log(data.name)
        // console.log(data.location)
        // console.log(data.hobby)
        // console.log(data.color)
        // console.log(data.github)
        // console.log(data.linkedin)

        const queryUrl = `https://api.github.com/users/${data.github}`;

        axios.get(queryUrl).then(function (res) {
            var name = (res.data.name);
            var gitSite = (res.data.html_url)
            var blog = (res.data.blog);
            var photo = (res.data.avatar_url);
            var location = (res.data.location);
            var realLoc = `https://www.google.com/maps/place/${location}`;
            var reposs = (res.data.public_repos);
            var followers = (res.data.followers);
            var following = (res.data.following);

            // console.log(`${reposs} and ${followers} and ${following} and ${location} and ${photo}`);

            //////////////////////////////// CALL NUMBER TWO //////////////////////////////// 

            const queryUrl1 = `https://api.github.com/users/${data.github}/starred`;

            axios.get(queryUrl1).then(function (resa) {

                var starred = resa.data.length;

                // console.log(starred.length);
                var chain = [location, realLoc, reposs, followers, following, photo, starred, name, blog, gitSite]
                // console.log(chain);
                // console.log(chain);
                var page = generateHTML(chain)
                    // console.log(queryUrl1.resa.length);

                    (async () => {
                        const browser = await puppeteer.launch();
                        const page = await browser.newPage();
                        await page.goto('https://example.com');
                        await page.screenshot({ path: 'example.png' });

                        await browser.close();
                    })();
            })

        });

    })
///

