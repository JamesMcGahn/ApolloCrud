const markdownRemoveImages = (markdown) => {
  // Remove Markdown syntax elements
  const text = markdown.replace(/!\[(.*?)\]\([^)]*\)/g, ''); // Remove images

  return text;
};

export default markdownRemoveImages;
