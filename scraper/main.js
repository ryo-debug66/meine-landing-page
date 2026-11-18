// Einfacher Crawlee-Scraper (ohne Browser, schnell, für normale HTML-Seiten).
// Start:  npm start -- https://example.com
// Ergebnis landet in ./storage/datasets/default/ als JSON.
import { CheerioCrawler, Dataset, ProxyConfiguration } from 'crawlee';

const startUrls = process.argv.slice(2);
if (startUrls.length === 0) startUrls.push('https://crawlee.dev');

// Falls ein Proxy über HTTPS_PROXY gesetzt ist (z. B. in Cloud-Umgebungen), diesen nutzen.
const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy;
const proxyConfiguration = proxyUrl ? new ProxyConfiguration({ proxyUrls: [proxyUrl] }) : undefined;

const crawler = new CheerioCrawler({
    proxyConfiguration,
    maxRequestsPerCrawl: 20, // Sicherheitsgrenze
    async requestHandler({ request, $, enqueueLinks, log }) {
        const title = $('title').text().trim();
        log.info(`${title} — ${request.loadedUrl}`);

        await Dataset.pushData({
            url: request.loadedUrl,
            title,
            h1: $('h1').first().text().trim(),
            description: $('meta[name="description"]').attr('content') ?? null,
        });

        // Nur Links auf derselben Domain weiterverfolgen
        await enqueueLinks({ strategy: 'same-domain' });
    },
});

await crawler.run(startUrls);
