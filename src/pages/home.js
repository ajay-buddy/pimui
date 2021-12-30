import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import CSVReader from "react-csv-reader";
import {
  addProductRequestBulk,
  getProductRequest,
  productSelector,
} from "../app/productsSlice";

function splitIntoChunk(arr, chunk) {
  const arrays = [];

  while (arr.length > 0) {
    let tempArray;
    tempArray = arr.splice(0, chunk);
    arrays.push(tempArray);
  }
  return arrays;
}

export default function Home() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const products = [];
    data.forEach((d, i) => {
      if (i >= 1) {
        products.push({
          name: d[0],
          sku: d[6],
          price: parseFloat(d[5]),
          pprice: parseFloat(d[4]),
          sprice: parseFloat(d[3]),
          igst: parseFloat(d[7]),
          cgst: parseFloat(d[8]),
          quantity: parseFloat(d[2]),
          catagoryId: "4f0bf5b5-d877-46a3-8878-b8ca662bfd67",
        });
      }
    });
    const content = splitIntoChunk(products, 100);
    content.forEach((d) => dispatch(addProductRequestBulk(d)));
    // dispatch(addProductRequestBulk(products));
  }, [data]);
  return (
    <div>
      <CSVReader onFileLoaded={(data, fileInfo) => setData(data)} />
    </div>
  );
}
