import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function cssOffset([offsetLeft, offsetTop]) {
  return htmlSafe(`left: ${offsetLeft}px; top: ${offsetTop}px;`);
}

export default helper(cssOffset);
