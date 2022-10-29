let upload = document.getElementById("upload");

let tbl_item = {
  hndsaCode: 0,
  mntkaCode: 0,
  dayCode: 0,
  mainCode: 0,
  faryCode: 0,
  esdarDate: "",
  grField: 0,
  clientName: "",
};

const table_head = document.querySelector("#table__head");
function makeTableHeader(dataKeys) {
  return dataKeys.map((k) =>
    Object.assign(document.createElement("th"), { textContent: k })
  );
}
function delFromData(keys, data) {
  data.forEach((obj) => {
    keys.forEach((k) => {
      Reflect.deleteProperty(obj, k);
    });
  });
}

const table_body = document.querySelector("#table__body");

function makeTableBodyRows(data) {
  data = data
    .map((v) => {
      console.log(v.payDate);
      const [date, time] = v.payDate.split(" ");
      return { ...v, payDate: new Date(date + "T" + time + "Z") };
    })
    .sort((a, b) => (a.payDate > b.payDate ? -1 : 1));

  return data.map((obj) => {
    const tr = document.createElement("tr");
    let date;
    let month;
    try {
      date = new Date(obj.esdarDate);
      month = Number(date.toISOString().split(/\D+/)[1]);
    } catch {
      console.log(obj);
    }
    const tds = Object.values(obj).map((v) => {
      return Object.assign(document.createElement("td"), {
        innerHTML:
          typeof v !== "string"
            ? v.toISOString().replace("T", " ").replace("Z", "")
            : v,
        style: `background: ${month == 9 ? "#ddd" : "white"} `,
      });
    });
    tr.append(...tds);
    return tr;
  });
}
//make tr on number of data
//make td on fields of object

upload.addEventListener("change", () => {
  let fr = new FileReader();
  fr.readAsText(upload.files[0]);
  fr.onload = function () {
    let res = fr.result;
    res = res.replaceAll("Bill(", "");
    let data = res
      .split(")")
      .map((v) =>
        Object.fromEntries(v.split(",").map((iv) => iv.trim().split("=")))
      );

    data = data.filter((v) => v.payDate);
    console.log(data);
    // data = data.split();
    delFromData(
      [
        "clientName",
        "barcode",
        "counterNo",
        "keraBefore",
        "fatoraNo",
        "descCode",
        "pahseNo",
        "tafqeet",
        "userId",
        "lat",
        "lang",
        "barcodeFlag",
        "localIsNotified",
        "localIsNoted",
        "isNotified",
        "notes",
        "isSynced",
        "kstBalance",
        "esthlakCollection",
        "dfatPaied",
        "finalPaidStatus",
        "notesFlg",
        "clientAddress",
        "activityCode",
        "phaseNo",
        "keraNow",
        "kstValue",
        "dfatBalance",
        "clientId",
      ],
      data
    );
    table_head.append(...makeTableHeader(Object.keys(data[0] ?? {})));
    table_body.append(...makeTableBodyRows(data));
    // output.innerHTML = res.split(",");
  };
});
