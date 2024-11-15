import { onLinkNavigate } from '../utils.js';

async function getPageContent(url) {
    const response = await fetch(url);
    const text = await response.text();

    return /<body[^>]*>([\w\W]*)<\/body>/.exec(text)[1];
}

onLinkNavigate(async ({ toPath }) => {
    const content = await getPageContent(toPath);

    if (!document.startViewTransition) {
        return;
    }
    document.startViewTransition(() => {
        document.body.innerHTML = content;
    });
});
