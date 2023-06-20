import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Edit, Toolbar, Sort, Filter, Inject } from "@syncfusion/ej2-react-grids"
import { customersData, customersGrid } from "../data/dummy"

import { Header } from "../components"

const Customers = () => {
    return (
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl " >
            <Header category='Page' title='Customers' />
            <GridComponent>
                <ColumnsDirective
                    dataSource={customersData}
                    allowPaging
                    allowSorting
                    toolbar={['Delete']}
                    editSettings={{ allowDeleting: true, allowEditing: true }}
                    width='auto'
                >
                    {
                        customersGrid.map((item, index) => (
                            <ColumnDirective key={index} {...item} />
                        ))
                    }
                </ColumnsDirective>
                <Inject services={[Page, Toolbar, Selection, Edit, Filter, Sort]} />
            </GridComponent>
        </div>
    )
}

export default Customers
