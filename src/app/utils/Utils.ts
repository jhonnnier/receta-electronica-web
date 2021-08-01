export class Utils {

  static ellipsis(text: string, length: number): string {
    return `${text.substring(0, length)}...`
  }

  static bodyColor(color = '#F5F6F7') {
    document.body.style.backgroundColor = color;
  }
}
