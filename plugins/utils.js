import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "~/static/js/vfs_fonts";
import htmlToPdfmake from "~/static/js/html-to-pdfmake";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  ipagp: {
    normal: "ipagp.ttf",
    bold: "ipagp.ttf",
    italics: "ipagp.ttf",
    bolditalics: "ipagp.ttf",
  }
};

const outputPdf = (data) => {
  var today = getDateToday();
  const html = `
  <div class="wrapper">
    <h1 class="title_main">職務経歴書</h1>
    <span class="date_published">${today}現在</span>
    ${(!data.basic) ? `` : `
    <div class="section">
      <h3 class="title_sub">基本情報</h3>` +
      '<span class="title_sub_sub">・氏名</span>' +
      ((data.basic.familyName && data.basic.firstName) ? `<span style="margin:6">${data.basic.familyName} ${data.basic.firstName}</span>` : ``) +
      ((data.basic.github) ? `<span class="title_sub_sub">・GitHub</span><span style="margin:6">${data.basic.github}</span>` : ``) +
      ((data.basic.website) ? `<span class="title_sub_sub">・Website</span><span style="margin:6">${data.basic.website}</span>` : ``)
      }
    </div><br>
    ${(!data.company.length) ? `` : `
    <div class="section">
      <h3 class="title_sub">職務経歴</h3>` +
      data.company.map(company => `
      <span class="title_sub_sub">・${company.name} (${formatPeriod(company.fromYear, company.fromMonth)}~${formatPeriod(company.toYear, company.toMonth)})</span><span style="margin:6">${company.summery}</span>
    </div><br>
    `).join('') + `
    <div class="section">
      <h3 class="title_sub">開発経歴</h3>` +
      data.company.map(company => `
      <div>
        <h5>${company.name} (${formatPeriod(company.fromYear, company.fromMonth)}~${formatPeriod(company.toYear, company.toMonth)})</h5>
        <span>資本金: ${company.capital}円　従業員数: ${company.employeesNumber}名　事業内容: ${company.industry}</span>
        <br>
        <table>
          <thead>
            <tr>
              <th style="width:15%">期間</th>
              <th style="width:50%">業務内容</th>
              <th style="width:20%">環境</th>
              <th style="width:15%">役割／規模</th>
            </tr>
          </thead>
          <tbody>
          ${company.projects.filter((p) => {
            return (p.publish)
          }).map(project => `
            <tr>
              <td style="alignment:center;margin:15">${formatPeriod(project.fromYear, project.fromMonth)}<br>~<br>${formatPeriod(project.toYear, project.toMonth)}</td>
              <td>
                <b>【プロジェクト要約】</b><p style="margin:8">${project.summery}</p>
                <b>【担当フェーズ】</b><p style="margin:8">${project.phases}</p>
                <b>【実績・取り組み等】</b><p style="margin:8">${project.achievement.replace("\n", "<br>")}</p>
              </td>
              <td><p style="margin:2">${project.environment.replace("\n", "<br>")}</p></td>
              <td>
                <b>【役割】</b><p style="margin:8">${project.role}</p>
                <b>【規模】</b><p style="margin:8">${project.numberOfTeam}名</p>
              </td>
            </tr>
          `).join('')}
          </tbody>
        </table>
      </div>
    </div><br>
    `).join('')
    }
    ${ (!data.skills.length) ? `` :`
    <div class="section">
      <h3 class="title_sub">プログラミングスキル</h3>
      <br>
      <table>
        <thead>
          <tr>
            <th style="width:20%">カテゴリ</th>
            <th style="width:15%">種別</th>
            <th style="width:10%">経験年数</th>
            <th style="width:55%">スキルレベル・備考</th>
          </tr>
        </thead>
        <tbody>` +
        data.skills.map(skill => `
          <tr>
            <td style="alignment:center">${skill.categoryName}</td>
            <td style="alignment:center">${skill.name}</td>
            <td style="alignment:center">${skill.period}${skill.periodUnit}</td>
            <td>${skill.memo}</td>
          </tr>
        `).join('') +
        `</tbody>
      </table>
    </div><br>`}
    ${ (!data.skills.length) ? `` : `
    <div class="section">
      <h3 class="title_sub">自己PR</h3>` + 
        data.summery.map(summery => `
        <div>
          <h6 class="title_sub_sub">${summery.title}</h6>
          <span>${summery.content.replace("\n", "<br>")}</span>
        </div>
      `).join('')
      }
    </div>
  </div>`;
  const docDefinition = { 
    pageSize: 'A4',
    footer: function (currentPage, pageCount) {
      return [
        { text: `- ${currentPage} -`, alignment: 'center', fontSize: 10 }
      ]
    },
    defaultStyle: {
      font: "ipagp",
      fontSize: 11,
    },
    styles: {
      'html-span': {
        fontSize: 11,
        margin: [2, 3]
      },
      'html-table': {
        fontSize: 11
      },
      'html-th': {
        alignment: "center",
        fontSize: 10
      },
      title_main:{
        alignment: "center"
      },
      title_sub: {
        margin: [0, 8],
        fontSize: 18,
      },
      title_sub_sub: {
        margin: [0, 10],
      },
      date_published: {
        alignment: "right",
      },
    },
    content: [
      htmlToPdfmake(html, { tableAutoSize: true })
    ],
  }; 
  pdfMake.createPdf(docDefinition).download();
}

function getDateToday () {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();

  return `${year}年${month}月${day}日`;
}

function formatPeriod(year, month) {
  if (month == '現在') {
    return month;
  }
  return `${year}.${month}`
}

const load = (_url) => {
  var xhr;
  xhr = new XMLHttpRequest();
  xhr.open("HEAD", _url, false);  //同期モード
  xhr.send(null);
  return xhr.status;
}

export default ({}, inject) => {
  inject('outputPdf', outputPdf);
  inject('load', load);
}