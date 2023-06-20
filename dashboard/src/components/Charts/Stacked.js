import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from "@syncfusion/ej2-react-charts"

import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis } from "../../data/dummy"

const Stacked = ({ width, height }) => {
    return (
        <ChartComponent
            width={width}
            height={height}
            id="stack-chart"
            primaryXAxis={stackedPrimaryXAxis}
            primaryYAxis={stackedPrimaryYAxis}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            legendSettings={{ backgroundColor: "white" }}
        >
            <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
            <SeriesCollectionDirective>    {/* as a wrapper of SeriesDirective */}
                {
                    stackedCustomSeries.map((item, index) => (
                        <SeriesDirective key={index} {...item} />
                    ))
                }
            </SeriesCollectionDirective>
        </ChartComponent>
    )
}

export default Stacked































// const Stacked = ({ width, height }) => {
//     return (
//         <ChartComponent
//             width={width}
//             height={height}
//             id="stack-chart"
//             primaryXAxis={{               // primaryXAxis  describe what type of data being showed on x axis (with what properties)
//                 majorGridLines: { width: 0 },
//                 minorGridLines: { width: 0 },
//                 majorTickLines: { width: 0 },
//                 minorTickLines: { width: 0 },
//                 lineStyle: { width: 0 },
//                 labelIntersectAction: 'Rotate45',
//                 interval: 1,                            // interval between the lines along x axis is 1
//                 valueType: 'Category',                  // category show that value along x axis is string type instead of number, for numeric "Double" can be used   - https://ej2.syncfusion.com/documentation/chart/category-axis/
//                 // title:'this is heading of xaxis'     // uncomment it to show result
//             }}
//             primaryYAxis={{
//                 lineStyle: {
//                     width: 0
//                 },
//                 minimum: 100,                           // initial value of yaxis
//                 maximum: 400,                           // final value of yaxis
//                 interval: 100,                          // interval between two lines along yaxis
//                 majorTickLines: { width: 0 },
//                 majorGridLines: { width: 1 },
//                 minorGridLines: { width: 1 },
//                 minorTickLines: { width: 0 },
//                 labelFormat: '{value}',
//             }}
//             chartArea={{ border: { width: 0 } }}            // border of chart will be removed
//             tooltip={{ enable: true }}                      // info about any point
//             legendSettings={{ backgroundColor: "white" }}   // Legend provides information about the series rendered in the chart. such as heading of chart, no. of axis, heading of x,yaxis etc.
//         // legendSettings: {visible: true, position:'Top'}  // Legend position as top - simple css  // exp.
//         >
//             <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
//             {/* services indicates what to do, you want the chart should have */}
//             {/* legend provide info about x,y axis (of what type of data is displaying on these x-axis) */}
//             {/* category describe the type of data to be shown along x,y axis */}
//             {/* stackingColumnSeries used to use multiple column in single interval along x,y axis */}
//             {/* tooltip is used to show data at different points on the chart */}

//             <SeriesCollectionDirective>    {/* as a wrapper of SeriesDirective */}

//                 <SeriesDirective
//                     dataSource={[
//                         { x_axis_of_budget: 'Jan', y_axis_of_budget: 111.1 },
//                         { x_axis_of_budget: 'Feb', y_axis_of_budget: 127.3 },
//                         { x_axis_of_budget: 'Mar', y_axis_of_budget: 143.4 },
//                         { x_axis_of_budget: 'Apr', y_axis_of_budget: 159.9 },
//                         { x_axis_of_budget: 'May', y_axis_of_budget: 159.9 },
//                         { x_axis_of_budget: 'Jun', y_axis_of_budget: 159.9 },
//                         { x_axis_of_budget: 'July', y_axis_of_budget: 159.9 },
//                     ]}
//                     xName='x_axis_of_budget'                // x,yname could by any
//                     yName='y_axis_of_budget'
//                     name='Budget'                           // title or headng
//                     type='StackingColumn'                   // multiple column is going to use in single interval
//                     background='blue'

//                 />
//                 <SeriesDirective
//                     dataSource={[
//                         { x_axis_of_expense: 'Jan', y_axis_of_expense: 111.1 },
//                         { x_axis_of_expense: 'Feb', y_axis_of_expense: 127.3 },
//                         { x_axis_of_expense: 'Mar', y_axis_of_expense: 143.4 },
//                         { x_axis_of_expense: 'Apr', y_axis_of_expense: 159.9 },
//                         { x_axis_of_expense: 'May', y_axis_of_expense: 159.9 },
//                         { x_axis_of_expense: 'Jun', y_axis_of_expense: 159.9 },
//                         { x_axis_of_expense: 'July', y_axis_of_expense: 159.9 },
//                     ]}
//                     xName='x_axis_of_expense'
//                     yName='y_axis_of_expense'
//                     name='Expense'
//                     type='StackingColumn'
//                     background='red'
//                 />

//             </SeriesCollectionDirective>

//         </ChartComponent>
//     )
// }

// export default Stacked










// to use multiple data columns in single interval - use as follow
// series: [
// {
//     dataSource: chartData,
//     xName: 'country', yName: 'gold',
//     name: 'Gold', type: 'Column'
// }, {
//     dataSource: chartData,
//     xName: 'country', yName: 'silver',
//     name: 'Silver', type: 'Column'
// }, {
//     dataSource: chartData,
//     xName: 'country', yName: 'bronze',
//     name: 'Bronze', type: 'Column'
// },
// ... (can be increased)
// ],