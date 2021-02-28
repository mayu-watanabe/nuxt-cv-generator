import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "~/static/js/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  GenShinGothic: {
    normal: "GenShinGothic-Normal-Sub.ttf",
    bold: "GenShinGothic-Normal-Sub.ttf"
  }
};

const outputPdf = (data) => {
  const html = `
  <div>
  <h1>職務経歴書</h1>
  ${(!data.basic) ? `` :
      `<h2>基本情報</h2>` +
      '<b>氏名</b>' +
      ((data.basic.familyName && data.basic.firstName) ? `<p>${data.basic.familyName} ${data.basic.firstName}</p>` : ``) +
      ((data.basic.github) ? `<b>GitHub</b><p>${data.basic.github}</p>` : ``) +
      ((data.basic.website) ? `<b>Website</b><p>${data.basic.website}</p>` : ``)
    }
  ${(!data.company.length) ? `` :
      `<h2>職務経歴</h2>` +
      data.company.map(company => `
      <li>${company.name}<li>${company.summery}</li></li>
    `).join('') +
      `<h2>開発経歴</h2>` +
      data.company.map(company => `
      <div>
      <h3>${company.name} (${company.fromYear}年${company.fromMonth}月~${company.toYear}年${company.toMonth}月)</h3>
          <p>資本金: ${company.capital}円 従業員数: ${company.employeesNumber}名</p>
          <p>事業内容: ${company.industry}</p>
          <table>
            <thead>
              <tr>
                <th>期間</th>
                <th>業務内容</th>
                <th>環境</th>
                <th>役割／担当／規模</th>
              </tr>
            </thead>
            <tbody>
            ${company.projects.map(project => `
              <tr>
                <td>${project.fromYear}.${project.fromMonth}~${project.toYear}.${project.toMonth}</td>
                <td>
                  <b>プロジェクト要約</b><p>${project.summery}</p>
                  <b>担当フェーズ</b><p>${project.phases}</p>
                  <b>実績・取り組み等</b><p>${project.achievement}</p>
                </td>
                <td>${project.environment}</td>
                <td>
                  <b>役割</b><p>${project.role}</p>
                  <b>プロジェクト規模</b><p>${project.numberOfTeam}名</p>
                </td>
              </tr>
            `).join('')}
            </tbody>
          </table>
      </div>
    `).join('')
  }
  ${ (!data.skills.length) ? `` :`
  <h2>プログラミングスキル</h2>
  <table>
    <thead>
      <tr>
        <th>カテゴリ</th>
        <th>種別</th>
        <th>経験年数</th>
        <th>スキルレベル・備考</th>
      </tr>
    </thead>
    <tbody>` +
    data.skills.map(skill => `
      <tr>
        <td>${skill.categoryName}</td>
        <td>${skill.name}</td>
        <td>${skill.period}年</td>
        <td>${skill.memo}</td>
      </tr>
    `).join('') +
    `</tbody>
  </table>
  `}
  ${ (!data.skills.length) ? `` : `
  <h2>自己PR</h2>` + 
    data.summery.map(summery => `
    <div>
      <b>${summery.title}</b>
      <p>${summery.content}</p>
    </div>
  `).join('')
  }
  `;
  const docDefinition = { 
    defaultStyle: {
      font: "GenShinGothic"
    },
    content: [htmlToPdfmake(html)],
}; 
  pdfMake.createPdf(docDefinition).open();
}

export default ({}, inject) => {
  inject('outputPdf', outputPdf);
}