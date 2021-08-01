export  class ScrollUtils {
  static moveScrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }


}
