import PDFViewer from "../components/molecules/PdfViewer";

export const getTableRow = (h, x) => {
  let val = "";
  let d = x;
  if (h.showLastValue && Array.isArray(d)) {
    d = d[d.length - 1] || {};
  }

  if (h.key.includes(".")) {
    let arr = h.key.split(".");

    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        val = d[arr[i]] || "";
      } else {
        val = val[arr[i]] ? val[arr[i]] : "";
      }
    }
  } else {
    val = d[h.key];
  }

  if (Array.isArray(val)) {
    const arr = val.map((v) => {
      if (h.joinkey.includes(".")) {
        let arr = h.joinkey.split(".");
        for (let i = 0; i < arr.length; i++) {
          if (i === 0) {
            val = v[arr[i]] || "";
          } else {
            val = val[arr[i]] ? val[arr[i]] : "";
          }
        }
        return val;
      } else {
        return v[h.joinkey];
      }
    });
    val = h.showLastValue ? arr[arr.length - 1] : arr.join(", ");
  }
  if (h.type === "Download" && (h.updateValue ? h.updateValue(val) : val)) {
  
    return (
      <td>
        <a 
        href={`${process.env.S3URL}/${
            h.updateValue ? h.updateValue(val) : val
          }`}
          target="_blank" rel="noreferrer noopener">
        Resume
</a>
      </td>
    );
  }
  return <td>{h.updateValue ? h.updateValue(val) : val}</td>;
};
