import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

const Home: NextPage = () => {

  const [symbol, setSymbol] = useState('')
  const [time, setTime] = useState('')
  const [returnData, setReturnData] = useState([])
  const [predData, setPredData] = useState([])

  const search = async () => {
    const data = await fetch(`http://139.59.23.119/stock/${symbol}/${time}`).then(res => res.json())
    setReturnData(data)
  }

  const predict = async () => {
    if (returnData[0] === undefined) {
      alert("Please search first")
    } else {
      const pred_data = await fetch("http://139.59.23.119/stock/pred").then(res => res.json())
      setPredData(pred_data)
      console.log(pred_data)
    }
  }

  return (
    <div className="flex flex-col items-center py-2">
      <Head>
        <title>Stock Predictor App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center px-20 py-10 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600">
            Stock Predictor!
          </a>
        </h1>
      </main>

      <form className="mt-5 flex flex-col space-y-4 border-2 border-gray-100 rounded-xl p-10 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-bold text-gray-500" htmlFor="symbol">Ticker Symbol</label>
            <input className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Ticker of company" />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-bold text-gray-500" htmlFor="time">Time Period</label>
            <input className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time period ( days )"/>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease-in-out duration-200" type="button" onClick={search}>Search</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease-in-out duration-200" type="button" onClick={predict}>Make Prediction</button>
        </div>
      </form>

      {predData[0] !== undefined ?
        <div>
          <div className="mt-4 pt-5">
            {predData[0] == 0 ?
              <div>
                <h1 className="text-gray-500">Prediction is that the closing stock price for tomorrow will be <span className="font-xl text-red-400 font-bold">Lower</span> than it was today </h1>
              </div> :
              <div>
                <h1 className="text-gray-500">Prediction is that the closing stock price for tomorrow will be <span className="font-xl text-green-400 font-bold">Higher</span> than it was today </h1>
              </div>
            }
          </div>
          <div>
            <h1 className="text-gray-500">Accuracy of the prediction: <span className="font-bold text-black">{predData[2]}</span></h1>
          </div>
        </div>
      : null}

      <table className="text-left w-2/3 shadow-xl mt-4">
        <thead className="bg-black flex text-white w-full rounded-t-xl">
          <tr className="flex w-full mb-4">
            <th className="p-4 w-1/4">Date</th>
            <th className="p-4 w-1/4">Open</th>
            <th className="p-4 w-1/4">High</th>
            <th className="p-4 w-1/4">Low</th>
            <th className="p-4 w-1/4">Close</th>
            <th className="p-4 w-1/4">Volume</th>
          </tr>
        </thead>
        <tbody className="scrollbar-hide rounded-b-xl border-2 border-black bg-gray-light flex flex-col items-center justify-between overflow-y-scroll w-full h-64">
          {returnData.map((data) => {
            return (
              <tr className="flex w-full mb-4 items-center">
                <td className="p-4 w-1/4 text-gray-500 text-sm">{data['date']}</td>
                <td className="p-4 w-1/4 text-gray-500">$ <span className="font-bold text-black">{data['open']}</span></td>
                <td className="p-4 w-1/4 text-gray-500">$ <span className="font-bold text-black">{data['high']}</span></td>
                <td className="p-4 w-1/4 text-gray-500">$ <span className="font-bold text-black">{data['low']}</span></td>
                <td className="p-4 w-1/4 text-gray-500">$ <span className="font-bold text-black">{data['close']}</span></td>
                <td className="p-4 w-1/4 text-gray-500">$ <span className="font-bold text-black">{data['volume']}</span></td>
              </tr>
            )
          })}
        </tbody>
      </table>
        
    </div>
  )
}

export default Home
