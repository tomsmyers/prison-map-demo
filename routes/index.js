const express = require('express');
const fs = require('fs');

const prisons = JSON.parse((fs.readFileSync('./data/prisons.json')).toString());

const loadMap = function (req, res) {
    const categories = ['A', 'B', 'C', 'D', "Women's", 'HMYOI']
    const selectedCategories = (req.method === 'POST') ? req.body['categories'] || [] : categories

    const selectedPrisons = prisons.filter(prison => {
        for (const category of prison["categories"]) {
            if (selectedCategories.includes(category)) {
                return true
            }
        }
        return false
    })

    res.render('map', {
        osVectorTileApiKey: process.env.OS_VECTOR_TILE_API_KEY,
        prisons: selectedPrisons,
        checkboxArgs: {
            idPrefix: "categories",
            name: "categories",
            fieldset: {
                legend: {
                    text: "Filter prisons by category",
                    isPageHeading: false,
                    classes: "govuk-fieldset__legend--m"
                }
            },
            items: categories.map(category => {
                return {"value": category, "text": category, "checked": selectedCategories.includes(category)}
            })
        }
        ,
        selectedCategories,
    });
}

const router = express.Router();

router.get('/', loadMap);
router.post('/', loadMap);

module.exports = router;
