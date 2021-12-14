// Helper for extracting the metadata from the source document
const getAppVersionFromDocument = (document) =>
    document ? document.querySelector('meta[name="app-version"]').content : null;

// Fetches the '/' directory from the server to get the latest HTML without the bundle
const getLatestVersion = async () => {
    let parsedDocument;

    try {
        const response = await fetch('/');
        const fetchedHTML = await response.text();

        const parser = new DOMParser();

        parsedDocument = parser.parseFromString(fetchedHTML, 'text/html')
    } catch (e) {
        console.error('Error fetching new version');
    }

    return getAppVersionFromDocument(parsedDocument)
}

// Compares versions and returns some sensible data
export const getAppUpdates = async () => {
    const currentVersion = getAppVersionFromDocument(document);
    const latestVersion = await getLatestVersion();

    return {
        currentVersion,
        latestVersion,
        isNewVersionAvailable: latestVersion !== null && currentVersion !== latestVersion
    };
}


