const markdownWordCount = (markdown) => {
  // Remove Markdown syntax elements
  const text = markdown
    .replace(/#+\s/g, '') // Remove headers
    .replace(/\[(.*?)\]\([^)]*\)/g, '$1') // Remove links
    .replace(/!\[(.*?)\]\([^)]*\)/g, '') // Remove images
    .replace(/`{1,2}(.*?)`{1,2}/g, '$1') // Remove inline code
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove bold formatting
    .replace(/(\*|_)(.*?)\1/g, '$2') // Remove italic formatting
    .replace(/~~(.*?)~~/g, '$1') // Remove strikethrough formatting
    .replace(/`{3}[\s\S]*?`{3}/g, '') // Remove code blocks
    .replace(/>/g, '') // Remove '>' characters
    .replace(/-/g, ''); // Remove '-' characters

  const words = text.split(/\s+/).filter((word) => word !== '');

  return words.length;
};

export default markdownWordCount;
