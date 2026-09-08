export const linkedinProfileUrl = 'https://www.linkedin.com/in/cparkphd/';
export const elfsightPlatformUrl = 'https://elfsightcdn.com/platform.js';

/** @param {string | undefined} value */
export function getLinkedInWidgetId(value) {
  const id = value?.trim();
  if (!id) return null;
  if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id)) {
    throw new Error(
      'NEXT_PUBLIC_ELFSIGHT_LINKEDIN_WIDGET_ID must contain only the widget UUID, not an embed snippet or URL.',
    );
  }
  return id.toLowerCase();
}
