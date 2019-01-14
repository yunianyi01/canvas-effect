// canvas 绘制的文字换行
/*
t:文本，x：x起始位置，y:y起始位置，w：宽度，line：显示多少行，不传时，全部显示
*/
export function drawText(context, t = '', x, y, w, line, fontSize) {
  if (!t.length) {
    return;
  }
  let chr = t.split('');
  let temp = '';
  let row = [];
  for (let a = 0; a < chr.length; a++) {
    if (context.measureText(temp).width >= w) {
      row.push(temp);
      temp = '';
    }
    temp += chr[a];
  }
  row.push(temp);
  let _line = (line > 0 && line < row.length) ? line : row.length;
  for (let b = 0; b < _line; b++) {
    if (b == (_line - 1) && row.length > _line) {
      row[b] = row[b].substr(0, row[b].length - 1) + '...';
    }
    context.fillText(row[b], x, y + (b + 1) * (fontSize || 20) * 1.5);
  }
};
export function isWeChat() {
  let ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false
  }
};
