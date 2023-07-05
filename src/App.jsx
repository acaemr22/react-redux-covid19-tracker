import { useEffect, useState } from "react";
import "./App.css";
import { fetchData } from "./features/trackerSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading";
import Select from "./components/Select";
import BarChart from "./components/BarChart";
import Error from "./components/Error";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tracker.data);
  const status = useSelector((state) => state.tracker.status);
  const error = useSelector((state) => state.tracker.error);
  const countries = useSelector((state) => state.tracker.countries);
  const [type, setType] = useState("Globe");

  useEffect(() => {
    dispatch(fetchData(type));
  }, [type]);

  if (status === "failed" && type !== "Globe") {
    return (
      <main className="py-64">
        <Error message={error} />
        <div className="flex items-center justify-center h-full">
          <Select countries={countries} state={[type, setType]} />
        </div>
      </main>
    );
  }

  return (
    <main className=" py-10">
      <section className="flex flex-col items-center justify-center gap-y-1">
        <h1 className="sm:text-[80px] text-5xl text-transparent h-auto font-bold head flex flex-row justify-center ">
          COVID-19
        </h1>
        <h5 className="font-bold text-[12px] sm:text-base">
          Global and Country Wise Cases of Corona Virus
        </h5>
        <h5 className="italic font-semibold text-[12px] sm:text-base">
          (For a particular select a Country from below)
        </h5>
      </section>
      <section>
        {status === "pending" ? (
          <Loading />
        ) : (
          <div className="w-full px-5 sm:px-20 md:px-30  py-10 grid md:grid-cols-2 xl:grid-cols-4 grid-cols-1 gap-10">
            <div className="rounded-md overflow-clip">
              <div className="px-2 py-6 text-center text-lg sm:text-xl font-semibold bg-blue-300/60 flex flex-col gap-y-1 sm:gap-y-2">
                <h3>Infected</h3>
                <h3 className="font-bold text-xl sm:text-2xl">
                  {data.confirmed?.toLocaleString()}
                </h3>
                <h3>Last updated at:</h3>
                <h3 className="text-gray-500">
                  {new Date(data.last_update).toLocaleString()}
                </h3>
              </div>
              <div className="bg-blue-500 h-3"></div>
            </div>
            <div className="rounded-md overflow-clip">
              <div className="px-2 py-6 text-center text-lg sm:text-xl font-semibold bg-green-300/60 flex flex-col gap-y-1 sm:gap-y-2">
                <h3>Recovered</h3>
                <h3 className="font-bold text-xl sm:text-2xl">
                  {data.recovered?.toLocaleString()}
                </h3>
                <h3>Last updated at:</h3>
                <h3 className="text-gray-500">
                  {new Date(data.last_update).toLocaleString()}
                </h3>
              </div>
              <div className="bg-green-500 h-3"></div>
            </div>
            <div className="rounded-md overflow-clip">
              <div className="px-2 py-6 text-center text-lg sm:text-xl font-semibold bg-red-300/60 flex flex-col gap-y-1 sm:gap-y-2">
                <h3>Deaths</h3>
                <h3 className="font-bold text-xl sm:text-2xl">
                  {data.deaths?.toLocaleString()}
                </h3>
                <h3>Last updated at:</h3>
                <h3 className="text-gray-500">
                  {new Date(data.last_update).toLocaleString()}
                </h3>
              </div>
              <div className="bg-red-500 h-3"></div>
            </div>
            <div className="rounded-md overflow-clip">
              <div className="px-2 py-6 text-center text-lg sm:text-xl font-semibold bg-yellow-300/60 flex flex-col gap-y-1 sm:gap-y-2">
                <h3>Active</h3>
                <h3 className="font-bold text-xl sm:text-2xl">
                  {data.active?.toLocaleString()}
                </h3>
                <h3>Last updated at:</h3>
                <h3 className="text-gray-500">
                  {new Date(data.last_update).toLocaleString()}
                </h3>
              </div>
              <div className="bg-yellow-500 h-3"></div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center">
          <Select countries={countries} state={[type, setType]} />
        </div>
      </section>
      <section className="flex justify-center items-center py-10 md:px-36">
        {status === "pending" ? (
          <Loading />
        ) : (
          <BarChart
            className="w-full"
            chartData={{
              labels: ["Infected", "Recovered", "Deaths", "Active"],
              datasets: [
                {
                  label: `Current State in the ${
                    type === "Globe" ? "World" : type
                  }`,
                  data: [
                    data.confirmed,
                    data.deaths,
                    data.recovered,
                    data.active,
                  ],
                  backgroundColor: [
                    "rgb(147 197 253 / 0.6)",
                    "rgb(134 239 172 / 0.6)",
                    " rgb(252 165 165 / 0.6)",
                    "rgb(253 224 71 / 0.6)",
                  ],
                },
              ],
            }}
          />
        )}
      </section>
      <footer className="flex-col flex items-center justify-center gap-y-4">
        <span>Copyright (c) 2023 Emre Açar</span>
        <div className="flex flex-row gap-x-5">
          <a
            href="https://github.com/acaemr22"
            target="_blank"
            className="flex flex-row items-center justify-center gap-x-2 text-white text-md bg-blue-600 p-2 px-3 rounded-lg hover:bg-blue-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-github"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            Github
          </a>
          <a
            href="https://github.com/acaemr22/react-redux-covid19-tracker"
            target="_blank"
            className="flex flex-row items-center justify-center gap-x-2 text-white text-md bg-gray-600 p-2 px-3 rounded-lg hover:bg-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-code-slash"
              viewBox="0 0 16 16"
            >
              <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
            </svg>
            Code
          </a>
        </div>
      </footer>
    </main>
  );
}

export default App;
