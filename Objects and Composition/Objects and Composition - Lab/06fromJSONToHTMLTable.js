function fromJSONToHTMLTable(json) {
  let arr = JSON.parse(json);

  let outputArr = ['<table>'];
  outputArr.push(makeKeyRow(arr));
  arr.forEach((obj) => outputArr.push(makeValueRow(obj)));
  outputArr.push('</table>');

  console.log(outputArr.join('\n'));

  function makeKeyRow(arr) {
    let result = '  <tr>';
    Object.keys(arr[0]).forEach((key) => {
      result += `<th>${escapeHtml(key)}</th>`;
    });
    result += '</tr>';
    return result;
  }

  function makeValueRow(obj) {
    let result = '  <tr>';
    Object.values(obj).forEach((value) => {
      result += `<td>${escapeHtml(value)}</td>`;
    });
    result += '</tr>';
    return result;
  }

  function escapeHtml(str) {
    let entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
    };
    return str.toString().replace(/[&<>"'\/]/g, (s) => entityMap[s]);
  }
}
