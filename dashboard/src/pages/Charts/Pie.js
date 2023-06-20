import { ChartsHeader, Header } from "../../components"
import { AccumulationChart, Inject, Legend, PieSeries } from "@syncfusion/ej2-react-charts"
// import { pieChartData } from "../../data/dummy"
import { useStateContext } from "../../contexts/ContextProvider"

const Pie = () => {

    const { currentMode } = useStateContext()

    return (
        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl " >

            <Header category="Area" title="Inflation Rate in Percentage " />

            <AccumulationChart
                id="area-chart"
                dataSource={pieChartData}
                xName="x"
                yName="y"
                type="Pie"
                chartArea={{ border: { width: 0 } }}
                tooltip={{ enable: true }}
                background={currentMode === "Dark" ? '#33373D' : "#fff"}
            >
                <Inject services={[PieSeries, Legend]} />

            </AccumulationChart>


        </div>
    )
}

export default Pie


const pieChartData = [
    { x: 'Labour', y: 18, text: '18%' },
    { x: 'Legal', y: 8, text: '8%' },
    { x: 'Production', y: 15, text: '15%' },
    { x: 'License', y: 11, text: '11%' },
    { x: 'Facilities', y: 18, text: '18%' },
    { x: 'Taxes', y: 14, text: '14%' },
    { x: 'Insurance', y: 16, text: '16%' },
];
