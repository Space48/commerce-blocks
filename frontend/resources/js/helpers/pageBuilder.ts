export const isPageBuilder = () => {
  try {
    return window.parent.location.href.includes('page-builder');
  } catch (e) {
    return true;
  }
};