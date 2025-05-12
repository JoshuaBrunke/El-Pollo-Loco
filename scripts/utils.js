/**
 * Opens all external links in a new tab, 
 * ensures the tab cannot access the referrer page, 
 * doesn't send this page's URL as a referrer, 
 * and doesn't endorse the linked page for SEO purposes.
 */
function addAttributesToExternalLinks() {
  const externalLinks = document.querySelectorAll("a.external-link");

  externalLinks.forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer nofollow");
  });
}

