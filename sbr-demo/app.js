import { getPageContent, onLinkNavigate, transitionHelper, getLink } from './utils.js';

const galleryPath = '/sbr-demo/';
const pplPath = `${galleryPath}pages/`;

function getNavigationType(fromPath, toPath) {
  if (fromPath.includes(pplPath) && toPath === galleryPath) {
    return 'ppl-page-to-gallery';
  }
  
  if (fromPath === galleryPath && toPath.includes(pplPath)) {
    return 'gallery-to-ppl-page';
  }
  
  return 'other';
}


onLinkNavigate(async ({ fromPath, toPath }) => {
  const navigationType = getNavigationType(fromPath, toPath);
  const content = await getPageContent(toPath);
  
  let targetThumbnail;
  let targetFirstName;
  let targetBadge;
  
  if (navigationType === 'gallery-to-ppl-page') {
    targetBadge = getLink(toPath).querySelector(".badge");
    targetBadge.style.viewTransitionName = 'badge';

    targetThumbnail = getLink(toPath).querySelector('img');
    targetThumbnail.style.viewTransitionName = 'banner-img';
  }
  
  const transition = transitionHelper({
    updateDOM() {
      // This is a pretty heavy-handed way to update page content.
      // In production, you'd likely be modifying DOM elements directly,
      // or using a framework.
      // innerHTML is used here just to keep the DOM update super simple.
      document.body.innerHTML = content;

      if (navigationType === 'ppl-page-to-gallery') {
        targetThumbnail = getLink(fromPath).querySelector('img');
        targetThumbnail.style.viewTransitionName = 'banner-img';

        targetBadge = getLink(fromPath).querySelector(".badge");
        targetBadge.style.viewTransitionName = 'badge';
      }
    }
  });
  
  transition.finished.finally(() => {
    // Clear the temporary tag
    if (targetThumbnail) targetThumbnail.style.viewTransitionName = '';
    // if (targetFirstName) targetFirstName.style.viewTransitionName = '';
    if (targetBadge) targetBadge.style.viewTransitionName = '';
  });
});
