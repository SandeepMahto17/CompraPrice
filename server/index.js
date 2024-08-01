const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 5000;

const fetchAmazon = async (query) => {
    const url = `https://www.amazon.in/s?k=${query}`;
    const products = [];
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $ = cheerio.load(data);
        $('.s-main-slot .s-result-item').each((i, el) => {
            const title = $(el).find('h2 a span').text().trim();
            const price = $(el).find('.a-price-whole').text().replace(/,/g, '').trim();
            const link = 'https://www.amazon.in' + $(el).find('h2 a').attr('href');
            const image = $(el).find('.s-image').attr('src');
            if (title && price && link && image) {
                products.push({
                    title,
                    price: parseFloat(price),
                    link,
                    image,
                });
            }
        });
    } catch (error) {
        console.error('Error fetching from Amazon:', error.message);
    }
    return products;
};

const fetchFlipkart = async (query) => {
    const url = `https://www.flipkart.com/search?q=${query}`;
    const products = [];
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $ = cheerio.load(data);
        $('._1AtVbE').each((i, el) => {
            const title = $(el).find('._4rR01T').text().trim();
            const price = $(el).find('._30jeq3').text().replace(/₹|,/g, '').trim();
            const link = 'https://www.flipkart.com' + $(el).find('a').attr('href');
            const image = $(el).find('img').attr('src');
            if (title && price && link && image) {
                products.push({
                    title,
                    price: parseFloat(price),
                    link,
                    image,
                });
            }
        });
    } catch (error) {
        console.error('Error fetching from Flipkart:', error.message);
    }
    return products;
};

app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    const [amazonProducts, flipkartProducts] = await Promise.all([
        fetchAmazon(query),
        fetchFlipkart(query)
    ]);

    const products = [...amazonProducts, ...flipkartProducts].sort((a, b) => a.price - b.price);
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
