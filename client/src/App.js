import './App.css';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useState } from 'react';

function App() {

  const [info, setInfo] = useState({
    name: "",
    receiptId: 0,
    price1: 0,
    price2: 0,
  })

  const handleChange = ({ target: { value, name } }) => setInfo({ [name]: value })

  const createAndDownloadPdf = () => {
    axios.post('/create-pdf', info)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' })

        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }


  return (
    <div className="App">
      <input type='text' placeholder="Name" name='name' onChange={handleChange}></input>
      <input type='number' placeholder="Receipt ID" name='receiptId' onChange={handleChange}></input>
      <input type='number' placeholder="Price 1" name='price1' onChange={handleChange}></input>
      <input type='number' placeholder="Price 2" name='price2' onChange={handleChange}></input>
      <button onClick={createAndDownloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;
