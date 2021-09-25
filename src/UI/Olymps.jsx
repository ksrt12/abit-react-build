import { RSROLYMP } from "../ts/constants";
import { colorBVI } from "../ts/colors";
import { checkBVI } from "../ts/bvi";

function getSubTitles(olympName) {
    return {
        name: olympName.substring(olympName.indexOf('. "') + 3, olympName.indexOf('("') - 2).replace(/[«»]+/g, '"').trim(),
        lvl: Number(olympName.substr(olympName.indexOf('уровень') - 2, 1).trim()),
        dip: Number(olympName.substr(olympName.indexOf('Диплом') + 7, 1).trim()),
        subj: olympName.substring(olympName.indexOf('("') + 2, olympName.indexOf('")')).toLowerCase().replace('cистемы', 'системы').trim(),
    };
}

function MakeLink({ code, year }) {
    return (
        <a href={`${RSROLYMP}${year}/by-code/${code}/white.pdf`}>
            {`${code}`.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1 $2-$3')}
        </a>
    );
}


function OlympRow({ d, year }) {
    const olymp = getSubTitles(d.oa, d.form);
    const status = checkBVI('01.03.02', { grad: d.form, ...olymp });
    return (
        <tr style={{ backgroundColor: colorBVI(status) }} >
            <td>{olymp.name}</td>
            <td>{olymp.lvl}</td>
            <td>{olymp.dip}</td>
            <td>{olymp.subj}</td>
            <td><MakeLink code={d.code} year={year} /></td>
            <td>{d.form}</td>
            <td>{status}</td>
        </tr>
    );
}

function Olymps(year, codes) {
    const trs = [];
    for (const d of codes) {
        if (d.form > 9) {
            trs.push(<OlympRow year={year} d={d} key={d.code} />);
        }
    }
    return trs;
}

export default Olymps;