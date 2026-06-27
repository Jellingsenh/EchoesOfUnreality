export function getTextWidth(text: string, font: string): number {
  // const uppercaseText = text.toUpperCase();
    // console.log('getting text width for: ' + text)
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      context.font = font;
      const metrics = context.measureText(text);
      return metrics.width;
    }
    return 0;
  }
  
export function setFirstLetterUpperCase(text: string): string {
    if (text.length === 0) {
        return text;
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}